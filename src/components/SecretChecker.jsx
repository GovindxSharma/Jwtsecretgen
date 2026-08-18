import { useState, useMemo } from "react";
import { SearchCheck, ShieldAlert, ShieldCheck, CheckCircle2, Key } from "lucide-react";

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
    let title = "Weak / Low Entropy";
    let badgeBg = "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800";
    let feedback = "This secret is short and susceptible to brute-force attacks. We recommend generating at least a 256-bit key.";

    if (estimatedBits >= 512) {
      score = "optimal";
      title = "Optimal Security (HS512 Ready)";
      badgeBg = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
      feedback = "Excellent! Fully meets and exceeds cryptographic recommendations for HS256, HS384, and HS512.";
    } else if (estimatedBits >= 256) {
      score = "good";
      title = "Strong (HS256 Ready)";
      badgeBg = "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800";
      feedback = "Good security level. Meets the standard 256-bit requirement for HMAC-SHA256 tokens.";
    } else if (estimatedBits >= 128) {
      score = "moderate";
      title = "Moderate Strength";
      badgeBg = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
      feedback = "Acceptable for local testing, but below the RFC 7518 recommendation for production JWTs.";
    }

    return {
      charCount,
      estimatedBytes,
      estimatedBits,
      formatName,
      score,
      title,
      badgeBg,
      feedback,
      meetsHS256: estimatedBits >= 256,
      meetsHS384: estimatedBits >= 384,
      meetsHS512: estimatedBits >= 512,
    };
  }, [inputSecret]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs p-5 sm:p-7 transition-colors duration-200">
      
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          <SearchCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
            Test Your Existing Secret
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Paste any key from your .env to check its length, format, and HMAC algorithm safety
          </p>
        </div>
      </div>

      {/* Input Field */}
      <div className="relative mb-3.5">
        <input
          type="text"
          value={inputSecret}
          onChange={(e) => setInputSecret(e.target.value)}
          placeholder="Paste your existing JWT_SECRET here..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {inputSecret && (
          <button
            onClick={() => setInputSecret("")}
            className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Analysis Results Box */}
      {analysis ? (
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200 dark:border-zinc-800 transition-all space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {analysis.score === "optimal" || analysis.score === "good" ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              )}
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{analysis.title}</span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${analysis.badgeBg}`}>
              {analysis.estimatedBits} bits ({analysis.estimatedBytes} bytes)
            </span>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {analysis.feedback}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-semibold text-zinc-500 dark:text-zinc-400">Detected Format</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{analysis.formatName}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold text-zinc-500 dark:text-zinc-400">HS256 Safe</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{analysis.meetsHS256 ? "✅ Yes" : "❌ Too weak"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold text-zinc-500 dark:text-zinc-400">HS384 Safe</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{analysis.meetsHS384 ? "✅ Yes" : "❌ Too weak"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold text-zinc-500 dark:text-zinc-400">HS512 Safe</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{analysis.meetsHS512 ? "✅ Yes" : "❌ Too weak"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-zinc-50/70 dark:bg-zinc-850/40 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Paste any string above to test whether it is safe for production tokens.
        </div>
      )}

    </div>
  );
}
