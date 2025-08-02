
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Truck, Clock, Navigation } from "lucide-react";

interface TrackingData {
  id: string;
  status: "Order Placed" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered";
  location: string;
  estimatedTime: string;
  timestamp: string;
}

const RealTimeTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const mockTrackingData: Record<string, TrackingData> = {
    "DEL001": {
      id: "DEL001",
      status: "In Transit",
      location: "Downtown Distribution Center",
      estimatedTime: "25 minutes",
      timestamp: new Date().toLocaleString()
    },
    "DEL002": {
      id: "DEL002",
      status: "Out for Delivery",
      location: "2.5 km from destination",
      estimatedTime: "10 minutes",
      timestamp: new Date().toLocaleString()
    },
    "DEL003": {
      id: "DEL003",
      status: "Delivered",
      location: "Delivered to recipient",
      estimatedTime: "Completed",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleString()
    }
  };

  const trackPackage = () => {
    setIsTracking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const data = mockTrackingData[trackingId.toUpperCase()];
      setTrackingData(data || null);
      setIsTracking(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Order Placed":
        return "bg-gray-100 text-gray-800";
      case "Picked Up":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-yellow-100 text-yellow-800";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Placed":
        return <Package className="w-4 h-4" />;
      case "Picked Up":
        return <MapPin className="w-4 h-4" />;
      case "In Transit":
        return <Truck className="w-4 h-4" />;
      case "Out for Delivery":
        return <Navigation className="w-4 h-4" />;
      case "Delivered":
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    if (trackingData && trackingData.status !== "Delivered") {
      const interval = setInterval(() => {
        setTrackingData(prev => {
          if (!prev) return null;
          return {
            ...prev,
            timestamp: new Date().toLocaleString()
          };
        });
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [trackingData]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-blue-600" />
          Real-time Tracking
        </CardTitle>
        <CardDescription>
          Track your package in real-time with live location updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter tracking ID (e.g., DEL001)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button 
            onClick={trackPackage}
            disabled={!trackingId || isTracking}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {isTracking ? "Tracking..." : "Track"}
          </Button>
        </div>

        {trackingData ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Package ID: {trackingData.id}</span>
                <Badge className={getStatusColor(trackingData.status)}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(trackingData.status)}
                    <span>{trackingData.status}</span>
                  </div>
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Current Location:</span>
                  <span className="font-medium">{trackingData.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium">{trackingData.estimatedTime}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{trackingData.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
              💡 Live updates every 30 seconds. Your package location is being tracked in real-time.
            </div>
          </div>
        ) : trackingId && !isTracking ? (
          <div className="text-center py-4 text-gray-500">
            No package found with ID: {trackingId.toUpperCase()}
            <br />
            <span className="text-xs">Try: DEL001, DEL002, or DEL003</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default RealTimeTracking;
