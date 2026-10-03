import { Download, Mail, Check } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#E6F9F0] flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-[#0CAF60]" strokeWidth={2.5} />
        </div>
        <h1 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-2">You're all set.</h1>
        <p className="text-[15px] text-[#4E4E68] mb-1">Your purchase was successful.</p>
        <p className="text-[13.5px] text-[#9292A8] mb-8">A receipt and download link have been sent to <span className="font-600 text-[#0B0B18]">amaka@gmail.com</span></p>

        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5 mb-5 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white font-800 shrink-0">CB</div>
            <div>
              <div className="text-[14px] font-700 text-[#0B0B18]">The Cake Business Sales Playbook</div>
              <div className="text-[12px] text-[#9292A8]">PDF · 4.2 MB</div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-3 rounded-xl text-[14px] transition-colors">
            <Download size={16} />
            Download Product
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-[#E4E4EF] text-[#4E4E68] font-500 py-3 rounded-xl text-[14px] hover:bg-white transition-colors">
          <Mail size={15} />
          Check your email
        </button>

        <div className="mt-5 text-[12px] text-[#9292A8]">
          Order #SF-2847 · ₦15,000 · Paid via Paystack
        </div>
      </div>
    </div>
  );
}
