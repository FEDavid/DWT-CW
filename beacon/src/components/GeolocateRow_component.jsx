// GeolocateRow.jsx
// Import styles
import "../assets/css/App.css";

// Import components
import Webcam_component from "./Webcam_component";

// Import utils
import { db } from "../utils/indexDB";
import { sendImmediateNotification } from "../utils/notifications";

// Import hooks
import { useState } from "react";

// GeolocateRow.jsx
function GeolocateRow_component({ id, title, latitude, longitude, timestamp, image }) {

    // Referencing
    // https://stackoverflow.com/questions/1801732/how-do-i-link-to-google-maps-with-a-particular-longitude-and-latitude
    const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`

    const [showCamera, setShowCamera] = useState(false);

    return (
        <>
            {/* Camera Modal */}
            {showCamera && (
                <Webcam_component
                    onCapture={async (imageData) => {
                        await db.locations.update(id, { image: imageData });
                        sendImmediateNotification("Image updated.");
                        setShowCamera(false);
                    }}
                    onClose={() => setShowCamera(false)}
                />
            )}

            {/* Geolocate Card */}
            <div className="geolocate-card">
                {/* Geolocate Image */}
                <div className="geolocate-image">
                    <img
                        onClick={() => {
                            console.log("clicked");
                            setShowCamera(true);
                        }}
                        src={image || "https://www.uws.ac.uk/media/1389/paisley_storie_streetjpg.png?width=830&height=585&v=1dab698728935d0"}
                        alt="Map"
                    />
                </div>
                {/* Geolocate Text */}
                <div className="geolocate-text">
                    {/* Title */}
                    <p className="geolocate-title">{title}</p>
                    {/* Coordinates */}
                    <div className="geolocate-cell-cood">
                        <p>Lat: {latitude}</p>
                        <p>Long: {longitude}</p>
                    </div>
                    {/* Meta information */}
                    <div className="geolocate-meta">
                        <p className="geolocate-id">ID: {id}</p>
                        <p className="geolocate-cell">Timestamp: {timestamp}</p>
                    </div>
                    {/* Buttons */}
                    <div className="geolocate-btns">
                        {/* Open Google Maps button */}
                        <button className="primary-btn geolocate-cell-btn" onClick={() => window.open(mapLink, '_blank')}>Open Google Maps</button>
                        {/* Delete item button */}
                        <button className="primary-btn danger-btn geolocate-delete" onClick={async () => {
                            // Arrow function to delete location from db, which will trigger re-render of component due to useLiveQuery hook
                            await db.locations.delete(id);
                            sendImmediateNotification("Location deleted.");
                        }}><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                delete_forever
                            </span>
                        </button>
                        {/* Edit item button */}
                        <button className="primary-btn geolocate-edit" onClick={async () => {
                            // Arrow function to call a prompt (can be replaced with modal or whatever) to enter new title
                            const newTitle = prompt("Enter new title for location:", title);
                            // Check user has actually entered something and not just pressed "OK" or entered whitespace
                            if (newTitle && newTitle.trim() !== "") {
                                await db.locations.update(id, { title: newTitle });
                                sendImmediateNotification("Location updated.")
                            }
                        }}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeolocateRow_component;