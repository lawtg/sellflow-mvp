import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Download as DownloadIcon, Loader2, AlertCircle, Zap, FileText, Check } from "lucide-react";

type DownloadState = "loading" | "valid" | "expired" | "invalid" | "downloading" | "done";

// Simulate token validation — replace with real API call
function validateToken(token: string): Promise<{ valid: boolean; expired?: boolean; product?: string; size?: string; orderId?: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (token === "expired") return resolve({ valid: false, expired: true });
      if (token.length < 6) return resolve({ valid: false });
      resolve({
        valid: true,
        product: "The Cake Business Sales Playbook",
        size: "4.2 MB",
        orderId: "SF-2847",
      });
    }, 1200);
  });
}

export default function Download() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<DownloadState>("loading");
  const [product, setProduct] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [orderId, setOrderId] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    validateToken(token).then(result => {
      if (!result.valid) {
        setState(result.expired ? "expired" : "invalid");
      } else {
        setProduct(result.product || "");
        setFileSize(result.size || "");
        setOrderId(result.orderId || "");
        setState("valid");
      }
    });
  }, [token]);

  const handleDownload = () => {
    setState("downloading");
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloadProgress(100);
        setTimeout(() => setState("done"), 400);
      }
      setDownloadProgress(Math.min(progress, 100));
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#5847F5] flex items-center justify-center">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[17px] font-700 text-[#0B0B18] tracking-tight">SellFlow</span>
        </div>

        {/* Loading */}
        {state === "loading" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-10 text-center">
            <Loader2 size={32} className="text-[#5847F5] animate-spin mx-auto mb-4" />
            <div className="text-[15px] font-600 text-[#0B0B18]">Verifying your download…</div>
            <div className="text-[12.5px] text-[#9292A8] mt-1">Checking your access token</div>
          </div>
        )}

        {/* Valid — ready to download */}
        {state === "valid" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-[#5847F5]" />
            </div>
            <h1 className="text-[20px] font-800 text-[#0B0B18] tracking-tight mb-1">Your file is ready</h1>
            <p className="text-[13.5px] text-[#4E4E68] mb-5">
              Click the button below to download your product.
            </p>

            <div className="bg-[#F8F8FC] rounded-xl p-4 mb-5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5847F5] to-[#7C3AED] flex items-center justify-center text-white text-[12px] font-700 shrink-0">
                  PDF
                </div>
                <div>
                  <div className="text-[13.5px] font-700 text-[#0B0B18]">{product}</div>
                  <div className="text-[12px] text-[#9292A8]">{fileSize} · PDF document</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-700 py-3.5 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <DownloadIcon size={16} />
              Download Now
            </button>

            <div className="text-[11.5px] text-[#9292A8] space-y-1">
              <div>Order #{orderId}</div>
              <div>This link expires in 24 hours · {String(3 - (token?.length ?? 0 % 2))} downloads remaining</div>
            </div>
          </div>
        )}

        {/* Downloading */}
        {state === "downloading" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <DownloadIcon size={24} className="text-[#5847F5]" />
            </div>
            <h1 className="text-[20px] font-800 text-[#0B0B18] mb-2">Downloading…</h1>
            <p className="text-[13px] text-[#9292A8] mb-5">{product}</p>
            <div className="w-full bg-[#F4F4F8] rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="h-2 bg-[#5847F5] rounded-full transition-all duration-200"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <div className="text-[12px] text-[#9292A8]">{Math.round(downloadProgress)}%</div>
          </div>
        )}

        {/* Done */}
        {state === "done" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E6F9F0] flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-[#0CAF60]" strokeWidth={2.5} />
            </div>
            <h1 className="text-[22px] font-800 text-[#0B0B18] mb-1">Download complete!</h1>
            <p className="text-[13.5px] text-[#4E4E68] mb-5">
              Your file should be in your Downloads folder. Enjoy!
            </p>
            <div className="bg-[#F0EBFF] border border-[#D4CCFF] rounded-xl p-4 mb-5 text-left">
              <div className="text-[12px] font-700 text-[#7C3AED] mb-1 flex items-center gap-1.5">
                <span>✦</span> Pro tip
              </div>
              <div className="text-[12.5px] text-[#4E4E68]">
                Your download link has been sent to your email as well, so you can access it again anytime.
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full border border-[#E4E4EF] text-[#4E4E68] font-500 py-2.5 rounded-xl text-[13.5px] hover:bg-[#F8F8FC] transition-colors"
            >
              Back to SellFlow
            </button>
          </div>
        )}

        {/* Expired */}
        {state === "expired" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} className="text-[#F59E0B]" />
            </div>
            <h1 className="text-[20px] font-800 text-[#0B0B18] mb-2">This link has expired</h1>
            <p className="text-[13.5px] text-[#4E4E68] mb-5">
              Download links are valid for 24 hours after purchase. Please check your email for a new link or contact support.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-3 rounded-xl text-[14px] transition-colors"
            >
              Contact Support
            </button>
          </div>
        )}

        {/* Invalid */}
        {state === "invalid" && (
          <div className="bg-white rounded-2xl border border-[#E4E4EF] p-7 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEE2E2] flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} className="text-[#EF4444]" />
            </div>
            <h1 className="text-[20px] font-800 text-[#0B0B18] mb-2">Invalid download link</h1>
            <p className="text-[13.5px] text-[#4E4E68] mb-5">
              This download link is invalid or has already been used. Check your email for the correct link.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#5847F5] hover:bg-[#4636E0] text-white font-600 py-3 rounded-xl text-[14px] transition-colors mb-3"
            >
              Go to Home
            </button>
            <button className="w-full text-[13px] text-[#9292A8] hover:text-[#4E4E68] transition-colors">
              Contact support
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
