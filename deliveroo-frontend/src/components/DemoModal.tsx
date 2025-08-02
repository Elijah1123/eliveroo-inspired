import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  MapPin, 
  Package, 
  CreditCard, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Phone,
  Clock,
  Shield
} from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const steps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up with your email and phone number to get started",
      icon: User,
      details: [
        "Click 'Sign Up' in the top right corner",
        "Enter your name, email, and phone number",
        "Verify your phone number with SMS code",
        "Complete your profile setup"
      ]
    },
    {
      step: 2,
      title: "Enter Pickup & Delivery Details",
      description: "Specify where to pick up and deliver your package",
      icon: MapPin,
      details: [
        "Enter pickup address or select from map",
        "Add delivery address with specific instructions",
        "Include recipient contact information",
        "Set preferred pickup and delivery times"
      ]
    },
    {
      step: 3,
      title: "Package Information",
      description: "Describe your package for accurate pricing and handling",
      icon: Package,
      details: [
        "Select package size (Small, Medium, Large)",
        "Enter weight and dimensions",
        "Choose package type (Documents, Electronics, etc.)",
        "Add special handling instructions if needed"
      ]
    },
    {
      step: 4,
      title: "Choose Delivery Speed",
      description: "Select delivery option that fits your timeline",
      icon: Clock,
      details: [
        "Same Day Delivery - Within 3-6 hours",
        "Express Delivery - Within 24 hours",
        "Standard Delivery - 1-2 business days",
        "Scheduled Delivery - Pick your preferred time"
      ]
    },
    {
      step: 5,
      title: "Secure Payment",
      description: "Pay safely with M-Pesa or other payment methods",
      icon: CreditCard,
      details: [
        "Review your order summary and total cost",
        "Choose M-Pesa as payment method",
        "Enter your M-Pesa phone number",
        "Complete payment through M-Pesa prompt"
      ]
    },
    {
      step: 6,
      title: "Real-Time Tracking",
      description: "Track your package every step of the way",
      icon: Truck,
      details: [
        "Get instant order confirmation",
        "Track courier location on live map",
        "Receive SMS updates at each milestone",
        "Contact courier directly if needed"
      ]
    },
    {
      step: 7,
      title: "Delivery Confirmation",
      description: "Confirm successful delivery and rate your experience",
      icon: CheckCircle,
      details: [
        "Receive delivery notification",
        "Confirm package received in good condition",
        "Rate your courier and overall experience",
        "Download receipt for your records"
      ]
    }
  ];

  const features = [
    {
      title: "24/7 Customer Support",
      description: "Get help anytime via chat, phone, or email",
      icon: Phone
    },
    {
      title: "Secure & Insured",
      description: "All packages are insured and tracked for your peace of mind",
      icon: Shield
    },
    {
      title: "Fast & Reliable",
      description: "Same-day delivery with 99.8% on-time delivery rate",
      icon: Truck
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            How to Use Deliveroo - Step by Step Guide
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-lg">
            Follow these simple steps to send your package with Deliveroo courier service
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-orange-100 text-blue-800 text-xs font-semibold rounded-full">
                          Step {step.step}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Features */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Why Choose Deliveroo?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Send Your First Package?
              </h4>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Deliveroo for fast, secure, and reliable delivery services across the country.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={() => onOpenChange(false)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3"
                >
                  Start Shipping Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-3"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;