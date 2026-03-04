import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Home, Building2, Briefcase, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";

type UserIntent = "buyer" | "host" | "agent" | "professional";

interface IntentCard {
  id: UserIntent;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const intentCards: IntentCard[] = [
  {
    id: "buyer",
    title: "Buyer / Renter",
    description: "Browse and book properties or services.",
    icon: <Home className="size-6" />,
  },
  {
    id: "host",
    title: "Host",
    description: "List properties and manage bookings.",
    icon: <Building2 className="size-6" />,
  },
  {
    id: "agent",
    title: "Agent",
    description: "Represent clients and manage listings.",
    icon: <Briefcase className="size-6" />,
  },
  {
    id: "professional",
    title: "Professional",
    description: "Offer services to users on the platform.",
    icon: <Wrench className="size-6" />,
  },
];

export function IntentSelectionScreen() {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState<UserIntent | null>(null);

  const handleContinue = () => {
    if (selectedIntent) {
      // Navigate to onboarding for all roles
      navigate(`/onboarding/${selectedIntent}`);
    }
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
        className="w-full max-w-[840px]"
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-medium">
              Tell us how you plan to use the platform
            </h1>
            <p className="text-muted-foreground">
              This helps us personalize your experience.
            </p>
          </div>

          {/* Intent Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {intentCards.map((card, index) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedIntent(card.id)}
                className={`
                  group relative bg-card border rounded-xl p-6 text-left transition-all
                  hover:shadow-lg hover:-translate-y-1
                  ${
                    selectedIntent === card.id
                      ? "border-primary shadow-md ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                <div className="space-y-4">
                  <div
                    className={`
                    inline-flex items-center justify-center size-12 rounded-lg transition-colors
                    ${
                      selectedIntent === card.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }
                  `}
                  >
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Selected indicator */}
                {selectedIntent === card.id && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute top-4 right-4 size-6 rounded-full bg-primary flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <svg
                      className="size-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-11"
              onClick={handleContinue}
              disabled={!selectedIntent}
            >
              Continue
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}