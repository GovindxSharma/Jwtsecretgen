
````markdown
# 🔐 JWT Secret Generator

A secure, open-source tool to generate cryptographically strong JWT secrets with a beautiful, responsive UI — perfect for your `.env` files or JWT-based applications.

👉 **Live Demo:** [https://jwtsecretgenenrator.onrender.com/](https://jwtsecretgenenrator.onrender.com/)

---

## ✨ Features

- 🔑 Generate 256-bit, 512-bit, or 1024-bit secure secrets
- 📋 One-click copy to clipboard
- 💅 Beautiful dark UI with smooth gradients & transitions
- 📱 Fully responsive on mobile and desktop
- 🚀 No backend, 100% client-side and secure

---

## 🖥️ Tech Stack

- ⚛️ **React + Vite**
- 🎨 **Tailwind CSS**
- 💡 **Crypto API** (`window.crypto.getRandomValues`)
- 🧪 Hosted on **Render**

---

## 📦 Usage

1. Click **"Generate Secret"** to create a secure random string.
2. Choose the key size: **256, 512, or 1024-bit**.
3. Click **"Copy Secret"** to copy it to your clipboard.
4. Paste it into your `.env` file or wherever needed:

```env
JWT_SECRET=your_generated_secret
````

---

## 📸 Preview

![Preview of JWT Secret Generator](https://jwtsecretgenenrator.onrender.com/jwt.png)

---

## 📁 Project Structure

```
├── public/
│   └── jwt.png              # Favicon
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Generator.jsx
│   │   └── Docs.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── README.md
```



