import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import type { LatLngTuple, LatLngBoundsExpression } from "leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Clock } from "lucide-react";

// ✅ Load API key from .env
const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

// ✅ Define start and end points
const start: LatLngTuple = [49.41461, 8.681495];
const end: LatLngTuple = [49.420318, 8.687872];

// ✅ ORS GeoJSON Response Type
interface ORSResponse {
  features: Array<{
    geometry: {
      coordinates: number[][];
    };
    properties: {
      summary: {
        distance: number;
        duration: number;
      };
    };
  }>;
}

const FitBounds = ({ bounds }: { bounds: LatLngBoundsExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [bounds, map]);
  return null;
};

const MapView = () => {
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.post<ORSResponse>(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [start[1], start[0]],
              [end[1], end[0]],
            ],
          },
          {
            headers: {
              Authorization: ORS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const geometry: LatLngTuple[] = res.data.features[0].geometry.coordinates.map(
          ([lon, lat]: number[]) => [lat, lon]
        );

        const summary = res.data.features[0].properties.summary;
        setRoute(geometry);
        setDistance((summary.distance / 1000).toFixed(1) + " km");
        setDuration(Math.round(summary.duration / 60) + " mins");
      } catch (err) {
        console.error("Failed to fetch route from ORS", err);
      }
    };

    fetchRoute();
  }, []);

  return (
    <div className="relative">
      <MapContainer
        center={start}
        zoom={14}
        style={{ height: "24rem", width: "100%" }}
        scrollWheelZoom={true}
        className="rounded-lg overflow-hidden"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={start} />
        <Marker position={end} />
        {route.length > 0 && (
          <>
            <Polyline positions={route} pathOptions={{ color: "blue" }} />
            <FitBounds bounds={[start, end]} />
          </>
        )}
      </MapContainer>

      {/* Map Info Overlays */}
      <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-700">Pickup Location</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-gray-700">Destination</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2 text-sm">
          <Navigation className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">{distance}</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="text-gray-700">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
