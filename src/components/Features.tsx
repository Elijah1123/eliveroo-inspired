
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, Truck, Bell, Shield, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Package Management",
      description: "Create, modify, and track your delivery orders with our intuitive interface",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "View pickup and destination locations with route optimization and distance calculation",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Follow your package journey with live location updates and delivery status",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get email alerts for status changes and location updates in real-time",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "JWT authentication and secure handling of your delivery information",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Schedule deliveries and modify destinations before courier pickup",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your deliveries efficiently and professionally
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
