import { useNavigate } from "react-router-dom";
import { Check, Star, ChevronDown, Zap, Share2 } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Who is this for?", a: "This playbook is for Nigerian home bakers who are talented but struggling to build a consistent, profitable cake business. If you're tired of undercharging and attracting time-wasters, this is for you." },
  { q: "Is this a physical book?", a: "No — this is a digital PDF you can download instantly after payment. Start reading in minutes." },
  { q: "What if I already have customers?", a: "This playbook helps you attract more of the right customers and stop depending on random word-of-mouth referrals. It works at any stage." },
  { q: "Is there a refund policy?", a: "Yes. If you've gone through the playbook and implemented the strategies without results within 30 days, contact us for a full refund." },
  { q: "How is this different from free content online?", a: "This is a structured, Nigeria-specific system built for cake businesses specifically — not generic business advice. Everything applies directly to your situation." },
];

export default function PublicSalesPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Minimal store nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E4E4EF]">
        <div className="max-w-2xl mx-auto px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#5847F5] flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-700 text-[#0B0B18]">Ola Creates</span>
          </div>
          <button className="flex items-center gap-1.5 text-[12.5px] text-[#4E4E68] hover:text-[#0B0B18] transition-colors">
            <Share2 size={13} />
            Share
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0B0B18] text-white pt-16 pb-14 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block text-[10.5px] font-600 bg-white/10 text-white/70 px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            For home bakers who want more orders
          </div>
          <h1 className="text-[36px] sm:text-[44px] font-800 leading-[1.08] tracking-tight mb-5">
            Stop baking for free. Start building a cake business that pays you{" "}
            <span className="text-[#8B74FF]">consistently.</span>
          </h1>
          <p className="text-[#ADADC4] text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
            The Cake Business Sales Playbook gives you the exact strategies to price with confidence, attract serious customers, and build a reliable income from your baking — even if you're starting from scratch.
          </p>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 px-8 py-4 rounded-2xl text-[15px] transition-colors shadow-[0_4px_24px_rgba(88,71,245,0.4)] w-full sm:w-auto"
          >
            Get the Playbook — ₦15,000
          </button>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[11.5px] text-[#9292A8]">
            <span>🔒 Secure payment</span>
            <span>⚡ Instant download</span>
            <span>✓ 30-day guarantee</span>
            <span>📄 PDF · 4.2 MB</span>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="bg-[#F8F8FC] border-b border-[#E4E4EF] py-3 px-5">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-5 text-[12px] text-[#4E4E68]">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-[#F59E0B] fill-[#F59E0B]" />)}
            </div>
            <span className="font-600 text-[#0B0B18]">4.9</span> from 28 buyers
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#0CAF60] font-700">✓</span> 28 students enrolled
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#5847F5] font-700">↺</span> 30-day refund policy
          </div>
        </div>
      </div>

      {/* Problem */}
      <section className="py-14 px-5 bg-[#F8F8FC]">
        <div className="max-w-xl mx-auto">
          <div className="text-[10.5px] font-700 text-[#5847F5] uppercase tracking-widest mb-3 text-center">Sound familiar?</div>
          <h2 className="text-[26px] font-800 text-[#0B0B18] text-center mb-7 tracking-tight leading-snug">
            You make amazing cakes.<br className="hidden sm:block" /> But the business side is exhausting.
          </h2>
          <div className="space-y-2.5">
            {[
              "You post your cakes on WhatsApp and get 'how much?' with no actual orders",
              "Customers negotiate your prices down and you feel powerless to say no",
              "You're working hard but can't seem to reach a consistent income",
              "You don't know how to attract customers who will pay what your cakes are worth",
            ].map(p => (
              <div key={p} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E4E4EF]">
                <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#EF4444] text-[10px] font-700">✗</span>
                </div>
                <span className="text-[13px] text-[#4E4E68]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation */}
      <section className="py-14 px-5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-3 leading-snug">
            Imagine waking up to cake orders in your inbox.
          </h2>
          <p className="text-[14px] text-[#4E4E68] leading-relaxed mb-7">
            That's what happens when you stop guessing and start using a proven system.
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-left">
            {[
              "You have a clear pricing strategy customers respect and don't argue with",
              "Your WhatsApp marketing brings in serious buyers, not time-wasters",
              "You have a consistent system for getting orders every week",
              "You feel confident saying no to low-budget customers",
            ].map(t => (
              <div key={t} className="flex items-start gap-3 bg-[#E6F9F0] rounded-xl p-3.5">
                <div className="w-5 h-5 rounded-full bg-[#0CAF60] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[13px] text-[#0B0B18] font-500">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-14 px-5 bg-[#F8F8FC]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-1 text-center">What's inside</h2>
          <p className="text-[13.5px] text-[#4E4E68] text-center mb-7">7 chapters. Everything you need.</p>
          <div className="space-y-2.5">
            {[
              ["Chapter 1", "The Cake Business Mindset Shift", "How to think like a business owner, not just a baker."],
              ["Chapter 2", "Pricing with Confidence", "The exact formula to price your cakes profitably without second-guessing."],
              ["Chapter 3", "Finding Your Perfect Customer", "How to identify and attract customers who value quality and pay without negotiating."],
              ["Chapter 4", "WhatsApp Sales System", "Scripts and strategies to convert inquiries into paid orders consistently."],
              ["Chapter 5", "Your Brand Story", "How to position yourself so customers choose you over cheaper alternatives."],
              ["Chapter 6", "The 30-Day Order System", "A step-by-step action plan to your first consistent month of orders."],
              ["Bonus", "Cake Business Pricing Worksheet", "A fillable template to calculate your pricing for any cake order."],
            ].map(([num, title, desc]) => (
              <div key={title} className="flex gap-4 bg-white rounded-xl p-4 border border-[#E4E4EF]">
                <div className="w-11 h-11 rounded-xl bg-[#EEF0FF] flex items-center justify-center shrink-0">
                  <span className="text-[9.5px] font-700 text-[#5847F5] text-center leading-tight">{num}</span>
                </div>
                <div>
                  <div className="text-[13px] font-700 text-[#0B0B18] mb-0.5">{title}</div>
                  <div className="text-[12px] text-[#4E4E68]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-10 px-5 bg-[#0B0B18]">
        <div className="max-w-md mx-auto text-center">
          <div className="text-[14px] font-700 text-white mb-1">Get instant access</div>
          <div className="text-[40px] font-800 text-white">₦15,000</div>
          <div className="text-[12.5px] text-[#9292A8] mb-5">One-time · Instant download · 30-day guarantee</div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 py-4 rounded-2xl text-[15px] transition-colors shadow-[0_4px_20px_rgba(88,71,245,0.4)]"
          >
            Get the Playbook Now
          </button>
          <div className="text-[11.5px] text-[#9292A8] mt-3">🔒 Payment secured · Delivered to your email instantly</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-5">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-7 text-center">What other bakers are saying</h2>
          <div className="space-y-4">
            {[
              { name: "Amaka Okonkwo", role: "Home baker, Lagos", text: "I was skeptical but I tripled my cake orders within 3 weeks of using this playbook. The WhatsApp scripts alone were worth it.", stars: 5 },
              { name: "Blessing Idowu", role: "Cake business owner, Abuja", text: "I finally raised my prices. My customers didn't leave — I actually got more serious inquiries. Mind-blowing.", stars: 5 },
              { name: "Chisom Eze", role: "Home baker, Port Harcourt", text: "Before this I had no system. Now I get consistent orders every week. This changed my business completely.", stars: 5 },
            ].map(({ name, role, text, stars }) => (
              <div key={name} className="bg-[#F8F8FC] rounded-2xl p-5 border border-[#E4E4EF]">
                <div className="flex items-center gap-0.5 mb-2.5">
                  {[...Array(stars)].map((_, i) => <Star key={i} size={13} className="text-[#F59E0B] fill-[#F59E0B]" />)}
                </div>
                <p className="text-[13px] text-[#4E4E68] leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[10px] font-700">
                    {name[0]}
                  </div>
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

      {/* Creator */}
      <section className="py-14 px-5 bg-[#F8F8FC]">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[22px] font-800 shrink-0">OA</div>
            <div>
              <div className="text-[11px] font-600 text-[#9292A8] uppercase tracking-widest mb-1">About the author</div>
              <h3 className="text-[18px] font-700 text-[#0B0B18] mb-0.5">Ola Adeyemi</h3>
              <div className="text-[12.5px] text-[#9292A8] mb-3">Business strategist & creator educator · Lagos, Nigeria</div>
              <p className="text-[13.5px] text-[#4E4E68] leading-relaxed">
                I spent 6 years helping small business owners in Nigeria build systems that work. This playbook is everything I've learned, applied specifically to the cake business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-10 px-5">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-6 text-center">
            <div className="text-[32px] mb-3">🛡️</div>
            <h3 className="text-[18px] font-700 text-[#0B0B18] mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-[13.5px] text-[#4E4E68] leading-relaxed">
              If you go through the playbook and implement the strategies without results within 30 days, contact us for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-5 bg-[#F8F8FC]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="border border-[#E4E4EF] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[13.5px] font-600 text-[#0B0B18] pr-4">{q}</span>
                  <ChevronDown size={15} className={`text-[#9292A8] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-[13px] text-[#4E4E68] leading-relaxed border-t border-[#F4F4F8]">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final offer CTA */}
      <section className="py-14 px-5 bg-[#0B0B18]">
        <div className="max-w-md mx-auto text-center">
          <div className="text-[13px] text-[#9292A8] mb-2">The Cake Business Sales Playbook</div>
          <div className="text-[48px] font-800 text-white mb-1">₦15,000</div>
          <div className="text-[12.5px] text-[#9292A8] mb-6">One-time · Instant download · 30-day guarantee</div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 py-4 rounded-2xl text-[15px] transition-colors shadow-[0_4px_24px_rgba(88,71,245,0.4)] mb-3"
          >
            Get the Playbook Now
          </button>
          <div className="text-[11.5px] text-[#9292A8]">🔒 Payment secured · Delivered to your email instantly</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0B18] border-t border-[#1a1a2e] py-5 px-5">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-[#4E4E68]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#5847F5] flex items-center justify-center">
              <Zap size={10} className="text-white" strokeWidth={2.5} />
            </div>
            <span>Powered by <span className="font-600 text-[#9292A8]">Sellfinix</span></span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#9292A8] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#9292A8] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#9292A8] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
