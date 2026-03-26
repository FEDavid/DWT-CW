// service-worker.js
self.addEventListener("install", (event) =>{
    console.log("Service worker installing..");
});

// Handles what happens when the user taps the notification buttn
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        // Opens the app when notification is tapped
        clients.openWindow("/") 
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

// Notification listener
self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification("Beacon", {
      body: event.data.message,
      icon: "/icons/logo.png",
    });
    console.log("SW received message:", event.data);
  }
});