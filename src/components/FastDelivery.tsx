
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Zap, MapPin, Timer } from "lucide-react";

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  timeRange: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

const FastDelivery = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "Reliable and cost-effective delivery",
      timeRange: "2-4 hours",
      price: 0,
      icon: <Truck className="w-5 h-5" />,
      features: ["Real-time tracking", "SMS notifications", "Secure handling"]
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "Faster delivery for urgent packages",
      timeRange: "1-2 hours",
      price: 5,
      icon: <Clock className="w-5 h-5" />,
      features: ["Priority handling", "Real-time tracking", "SMS & email notifications", "Dedicated courier"],
      popular: true
    },
    {
      id: "urgent",
      name: "Urgent Delivery",
      description: "Lightning-fast delivery for critical items",
      timeRange: "30-60 mins",
      price: 15,
      icon: <Zap className="w-5 h-5" />,
      features: ["Immediate pickup", "Direct route", "Real-time tracking", "Live location sharing", "Priority support"]
    }
  ];

  const scheduleDelivery = () => {
    if (selectedOption) {
      const option = deliveryOptions.find(opt => opt.id === selectedOption);
      alert(`Scheduling ${option?.name} - Estimated time: ${option?.timeRange}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="w-5 h-5 mr-2 text-green-600" />
          Fast Delivery Options
        </CardTitle>
        <CardDescription>
          Choose your delivery speed based on urgency and budget
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedOption === option.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.popular && (
                <Badge className="absolute -top-2 left-4 bg-orange-500 text-white">
                  Most Popular
                </Badge>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    option.id === "standard" ? "bg-blue-100 text-blue-600" :
                    option.id === "express" ? "bg-orange-100 text-orange-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{option.name}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">{option.timeRange}</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {option.price === 0 ? "Free" : `+$${option.price}`}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {option.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedOption && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Selected Delivery Option</h4>
                <p className="text-sm text-gray-600">
                  {deliveryOptions.find(opt => opt.id === selectedOption)?.name} - 
                  {" " + deliveryOptions.find(opt => opt.id === selectedOption)?.timeRange}
                </p>
              </div>
              <Button
                onClick={scheduleDelivery}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Schedule Delivery
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Same-day delivery available</p>
              <p>All delivery times are estimates and may vary based on traffic and weather conditions.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FastDelivery;
