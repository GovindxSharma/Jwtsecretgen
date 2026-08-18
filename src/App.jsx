import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Generator from "./components/Generator";
import SecretChecker from "./components/SecretChecker";
import Docs from "./components/Docs";
import Footer from "./components/Footer";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export default function App() {
  // Theme state: defaults to false (Light mode)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("jwt_gen_theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toast state
  const [toast, setToast] = useState(null);

  // Sync theme with document class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("jwt_gen_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("jwt_gen_theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? "bg-grid-dark text-slate-100" : "bg-grid-light text-slate-900"}`}>
      
      {/* Navigation Header */}
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        
        {/* Generator Main Component */}
        <Generator showToast={showToast} />

        {/* Existing Secret Checker & Strength Tester */}
        <SecretChecker />

        {/* Plain English Guides, 3-Step Flow, FAQs */}
        <Docs />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md bg-slate-900/95 text-white border-slate-700/80 text-xs sm:text-sm font-medium">
            {toast.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
