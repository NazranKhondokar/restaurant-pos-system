"use client";

import Spinner from "@/components/Spinner/Spinner";
import {
  AuthLoadingType,
  ResponseStatusType,
  SpinnerColor,
  SpinnerSize,
} from "@/enums/Common";
import { useAppDispatch } from "@/redux/reduxHooks";
import {
  useAuthLoginUserMutation,
  useAuthRegisterUserMutation,
} from "@/redux/slices/api/authAPISlice";
import { RegistrationFormData, RegistrationSchema } from "@/schemas/AuthSchema";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ZodFormattedError } from "zod";
import { IoEye, IoEyeOff, FcGoogle } from "@/lib/utils/Icon";
import {
  googleLogin,
  registrationWithEmailAndPassword,
  verifyEmail,
} from "@/lib/firebase/firebaseAuth";
import { ErrorToast, SuccessToast } from "@/helpers/ToastHelper";
import { SetExpireTime } from "@/helpers/SessionHelper";
import { getErrorMessage } from "@/lib/utils/ErrorHelper";
import { getFCMToken } from "@/lib/firebase/firebaseFCM";
import { getDeviceInfo } from "@/lib/utils/GetDeviceInfo";
import { setUser } from "@/redux/slices/sync/userSlice";

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [registrationFormData, setRegistrationFormData] =
    useState<RegistrationFormData>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  const [registrationFormError, setRegistrationFormError] =
    useState<ZodFormattedError<RegistrationFormData> | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<string | null>(null);

  // *** RTK Queries ***
  const [registerUser, { isLoading: isRegisterUserLoading }] =
    useAuthRegisterUserMutation();
  const [loginUser, { isLoading: isLoginUserLoading }] =
    useAuthLoginUserMutation();

  // registration form data change function
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegistrationFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // registration form submit function
  const handleRegistrationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // step-1: registration form validation
    const result = RegistrationSchema.safeParse(registrationFormData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setRegistrationFormError(formattedErrors);
      return;
    }

    setRegistrationFormError(null);

    try {
      setLoadingType(AuthLoadingType.REGISTRATION);
      setIsFirebaseLoading(true);

      // step-2: create firebase user
      const { user, error: registrationError } =
        await registrationWithEmailAndPassword(
          registrationFormData.email,
          registrationFormData.password
        );

      if (registrationError || !user) return;

      // step-3: get firebase id token
      const firebaseIdToken = await user.getIdToken();

      if (!firebaseIdToken) {
        ErrorToast("Failed to retrieve Firebase ID token");
        return;
      }

      // step-4: call registration api
      const payload = {
        firstName: registrationFormData.firstName,
        lastName: registrationFormData.lastName,
        email: registrationFormData.email,
        idToken: firebaseIdToken,
      };
      const response = await registerUser(payload).unwrap();

      // step-5: send email verification link
      if (response?.status === ResponseStatusType.SUCCESS) {
        if (user?.emailVerified) {
          router.push("/login");
        } else {
          setIsFirebaseLoading(true);
          const { success, error: emailVerificationError } =
            await verifyEmail();

          if (emailVerificationError || !success) return;

          SetExpireTime(60);

          SuccessToast(
            "Registration successful",
            "Please check your email for verification link"
          );
          router.push("/email-verification");
        }
      }
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err, "Registration failed");
      ErrorToast(errMsg);
    } finally {
      setLoadingType(null);
      setIsFirebaseLoading(false);
      setRegistrationFormData({
        firstName: "",
        lastName: "",
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
          router.push(redirectPath);
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

  const isLoading =
    isRegisterUserLoading || isLoginUserLoading || isFirebaseLoading;

  return (
    <>
      <form
        className="mt-10 flex flex-col gap-6"
        onSubmit={handleRegistrationSubmit}
      >
        {/* first name & last name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <div className="inputWrapper">
              <label htmlFor="firstName" className="inputLabel">
                First Name<span className="requiredIcon">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="inputField"
                value={registrationFormData?.firstName}
                onChange={handleOnchange}
              />
            </div>

            {registrationFormError?.firstName?._errors[0] && (
              <p className="errorMsg">
                {registrationFormError.firstName._errors[0]}
              </p>
            )}
          </div>

          <div className="">
            <div className="inputWrapper">
              <label htmlFor="lastName" className="inputLabel">
                Last Name<span className="requiredIcon">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="inputField"
                value={registrationFormData?.lastName}
                onChange={handleOnchange}
              />
            </div>

            {registrationFormError?.lastName?._errors[0] && (
              <p className="errorMsg">
                {registrationFormError.lastName._errors[0]}
              </p>
            )}
          </div>
        </div>

        {/* email */}
        <div>
          <div className="inputWrapper">
            <label htmlFor="email" className="inputLabel">
              Email<span className="requiredIcon">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="inputField"
              value={registrationFormData?.email}
              onChange={handleOnchange}
            />
          </div>

          {registrationFormError?.email?._errors[0] && (
            <p className="errorMsg">{registrationFormError.email._errors[0]}</p>
          )}
        </div>

        {/* password */}
        <div>
          <div className="inputWrapper">
            <label htmlFor="password" className="inputLabel">
              Password<span className="requiredIcon">*</span>
            </label>
            <div className="inputPasswordField">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={registrationFormData?.password}
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

          {registrationFormError?.password?._errors[0] && (
            <p className="errorMsg">
              {registrationFormError.password._errors[0]}
            </p>
          )}
        </div>

        {/* btn */}
        <div>
          <button
            type="submit"
            disabled={isLoading && loadingType === AuthLoadingType.REGISTRATION}
            className="w-full primaryBtn"
          >
            {isLoading && loadingType === AuthLoadingType.REGISTRATION ? (
              <Spinner color={SpinnerColor.BLUE} size={SpinnerSize.SMALL} />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        {/* link */}
        <div>
          <p className="authLinkContent">
            Already have an account?{" "}
            <Link href="/login" className="linkBlue">
              Login
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
