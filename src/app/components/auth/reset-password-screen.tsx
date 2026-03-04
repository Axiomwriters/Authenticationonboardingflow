import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Home, Eye, EyeOff, CheckCircle2, Check } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    checkPasswordStrength(password);
  };

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every((valid) => valid);
  };

  const doPasswordsMatch = () => {
    return formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid() || !doPasswordsMatch()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleBackToSignIn = () => {
    navigate("/");
  };

  // Success view after password is reset
  if (isSuccess) {
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
                <h1 className="text-2xl font-medium">Password Reset Successful</h1>
                <p className="text-sm text-muted-foreground">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>

              {/* Sign In Button */}
              <Button
                onClick={handleBackToSignIn}
                className="w-full h-11"
              >
                Continue to Sign In
              </Button>
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
              <h1 className="text-2xl font-medium">Reset Password</h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicators */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-accent/50 border border-border rounded-lg p-4 space-y-2"
                >
                  <p className="text-sm font-medium">Password must contain:</p>
                  <div className="space-y-1.5">
                    <PasswordRequirement
                      met={passwordStrength.length}
                      text="At least 8 characters"
                    />
                    <PasswordRequirement
                      met={passwordStrength.uppercase}
                      text="One uppercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.lowercase}
                      text="One lowercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.number}
                      text="One number"
                    />
                    <PasswordRequirement
                      met={passwordStrength.special}
                      text="One special character"
                    />
                  </div>
                </motion.div>
              )}

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !doPasswordsMatch() && (
                  <p className="text-xs text-destructive">
                    Passwords do not match
                  </p>
                )}
                {formData.confirmPassword && doPasswordsMatch() && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <Check className="size-3" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading || !isPasswordValid() || !doPasswordsMatch()}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center pt-2">
              <button
                onClick={handleBackToSignIn}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Sign In
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

// Helper component for password requirements
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-4 rounded-full flex items-center justify-center transition-colors ${
          met ? "bg-primary" : "bg-muted"
        }`}
      >
        {met && <Check className="size-3 text-primary-foreground" />}
      </div>
      <span
        className={`text-xs transition-colors ${
          met ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
