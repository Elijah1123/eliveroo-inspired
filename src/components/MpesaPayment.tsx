
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, CreditCard, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MpesaPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MpesaPayment = ({ open, onOpenChange }: MpesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("799");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStep(2);

    // Simulate M-Pesa STK push
    setTimeout(() => {
      setPaymentStep(3);
      setIsProcessing(false);
      toast({
        title: "Payment Initiated",
        description: "Check your phone for M-Pesa prompt and enter your PIN",
      });
    }, 2000);

    // Simulate payment completion
    setTimeout(() => {
      setPaymentStep(4);
      toast({
        title: "Payment Successful",
        description: "Welcome to Deliveroo Premium! You can now access all features.",
      });
    }, 8000);
  };

  const resetPayment = () => {
    setPaymentStep(1);
    setPhoneNumber("");
    setIsProcessing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
            M-Pesa Payment
          </DialogTitle>
          <DialogDescription>
            Complete your Deliveroo Premium subscription payment
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 1 && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Premium Plan</span>
              </div>
              <div className="text-2xl font-bold text-green-800">KSh {amount}</div>
              <div className="text-sm text-green-600">Monthly subscription</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-500">Enter your Safaricom number (format: 254...)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KSh)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Secured by M-Pesa. Your payment is protected.</span>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-6"
            >
              Pay with M-Pesa
            </Button>
          </div>
        )}

        {paymentStep === 2 && (
          <div className="text-center space-y-4 py-8">
            <div className="animate-spin w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full mx-auto"></div>
            <h3 className="text-lg font-semibold">Initiating Payment...</h3>
            <p className="text-gray-600">Please wait while we process your request</p>
          </div>
        )}

        {paymentStep === 3 && (
          <div className="text-center space-y-4 py-8">
            <Smartphone className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
            <h3 className="text-lg font-semibold">Check Your Phone</h3>
            <p className="text-gray-600">
              An M-Pesa prompt has been sent to <br />
              <strong>{phoneNumber}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Enter your M-Pesa PIN to complete the payment
            </p>
            <Button variant="outline" onClick={resetPayment}>
              Cancel Payment
            </Button>
          </div>
        )}

        {paymentStep === 4 && (
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold text-green-600">Payment Successful!</h3>
            <p className="text-gray-600">
              Thank you for subscribing to Deliveroo Premium
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Transaction ID:</strong> MPesa{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-sm text-green-800">
                <strong>Amount:</strong> KSh {amount}
              </p>
            </div>
            <Button 
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MpesaPayment;
