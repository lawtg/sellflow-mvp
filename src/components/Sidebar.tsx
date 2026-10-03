import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Magnet,
  Mail,
  BarChart2,
  Settings,
  Plus,
  Zap,
  X,
  ChevronDown,
  LogOut,
  User,
  Bell,
  Zap as ZapIcon,
  Workflow,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/products", icon: Package },
  { label: "Customers", to: "/customers", icon: Users },
  { label: "Leads", to: "/leads", icon: Magnet },
  { label: "Emails", to: "/emails", icon: Mail },
  { label: "Automations", to: "/automations", icon: Workflow },
  { label: "Analytics", to: "/analytics", icon: BarChart2 },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { text: "New sale — The Cake Business Playbook", time: "3 min ago", unread: true },
    { text: "Chidi Nwosu purchased Think Like a Consultant", time: "14 min ago", unread: true },
    { text: "Your weekly summary is ready", time: "2 hrs ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <aside className="w-[220px] shrink-0 bg-white border-r border-[#E4E4EF] flex flex-col h-screen">
      {/* Logo row */}
      <div className="px-5 py-5 border-b border-[#E4E4EF] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#5847F5] flex items-center justify-center">
            <Zap size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-700 text-[#0B0B18] tracking-tight">Sellfinix</span>
        </div>
        {/* Mobile close */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-[#9292A8] hover:text-[#4E4E68] transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Create CTA */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={() => { navigate("/products/create"); onClose?.(); }}
          className="w-full flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 py-2.5 rounded-lg transition-colors duration-150"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create Product
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5 overflow-y-auto">
        {nav.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-500 transition-colors duration-100 ${
                isActive
                  ? "bg-[#EEF0FF] text-[#5847F5]"
                  : "text-[#4E4E68] hover:bg-[#F4F4F8] hover:text-[#0B0B18]"
              }`
            }
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-3 border-t border-[#E4E4EF] pt-2 space-y-0.5">
        <NavLink
          to="/settings"
          onClick={() => onClose?.()}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-500 transition-colors duration-100 ${
              isActive
                ? "bg-[#EEF0FF] text-[#5847F5]"
                : "text-[#4E4E68] hover:bg-[#F4F4F8] hover:text-[#0B0B18]"
            }`
          }
        >
          <Settings size={16} strokeWidth={1.8} />
          Settings
        </NavLink>

        {/* Notifications bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-500 text-[#4E4E68] hover:bg-[#F4F4F8] hover:text-[#0B0B18] transition-colors"
          >
            <div className="relative">
              <Bell size={16} strokeWidth={1.8} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#EF4444] rounded-full text-white text-[8px] font-700 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            Notifications
          </button>

          {notifOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-[#E4E4EF] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 border-b border-[#F4F4F8]">
                <div className="text-[11.5px] font-700 text-[#0B0B18]">Notifications</div>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className={`px-3 py-2.5 border-b border-[#F4F4F8] last:border-none ${n.unread ? "bg-[#FAFAFF]" : ""}`}>
                  <div className="flex items-start gap-2">
                    {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#5847F5] mt-1 shrink-0" />}
                    <div className={n.unread ? "" : "ml-3.5"}>
                      <div className="text-[11.5px] font-500 text-[#0B0B18] leading-snug">{n.text}</div>
                      <div className="text-[10.5px] text-[#9292A8] mt-0.5">{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plan badge */}
        <div className="mx-1 mb-1 mt-1 px-3 py-2 bg-[#F0EBFF] rounded-lg flex items-center gap-2">
          <ZapIcon size={13} className="text-[#7C3AED] shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-700 text-[#7C3AED]">Creator plan</div>
            <button
              onClick={() => navigate("/pricing")}
              className="text-[10px] text-[#9292A8] hover:text-[#7C3AED] transition-colors"
            >
              Upgrade to Pro →
            </button>
          </div>
        </div>

        {/* User section */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F4F4F8] transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[11px] font-700 shrink-0">
              OA
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[12px] font-600 text-[#0B0B18] truncate">Ola Adeyemi</div>
              <div className="text-[11px] text-[#9292A8] truncate">ola@example.com</div>
            </div>
            <ChevronDown
              size={13}
              className={`text-[#9292A8] shrink-0 transition-transform ${userOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-[#E4E4EF] rounded-xl shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => { navigate("/settings"); setUserOpen(false); onClose?.(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-500 text-[#0B0B18] hover:bg-[#F4F4F8] transition-colors"
              >
                <User size={14} className="text-[#9292A8]" />
                Account settings
              </button>
              <div className="border-t border-[#F4F4F8]" />
              <button
                onClick={() => { navigate("/login"); setUserOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-500 text-[#EF4444] hover:bg-[#FEE2E2] transition-colors"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
