// NotificationButton.jsx
// Import styles
import "../assets/css/App.css";

// Import functions
import { sendImmediateNotification } from "../utils/notifications"

function NotificationTest() {
    return (
        <div>
            <button className="primary-btn" onClick={() => sendImmediateNotification("Hello test")}>
                Send Test Notification
            </button>
        </div>
    );
}

export default NotificationTest;