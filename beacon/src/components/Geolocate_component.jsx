// GeolocateTest.jsx
// Import styles
import "../assets/css/App.css";

// Import utilities
import { checkBatteryWarning } from "../utils/battery";
import { sendImmediateNotification } from "../utils/notifications";

// Import components
import GeolocateRow from "./GeolocateRow_component";

// Import hooks
import { useEffect, useState } from "react";

function Geolocate_component() {
    // Loading GPS data takes a second so adding loader
    const [isLoading, setIsLoading] = useState(false);

    // Setup setLocations hook and it's default value
    const [locations, setLocations] = useState(() => {
        const saved = localStorage.getItem("locations");
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever locations changes
    useEffect(() => {
        localStorage.setItem("locations", JSON.stringify(locations));
    }, [locations]); // runs whenever locations array changes

    // Get current location and add to array
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            // Show loading state
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                // Async due to battery promise
                async (position) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timestamp: new Date(position.timestamp).toLocaleString('en-GB')
                    };
                    setLocations([...locations, newLocation]);

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
    const handleClearLocations = () => {
        setLocations([]);
        // Although setLocations hook will set "locations" array in storage to empty anyway doing this
        // It is best to remove the item all together as this is data best practice
        localStorage.removeItem("locations");
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
            <div className="geolocate-table">
                <p className="geolocate-header">Coordinates</p>
                <p className="geolocate-header">Timestamp</p>
                <p className="geolocate-header map-link-header">Map link</p>
                <div className="seperator"></div>
                {/* Map over locations array to create rows */}
                {locations.map((location, index) => (
                    <GeolocateRow
                        key={index}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        timestamp={location.timestamp}
                    />
                ))}
            </div>
        </section>
    );
}

export default Geolocate_component;