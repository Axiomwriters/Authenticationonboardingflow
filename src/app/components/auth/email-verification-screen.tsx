import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Home, CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { Button } from "../ui/button";

type VerificationStatus = "verifying" | "success" | "error" | "resend";

export function EmailVerificationScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || localStorage.getItem("userEmail") || "";
  
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Simulate email verification API call
    if (token) {
      setTimeout(() => {
        // Randomly succeed or fail for demo purposes
        // In production, this would be a real API call
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo
        setStatus(isSuccess ? "success" : "error");
      }, 2000);
    } else {
      // No token provided, show resend option
      setStatus("resend");
    }
  }, [token]);

  const handleResendEmail = () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setStatus("verifying");
      
      // After a short delay, show success
      setTimeout(() => {
        setStatus("success");
      }, 2000);
    }, 1500);
  };

  const handleContinue = () => {
    if (status === "success") {
      // Navigate to dashboard or sign in
      navigate("/");
    } else if (status === "error") {
      // Try again or go back
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Verification Status */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
            {/* Status Icon */}
            <div className="flex justify-center">
              {status === "verifying" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <Loader2 className="size-8 text-primary" />
                </motion.div>
              )}
              
              {status === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="size-8 text-primary" />
                </motion.div>
              )}
              
              {status === "error" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center"
                >
                  <XCircle className="size-8 text-destructive" />
                </motion.div>
              )}
              
              {status === "resend" && (
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="size-8 text-primary" />
                </div>
              )}
            </div>

            {/* Header and Message */}
            <div className="space-y-2 text-center">
              {status === "verifying" && (
                <>
                  <h1 className="text-2xl font-medium">Verifying Your Email</h1>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we verify your email address...
                  </p>
                </>
              )}
              
              {status === "success" && (
                <>
                  <h1 className="text-2xl font-medium">Email Verified!</h1>
                  <p className="text-sm text-muted-foreground">
                    Your email has been successfully verified. You can now access all features of your account.
                  </p>
                </>
              )}
              
              {status === "error" && (
                <>
                  <h1 className="text-2xl font-medium">Verification Failed</h1>
                  <p className="text-sm text-muted-foreground">
                    We couldn't verify your email. The link may have expired or is invalid.
                  </p>
                </>
              )}
              
              {status === "resend" && (
                <>
                  <h1 className="text-2xl font-medium">Verify Your Email</h1>
                  <p className="text-sm text-muted-foreground">
                    We sent a verification link to <br />
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </>
              )}
            </div>

            {/* Additional Info for Success */}
            {status === "success" && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">What's next?</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is now fully activated. Sign in to start exploring properties and connecting with the community.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info for Error */}
            {status === "error" && (
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Common issues:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>The verification link has expired (links expire after 24 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>The link has already been used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>The link was copied incorrectly</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Additional Info for Resend */}
            {status === "resend" && (
              <div className="bg-accent/50 border border-border rounded-lg p-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Didn't receive the email?</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Check your spam or junk folder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Make sure you entered the correct email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Wait a few minutes and check again</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {(status === "success" || status === "error") && (
                <Button
                  onClick={handleContinue}
                  className="w-full h-11"
                >
                  {status === "success" ? "Continue to Sign In" : "Back to Home"}
                </Button>
              )}

              {status === "error" && (
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full h-11"
                >
                  {isResending ? "Sending..." : "Resend Verification Email"}
                </Button>
              )}

              {status === "resend" && (
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full h-11"
                >
                  {isResending ? "Sending..." : "Resend Verification Email"}
                </Button>
              )}
            </div>

            {/* Back to Sign In Link */}
            {status !== "verifying" && (
              <div className="text-center pt-2">
                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            )}
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
