import { createBrowserRouter } from "react-router";
import { AuthScreen } from "./components/auth/auth-screen";
import { IntentSelectionScreen } from "./components/auth/intent-selection-screen";
import { OnboardingFlow } from "./components/auth/onboarding-flow";

// Simple not found component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-medium">404 - Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthScreen,
  },
  {
    path: "/intent",
    Component: IntentSelectionScreen,
  },
  {
    path: "/onboarding/:role",
    Component: OnboardingFlow,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
