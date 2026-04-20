import React, { useEffect, useState } from "react";

function LocationTracker() {
  const [message, setMessage] = useState("Fetching location...");

  useEffect(() => {
    const sendLocation = () => {
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
              "https://location-tracker-u1df.onrender.com/api/location/save-location",
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
              setMessage("Location sent at " + new Date().toLocaleTimeString());
            } else {
              setMessage(result.message);
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

    // 👉 first call
    sendLocation();

    // 👉 every 30 minutes (1800000 ms)
    const interval = setInterval(sendLocation, 1800000);

    // 👉 cleanup
    return () => clearInterval(interval);

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default LocationTracker;