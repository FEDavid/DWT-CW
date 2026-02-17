// Import styles
import "../assets/css/App.css";

function NotificationTest() {

    const handleNotify = (message) => {
        // Check permission first, request if not granted
        if (Notification.permission === "granted") {
            new Notification("Hello!", { body: message });
        } else {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Hello!", { body: message });
                }
            });
        }
    };

    return (
        <button className="primary-btn" onClick={() => handleNotify("Hello test")}>
            Send Test Notification
        </button>
    );
}

export default NotificationTest;