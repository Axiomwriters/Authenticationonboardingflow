import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Upload, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { ThemeToggle } from "../theme-toggle";

type Role = "buyer" | "host" | "agent" | "professional";

interface FormData {
  phone: string;
  kenyanId?: string;
  location?: string;
  propertyInfo?: string;
  license?: string;
  agency?: string;
  companyLogo?: File | null;
  idDocument?: File | null;
  serviceCategory?: string;
  portfolioLink?: string;
}

export function OnboardingFlow() {
  const navigate = useNavigate();
  const { role } = useParams<{ role: Role }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    kenyanId: "",
    location: "",
    propertyInfo: "",
    license: "",
    agency: "",
    companyLogo: null,
    idDocument: null,
    serviceCategory: "",
    portfolioLink: "",
  });

  const totalSteps = role === "buyer" ? 1 : role === "host" ? 3 : role === "agent" ? 4 : 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Check if this is a role upgrade or initial onboarding
    const isUpgrade = localStorage.getItem("upgradingToRole");
    
    if (isUpgrade) {
      // This is a role upgrade - preserve existing roles
      localStorage.removeItem("upgradingToRole");
    } else {
      // This is initial onboarding
      localStorage.setItem("userRole", role!);
      localStorage.setItem("hasCompletedIntent", "true");
      
      // Initialize userRoles array with the selected role
      localStorage.setItem("userRoles", JSON.stringify([role!]));
    }
    
    // Navigate back to home - onboarding complete
    navigate("/");
  };

  const getRoleTitle = () => {
    switch (role) {
      case "buyer":
        return "Buyer";
      case "host":
        return "Host";
      case "agent":
        return "Agent";
      case "professional":
        return "Professional";
      default:
        return "";
    }
  };

  const canProceed = () => {
    // Buyer role has optional phone
    if (role === "buyer") {
      return true; // Always can proceed for buyer
    }
    
    // Step 1: Phone required for all non-buyer roles
    if (currentStep === 1) {
      return formData.phone.length > 0;
    }
    
    // Final step for host, agent, professional: require ID, location, and ID document
    const isFinalStep = 
      (role === "host" && currentStep === 3) ||
      (role === "agent" && currentStep === 4) ||
      (role === "professional" && currentStep === 3);
    
    if (isFinalStep) {
      return (
        (formData.kenyanId?.length ?? 0) > 0 &&
        (formData.location?.length ?? 0) > 0 &&
        formData.idDocument !== null
      );
    }
    
    // All other steps are optional
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[520px]"
      >
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-medium">
                Complete Your {getRoleTitle()} Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            {/* Progress Bar */}
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Step 1: Phone Number (All Roles) */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number {role !== "buyer" && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {role === "buyer" 
                        ? "Optional: Add your phone for booking notifications"
                        : "Required for account verification and communication"}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Host - Property Info */}
              {role === "host" && currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyInfo">Property Information</Label>
                    <Input
                      id="propertyInfo"
                      placeholder="e.g., Downtown apartment"
                      value={formData.propertyInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyInfo: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Tell us about the property you want to list
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Check className="size-4 text-primary" />
                      Verification Badge Available
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Complete identity verification to earn a trusted host
                      badge
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Host - ID & Location (Required) */}
              {role === "host" && currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kenyanId">
                      Kenyan ID Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="kenyanId"
                      placeholder="Enter your Kenyan ID number"
                      value={formData.kenyanId}
                      onChange={(e) =>
                        setFormData({ ...formData, kenyanId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for identity verification
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., Nairobi, Westlands"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your city and area
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDocument">
                      Upload ID Document <span className="text-destructive">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <input
                        id="idDocument"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            idDocument: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor="idDocument"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Upload className="size-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium">
                          {formData.idDocument
                            ? formData.idDocument.name
                            : "Click to upload ID document"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PNG, JPG or PDF (max 5MB)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Agent - License Info */}
              {role === "agent" && currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      placeholder="Enter your license number"
                      value={formData.license}
                      onChange={(e) =>
                        setFormData({ ...formData, license: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Add your professional license for verification
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Agent - Agency */}
              {role === "agent" && currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agency Name</Label>
                    <Input
                      id="agency"
                      placeholder="Enter your agency name"
                      value={formData.agency}
                      onChange={(e) =>
                        setFormData({ ...formData, agency: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Let clients know which agency you represent
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">
                      Company Logo
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <input
                        id="companyLogo"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyLogo: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor="companyLogo"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Upload className="size-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium">
                          {formData.companyLogo
                            ? formData.companyLogo.name
                            : "Click to upload company logo"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PNG or JPG (max 2MB)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Agent - ID & Location (Required) */}
              {role === "agent" && currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kenyanId">
                      Kenyan ID Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="kenyanId"
                      placeholder="Enter your Kenyan ID number"
                      value={formData.kenyanId}
                      onChange={(e) =>
                        setFormData({ ...formData, kenyanId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for identity verification
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., Nairobi, Westlands"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your city and area
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDocument">
                      Upload ID Document <span className="text-destructive">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <input
                        id="idDocument"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            idDocument: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor="idDocument"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Upload className="size-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium">
                          {formData.idDocument
                            ? formData.idDocument.name
                            : "Click to upload ID document"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PNG, JPG or PDF (max 5MB)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional - Service Category and Portfolio */}
              {role === "professional" && currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory">Service Category</Label>
                    <Input
                      id="serviceCategory"
                      placeholder="e.g., Home Inspection, Photography"
                      value={formData.serviceCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceCategory: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolioLink">Portfolio Link</Label>
                    <Input
                      id="portfolioLink"
                      type="url"
                      placeholder="https://your-portfolio.com"
                      value={formData.portfolioLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          portfolioLink: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Showcase your previous work
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Professional - ID & Location (Required) */}
              {role === "professional" && currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kenyanId">
                      Kenyan ID Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="kenyanId"
                      placeholder="Enter your Kenyan ID number"
                      value={formData.kenyanId}
                      onChange={(e) =>
                        setFormData({ ...formData, kenyanId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for identity verification
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., Nairobi, Westlands"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your city and area
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDocument">
                      Upload ID Document <span className="text-destructive">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <input
                        id="idDocument"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            idDocument: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor="idDocument"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Upload className="size-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium">
                          {formData.idDocument
                            ? formData.idDocument.name
                            : "Click to upload ID document"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PNG, JPG or PDF (max 5MB)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1"
            >
              {currentStep === totalSteps ? "Complete" : "Continue"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}