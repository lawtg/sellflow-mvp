import { useState } from "react";
import { Plus, Sparkles, Send, X, Loader2, Copy, Check } from "lucide-react";

const campaigns = [
  { name: "Welcome to the Playbook!", subject: "Here's your download link", status: "Sent", recipients: 28, opens: 21, clicks: 14, date: "Oct 12" },
  { name: "How's the playbook going?", subject: "Quick check-in from Ola", status: "Sent", recipients: 25, opens: 18, clicks: 9, date: "Oct 19" },
  { name: "New product announcement", subject: "Something new is coming...", status: "Draft", recipients: 0, opens: 0, clicks: 0, date: "—" },
];

const AI_EMAIL_PROMPTS = [
  { label: "Write a welcome email", desc: "For new customers after purchase" },
  { label: "Re-engagement email", desc: "Bring inactive subscribers back" },
  { label: "Product launch announcement", desc: "Tell your list about a new product" },
  { label: "Tips & value email", desc: "Share helpful content with your list" },
];

type ComposeMode = "subject" | "body";

export default function Emails() {
  const [tab, setTab] = useState<"campaigns" | "automations">("campaigns");
  const [composing, setComposing] = useState(false);
  const [subject, setSubject] = useState("");
  const [preview, setPreview] = useState("");
  const [body, setBody] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiField, setAiField] = useState<ComposeMode | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const runAI = async (field: ComposeMode) => {
    setAiField(field);
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    if (field === "subject") {
      setAiSuggestion("The #1 mistake Nigerian bakers make with pricing (and how to fix it)");
    } else {
      setAiSuggestion(
        `Hi {{name}},\n\nI want to share something with you today that changed how I think about pricing cakes.\n\nMost bakers I talk to are undercharging — not because they don't know their worth, but because they're afraid customers will say no.\n\nHere's what I've learned: the customers who negotiate the most are rarely your best customers.\n\nInstead, try this: price your cakes 20% higher than you're comfortable with. Then watch what happens.\n\nYou'll attract different customers. Better ones.\n\nIf you want the complete system, I put everything into the Cake Business Sales Playbook:\n\n👉 [Get the Playbook — ₦15,000]\n\nOla`
      );
    }
    setAiLoading(false);
  };

  const acceptAI = () => {
    if (aiField === "subject") setSubject(aiSuggestion);
    if (aiField === "body") setBody(aiSuggestion);
    setAiField(null);
    setAiSuggestion("");
  };

  const writeFromScratch = async (prompt: string) => {
    setShowAiPanel(false);
    setAiLoading(true);
    setAiField("body");
    await new Promise(r => setTimeout(r, 1800));
    setAiSuggestion(`Hi {{name}},\n\n${prompt} — here's a professional email based on your prompt.\n\nThis is where your AI-generated email content would appear after connecting the OpenAI API.\n\nBest,\nOla`);
    setAiLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Emails</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">Stay connected with your customers and leads.</p>
        </div>
        <button
          onClick={() => setComposing(true)}
          className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create Email
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F4F4F8] p-1 rounded-xl w-fit mb-5">
        {(["campaigns", "automations"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-500 capitalize transition-colors ${tab === t ? "bg-white text-[#0B0B18] shadow-sm" : "text-[#9292A8] hover:text-[#4E4E68]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      {tab === "campaigns" && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Emails sent", value: "53" },
            { label: "Avg. open rate", value: "74%" },
            { label: "Avg. click rate", value: "43%" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#E4E4EF] p-4">
              <div className="text-[20px] font-800 text-[#0B0B18]">{value}</div>
              <div className="text-[12px] text-[#9292A8] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "campaigns" && (
        <div className="bg-white rounded-2xl border border-[#E4E4EF] overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#F4F4F8]">
                {["Campaign", "Subject", "Status", "Recipients", "Opens", "Clicks", "Sent"].map(h => (
                  <th key={h} className="px-5 py-3 text-[11.5px] font-600 text-[#9292A8] text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map(({ name, subject, status, recipients, opens, clicks, date }) => (
                <tr key={name} className="border-b border-[#F4F4F8] last:border-none hover:bg-[#FAFAFD] transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 text-[13px] font-600 text-[#0B0B18]">{name}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#4E4E68] max-w-[160px] truncate">{subject}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11.5px] font-600 px-2.5 py-1 rounded-full ${status === "Sent" ? "bg-[#E6F9F0] text-[#0CAF60]" : "bg-[#F4F4F8] text-[#9292A8]"}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{recipients || "—"}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{opens ? `${opens} (${Math.round((opens/recipients)*100)}%)` : "—"}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#4E4E68]">{clicks ? `${clicks} (${Math.round((clicks/recipients)*100)}%)` : "—"}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-[#9292A8]">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "automations" && (
        <div className="space-y-4">
          {[
            {
              trigger: "Purchase completed",
              steps: ["Instant: Send order confirmation + download link", "1 hour: Send download reminder", "3 days: Send 'how's it going?' email", "7 days: Ask for a testimonial"],
            },
            {
              trigger: "New lead captured",
              steps: ["Instant: Send lead magnet download", "1 day: Send intro email", "3 days: Send product offer", "7 days: Final nudge with limited-time framing"],
            },
          ].map(({ trigger, steps }) => (
            <div key={trigger} className="bg-white rounded-2xl border border-[#E4E4EF] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] flex items-center justify-center">
                  <Sparkles size={14} className="text-[#5847F5]" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-600 text-[#9292A8] uppercase tracking-widest">Trigger</div>
                  <div className="text-[14px] font-700 text-[#0B0B18]">{trigger}</div>
                </div>
                <span className="text-[11.5px] bg-[#E6F9F0] text-[#0CAF60] px-2.5 py-1 rounded-full font-600">Active</span>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-[#E4E4EF] pl-4 space-y-3">
                {steps.map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#5847F5] border-2 border-white" />
                    <div className="text-[13px] text-[#4E4E68]">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center pt-2">
            <p className="text-[13px] text-[#9292A8]">
              Build advanced automation flows in the{" "}
              <a href="/automations" className="text-[#5847F5] font-500 hover:underline">Automations</a> section.
            </p>
          </div>
        </div>
      )}

      {/* Compose modal */}
      {composing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4EF] shrink-0">
              <div className="text-[15px] font-700 text-[#0B0B18]">New email</div>
              <button onClick={() => setComposing(false)} className="text-[#9292A8] hover:text-[#4E4E68]">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* AI Quick Start */}
              <div className="bg-[#F0EBFF] border border-[#D4CCFF] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={13} className="text-[#7C3AED]" />
                  <div className="text-[12.5px] font-700 text-[#7C3AED]">✦ Write with AI</div>
                </div>
                {showAiPanel ? (
                  <div className="space-y-2">
                    <input
                      value={aiPrompt}
                      onChange={e => setAiPrompt(e.target.value)}
                      placeholder="Describe what you want to write about…"
                      className="w-full px-3 py-2 rounded-lg border border-[#D4CCFF] text-[12.5px] focus:outline-none focus:border-[#7C3AED] bg-white"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => writeFromScratch(aiPrompt)} className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-600 py-2 rounded-lg text-[12.5px] transition-colors">
                        Generate
                      </button>
                      <button onClick={() => setShowAiPanel(false)} className="px-4 bg-white text-[#4E4E68] font-500 py-2 rounded-lg text-[12.5px] border border-[#D4CCFF]">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {AI_EMAIL_PROMPTS.map(({ label, desc }) => (
                      <button
                        key={label}
                        onClick={() => { setAiPrompt(label); setShowAiPanel(true); }}
                        className="flex flex-col items-start p-2.5 rounded-lg bg-white border border-[#D4CCFF] hover:border-[#7C3AED] transition-colors text-left"
                      >
                        <span className="text-[12px] font-600 text-[#0B0B18]">{label}</span>
                        <span className="text-[11px] text-[#9292A8]">{desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Subject line</label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Something exciting for you..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                />
                <button onClick={() => runAI("subject")} className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[#5847F5] font-600 hover:underline">
                  <Sparkles size={10} /> ✦ Improve subject with AI
                </button>
              </div>

              {/* Preview text */}
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Preview text</label>
                <input
                  value={preview}
                  onChange={e => setPreview(e.target.value)}
                  placeholder="Here's what I've been working on..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-600 text-[#0B0B18]">Email body</label>
                  <button onClick={() => runAI("body")} className="flex items-center gap-1.5 text-[12px] text-[#5847F5] font-600 hover:underline">
                    <Sparkles size={11} /> ✦ Improve with AI
                  </button>
                </div>
                <textarea
                  rows={7}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder={"Hi {{name}},\n\nWrite your email here…"}
                  className="w-full px-3.5 py-3 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] resize-none transition-colors font-mono"
                />
                <div className="text-[11.5px] text-[#9292A8] mt-1">
                  Use <code className="bg-[#F4F4F8] px-1 rounded text-[#5847F5]">{"{{name}}"}</code> to personalize with the recipient's name.
                </div>
              </div>

              {/* AI suggestion panel */}
              {(aiLoading || aiSuggestion) && (
                <div className="bg-[#F0EBFF] border border-[#D4CCFF] rounded-xl p-4">
                  {aiLoading ? (
                    <div className="flex items-center gap-2 text-[12.5px] text-[#7C3AED]">
                      <Loader2 size={14} className="animate-spin" />
                      AI is writing…
                    </div>
                  ) : (
                    <>
                      <div className="text-[11px] font-700 text-[#7C3AED] mb-2">✦ AI suggestion for {aiField === "subject" ? "subject line" : "email body"}</div>
                      <div className="bg-white rounded-lg p-3 text-[12.5px] text-[#4E4E68] whitespace-pre-wrap mb-3 max-h-36 overflow-y-auto">
                        {aiSuggestion}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={acceptAI} className="flex items-center gap-1.5 bg-[#5847F5] text-white text-[12px] font-600 px-3 py-1.5 rounded-lg">
                          <Check size={11} strokeWidth={3} /> Use this
                        </button>
                        <button onClick={() => { setAiSuggestion(""); setAiField(null); }} className="flex items-center gap-1.5 bg-white text-[#4E4E68] text-[12px] font-600 px-3 py-1.5 rounded-lg border border-[#E4E4EF]">
                          <X size={11} /> Discard
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#F4F4F8] flex gap-3 shrink-0">
              <button
                onClick={() => setComposing(false)}
                className="flex-1 border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
              >
                Save as draft
              </button>
              <button
                onClick={() => setComposing(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-2.5 rounded-xl text-[13.5px] transition-colors"
              >
                <Send size={14} /> Send now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
