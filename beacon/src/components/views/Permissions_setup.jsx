// beacon\src\components\Permissions_setup.jsx

// Import hooks
import { useState } from "react";

// Import styles
import "../../assets/css/App.css";

// Import components
import HeaderComponent from "../ui/Header_component";
import FooterComponent from "../ui/Footer_component";
import NotificationComponent from "../Notification_component";
import GeolocateComponent from "../Geolocate_component";
import ReminderComponent from "../Reminder_component";
import ModalComponent from "../SettingsModal_component";

export default function PermissionsSetup() {

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app">

      {/* Header */}
      <HeaderComponent setShowSettings={setShowSettings} />

      <main className="container">

        {/* Modal component */}
        {showSettings && (
          <ModalComponent onClose={() => setShowSettings(false)} />
        )}

        {/* Geolocate test */}
        <GeolocateComponent />
      </main>

      {/* Footer */}
      <FooterComponent />

    </div>
  );
}