import { useState, useMemo } from "react";
import { SearchCheck, ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Key, Sparkles } from "lucide-react";

export default function SecretChecker() {
  const [inputSecret, setInputSecret] = useState("");

  const analysis = useMemo(() => {
    const trimmed = inputSecret.trim();
    if (!trimmed) return null;

    const charCount = trimmed.length;

    // Detect format
    const isHex = /^[0-9a-fA-F]+$/.test(trimmed) && charCount % 2 === 0;
    const isBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(trimmed) && charCount % 4 === 0 && charCount >= 4;

    let estimatedBytes = 0;
    let formatName = "Plain Text / String";

    if (isHex) {
      estimatedBytes = charCount / 2;
      formatName = "Hexadecimal";
    } else if (isBase64) {
      estimatedBytes = Math.floor((charCount * 3) / 4);
      formatName = "Base64";
    } else {
      estimatedBytes = new TextEncoder().encode(trimmed).length;
    }

    const estimatedBits = estimatedBytes * 8;

    let score = "weak";
    let title = "Weak / Risky";
    let colorClass = "text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800";
    let badgeClass = "bg-rose-500 text-white";
    let feedback = "This secret is too short or predictable. It can be cracked quickly via dictionary or brute-force attacks.";

    if (estimatedBits >= 512) {
      score = "optimal";
      title = "Optimal & Ultra Secure";
      colorClass = "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800";
      badgeClass = "bg-emerald-600 text-white";
      feedback = "Outstanding! Safe for HS256, HS384, and HS512 HMAC algorithms.";
    } else if (estimatedBits >= 256) {
      score = "good";
      title = "Strong & Production Safe";
      colorClass = "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800";
      badgeClass = "bg-indigo-600 text-white";
      feedback = "Meets the standard 256-bit requirement for HS256 algorithms.";
    } else if (estimatedBits >= 128) {
      score = "moderate";
      title = "Moderate / Sub-optimal";
      colorClass = "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800";
      badgeClass = "bg-amber-500 text-white";
      feedback = "Okay for local development, but below the RFC 7518 recommendation for production JWTs.";
    }

    return {
      charCount,
      estimatedBytes,
      estimatedBits,
      formatName,
      score,
      title,
      colorClass,
      badgeClass,
      feedback,
      meetsHS256: estimatedBits >= 256,
      meetsHS384: estimatedBits >= 384,
      meetsHS512: estimatedBits >= 512,
    };
  }, [inputSecret]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-7 transition-colors duration-200">
      
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
          <SearchCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Test Your Existing Secret
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste any key you currently use in your .env to check its bit-strength and algorithm compatibility
          </p>
        </div>
      </div>

      {/* Input Field */}
      <div className="relative mb-4">
        <input
          type="text"
          value={inputSecret}
          onChange={(e) => setInputSecret(e.target.value)}
          placeholder="Paste your existing JWT_SECRET here..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {inputSecret && (
          <button
            onClick={() => setInputSecret("")}
            className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Analysis Results */}
      {analysis ? (
        <div className={`p-4 rounded-xl border ${analysis.colorClass} transition-all space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {analysis.score === "optimal" || analysis.score === "good" ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
              <span className="font-bold text-sm">{analysis.title}</span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${analysis.badgeClass}`}>
              {analysis.estimatedBits} bits ({analysis.estimatedBytes} bytes)
            </span>
          </div>

          <p className="text-xs leading-relaxed opacity-90">
            {analysis.feedback}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-current/10 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-semibold opacity-70">Detected Format</span>
              <span className="font-semibold">{analysis.formatName}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold opacity-70">HS256 Safe</span>
              <span className="font-semibold">{analysis.meetsHS256 ? "✅ Yes (>=256 bits)" : "❌ Too weak"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold opacity-70">HS384 Safe</span>
              <span className="font-semibold">{analysis.meetsHS384 ? "✅ Yes (>=384 bits)" : "❌ Too weak"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold opacity-70">HS512 Safe</span>
              <span className="font-semibold">{analysis.meetsHS512 ? "✅ Yes (>=512 bits)" : "❌ Too weak"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-50 dark:bg-slate-850/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
          Paste any string above to test whether it's safe for production tokens.
        </div>
      )}

    </div>
  );
}
