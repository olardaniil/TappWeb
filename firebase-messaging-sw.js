importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAOQeBb1Tk8egRtGxrLkbqMrZEORZmQ8t8",
    authDomain: "tapp-2c188.firebaseapp.com",
    projectId: "tapp-2c188",
    storageBucket: "tapp-2c188.appspot.com",
    messagingSenderId: "228996556065",
    appId: "1:228996556065:web:42ef78b82602a016b1ca60"
});
// Necessary to receive background messages:
const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((m) => {
  console.log("onBackgroundMessage", m);
});