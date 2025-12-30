import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const Donate = () => {
  const [resourceType, setResourceType] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [latLng, setLatLng] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const expiryTime = localStorage.getItem("tokenExpiry");

    if (!storedToken || new Date().getTime() > expiryTime) {
      setError("Session expired. Please log in again.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatLng([latitude, longitude]);
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLatLng([27.6766, 84.4322]);
          setLocation("Latitude: 27.6766, Longitude: 84.4322");
        }
      );
    }
  }, []);

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        setLatLng([e.latlng.lat, e.latlng.lng]);
        setLocation(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
      },
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset success message

    if (!token) {
      setError("You are not authenticated. Please log in.");
      return;
    }

    const donationData = {
      resource_type: resourceType,
      location_lat: latLng[0],
      location_lon: latLng[1],
      description,
    };

    try {
      const response = await axios.post("https://crisis-care.onrender.com/resources", donationData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);

      // Set success message and reset form
      setSuccessMessage("Resource donated successfully! Thank you for your support.");
      setResourceType("");
      setLocation(`Latitude: ${latLng[0]}, Longitude: ${latLng[1]}`);
      setDescription("");

      // Redirect to home page after showing success message
      setTimeout(() => {
        navigate("/"); // Redirect to the home page after 2 seconds
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting donation:", error);
      setError("Failed to submit donation. Please try again.");
    }
  };

  if (!latLng) return <div>Loading your location...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Donate Resources</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a resource</option>
          <option value="Food">Food</option>
          <option value="Medicine">Medicine</option>
          <option value="Clothes">Clothes</option>
          <option value="Shelter">Shelter</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          value={location}
          className="w-full p-2 border rounded"
          readOnly
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description (optional)"
          className="w-full p-2 border rounded"
        />
        
        {error && <div className="text-red-600 text-center mb-2">{error}</div>} {/* Error message */}
        {successMessage && <div className="text-green-600 text-center mb-2">{successMessage}</div>} {/* Success message */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Donate Now
        </button>
      </form>

      <MapContainer center={latLng} zoom={13} style={{ height: "400px", width: "100%", marginTop: "20px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
        <Marker position={latLng}>
          <Popup>Lat: {latLng[0]}, Lng: {latLng[1]}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Donate;



