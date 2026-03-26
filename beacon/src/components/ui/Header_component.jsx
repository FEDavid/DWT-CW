// beacon\src\components\ui\Header_component.jsx

// Import styles
import "../../assets/css/App.css";

// Import images
import logo from "../../assets/images/logo_light-green.png";

// Import components
import ThemeToggle from "../ThemeToggle_component";

export default function Header_component() {
  return (
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Beacon Logo" className="logo" />
          <h1 className="poppins-bold">Beacon</h1>
        </div>
        <ThemeToggle />
      </header>

  );
}