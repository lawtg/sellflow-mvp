import { useNavigate, Link } from "react-router-dom";
import { Check, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    monthly: "₦0",
    annual: "₦0",
    sub: "forever",
    desc: "For creators just getting started.",
    limit: "Up to 10 sales/month",
    features: [
      "1 product",
      "AI sales page builder",
      "Instant PDF delivery",
      "Basic analytics",
      "Paystack integration",
      "SellFlow branding",
    ],
    notIncluded: ["Custom domain", "Email campaigns", "Lead magnets", "Automations", "Priority support"],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Creator",
    monthly: "₦9,900",
    annual: "₦7,900",
    sub: "/month",
    desc: "For creators building a serious digital-product business.",
    limit: "Unlimited sales",
    features: [
      "Unlimited products",
      "AI sales page builder",
      "Instant PDF delivery",
      "Full analytics dashboard",
      "Paystack + Flutterwave",
      "Email campaigns",
      "Customer database",
      "Lead magnets",
      "Custom domain",
      "Remove SellFlow branding",
    ],
    notIncluded: ["Email automations", "Priority support", "Webhooks"],
    cta: "Start 14-day free trial",
    featured: true,
  },
  {
    name: "Pro",
    monthly: "₦24,900",
    annual: "₦19,900",
    sub: "/month",
    desc: "For creators scaling their sales system.",
    limit: "Unlimited everything",
    features: [
      "Everything in Creator",
      "Email automations",
      "Priority support",
      "Webhooks & API",
      "Advanced analytics",
      "Stripe (international payments)",
      "Multiple team members",
      "White-label option",
    ],
    notIncluded: [],
    cta: "Start 14-day free trial",
    featured: false,
  },
];

const comparison = [
  { feature: "Products", free: "1", creator: "Unlimited", pro: "Unlimited" },
  { feature: "Monthly sales", free: "10", creator: "Unlimited", pro: "Unlimited" },
  { feature: "AI sales page builder", free: true, creator: true, pro: true },
  { feature: "Instant PDF delivery", free: true, creator: true, pro: true },
  { feature: "Paystack payments", free: true, creator: true, pro: true },
  { feature: "Flutterwave payments", free: false, creator: true, pro: true },
  { feature: "Stripe (international)", free: false, creator: false, pro: true },
  { feature: "Custom domain", free: false, creator: true, pro: true },
  { feature: "Email campaigns", free: false, creator: true, pro: true },
  { feature: "Lead magnets", free: false, creator: true, pro: true },
  { feature: "Email automations", free: false, creator: false, pro: true },
  { feature: "Analytics dashboard", free: "Basic", creator: "Full", pro: "Advanced" },
  { feature: "Priority support", free: false, creator: false, pro: true },
  { feature: "Webhooks & API", free: false, creator: false, pro: true },
];

