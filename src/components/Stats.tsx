
import { Users, Package, MapPin, Star } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Customers",
      color: "text-blue-600"
    },
    {
      icon: Package,
      value: "50,000+",
      label: "Packages Delivered",
      color: "text-orange-600"
    },
    {
      icon: MapPin,
      value: "100+",
      label: "Cities Covered",
      color: "text-green-600"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Customer Rating",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
