export default function Header() {
  return (
    <header className="p-6 border-b border-zinc-800 bg-black bg-opacity-70 shadow-lg text-center backdrop-blur-md">
      <h1 className="text-4xl font-bold tracking-tight text-white">🔐 JWT Secret Generator</h1>
      <p className="text-gray-400 mt-1 text-sm">Create cryptographically secure JWT secrets in seconds.</p>
    </header>
  );
}
