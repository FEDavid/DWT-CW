import { setupNotifications } from "./notifications";

export async function trackingReminder() {
    // Confirming permissions are setup first
    const registration = await setupNotifications();
    if (!registration) return;

    // Confirming period sync exists in service worker
    if (!("periodicSync" in registration)) {
        console.log("Periodic Sync not supported");
        return;
    }

    // Registering new task
    await registration.periodicSync.register("location-reminder", {
        // milliseconds * seconds * minutes * hours
        // Runs every 12 hours
        minInterval: 1000 * 60 * 60 * 12,
    });
    console.log("Reminder registered");
}