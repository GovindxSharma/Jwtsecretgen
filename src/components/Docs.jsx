export default function Docs() {
  return (
    <section className="mt-16 text-left max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-3">📘 How to Use</h2>
      <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm leading-relaxed">
        <li>Click "Generate Secret" to create a new secure random string.</li>
        <li>Select desired key length — 256, 512, or 1024 bits.</li>
        <li>Click "Copy" to copy the secret to your clipboard.</li>
        <li>
          Use the copied secret in JWT libraries like <code className="text-indigo-400">jsonwebtoken</code> or{' '}
          <a href="https://jwt.io/" target="_blank" className="underline text-indigo-400">jwt.io</a>.
        </li>
        <li>Store it safely in your <code className="text-indigo-400">.env</code> file.</li>
      </ul>
    </section>
  );
}
