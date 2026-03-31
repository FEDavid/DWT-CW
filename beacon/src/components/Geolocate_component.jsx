// beacon\src\components\Geolocate_component.jsx

// Import styles
import "../assets/css/App.css";

// External libraries
import { useLiveQuery } from "dexie-react-hooks";

// Import utilities
import { checkBatteryWarning } from "../utils/battery";
import { sendImmediateNotification } from "../utils/notifications";

// Import components
import GeolocateRow from "./GeolocateRow_component";

// Import hooks
import { useState } from "react";

// Import utils
import { db } from "../utils/indexDB";

function Geolocate_component() {
    // Loading GPS data takes a second so adding loader
    const [isLoading, setIsLoading] = useState(false);

    // Using useLiveQuery hook to get real-time updates from Dexie database, and fallback to empty array if no data is present
    const locations = useLiveQuery(() => db.locations.toArray()) || [];

    // Get current location and add to db, which will trigger re-render of component due to useLiveQuery hook
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            // Show loading state
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                // Async due to battery promise
                async (position) => {
                    // Add new location to Dexie database, which will trigger re-render of component due to useLiveQuery hook
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timestamp: new Date(position.timestamp).toLocaleString('en-GB'),
                        title: `Location ${new Date().toLocaleTimeString()}`,
                        image: null
                    };
                    await db.locations.add(newLocation);

                    // Check battery
                    await checkBatteryWarning();

                    // Hide loading state
                    setIsLoading(false);

                    sendImmediateNotification("Location logged.")
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    sendImmediateNotification("Failed to get location");
                    // Hide loading state
                    setIsLoading(false);
                }
            );
        } else {
            sendImmediateNotification("Geolocation is not supported by this browser.");
        }
    };

    // Clear all saved locations
    const handleClearLocations = async () => {
        await db.locations.clear();
        sendImmediateNotification("Location data cleared.")
    }

    return (
        <section className="card">
            <h1 className="card-title">Geolocation</h1>
            <p className="body-text">Allows user to store current location, and also open that location on Google maps using a URL query with the latitude and longitude. Also offers option to remove all stored locations!</p>
            <div className="seperator"></div>
            <div className="button-row">
                <button className="primary-btn" onClick={handleGetLocation} disabled={isLoading}>
                    {isLoading && <div className="loader"></div>}
                    {isLoading ? "Getting location.." : "Get Current Location"}
                </button>
                <button className="primary-btn danger-btn" onClick={handleClearLocations}>
                    Clear Locations
                </button>
            </div>
            <div className="seperator"></div>

            {/* Table showing all geolocation data */}
            <div className="geolocate-results">
                {/* Map over locations array to create rows */}
                {locations.map((location) => (
                    <GeolocateRow
                        key={location.id}
                        id={location.id}
                        title={location.title}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        timestamp={location.timestamp}
                        image={location.image}
                    />
                ))}
            </div>
        </section>
    );
}

export default Geolocate_component;