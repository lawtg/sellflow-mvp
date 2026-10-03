import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Zap, Eye, EyeOff, AlertCircle, Loader2, Check } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "#EF4444", "#F59E0B", "#0CAF60", "#0CAF60"][passwordStrength];

  const validate = () => {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!businessName.trim()) return "Please enter your creator or business name.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return "";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    // Simulate auth — replace with Supabase signUp
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#5847F5] flex items-center justify-center">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[17px] font-700 text-[#0B0B18] tracking-tight">SellFlow</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 shadow-sm">
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight mb-1">Create your account</h1>
          <p className="text-[13.5px] text-[#9292A8] mb-6">Free forever. No credit card required.</p>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-[#E4E4EF] rounded-xl py-2.5 text-[13.5px] font-500 text-[#0B0B18] hover:bg-[#F8F8FC] transition-colors mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E4E4EF]" />
            <span className="text-[12px] text-[#C0C0D0]">or</span>
            <div className="flex-1 h-px bg-[#E4E4EF]" />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-[#FEE2E2] text-[#EF4444] text-[12.5px] font-500 px-3.5 py-2.5 rounded-xl mb-4">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => { setFullName(e.target.value); setError(""); }}
                placeholder="Ola Adeyemi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Creator / business name</label>
              <input
                type="text"
                value={businessName}
                onChange={e => { setBusinessName(e.target.value); setError(""); }}
                placeholder="Ola Creates"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Min. 8 characters"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9292A8] hover:text-[#4E4E68]"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-colors"
                        style={{ background: i <= passwordStrength ? strengthColor : "#E4E4EF" }}
                      />
                    ))}
                  </div>
                  <div className="text-[11.5px] font-500" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-600 py-3 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2 mt-1"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Creating account…</> : "Create Account — Free"}
            </button>
          </form>

          <p className="text-center text-[11.5px] text-[#9292A8] mt-4">
            By creating an account you agree to our{" "}
            <a href="#" className="text-[#5847F5] hover:underline">Terms</a> and{" "}
            <a href="#" className="text-[#5847F5] hover:underline">Privacy Policy</a>.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {["Free forever plan", "No credit card", "Cancel anytime"].map(t => (
              <div key={t} className="flex items-center gap-1 text-[11px] text-[#9292A8]">
                <Check size={10} className="text-[#0CAF60]" strokeWidth={3} />
                {t}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[12.5px] text-[#9292A8] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5847F5] font-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
