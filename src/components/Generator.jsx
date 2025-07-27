import { useState } from "react";
import { Check, Copy } from "lucide-react";

const bitsToBytes = (bits) => bits / 8;

export default function Generator() {
  const [secret, setSecret] = useState("");
  const [length, setLength] = useState(512);
  const [copied, setCopied] = useState(false);

  const generateSecret = () => {
    const array = new Uint8Array(bitsToBytes(length));
    crypto.getRandomValues(array);
    const hex = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    setSecret(hex);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!secret) return;
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="text-center">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 px-6 py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Generate JWT Secret</h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-6">
          <label htmlFor="length" className="text-gray-400 text-sm font-medium">
            Select Key Size
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value={256}>256-bit</option>
            <option value={512}>512-bit (Recommended)</option>
            <option value={1024}>1024-bit</option>
          </select>

          <button
            onClick={generateSecret}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Generate Secret
          </button>
        </div>

        <textarea
          className="w-full bg-zinc-950 border border-zinc-800 text-gray-100 rounded-xl p-4 h-40 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          value={secret}
          readOnly
          placeholder="Your generated secret will appear here..."
        />

        {secret && (
          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <span>Length: {secret.length} characters</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-500 transition"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Secret"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
