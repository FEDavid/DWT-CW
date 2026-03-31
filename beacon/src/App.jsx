// Import styles
import "./assets/css/App.css";

// External libraries
import Dexie from "dexie";

// Import components
import PermissionsNotSetup from "./components/views/Permissions_notsetup";
import PermissionsSetup from "./components/views/Permissions_setup";

// Import hooks
import { useState } from "react";

// Import utils
import { db } from "./utils/indexDB";

function App() {
  // Utilising useState hook to manage stored permissions and perform conditional rendering based on state
  const [isReady, setIsReady] = useState(false);

  // Setup Dexie database and hooks here so they are available globally
  const db = new Dexie("TasksDatabase");
  db.version(1).stores({
    tasks: "++id, content, completed",
  });

  return isReady
    ? <PermissionsSetup />
    : <PermissionsNotSetup onReady={() => setIsReady(true)} />;
}

export default App;
