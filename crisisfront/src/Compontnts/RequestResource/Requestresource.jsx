import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const Requestresource = () => {
  const [requests, setRequests] = useState([]); // Requests
  const [donors, setDonors] = useState([]); // Donors
  const [loadingRequests, setLoadingRequests] = useState(true); // Loading state for requests
  const [loadingDonors, setLoadingDonors] = useState(true); // Loading state for donors
  const [error, setError] = useState(null);

  // Fetching requests data
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://192.168.1.76:8000/requests");
      if (!res.ok) throw new Error("Failed to fetch requests");
      const requestsData = await res.json();
      setRequests(requestsData);
      setLoadingRequests(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to load requests data. Please try again later.");
      setLoadingRequests(false);
    }
  };

  // Fetching donor data
  const fetchDonors = async () => {
    try {
      const res = await fetch("http://192.168.1.76:8000/resources"); // API endpoint to fetch donor data
      if (!res.ok) throw new Error("Failed to fetch donors");
      const donorsData = await res.json();
      setDonors(donorsData);
      setLoadingDonors(false);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setError("Failed to load donor data. Please try again later.");
      setLoadingDonors(false);
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch requests data on mount
    fetchDonors(); // Fetch donors data on mount
  }, []);

  // Function to get icons for markers (requests and donors)
  const getMarkerIcon = (type) => {
    return new L.Icon({
      iconUrl:
        type === "request"
          ? "https://www.svgrepo.com/show/283135/maps-and-flags-pin.svg" // Red pin for requests
          : "https://www.svgrepo.com/show/282387/maps-and-flags-pin.svg", // Green pin for donors
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  };

  if (loadingRequests || loadingDonors) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-6 flex flex-row-reverse">
      {/* 🔹 Sidebar Section */}
      <div className="w-1/3 bg-white p-4 shadow-md rounded-lg mr-6 border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Requests and Resources</h2>

        <div className="space-y-4">
          {/* Requests List */}
          <div className="border border-gray-200 rounded-lg h-64 overflow-y-auto relative">
            <h3 className="text-center text-lg font-semibold text-red-600 bg-white sticky top-0 p-3 border-b border-gray-300 shadow-sm">
              Requests
            </h3>
            {requests.length === 0 ? (
              <p className="text-gray-500 p-3">No requests found.</p>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="p-2 border-b border-gray-300">
                  <p><strong>ID:</strong> {request.id}</p>
                  <p><strong>Title:</strong> {request.title}</p>
                  <p><strong>Type:</strong> {request.request_type}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                </div>
              ))
            )}
          </div>

          {/* Donors List */}
          <div className="border border-gray-200 rounded-lg h-64 overflow-y-auto relative">
            <h3 className="text-center text-lg font-semibold text-green-600 bg-white sticky top-0 p-3 border-b border-gray-300 shadow-sm">
              Resources
            </h3>
            {donors.length === 0 ? (
              <p className="text-gray-500 p-3">No resources found.</p>
            ) : (
              donors.map((donor) => (
                <div key={donor.id} className="p-2 border-b border-gray-300">
                  <p><strong>ID:</strong> {donor.id}</p>
                  <p><strong>Resource Type:</strong> {donor.resource_type}</p>
                  <p><strong>Location:</strong> {donor.location_lat}, {donor.location_lon}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Map Section */}
      <div className="flex-1">
        <MapContainer
          center={[27.6833907, 84.4348551]}
          zoom={13}
          style={{ height: "600px", width: "100%" }}
          className="mt-4 mx-auto border border-red-500"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Markers for Requests */}
          {requests.map((request) => {
            const { location_lat, location_lon, id, title, description, request_type, status } = request;

            if (isNaN(location_lat) || isNaN(location_lon)) {
              console.error(`Invalid coordinates for request ID: ${id}`);
              return null;
            }

            return (
              <Marker key={id} position={[location_lat, location_lon]} icon={getMarkerIcon("request")}>
                <Popup>
                  <strong>Request ID:</strong> {id} <br />
                  <strong>Title:</strong> {title} <br />
                  <strong>Description:</strong> {description} <br />
                  <strong>Request Type:</strong> {request_type} <br />
                  
                  <br />
                  <Link
                    to={`/donate/${id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                  >
                    Donate Now
                  </Link>
                </Popup>
              </Marker>
            );
          })}

          {/* Markers for Donors */}
          {donors.map((donor) => {
            const { location_lat, location_lon, id, resource_type } = donor;

            if (isNaN(location_lat) || isNaN(location_lon)) {
              console.error(`Invalid coordinates for donor ID: ${id}`);
              return null;
            }

            return (
              <Marker key={id} position={[location_lat, location_lon]} icon={getMarkerIcon("donor")}>
                <Popup>
                  <strong>Donor ID:</strong> {id} <br />
                  <strong>Resource Type:</strong> {resource_type} <br />
                  <strong>Location:</strong> {location_lat}, {location_lon}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Requestresource;
