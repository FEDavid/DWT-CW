// service-worker.js
self.addEventListener("install", (event) =>{
    console.log("Service worker installing...");
// Put your code for caching assets, etc. here
});

// Handles what happens when the user taps the notification
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("/") // opens the app when notification is tapped
    );
});

// Listens for "Period sync" event to register, then triggers a periodic 30 minute timer
self.addEventListener("periodicsync", (event) => {
  event.waitUntil(
    self.registration.showNotification("Beacon", {
      body: "Don't forget to log your location!",
      icon: "/icons/logo.png",
    })
  );
});