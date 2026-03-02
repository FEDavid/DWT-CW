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
    const registration = await setupNotifications();
    if (!registration) return;

    await registration.showNotification("Beacon", {
        body: message,
    });
}