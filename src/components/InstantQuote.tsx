import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Calculator, Clock, Truck, CreditCard } from "lucide-react";
import MpesaPayment from "./MpesaPayment";

const InstantQuote = () => {
  const [formData, setFormData] = useState({
    weightCategory: "",
    distance: "",
    urgency: ""
  });
  const [quote, setQuote] = useState<number | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);

  const weightCategories = [
    { value: "light", label: "Light (0-1kg)", basePrice: 5 },
    { value: "medium", label: "Medium (1-5kg)", basePrice: 10 },
    { value: "heavy", label: "Heavy (5-15kg)", basePrice: 20 },
    { value: "extra-heavy", label: "Extra Heavy (15kg+)", basePrice: 35 }
  ];

  const urgencyOptions = [
    { value: "standard", label: "Standard Delivery", multiplier: 1, time: "2-4 hours" },
    { value: "express", label: "Express Delivery", multiplier: 1.5, time: "1-2 hours" },
    { value: "urgent", label: "Urgent Delivery", multiplier: 2, time: "30-60 mins" }
  ];

  // Exchange rate: 1 USD = 150 KSh (this could be dynamic in a real app)
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
      setDeliveryTime(urgency.time);
    }
  };

  const handleProceedToPayment = () => {
    setShowMpesaPayment(true);
  };

  // Convert USD to KSh for M-Pesa payment
  const getKshAmount = () => {
    if (quote) {
      return Math.round(quote * USD_TO_KSH_RATE).toString();
    }
    return "0";
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-orange-600" />
            Instant Quote Calculator
          </CardTitle>
          <CardDescription>
            Get an instant delivery quote based on your package details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weightCategory">Package Weight</Label>
            <Select value={formData.weightCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, weightCategory: value }))}>
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
            <Label htmlFor="distance">Distance (km)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="distance"
                placeholder="Enter distance"
                value={formData.distance}
                onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                className="pl-10"
                type="number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Delivery Speed</Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
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

          <Button 
            onClick={calculateQuote}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Calculate Quote
          </Button>

          {quote !== null && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Estimated Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">${quote}</span>
                  <div className="text-sm text-gray-500">≈ KSh {getKshAmount()}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">Delivery Time:</span>
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-1" />
                  {deliveryTime}
                </div>
              </div>
              <Button 
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay KSh {getKshAmount()} via M-Pesa
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <MpesaPayment 
        open={showMpesaPayment} 
        onOpenChange={setShowMpesaPayment}
        amount={getKshAmount()}
      />
    </>
  );
};

export default InstantQuote;
