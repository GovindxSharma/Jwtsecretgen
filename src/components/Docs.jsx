import {
  HelpCircle,
  Key,
  Shield,
  Send,
  CheckCircle,
  Lock
} from "lucide-react";

export default function Docs() {
  const steps = [
    {
      num: "1",
      icon: Lock,
      title: "Server Signs Token",
      desc: "When a user logs in, your server packages their user ID and signs it using your private JWT secret key.",
    },
    {
      num: "2",
      icon: Send,
      title: "Client Holds Token",
      desc: "The browser or mobile app stores the token and sends it with every future API request in the Authorization header.",
    },
    {
      num: "3",
      icon: CheckCircle,
      title: "Server Verifies Signature",
      desc: "Your server checks if the signature matches using the secret key. If a hacker changed the user ID, verification fails instantly.",
    },
  ];

  const bestPractices = [
    {
      title: "Never Commit Secrets to Git",
      desc: "Keep your JWT_SECRET in a local `.env` file and make sure `.env` is listed inside your `.gitignore`.",
    },
    {
      title: "Use at least 256 bits (32 Bytes)",
      desc: "Never use simple dictionary words like 'supersecret123'. Modern GPUs can crack weak secrets in seconds.",
    },
    {
      title: "Separate Dev & Production Keys",
      desc: "Use different secret keys for local development, staging servers, and live production environments.",
    },
    {
      title: "Rotate Keys Periodically",
      desc: "If you suspect a key leak, rotate your secret immediately to safely invalidate older compromised sessions.",
    },
  ];

  const faqs = [
    {
      q: "Is this generator safe to use?",
      a: "Yes, 100%. All secrets are generated entirely inside your web browser using the browser's native window.crypto.getRandomValues() cryptographic engine. No keys are ever sent across the network or stored on any server.",
    },
    {
      q: "What is the difference between Hex and Base64?",
      a: "Both represent the exact same random binary bytes. Hex uses 0-9 and a-f characters, while Base64 is slightly shorter. Both are fully compatible with JWT libraries like jsonwebtoken, PyJWT, and jose.",
    },
    {
      q: "Which key size should I choose (HS256 vs HS512)?",
      a: "HS256 requires at least 256 bits (32 bytes). HS512 requires at least 512 bits (64 bytes). HS512 provides maximum HMAC cryptographic security and is our recommended default.",
    },
    {
      q: "Where do I paste this generated secret?",
      a: "Save it inside your project's .env file as JWT_SECRET=\"your_generated_secret_here\" and read it in your code using process.env.JWT_SECRET (Node.js) or os.getenv('JWT_SECRET') (Python).",
    },
  ];

  return (
    <div className="space-y-6 pt-2 pb-8">
      
      {/* Section 1: What is a JWT Secret? */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Key className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
            What is a JWT Secret?
          </h2>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
          A <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">JWT Secret</strong> is a private cryptographic key that only your server knows. It is used to generate a digital signature on every JSON Web Token. Because only your server has the secret, nobody else can tamper with user permissions or fake login sessions.
        </p>

        {/* 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-850/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Best Practices */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Security Best Practices
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Simple rules to keep your application safe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bestPractices.map((bp, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-850/40 flex items-start gap-2.5"
            >
              <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {bp.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  {bp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <HelpCircle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Plain answers to common questions</p>
          </div>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-zinc-100 dark:border-zinc-800 pb-3.5 last:border-b-0 last:pb-0">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">Q:</span>
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
