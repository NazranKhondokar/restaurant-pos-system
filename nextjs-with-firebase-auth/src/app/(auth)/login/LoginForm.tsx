"use client";

import {
  AuthLoadingType,
  ResponseStatusType,
  SpinnerColor,
  SpinnerSize,
  AccountReviewStatus,
} from "@/enums/Common";
import { ErrorToast, SuccessToast } from "@/helpers/ToastHelper";
import {
  googleLogin,
  loginWithEmailAndPassword,
} from "@/lib/firebase/firebaseAuth";
import { getFCMToken } from "@/lib/firebase/firebaseFCM";
import { getDashboardPath } from "@/lib/utils/GetDashboardPath";
import { getDeviceInfo } from "@/lib/utils/GetDeviceInfo";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useAuthLoginUserMutation } from "@/redux/slices/api/authAPISlice";
import { setUser } from "@/redux/slices/sync/userSlice";
import { LoginFormData, LoginSchema } from "@/schemas/AuthSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ZodFormattedError } from "zod";
import { IoEye, IoEyeOff, FcGoogle } from "@/lib/utils/Icon";
import Link from "next/link";
import Spinner from "@/components/Spinner/Spinner";
import { getErrorMessage } from "@/lib/utils/ErrorHelper";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect")
    ? decodeURIComponent(searchParams.get("redirect")!)
    : "/";

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loginFormError, setLoginFormError] =
    useState<ZodFormattedError<LoginFormData> | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isFirebaseLoading, setIsFirebaseLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  

  // *** RTK Queries ***
  const [loginUser, { isLoading: isLoginUserLoading }] =
    useAuthLoginUserMutation();

  // login form data change function
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // login form submit function
  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // step-1: login form validation
    const result = LoginSchema.safeParse(loginFormData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setLoginFormError(formattedErrors);
      return;
    }

    setLoginFormError(null);

    try {
      setLoadingType(AuthLoadingType.LOGIN);
      setIsFirebaseLoading(true);

      // step-2: login firebase user
      const { user, error: registrationError } =
        await loginWithEmailAndPassword(
          loginFormData.email,
          loginFormData.password,
          false
        );

      if (registrationError || !user) return;

      // step-3: get firebase id token
      const firebaseIdToken = await user.getIdToken();

      if (!firebaseIdToken) {
        ErrorToast("Failed to retrieve Firebase ID token");
        return;
      }

      // step-4: get fcm token
      const fcmToken = await getFCMToken();

      // step-5: get device information
      const deviceInformation = getDeviceInfo();

      // step-6: call login api
      const payload = {
        idToken: firebaseIdToken,
        deviceInfo: {
          fcmToken: fcmToken || "",
          deviceName: deviceInformation?.browser || "",
        },
      };

      const response = await loginUser(payload).unwrap();

      // step-7: store user data & push to dashboard route
      if (response?.status === ResponseStatusType.SUCCESS) {
        dispatch(setUser(response?.data));
        SuccessToast("Login successful", "Explore all available features");

        if (!response?.data?.isProfileComplete) {
          router.push("/role-selection");
        } else {
          // Check if specialist is waiting for approval
          const hasSpecialistCategoryId = response?.data?.specialistCategoryId !== null && response?.data?.specialistCategoryId !== undefined;

          if (
            hasSpecialistCategoryId &&
            response?.data?.specialistAccountReviewStatus === AccountReviewStatus.IN_PROGRESS
          ) {
            router.push("/specialist/account-review");
          } else {
            const roleBasedDashboard = getDashboardPath(
              response?.data?.roles || []
            );

            const finalRedirect =
              redirectPath && redirectPath !== "/"
                ? redirectPath
                : roleBasedDashboard;

            router.push(finalRedirect);
          }
        }
      }
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err, "Login failed");
      ErrorToast(errMsg);
    } finally {
      setLoadingType(null);
      setIsFirebaseLoading(false);
      setLoginFormData({
        email: "",
        password: "",
      });
    }
  };

  // google login function
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      setLoadingType(AuthLoadingType.GOOGLE);
      setIsFirebaseLoading(true);

      // step-1: google login
      const { user, error: googleLoginError } = await googleLogin();

      if (googleLoginError || !user) return;

      // step-2: get firebase id token
      const firebaseIdToken = await user.getIdToken();

      if (!firebaseIdToken) {
        ErrorToast("Failed to retrieve Firebase ID token");
        return;
      }

      // step-3: get fcm token
      const fcmToken = await getFCMToken();

      // step-4: get device information
      const deviceInformation = getDeviceInfo();

      // step-5: call login api
      const payload = {
        idToken: firebaseIdToken,
        deviceInfo: {
          fcmToken: fcmToken || "",
          deviceName: deviceInformation?.browser || "",
        },
      };

      const response = await loginUser(payload).unwrap();

      // step-6: store user data & push to dashboard route
      if (response?.status === ResponseStatusType.SUCCESS) {
        dispatch(setUser(response?.data));
        SuccessToast("Login successful", "Explore all available features");
        

        if (!response?.data?.isProfileComplete) {
          router.push("/role-selection");
        } else {
          const roleBasedDashboard = getDashboardPath(
            response?.data?.roles || []
          );

          const finalRedirect =
            redirectPath && redirectPath !== "/"
              ? redirectPath
              : roleBasedDashboard;

          router.push(finalRedirect);
        }
      }
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err, "Login failed");
      ErrorToast(errMsg);
    } finally {
      setLoadingType(null);
      setIsFirebaseLoading(false);
    }
  };

  const isLoading = isLoginUserLoading || isFirebaseLoading;

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="demo@dinedocket.com"
            className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800"
            value={loginFormData?.email}
            onChange={handleOnchange}
          />

          {loginFormError?.email?._errors[0] && (
            <p className="text-red-500 text-sm mt-1">
              {loginFormError.email._errors[0]}
            </p>
          )}
        </div>

        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 pr-12"
              value={loginFormData?.password}
              onChange={handleOnchange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>

          {loginFormError?.password?._errors[0] && (
            <p className="text-red-500 text-sm mt-1">
              {loginFormError.password._errors[0]}
            </p>
          )}
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Login button */}
        <div>
          <button
            type="submit"
            disabled={isLoading && loadingType === AuthLoadingType.LOGIN}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && loadingType === AuthLoadingType.LOGIN ? (
              <Spinner color={SpinnerColor.WHITE} size={SpinnerSize.SMALL} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
