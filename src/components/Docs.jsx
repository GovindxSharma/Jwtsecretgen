import {
  HelpCircle,
  Key,
  Shield,
  Send,
  CheckCircle,
  Lock,
  EyeOff,
  RefreshCw,
  FileText,
  AlertCircle
} from "lucide-react";

export default function Docs() {
  const steps = [
    {
      num: "1",
      icon: Lock,
      title: "Server Signs Token",
      desc: "When a user logs in, your server packages their user ID and signs it using your private JWT secret key.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      num: "2",
      icon: Send,
      title: "Client Holds Token",
      desc: "The browser or mobile app stores the token and sends it with every future API request in the Authorization header.",
      color: "from-indigo-500 to-violet-600",
    },
    {
      num: "3",
      icon: CheckCircle,
      title: "Server Verifies Signature",
      desc: "Your server checks if the signature matches using the secret key. If a hacker changed the user ID, verification fails instantly.",
      color: "from-violet-500 to-emerald-600",
    },
  ];

  const bestPractices = [
    {
      title: "Never Commit Secrets to GitHub",
      desc: "Keep your JWT_SECRET in a local `.env` file and make sure `.env` is listed inside your `.gitignore`.",
      isGood: true,
    },
    {
      title: "Use at least 256 bits (32 Bytes)",
      desc: "Never use simple dictionary words like 'supersecret123'. Modern GPUs can crack weak secrets in seconds.",
      isGood: true,
    },
    {
      title: "Separate Dev & Production Keys",
      desc: "Use different secret keys for local development, staging servers, and live production environments.",
      isGood: true,
    },
    {
      title: "Rotate Keys Safely",
      desc: "If you suspect a key leak, rotate your secret immediately. This will log out all active sessions safely.",
      isGood: true,
    },
  ];

  const faqs = [
    {
      q: "Is this generator safe to use?",
      a: "Yes, 100%! All secrets are generated entirely inside your web browser using the browser's native window.crypto.getRandomValues() CSPRNG engine. No keys are ever sent across the network or stored on any server.",
    },
    {
      q: "What is the difference between Hex and Base64?",
      a: "Both represent the exact same random binary bytes. Hex uses 0-9 and a-f characters, while Base64 is slightly more compact. Both are fully compatible with JWT libraries like jsonwebtoken, PyJWT, and jose.",
    },
    {
      q: "Which key size should I choose (HS256 vs HS512)?",
      a: "HS256 requires at least 256 bits (32 bytes). HS512 requires at least 512 bits (64 bytes). HS512 provides the highest standard security and is our recommended default.",
    },
    {
      q: "Where do I paste this generated secret?",
      a: "Save it inside your project's .env file as JWT_SECRET=\"your_generated_secret_here\" and read it in your code using process.env.JWT_SECRET (Node.js) or os.getenv('JWT_SECRET') (Python).",
    },
  ];

  return (
    <div className="space-y-8 pt-4 pb-8">
      
      {/* Section 1: What is a JWT Secret? */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            What is a JWT Secret?
          </h2>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          A <strong>JWT Secret</strong> is a private cryptographic password that only your server knows. It is used to generate a digital stamp (signature) on every JSON Web Token. Because only your server has the secret, no one else can fake or tamper with user permissions or session IDs.
        </p>

        {/* 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${step.color} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                      {step.num}
                    </div>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Best Practices Checklist */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Security Best Practices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Simple rules to keep your application safe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {bestPractices.map((bp, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850/40 flex items-start gap-3"
            >
              <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {bp.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {bp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Plain answers to common questions</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-100 dark:border-slate-800/80 pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">Q:</span>
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
