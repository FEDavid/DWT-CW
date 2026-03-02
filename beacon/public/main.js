// Background/Async function to register the SW that will trigger a new 30 minute timer
async function trackingReminder() {
    const tracking = await navigator.serviceWorker.ready;
    await tracking.periodicSync.register("location-reminder", { // Tag is required by the API
        minInterval: 30 * 60 * 1000 // 30 minutes in milliseconds
    });
}