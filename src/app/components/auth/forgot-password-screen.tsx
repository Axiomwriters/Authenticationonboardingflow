import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Home, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  const handleBackToSignIn = () => {
    navigate("/");
  };

  // Success view after email is sent
  if (isEmailSent) {
    return (
      <div className="min-h-screen flex bg-background">
        {/* Left Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[420px]"
          >
            {/* Logo and Brand */}
            <div className="mb-8 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="size-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Kenya Prime Dwellings</span>
            </div>

            <div className="space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-8 text-primary" />
                </div>
              </div>

              {/* Header */}
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-medium">Check Your Email</h1>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <br />
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-accent/50 border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">What's next?</p>
                    <p className="text-sm text-muted-foreground">
                      Click the link in your email to reset your password. The link will expire in 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              {/* Didn't receive email */}
              <div className="text-center text-sm">
                <p className="text-muted-foreground mb-3">
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full"
                >
                  Try Another Email
                </Button>
              </div>

              {/* Back to Sign In */}
              <div className="text-center pt-4">
                <button
                  onClick={handleBackToSignIn}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="size-4" />
                  Back to Sign In
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image and Text (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjQxNDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080)' }}
          >
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
              <div className="mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Home className="size-8 text-primary-foreground" />
                </div>
              </div>

              <h2 className="text-4xl font-bold text-center mb-6 max-w-lg">
                Find your dream property with confidence
              </h2>

              <p className="text-lg text-center text-gray-300 max-w-md">
                Join thousands of users, agents, and certified professionals in the most trusted real estate ecosystem in Kenya.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial form view
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[420px]">
          {/* Logo and Brand */}
          <div className="mb-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="size-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Kenya Prime Dwellings</span>
          </div>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-medium">Forgot Password?</h1>
              <p className="text-sm text-muted-foreground">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center pt-2">
              <button
                onClick={handleBackToSignIn}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="size-4" />
                Back to Sign In
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
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Home className="size-8 text-primary-foreground" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-center mb-6 max-w-lg">
              Find your dream property with confidence
            </h2>

            <p className="text-lg text-center text-gray-300 max-w-md">
              Join thousands of users, agents, and certified professionals in the most trusted real estate ecosystem in Kenya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
