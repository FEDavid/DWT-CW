// NotificationButton.jsx
// Import styles
import "../assets/css/App.css";

// Import components
import CardTitle from "./ui/CardTitle_component";

// Import functions
import { sendImmediateNotification } from "../utils/notifications"

function Notification_component() {
    return (
        <section className="card">
            <CardTitle title="Notification test" icon="notifications" />
            <p className="body-text">Sends an immediate notifcation to test the notification API is currently functioning.</p>
            <div className="seperator"></div>
            <button className="primary-btn" onClick={() => sendImmediateNotification("Notifications are setup!")}>
                Send Test Notification
            </button>
        </section>
    );
}

export default Notification_component;