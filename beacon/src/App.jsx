// Import styles
import "./assets/css/App.css";

// Import images
import logo from "./assets/images/logo_light-green.png";

// Import hooks
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="app">

      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Beacon Logo" className="logo" />
          <h1 className="poppins-bold">Beacon</h1>
        </div>
        <button
          className="toggle-btn"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          <span className="material-symbols-outlined">
            contrast
          </span>
        </button>
      </header>

      <main className="container">
        <section className="card">
          <h2>Primary Action</h2>
          <p>This is where your emergency trigger would live.</p>
          <button className="primary-btn">
            Trigger Beacon
          </button>
        </section>

        <section className="card">
          <h2>Status Panel</h2>
          <p>Location synced. Last update 12:03.</p>
          <div className="alert">
            Emergency signal sent.
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
