import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const revenueData = {
  "7d": [
    { t: "Mon", v: 18000 }, { t: "Tue", v: 24500 }, { t: "Wed", v: 19000 },
    { t: "Thu", v: 31000 }, { t: "Fri", v: 44200 }, { t: "Sat", v: 52800 }, { t: "Sun", v: 39500 },
  ],
  "30d": [
    { t: "Wk 1", v: 142000 }, { t: "Wk 2", v: 198000 },
    { t: "Wk 3", v: 175000 }, { t: "Wk 4", v: 229000 },
  ],
  "90d": [
    { t: "Jul", v: 420000 }, { t: "Aug", v: 580000 }, { t: "Sep", v: 819500 },
  ],
};

const funnelByProduct: Record<string, { label: string; value: number; pct: number }[]> = {
  all: [
    { label: "Page Views", value: 628, pct: 100 },
    { label: "Checkout Started", value: 186, pct: 29.6 },
    { label: "Purchased", value: 47, pct: 7.5 },
    { label: "Downloaded", value: 44, pct: 7.0 },
  ],
  "1": [
    { label: "Page Views", value: 342, pct: 100 },
    { label: "Checkout Started", value: 94, pct: 27.5 },
    { label: "Purchased", value: 28, pct: 8.2 },
    { label: "Downloaded", value: 27, pct: 7.9 },
  ],
  "2": [
    { label: "Page Views", value: 198, pct: 100 },
    { label: "Checkout Started", value: 64, pct: 32.3 },
    { label: "Purchased", value: 14, pct: 7.1 },
    { label: "Downloaded", value: 14, pct: 7.1 },
  ],
  "3": [
    { label: "Page Views", value: 88, pct: 100 },
    { label: "Checkout Started", value: 28, pct: 31.8 },
    { label: "Purchased", value: 5, pct: 5.7 },
    { label: "Downloaded", value: 3, pct: 3.4 },
  ],
};

const productData = [
  { name: "Cake Playbook", orders: 28 },
  { name: "Consultant Guide", orders: 14 },
  { name: "Skincare Guide", orders: 5 },
];

const PRODUCTS = [
  { id: "all", label: "All products" },
  { id: "1", label: "Cake Playbook" },
  { id: "2", label: "Consultant Guide" },
  { id: "3", label: "Skincare Guide" },
];

const PERIODS = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
];

export default function Analytics() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [product, setProduct] = useState("all");

  const funnel = funnelByProduct[product] || funnelByProduct["all"];
  const convRate = funnel[2].pct.toFixed(1);
  const isGood = parseFloat(convRate) >= 8;

  const totalRevenue = period === "7d" ? "₦229,000" : period === "30d" ? "₦744,000" : "₦1,819,500";
  const totalOrders = period === "7d" ? "12" : period === "30d" ? "47" : "102";

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Analytics</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">Understand how your products are performing.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={product}
            onChange={e => setProduct(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E4E4EF] text-[13px] focus:outline-none focus:border-[#5847F5] bg-white transition-colors"
          >
            {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <div className="flex gap-1 bg-[#F4F4F8] p-0.5 rounded-lg">
            {PERIODS.map(p => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id as typeof period)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-500 transition-colors ${period === p.id ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8]"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { value: totalRevenue, label: "Revenue", trend: "+22%", up: true },
          { value: totalOrders, label: "Orders", trend: "+8", up: true },
          { value: funnel[0].value.toLocaleString(), label: "Page views", trend: "+15%", up: true },
          { value: funnel[1].value.toLocaleString(), label: "Checkout starts", trend: "+11%", up: true },
          { value: `${convRate}%`, label: "Conversion", trend: isGood ? "Good" : "Needs work", up: isGood },
          { value: funnel[3].value.toString(), label: "Downloads", trend: "+4%", up: true },
        ].map(({ value, label, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E4E4EF] p-4">
            <div className="text-[19px] font-800 text-[#0B0B18]">{value}</div>
            <div className="text-[11.5px] text-[#9292A8] mt-0.5">{label}</div>
            <div className={`text-[10.5px] font-600 mt-1 flex items-center gap-0.5 ${up ? "text-[#0CAF60]" : "text-[#EF4444]"}`}>
              {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 mb-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E4EF] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] font-700 text-[#0B0B18]">Revenue over time</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData[period]}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5847F5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#5847F5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#9292A8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E4E4EF", borderRadius: 10, fontSize: 12 }}
                formatter={(v) => [`₦${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="v" stroke="#5847F5" strokeWidth={2} fill="url(#rev)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by product */}
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
          <div className="text-[14px] font-700 text-[#0B0B18] mb-4">Orders by product</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#9292A8" }} width={80} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E4E4EF", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="orders" fill="#5847F5" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales funnel */}
      <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5 mb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[14px] font-700 text-[#0B0B18]">Sales funnel</div>
          <div className={`text-[12.5px] font-600 px-2.5 py-1 rounded-full ${isGood ? "bg-[#E6F9F0] text-[#0CAF60]" : "bg-[#FEF3C7] text-[#D97706]"}`}>
            {convRate}% conversion
          </div>
        </div>
        <div className="flex items-end gap-3">
          {funnel.map(({ label, value, pct }, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[13px] font-700 text-[#0B0B18]">{value.toLocaleString()}</div>
              <div
                className="w-full rounded-t-xl transition-all"
                style={{
                  height: `${Math.max(pct * 1.5, 12)}px`,
                  background: `rgba(88,71,245,${1 - i * 0.18})`,
                }}
              />
              <div className="text-[10.5px] text-[#9292A8] text-center leading-snug">{label}</div>
              <div className="text-[10px] font-600 text-[#9292A8]">{pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI insight */}
      <div className="bg-gradient-to-r from-[#EEF0FF] to-[#F0EBFF] border border-[#D4CCFF] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#5847F5] flex items-center justify-center shrink-0">
            <span className="text-white text-[13px]">✦</span>
          </div>
          <div>
            <div className="text-[12px] font-700 text-[#5847F5] mb-1">SellFlow AI insight</div>
            <div className="text-[13.5px] font-500 text-[#0B0B18] mb-1">
              {parseFloat(convRate) < 8
                ? "Your conversion rate is below average. Here's what to test."
                : "Your conversion rate is strong. Here's how to push it further."}
            </div>
            <div className="text-[13px] text-[#4E4E68]">
              {parseFloat(convRate) < 8
                ? `${convRate}% of visitors are purchasing. The industry average for similar products is ~12%. Try strengthening your hero headline and adding one or two social proof elements.`
                : `${convRate}% of visitors are purchasing — above average. Consider running paid traffic now to scale this product.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
