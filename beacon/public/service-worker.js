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