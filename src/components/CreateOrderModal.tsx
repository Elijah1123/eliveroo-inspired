
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Package, Scale, CreditCard, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MpesaPayment from "./MpesaPayment";

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
    urgency: "standard",
    distance: "",
    description: "",
    recipientName: "",
    recipientPhone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
  const { toast } = useToast();

  const weightCategories = [
    { value: "light", label: "Light (0-1kg)", basePrice: 5, range: "0-1kg" },
    { value: "medium", label: "Medium (1-5kg)", basePrice: 10, range: "1-5kg" },
    { value: "heavy", label: "Heavy (5-15kg)", basePrice: 20, range: "5-15kg" },
    { value: "extra-heavy", label: "Extra Heavy (15kg+)", basePrice: 35, range: "15kg+" }
  ];

  const urgencyOptions = [
    { value: "standard", label: "Standard Delivery", multiplier: 1, time: "2-4 hours" },
    { value: "express", label: "Express Delivery", multiplier: 1.5, time: "1-2 hours" },
    { value: "urgent", label: "Urgent Delivery", multiplier: 2, time: "30-60 mins" }
  ];

  const USD_TO_KSH_RATE = 150;

  const calculateQuote = () => {
    if (!formData.weightCategory || !formData.distance || !formData.urgency) return;

    const weight = weightCategories.find(w => w.value === formData.weightCategory);
    const urgency = urgencyOptions.find(u => u.value === formData.urgency);
    const distance = parseFloat(formData.distance);

    if (weight && urgency && distance) {
      const basePrice = weight.basePrice;
      const distancePrice = distance * 0.5; // $0.5 per km
      const urgencyMultiplier = urgency.multiplier;
      
      const totalPrice = (basePrice + distancePrice) * urgencyMultiplier;
      setQuote(Math.round(totalPrice * 100) / 100);
    }
  };

  const getKshAmount = () => {
    if (quote) {
      return Math.round(quote * USD_TO_KSH_RATE).toString();
    }
    return "0";
  };

  const handleProceedToPayment = () => {
    if (!quote) {
      toast({
        title: "Calculate Quote First",
        description: "Please calculate the delivery quote before proceeding to payment.",
        variant: "destructive"
      });
      return;
    }
    setShowMpesaPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Create order after successful payment
    const newOrder = {
      id: `DEL${String(Date.now()).slice(-3)}`,
      status: "Paid",
      pickup: formData.pickup,
      destination: formData.destination,
      weight: formData.weight,
      amount: quote,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
    };
    
    onOrderCreated(newOrder);
    
    toast({
      title: "Order Created & Paid",
      description: `Your delivery order ${newOrder.id} has been created and paid successfully.`,
    });
    
    onOpenChange(false);
    
    // Reset form
    setFormData({
      pickup: "",
      destination: "",
      weight: "",
      weightCategory: "",
      urgency: "standard",
      distance: "",
      description: "",
      recipientName: "",
      recipientPhone: ""
    });
    setQuote(null);
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
        
        <div className="space-y-6">
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
              <Label htmlFor="distance">Distance (km)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="distance"
                  placeholder="Enter distance"
                  value={formData.distance}
                  onChange={(e) => handleInputChange("distance", e.target.value)}
                  className="pl-10"
                  type="number"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="urgency">Delivery Speed</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery speed" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <div className="space-y-4">
            <Button 
              type="button"
              onClick={calculateQuote}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Delivery Quote
            </Button>

            {quote !== null && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">${quote}</span>
                    <div className="text-sm text-gray-500">≈ KSh {getKshAmount()}</div>
                  </div>
                </div>
                <Button 
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white mt-2"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay KSh {getKshAmount()} via M-Pesa
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>

      <MpesaPayment 
        open={showMpesaPayment} 
        onOpenChange={setShowMpesaPayment}
        amount={getKshAmount()}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Dialog>
  );
};

export default CreateOrderModal;
