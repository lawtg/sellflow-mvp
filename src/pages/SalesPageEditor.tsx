import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GripVertical, Eye, EyeOff, Sparkles, Check, X, Globe, ArrowLeft,
  Share2, Copy, CheckCheck, Loader2,
} from "lucide-react";

const ALL_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "problem", label: "Problem" },
  { id: "transformation", label: "Transformation" },
  { id: "benefits", label: "Benefits" },
  { id: "features", label: "Features" },
  { id: "whats-inside", label: "What's Inside" },
  { id: "audience", label: "Who It's For" },
  { id: "testimonials", label: "Testimonials" },
  { id: "creator", label: "About Creator" },
  { id: "guarantee", label: "Guarantee" },
  { id: "faq", label: "FAQ" },
  { id: "offer", label: "Offer" },
  { id: "cta", label: "Final CTA" },
];

const INITIAL_VISIBLE = ["hero", "problem", "transformation", "benefits", "whats-inside", "audience", "creator", "faq", "offer", "cta"];

const AI_OPTIONS = ["Make clearer", "More persuasive", "Make shorter", "More emotional", "Make simpler", "Stronger hook"];

// Default content per section
const DEFAULT_CONTENT: Record<string, Record<string, string>> = {
  hero: {
    headline: "Stop baking for free. Start building a cake business that pays you consistently.",
    subheadline: "The Cake Business Sales Playbook gives you the exact system to position your cakes, attract serious customers, and build a business you can depend on.",
    cta: "Get the Playbook — ₦15,000",
    badge: "For home bakers who want more orders",
  },
  problem: {
    headline: "You make amazing cakes. But getting orders feels like luck.",
    body: "You post on WhatsApp but get more 'how much?' than actual orders. Customers negotiate your prices and you give in. You're busy but not profitable.",
  },
  transformation: {
    headline: "Imagine waking up to cake orders every morning.",
    body: "That's what happens when you stop guessing and start using a proven system. You'll have a clear pricing strategy customers respect, a WhatsApp marketing approach that converts, and a consistent system for weekly orders.",
  },
  benefits: {
    headline: "What you'll walk away with",
    items: "A pricing strategy that customers respect\nWhatsApp marketing scripts that actually convert\nA system for consistent weekly orders\nHow to say no to time-wasters confidently\nYour complete brand positioning\nA 30-day action plan to your first ₦100k month",
  },
  features: {
    headline: "Everything you need to build a real business",
    items: "67 pages of actionable strategies\nFillable pricing worksheet\nWhatsApp script templates\nCustomer avatar builder\n30-day action plan checklist",
  },
  "whats-inside": {
    headline: "What's inside",
    subtitle: "7 chapters. Everything you need.",
    chapters: "Chapter 1: The Cake Business Mindset Shift\nChapter 2: Pricing with Confidence\nChapter 3: Finding Your Perfect Customer\nChapter 4: WhatsApp Sales System\nChapter 5: Your Brand Story\nChapter 6: The 30-Day Order System\nBonus: Cake Business Pricing Worksheet",
  },
  audience: {
    headline: "This is for you if…",
    items: "You're a home baker who wants to turn your passion into income\nYou're tired of attracting time-wasters and price hagglers\nYou want a consistent, predictable flow of orders\nYou're ready to charge what you're worth",
  },
  testimonials: {
    headline: "What other bakers are saying",
    items: "\"I tripled my cake orders in 30 days.\" — Amaka O., Lagos\n\"I finally raised my prices and got MORE customers.\" — Blessing I., Abuja",
  },
  creator: {
    name: "Ola Adeyemi",
    role: "Business strategist & creator educator · Lagos, Nigeria",
    bio: "I spent 6 years helping small business owners in Nigeria build systems that work. This playbook is everything I've learned, applied specifically to the cake business.",
  },
  guarantee: {
    headline: "30-Day Money-Back Guarantee",
    body: "If you go through the playbook and implement the strategies without results within 30 days, contact us for a full refund. No questions asked.",
  },
  faq: {
    items: "Who is this for?|This playbook is for Nigerian home bakers who are talented but struggling to build a consistent, profitable business.\nIs this a physical book?|No — this is a digital PDF you can download instantly after payment.\nWhat if I already have customers?|This playbook helps you attract more of the right customers. It works at any stage.\nIs there a refund policy?|Yes. 30-day money-back guarantee if you've implemented the strategies without results.",
  },
  offer: {
    price: "₦15,000",
    note: "One-time payment · Instant download",
    cta: "Get the Playbook Now",
  },
  cta: {
    headline: "Your cake business starts today.",
    subheadline: "Get the complete system for building a profitable, consistent cake business.",
    cta: "Get the Playbook — ₦15,000",
  },
};

