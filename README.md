# Best Music Streaming Platform

A modern, full-stack music streaming web app built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It currently implements a functional audio player and a responsive UI, with more features planned.

---

## 📸 Screenshots

> Add your screenshots or GIFs here

* Home page
* Player controls (play/pause, next/prev, volume, repeat)

---

## ✨ Features (Implemented)

* ✅ Audio player with:

  * Play / Pause
  * Previous / Next
  * Volume control & mute
  * Repeat toggle
* ✅ Responsive layout using Tailwind CSS
* ✅ Organized components and hooks for clean code structure
* ✅ Icon set via `react-icons`

---

## 🧰 Tech Stack

* **Framework:** Next.js (App Router) + React + TypeScript
* **Styling:** Tailwind CSS
* **Icons:** `react-icons`
* **Audio:** Native HTML5 `<audio>` with React hooks
* **Deployment:** Vercel (recommended)

---

## 🛠️ Getting Started

### Prerequisites

* Node.js **>= 18**
* A package manager: **npm**, **pnpm**, or **yarn**

### 1) Clone the repository

```bash
git clone https://github.com/EseteEyesus/Best-Music-Streaming-Platform.git
cd Best-Music-Streaming-Platform
```

### 2) Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### 3) Run the app in development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will start on **[http://localhost:3000](http://localhost:3000)**.

### 4) Build for production

```bash
npm run build && npm start
```

---

## 📁 Project Structure

```
Best-Music-Streaming-Platform/
├─ public/                # Static assets (images, icons, fonts)
├─ src/
│  ├─ app/                # Next.js App Router routes
│  ├─ components/         # Reusable UI components (Player, Controls, etc.)
│  ├─ hooks/              # Custom React hooks
│  ├─ lib/                # Utilities (helpers, api clients)
│  ├─ styles/             # Tailwind CSS imports and styles
│  └─ types/              # TypeScript types
├─ package.json
├─ tailwind.config.js      # Tailwind configuration
├─ tsconfig.json
├─ next.config.js
└─ README.md
```

---

## 🎧 Audio Player Details

* **Controls:** Play, Pause, Previous, Next, Volume, Mute, Repeat
* **Core logic:** React hooks tied to native `<audio>` element events
* **UI:** Built with reusable components styled using Tailwind CSS

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Go to **Vercel** → **New Project** → import your repo
3. Deploy

---

## 🧩 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — feel free to use and modify. See `LICENSE` if present.

---

## 🙌 Acknowledgements

* Next.js team & docs
* React community
* Tailwind CSS documentation
* `react-icons` for iconography
