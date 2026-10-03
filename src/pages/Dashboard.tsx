import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, TrendingUp, ArrowRight, ShoppingBag, Users, Package, DollarSign, X, Check, Package as PackageIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weekData = [
  { day: "Mon", v: 18000 },
  { day: "Tue", v: 24500 },
  { day: "Wed", v: 19000 },
  { day: "Thu", v: 31000 },
  { day: "Fri", v: 44200 },
  { day: "Sat", v: 52800 },
  { day: "Sun", v: 39500 },
];

const monthData = [
  { day: "Wk 1", v: 142000 },
  { day: "Wk 2", v: 198000 },
  { day: "Wk 3", v: 175000 },
  { day: "Wk 4", v: 229000 },
];

const products = [
  { name: "The Cake Business Sales Playbook", views: 342, orders: 28, revenue: "₦420,000", conv: "8.2%", status: "Published" },
  { name: "Think Like a Consultant", views: 198, orders: 14, revenue: "₦350,000", conv: "7.1%", status: "Published" },
  { name: "Korean Skin Care Guide", views: 88, orders: 5, revenue: "₦49,500", conv: "5.7%", status: "Draft" },
];

const orders = [
  { customer: "Amaka O.", product: "The Cake Business Sales Playbook", amount: "₦15,000", time: "3 min ago" },
  { customer: "Chidi N.", product: "Think Like a Consultant", amount: "₦25,000", time: "14 min ago" },
  { customer: "Tunde A.", product: "The Cake Business Sales Playbook", amount: "₦15,000", time: "1 hr ago" },
  { customer: "Bisi L.", product: "Korean Skin Care Guide", amount: "₦9,900", time: "2 hr ago" },
  { customer: "Sola F.", product: "The Cake Business Sales Playbook", amount: "₦15,000", time: "3 hr ago" },
];

