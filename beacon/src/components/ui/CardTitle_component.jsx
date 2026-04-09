// beacon\src\components\ui\CardTitle_component.jsx

// Import styles
import "../../assets/css/App.css";

function CardTitle({ title, icon }) {
    return (
        <div className="card-title-container">
            <span className="material-symbols-outlined card-title-icon" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
            <h2 className="card-title">{title}</h2>
            <span class="material-symbols-outlined card-title-icon arrow-icon">arrow_forward_ios</span>
        </div>
    );
}

export default CardTitle;