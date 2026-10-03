import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Wraps dashboard routes.
 * - Shows a full-screen spinner while the initial session check is in flight.
 * - Redirects to /login (preserving the intended URL) when there is no session.
 * - Redirects to /onboarding when the user has no profile yet (new sign-up).
 * - Renders children when a valid session + profile exists.
 */
export default function ProtectedRoute() {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  // Still resolving the session from Supabase — show a spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center">
        <Loader2 size={28} className="text-[#5847F5] animate-spin" />
      </div>
    );
  }

  // Not logged in — send to login, remember where they were trying to go
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but no profile yet — finish onboarding first
  if (!profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
