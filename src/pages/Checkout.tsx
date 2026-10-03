import { useNavigate } from "react-router-dom";
import { Lock, AlertCircle, Loader2, Check } from "lucide-react";
import { useState } from "react";

type PayMethod = "card" | "transfer" | "ussd";

export default function Checkout() {
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return digits;
  };

  const validate = () => {
    if (!name.trim()) return "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (payMethod === "card") {
      if (cardNum.replace(/\s/g, "").length < 16) return "Please enter a valid 16-digit card number.";
      if (expiry.replace(/\s/g, "").length < 4) return "Please enter a valid expiry date.";
      if (cvv.length < 3) return "Please enter a valid CVV.";
    }
    return "";
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    // Simulate Paystack payment — replace with real Paystack popup
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    navigate("/checkout/success");
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] px-4 py-10">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-7">
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Complete your purchase</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-1">You're one step away from instant access.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-[#FEE2E2] text-[#EF4444] text-[12.5px] font-500 px-3.5 py-2.5 rounded-xl mb-4">
            <AlertCircle size={14} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handlePay} className="space-y-4">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="text-[11.5px] font-700 text-[#9292A8] uppercase tracking-widest mb-3">Order summary</div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white font-800 shrink-0">CB</div>
              <div className="flex-1">
                <div className="text-[14px] font-700 text-[#0B0B18]">The Cake Business Sales Playbook</div>
                <div className="text-[12px] text-[#9292A8]">PDF · Instant download</div>
              </div>
              <div className="text-[16px] font-800 text-[#0B0B18]">₦15,000</div>
            </div>
            <div className="border-t border-[#F4F4F8] mt-4 pt-3 flex justify-between items-center">
              <span className="text-[13px] font-700 text-[#0B0B18]">Total</span>
              <span className="text-[16px] font-800 text-[#0B0B18]">₦15,000</span>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="text-[11.5px] font-700 text-[#9292A8] uppercase tracking-widest mb-3">Your information</div>
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(""); }}
                  placeholder="Amaka Okonkwo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="amaka@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                />
                <div className="text-[11.5px] text-[#9292A8] mt-1">Your download link will be sent here.</div>
              </div>
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Phone number <span className="text-[#9292A8] font-400">(optional)</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="text-[11.5px] font-700 text-[#9292A8] uppercase tracking-widest mb-3">Payment method</div>
            <div className="flex gap-2 mb-4">
              {([
                { id: "card", label: "Card" },
                { id: "transfer", label: "Bank Transfer" },
                { id: "ussd", label: "USSD" },
              ] as { id: PayMethod; label: string }[]).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayMethod(id)}
                  className={`flex-1 py-2.5 rounded-xl text-[12.5px] font-600 border transition-colors ${
                    payMethod === id
                      ? "border-[#5847F5] bg-[#EEF0FF] text-[#5847F5]"
                      : "border-[#E4E4EF] text-[#9292A8] hover:bg-[#F8F8FC]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {payMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Card number</label>
                  <input
                    value={cardNum}
                    onChange={e => { setCardNum(formatCard(e.target.value)); setError(""); }}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] font-mono focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Expiry date</label>
                    <input
                      value={expiry}
                      onChange={e => { setExpiry(formatExpiry(e.target.value)); setError(""); }}
                      placeholder="MM / YY"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] font-mono focus:outline-none focus:border-[#5847F5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">CVV</label>
                    <input
                      value={cvv}
                      onChange={e => { setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }}
                      placeholder="•••"
                      type="password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] font-mono focus:outline-none focus:border-[#5847F5] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {payMethod === "transfer" && (
              <div className="bg-[#F8F8FC] rounded-xl p-4 space-y-2.5">
                <div className="text-[12.5px] font-700 text-[#0B0B18] mb-1">Bank transfer details</div>
                {[
                  ["Bank", "Paystack MFB"],
                  ["Account number", "9876543210"],
                  ["Account name", "Sellfinix (Ola Creates)"],
                  ["Amount", "₦15,000"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-[12.5px]">
                    <span className="text-[#9292A8]">{label}</span>
                    <span className="font-600 text-[#0B0B18]">{val}</span>
                  </div>
                ))}
                <div className="text-[11.5px] text-[#9292A8] pt-1 border-t border-[#E4E4EF] mt-1">
                  Transfer the exact amount. Your access will be activated automatically once confirmed.
                </div>
              </div>
            )}

            {payMethod === "ussd" && (
              <div className="bg-[#F8F8FC] rounded-xl p-4 text-center">
                <div className="text-[18px] font-800 text-[#0B0B18] mb-2">*737*000*15000*001#</div>
                <div className="text-[12.5px] text-[#4E4E68]">Dial this USSD code on your phone to pay ₦15,000 via GTBank. Your access will be activated once payment is confirmed.</div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-700 py-4 rounded-2xl text-[15px] transition-colors shadow-[0_4px_16px_rgba(88,71,245,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" />Processing payment…</>
            ) : (
              <><Lock size={16} />Pay ₦15,000</>
            )}
          </button>

          <div className="text-center space-y-1.5">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11.5px] text-[#9292A8]">
              <span className="flex items-center gap-1"><Lock size={11} /> Secured by Paystack</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-[#0CAF60]" /> 30-day money-back guarantee</span>
            </div>
            <div className="text-[11.5px] text-[#9292A8]">
              After payment, your download link will be sent to your email instantly.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
