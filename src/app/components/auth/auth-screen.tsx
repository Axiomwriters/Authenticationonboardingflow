import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Home } from "lucide-react";

export function AuthScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Clear any old localStorage data on mount to prevent redirect issues
  useEffect(() => {
    // Clear old dashboard-related state if it exists
    localStorage.removeItem("currentDashboardView");
    localStorage.removeItem("dashboardState");
  }, []);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Sign in bypasses intent selection - go directly to a mock authenticated state
      // In a real app, this would authenticate and check existing user role
      localStorage.setItem("isAuthenticated", "true");
      // For demo, just show success message and stay on auth screen
      alert("Successfully signed in! In a real app, you'd be redirected to your dashboard.");
    }, 1000);
  };

  const handleCreateAccount = () => {
    // Create account goes through intent selection flow
    navigate("/intent");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[420px]">
          {/* Logo and Brand */}
          <div className="mb-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Home className="size-6 text-white" />
            </div>
            <span className="font-semibold text-lg">Kenya Prime Dwellings</span>
          </div>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-medium">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account or create a new one to get started.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full h-11 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors disabled:opacity-50"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
              <button
                className="w-full h-11 px-4 py-2 border border-border bg-background hover:bg-accent text-foreground rounded-md font-medium transition-colors disabled:opacity-50"
                onClick={handleCreateAccount}
                disabled={isLoading}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image and Text (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjQxNDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080)' }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
            {/* Logo Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                <Home className="size-8 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold text-center mb-6 max-w-lg">
              Find your dream property with confidence
            </h2>

            {/* Description */}
            <p className="text-lg text-center text-gray-300 max-w-md">
              Join thousands of users, agents, and certified professionals in the most trusted real estate ecosystem in Kenya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}