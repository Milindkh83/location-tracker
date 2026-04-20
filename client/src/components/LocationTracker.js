import React, { useEffect, useState } from "react";

function LocationTracker() {
  const [message, setMessage] = useState("Fetching location...");

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setMessage("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            time: new Date().toISOString()
          };

          try {
            const response = await fetch(
              "http://localhost:5000/api/location/save-location",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(locationData)
              }
            );

            const result = await response.json();

            if (result.success) {
              setMessage("Location shared successfully");
            } else {
              setMessage("Failed to save location");
            }
          } catch (error) {
            setMessage("Server error");
          }
        },
        (error) => {
          setMessage(error.message);
        }
      );
    };

    getLocation();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default LocationTracker;