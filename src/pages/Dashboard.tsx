
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, MapPin, Clock, Truck } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import CreateOrderModal from "@/components/CreateOrderModal";
import OrderCard from "@/components/OrderCard";
import MapView from "@/components/MapView";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [orders, setOrders] = useState([
    {
      id: "DEL001",
      status: "In Transit",
      pickup: "123 Main St, Downtown",
      destination: "456 Oak Ave, Uptown",
      weight: "2.5 kg",
      createdAt: "2024-01-15T10:30:00Z",
      estimatedDelivery: "2024-01-15T16:00:00Z"
    },
    {
      id: "DEL002",
      status: "Pending",
      pickup: "789 Pine Rd, Westside",
      destination: "321 Elm St, Eastside",
      weight: "1.2 kg",
      createdAt: "2024-01-15T09:15:00Z",
      estimatedDelivery: "2024-01-15T14:30:00Z"
    }
  ]);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "In Transit",
      value: orders.filter(o => o.status === "In Transit").length.toString(),
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Pending",
      value: orders.filter(o => o.status === "Pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Delivered",
      value: orders.filter(o => o.status === "Delivered").length.toString(),
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your delivery orders and track packages</p>
          </div>
          <Button 
            onClick={() => setShowCreateOrder(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders List */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Orders
                </CardTitle>
                <CardDescription>
                  Your latest delivery requests and their current status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map View */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Delivery Map
                </CardTitle>
                <CardDescription>
                  Track your packages in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapView />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateOrderModal 
        open={showCreateOrder} 
        onOpenChange={setShowCreateOrder}
        onOrderCreated={(newOrder) => {
          setOrders(prev => [newOrder, ...prev]);
        }}
      />
    </div>
  );
};

export default Dashboard;
