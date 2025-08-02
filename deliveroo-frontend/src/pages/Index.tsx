
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import DemoModal from "@/components/DemoModal";
import MpesaPayment from "@/components/MpesaPayment";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FunctionalFeatures from "@/components/FunctionalFeatures";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    // Scroll to pricing section to show shipping options
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (!isAuthenticated) {
      setShowSignup(true);
    }
  };

  const handleSignupSuccess = () => {
    // After signup, just close modal - user can navigate to shipping options
    setShowSignup(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <Hero 
        onGetStartedClick={handleGetStarted} 
        onWatchDemoClick={() => setShowDemo(true)} 
      />
      <Features />
      <FunctionalFeatures onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <Stats />
      <div id="pricing">
        <Pricing onGetStartedClick={handleGetStarted} />
      </div>
      <Contact />
      
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <SignupModal 
        open={showSignup} 
        onOpenChange={setShowSignup} 
        onSignupSuccess={handleSignupSuccess}
      />
      <DemoModal open={showDemo} onOpenChange={setShowDemo} />
      <MpesaPayment open={showMpesaPayment} onOpenChange={setShowMpesaPayment} />
    </div>
  );
};

export default Index;
