
import { useEffect, useRef } from "react";
import { MapPin, Navigation, Clock } from "lucide-react";

const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where Google Maps would be initialized
    console.log("Map component mounted - ready for Google Maps integration");
  }, []);

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden"
      >
        {/* Placeholder for Google Maps */}
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
          <p className="text-gray-600 text-sm">Google Maps integration ready</p>
        </div>
        
        {/* Mock map elements */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Pickup Location</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">Destination</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">15.2 km</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-gray-700">25 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
