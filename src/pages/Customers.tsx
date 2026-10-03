import { useState, useMemo } from "react";
import { Search, X, Mail, Send, Loader2 } from "lucide-react";

const allCustomers = [
  { name: "Amaka Okonkwo", email: "amaka@gmail.com", phone: "+234 802 111 2222", products: 2, spent: "₦30,000", last: "2 days ago", joined: "Mar 2026" },
  { name: "Chidi Nwosu", email: "chidi@yahoo.com", phone: "+234 803 333 4444", products: 1, spent: "₦25,000", last: "4 days ago", joined: "Feb 2026" },
  { name: "Blessing Idowu", email: "blessing@gmail.com", phone: "+234 806 555 6666", products: 1, spent: "₦15,000", last: "1 week ago", joined: "Jan 2026" },
  { name: "Sola Fashola", email: "sola@hotmail.com", phone: "+234 807 777 8888", products: 3, spent: "₦49,900", last: "2 weeks ago", joined: "Dec 2025" },
  { name: "Tunde Adewale", email: "tunde@gmail.com", phone: "+234 809 999 0000", products: 1, spent: "₦15,000", last: "3 weeks ago", joined: "Nov 2025" },
  { name: "Ngozi Obi", email: "ngozi@gmail.com", phone: "+234 810 100 2000", products: 2, spent: "₦24,900", last: "1 month ago", joined: "Oct 2025" },
];

const productPurchases: Record<string, string[]> = {
  "amaka@gmail.com": ["The Cake Business Sales Playbook", "Think Like a Consultant"],
  "chidi@yahoo.com": ["Think Like a Consultant"],
  "blessing@gmail.com": ["The Cake Business Sales Playbook"],
  "sola@hotmail.com": ["The Cake Business Sales Playbook", "Think Like a Consultant", "Korean Skin Care Guide"],
  "tunde@gmail.com": ["The Cake Business Sales Playbook"],
  "ngozi@gmail.com": ["The Cake Business Sales Playbook", "Korean Skin Care Guide"],
};

type Customer = typeof allCustomers[0];

export default function Customers() {
  const [selected, setSelected] = useState<Customer | null>(null);
  const [search, setSearch] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() =>
    allCustomers.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setTimeout(() => { setSent(false); setEmailOpen(false); setEmailSubject(""); setEmailBody(""); }, 1800);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Customers</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">
            {allCustomers.length} customers · ₦819,500 total revenue
          </p>
        </div>
        <div className="relative w-full sm:w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9292A8]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E4E4EF] bg-white text-[13px] focus:outline-none focus:border-[#5847F5] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9292A8] hover:text-[#4E4E68]"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-5 flex-col lg:flex-row">
        {/* Table */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] p-10 text-center">
              <div className="text-[14px] font-700 text-[#0B0B18] mb-1">No results for "{search}"</div>
              <p className="text-[13px] text-[#9292A8] mb-3">Try a different name or email.</p>
              <button onClick={() => setSearch("")} className="text-[13px] text-[#5847F5] font-500 hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="border-b border-[#F4F4F8]">
                    {["Customer", "Products", "Total spent", "Last purchase", "Joined", ""].map(h => (
                      <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr
                      key={c.email}
                      onClick={() => setSelected(prev => prev?.email === c.email ? null : c)}
                      className={`border-b border-[#F4F4F8] last:border-none cursor-pointer transition-colors ${
                        selected?.email === c.email ? "bg-[#EEF0FF]" : "hover:bg-[#FAFAFD]"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[10px] font-700 shrink-0">
                            {c.name[0]}
                          </div>
                          <div>
                            <div className="text-[13px] font-600 text-[#0B0B18]">{c.name}</div>
                            <div className="text-[11.5px] text-[#9292A8]">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{c.products}</td>
                      <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">{c.spent}</td>
                      <td className="px-5 py-3.5 text-[12.5px] text-[#9292A8]">{c.last}</td>
                      <td className="px-5 py-3.5 text-[12.5px] text-[#9292A8]">{c.joined}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={e => { e.stopPropagation(); setSelected(c); }}
                          className="text-[12px] text-[#5847F5] font-500 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer detail drawer */}
        {selected && (
          <div className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E4E4EF] p-5 self-start">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[13.5px] font-700 text-[#0B0B18]">Customer detail</div>
              <button onClick={() => setSelected(null)} className="text-[#9292A8] hover:text-[#4E4E68]">
                <X size={15} />
              </button>
            </div>

            {/* Avatar + info */}
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[16px] font-800 mx-auto mb-2">
                {selected.name[0]}
              </div>
              <div className="text-[14px] font-700 text-[#0B0B18]">{selected.name}</div>
              <div className="text-[12px] text-[#9292A8]">{selected.email}</div>
              {selected.phone && (
                <div className="text-[12px] text-[#9292A8] mt-0.5">{selected.phone}</div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ["Products", selected.products.toString()],
                ["Total spent", selected.spent],
              ].map(([l, v]) => (
                <div key={l} className="bg-[#F8F8FC] rounded-xl p-3">
                  <div className="text-[15px] font-800 text-[#0B0B18]">{v}</div>
                  <div className="text-[11px] text-[#9292A8]">{l}</div>
                </div>
              ))}
            </div>

            {/* Purchases */}
            <div className="mb-4">
              <div className="text-[11px] font-600 text-[#9292A8] mb-2 uppercase tracking-widest">Purchases</div>
              <div className="space-y-1">
                {(productPurchases[selected.email] || []).map(p => (
                  <div key={p} className="flex items-center gap-2 py-1.5 border-b border-[#F4F4F8] last:border-none">
                    <div className="w-5 h-5 rounded-md bg-[#EEF0FF] flex items-center justify-center text-[8px] font-700 text-[#5847F5] shrink-0">
                      P
                    </div>
                    <div className="text-[12px] text-[#0B0B18] font-500 leading-snug">{p}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email CTA */}
            <button
              onClick={() => setEmailOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-2.5 rounded-xl text-[13px] transition-colors"
            >
              <Mail size={14} />
              Send email
            </button>

            <div className="mt-2 text-[11px] text-[#9292A8] text-center">
              Customer since {selected.joined} · Last purchase {selected.last}
            </div>
          </div>
        )}
      </div>

      {/* Send email modal */}
      {emailOpen && selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4EF]">
              <div>
                <div className="text-[15px] font-700 text-[#0B0B18]">Send email</div>
                <div className="text-[12px] text-[#9292A8]">To: {selected.name} ({selected.email})</div>
              </div>
              <button onClick={() => setEmailOpen(false)} className="text-[#9292A8] hover:text-[#4E4E68]">
                <X size={16} />
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#E6F9F0] flex items-center justify-center mx-auto mb-3">
                  <Send size={20} className="text-[#0CAF60]" />
                </div>
                <div className="text-[15px] font-700 text-[#0B0B18]">Email sent!</div>
                <div className="text-[12.5px] text-[#9292A8] mt-1">Your message has been delivered.</div>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                <div>
                  <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Subject</label>
                  <input
                    value={emailSubject}
                    onChange={e => setEmailSubject(e.target.value)}
                    required
                    placeholder="Subject line…"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                    required
                    placeholder={`Hi ${selected.name.split(" ")[0]},\n\nWrite your message here…`}
                    className="w-full px-3.5 py-3 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] resize-none transition-colors"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="flex-1 border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 text-white font-600 py-2.5 rounded-xl text-[13.5px] transition-colors"
                  >
                    {sending
                      ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                      : <><Send size={14} /> Send</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
