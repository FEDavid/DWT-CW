// Import styles
import "../assets/css/App.css";
import { useState, useEffect } from "react";
    
function NotificationTest() {
    const [status, setStatus] = useState("");

    const handleNotify = (message) => {
        // Display permission state on screen instead of console
        setStatus("Permission: " + Notification.permission);
        if (Notification.permission === "granted") {
            new Notification("Hello!", { body: message });
        } else {
            Notification.requestPermission().then((permission) => {
                setStatus("Permission: " + permission);
                if (permission === "granted") {
                    new Notification("Hello!", { body: message });
                }
            });
        }
    };

    return (
        <div>
            <button className="primary-btn" onClick={() => handleNotify("Hello test")}>
                Send Test Notification
            </button>
            {/* Temporary debug display */}
            <p>{status}</p>
        </div>
    );
}

export default NotificationTest;