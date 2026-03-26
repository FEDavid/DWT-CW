export async function setupNotifications() {
    // If no service worker present, abandon
    if (!("serviceWorker" in navigator)) return null;
    const registration = await navigator.serviceWorker.ready;

    // If notifications permission not setup, request permission
    let permission = Notification.permission;
    if (permission !== "granted") {
        permission = await Notification.requestPermission();
    }

    // If notifications permission anything other than granted, abandon
    if (permission !== "granted") return null;

    return registration;
}

export async function sendImmediateNotification(message) {
    if (!("serviceWorker" in navigator)) return;
    const registration = await navigator.serviceWorker.ready;
    if (!registration.active) return;

    console.log("SW registration:", registration);
    console.log("Notification permissions: " + Notification.permission);

    registration.showNotification("Beacon", {
        body: message,
        tag: "test-notification",
        renotify: true,
    });

    registration.active.postMessage({
        type: "SHOW_NOTIFICATION",
        message,
    });

    console.log("Notification call completed");
}