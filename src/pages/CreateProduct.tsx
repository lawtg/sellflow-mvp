import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Upload, FileText, X, Check, Sparkles, ArrowRight, ArrowLeft, ChevronRight, Zap } from "lucide-react";

// 7 questions per spec
const questions = [
  {
    q: "Who is this product specifically for?",
    placeholder: "e.g. Beginner bakers who know how to make great cakes but struggle to get consistent orders.",
    hint: "Be specific about who benefits most from your product.",
  },
  {
    q: "What is their biggest problem or struggle?",
    placeholder: "e.g. They work hard but don't know how to attract customers or price their cakes professionally.",
    hint: "Describe the frustration your audience feels before they find your product.",
  },
  {
    q: "What do they want instead — what does success look like?",
    placeholder: "e.g. A steady stream of cake orders, confidently priced, with customers who pay without negotiating.",
    hint: "Describe the transformation your product delivers.",
  },
  {
    q: "What will your product help them achieve?",
    placeholder: "e.g. A proven system to get 10+ cake orders per month, price with confidence, and build a dependable income.",
    hint: "List the specific outcomes or results they'll get.",
  },
  {
    q: "What makes your product different from other options?",
    placeholder: "e.g. It's built specifically for Nigerian bakers with local pricing strategies and WhatsApp marketing tactics.",
    hint: "Your unique angle or approach — what no one else offers.",
  },
  {
    q: "Do you have any customer testimonials or results?",
    placeholder: "e.g. 'I tripled my cake orders in 30 days using this guide' — Amaka, Lagos.",
    hint: "Social proof builds trust. Share any results if you have them.",
  },
  {
    q: "Do you offer a guarantee or refund policy?",
    placeholder: "e.g. 30-day money-back guarantee if you don't see results.",
    hint: "A guarantee reduces purchase anxiety and increases conversions.",
  },
];

const analysisSteps = [
  "Reading your product content",
  "Identifying your target audience",
  "Understanding the core transformation",
  "Mapping key benefits",
  "Analyzing potential objections",
  "Preparing your interview questions",
];

const generationSteps = [
  "Understanding your product ✓",
  "Positioning your offer ✓",
  "Writing your sales message",
  "Designing your page layout",
  "Preparing your checkout",
];

