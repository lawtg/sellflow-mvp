import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Eye, Edit2, ExternalLink, Plus, Package, Sparkles } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "The Cake Business Sales Playbook",
    type: "PDF",
    price: "₦15,000",
    status: "Published",
    sales: 28,
    revenue: "₦420,000",
    updated: "2 days ago",
    initials: "CB",
    color: "from-[#5847F5] to-[#7C3AED]",
  },
  {
    id: "2",
    name: "Think Like a Consultant",
    type: "PDF",
    price: "₦25,000",
    status: "Published",
    sales: 14,
    revenue: "₦350,000",
    updated: "1 week ago",
    initials: "TC",
    color: "from-[#0CAF60] to-[#059669]",
  },
  {
    id: "3",
    name: "Korean Skin Care Guide",
    type: "Guide",
    price: "₦9,900",
    status: "Draft",
    sales: 5,
    revenue: "₦49,500",
    updated: "3 weeks ago",
    initials: "KS",
    color: "from-[#F59E0B] to-[#D97706]",
  },
];

const FILTERS = ["All", "Published", "Draft", "Archived"] as const;
type Filter = typeof FILTERS[number];

export default function Products() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter(p => {
    const matchFilter = filter === "All" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Products</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">{allProducts.length} products · {allProducts.filter(p => p.status === "Published").length} published</p>
        </div>
        <button
          onClick={() => navigate("/products/create")}
          className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create Product
        </button>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex gap-1 bg-[#F4F4F8] p-1 rounded-xl">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-500 transition-colors ${filter === f ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8] hover:text-[#4E4E68]"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9292A8]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E4E4EF] bg-white text-[13px] focus:outline-none focus:border-[#5847F5] transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
            <Package size={20} className="text-[#5847F5]" />
          </div>
          {search ? (
            <>
              <h3 className="text-[16px] font-700 text-[#0B0B18] mb-2">No results for "{search}"</h3>
              <p className="text-[13.5px] text-[#9292A8]">Try a different search term or clear the filter.</p>
              <button onClick={() => setSearch("")} className="mt-4 text-[13px] text-[#5847F5] font-500 hover:underline">Clear search</button>
            </>
          ) : (
            <>
              <h3 className="text-[16px] font-700 text-[#0B0B18] mb-2">No products yet</h3>
              <p className="text-[13.5px] text-[#9292A8] mb-5 max-w-xs mx-auto">
                Your first digital product is waiting. Upload your ebook and let AI build your sales page.
              </p>
              <button
                onClick={() => navigate("/products/create")}
                className="inline-flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                <Sparkles size={14} />
                Create Product
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#F4F4F8]">
                {["Product", "Type", "Price", "Status", "Sales", "Revenue", "Updated", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ id, name, type, price, status, sales, revenue, updated, initials, color }) => (
                <tr
                  key={id}
                  className="border-b border-[#F4F4F8] last:border-none hover:bg-[#FAFAFD] transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-[11px] font-700 shrink-0`}>
                        {initials}
                      </div>
                      <button
                        onClick={() => navigate(`/products/${id}`)}
                        className="text-[13px] font-600 text-[#0B0B18] hover:text-[#5847F5] text-left transition-colors leading-snug"
                      >
                        {name}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11.5px] bg-[#F4F4F8] text-[#4E4E68] px-2 py-0.5 rounded font-500">{type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">{price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11.5px] font-600 px-2.5 py-1 rounded-full ${status === "Published" ? "bg-[#E6F9F0] text-[#0CAF60]" : "bg-[#F4F4F8] text-[#9292A8]"}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{sales}</td>
                  <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">{revenue}</td>
                  <td className="px-5 py-3.5 text-[12px] text-[#9292A8]">{updated}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/products/${id}`)}
                        className="p-1.5 rounded-lg hover:bg-[#EEF0FF] text-[#9292A8] hover:text-[#5847F5] transition-colors"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => navigate("/products/editor")}
                        className="p-1.5 rounded-lg hover:bg-[#EEF0FF] text-[#9292A8] hover:text-[#5847F5] transition-colors"
                        title="Edit sales page"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => navigate(`/p/ola/${id}`)}
                        className="p-1.5 rounded-lg hover:bg-[#EEF0FF] text-[#9292A8] hover:text-[#5847F5] transition-colors"
                        title="View public page"
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
