// beacon\src\components\Permissions_notsetup.jsx
// Import styles
import "../../assets/css/App.css";

// Import components
import HeaderComponent from "../ui/Header_component";
import Footercomponent from "../ui/Footer_component";

// Import hooks
import { useEffect, useState } from "react";

export default function PermissionsNotSetup({ onReady }) {

  // Render state helper
  const renderStatus = (state) => {
    if (state === null) return "Not checked";
    if (state === true) return "Enabled";
    return "Not available";
  };

  const renderIcon = (state) => {
    if (state === null) return "help";
    if (state === true) return "check_circle";
    return "cancel";
  }

  // States for permissions
  const [isNotificationsSetup, setNotificationsUp] = useState(null);
  const [isGeolocateSetup, setGeolocateUp] = useState(null);
  const [isBatteryAvailable, setBatteryIsAvailable] = useState(null);

  const permissionsArray = [
    { name: "Notifications", state: isNotificationsSetup },
    { name: "Geolocation", state: isGeolocateSetup },
    { name: "Battery", state: isBatteryAvailable }
  ];

  // Manage neccesary permissions
  const setupPermissions = async () => {

    // Battery
    // If battery API available, update state
    if ("getBattery" in navigator) {
      setBatteryIsAvailable(true)
    } else {
      setBatteryIsAvailable(false)
    }

    // Notifications
    // If notifications permission not setup, request permission
    let notificationPermission = Notification.permission;
    if (notificationPermission !== "granted") {
      notificationPermission = await Notification.requestPermission();
    }

    // If notifications permission anything other than granted, abandon, else set state true
    if (notificationPermission !== "granted") {
      setNotificationsUp(false);
    } else {
      setNotificationsUp(true);
    }

    // GeoLocate
    // First checking geolocate is supported
    if (!navigator.geolocation) {
      setGeolocateUp(false);
      return;
    }

    // If it's supported, we then trigger it to get the permission check - and based on if it gives us a position or error we proceed
    let geolocatePermission = navigator.geolocation
    geolocatePermission.getCurrentPosition(
      (position) => {
        setGeolocateUp(true);
      },
      (error) => {
        setGeolocateUp(false);
      }
    );
  };

  // Now check all 3 states and if all 3 are true, we move on.
  useEffect(() => {
    if (
      isNotificationsSetup === true &&
      isGeolocateSetup === true &&
      isBatteryAvailable === true
    ) {
      onReady();
    }
  }, [isNotificationsSetup, isGeolocateSetup, isBatteryAvailable]);

  // Check permissions on load
  useEffect(() => {
    // Notifications
    if (Notification.permission === "granted") {
      setNotificationsUp(true);
    } else if (Notification.permission === "denied") {
      setNotificationsUp(false);
    }

    // Geolocation
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setGeolocateUp(true);
        } else if (result.state === "denied") {
          setGeolocateUp(false);
        }
      });
    }

    // Battery
    if ("getBattery" in navigator) {
      setBatteryIsAvailable(true);
    } else {
      setBatteryIsAvailable(false);
    }
  }, []);

  return (
    <div className="app">
      
      {/* Header */}
      <HeaderComponent />
      
      <main className="container">

        <div className="card">
          <h1 className="card-title">Permissions required</h1>
          <p className="body-text">In order for the application to function, permission to - access your geolocation data, send notifications to you, and view your battery data are needed.</p>
          <div className="seperator"></div>

          {/* Conditionally show currently verified states */}
          <div className="permission-status">
            {permissionsArray.map((permission) => (
              <div className="permission-row" key={permission.name}>
                <p>{permission.name}:</p>
                <p>{renderStatus(permission.state)}</p>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{renderIcon(permission.state)}</span>
              </div>
            ))}
          </div>

          {/* Button to check permissions */}
          <button className="primary-btn" onClick={setupPermissions}>Enable</button>
        </div>


      </main>

      {/* Footer */}
      <Footercomponent />

    </div>
  );
}