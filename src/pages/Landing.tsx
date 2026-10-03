import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  Upload,
  Sparkles,
  Globe,
  CreditCard,
  Download,
  ChevronDown,
  Star,
  Check,
  Play,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Upload,
    title: "Upload your product",
    desc: "Drop in your PDF, ebook, guide, or workbook. SellFlow reads and understands what it is.",
  },
  {
    icon: Sparkles,
    title: "AI builds your sales page",
    desc: "Answer a few questions. SellFlow writes your headline, copy, benefits, and FAQ — instantly.",
  },
  {
    icon: CreditCard,
    title: "Connect payment",
    desc: "Accept payments in Naira, Cedis, Shillings, Rand, or USD. No payment setup headaches.",
  },
  {
    icon: Globe,
    title: "Publish and share",
    desc: "Your product goes live on a professional sales page. Share the link — start selling.",
  },
  {
    icon: Download,
    title: "Automatic delivery",
    desc: "Every customer gets instant access. Download links, email receipts — handled automatically.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₦0",
    sub: "forever",
    desc: "For creators just getting started.",
    features: ["1 product", "Up to 10 sales/month", "AI sales page builder", "Automatic delivery"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Creator",
    price: "₦9,900",
    sub: "per month",
    desc: "For creators building seriously.",
    features: ["Unlimited products", "Unlimited sales", "AI sales page builder", "Email campaigns", "Customer database", "Analytics", "Custom domain"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Pro",
    price: "₦24,900",
    sub: "per month",
    desc: "For creators scaling their business.",
    features: ["Everything in Creator", "Email automations", "Lead magnets", "Priority support", "Webhooks", "Advanced analytics"],
    cta: "Start free trial",
    featured: false,
  },
];

const faqs = [
  { q: "Do I need any technical skills to use SellFlow?", a: "No. SellFlow is designed so anyone can upload a product, build a sales page with AI, and start selling — without writing a single line of code." },
  { q: "Which payment methods do you support?", a: "We support Flutterwave and Paystack for African payments, plus Stripe for international. Customers can pay with cards, bank transfer, and mobile money." },
  { q: "How does AI build my sales page?", a: "When you upload your PDF, SellFlow reads it to understand what it teaches. Then we ask you a few targeted questions and generate a complete sales page — headline, benefits, FAQ, and CTA." },
  { q: "When do I get paid?", a: "Payouts are processed to your bank account on your selected schedule — daily, weekly, or monthly." },
  { q: "Can I use my own domain?", a: "Yes, on Creator and Pro plans you can connect a custom domain to your store and individual product pages." },
];

const testimonials = [
  { name: "Chisom Okafor", role: "Business coach, Lagos", text: "I uploaded my coaching guide on a Tuesday. By Thursday I had made my first ₦47,000. SellFlow wrote my sales page better than I could have.", avatar: "CO" },
  { name: "Amara Mensah", role: "Fitness creator, Accra", text: "I had no idea how to set up a sales page or collect payment. SellFlow did everything. My Korean Skincare Guide is already selling.", avatar: "AM" },
  { name: "Dele Adeyemi", role: "Marketing consultant, Ibadan", text: "The AI asked me 6 questions and built a sales page I would have paid a copywriter ₦200,000 for. This tool is special.", avatar: "DA" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#E4E4EF]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#5847F5] flex items-center justify-center">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-700 text-[#0B0B18] tracking-tight">SellFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[13.5px] text-[#4E4E68] hover:text-[#0B0B18] transition-colors">Features</a>
            <a onClick={() => navigate("/pricing")} href="#" className="text-[13.5px] text-[#4E4E68] hover:text-[#0B0B18] transition-colors cursor-pointer">Pricing</a>
            <a href="#faq" className="text-[13.5px] text-[#4E4E68] hover:text-[#0B0B18] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-[13.5px] font-500 text-[#4E4E68] hover:text-[#0B0B18] transition-colors">Log in</button>
            <button onClick={() => navigate("/signup")} className="bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2 rounded-lg transition-colors">Get started free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0EEFF] to-transparent opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EEF0FF] text-[#5847F5] text-[12px] font-600 px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={12} />
            AI-powered for African creators
          </div>
          <h1 className="text-[52px] md:text-[64px] font-800 text-[#0B0B18] leading-[1.07] tracking-tight mb-6">
            Turn your digital product<br />
            <span className="text-[#5847F5]">into a sales system.</span>
          </h1>
          <p className="text-[18px] text-[#4E4E68] leading-relaxed max-w-2xl mx-auto mb-8 font-400">
            Upload your PDF. SellFlow understands it, builds a professional sales page, handles payment, and delivers your product automatically. No tech skills required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-6 py-3.5 rounded-xl text-[15px] transition-colors shadow-[0_2px_16px_rgba(88,71,245,0.25)]"
            >
              Create Your Product
              <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 text-[#4E4E68] hover:text-[#0B0B18] font-500 px-6 py-3.5 text-[15px] transition-colors">
              <Play size={14} />
              See how it works
            </button>
          </div>
          <p className="mt-4 text-[12.5px] text-[#9292A8]">Free forever plan · No credit card required</p>
        </div>

        {/* Dashboard preview */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl border border-[#E4E4EF] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
            <div className="h-8 bg-[#F4F4F8] border-b border-[#E4E4EF] flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0CAF60]" />
            </div>
            <div className="bg-white flex">
              {/* Mini sidebar */}
              <div className="w-[180px] bg-white border-r border-[#E4E4EF] p-3 space-y-1">
                {["Dashboard", "Products", "Customers", "Analytics"].map((item, i) => (
                  <div key={item} className={`h-7 rounded-md flex items-center px-2 text-[11px] font-500 ${i === 0 ? "bg-[#EEF0FF] text-[#5847F5]" : "text-[#9292A8]"}`}>{item}</div>
                ))}
              </div>
              {/* Content */}
              <div className="flex-1 p-5">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[["₦284,500", "Revenue"], ["47", "Orders"], ["38", "Customers"], ["3", "Products"]].map(([val, label]) => (
                    <div key={label} className="bg-[#F8F8FC] rounded-xl p-3">
                      <div className="text-[16px] font-700 text-[#0B0B18]">{val}</div>
                      <div className="text-[10px] text-[#9292A8] font-500">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F0EEFF] border border-[#D4CCFF] rounded-xl p-3 mb-3">
                  <div className="text-[11px] font-600 text-[#5847F5] flex items-center gap-1.5 mb-1"><Sparkles size={10} /> SellFlow AI noticed something</div>
                  <div className="text-[10.5px] text-[#4E4E68] leading-relaxed">Your sales page gets visitors but fewer reach checkout. Strengthen your offer section.</div>
                </div>
                <div className="space-y-2">
                  {[["The Cake Business Sales Playbook", "₦15,000", "Published"], ["Think Like a Consultant", "₦25,000", "Published"]].map(([name, price, status]) => (
                    <div key={name} className="flex items-center justify-between bg-[#F8F8FC] rounded-lg px-3 py-2">
                      <div className="text-[11px] font-500 text-[#0B0B18]">{name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9292A8]">{price}</span>
                        <span className="text-[9.5px] bg-[#E6F9F0] text-[#0CAF60] px-2 py-0.5 rounded-full font-600">{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#F8F8FC]" id="features">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-600 text-[#5847F5] uppercase tracking-widest mb-3">How it works</div>
            <h2 className="text-[36px] font-800 text-[#0B0B18] tracking-tight">From product to sales system<br />in under 10 minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative bg-white rounded-2xl p-5 border border-[#E4E4EF]">
                <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] flex items-center justify-center mb-4">
                  <Icon size={16} className="text-[#5847F5]" strokeWidth={1.8} />
                </div>
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#F8F8FC] border border-[#E4E4EF] flex items-center justify-center text-[10px] font-700 text-[#9292A8]">{i + 1}</div>
                <div className="text-[13.5px] font-700 text-[#0B0B18] mb-1.5">{title}</div>
                <div className="text-[12.5px] text-[#4E4E68] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F0EBFF] text-[#7C3AED] text-[12px] font-600 px-3 py-1.5 rounded-full mb-6">
                <Sparkles size={12} />
                AI sales page builder
              </div>
              <h2 className="text-[36px] font-800 text-[#0B0B18] tracking-tight leading-tight mb-4">
                SellFlow reads your PDF and writes your sales page.
              </h2>
              <p className="text-[16px] text-[#4E4E68] leading-relaxed mb-6">
                Upload your product. Our AI analyzes what it teaches, who it's for, and what transformation it delivers — then generates a complete, conversion-ready sales page in seconds.
              </p>
              <ul className="space-y-3">
                {["Headline and subheadline written for conversion", "Benefits section pulled from your product content", "Who this is for — automatically identified", "FAQ built from your product's likely objections", "AI-powered improvement on every section"].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-[#4E4E68]">
                    <div className="w-4 h-4 rounded-full bg-[#E6F9F0] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={9} className="text-[#0CAF60]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* AI interview mockup */}
            <div className="bg-[#F8F8FC] rounded-2xl border border-[#E4E4EF] p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-[#5847F5] flex items-center justify-center">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div>
                  <div className="text-[12px] font-700 text-[#0B0B18]">SellFlow AI</div>
                  <div className="text-[11px] text-[#9292A8]">Building your sales page</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Reading your product", done: true },
                  { label: "Identifying your audience", done: true },
                  { label: "Analyzing the transformation", done: true },
                  { label: "Writing your sales copy", done: false },
                  { label: "Designing page structure", done: false },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${done ? "bg-[#0CAF60]" : "bg-[#E4E4EF]"}`}>
                      {done && <Check size={9} className="text-white" strokeWidth={3} />}
                      {!done && <div className="w-1.5 h-1.5 rounded-full bg-[#ADADC4] animate-pulse" />}
                    </div>
                    <span className={`text-[13px] ${done ? "text-[#0B0B18] font-500" : "text-[#9292A8]"}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white rounded-xl border border-[#E4E4EF] p-4">
                <div className="text-[11px] font-600 text-[#5847F5] mb-2">✦ Question 2 of 6</div>
                <div className="text-[13px] font-600 text-[#0B0B18] mb-2">Who is this product specifically for?</div>
                <div className="bg-[#F8F8FC] rounded-lg border border-[#E4E4EF] px-3 py-2 text-[12px] text-[#9292A8]">Beginner bakers who struggle to get consistent cake orders...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#F8F8FC]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#F59E0B] fill-[#F59E0B]" />)}
            </div>
            <h2 className="text-[32px] font-800 text-[#0B0B18] tracking-tight">Creators are already selling</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text, avatar }) => (
              <div key={name} className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#F59E0B] fill-[#F59E0B]" />)}
                </div>
                <p className="text-[13.5px] text-[#4E4E68] leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[11px] font-700">{avatar}</div>
                  <div>
                    <div className="text-[12.5px] font-700 text-[#0B0B18]">{name}</div>
                    <div className="text-[11.5px] text-[#9292A8]">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-800 text-[#0B0B18] tracking-tight mb-3">Simple, honest pricing</h2>
            <p className="text-[16px] text-[#4E4E68]">Start free. Upgrade when you're ready to grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map(({ name, price, sub, desc, features: f, cta, featured }) => (
              <div key={name} className={`rounded-2xl border p-6 ${featured ? "border-[#5847F5] ring-2 ring-[#5847F5]/20 bg-white" : "border-[#E4E4EF] bg-white"}`}>
                {featured && <div className="inline-block bg-[#5847F5] text-white text-[11px] font-700 px-2.5 py-1 rounded-full mb-3">Most popular</div>}
                <div className="text-[15px] font-700 text-[#0B0B18] mb-1">{name}</div>
                <div className="mb-1">
                  <span className="text-[32px] font-800 text-[#0B0B18]">{price}</span>
                  <span className="text-[13px] text-[#9292A8] ml-1">/{sub}</span>
                </div>
                <div className="text-[13px] text-[#4E4E68] mb-5">{desc}</div>
                <button
                  onClick={() => navigate("/signup")}
                  className={`w-full py-2.5 rounded-lg text-[13.5px] font-600 mb-5 transition-colors ${featured ? "bg-[#5847F5] hover:bg-[#4636E0] text-white" : "bg-[#F4F4F8] hover:bg-[#EEEEF4] text-[#0B0B18]"}`}
                >
                  {cta}
                </button>
                <ul className="space-y-2.5">
                  {f.map(item => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-[#4E4E68]">
                      <Check size={13} className="text-[#0CAF60] shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#F8F8FC]" id="faq">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[32px] font-800 text-[#0B0B18] tracking-tight mb-10 text-center">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E4E4EF] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[14px] font-600 text-[#0B0B18]">{q}</span>
                  <ChevronDown size={16} className={`text-[#9292A8] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-[13.5px] text-[#4E4E68] leading-relaxed border-t border-[#F4F4F8]">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#EEF0FF] text-[#5847F5] text-[12px] font-600 px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={12} />
            Built for African creators
          </div>
          <h2 className="text-[40px] font-800 text-[#0B0B18] tracking-tight mb-4 leading-tight">
            Your digital product deserves a real sales system.
          </h2>
          <p className="text-[16px] text-[#4E4E68] mb-8">Start free today. Build your first sales page in minutes.</p>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-8 py-4 rounded-xl text-[16px] transition-colors shadow-[0_2px_20px_rgba(88,71,245,0.3)] mx-auto"
          >
            Create Your Product — Free
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4E4EF] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#5847F5] flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[14px] font-700 text-[#0B0B18]">SellFlow</span>
          </div>
          <div className="text-[12.5px] text-[#9292A8]">© 2026 SellFlow · Built for African creators, ready for the world.</div>
          <div className="flex items-center gap-4 text-[12.5px] text-[#9292A8]">
            <a href="#" className="hover:text-[#4E4E68]">Privacy</a>
            <a href="#" className="hover:text-[#4E4E68]">Terms</a>
            <a href="#" className="hover:text-[#4E4E68]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
