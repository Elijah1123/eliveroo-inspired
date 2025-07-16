
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Navigation, Truck } from "lucide-react";
import InstantQuote from "./InstantQuote";
import RealTimeTracking from "./RealTimeTracking";
import FastDelivery from "./FastDelivery";

const FunctionalFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Experience Our Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try our instant quote calculator, track packages in real-time, and choose your delivery speed
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="quotes" className="flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <span>Instant Quotes</span>
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Real-time Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Fast Delivery</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Get Instant Delivery Quotes
                </h3>
                <p className="text-gray-600">
                  Calculate delivery costs instantly based on weight, distance, and urgency
                </p>
              </div>
              <InstantQuote />
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Track Your Package Live
                </h3>
                <p className="text-gray-600">
                  Monitor your package location and delivery status in real-time
                </p>
              </div>
              <RealTimeTracking />
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Choose Your Delivery Speed
                </h3>
                <p className="text-gray-600">
                  Select from multiple delivery options based on your urgency and budget
                </p>
              </div>
              <FastDelivery />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FunctionalFeatures;
