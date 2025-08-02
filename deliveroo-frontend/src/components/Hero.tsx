import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Package, Truck } from "lucide-react";

interface HeroProps {
  onGetStartedClick: () => void;
  onWatchDemoClick: () => void;
}

const Hero = ({ onGetStartedClick, onWatchDemoClick }: HeroProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <MapPin className="w-5 h-5 text-blue-500 animate-pulse" />
              <Package className="w-5 h-5 text-orange-500" />
              <Truck className="w-5 h-5 text-green-500 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
            Fast & Reliable
            <br />
            Courier Service
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Deliver packages anywhere, anytime with real-time tracking, 
            instant quotes, and professional courier services you can trust.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              onClick={onGetStartedClick}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Shipping Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              onClick={onWatchDemoClick}
              variant="outline" 
              size="lg"
              className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Quotes</h3>
              <p className="text-gray-600 text-sm">Get delivery quotes based on weight categories instantly</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600 text-sm">Track your packages with live updates and location</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Professional couriers ensuring quick and safe delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
