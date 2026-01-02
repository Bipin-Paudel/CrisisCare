import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const Requestresource = () => {
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ User location state
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("https://crisis-care.onrender.com/requests").then((r) => r.json()),
      fetch("https://crisis-care.onrender.com/resources").then((r) => r.json()),
    ])
      .then(([reqs, dons]) => {
        setRequests(reqs);
        setDonors(dons);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load map data.");
        setLoading(false);
      });

    // ✅ Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          // Fallback if permission denied
          setUserLocation([27.7172, 85.324]); // Kathmandu
        }
      );
    } else {
      setUserLocation([27.7172, 85.324]); // Kathmandu fallback
    }
  }, []);

  const getMarkerIcon = (type) =>
    new L.Icon({
      iconUrl:
        type === "request"
          ? "https://www.svgrepo.com/show/283135/maps-and-flags-pin.svg"
          : "https://www.svgrepo.com/show/282387/maps-and-flags-pin.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-600">Loading map data…</div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ================= SIDEBAR ================= */}
          <aside className="lg:w-[380px] bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 text-center">
              Requests & Resources
            </h2>

            {/* Requests */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-2">
                Requests
              </h3>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {requests.length === 0 ? (
                  <p className="text-sm text-slate-500">No requests found.</p>
                ) : (
                  requests.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-md border border-slate-200 p-3 text-sm bg-slate-50"
                    >
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-slate-600">
                        {r.request_type} • {r.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-green-600 mb-2">
                Resources
              </h3>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {donors.length === 0 ? (
                  <p className="text-sm text-slate-500">No resources found.</p>
                ) : (
                  donors.map((d) => (
                    <div
                      key={d.id}
                      className="rounded-md border border-slate-200 p-3 text-sm bg-slate-50"
                    >
                      <p className="font-medium">{d.resource_type}</p>
                      <p className="text-xs text-slate-600">
                        {d.location_lat}, {d.location_lon}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* ================= MAP ================= */}
          <section className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <MapContainer
              center={userLocation || [27.7172, 85.324]}
              zoom={13}
              className="h-[420px] lg:h-[600px] w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* ✅ User location marker */}
              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>
                    <p className="text-sm font-semibold">📍 You are here</p>
                  </Popup>
                </Marker>
              )}

              {requests.map((r) => (
                <Marker
                  key={`r-${r.id}`}
                  position={[r.location_lat, r.location_lon]}
                  icon={getMarkerIcon("request")}
                >
                  <Popup>
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{r.title}</p>
                      <p>{r.description}</p>
                      <Link
                        to={`/donate/${r.id}`}
                        className="inline-block mt-2 px-3 py-1.5 bg-blue-700 text-white rounded-md text-xs font-semibold hover:bg-blue-800"


                      >
                        Donate Now
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {donors.map((d) => (
                <Marker
                  key={`d-${d.id}`}
                  position={[d.location_lat, d.location_lon]}
                  icon={getMarkerIcon("donor")}
                >
                  <Popup>
                    <p className="text-sm font-medium">{d.resource_type}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Requestresource;
