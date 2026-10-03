import { Plus } from "lucide-react";

const leads = [
  { name: "Fatima Bello", email: "fatima@gmail.com", source: "WhatsApp", magnet: "Free Pricing Guide", date: "2 days ago", status: "New" },
  { name: "Emeka Okafor", email: "emeka@gmail.com", source: "Instagram", magnet: "Free Pricing Guide", date: "3 days ago", status: "Contacted" },
  { name: "Grace Adesanya", email: "grace@yahoo.com", source: "Facebook", magnet: "Cake Business Checklist", date: "1 week ago", status: "New" },
  { name: "David Musa", email: "david@gmail.com", source: "Referral", magnet: "Cake Business Checklist", date: "2 weeks ago", status: "Converted" },
];

export default function Leads() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Leads</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">People who expressed interest but haven't purchased yet.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} strokeWidth={2.5} />
          Create Lead Magnet
        </button>
      </div>

      {/* Lead magnet cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {[
          { name: "Free Pricing Guide", leads: 28, conversions: 4 },
          { name: "Cake Business Checklist", leads: 15, conversions: 2 },
        ].map(({ name, leads: l, conversions }) => (
          <div key={name} className="bg-white rounded-2xl border border-[#E4E4EF] p-4 flex items-center justify-between">
            <div>
              <div className="text-[13.5px] font-700 text-[#0B0B18] mb-0.5">{name}</div>
              <div className="text-[12px] text-[#9292A8]">{l} leads · {conversions} converted</div>
            </div>
            <div className="text-[11.5px] bg-[#EEF0FF] text-[#5847F5] px-2.5 py-1 rounded-full font-600">Active</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E4EF]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F4F4F8]">
              {["Name", "Email", "Source", "Lead magnet", "Captured", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map(({ name, email, source, magnet, date, status }) => (
              <tr key={email} className="border-b border-[#F4F4F8] last:border-none hover:bg-[#FAFAFD] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[9px] font-700">{name[0]}</div>
                    <span className="text-[13px] font-500 text-[#0B0B18]">{name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{email}</td>
                <td className="px-5 py-3.5"><span className="text-[11.5px] bg-[#F4F4F8] text-[#4E4E68] px-2 py-0.5 rounded font-500">{source}</span></td>
                <td className="px-5 py-3.5 text-[12.5px] text-[#4E4E68]">{magnet}</td>
                <td className="px-5 py-3.5 text-[12.5px] text-[#9292A8]">{date}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11.5px] font-600 px-2.5 py-1 rounded-full ${status === "Converted" ? "bg-[#E6F9F0] text-[#0CAF60]" : status === "New" ? "bg-[#EEF0FF] text-[#5847F5]" : "bg-[#F4F4F8] text-[#9292A8]"}`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
