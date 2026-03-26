import { setupNotifications } from "./notifications";
import { sendImmediateNotification } from "./notifications";

// Sets up reminders
export async function trackingReminder() {
    // Confirming permissions are setup first
    const registration = await setupNotifications();
    if (!registration) return;

    // Confirming period sync exists in service worker
    if (!("periodicSync" in registration)) {
        console.log("Periodic Sync not supported");
        sendImmediateNotification("Reminders unavailable in this browser. Please try Google Chrome!");
        return;
    }

    // Registering new task
    await registration.periodicSync.register("location-reminder", {
        // milliseconds * seconds * minutes * hours
        // Runs every 12 hours
        minInterval: 1000 * 60 * 60 * 12,
    });
    console.log("Reminder registered");

    sendImmediateNotification("Reminders registered!");
}