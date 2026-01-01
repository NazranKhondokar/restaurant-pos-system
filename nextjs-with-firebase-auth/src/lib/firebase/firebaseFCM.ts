import { getToken } from "firebase/messaging";
import { messaging } from "./firebase.config";

export const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.error("Notification permission denied.");
      return null;
    }

    if (!messaging) {
      console.error("Firebase messaging is not supported in this environment.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      // console.log("FCM Token:", token);
      return token;
    } else {
      console.error("Failed to get FCM token.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while getting FCM token:", error);
    return null;
  }
};
