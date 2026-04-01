// beacon\src\components\Permissions_setup.jsx

// Import styles
import "../../assets/css/App.css";

// Import components
import HeaderComponent from "../ui/Header_component";
import FooterComponent from "../ui/Footer_component";
import NotificationComponent from "../Notification_component";
import GeolocateComponent from "../Geolocate_component";
import ReminderComponent from "../Reminder_component";

// Import utils
import { isOffline } from "../../utils/offline";

export default function PermissionsSetup() {

  // Call the isOffline function to determine if the app is offline, applied to components which won't function offline
  const offline = isOffline();

  return (
    <div className="app">

      {/* Header */}
      <HeaderComponent />

      <main className="container">
        {/* Reminder component */}
        {!offline && <ReminderComponent />}

        {/* Notification test */}
        {!offline && <NotificationComponent />}

        {/* Geolocate test */}
        <GeolocateComponent />
      </main>

      {/* Footer */}
      <FooterComponent />

    </div>
  );
}