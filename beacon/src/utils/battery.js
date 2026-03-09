import { sendImmediateNotification } from "./notifications"

export async function checkBatteryWarning() {
    // If battery permission not setup, do nothing
    if (!("getBattery" in navigator)) return;

    const battery = await navigator.getBattery();
    if (battery.level <= 0.15 && !battery.charging) {
        await sendImmediateNotification(
            "Battery is getting low. Consider logging another location soon."
        );
    }
}