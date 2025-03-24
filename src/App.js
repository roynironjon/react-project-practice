import { useState, useEffect } from "react";
import Loader from "./components/loader"; 
import AppRoutes from "./routes"; // Import your routes

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a delay of 2 seconds
  }, []);

  return loading ? <Loader /> : <AppRoutes />; // Show Loader first, then routes
}

export default App;
