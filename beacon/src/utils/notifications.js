export async function setupNotifications() {
    // Basic environment checks: service worker support and notification support
    if (!("serviceWorker" in navigator)) return null;
    if (!("Notification" in window)) return null;

    // Wait for the service worker to be ready, which ensures that the service worker is active and can handle notifications
    const registration = await navigator.serviceWorker.ready;

    // Check the permissions prior to sending a notification, and if not granted, request permission from the user
    let permission = Notification.permission;
    if (permission !== "granted") {
        permission = await Notification.requestPermission();
    }

    // If notifications permission anything other than granted, abandon
    if (permission !== "granted") return null;

    return registration;
}

export async function sendImmediateNotification(message) {
    // If offline, skip notification
    if (!navigator.onLine) return;

    // Basic environment checks: service worker support, notification support, and permission check
    if (!("serviceWorker" in navigator)) return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    // Try to show the notification and post a message to the service worker, catching any errors that occur
    try {
        const registration = await navigator.serviceWorker.ready;
        if (!registration.active) return;

        await registration.showNotification("Beacon", {
            body: message,
            tag: "test-notification",
            renotify: true,
        });

        registration.active.postMessage({
            type: "SHOW_NOTIFICATION",
            message,
        });

        console.log("Notification call completed");

    } catch (err) {
        console.log("Notification error:", err);
    }
}