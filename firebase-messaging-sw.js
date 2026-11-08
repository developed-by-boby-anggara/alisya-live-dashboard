importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAFiQ_IfBDRKU66J6zZLiORhpuODD71kg4",
  authDomain: "alisya-live-db.firebaseapp.com",
  databaseURL: "https://alisya-live-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alisya-live-db",
  storageBucket: "alisya-live-db.firebasestorage.app",
  messagingSenderId: "409499788186",
  appId: "1:409499788186:web:63500185b22d83a9ded023"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Menangkap push notification saat HP mati/layar terkunci
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification ? payload.notification.title : "🌸 Alisya Schedule";
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : "Ada pengingat baru untukmu!",
    icon: "https://api.iconify.design/noto:cherry-blossom.svg",
    badge: "https://api.iconify.design/noto:cherry-blossom.svg",
    vibrate: [200, 100, 200],
    data: { url: payload.data ? payload.data.url : "./Al.html" }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./Al.html');
    })
  );
});
