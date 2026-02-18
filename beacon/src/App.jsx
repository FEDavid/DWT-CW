// Import styles
import "./assets/css/App.css";

// Import images
import logo from "./assets/images/logo_light-green.png";

// Import components
import ThemeToggle from "./components/ThemeToggle";
import NotificationTest from "./components/NotificationTest";
import GeolocateTest from "./components/GeolocateTest";

// Import hooks
function App() {
  return (
    <div className="app">

      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Beacon Logo" className="logo" />
          <h1 className="poppins-bold">Beacon</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="container">
        <section className="card">
          <h2>Primary Action</h2>
          <p>This is where your emergency trigger would live.</p>
          <button className="primary-btn">
            Trigger Beacon
          </button>
        </section>

        {/* Notification test */}
        <section className="card">
          <h2>Notification test</h2>
          <NotificationTest />
        </section>

        {/* Geolocate test */}
        <section className="card">
          <h2>Geolocation</h2>
          <GeolocateTest />
        </section>

      </main>

    </div>
  );
}

export default App;
