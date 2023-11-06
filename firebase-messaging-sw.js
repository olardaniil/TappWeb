importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
    apiKey: "AIzaSyAOQeBb1Tk8egRtGxrLkbqMrZEORZmQ8t8",
    authDomain: "tapp-2c188.firebaseapp.com",
    projectId: "tapp-2c188",
    storageBucket: "tapp-2c188.appspot.com",
    messagingSenderId: "228996556065",
    appId: "1:228996556065:web:42ef78b82602a016b1ca60"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});