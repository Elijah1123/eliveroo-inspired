
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Clock, Truck, Users, Star } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
      <Header onLoginClick={() => setShowLogin(true)} onSignupClick={() => setShowSignup(true)} />
      <Hero onGetStartedClick={() => setShowSignup(true)} />
      <Features />
      <Stats />
      
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </div>
  );
};

export default Index;
