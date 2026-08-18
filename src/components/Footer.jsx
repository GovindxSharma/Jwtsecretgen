import { Heart, Github, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xs mt-10 py-7 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        
        {/* Attribution & Creator */}
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>by</span>
          <a
            href="https://github.com/GovindxSharma"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Govind Sharma
          </a>
        </div>

        {/* Client side privacy guarantee */}
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% In-Browser • Zero Server Logging</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3.5">
          <a
            href="https://jwt.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition flex items-center gap-1"
          >
            <span>JWT.io</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
          <span>•</span>
          <a
            href="https://github.com/GovindxSharma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