const setupTasks = [
  { label: "Create your first product", done: true, href: "/products/create" },
  { label: "Build your AI sales page", done: true, href: "/products/editor" },
  { label: "Connect a payment provider", done: false, href: "/settings" },
  { label: "Publish your product", done: false, href: "/products/1" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Set to true to preview empty state
const IS_NEW_USER = false;

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSetup, setShowSetup] = useState(true);
  const [period, setPeriod] = useState<"week" | "month">("week");
  const chartData = period === "week" ? weekData : monthData;

  if (IS_NEW_USER) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">{getGreeting()} 👋</h1>
            <p className="text-[13.5px] text-[#9292A8] mt-0.5">Let's set up your first product.</p>
          </div>
          <button
            onClick={() => navigate("/products/create")}
            className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
          >
            + Create Product
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
            <PackageIcon size={22} className="text-[#5847F5]" />
          </div>
          <h2 className="text-[18px] font-700 text-[#0B0B18] mb-2">No products yet</h2>
          <p className="text-[13.5px] text-[#9292A8] leading-relaxed mb-6">
            Your first digital product is waiting. Upload your ebook and let AI build your sales page — ready to sell in minutes.
          </p>
          <button
            onClick={() => navigate("/products/create")}
            className="inline-flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-6 py-3 rounded-xl text-[14px] transition-colors"
          >
            <Sparkles size={15} />
            Create Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-800 text-[#0B0B18] tracking-tight">{getGreeting()}, Ola 👋</h1>
          <p className="text-[13px] text-[#9292A8] mt-0.5">Here's how your business is doing today.</p>
        </div>
        <button
          onClick={() => navigate("/products/create")}
          className="hidden sm:flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
        >
          + Create Product
        </button>
      </div>

      {/* Setup checklist */}
      {showSetup && (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[14px] font-700 text-[#0B0B18]">Finish setting up your store</div>
              <div className="text-[12px] text-[#9292A8] mt-0.5">
                {setupTasks.filter(t => t.done).length} of {setupTasks.length} steps complete
              </div>
            </div>
            <button onClick={() => setShowSetup(false)} className="text-[#9292A8] hover:text-[#4E4E68] transition-colors mt-0.5">
              <X size={15} />
            </button>
          </div>
          <div className="w-full bg-[#F4F4F8] rounded-full h-1.5 mb-4">
            <div
              className="bg-[#5847F5] h-1.5 rounded-full transition-all"
              style={{ width: `${(setupTasks.filter(t => t.done).length / setupTasks.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {setupTasks.map(({ label, done, href }) => (
              <button
                key={label}
                onClick={() => navigate(href)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${done ? "border-[#E6F9F0] bg-[#F8FDF9]" : "border-[#E4E4EF] hover:border-[#5847F5] hover:bg-[#EEF0FF]"}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-[#0CAF60]" : "border-2 border-[#E4E4EF]"}`}>
                  {done && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-[12.5px] font-500 ${done ? "text-[#9292A8] line-through" : "text-[#0B0B18]"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Total revenue", value: "₦819,500", change: "+22%", icon: DollarSign, color: "text-[#5847F5] bg-[#EEF0FF]" },
          { label: "Total orders", value: "47", change: "+8 this week", icon: ShoppingBag, color: "text-[#0CAF60] bg-[#E6F9F0]" },
          { label: "Customers", value: "38", change: "+5 this week", icon: Users, color: "text-[#F59E0B] bg-[#FEF3C7]" },
          { label: "Products", value: "3", change: "2 published", icon: Package, color: "text-[#7C3AED] bg-[#F0EBFF]" },
        ].map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E4E4EF] p-4 sm:p-5">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-2.5 ${color.split(" ")[1]}`}>
              <Icon size={15} className={color.split(" ")[0]} strokeWidth={1.8} />
            </div>
            <div className="text-[20px] sm:text-[22px] font-800 text-[#0B0B18] tracking-tight">{value}</div>
            <div className="text-[11.5px] text-[#9292A8] mt-0.5">{label}</div>
            <div className="text-[11px] text-[#0CAF60] font-500 mt-1 flex items-center gap-1">
              <TrendingUp size={11} />
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* AI insight */}
      <div className="bg-gradient-to-r from-[#EEF0FF] to-[#F0EBFF] border border-[#D4CCFF] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="flex items-start gap-3.5 flex-1">
          <div className="w-9 h-9 rounded-xl bg-[#5847F5] flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <div className="text-[12.5px] font-700 text-[#5847F5] mb-1">✦ SellFlow AI noticed something</div>
            <div className="text-[14px] font-500 text-[#0B0B18] mb-1">Your sales page gets visitors, but fewer people are reaching checkout.</div>
            <div className="text-[13px] text-[#4E4E68]">Your Cake Business Playbook page has an 8.2% conversion rate — below the 12% average for similar products. Consider strengthening your offer section and adding social proof.</div>
          </div>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="shrink-0 flex items-center gap-1.5 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[12.5px] font-600 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Improve Sales Page
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E4EF] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[14px] font-700 text-[#0B0B18]">Revenue</div>
              <div className="text-[12px] text-[#9292A8]">
                {period === "week" ? "₦229,000 this week" : "₦744,000 this month"}
              </div>
            </div>
            <div className="flex gap-1 bg-[#F4F4F8] p-0.5 rounded-lg">
              {(["week", "month"] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded-md text-[11.5px] font-500 capitalize transition-colors ${period === p ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8]"}`}
                >
                  {p === "week" ? "This week" : "This month"}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5847F5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#5847F5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9292A8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E4E4EF", borderRadius: 10, fontSize: 12 }}
                formatter={(v) => [`₦${Number(v).toLocaleString()}`, "Revenue"]}
                labelStyle={{ color: "#0B0B18", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="v" stroke="#5847F5" strokeWidth={2} fill="url(#grad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-4 sm:p-5">
          <div className="text-[14px] font-700 text-[#0B0B18] mb-4">Recent orders</div>
          <div className="space-y-3">
            {orders.map(({ customer, product, amount, time }, i) => (
              <div key={i} className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[10px] font-700 shrink-0">
                    {customer[0]}
                  </div>
                  <div>
                    <div className="text-[12.5px] font-600 text-[#0B0B18]">{customer}</div>
                    <div className="text-[11px] text-[#9292A8] truncate max-w-[110px]">{product}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12.5px] font-600 text-[#0B0B18]">{amount}</div>
                  <div className="text-[10.5px] text-[#9292A8]">{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product performance */}
      <div className="bg-white rounded-2xl border border-[#E4E4EF] mt-4 sm:mt-5 overflow-x-auto">
        <div className="px-5 py-4 border-b border-[#F4F4F8] flex items-center justify-between">
          <div className="text-[14px] font-700 text-[#0B0B18]">Product performance</div>
          <button onClick={() => navigate("/products")} className="text-[12.5px] text-[#5847F5] font-500 hover:underline flex items-center gap-1">
            View all <ArrowRight size={13} />
          </button>
        </div>
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-[#F4F4F8]">
              {["Product", "Views", "Orders", "Revenue", "Conv. rate", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(({ name, views, orders: o, revenue, conv, status }) => (
              <tr key={name} className="border-b border-[#F4F4F8] last:border-none hover:bg-[#FAFAFD] transition-colors cursor-pointer" onClick={() => navigate("/products/1")}>
                <td className="px-5 py-3.5 text-[13px] font-500 text-[#0B0B18]">{name}</td>
                <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{views}</td>
                <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{o}</td>
                <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">{revenue}</td>
                <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{conv}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11.5px] font-600 px-2.5 py-1 rounded-full ${status === "Published" ? "bg-[#E6F9F0] text-[#0CAF60]" : "bg-[#F4F4F8] text-[#9292A8]"}`}>
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
