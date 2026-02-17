// NotificationButton.jsx
// Import styles
import "../assets/css/App.css";

function NotificationTest() {

    const handleNotify = (message) => {
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((sw) => {
                sw.showNotification("Beacon", { body: message });
            });
        } else {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    navigator.serviceWorker.ready.then((sw) => {
                        sw.showNotification("Beacon", { body: message });
                    });
                }
            });
        }
    };

    return (
        <div>
            <button className="primary-btn" onClick={() => handleNotify("Hello test")}>
                Send Test Notification
            </button>
        </div>
    );
}

export default NotificationTest;