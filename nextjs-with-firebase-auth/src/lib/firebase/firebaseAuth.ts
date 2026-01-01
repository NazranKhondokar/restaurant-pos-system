import { ErrorToast } from "@/helpers/ToastHelper";
import { auth } from "@/lib/firebase/firebase.config";

import {
  ActionCodeSettings,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const actionCodeSettings: ActionCodeSettings = {
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/email-verification-successful`, // Redirect after clicking email
  handleCodeInApp: true,
};

export const registrationWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    let errMsg = "Firebase registration failed";

    // Check for email already exists error
    if (
      (error as { code?: string })?.code === "auth/email-already-in-use" ||
      (error as { message?: string })?.message?.includes("EMAIL_EXISTS")
    ) {
      errMsg = "This email has already exist. Please login";
    } else if (error instanceof Error) {
      errMsg = error.message;
    }

    ErrorToast(errMsg);
    return { user: null, error };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    // set persistence based on remember me option
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { user: userCredential.user, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Firebase login failed";

    ErrorToast(errMsg);
    return { user: null, error };
  }
};

export const googleLogin = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Firebase google login failed";

    ErrorToast(errMsg);
    return { user: null, error };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Firebase logout failed";

    ErrorToast(errMsg);
    return { success: false, error };
  }
};

export const verifyEmail = async () => {
  const user = auth.currentUser;

  if (!user) {
    ErrorToast("Currently no user is found");
    return { success: false, error: "Currently no user is currently found" };
  }

  try {
    await sendEmailVerification(user, actionCodeSettings);
    return { success: true, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "Failed to sent email verification link";

    ErrorToast(errMsg);
    return { success: false, error };
  }
};