const faqs = [
  { q: "Do I need a credit card to start?", a: "No. The free plan requires no credit card. For Creator and Pro plans, you start with a 14-day free trial — no card needed until you decide to stay." },
  { q: "What payment providers do you support?", a: "We support Paystack (all plans), Flutterwave (Creator+), and Stripe for international payments (Pro only). More providers are coming." },
  { q: "What currencies can I sell in?", a: "Nigerian Naira (₦), Ghanaian Cedi (₵), Kenyan Shilling (Ksh), South African Rand (R), and US Dollar ($). More currencies are being added." },
  { q: "Can I upgrade or downgrade?", a: "Yes, any time. If you upgrade, you're billed the prorated difference. If you downgrade, changes take effect at the next billing cycle." },
  { q: "What happens when I hit the 10-sale limit on Free?", a: "Your sales page stays live but new checkout attempts are paused. Upgrade to Creator to remove all limits instantly." },
  { q: "How does the transaction fee work?", a: "SellFlow charges 0% platform fee. You only pay the payment provider's standard processing fee (typically 1.5% for Paystack)." },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#E4E4EF]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#5847F5] flex items-center justify-center">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-700 text-[#0B0B18] tracking-tight">SellFlow</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-[13.5px] font-500 text-[#4E4E68] hover:text-[#0B0B18]">Log in</button>
            <button onClick={() => navigate("/signup")} className="bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2 rounded-lg transition-colors">Get started free</button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EEF0FF] text-[#5847F5] text-[12px] font-600 px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} />
            Simple, transparent pricing
          </div>
          <h1 className="text-[48px] font-800 text-[#0B0B18] tracking-tight leading-tight mb-4">
            Start free. Grow on your terms.
          </h1>
          <p className="text-[17px] text-[#4E4E68] leading-relaxed mb-8">
            No platform fees. No complicated pricing. Pay only when you're ready to grow.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-[#F4F4F8] p-1 rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-500 transition-colors ${!annual ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-500 transition-colors flex items-center gap-2 ${annual ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8]"}`}
            >
              Annual
              <span className="text-[11px] font-700 text-[#0CAF60] bg-[#E6F9F0] px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map(({ name, monthly, annual: ann, sub, desc, limit, features, notIncluded, cta, featured }) => (
              <div
                key={name}
                className={`rounded-2xl border p-6 flex flex-col ${featured ? "border-[#5847F5] ring-2 ring-[#5847F5]/15 bg-white shadow-[0_8px_32px_rgba(88,71,245,0.12)]" : "border-[#E4E4EF] bg-white"}`}
              >
                {featured && (
                  <div className="inline-block bg-[#5847F5] text-white text-[11px] font-700 px-2.5 py-1 rounded-full mb-4 self-start">Most popular</div>
                )}
                <div className="text-[16px] font-700 text-[#0B0B18] mb-1">{name}</div>
                <div className="mb-1">
                  <span className="text-[36px] font-800 text-[#0B0B18] tracking-tight">{annual ? ann : monthly}</span>
                  {(annual ? ann : monthly) !== "₦0" && <span className="text-[13px] text-[#9292A8] ml-1">{sub}</span>}
                </div>
                {annual && (annual ? ann : monthly) !== "₦0" && (
                  <div className="text-[12px] text-[#9292A8] mb-1">
                    Billed as <span className="font-600 text-[#0B0B18]">{name === "Creator" ? "₦94,800" : "₦238,800"}/year</span>
                  </div>
                )}
                <div className="text-[12.5px] text-[#9292A8] mb-1">{limit}</div>
                <div className="text-[13px] text-[#4E4E68] mb-5">{desc}</div>

                <button
                  onClick={() => navigate("/signup")}
                  className={`w-full py-2.5 rounded-xl text-[13.5px] font-600 mb-6 transition-colors ${featured ? "bg-[#5847F5] hover:bg-[#4636E0] text-white" : "bg-[#F4F4F8] hover:bg-[#EEEEF4] text-[#0B0B18]"}`}
                >
                  {cta}
                </button>

                <div className="flex-1 space-y-2.5">
                  {features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-[13px] text-[#0B0B18]">
                      <div className="w-4 h-4 rounded-full bg-[#E6F9F0] flex items-center justify-center shrink-0">
                        <Check size={9} className="text-[#0CAF60]" strokeWidth={3} />
                      </div>
                      {f}
                    </div>
                  ))}
                  {notIncluded.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-[13px] text-[#C0C0D0]">
                      <div className="w-4 h-4 rounded-full bg-[#F4F4F8] flex items-center justify-center shrink-0">
                        <span className="text-[9px] text-[#D0D0E0]">—</span>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-[#9292A8] mt-6">
            All plans include 0% SellFlow platform fee · You only pay your payment provider's standard processing fee
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6 bg-[#F8F8FC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[28px] font-800 text-[#0B0B18] tracking-tight mb-8 text-center">Full feature comparison</h2>
          <div className="bg-white rounded-2xl border border-[#E4E4EF] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E4EF]">
                  <th className="px-5 py-4 text-left text-[12.5px] font-600 text-[#9292A8] w-[45%]">Feature</th>
                  {["Free", "Creator", "Pro"].map((p, i) => (
                    <th key={p} className={`px-5 py-4 text-center text-[13px] font-700 ${i === 1 ? "text-[#5847F5] bg-[#FAFAFF]" : "text-[#0B0B18]"}`}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ feature, free, creator, pro }) => (
                  <tr key={feature} className="border-b border-[#F4F4F8] last:border-none">
                    <td className="px-5 py-3 text-[13px] text-[#4E4E68]">{feature}</td>
                    {[free, creator, pro].map((val, i) => (
                      <td key={i} className={`px-5 py-3 text-center ${i === 1 ? "bg-[#FAFAFF]" : ""}`}>
                        {typeof val === "boolean" ? (
                          val ? (
                            <div className="flex justify-center"><Check size={15} className="text-[#0CAF60]" strokeWidth={2.5} /></div>
                          ) : (
                            <span className="text-[#D0D0E0] text-[16px]">—</span>
                          )
                        ) : (
                          <span className="text-[12.5px] font-500 text-[#0B0B18]">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[28px] font-800 text-[#0B0B18] tracking-tight mb-8 text-center">Pricing questions answered</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-[#F8F8FC] rounded-xl border border-[#E4E4EF] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[14px] font-600 text-[#0B0B18]">{q}</span>
                  <span className={`text-[18px] text-[#9292A8] transition-transform inline-block ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-[13.5px] text-[#4E4E68] leading-relaxed border-t border-[#E4E4EF]">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[#0B0B18]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-[32px] font-800 text-white tracking-tight mb-3">Start selling today — for free.</h2>
          <p className="text-[15px] text-[#9292A8] mb-7">No credit card required. Upgrade only when you're ready.</p>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-8 py-3.5 rounded-xl text-[15px] transition-colors shadow-[0_4px_20px_rgba(88,71,245,0.35)]"
          >
            <Sparkles size={15} />
            Create Your Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a2e] bg-[#0B0B18] py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#5847F5] flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[14px] font-700 text-white">SellFlow</span>
          </div>
          <div className="text-[12.5px] text-[#4E4E68]">© 2026 SellFlow · Built for African creators, ready for the world.</div>
        </div>
      </footer>
    </div>
  );
}
