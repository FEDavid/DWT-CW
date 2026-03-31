// beacon\src\components\Webcam_component.jsx

// Import styles
import "../assets/css/App.css";

// Import Webcam component
import Webcam from "react-webcam";

// Import hooks
import { useState, useRef, useEffect } from "react";

function Webcam_component({ onCapture, onClose }) {
    const [cameraError, setCameraError] = useState(false);

    const webcamRef = useRef(null);

    const captureImage = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();

            if (imageSrc) {
                onCapture(imageSrc);
            }
        }
    };

    // Disable background scrolling when webcam modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // Handle camera errors (e.g., permission denied, no camera available)
    if (cameraError) {
        return (
            <div className="camera-modal">
                <p>Camera not available or permission denied.</p>
                <button onClick={onClose} className="camera-control-danger">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        cancel
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="camera-modal">
            {/* If webcam is available, display it */}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={720}
                onUserMediaError={() => setCameraError(true)}
            />

            <div className="camera-controls">
                <button onClick={captureImage} className="camera-control">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        camera
                    </span>
                </button>
                <button onClick={onClose} className="camera-control-danger">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        cancel
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Webcam_component;