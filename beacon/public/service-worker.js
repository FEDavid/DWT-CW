// service-worker.js

// Offline support: Cache essential files for offline use
const CACHE_NAME = "beacon-cache-v1";

// Array of files that make up the app shell, which will be cached for offline access
// As Index calls JS that makes up react app, this is also cached to ensure app loads offline, along with manifest and icons for PWA functionality
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/logo.png",
  "/icons/logo_masked.png"
];

self.addEventListener("install", (event) => {
  console.log("Service worker installing..");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell");
      return cache.addAll(APP_SHELL);
    })
  );
  console.log("Service worker installed");
});

// Each request will be checked to see if the files requested exist in cache, if they do they will be returned, else the request will be made as standard
// We then use dynamic caching to add any new files to the cache as they are requested, so that they will be available offline in the future
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // So this is where dynamic caching happens, if it ain't cached - cache italics - then return the response as normal
        return fetch(event.request).then((networkResponse) => {
          return caches.open("beacon-cache-v1").then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          // If there's an error, return cached root so app doesn't break
        }).catch(() => {
          return caches.match("/");
        });
      })
  );
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