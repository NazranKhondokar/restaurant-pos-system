importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js"
);

// Firebase configuration
firebase.initializeApp({
  apiKey: "dummy",
  authDomain: "dummy.firebaseapp.com",
  projectId: "dummy",
  storageBucket: "dummy.firebasestorage.app",
  messagingSenderId: "dummy",
  appId: "dummy",
  measurementId: "dummy",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Background messages handler
messaging.onBackgroundMessage((payload) => {
  console.log("FCM Background Message: ", payload);

  // Customize notification here
  // const notificationTitle =
  //   payload?.notification?.title || "NexaDocs  Notification";
  // const notificationOptions = {
  //   body: payload?.notification?.body || "You have a new notification",
  //   icon: "/images/logo_n.png",
  // };

  const notificationTitle = payload?.data?.title || "NexaDocs  Notification";
  const notificationOptions = {
    body: payload?.data?.body || "You have a new notification",
    icon: "/images/logo_n.png",
    data: {
      url: payload.data?.url || "/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// handle click on notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
