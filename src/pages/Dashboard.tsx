import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sparkles, TrendingUp, ArrowRight, ShoppingBag, Users,
  Package, DollarSign, X, Check, Loader2,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../context/AuthContext";
import { supabase, type Product, type Order } from "../lib/supabase";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/** Turn a flat list of paid orders into 7-day chart data */
function buildWeekChart(orders: Order[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totals: Record<string, number> = {};
  const now = new Date();

  // Seed last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    totals[days[d.getDay()]] = 0;
  }

  orders.forEach(o => {
    if (o.status !== "paid") return;
    const d = new Date(o.created_at);
    const diff = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
    if (diff < 7) totals[days[d.getDay()]] = (totals[days[d.getDay()]] || 0) + o.amount;
  });

  return Object.entries(totals).map(([day, v]) => ({ day, v }));
}

const setupTasks = [
  { label: "Create your first product", href: "/products/create" },
  { label: "Build your AI sales page", href: "/products/editor" },
  { label: "Connect a payment provider", href: "/settings" },
  { label: "Publish your product", href: "/products/1" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showSetup, setShowSetup] = useState(true);
  const [period, setPeriod] = useState<"week" | "month">("week");

  const firstName = profile?.full_name?.split(" ")[0] || "Creator";

  // ── Fetch real data ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoadingData(true);

      const [{ data: prods }, { data: ords }] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .eq("creator_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("orders")
          .select("*, product:products(name,price,currency), customer:customers(name,email)")
          .eq("creator_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      setProducts((prods as Product[]) || []);
      setOrders((ords as Order[]) || []);
      setLoadingData(false);
    };

    fetchData();
  }, [user]);

  // ── Derived metrics ───────────────────────────────────────────────────────
  const paidOrders = orders.filter(o => o.status === "paid");
  const totalRevenue = paidOrders.reduce((s, o) => s + o.amount, 0);
  const uniqueCustomerIds = new Set(paidOrders.map(o => o.customer_id));
  const publishedProducts = products.filter(p => p.status === "published");

  const chartData = buildWeekChart(orders);

  const recentOrders = paidOrders.slice(0, 5);

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center">
        <Loader2 size={28} className="text-[#5847F5] animate-spin" />
      </div>
    );
  }

  // ── Empty state (new user, no products yet) ───────────────────────────────
  if (products.length === 0) {
    return (
      <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-[13.5px] text-[#9292A8] mt-0.5">
              Let's set up your first product.
            </p>
          </div>
          <button
            onClick={() => navigate("/products/create")}
            className="hidden sm:flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
          >
            + Create Product
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
            <Package size={22} className="text-[#5847F5]" />
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

  // ── Full dashboard ────────────────────────────────────────────────────────
  const completedTasks = [
    products.length > 0,
    publishedProducts.length > 0,
    false, // payment connection — TODO: check profile.paystack_connected
    publishedProducts.length > 0,
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-800 text-[#0B0B18] tracking-tight">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-[13px] text-[#9292A8] mt-0.5">
            Here's how your business is doing today.
          </p>
        </div>
        <button
          onClick={() => navigate("/products/create")}
          className="hidden sm:flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
        >
          + Create Product
        </button>
      </div>

      {/* Setup checklist */}
      {showSetup && completedTasks.some(t => !t) && (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[14px] font-700 text-[#0B0B18]">Finish setting up your store</div>
              <div className="text-[12px] text-[#9292A8] mt-0.5">
                {completedTasks.filter(Boolean).length} of {setupTasks.length} steps complete
              </div>
            </div>
            <button onClick={() => setShowSetup(false)} className="text-[#9292A8] hover:text-[#4E4E68]">
              <X size={15} />
            </button>
          </div>
          <div className="w-full bg-[#F4F4F8] rounded-full h-1.5 mb-4">
            <div
              className="bg-[#5847F5] h-1.5 rounded-full transition-all"
              style={{ width: `${(completedTasks.filter(Boolean).length / setupTasks.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {setupTasks.map(({ label, href }, i) => (
              <button
                key={label}
                onClick={() => navigate(href)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  completedTasks[i]
                    ? "border-[#E6F9F0] bg-[#F8FDF9]"
                    : "border-[#E4E4EF] hover:border-[#5847F5] hover:bg-[#EEF0FF]"
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${completedTasks[i] ? "bg-[#0CAF60]" : "border-2 border-[#E4E4EF]"}`}>
                  {completedTasks[i] && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-[12.5px] font-500 ${completedTasks[i] ? "text-[#9292A8] line-through" : "text-[#0B0B18]"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          {
            label: "Total revenue",
            value: `₦${totalRevenue.toLocaleString()}`,
            change: `${paidOrders.length} paid orders`,
            icon: DollarSign,
            color: "text-[#5847F5] bg-[#EEF0FF]",
          },
          {
            label: "Total orders",
            value: paidOrders.length.toString(),
            change: `${orders.filter(o => o.status === "pending").length} pending`,
            icon: ShoppingBag,
            color: "text-[#0CAF60] bg-[#E6F9F0]",
          },
          {
            label: "Customers",
            value: uniqueCustomerIds.size.toString(),
            change: "unique buyers",
            icon: Users,
            color: "text-[#F59E0B] bg-[#FEF3C7]",
          },
          {
            label: "Products",
            value: products.length.toString(),
            change: `${publishedProducts.length} published`,
            icon: Package,
            color: "text-[#7C3AED] bg-[#F0EBFF]",
          },
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

      {/* AI Insight */}
      {totalRevenue > 0 && (
        <div className="bg-gradient-to-r from-[#EEF0FF] to-[#F0EBFF] border border-[#D4CCFF] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-9 h-9 rounded-xl bg-[#5847F5] flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <div className="text-[12.5px] font-700 text-[#5847F5] mb-1">✦ Sellfinix AI</div>
              <div className="text-[14px] font-500 text-[#0B0B18] mb-1">
                You have {paidOrders.length} paid {paidOrders.length === 1 ? "order" : "orders"} generating ₦{totalRevenue.toLocaleString()}.
              </div>
              <div className="text-[13px] text-[#4E4E68]">
                {publishedProducts.length === 0
                  ? "Publish your first product to start receiving payments."
                  : "Keep sharing your sales page link to grow your sales."}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="shrink-0 flex items-center gap-1.5 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[12.5px] font-600 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            View Products <ArrowRight size={13} />
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E4EF] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[14px] font-700 text-[#0B0B18]">Revenue</div>
              <div className="text-[12px] text-[#9292A8]">Last 7 days</div>
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
          {chartData.every(d => d.v === 0) ? (
            <div className="h-[180px] flex items-center justify-center text-[13px] text-[#9292A8]">
              No revenue data yet — make your first sale to see the chart.
            </div>
          ) : (
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
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-[#E4E4EF] p-4 sm:p-5">
          <div className="text-[14px] font-700 text-[#0B0B18] mb-4">Recent orders</div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-[13px] text-[#9292A8]">
              No orders yet.<br />Share your sales page to start selling.
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o, i) => {
                const customerName = o.customer?.name || "Customer";
                const productName = o.product?.name || "Product";
                const timeAgo = (() => {
                  const diff = Date.now() - new Date(o.created_at).getTime();
                  const mins = Math.floor(diff / 60000);
                  if (mins < 60) return `${mins}m ago`;
                  const hrs = Math.floor(mins / 60);
                  if (hrs < 24) return `${hrs}h ago`;
                  return `${Math.floor(hrs / 24)}d ago`;
                })();
                return (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[10px] font-700 shrink-0">
                        {customerName[0]}
                      </div>
                      <div>
                        <div className="text-[12.5px] font-600 text-[#0B0B18]">{customerName}</div>
                        <div className="text-[11px] text-[#9292A8] truncate max-w-[110px]">{productName}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[12.5px] font-600 text-[#0B0B18]">
                        ₦{o.amount.toLocaleString()}
                      </div>
                      <div className="text-[10.5px] text-[#9292A8]">{timeAgo}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Product performance table */}
      {products.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] mt-4 sm:mt-5 overflow-x-auto">
          <div className="px-5 py-4 border-b border-[#F4F4F8] flex items-center justify-between">
            <div className="text-[14px] font-700 text-[#0B0B18]">Product performance</div>
            <button
              onClick={() => navigate("/products")}
              className="text-[12.5px] text-[#5847F5] font-500 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-[#F4F4F8]">
                {["Product", "Status", "Price", "Orders", "Revenue"].map(h => (
                  <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(p => {
                const productOrders = paidOrders.filter(o => o.product_id === p.id);
                const productRevenue = productOrders.reduce((s, o) => s + o.amount, 0);
                return (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/products/${p.id}`)}
                    className="border-b border-[#F4F4F8] last:border-none hover:bg-[#FAFAFD] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5 text-[13px] font-500 text-[#0B0B18]">{p.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11.5px] font-600 px-2.5 py-1 rounded-full ${
                        p.status === "published" ? "bg-[#E6F9F0] text-[#0CAF60]" : "bg-[#F4F4F8] text-[#9292A8]"
                      }`}>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">
                      ₦{p.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{productOrders.length}</td>
                    <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">
                      ₦{productRevenue.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
