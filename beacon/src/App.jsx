// Import styles
import "./assets/css/App.css";

// Import components
import PermissionsNotSetup from "./components/views/Permissions_notsetup";
import PermissionsSetup from "./components/views/Permissions_setup";

// Import hooks
import { useState } from "react";

function App() {
  // Utilising useState hook to manage stored permissions and perform conditional rendering based on state
  const [isReady, setIsReady] = useState(false);

  return isReady
    ? <PermissionsSetup />
    : <PermissionsNotSetup onReady={() => setIsReady(true)} />;
}

export default App;
