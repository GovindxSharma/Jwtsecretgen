import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
  Terminal,
  ShieldCheck,
  Zap,
  Sliders,
  CheckCircle2,
  FileCode,
  Sparkles,
  ArrowRight
} from "lucide-react";

const PRESETS = [
  { bits: 256, bytes: 32, label: "HS256", desc: "Standard HMAC-SHA256 (32 Bytes)", tag: "Standard" },
  { bits: 384, bytes: 48, label: "HS384", desc: "Stronger HMAC-SHA384 (48 Bytes)", tag: "High" },
  { bits: 512, bytes: 64, label: "HS512", desc: "Recommended HMAC-SHA512 (64 Bytes)", tag: "Recommended", isBest: true },
  { bits: 1024, bytes: 128, label: "1024-bit", desc: "Ultra Heavy Duty (128 Bytes)", tag: "Ultra" },
];

const FORMATS = [
  { id: "hex", name: "Hexadecimal", hint: "Best for Node.js / Crypto" },
  { id: "base64", name: "Base64", hint: "Standard for Web & APIs" },
  { id: "base64url", name: "Base64URL", hint: "URL & Header safe" },
  { id: "alphanumeric", name: "Alphanumeric", hint: "A-Z, a-z, 0-9 plain" },
];

export default function Generator({ showToast }) {
  const [selectedBits, setSelectedBits] = useState(512);
  const [format, setFormat] = useState("hex");
  const [hexCase, setHexCase] = useState("lower"); // 'lower' or 'upper'
  const [rawBytes, setRawBytes] = useState(null);
  const [secret, setSecret] = useState("");
  const [isMasked, setIsMasked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedType, setCopiedType] = useState(null); // 'secret', 'env', 'code'
  const [activeCodeTab, setActiveCodeTab] = useState("node");

  // Core cryptographic generator
  const generateNewSecret = useCallback(() => {
    setIsGenerating(true);
    const bytesCount = selectedBits / 8;
    const array = new Uint8Array(bytesCount);
    window.crypto.getRandomValues(array);
    setRawBytes(array);

    setTimeout(() => {
      setIsGenerating(false);
    }, 150);
  }, [selectedBits]);

  // Compute formatted string from raw bytes
  useEffect(() => {
    if (!rawBytes) return;

    let result = "";
    if (format === "hex") {
      const hex = Array.from(rawBytes, (b) => b.toString(16).padStart(2, "0")).join("");
      result = hexCase === "upper" ? hex.toUpperCase() : hex.toLowerCase();
    } else if (format === "base64") {
      let binary = "";
      for (let i = 0; i < rawBytes.length; i++) {
        binary += String.fromCharCode(rawBytes[i]);
      }
      result = btoa(binary);
    } else if (format === "base64url") {
      let binary = "";
      for (let i = 0; i < rawBytes.length; i++) {
        binary += String.fromCharCode(rawBytes[i]);
      }
      result = btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    } else if (format === "alphanumeric") {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let str = "";
      for (let i = 0; i < rawBytes.length; i++) {
        str += chars[rawBytes[i] % chars.length];
      }
      result = str;
    }

    setSecret(result);
  }, [rawBytes, format, hexCase]);

  // Generate on initial mount
  useEffect(() => {
    generateNewSecret();
  }, [generateNewSecret]);

  // Global keyboard shortcut: Press Space or G to generate
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is focused on an input or textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        generateNewSecret();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generateNewSecret]);

  const copyToClipboard = async (text, type = "secret", message = "Copied to clipboard!") => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      if (showToast) showToast(message, "success");
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      if (showToast) showToast("Failed to copy", "error");
    }
  };

  const downloadEnvFile = () => {
    const content = `# JWT Secret Key (Generated ${new Date().toISOString().split("T")[0]})\n# Format: ${format.toUpperCase()} | Length: ${selectedBits}-bit\nJWT_SECRET="${secret}"\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = ".env";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (showToast) showToast(".env file downloaded!", "success");
  };

  // Code snippets generator
  const codeSnippets = {
    node: `// 1. Install jsonwebtoken: npm install jsonwebtoken
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '${secret}';

// Sign a new token
const token = jwt.sign(
  { userId: '12345', role: 'admin' },
  JWT_SECRET,
  { expiresIn: '24h', algorithm: '${selectedBits === 512 ? "HS512" : selectedBits === 384 ? "HS384" : "HS256"}' }
);

// Verify incoming token
const decoded = jwt.verify(token, JWT_SECRET);`,
    nextjs: `// In your .env.local file:
// JWT_SECRET="${secret}"

// In /app/api/auth/route.ts or NextAuth config:
import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

// Create token
export async function createToken(payload: { userId: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: '${selectedBits === 512 ? "HS512" : selectedBits === 384 ? "HS384" : "HS256"}' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}`,
    python: `# Install: pip install pyjwt
import jwt
import os
from datetime import datetime, timedelta

JWT_SECRET = os.getenv('JWT_SECRET', '${secret}')

# Create token
payload = {
    'user_id': 12345,
    'exp': datetime.utcnow() + timedelta(hours=24)
}
token = jwt.encode(payload, JWT_SECRET, algorithm='${selectedBits === 512 ? "HS512" : selectedBits === 384 ? "HS384" : "HS256"}')

# Verify token
decoded = jwt.decode(token, JWT_SECRET, algorithms=['${selectedBits === 512 ? "HS512" : selectedBits === 384 ? "HS384" : "HS256"}'])`,
    golang: `package main

import (
	"fmt"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("${secret}")

func createToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"userId": userID,
		"exp":    time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS${selectedBits === 512 ? "512" : selectedBits === 384 ? "384" : "256"}, claims)
	return token.SignedString(jwtKey)
}`
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Intro */}
      <div className="text-center space-y-2 pt-2 pb-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Generate Strong <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">JWT Secrets</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Create unpredictable, cryptographically random keys for signing JWT tokens and securing your backend APIs.
        </p>
      </div>

      {/* Main Generator Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-7">
        
        {/* Step 1: Preset Key Length */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              1. Choose Security Level / Key Size
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {selectedBits / 8} Bytes / {selectedBits} Bits
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRESETS.map((preset) => {
              const active = selectedBits === preset.bits;
              return (
                <button
                  key={preset.bits}
                  onClick={() => setSelectedBits(preset.bits)}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                    active
                      ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-500 ring-2 ring-indigo-500/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-sm font-bold ${active ? "text-indigo-900 dark:text-indigo-200" : "text-slate-800 dark:text-slate-200"}`}>
                      {preset.label}
                    </span>
                    {preset.isBest && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Best
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {preset.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Output Format */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              2. Encoding Format
            </label>
            {format === "hex" && (
              <button
                onClick={() => setHexCase(hexCase === "lower" ? "upper" : "lower")}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Case: {hexCase === "lower" ? "lowercase (default)" : "UPPERCASE"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FORMATS.map((fmt) => {
              const active = format === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium transition text-left ${
                    active
                      ? "border-indigo-600 bg-indigo-600 text-white font-semibold shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="font-semibold">{fmt.name}</div>
                  <div className={`text-[10px] mt-0.5 opacity-80 truncate`}>
                    {fmt.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generated Secret Display Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Your Generated Secret Key
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMasked(!isMasked)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={isMasked ? "Reveal secret" : "Mask secret (for privacy)"}
              >
                {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isMasked ? "Show" : "Mask"}</span>
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="w-full bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm break-all leading-relaxed shadow-inner border border-slate-800 min-h-[96px] flex items-center">
              {isMasked ? (
                <span className="tracking-widest text-slate-500 select-none">
                  {"•".repeat(Math.min(secret.length, 64))}
                </span>
              ) : (
                <span className="text-emerald-400 select-all font-medium">
                  {secret || "Generating..."}
                </span>
              )}
            </div>

            {/* Floating Fast Copy Button */}
            <div className="absolute right-3 top-3">
              <button
                onClick={() => copyToClipboard(secret, "secret", "Secret key copied to clipboard!")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium shadow-sm transition backdrop-blur-sm"
              >
                {copiedType === "secret" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1 gap-2">
            <div className="flex items-center gap-3">
              <span>Length: <strong className="text-slate-700 dark:text-slate-300 font-mono">{secret.length}</strong> chars</span>
              <span>•</span>
              <span>Entropy: <strong className="text-slate-700 dark:text-slate-300 font-mono">{selectedBits}</strong> bits</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3" /> CSPRNG Ready
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
              Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono text-[10px]">G</kbd> to re-generate
            </span>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          
          {/* Main Generate Button */}
          <button
            onClick={generateNewSecret}
            disabled={isGenerating}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all active:scale-[0.98]"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
            <span>Generate New Secret</span>
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            
            {/* Copy .env line */}
            <button
              onClick={() => copyToClipboard(`JWT_SECRET="${secret}"`, "env", 'Copied .env format: JWT_SECRET="..."')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-medium transition"
              title="Copy formatted for .env file"
            >
              {copiedType === "env" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied .env!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy .env Line</span>
                </>
              )}
            </button>

            {/* Download .env file */}
            <button
              onClick={downloadEnvFile}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-medium transition"
              title="Download as .env file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download .env</span>
            </button>

          </div>

        </div>

      </div>

      {/* Code Snippets Section (Expandable/Tabbed) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-6 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Quick Integration Snippets</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Copy pre-configured code with your generated key</p>
            </div>
          </div>

          {/* Snippet Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto">
            {[
              { id: "node", label: "Node.js" },
              { id: "nextjs", label: "Next.js / Jose" },
              { id: "python", label: "Python (PyJWT)" },
              { id: "golang", label: "Go" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                  activeCodeTab === tab.id
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Content Block */}
        <div className="relative">
          <pre className="bg-slate-950 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-56">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>

          <button
            onClick={() => copyToClipboard(codeSnippets[activeCodeTab], "code", "Code snippet copied!")}
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition"
          >
            {copiedType === "code" ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[11px]">Copy Snippet</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
