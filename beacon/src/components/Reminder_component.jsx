// beacon\src\components\Reminder_component.jsx

// Import styles
import "../assets/css/App.css";

// Import Utilities
import { trackingReminder } from "../utils/reminder"

export default function ReminderComponent() {
    return (
        <section className="card">
            <h1 className="card-title">Setup reminders</h1>
            <p className="body-text">Sets up a periodicSync reminder which will send a notification every 12 hours, reminding you to log your location! If your battery is under 10% when reminding, you will also recieve a notification asking you to log another location soon.</p>
            <div className="seperator"></div>
            <button className="primary-btn" onClick={trackingReminder}>
                Start reminders
            </button>
        </section>
    )
};