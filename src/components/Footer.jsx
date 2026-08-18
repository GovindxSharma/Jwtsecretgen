import { Heart, Github, ExternalLink, ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-12 py-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        
        {/* Attribution & Creator */}
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>by</span>
          <a
            href="https://github.com/GovindxSharma"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            Govind Sharma
          </a>
        </div>

        {/* Client side privacy guarantee */}
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>100% Client-Side • No server data transmission</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://jwt.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
          >
            <span>JWT.io</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span>•</span>
          <a
            href="https://github.com/GovindxSharma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