type AiState = "idle" | "loading" | "showing";

function SectionPreview({ id, content }: { id: string; content: Record<string, string> }) {
  const c = { ...DEFAULT_CONTENT[id] || {}, ...content };

  if (id === "hero") return (
    <div className="bg-gradient-to-br from-[#0B0B18] to-[#1a1a2e] text-white p-8 rounded-xl">
      {c.badge && <div className="text-[10px] font-600 text-[#9292A8] uppercase tracking-widest mb-4">{c.badge}</div>}
      <h2 className="text-[26px] font-800 leading-tight mb-3">{c.headline}</h2>
      <p className="text-[#ADADC4] mb-5 text-[13px] leading-relaxed">{c.subheadline}</p>
      <button className="bg-[#5847F5] text-white font-700 px-5 py-2.5 rounded-xl text-[13px]">{c.cta}</button>
    </div>
  );

  if (id === "problem") return (
    <div className="bg-white border border-[#E4E4EF] p-6 rounded-xl">
      <div className="text-[10px] font-600 text-[#5847F5] uppercase tracking-widest mb-2">Sound familiar?</div>
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-3">{c.headline}</h3>
      <div className="space-y-2">
        {(c.body || "").split("\n").map((line, i) => (
          <div key={i} className="flex items-start gap-2 text-[12.5px] text-[#4E4E68]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
            {line}
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "transformation") return (
    <div className="bg-[#E6F9F0] border border-[#A7F3D0] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-2">{c.headline}</h3>
      <p className="text-[12.5px] text-[#4E4E68] leading-relaxed">{c.body}</p>
    </div>
  );

  if (id === "benefits") return (
    <div className="bg-[#F8F8FC] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-4">{c.headline}</h3>
      <div className="grid grid-cols-2 gap-2">
        {(c.items || "").split("\n").filter(Boolean).map((b, i) => (
          <div key={i} className="flex items-start gap-2 bg-white rounded-xl p-2.5 border border-[#E4E4EF]">
            <div className="w-4 h-4 rounded-full bg-[#E6F9F0] flex items-center justify-center shrink-0 mt-0.5">
              <Check size={8} className="text-[#0CAF60]" strokeWidth={3} />
            </div>
            <span className="text-[11.5px] text-[#4E4E68] font-500">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "features") return (
    <div className="bg-white border border-[#E4E4EF] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-3">{c.headline}</h3>
      <div className="space-y-2">
        {(c.items || "").split("\n").filter(Boolean).map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-[12.5px] text-[#4E4E68]">
            <Check size={13} className="text-[#5847F5] shrink-0" strokeWidth={2.5} />
            {f}
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "whats-inside") return (
    <div className="bg-[#F8F8FC] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-1">{c.headline}</h3>
      <p className="text-[12px] text-[#9292A8] mb-3">{c.subtitle}</p>
      <div className="space-y-2">
        {(c.chapters || "").split("\n").filter(Boolean).map((ch, i) => {
          const [num, ...rest] = ch.split(":");
          return (
            <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-[#E4E4EF]">
              <div className="w-9 h-9 rounded-lg bg-[#EEF0FF] flex items-center justify-center shrink-0">
                <span className="text-[9px] font-700 text-[#5847F5]">{num}</span>
              </div>
              <span className="text-[12px] text-[#0B0B18] font-500 pt-1">{rest.join(":").trim()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (id === "audience") return (
    <div className="bg-white border border-[#E4E4EF] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-3">{c.headline}</h3>
      <div className="space-y-2">
        {(c.items || "").split("\n").filter(Boolean).map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-[12.5px] text-[#4E4E68]">
            <Check size={13} className="text-[#5847F5] mt-0.5 shrink-0" strokeWidth={2.5} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "testimonials") return (
    <div className="bg-[#F8F8FC] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-3">{c.headline}</h3>
      <div className="space-y-3">
        {(c.items || "").split("\n").filter(Boolean).map((t, i) => (
          <div key={i} className="bg-white rounded-xl p-3.5 border border-[#E4E4EF]">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(s => <div key={s} className="w-2.5 h-2.5 bg-[#F59E0B] rounded-sm" />)}
            </div>
            <p className="text-[12px] text-[#4E4E68] italic">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === "creator") return (
    <div className="bg-[#F8F8FC] p-6 rounded-xl text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[16px] font-800 mx-auto mb-3">
        {(c.name || "C").charAt(0)}
      </div>
      <div className="text-[14px] font-700 text-[#0B0B18]">{c.name}</div>
      <div className="text-[11.5px] text-[#9292A8] mb-2">{c.role}</div>
      <p className="text-[12.5px] text-[#4E4E68] leading-relaxed">{c.bio}</p>
    </div>
  );

  if (id === "guarantee") return (
    <div className="bg-[#FEF3C7] border border-[#FCD34D] p-6 rounded-xl text-center">
      <div className="text-[28px] mb-2">🛡️</div>
      <div className="text-[15px] font-700 text-[#0B0B18] mb-1">{c.headline}</div>
      <p className="text-[12.5px] text-[#4E4E68]">{c.body}</p>
    </div>
  );

  if (id === "faq") return (
    <div className="bg-white border border-[#E4E4EF] p-6 rounded-xl">
      <h3 className="text-[17px] font-700 text-[#0B0B18] mb-3">Frequently asked questions</h3>
      <div className="space-y-2">
        {(c.items || "").split("\n").filter(Boolean).map((item, i) => {
          const [q, a] = item.split("|");
          return (
            <div key={i} className="border border-[#F4F4F8] rounded-lg p-3">
              <div className="text-[12.5px] font-600 text-[#0B0B18] mb-1">{q}</div>
              <div className="text-[12px] text-[#4E4E68]">{a}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (id === "offer") return (
    <div className="bg-[#0B0B18] text-white p-6 rounded-xl text-center">
      <div className="text-[11px] text-[#9292A8] mb-1">Get instant access</div>
      <div className="text-[36px] font-800 mb-1">{c.price}</div>
      <div className="text-[12px] text-[#9292A8] mb-4">{c.note}</div>
      <button className="w-full bg-[#5847F5] text-white font-700 py-3 rounded-xl text-[13px] mb-2">{c.cta}</button>
      <div className="text-[10.5px] text-[#9292A8]">🔒 Secure payment · Instant delivery</div>
    </div>
  );

  if (id === "cta") return (
    <div className="bg-gradient-to-br from-[#5847F5] to-[#7C3AED] text-white p-8 rounded-xl text-center">
      <h3 className="text-[20px] font-800 mb-2">{c.headline}</h3>
      <p className="text-white/70 text-[13px] mb-5">{c.subheadline}</p>
      <button className="bg-white text-[#5847F5] font-700 px-6 py-2.5 rounded-xl text-[13px]">{c.cta}</button>
    </div>
  );

  return (
    <div className="bg-white border border-[#E4E4EF] p-6 rounded-xl">
      <div className="h-3 bg-[#F4F4F8] rounded w-2/3 mb-2" />
      <div className="h-2.5 bg-[#F4F4F8] rounded w-1/2" />
    </div>
  );
}

function RightPanel({
  active,
  content,
  onChange,
}: {
  active: string;
  content: Record<string, string>;
  onChange: (field: string, val: string) => void;
}) {
  const [aiField, setAiField] = useState<string | null>(null);
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [copiedPublish, setCopiedPublish] = useState(false);

  const c = { ...DEFAULT_CONTENT[active] || {}, ...content };

  const runAI = (field: string, _option: string) => {
    setAiField(field);
    setAiState("loading");
    setTimeout(() => {
      const suggestions: Record<string, string> = {
        headline: "Finally — a proven system to turn your cake passion into a business that pays you every single week.",
        subheadline: "Stop leaving money on the table. The Cake Business Sales Playbook gives you exactly what you need to attract serious buyers and charge what you're worth.",
        cta: "Get Instant Access — ₦15,000",
        body: "You're working harder than ever, but the money isn't reflecting it. Customers haggle, orders are inconsistent, and you wonder if it's even worth it. This playbook changes that.",
      };
      setAiSuggestion(suggestions[field] || "Here's a stronger version that speaks directly to your audience's biggest frustration and desired outcome.");
      setAiState("showing");
    }, 1400);
  };

  const acceptAI = () => {
    if (aiField) onChange(aiField, aiSuggestion);
    setAiState("idle");
    setAiField(null);
  };

  const fieldEditor = (label: string, field: string, multiline = false, rows = 2) => {
    const val = c[field] ?? "";
    return (
      <div>
        <label className="block text-[11.5px] font-600 text-[#0B0B18] mb-1.5">{label}</label>
        {multiline ? (
          <textarea
            rows={rows}
            value={val}
            onChange={e => onChange(field, e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#E4E4EF] text-[12px] focus:outline-none focus:border-[#5847F5] resize-none transition-colors"
          />
        ) : (
          <input
            value={val}
            onChange={e => onChange(field, e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#E4E4EF] text-[12px] focus:outline-none focus:border-[#5847F5] transition-colors"
          />
        )}
        <button
          onClick={() => runAI(field, "persuasive")}
          className="mt-1 flex items-center gap-1.5 text-[11.5px] font-600 text-[#5847F5] hover:text-[#4636E0] transition-colors"
        >
          <Sparkles size={11} />
          ✦ Improve with AI
        </button>

        {aiState !== "idle" && aiField === field && (
          <div className="mt-2 bg-[#F0EBFF] border border-[#D4CCFF] rounded-xl p-3">
            {aiState === "loading" ? (
              <div className="flex items-center gap-2 text-[11.5px] text-[#7C3AED]">
                <Loader2 size={12} className="animate-spin" />
                AI is writing…
              </div>
            ) : (
              <>
                <div className="text-[10px] font-700 text-[#7C3AED] mb-2">✦ AI suggestion</div>
                <div className="bg-[#F8F8FC] rounded-lg p-2 mb-2">
                  <div className="text-[9.5px] font-600 text-[#9292A8] mb-0.5">Current</div>
                  <div className="text-[11px] text-[#4E4E68] leading-relaxed">{val}</div>
                </div>
                <div className="bg-white border border-[#D4CCFF] rounded-lg p-2 mb-2.5">
                  <div className="text-[9.5px] font-600 text-[#7C3AED] mb-0.5">Suggested</div>
                  <div className="text-[11px] text-[#0B0B18] leading-relaxed font-500">{aiSuggestion}</div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={acceptAI} className="flex-1 flex items-center justify-center gap-1 bg-[#5847F5] text-white text-[11px] font-600 py-1.5 rounded-lg">
                    <Check size={10} strokeWidth={3} /> Accept
                  </button>
                  <button onClick={() => { setAiState("idle"); setAiField(null); }} className="flex-1 flex items-center justify-center gap-1 bg-[#F4F4F8] text-[#4E4E68] text-[11px] font-600 py-1.5 rounded-lg">
                    <X size={10} /> Reject
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const aiOptions = (
    <div className="mt-4 pt-4 border-t border-[#F4F4F8]">
      <div className="text-[11px] font-600 text-[#9292A8] uppercase tracking-widest mb-2">AI Improve</div>
      <div className="grid grid-cols-2 gap-1.5">
        {AI_OPTIONS.map(opt => (
          <button
            key={opt}
            className="flex items-center gap-1.5 text-[11.5px] text-[#5847F5] font-500 hover:bg-[#EEF0FF] px-2.5 py-1.5 rounded-lg transition-colors text-left"
          >
            <Sparkles size={10} />
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {active === "hero" && (<>
        {fieldEditor("Badge text", "badge")}
        {fieldEditor("Headline", "headline", true, 3)}
        {fieldEditor("Subheadline", "subheadline", true, 3)}
        {fieldEditor("CTA button", "cta")}
        {aiOptions}
      </>)}
      {active === "problem" && (<>
        {fieldEditor("Headline", "headline", true, 2)}
        {fieldEditor("Body (one problem per line)", "body", true, 5)}
        {aiOptions}
      </>)}
      {active === "transformation" && (<>
        {fieldEditor("Headline", "headline", true, 2)}
        {fieldEditor("Body", "body", true, 4)}
        {aiOptions}
      </>)}
      {active === "benefits" && (<>
        {fieldEditor("Section headline", "headline")}
        {fieldEditor("Benefits (one per line)", "items", true, 6)}
        {aiOptions}
      </>)}
      {active === "features" && (<>
        {fieldEditor("Section headline", "headline")}
        {fieldEditor("Features (one per line)", "items", true, 5)}
        {aiOptions}
      </>)}
      {active === "whats-inside" && (<>
        {fieldEditor("Section headline", "headline")}
        {fieldEditor("Subtitle", "subtitle")}
        {fieldEditor("Chapters (format: Label: Title)", "chapters", true, 7)}
        {aiOptions}
      </>)}
      {active === "audience" && (<>
        {fieldEditor("Headline", "headline")}
        {fieldEditor("Audience items (one per line)", "items", true, 5)}
        {aiOptions}
      </>)}
      {active === "testimonials" && (<>
        {fieldEditor("Section headline", "headline")}
        {fieldEditor("Testimonials (one per line)", "items", true, 5)}
        {aiOptions}
      </>)}
      {active === "creator" && (<>
        {fieldEditor("Your name", "name")}
        {fieldEditor("Role / location", "role")}
        {fieldEditor("Bio", "bio", true, 4)}
        {aiOptions}
      </>)}
      {active === "guarantee" && (<>
        {fieldEditor("Guarantee headline", "headline")}
        {fieldEditor("Guarantee text", "body", true, 3)}
        {aiOptions}
      </>)}
      {active === "faq" && (<>
        {fieldEditor("FAQ items (format: Question|Answer, one per line)", "items", true, 8)}
        {aiOptions}
      </>)}
      {active === "offer" && (<>
        {fieldEditor("Price", "price")}
        {fieldEditor("Note (under price)", "note")}
        {fieldEditor("CTA button", "cta")}
        {aiOptions}
      </>)}
      {active === "cta" && (<>
        {fieldEditor("Headline", "headline")}
        {fieldEditor("Subheadline", "subheadline", true, 2)}
        {fieldEditor("CTA button", "cta")}
        {aiOptions}
      </>)}
    </div>
  );
}

export default function SalesPageEditor() {
  const navigate = useNavigate();
  const [active, setActive] = useState("hero");
  const [secs, setSecs] = useState(
    ALL_SECTIONS.map(s => ({ ...s, visible: INITIAL_VISIBLE.includes(s.id) }))
  );
  const [sectionContent, setSectionContent] = useState<Record<string, Record<string, string>>>({});
  const [published, setPublished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const toggleVisible = (id: string) => {
    setSecs(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const updateContent = (sectionId: string, field: string, val: string) => {
    setSectionContent(prev => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), [field]: val },
    }));
  };

  const handlePublish = () => {
    setPublished(true);
    setShowPublishModal(true);
  };

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F8FC]">
      {/* Top bar */}
      <div className="h-12 bg-white border-b border-[#E4E4EF] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/products/1")}
            className="flex items-center gap-1.5 text-[12.5px] text-[#9292A8] hover:text-[#4E4E68]"
          >
            <ArrowLeft size={13} />
            Back
          </button>
          <div className="w-px h-4 bg-[#E4E4EF]" />
          <span className="text-[13px] font-600 text-[#0B0B18]">Sales Page Editor</span>
          <span className="hidden sm:block text-[11.5px] bg-[#F4F4F8] text-[#9292A8] px-2 py-0.5 rounded-full font-500">
            The Cake Business Sales Playbook
          </span>
          {published && (
            <span className="text-[11.5px] bg-[#E6F9F0] text-[#0CAF60] px-2 py-0.5 rounded-full font-600">Published</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/p/ola/cake-playbook")}
            className="flex items-center gap-1.5 border border-[#E4E4EF] text-[#4E4E68] text-[12.5px] font-500 px-3 py-1.5 rounded-lg hover:bg-[#F8F8FC] transition-colors"
          >
            <Eye size={13} />
            Preview
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[12.5px] font-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Globe size={13} />
            {published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: section nav */}
        <div className="w-[190px] shrink-0 bg-white border-r border-[#E4E4EF] flex flex-col">
          <div className="px-3 pt-3 pb-1">
            <div className="text-[10.5px] font-600 text-[#9292A8] uppercase tracking-widest px-2">Sections</div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {secs.map(({ id, label, visible }) => (
              <div
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer group mb-0.5 ${active === id ? "bg-[#EEF0FF]" : "hover:bg-[#F8F8FC]"}`}
              >
                <GripVertical size={12} className="text-[#D0D0E0] group-hover:text-[#ADADC4] cursor-grab shrink-0" />
                <span className={`text-[12.5px] flex-1 font-500 ${active === id ? "text-[#5847F5]" : visible ? "text-[#0B0B18]" : "text-[#ADADC4]"}`}>
                  {label}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); toggleVisible(id); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {visible
                    ? <Eye size={11} className="text-[#9292A8]" />
                    : <EyeOff size={11} className="text-[#ADADC4]" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Center: page preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F0F0F8]">
          <div className="max-w-xl mx-auto space-y-2.5">
            {secs.filter(s => s.visible).map(({ id, label }) => (
              <div
                key={id}
                onClick={() => setActive(id)}
                className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
                  active === id
                    ? "ring-2 ring-[#5847F5] shadow-lg"
                    : "ring-1 ring-transparent hover:ring-[#ADADC4]"
                }`}
              >
                <SectionPreview id={id} content={sectionContent[id] || {}} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: edit panel */}
        <div className="w-[270px] shrink-0 bg-white border-l border-[#E4E4EF] flex flex-col">
          <div className="p-4 border-b border-[#F4F4F8] shrink-0">
            <div className="text-[13px] font-700 text-[#0B0B18]">
              {ALL_SECTIONS.find(s => s.id === active)?.label ?? "Section"} settings
            </div>
          </div>
          <RightPanel
            active={active}
            content={sectionContent[active] || {}}
            onChange={(field, val) => updateContent(active, field, val)}
          />
          <div className="p-4 border-t border-[#F4F4F8] shrink-0">
            <button
              onClick={handlePublish}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center gap-2"
            >
              <Globe size={14} />
              {published ? "Update Page" : "Publish Sales Page"}
            </button>
          </div>
        </div>
      </div>

      {/* Publish success modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#E6F9F0] flex items-center justify-center mx-auto mb-4">
              <Check size={22} className="text-[#0CAF60]" strokeWidth={2.5} />
            </div>
            <h2 className="text-[20px] font-800 text-[#0B0B18] text-center mb-1">Your product is live 🎉</h2>
            <p className="text-[13px] text-[#9292A8] text-center mb-5">
              Share this link to start selling your product.
            </p>
            <div className="flex items-center gap-2 bg-[#F8F8FC] rounded-xl px-3 py-2.5 border border-[#E4E4EF] mb-4">
              <span className="text-[12px] text-[#4E4E68] flex-1 truncate">sellfinix.co/p/ola/cake-playbook</span>
              <button onClick={copyLink} className="text-[#5847F5] shrink-0">
                {copied ? <CheckCheck size={15} className="text-[#0CAF60]" /> : <Copy size={15} />}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "WhatsApp", color: "bg-[#25D366] hover:bg-[#1EB955]", href: "https://wa.me/?text=Check%20out%20my%20product!" },
                { label: "Facebook", color: "bg-[#1877F2] hover:bg-[#1265D0]", href: "#" },
                { label: "Copy link", color: "bg-[#F4F4F8] hover:bg-[#EEEEF4] text-[#0B0B18]!", href: "#" },
              ].map(({ label, color }) => (
                <button key={label} className={`${color} text-white text-[12px] font-600 py-2 rounded-lg transition-colors`}>
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPublishModal(false)}
              className="w-full border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
