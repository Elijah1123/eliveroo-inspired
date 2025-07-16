
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Package, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderCreated: (order: any) => void;
}

const CreateOrderModal = ({ open, onOpenChange, onOrderCreated }: CreateOrderModalProps) => {
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    weight: "",
    weightCategory: "",
    description: "",
    recipientName: "",
    recipientPhone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const weightCategories = [
    { value: "light", label: "Light (0-1kg) - $5", range: "0-1kg" },
    { value: "medium", label: "Medium (1-5kg) - $10", range: "1-5kg" },
    { value: "heavy", label: "Heavy (5-15kg) - $20", range: "5-15kg" },
    { value: "extra-heavy", label: "Extra Heavy (15kg+) - $35", range: "15kg+" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      id: `DEL${String(Date.now()).slice(-3)}`,
      status: "Pending",
      pickup: formData.pickup,
      destination: formData.destination,
      weight: formData.weight,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
    };
    
    onOrderCreated(newOrder);
    
    toast({
      title: "Order Created",
      description: `Your delivery order ${newOrder.id} has been created successfully.`,
    });
    
    setIsLoading(false);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      pickup: "",
      destination: "",
      weight: "",
      weightCategory: "",
      description: "",
      recipientName: "",
      recipientPhone: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Create Delivery Order
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new package delivery order
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="pickup"
                  placeholder="Enter pickup address"
                  value={formData.pickup}
                  onChange={(e) => handleInputChange("pickup", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="destination"
                  placeholder="Enter destination address"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weightCategory">Weight Category</Label>
              <Select value={formData.weightCategory} onValueChange={(value) => handleInputChange("weightCategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weight category" />
                </SelectTrigger>
                <SelectContent>
                  {weightCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Exact Weight</Label>
              <div className="relative">
                <Scale className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="weight"
                  placeholder="e.g., 2.5 kg"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                placeholder="Enter recipient's name"
                value={formData.recipientName}
                onChange={(e) => handleInputChange("recipientName", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientPhone">Recipient Phone</Label>
              <Input
                id="recipientPhone"
                placeholder="Enter recipient's phone"
                value={formData.recipientPhone}
                onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Package Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the package contents (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
