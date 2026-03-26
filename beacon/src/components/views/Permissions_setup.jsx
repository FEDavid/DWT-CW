// beacon\src\components\Permissions_setup.jsx

// Import styles
import "../../assets/css/App.css";

// Import components
import HeaderComponent from "../ui/Header_component";
import FooterComponent from "../ui/Footer_component";
import NotificationComponent from "../Notification_component";
import GeolocateComponent from "../Geolocate_component";
import ReminderComponent from "../Reminder_component";

export default function PermissionsSetup() {
  return (
    <div className="app">

      {/* Header */}
      <HeaderComponent />

      <main className="container">
        {/* Reminder component */}
        <ReminderComponent />

        {/* Notification test */}
        <NotificationComponent />

        {/* Geolocate test */}
        <GeolocateComponent />
      </main>

      {/* Footer */}
      <FooterComponent />

    </div>
  );
}