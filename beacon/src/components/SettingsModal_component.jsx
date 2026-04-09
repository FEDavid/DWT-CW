// beacon\src\components\Reminder_component.jsx

// Import hooks
import { useEffect, useState } from "react";

// Import styles
import "../assets/css/App.css";

// Import components
import CardTitle from "./ui/CardTitle_component";
import Notification_component from "./Notification_component";
import ReminderComponent from "./Reminder_component";
import { sendImmediateNotification } from "../utils/notifications";

export default function ModalComponent({ onClose }) {

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // Fetch user email from localStorage
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
        }
    }, []);

    useEffect(() => {
        // Save user email to localStorage whenever it changes
        if (userEmail) {
            localStorage.setItem("userEmail", userEmail);
        }
    }, [userEmail]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            {/* Stop propagation ensures the modal doesn't close when clicking inside it by stopping the onClose function from being called */}
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <section className="modal-card">
                    {/* Modal title */}
                    <CardTitle title="Settings" icon="settings" />
                    {/* Email input */}
                    <div className="card email-input">
                        <CardTitle title="Email" icon="email" />
                        <p className="email-display">{userEmail || "No email set"}</p>
                        <span className="email-hint">This email will be used for sending logged locations through EmailJS.</span>
                        <div className="seperator"></div>
                        <button className="primary-btn geolocate-edit" onClick={async () => {
                            // Arrow function to call a prompt to enter new email
                            const newEmail = prompt("Enter new email:", userEmail);
                            // Check user has actually entered something and not just pressed "OK" or entered whitespace
                            if (newEmail && newEmail.trim() !== "") {
                                setUserEmail(newEmail);
                                sendImmediateNotification("Email updated.");
                            }
                        }}>Update Email</button>
                    </div>
                    {/* Notification test button */}
                    <Notification_component />
                    {/* Reminder test button */}
                    <ReminderComponent />
                    <div className="seperator"></div>
                    {/* Close modal button */}
                    <button className="primary-btn" onClick={onClose}>
                        Close
                    </button>
                </section>
            </div>
        </div>
    )
};