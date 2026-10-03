import { useNavigate } from "react-router-dom";
import { Check, ExternalLink, Edit, Sparkles, FileText, ArrowLeft } from "lucide-react";

const setupSteps = [
  { label: "Product created", done: true },
  { label: "PDF uploaded", done: true },
  { label: "Sales page created", done: true },
  { label: "Payment connected", done: false },
  { label: "Published", done: false },
];

export default function ProductDetail() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <button onClick={() => navigate("/products")} className="flex items-center gap-1.5 text-[13px] text-[#9292A8] hover:text-[#4E4E68] mb-6 transition-colors">
        <ArrowLeft size={14} />
        Back to Products
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Product card */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[20px] font-800 shrink-0">CB</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-[20px] font-800 text-[#0B0B18] tracking-tight">The Cake Business Sales Playbook</h1>
                  <span className="text-[11.5px] bg-[#E6F9F0] text-[#0CAF60] px-2.5 py-1 rounded-full font-600">Published</span>
                </div>
                <p className="text-[13.5px] text-[#4E4E68] mb-3">A complete playbook for home bakers to build a profitable cake business and get consistent orders.</p>
                <div className="flex items-center gap-4 text-[12.5px]">
                  <span className="flex items-center gap-1.5"><span className="text-[#9292A8]">Price:</span><span className="font-700 text-[#0B0B18]">₦15,000</span></span>
                  <span className="flex items-center gap-1.5"><span className="text-[#9292A8]">Type:</span><span className="font-500 text-[#0B0B18]">PDF</span></span>
                  <span className="flex items-center gap-1.5"><FileText size={12} className="text-[#9292A8]" /><span className="text-[#9292A8]">cake-business-playbook.pdf · 4.2 MB</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#F4F4F8]">
              <button
                onClick={() => navigate("/products/editor")}
                className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-4 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                <Sparkles size={14} />
                Build Sales Page
              </button>
              <button className="flex items-center gap-2 border border-[#E4E4EF] text-[#0B0B18] font-500 px-4 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors">
                <ExternalLink size={14} />
                Preview Page
              </button>
              <button
                onClick={() => navigate("/p/ola/cake-playbook")}
                className="flex items-center gap-2 border border-[#E4E4EF] text-[#0B0B18] font-500 px-4 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
              >
                View public page
              </button>
              <button className="flex items-center gap-2 border border-[#E4E4EF] text-[#4E4E68] font-500 px-4 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors ml-auto">
                <Edit size={13} />
                Edit
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[["342", "Page views"], ["28", "Orders"], ["₦420,000", "Revenue"]].map(([v, l]) => (
              <div key={l} className="bg-white rounded-2xl border border-[#E4E4EF] p-4">
                <div className="text-[22px] font-800 text-[#0B0B18]">{v}</div>
                <div className="text-[12px] text-[#9292A8] mt-0.5">{l}</div>
              </div>
            ))}
          </div>

          {/* Sales page sections preview */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[14px] font-700 text-[#0B0B18]">Sales page sections</div>
              <button onClick={() => navigate("/products/editor")} className="text-[12.5px] text-[#5847F5] font-500 hover:underline">Open editor</button>
            </div>
            <div className="space-y-2">
              {[
                { section: "Hero", status: "Complete" },
                { section: "Problem", status: "Complete" },
                { section: "Transformation", status: "Complete" },
                { section: "Benefits", status: "Complete" },
                { section: "What's Inside", status: "Complete" },
                { section: "Testimonials", status: "Missing" },
                { section: "FAQ", status: "Complete" },
                { section: "Offer", status: "Complete" },
              ].map(({ section, status }) => (
                <div key={section} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F8F8FC] transition-colors">
                  <span className="text-[13px] font-500 text-[#0B0B18]">{section}</span>
                  <span className={`text-[11.5px] font-600 ${status === "Complete" ? "text-[#0CAF60]" : "text-[#F59E0B]"}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Product setup */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="text-[14px] font-700 text-[#0B0B18] mb-4">Product setup</div>
            <div className="space-y-3">
              {setupSteps.map(({ label, done }, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? "bg-[#0CAF60]" : "border-2 border-[#E4E4EF]"}`}>
                    {done && <Check size={11} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13px] ${done ? "text-[#0B0B18] font-500" : "text-[#9292A8]"}`}>{label}</span>
                </div>
              ))}
            </div>
            {/* Next action */}
            <div className="mt-4 pt-4 border-t border-[#F4F4F8]">
              <div className="text-[12px] text-[#9292A8] mb-2">Next step</div>
              <button className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-2.5 rounded-xl text-[13px] transition-colors">
                Connect Payment
              </button>
            </div>
          </div>

          {/* Product link */}
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
            <div className="text-[14px] font-700 text-[#0B0B18] mb-1">Sales page link</div>
            <div className="text-[12px] text-[#9292A8] mb-3">Share this link to start selling</div>
            <div className="flex items-center gap-2 bg-[#F8F8FC] rounded-xl px-3 py-2 border border-[#E4E4EF]">
              <span className="text-[12px] text-[#4E4E68] flex-1 truncate">sellflow.co/p/ola/cake-playbook</span>
              <button className="text-[#5847F5] text-[11.5px] font-600 hover:underline shrink-0">Copy</button>
            </div>
          </div>

          {/* AI tip */}
          <div className="bg-[#F0EBFF] border border-[#D4CCFF] rounded-2xl p-4">
            <div className="text-[12px] font-700 text-[#7C3AED] mb-1.5 flex items-center gap-1.5"><Sparkles size={12} />AI suggestion</div>
            <div className="text-[12.5px] text-[#4E4E68] leading-relaxed">Add at least one testimonial to your sales page — products with social proof convert 23% better on average.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
