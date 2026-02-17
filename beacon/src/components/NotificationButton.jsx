// Import styles
import "../assets/css/App.css";

function NotificationTest() {

    const handleNotify = () => {
        // Check permission first, request if not granted
        if (Notification.permission === "granted") {
            new Notification("Hello!", { body: "This is a test notification" });
        } else {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Hello!", { body: "This is a test notification" });
                }
            });
        }
    };

    return (
        <button className="primary-btn" onClick={handleNotify}>
            Send Test Notification
        </button>
    );
}

export default NotificationTest;