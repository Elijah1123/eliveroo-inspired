
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Package, Truck, Zap } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Perfect for occasional deliveries",
      icon: Package,
      features: [
        "Up to 5 deliveries per month",
        "Standard delivery speed",
        "Basic tracking",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "Great for regular users",
      icon: Truck,
      features: [
        "Up to 25 deliveries per month",
        "Fast delivery options",
        "Real-time tracking",
        "Priority support",
        "Route optimization"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      description: "For businesses and high volume",
      icon: Zap,
      features: [
        "Unlimited deliveries",
        "Express delivery options",
        "Advanced analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your delivery needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'border-orange-500 border-2 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  } text-white`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <Button variant="outline" className="border-blue-200 hover:border-blue-300 hover:bg-blue-50">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
