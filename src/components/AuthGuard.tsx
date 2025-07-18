
import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const AuthGuard = ({ children, fallback, onLoginClick, onSignupClick }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
          Login Required
        </CardTitle>
        <CardDescription>
          Please sign in to access this feature and start using our delivery services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={onLoginClick}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button 
          variant="outline" 
          onClick={onSignupClick}
          className="w-full"
        >
          Create New Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthGuard;
