# 🔐 JWT Secret Generator

A modern, fast, cryptographically secure tool to generate and test JWT secrets with a clean, light-first UI, multi-format encodings, and instant integration code snippets.

👉 **Live Demo:** [https://govindxsharma.github.io/Jwtsecretgen/](https://govindxsharma.github.io/Jwtsecretgen/)

---

## ✨ Features

- 🔑 **Cryptographically Secure**: 100% in-browser generation using `window.crypto.getRandomValues()` (CSPRNG).
- 🌓 **Light & Dark Themes**: Crisp modern light mode by default with seamless dark mode toggle and saved preferences.
- 📐 **Multiple Algorithm Presets**:
  - `HS256` (256-bit / 32 Bytes)
  - `HS384` (384-bit / 48 Bytes)
  - `HS512` (512-bit / 64 Bytes — Recommended)
  - `1024-bit` (1024-bit / 128 Bytes)
- 🔠 **Multiple Output Formats**:
  - **Hexadecimal** (with lowercase / uppercase toggle)
  - **Base64**
  - **Base64URL** (RFC 7515 URL-safe)
  - **Alphanumeric** (A-Z, a-z, 0-9)
- 🛡️ **Interactive Secret Strength Tester**: Paste any existing key to analyze bit length, entropy level, and algorithm compatibility.
- 📦 **Instant Integration Snippets**: Ready-to-copy code tabs for Node.js (`jsonwebtoken`), Next.js (`jose`), Python (`PyJWT`), and Go.
- 📄 **One-Click Export**: Copy secret, copy `.env` format, or download a `.env` file directly.
- 👁️ **Privacy Shield**: Mask/Reveal toggle (`••••••••`) to protect against shoulder-surfing.
- ⌨️ **Keyboard Shortcut**: Press `G` or `Space` to regenerate a secret instantly.
- 🚀 **Zero Telemetry / 100% Client-Side**: No backend, zero tracking, keys never leave your device.

---

## 🖥️ Tech Stack

- ⚛️ **React 19 + Vite 7**
- 🎨 **Tailwind CSS 4**
- 🔤 **Lucide React Icons**
- 💡 **Web Crypto API**

---

## 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/GovindxSharma/Jwtsecretgen.git

# Navigate into directory
cd Jwtsecretgen

# Install dependencies
npm install

# Start local dev server
npm run dev
```

---

## 📄 License & Credits

Crafted with ❤️ by [Govind Sharma](https://github.com/GovindxSharma).
Open source and free for developers worldwide.
