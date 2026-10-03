import { useState } from "react";
import { Plus, Sparkles, Zap, Mail, Clock, Trash2, ChevronDown, Play, Pause, X } from "lucide-react";

type TriggerType = "purchase_completed" | "lead_created" | "page_visited" | "download_completed";
type StepType = "send_email" | "wait";

interface AutomationStep {
  id: string;
  type: StepType;
  emailSubject?: string;
  emailBody?: string;
  delayAmount?: number;
  delayUnit?: "hours" | "days";
}

interface Automation {
  id: string;
  name: string;
  trigger: TriggerType;
  status: "active" | "paused" | "draft";
  steps: AutomationStep[];
  enrolled: number;
}

const TRIGGER_LABELS: Record<TriggerType, { label: string; desc: string; emoji: string }> = {
  purchase_completed: { label: "Purchase completed", desc: "When someone buys your product", emoji: "💳" },
  lead_created: { label: "New lead captured", desc: "When someone downloads your lead magnet", emoji: "🧲" },
  page_visited: { label: "Sales page visited", desc: "When someone views your product page", emoji: "👁️" },
  download_completed: { label: "Product downloaded", desc: "When a customer downloads their purchase", emoji: "📥" },
};

const defaultAutomations: Automation[] = [
  {
    id: "1",
    name: "Post-purchase welcome",
    trigger: "purchase_completed",
    status: "active",
    enrolled: 28,
    steps: [
      { id: "s1", type: "send_email", emailSubject: "Your download is ready! 🎉", emailBody: "Hi {{name}}, your purchase is confirmed. Here's your download link…" },
      { id: "s2", type: "wait", delayAmount: 1, delayUnit: "hours" },
      { id: "s3", type: "send_email", emailSubject: "Quick tip to get started", emailBody: "Hey {{name}}, here's the first thing you should read in the playbook…" },
      { id: "s4", type: "wait", delayAmount: 3, delayUnit: "days" },
      { id: "s5", type: "send_email", emailSubject: "How's it going?", emailBody: "Hi {{name}}, just checking in. Have you had a chance to start the playbook?" },
    ],
  },
  {
    id: "2",
    name: "Lead magnet follow-up",
    trigger: "lead_created",
    status: "active",
    enrolled: 43,
    steps: [
      { id: "s1", type: "send_email", emailSubject: "Here's your free guide!", emailBody: "Hi {{name}}, your free pricing guide is attached. Download it here…" },
      { id: "s2", type: "wait", delayAmount: 1, delayUnit: "days" },
      { id: "s3", type: "send_email", emailSubject: "Did you see this?", emailBody: "{{name}}, the most common pricing mistake bakers make is…" },
      { id: "s4", type: "wait", delayAmount: 2, delayUnit: "days" },
      { id: "s5", type: "send_email", emailSubject: "Ready to take the next step?", emailBody: "If you want the full system, I put everything into one playbook…" },
    ],
  },
];

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>(defaultAutomations);
  const [selected, setSelected] = useState<Automation | null>(null);
  const [building, setBuilding] = useState(false);
  const [newTrigger, setNewTrigger] = useState<TriggerType>("purchase_completed");
  const [newName, setNewName] = useState("");

  const toggleStatus = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id
      ? { ...a, status: a.status === "active" ? "paused" : "active" }
      : a
    ));
    if (selected?.id === id) {
      setSelected(prev => prev ? { ...prev, status: prev.status === "active" ? "paused" : "active" } : null);
    }
  };

  const addStep = (automationId: string, type: StepType) => {
    const newStep: AutomationStep = type === "send_email"
      ? { id: genId(), type: "send_email", emailSubject: "", emailBody: "" }
      : { id: genId(), type: "wait", delayAmount: 1, delayUnit: "days" };

    setAutomations(prev => prev.map(a => a.id === automationId
      ? { ...a, steps: [...a.steps, newStep] }
      : a
    ));
    if (selected?.id === automationId) {
      setSelected(prev => prev ? { ...prev, steps: [...prev.steps, newStep] } : null);
    }
  };

  const removeStep = (automationId: string, stepId: string) => {
    setAutomations(prev => prev.map(a => a.id === automationId
      ? { ...a, steps: a.steps.filter(s => s.id !== stepId) }
      : a
    ));
    if (selected?.id === automationId) {
      setSelected(prev => prev ? { ...prev, steps: prev.steps.filter(s => s.id !== stepId) } : null);
    }
  };

  const updateStep = (automationId: string, stepId: string, updates: Partial<AutomationStep>) => {
    setAutomations(prev => prev.map(a => a.id === automationId
      ? { ...a, steps: a.steps.map(s => s.id === stepId ? { ...s, ...updates } : s) }
      : a
    ));
    if (selected?.id === automationId) {
      setSelected(prev => prev ? { ...prev, steps: prev.steps.map(s => s.id === stepId ? { ...s, ...updates } : s) } : null);
    }
  };

  const createAutomation = () => {
    if (!newName.trim()) return;
    const a: Automation = {
      id: genId(),
      name: newName,
      trigger: newTrigger,
      status: "draft",
      enrolled: 0,
      steps: [
        { id: genId(), type: "send_email", emailSubject: "", emailBody: "" },
      ],
    };
    setAutomations(prev => [...prev, a]);
    setSelected(a);
    setBuilding(false);
    setNewName("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-800 text-[#0B0B18] tracking-tight">Automations</h1>
          <p className="text-[13.5px] text-[#9292A8] mt-0.5">Automatically follow up with customers and leads.</p>
        </div>
        <button
          onClick={() => setBuilding(true)}
          className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white text-[13px] font-600 px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create Automation
        </button>
      </div>

      <div className="flex gap-5 flex-col lg:flex-row">
        {/* Left: automation list */}
        <div className="lg:w-80 shrink-0 space-y-3">
          {automations.map(a => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${selected?.id === a.id ? "border-[#5847F5] ring-2 ring-[#5847F5]/10" : "border-[#E4E4EF] hover:border-[#ADADC4]"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-[13.5px] font-700 text-[#0B0B18]">{a.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[14px]">{TRIGGER_LABELS[a.trigger].emoji}</span>
                    <span className="text-[11.5px] text-[#9292A8]">{TRIGGER_LABELS[a.trigger].label}</span>
                  </div>
                </div>
                <span className={`shrink-0 text-[11px] font-700 px-2.5 py-1 rounded-full ${
                  a.status === "active" ? "bg-[#E6F9F0] text-[#0CAF60]"
                  : a.status === "paused" ? "bg-[#FEF3C7] text-[#D97706]"
                  : "bg-[#F4F4F8] text-[#9292A8]"
                }`}>
                  {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11.5px] text-[#9292A8]">
                <span>{a.steps.length} steps</span>
                <span>·</span>
                <span>{a.enrolled} enrolled</span>
              </div>
            </div>
          ))}

          {automations.length === 0 && (
            <div className="bg-white rounded-2xl border border-[#E4E4EF] p-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-3">
                <Zap size={18} className="text-[#5847F5]" />
              </div>
              <div className="text-[14px] font-700 text-[#0B0B18] mb-1">No automations yet</div>
              <div className="text-[12.5px] text-[#9292A8]">Create your first automation to follow up with customers automatically.</div>
            </div>
          )}
        </div>

        {/* Right: automation editor */}
        {selected ? (
          <div className="flex-1 bg-white rounded-2xl border border-[#E4E4EF] overflow-hidden">
            {/* Automation header */}
            <div className="px-5 py-4 border-b border-[#F4F4F8] flex items-center justify-between">
              <div>
                <div className="text-[15px] font-700 text-[#0B0B18]">{selected.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#9292A8]">
                  <span>{TRIGGER_LABELS[selected.trigger].emoji}</span>
                  <span>Trigger: {TRIGGER_LABELS[selected.trigger].label}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(selected.id)}
                  className={`flex items-center gap-1.5 text-[12.5px] font-600 px-3 py-1.5 rounded-lg border transition-colors ${
                    selected.status === "active"
                      ? "border-[#FCD34D] bg-[#FEF3C7] text-[#D97706] hover:bg-[#FDE68A]"
                      : "border-[#A7F3D0] bg-[#E6F9F0] text-[#0CAF60] hover:bg-[#D1FAE5]"
                  }`}
                >
                  {selected.status === "active" ? <><Pause size={13} />Pause</> : <><Play size={13} />Activate</>}
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="p-5">
              {/* Trigger node */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] flex items-center justify-center text-[16px]">
                    {TRIGGER_LABELS[selected.trigger].emoji}
                  </div>
                  <div className="w-0.5 h-4 bg-[#E4E4EF] mt-1" />
                </div>
                <div className="pt-1">
                  <div className="text-[12px] font-700 text-[#5847F5] uppercase tracking-widest mb-0.5">Trigger</div>
                  <div className="text-[13.5px] font-600 text-[#0B0B18]">{TRIGGER_LABELS[selected.trigger].label}</div>
                  <div className="text-[12px] text-[#9292A8]">{TRIGGER_LABELS[selected.trigger].desc}</div>
                </div>
              </div>

              {/* Steps */}
              {selected.steps.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 mb-3">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${step.type === "send_email" ? "bg-[#EEF0FF]" : "bg-[#F4F4F8]"}`}>
                      {step.type === "send_email"
                        ? <Mail size={14} className="text-[#5847F5]" />
                        : <Clock size={14} className="text-[#9292A8]" />}
                    </div>
                    {i < selected.steps.length - 1 && <div className="w-0.5 h-4 bg-[#E4E4EF] mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    {step.type === "send_email" ? (
                      <div className="bg-[#FAFAFD] border border-[#E4E4EF] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-[11px] font-700 text-[#5847F5] uppercase tracking-widest">Send email</div>
                          <button onClick={() => removeStep(selected.id, step.id)} className="text-[#C0C0D0] hover:text-[#EF4444] transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <input
                          value={step.emailSubject || ""}
                          onChange={e => updateStep(selected.id, step.id, { emailSubject: e.target.value })}
                          placeholder="Email subject…"
                          className="w-full px-3 py-2 rounded-lg border border-[#E4E4EF] text-[12.5px] font-600 focus:outline-none focus:border-[#5847F5] transition-colors mb-2 bg-white"
                        />
                        <textarea
                          rows={2}
                          value={step.emailBody || ""}
                          onChange={e => updateStep(selected.id, step.id, { emailBody: e.target.value })}
                          placeholder="Email body… Use {{name}} for the recipient's name."
                          className="w-full px-3 py-2 rounded-lg border border-[#E4E4EF] text-[12px] text-[#4E4E68] focus:outline-none focus:border-[#5847F5] transition-colors resize-none bg-white"
                        />
                        <button className="mt-1.5 flex items-center gap-1 text-[11px] text-[#5847F5] font-600 hover:underline">
                          <Sparkles size={10} /> Write with AI
                        </button>
                      </div>
                    ) : (
                      <div className="bg-[#F8F8FC] border border-[#E4E4EF] rounded-xl p-3 flex items-center gap-3">
                        <Clock size={14} className="text-[#9292A8] shrink-0" />
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-[12.5px] text-[#4E4E68]">Wait</span>
                          <input
                            type="number"
                            min="1"
                            value={step.delayAmount || 1}
                            onChange={e => updateStep(selected.id, step.id, { delayAmount: parseInt(e.target.value) || 1 })}
                            className="w-14 px-2 py-1 rounded-lg border border-[#E4E4EF] text-[12.5px] text-center focus:outline-none focus:border-[#5847F5] transition-colors"
                          />
                          <select
                            value={step.delayUnit || "days"}
                            onChange={e => updateStep(selected.id, step.id, { delayUnit: e.target.value as "hours" | "days" })}
                            className="px-2 py-1 rounded-lg border border-[#E4E4EF] text-[12.5px] focus:outline-none focus:border-[#5847F5] transition-colors bg-white"
                          >
                            <option value="hours">hours</option>
                            <option value="days">days</option>
                          </select>
                        </div>
                        <button onClick={() => removeStep(selected.id, step.id)} className="text-[#C0C0D0] hover:text-[#EF4444] transition-colors shrink-0">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add step */}
              <div className="flex items-center gap-2 mt-1 ml-11">
                <button
                  onClick={() => addStep(selected.id, "send_email")}
                  className="flex items-center gap-1.5 text-[12px] text-[#5847F5] font-600 hover:bg-[#EEF0FF] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Mail size={12} /> + Add email
                </button>
                <button
                  onClick={() => addStep(selected.id, "wait")}
                  className="flex items-center gap-1.5 text-[12px] text-[#9292A8] font-500 hover:bg-[#F4F4F8] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Clock size={12} /> + Add delay
                </button>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-2.5 rounded-xl text-[13.5px] transition-colors">
                Save Automation
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl border border-[#E4E4EF] p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <Zap size={20} className="text-[#5847F5]" />
            </div>
            <div className="text-[15px] font-700 text-[#0B0B18] mb-2">Select an automation to edit</div>
            <div className="text-[13px] text-[#9292A8]">Click any automation on the left to view or edit its steps.</div>
          </div>
        )}
      </div>

      {/* Create automation modal */}
      {building && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-700 text-[#0B0B18]">New Automation</h2>
              <button onClick={() => setBuilding(false)} className="text-[#9292A8] hover:text-[#4E4E68]">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-1.5">Automation name</label>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Post-purchase welcome series"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-600 text-[#0B0B18] mb-2">Select trigger</label>
                <div className="space-y-2">
                  {(Object.keys(TRIGGER_LABELS) as TriggerType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setNewTrigger(t)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${newTrigger === t ? "border-[#5847F5] bg-[#EEF0FF]" : "border-[#E4E4EF] hover:border-[#ADADC4]"}`}
                    >
                      <span className="text-[20px]">{TRIGGER_LABELS[t].emoji}</span>
                      <div>
                        <div className={`text-[13px] font-600 ${newTrigger === t ? "text-[#5847F5]" : "text-[#0B0B18]"}`}>{TRIGGER_LABELS[t].label}</div>
                        <div className="text-[11.5px] text-[#9292A8]">{TRIGGER_LABELS[t].desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setBuilding(false)} className="flex-1 border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors">
                  Cancel
                </button>
                <button
                  onClick={createAutomation}
                  disabled={!newName.trim()}
                  className="flex-1 bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-50 text-white font-600 py-2.5 rounded-xl text-[13.5px] transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
