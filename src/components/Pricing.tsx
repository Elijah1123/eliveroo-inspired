
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Package, Truck, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PricingProps {
  onGetStartedClick?: () => void;
}

const Pricing = ({ onGetStartedClick }: PricingProps) => {
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to dashboard or show payment modal
      window.location.href = '/dashboard';
    } else {
      onGetStartedClick?.();
    }
  };
  const serviceTiers = [
    {
      name: "Standard Shipping",
      description: "Reliable delivery for everyday needs",
      icon: Package,
      features: [
        "3-5 business days delivery",
        "Package tracking included",
        "Standard handling",
        "Email notifications",
        "Insurance up to $100"
      ],
      popular: false
    },
    {
      name: "Express Shipping",
      description: "Fast delivery when you need it",
      icon: Truck,
      features: [
        "1-2 business days delivery",
        "Real-time GPS tracking",
        "Priority handling",
        "SMS & email updates",
        "Insurance up to $500",
        "Signature confirmation"
      ],
      popular: true
    },
    {
      name: "Premium Shipping",
      description: "Ultimate service for urgent deliveries",
      icon: Zap,
      features: [
        "Same day or next day delivery",
        "Live tracking & updates",
        "White glove service",
        "Dedicated support agent",
        "Insurance up to $1000",
        "Special handling options"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Choose Your Shipping Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the delivery speed that fits your needs. Pay only for what you ship with transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {serviceTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                tier.popular ? 'border-orange-500 border-2 scale-105' : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  tier.popular ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <tier.icon className={`w-8 h-8 ${
                    tier.popular ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-gray-600">{tier.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-lg font-semibold text-blue-600">
                    Pay per shipment
                  </div>
                  <div className="text-sm text-gray-500">
                    Based on weight, distance & speed
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Get instant quotes and track your packages in real-time. No hidden fees.</p>
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold mb-4"
          >
            {isAuthenticated ? 'Start Shipping Now' : 'Start Shipping Now'}
          </Button>
          <br />
          <Button variant="outline" className="border-blue-200 hover:border-blue-300 hover:bg-blue-50">
            Get Instant Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
