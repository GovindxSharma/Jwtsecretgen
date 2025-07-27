import Header from "./components/Header";
import Generator from "./components/Generator";
import Docs from "./components/Docs";

export default function App() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-grow px-4 py-8 max-w-5xl mx-auto w-full">
        <Generator />
        <Docs />
      </main>
      <footer className="text-center text-sm text-gray-500 mt-10 mb-6 px-4">
        Made with ❤️ by <span className="text-indigo-400 font-medium">Govind Sharma</span> |
        <a
          href="https://github.com/GovindxSharma"
          target="_blank"
          className="underline ml-1 hover:text-white transition"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
