import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, Zap, ArrowRight, Sparkles } from "lucide-react";

const categories = [
  { id: "business", label: "Business & Finance", emoji: "💼" },
  { id: "health", label: "Health & Fitness", emoji: "💪" },
  { id: "food", label: "Food & Cooking", emoji: "🍳" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "relationships", label: "Relationships", emoji: "❤️" },
  { id: "writing", label: "Writing & Content", emoji: "✍️" },
  { id: "tech", label: "Technology", emoji: "💻" },
  { id: "beauty", label: "Beauty & Fashion", emoji: "✨" },
  { id: "spirituality", label: "Spirituality", emoji: "🙏" },
  { id: "other", label: "Other", emoji: "🎯" },
];

const productTypes = [
  { id: "pdf", label: "PDF / Ebook", desc: "Guide, playbook, or digital book", emoji: "📄" },
  { id: "workbook", label: "Guide / Workbook", desc: "Step-by-step workbook or template", emoji: "📋" },
  { id: "course", label: "Mini-course", desc: "Structured lessons and modules", emoji: "🎓" },
  { id: "templates", label: "Templates", desc: "Canva, Notion, or document templates", emoji: "🗂️" },
  { id: "audio", label: "Audio / Podcast", desc: "Audio guide or recording", emoji: "🎙️" },
  { id: "bundle", label: "Bundle", desc: "Multiple products packaged together", emoji: "📦" },
];

const countries = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania",
  "Rwanda", "Ethiopia", "Senegal", "Côte d'Ivoire", "Cameroon",
  "Zimbabwe", "Zambia", "Other",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const steps = [
    { label: "About you" },
    { label: "Your niche" },
    { label: "Product type" },
    { label: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-[#5847F5] flex items-center justify-center">
          <Zap size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-700 text-[#0B0B18] tracking-tight">SellFlow</span>
      </div>

      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex-1 flex flex-col gap-1">
              <div className={`h-1 rounded-full transition-colors ${i <= step ? "bg-[#5847F5]" : "bg-[#E4E4EF]"}`} />
              <div className={`text-[10.5px] font-500 ${i === step ? "text-[#5847F5]" : "text-[#C0C0D0]"}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── STEP 0: About you ── */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7">
            <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight mb-1">Welcome to SellFlow 🎉</h1>
            <p className="text-[13.5px] text-[#9292A8] mb-6">Let's set up your creator store. This takes under 2 minutes.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Your store / creator name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  placeholder="e.g. Ola Creates"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                />
                {storeName && (
                  <div className="text-[11.5px] text-[#9292A8] mt-1">
                    Your store URL: <span className="font-600 text-[#5847F5]">sellflow.co/{storeName.toLowerCase().replace(/\s+/g, "-")}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Country</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors bg-white"
                >
                  <option value="">Select your country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-[11.5px] font-600 text-[#9292A8] uppercase tracking-widest mb-3">What you can do with SellFlow</div>
              {[
                "Upload your digital product",
                "AI builds your sales page",
                "Accept payments in Naira & more",
                "Deliver your product automatically",
              ].map((item, i) => (
                <div key={item} className={`flex items-center gap-2.5 py-2 ${i < 2 ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 2 ? "bg-[#0CAF60]" : "border-2 border-[#E4E4EF]"}`}>
                    {i < 2 && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] text-[#0B0B18] font-500">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={!storeName.trim() || !country}
              className="w-full mt-6 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-600 py-3 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2"
            >
              Let's go <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── STEP 1: Niche ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7">
            <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight mb-1">What's your niche?</h1>
            <p className="text-[13.5px] text-[#9292A8] mb-5">This helps SellFlow AI write better copy for your products.</p>

            <div className="grid grid-cols-2 gap-2.5">
              {categories.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCat(id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    selectedCat === id
                      ? "border-[#5847F5] bg-[#EEF0FF] text-[#5847F5]"
                      : "border-[#E4E4EF] hover:border-[#ADADC4] text-[#0B0B18]"
                  }`}
                >
                  <span className="text-[18px]">{emoji}</span>
                  <span className="text-[12.5px] font-500">{label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setStep(0)} className="text-[13px] text-[#9292A8] hover:text-[#4E4E68]">← Back</button>
              <div className="flex items-center gap-2">
                <button onClick={() => setStep(2)} className="text-[13px] text-[#9292A8] hover:text-[#4E4E68] px-3">Skip</button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedCat}
                  className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Product type ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7">
            <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight mb-1">What will you sell first?</h1>
            <p className="text-[13.5px] text-[#9292A8] mb-5">You can always add more types later.</p>

            <div className="space-y-2.5">
              {productTypes.map(({ id, label, desc, emoji }) => (
                <button
                  key={id}
                  onClick={() => setSelectedType(id)}
                  className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all ${
                    selectedType === id
                      ? "border-[#5847F5] bg-[#EEF0FF]"
                      : "border-[#E4E4EF] hover:border-[#ADADC4]"
                  }`}
                >
                  <span className="text-[22px] shrink-0">{emoji}</span>
                  <div>
                    <div className={`text-[13.5px] font-600 ${selectedType === id ? "text-[#5847F5]" : "text-[#0B0B18]"}`}>{label}</div>
                    <div className="text-[12px] text-[#9292A8]">{desc}</div>
                  </div>
                  {selectedType === id && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[#5847F5] flex items-center justify-center shrink-0">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setStep(1)} className="text-[13px] text-[#9292A8] hover:text-[#4E4E68]">← Back</button>
              <div className="flex items-center gap-2">
                <button onClick={() => setStep(3)} className="text-[13px] text-[#9292A8] hover:text-[#4E4E68] px-3">Skip</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedType}
                  className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Ready ── */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#5847F5] flex items-center justify-center mx-auto mb-5">
              <Sparkles size={26} className="text-white" />
            </div>
            <h1 className="text-[24px] font-800 text-[#0B0B18] tracking-tight mb-2">
              {storeName ? `${storeName} is ready!` : "Your store is ready!"}
            </h1>
            <p className="text-[14px] text-[#4E4E68] leading-relaxed mb-7">
              Your SellFlow account is set up. Now let's create your first product and build a sales page with AI.
            </p>

            <div className="bg-[#F8F8FC] rounded-xl p-4 mb-6 space-y-2.5 text-left">
              {[
                "Upload your PDF or digital product",
                "SellFlow AI analyzes it and asks you 7 questions",
                "AI builds your complete sales page in seconds",
                "Connect Paystack and publish — start selling",
              ].map((item, i) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#EEF0FF] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-700 text-[#5847F5]">{i + 1}</span>
                  </div>
                  <span className="text-[13px] text-[#4E4E68]">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/products/create")}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 py-3.5 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <Sparkles size={16} />
              Create My First Product
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-[13.5px] text-[#9292A8] hover:text-[#4E4E68] py-2 transition-colors"
            >
              Take me to the dashboard first
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
