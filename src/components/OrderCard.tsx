
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  status: string;
  pickup: string;
  destination: string;
  weight: string;
  createdAt: string;
  estimatedDelivery: string;
}

interface OrderCardProps {
  order: Order;
  onEditDestination?: (orderId: string, newDestination: string) => void;
  onCancelOrder?: (orderId: string) => void;
}

const OrderCard = ({ order, onEditDestination, onCancelOrder }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleEditDestination = () => {
    const newDestination = prompt("Enter new destination:", order.destination);
    if (newDestination && newDestination.trim() && newDestination !== order.destination) {
      onEditDestination?.(order.id, newDestination.trim());
    }
  };

  const handleCancelOrder = () => {
    if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
      onCancelOrder?.(order.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{order.id}</h4>
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditDestination}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Destination
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleCancelOrder}>
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-start space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-600">From:</p>
            <p className="text-gray-800 font-medium">{order.pickup}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-600">To:</p>
            <p className="text-gray-800 font-medium">{order.destination}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Package className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600">Weight:</span>
          <span className="text-gray-800 font-medium">{order.weight}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Created: {formatDate(order.createdAt)}</span>
        </div>
        <div className="text-right">
          <p>ETA: {formatDate(order.estimatedDelivery)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