type Step = "details" | "upload" | "analyzing" | "interview" | "generating" | "done";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("details");
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [genProgress, setGenProgress] = useState(0);
  const [interviewStep, setInterviewStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const fileRef = useRef<HTMLInputElement>(null);

  // Controlled product details
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("PDF");
  const [currency, setCurrency] = useState("NGN (₦)");
  const [price, setPrice] = useState("");

  const currencySymbol = currency.includes("NGN") ? "₦" : currency.includes("USD") ? "$" : currency.includes("GHS") ? "₵" : currency.includes("KES") ? "Ksh" : "R";

  const detailsValid = productName.trim() && price;

  const startAnalysis = () => {
    setStep("analyzing");
    let p = 0;
    const t = setInterval(() => {
      p++;
      setAnalysisProgress(p);
      if (p >= analysisSteps.length) {
        clearInterval(t);
        setTimeout(() => setStep("interview"), 800);
      }
    }, 700);
  };

  const startGeneration = () => {
    setStep("generating");
    let p = 0;
    const t = setInterval(() => {
      p++;
      setGenProgress(p);
      if (p >= generationSteps.length) {
        clearInterval(t);
        setTimeout(() => setStep("done"), 800);
      }
    }, 900);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === "application/pdf") {
      setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex flex-col">
      {/* Topbar */}
      <div className="h-12 bg-white border-b border-[#E4E4EF] flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#5847F5] flex items-center justify-center">
            <Zap size={12} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[14px] font-700 text-[#0B0B18]">Sellfinix</span>
          <span className="text-[#E4E4EF] mx-1">·</span>
          <span className="text-[13px] text-[#9292A8]">New Product</span>
        </div>
        <button onClick={() => navigate("/products")} className="text-[13px] text-[#9292A8] hover:text-[#4E4E68] transition-colors">
          Cancel
        </button>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl">

          {/* Back button between upload steps */}
          {step === "upload" && (
            <button onClick={() => setStep("details")} className="flex items-center gap-1.5 text-[13px] text-[#9292A8] hover:text-[#4E4E68] mb-6 transition-colors">
              <ArrowLeft size={14} />
              Back
            </button>
          )}

          {/* ─── STEP: Details ─── */}
          {step === "details" && (
            <div>
              <div className="mb-7">
                <h1 className="text-[24px] font-800 text-[#0B0B18] tracking-tight mb-1">Create Product</h1>
                <p className="text-[14px] text-[#9292A8]">Add your product details and we'll build a sales page with AI.</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 space-y-4">
                <div>
                  <label className="block text-[12.5px] font-600 text-[#0B0B18] mb-1.5">Product name <span className="text-[#EF4444]">*</span></label>
                  <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="e.g. The Cake Business Sales Playbook"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-600 text-[#0B0B18] mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Briefly describe what your product is and who it helps."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12.5px] font-600 text-[#0B0B18] mb-1.5">Product type</label>
                    <select
                      value={productType}
                      onChange={e => setProductType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors bg-white"
                    >
                      <option>PDF</option>
                      <option>Ebook</option>
                      <option>Guide / Workbook</option>
                      <option>Templates</option>
                      <option>Audio</option>
                      <option>Bundle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-600 text-[#0B0B18] mb-1.5">Currency</label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] transition-colors bg-white"
                    >
                      <option>NGN (₦)</option>
                      <option>USD ($)</option>
                      <option>GHS (₵)</option>
                      <option>KES (Ksh)</option>
                      <option>ZAR (R)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[12.5px] font-600 text-[#0B0B18] mb-1.5">Price <span className="text-[#EF4444]">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13.5px] text-[#9292A8] font-500">{currencySymbol}</span>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EF] text-[13.5px] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors"
                    />
                  </div>
                  <p className="text-[11.5px] text-[#9292A8] mt-1">Enter 0 to offer as a free lead magnet.</p>
                </div>
                <button
                  onClick={() => setStep("upload")}
                  disabled={!detailsValid}
                  className="w-full bg-[#5847F5] hover:bg-[#4636E0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-600 py-3 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP: Upload ─── */}
          {step === "upload" && (
            <div>
              <div className="mb-7">
                <h1 className="text-[24px] font-800 text-[#0B0B18] tracking-tight mb-1">Upload your product</h1>
                <p className="text-[14px] text-[#9292A8]">Upload your PDF and Sellfinix AI will analyze it to build your sales page.</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6">
                {!file ? (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${dragging ? "border-[#5847F5] bg-[#EEF0FF]" : "border-[#E4E4EF] hover:border-[#ADADC4] hover:bg-[#FAFAFD]"}`}
                  >
                    <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
                    <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
                      <Upload size={20} className="text-[#5847F5]" strokeWidth={1.8} />
                    </div>
                    <div className="text-[15px] font-700 text-[#0B0B18] mb-1">Drag your PDF here or click to upload</div>
                    <div className="text-[12.5px] text-[#9292A8]">PDF only · Maximum 50 MB · Stored securely</div>
                  </div>
                ) : (
                  <div className="border-2 border-[#0CAF60] bg-[#E6F9F0] rounded-2xl p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <FileText size={18} className="text-[#5847F5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-700 text-[#0B0B18] truncate">{file.name}</div>
                      <div className="text-[12px] text-[#9292A8]">{file.size} · PDF</div>
                      <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#0CAF60] rounded-full w-full" />
                      </div>
                      <div className="text-[11px] text-[#0CAF60] font-500 mt-1">Upload complete</div>
                    </div>
                    <button onClick={() => setFile(null)} className="text-[#9292A8] hover:text-[#EF4444] transition-colors shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!file) setFile({ name: `${productName || "product"}.pdf`, size: "4.2 MB" });
                    setTimeout(startAnalysis, 300);
                  }}
                  className="w-full mt-4 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-3 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Continue — Let Sellfinix AI analyze
                </button>
                <p className="text-[11.5px] text-[#9292A8] text-center mt-3">
                  Sellfinix reads your PDF to understand what it teaches. Your file is private and secure.
                </p>
              </div>
            </div>
          )}

          {/* ─── STEP: Analyzing ─── */}
          {step === "analyzing" && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#5847F5] flex items-center justify-center mx-auto mb-6">
                <Sparkles size={22} className="text-white" />
              </div>
              <h1 className="text-[24px] font-800 text-[#0B0B18] tracking-tight mb-2">Understanding your product</h1>
              <p className="text-[14px] text-[#9292A8] mb-10">
                Sellfinix AI is analyzing your PDF to build the best possible sales page.
              </p>
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 text-left space-y-3.5">
                {analysisSteps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      i < analysisProgress ? "bg-[#0CAF60]" : i === analysisProgress ? "bg-[#5847F5]" : "bg-[#E4E4EF]"
                    }`}>
                      {i < analysisProgress
                        ? <Check size={11} className="text-white" strokeWidth={3} />
                        : i === analysisProgress
                        ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        : null}
                    </div>
                    <span className={`text-[13.5px] ${
                      i < analysisProgress ? "text-[#0B0B18] font-500" : i === analysisProgress ? "text-[#5847F5] font-600" : "text-[#ADADC4]"
                    }`}>{s}</span>
                    {i < analysisProgress && <Check size={13} className="text-[#0CAF60] ml-auto" strokeWidth={2.5} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP: Interview ─── */}
          {step === "interview" && (
            <div>
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#5847F5] flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[12px] font-700 text-[#5847F5]">
                      Sellfinix AI · Question {interviewStep + 1} of {questions.length}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-colors ${i <= interviewStep ? "bg-[#5847F5]" : "bg-[#E4E4EF]"}`}
                    />
                  ))}
                </div>
                <h1 className="text-[20px] font-800 text-[#0B0B18] tracking-tight mb-1">
                  Let's make your sales page stronger.
                </h1>
                <p className="text-[13.5px] text-[#9292A8]">
                  We've analyzed your product. Now we need a few answers from you.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6">
                <div className="text-[15px] font-700 text-[#0B0B18] mb-2">
                  {questions[interviewStep].q}
                </div>
                <p className="text-[12.5px] text-[#9292A8] mb-3">
                  {questions[interviewStep].hint}
                </p>
                <textarea
                  rows={4}
                  placeholder={questions[interviewStep].placeholder}
                  value={answers[interviewStep]}
                  onChange={e => {
                    const n = [...answers];
                    n[interviewStep] = e.target.value;
                    setAnswers(n);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl border border-[#E4E4EF] text-[13.5px] text-[#0B0B18] placeholder-[#C0C0D0] focus:outline-none focus:border-[#5847F5] focus:ring-2 focus:ring-[#5847F5]/10 transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => interviewStep > 0 && setInterviewStep(interviewStep - 1)}
                    disabled={interviewStep === 0}
                    className="flex items-center gap-1.5 text-[13px] text-[#9292A8] hover:text-[#4E4E68] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => interviewStep < questions.length - 1 ? setInterviewStep(interviewStep + 1) : startGeneration()}
                      className="text-[13px] text-[#9292A8] hover:text-[#4E4E68] transition-colors px-3"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => interviewStep < questions.length - 1 ? setInterviewStep(interviewStep + 1) : startGeneration()}
                      className="flex items-center gap-2 bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 px-5 py-2.5 rounded-xl text-[13.5px] transition-colors"
                    >
                      {interviewStep < questions.length - 1 ? "Continue" : "Build My Sales Page"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP: Generating ─── */}
          {step === "generating" && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center mx-auto mb-6">
                <Sparkles size={22} className="text-white" />
              </div>
              <h1 className="text-[24px] font-800 text-[#0B0B18] tracking-tight mb-2">Building your sales page</h1>
              <p className="text-[14px] text-[#9292A8] mb-10">
                Sellfinix AI is writing your sales copy and designing your page.
              </p>
              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-6 text-left space-y-3.5">
                {generationSteps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      i < genProgress ? "bg-[#0CAF60]" : i === genProgress ? "bg-[#5847F5]" : "bg-[#E4E4EF]"
                    }`}>
                      {i < genProgress
                        ? <Check size={11} className="text-white" strokeWidth={3} />
                        : i === genProgress
                        ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        : null}
                    </div>
                    <span className={`text-[13.5px] ${
                      i < genProgress ? "text-[#0B0B18] font-500" : i === genProgress ? "text-[#5847F5] font-600" : "text-[#ADADC4]"
                    }`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP: Done ─── */}
          {step === "done" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E6F9F0] flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-[#0CAF60]" strokeWidth={2.5} />
              </div>
              <h1 className="text-[26px] font-800 text-[#0B0B18] tracking-tight mb-2">
                Your sales page is ready! 🎉
              </h1>
              <p className="text-[14px] text-[#4E4E68] mb-3">
                Sellfinix AI built a complete sales page for{" "}
                <span className="font-700 text-[#0B0B18]">{productName || "your product"}</span>.
              </p>
              <p className="text-[13px] text-[#9292A8] mb-8">
                Review it, make edits, then connect payment and publish.
              </p>

              <div className="bg-white rounded-2xl border border-[#E4E4EF] p-5 mb-4 text-left space-y-2">
                {[
                  { label: "Hero section", status: "Written" },
                  { label: "Problem & transformation", status: "Written" },
                  { label: "Benefits", status: "Written" },
                  { label: "What's inside", status: "Written" },
                  { label: "Testimonials", status: answers[5] ? "Written" : "Skipped" },
                  { label: "Guarantee", status: answers[6] ? "Written" : "Skipped" },
                  { label: "FAQ", status: "Written" },
                  { label: "Offer & CTA", status: "Written" },
                ].map(({ label, status }) => (
                  <div key={label} className="flex items-center justify-between py-1.5 border-b border-[#F4F4F8] last:border-none">
                    <span className="text-[13px] text-[#0B0B18] font-500">{label}</span>
                    <span className={`text-[11.5px] font-600 ${status === "Written" ? "text-[#0CAF60]" : "text-[#9292A8]"}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/products/editor")}
                className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 py-3.5 rounded-xl text-[15px] transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <Sparkles size={16} />
                Review &amp; Edit Sales Page
              </button>
              <button
                onClick={() => navigate("/products/1")}
                className="w-full text-[13.5px] text-[#9292A8] hover:text-[#4E4E68] py-2 transition-colors"
              >
                View product details first
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
