// GeolocateTest.jsx
// Import styles
import "../assets/css/App.css";

// import components
import GeolocateRow from "./GeolocateRow";

// import hooks
import { useEffect, useState } from "react";

function GeolocateTest() {
    // Store array of location records instead of single values
    const [locations, setLocations] = useState([]);

    // Loading GPS data takes a second so adding loader
    const [isLoading, setIsLoading] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("locations");
        if (saved) {
            setLocations(JSON.parse(saved));
        }
    }, []); // empty dependency array = runs once on mount

    // Save to localStorage whenever locations changes
    useEffect(() => {
        if (locations.length > 0) {
            localStorage.setItem("locations", JSON.stringify(locations));
        }
    }, [locations]); // runs whenever locations array changes

    // Get current location and add to array
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setIsLoading(true); // show loading state
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timestamp: new Date(position.timestamp).toLocaleString('en-GB')
                    };
                    setLocations([...locations, newLocation]);
                    setIsLoading(false); // hide loading state
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setIsLoading(false);
                    alert("Failed to get location");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Clear all saved locations
    const handleClearLocations = () => {
        setLocations([]);
        localStorage.removeItem("locations");
    }

    return (
        <div>
            <div className="button-row">
                <button className="primary-btn" onClick={handleGetLocation} disabled={isLoading}>
                    {isLoading && <div className="loader"></div>}
                    {isLoading ? "Getting location.." : "Get Current Location"}
                </button>
                <button className="primary-btn danger-btn" onClick={handleClearLocations}>
                    Clear Locations
                </button>
            </div>

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
        </div>
    );
}

export default GeolocateTest;