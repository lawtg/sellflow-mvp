import { useState } from "react";
import { Camera, Check, X, Loader2, AlertCircle, ExternalLink } from "lucide-react";

const TABS = ["Profile", "Store", "Payments", "Notifications", "Account"] as const;
type Tab = typeof TABS[number];

interface PaymentProvider {
  id: string;
  name: string;
  desc: string;
  logo: string;
  connected: boolean;
  currencies: string;
}

const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: "paystack",
    name: "Paystack",
    desc: "Accept Naira payments via card, bank transfer & USSD",
    logo: "PS",
    connected: true,
    currencies: "NGN",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    desc: "Accept payments across Africa in multiple currencies",
    logo: "FW",
    connected: false,
    currencies: "NGN, GHS, KES, ZAR",
  },
  {
    id: "stripe",
    name: "Stripe",
    desc: "Accept international payments in USD, GBP, EUR",
    logo: "ST",
    connected: false,
    currencies: "USD, GBP, EUR",
  },
];

// Toggle component
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full transition-colors flex items-center shrink-0 ${checked ? "bg-[#5847F5]" : "bg-[#E4E4EF]"}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${checked ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}

export default function Settings() {
  const [tab, setTab] = useState<Tab>("Profile");

  // Profile state
  const [fullName, setFullName] = useState("Ola Adeyemi");
  const [creatorName, setCreatorName] = useState("Ola Creates");
  const [email, setEmail] = useState("ola@example.com");
  const [bio, setBio] = useState("Business strategist and creator educator helping African entrepreneurs build profitable digital product businesses.");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Store state
  const [storeName, setStoreName] = useState("Ola Creates");
  const [storeSlug, setStoreSlug] = useState("ola");
  const [storeSaving, setStoreSaving] = useState(false);
  const [storeSaved, setStoreSaved] = useState(false);

  // Payment state
  const [providers, setProviders] = useState(PAYMENT_PROVIDERS);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectModal, setConnectModal] = useState<PaymentProvider | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [connectLoading, setConnectLoading] = useState(false);
  const [connectError, setConnectError] = useState("");

  // Notification state
  const [notifs, setNotifs] = useState({
    new_sale: true,
    new_lead: true,
    download: false,
    weekly_summary: true,
  });

  // Account state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const saveProfile = async () => {
    setProfileSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const saveStore = async () => {
    setStoreSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setStoreSaving(false);
    setStoreSaved(true);
    setTimeout(() => setStoreSaved(false), 2500);
  };

  const handleConnect = async () => {
    if (!apiKey.trim() || !secretKey.trim()) {
      setConnectError("Both keys are required.");
      return;
    }
    setConnectError("");
    setConnectLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setConnectLoading(false);
    if (connectModal) {
      setProviders(prev =>
        prev.map(p => p.id === connectModal.id ? { ...p, connected: true } : p)
      );
    }
    setConnectModal(null);
    setApiKey("");
    setSecretKey("");
  };

  const handleDisconnect = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, connected: false } : p));
  };

  const savePassword = async () => {
    if (!currentPw) { setPwError("Enter your current password."); return; }
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords don't match."); return; }
    setPwError("");
    setPwSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setPwSaving(false);
    setPwSaved(true);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Settings</h1>
        <p className="text-[13.5px] text-[#9292A8] mt-0.5">Manage your account, store, and preferences.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="sm:w-[180px] shrink-0">
          <div className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 text-left px-3 py-2 rounded-lg text-[13.5px] font-500 transition-colors whitespace-nowrap ${
                  tab === t ? "bg-[#EEF0FF] text-[#5847F5]" : "text-[#4E4E68] hover:bg-[#F4F4F8]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* ── PROFILE ── */}
          {tab === "Profile" && (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 space-y-5">
              <div className="text-[15px] font-700 text-[#0B0B18]">Profile</div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[22px] font-800">
                    {fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white border border-[#E4E4EF] flex items-center justify-center shadow-sm">
                    <Camera size={12} className="text-[#4E4E68]" />
                  </button>
                </div>
                <div>
                  <div className="text-[13.5px] font-600 text-[#0B0B18]">{fullName}</div>
                  <button className="text-[12.5px] text-[#5847F5] hover:underline font-500">Change photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Full name</label>
                  <input
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Creator name</label>
                  <input
                    value={creatorName}
                    onChange={e => setCreatorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] resize-none transition-colors"
                />
              </div>

              <button
                onClick={saveProfile}
                disabled={profileSaving}
                className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                {profileSaving
                  ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                  : profileSaved
                  ? <><Check size={14} /> Saved!</>
                  : "Save changes"}
              </button>
            </div>
          )}

          {/* ── STORE ── */}
          {tab === "Store" && (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 space-y-5">
              <div className="text-[15px] font-700 text-[#0B0B18]">Store settings</div>

              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Store name</label>
                <input
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Store URL</label>
                <div className="flex items-center border border-[#E4E4EF] rounded-xl overflow-hidden focus-within:border-[#5847F5] transition-colors">
                  <span className="px-3.5 py-2.5 bg-[#F8F8FC] text-[13px] text-[#9292A8] border-r border-[#E4E4EF] shrink-0">
                    sellfinix.co/
                  </span>
                  <input
                    value={storeSlug}
                    onChange={e => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 px-3.5 py-2.5 text-[13.5px] focus:outline-none bg-white"
                  />
                </div>
                <div className="text-[11.5px] text-[#9292A8] mt-1">
                  Your store: <span className="font-600 text-[#5847F5]">sellfinix.co/{storeSlug}</span>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Default currency</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors bg-white">
                  <option>NGN (₦) — Nigerian Naira</option>
                  <option>GHS (₵) — Ghanaian Cedi</option>
                  <option>KES (Ksh) — Kenyan Shilling</option>
                  <option>ZAR (R) — South African Rand</option>
                  <option>USD ($) — US Dollar</option>
                </select>
              </div>

              <button
                onClick={saveStore}
                disabled={storeSaving}
                className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                {storeSaving
                  ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                  : storeSaved
                  ? <><Check size={14} /> Saved!</>
                  : "Save changes"}
              </button>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {tab === "Payments" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6">
                <div className="text-[15px] font-700 text-[#0B0B18] mb-1">Payment providers</div>
                <p className="text-[13px] text-[#9292A8] mb-5">
                  Connect at least one payment provider to start accepting payments.
                </p>
                <div className="space-y-3">
                  {providers.map(p => (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
                        p.connected ? "border-[#A7F3D0] bg-[#F0FDF9]" : "border-[#E4E4EF]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-700 shrink-0 ${
                          p.id === "paystack" ? "bg-[#0CAF60]" : p.id === "flutterwave" ? "bg-[#F5A623]" : "bg-[#635BFF]"
                        }`}>
                          {p.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-[13.5px] font-700 text-[#0B0B18]">{p.name}</div>
                            {p.connected && (
                              <span className="text-[10.5px] bg-[#E6F9F0] text-[#0CAF60] px-2 py-0.5 rounded-full font-600">
                                Connected
                              </span>
                            )}
                          </div>
                          <div className="text-[12px] text-[#9292A8]">{p.desc}</div>
                          <div className="text-[11px] text-[#ADADC4] mt-0.5">Currencies: {p.currencies}</div>
                        </div>
                      </div>
                      {p.connected ? (
                        <button
                          onClick={() => handleDisconnect(p.id)}
                          className="text-[12px] text-[#EF4444] font-600 hover:underline shrink-0 ml-3"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button
                          onClick={() => setConnectModal(p)}
                          className="shrink-0 ml-3 text-[12.5px] text-[#5847F5] font-600 hover:underline flex items-center gap-1"
                        >
                          Connect <ExternalLink size={11} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F0EBFF] border border-[#D4CCFF] rounded-2xl p-4">
                <div className="text-[12.5px] font-700 text-[#7C3AED] mb-1">Transaction fees</div>
                <div className="text-[12.5px] text-[#4E4E68] leading-relaxed">
                  Sellfinix charges <span className="font-700 text-[#0B0B18]">0% platform fee</span>. You only pay your payment provider's standard processing fee (typically 1.5% for Paystack on NGN transactions).
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab === "Notifications" && (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6">
              <div className="text-[15px] font-700 text-[#0B0B18] mb-5">Notification preferences</div>
              <div className="space-y-4">
                {([
                  { key: "new_sale" as const, label: "New sale", desc: "Get notified when someone purchases your product" },
                  { key: "new_lead" as const, label: "New lead", desc: "Get notified when someone joins your email list" },
                  { key: "download" as const, label: "Product download", desc: "Get notified when a customer downloads your product" },
                  { key: "weekly_summary" as const, label: "Weekly summary", desc: "Receive a weekly summary of your business performance" },
                ]).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[13.5px] font-600 text-[#0B0B18]">{label}</div>
                      <div className="text-[12px] text-[#9292A8]">{desc}</div>
                    </div>
                    <Toggle
                      checked={notifs[key]}
                      onChange={val => setNotifs(prev => ({ ...prev, [key]: val }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {tab === "Account" && (
            <div className="space-y-4">
              {/* Change password */}
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 space-y-4">
                <div className="text-[15px] font-700 text-[#0B0B18]">Change password</div>

                {pwError && (
                  <div className="flex items-center gap-2 bg-[#FEE2E2] text-[#EF4444] text-[12.5px] font-500 px-3.5 py-2.5 rounded-xl">
                    <AlertCircle size={13} className="shrink-0" />
                    {pwError}
                  </div>
                )}
                {pwSaved && (
                  <div className="flex items-center gap-2 bg-[#E6F9F0] text-[#0CAF60] text-[12.5px] font-600 px-3.5 py-2.5 rounded-xl">
                    <Check size={13} className="shrink-0" />
                    Password updated successfully.
                  </div>
                )}

                {[
                  { label: "Current password", val: currentPw, setter: setCurrentPw },
                  { label: "New password", val: newPw, setter: setNewPw },
                  { label: "Confirm new password", val: confirmPw, setter: setConfirmPw },
                ].map(({ label, val, setter }) => (
                  <div key={label}>
                    <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">{label}</label>
                    <input
                      type="password"
                      value={val}
                      onChange={e => { setter(e.target.value); setPwError(""); }}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                    />
                  </div>
                ))}

                <button
                  onClick={savePassword}
                  disabled={pwSaving}
                  className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
                >
                  {pwSaving
                    ? <><Loader2 size={14} className="animate-spin" /> Updating…</>
                    : "Update password"}
                </button>
              </div>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border border-[#FEE2E2] p-6">
                <div className="text-[15px] font-700 text-[#EF4444] mb-1">Danger zone</div>
                <div className="text-[13px] text-[#9292A8] mb-4">
                  Permanently delete your account and all your data. This action cannot be undone.
                </div>
                {!deleteConfirm ? (
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="border border-[#EF4444] text-[#EF4444] font-600 px-5 py-2.5 rounded-xl text-[13.5px] hover:bg-[#FEE2E2] transition-colors"
                  >
                    Delete account
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#EF4444] font-500">Are you sure?</span>
                    <button className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-600 px-4 py-2 rounded-xl text-[13px] transition-colors">
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="border border-[#E4E4EF] text-[#4E4E68] font-500 px-4 py-2 rounded-xl text-[13px] hover:bg-[#F4F4F8] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment connect modal */}
      {connectModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[15px] font-700 text-[#0B0B18]">Connect {connectModal.name}</div>
                <div className="text-[12px] text-[#9292A8]">{connectModal.currencies} payments</div>
              </div>
              <button onClick={() => { setConnectModal(null); setConnectError(""); setApiKey(""); setSecretKey(""); }} className="text-[#9292A8] hover:text-[#4E4E68]">
                <X size={16} />
              </button>
            </div>

            {connectError && (
              <div className="flex items-center gap-2 bg-[#FEE2E2] text-[#EF4444] text-[12px] font-500 px-3 py-2 rounded-xl mb-4">
                <AlertCircle size={13} className="shrink-0" />
                {connectError}
              </div>
            )}

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Public / API key</label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={e => { setApiKey(e.target.value); setConnectError(""); }}
                  placeholder="pk_live_…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13px] font-mono focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Secret key</label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={e => { setSecretKey(e.target.value); setConnectError(""); }}
                  placeholder="sk_live_…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13px] font-mono focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>
              <p className="text-[11.5px] text-[#9292A8]">
                Find your API keys in your {connectModal.name} dashboard under Settings → API Keys.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setConnectModal(null); setConnectError(""); setApiKey(""); setSecretKey(""); }}
                className="flex-1 border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={connectLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-60 text-white font-600 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                {connectLoading
                  ? <><Loader2 size={14} className="animate-spin" /> Connecting…</>
                  : "Connect"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
