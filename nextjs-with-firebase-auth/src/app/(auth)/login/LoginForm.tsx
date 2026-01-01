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
      <form className="mt-10 flex flex-col gap-6" onSubmit={handleLoginSubmit}>
        {/* email */}
        <div>
          <div className="inputWrapper">
            <label htmlFor="email" className="inputLabel">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="inputField"
              value={loginFormData?.email}
              onChange={handleOnchange}
            />
          </div>

          {loginFormError?.email?._errors[0] && (
            <p className="errorMsg">{loginFormError.email._errors[0]}</p>
          )}
        </div>

        {/* password */}
        <div>
          <div className="inputWrapper">
            <label htmlFor="password" className="inputLabel">
              Password
            </label>
            <div className="inputPasswordField">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginFormData?.password}
                onChange={handleOnchange}
              />
              <div
                className="eyeIconContainer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOff className="eyeIcon" />
                ) : (
                  <IoEye className="eyeIcon" />
                )}
              </div>
            </div>
          </div>

          {loginFormError?.password?._errors[0] && (
            <p className="errorMsg">{loginFormError.password._errors[0]}</p>
          )}
        </div>

        {/* btn */}
        <div>
          <button
            type="submit"
            disabled={isLoading && loadingType === AuthLoadingType.LOGIN}
            className="w-full primaryBtn"
          >
            {isLoading && loadingType === AuthLoadingType.LOGIN ? (
              <Spinner color={SpinnerColor.BLUE} size={SpinnerSize.SMALL} />
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* link */}
        <div>
          <p className="authLinkContent">
            Dont&apos;t have an account?{" "}
            <Link href="/registration" className="linkBlue">
              Sign Up
            </Link>
          </p>
        </div>
      </form>

      <div className="my-10 dividerWrapper">
        <div className="divider"></div>
        <span className="dividerText">Or</span>
        <div className="divider"></div>
      </div>

      {/* google login  */}
      <div>
        <button
          disabled={isLoading && loadingType === AuthLoadingType.GOOGLE}
          className="w-full primaryOutlineBtn"
          onClick={handleGoogleLogin}
        >
          {isLoading && loadingType === AuthLoadingType.GOOGLE ? (
            <Spinner color={SpinnerColor.BLUE} size={SpinnerSize.SMALL} />
          ) : (
            <span className="flex items-center gap-2">
              <FcGoogle className="icon24" /> <span>Continue with Google</span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
