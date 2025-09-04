# Best Music Streaming Platform 🎵

A modern full-stack web application that allows users to **browse, play, and manage music tracks** with a sleek, responsive audio player. Built with **Next.js, React, TypeScript, and Supabase**, this project demonstrates a complete end-to-end music streaming workflow.

---

## Table of Contents
1. [Overview & Objectives](#overview--objectives)
2. [Features](#features)
3. [Architecture & Tech Stack](#architecture--tech-stack)
4.  [Contributors](#contributors)
5. [Running the Project](#running-the-project)
6. [Demo Data & Test Account](#demo-data--test-account)
7. [License](#license)


---

## Overview & Objectives

### Overview
The **Best Music Streaming Platform** provides:

- **Audio Player Controls:** Play, pause, skip next/prev, volume, mute/unmute, repeat.
- **Track Management:** View all uploaded songs; highlight currently playing.
- **Playlist & Queue:** Add songs to the queue for continuous playback.
- **Search & Filter:** Search tracks by title or artist (planned for MVP polish).
- **User Authentication & Library:** Users can sign up, log in, and maintain personal playlists and favorites (stretch features).
- **Visual Feedback:** Responsive UI; potential waveform visualizer and cross-fade effects (stretch features).
- **State Management:** React hooks + custom hooks manage audio and user session state.
- **Backend & Database:** Supabase provides authentication, stores users, songs, playlists, and favorites.

### Problem & Value
- **Problem:** Developers often lack realistic full-stack projects to showcase media playback, stateful UI, and clean component patterns.  
- **Value:** Provides a minimal yet extendable music streaming experience with audio controls, playlists, search, and authentication.

### Target Users
- **Listeners:** Browse and play tracks from a simple catalog.  
- **Evaluators / Mentors:** Assess functionality, code quality, and user experience.

### Success Criteria
- Audio player supports **Play/Pause, Next/Prev, Volume/Mute, Repeat** without crashes.  
- **Lighthouse performance** ≥ 85 mobile; **accessibility score** ≥ 90.  
- **Zero console errors** during user flows.  
- **First Contentful Paint** < 3 seconds on mid-range mobile.

---

## Features

### Implemented (MVP)
- ✅ Audio Player Controls: Play, Pause, Previous, Next, Volume, Mute, Repeat.  
- ✅ Responsive Layout: Mobile-first components styled with Tailwind CSS or standard CSS.  
- ✅ Component & Hook Architecture: Reusable React components and `use*` hooks.  
- ✅ Iconography: `react-icons`.

### In Progress / Planned
- ⏳ Track List Page: Basic catalog with currently playing highlight.  
- ⏳ Seek Bar & Track Duration: Scrub through tracks and show elapsed/remaining time.  
- ⏳ Keyboard Shortcuts: Space (play/pause), ArrowLeft/Right (seek), M (mute/unmute).  
- ⏳ Search & Filter: By title/artist.

### Stretch (Post-Showcase)
- 🎯 Playlists & Favorites: Create playlists and mark favorites.  
- 🎯 Auth & User Library: Sign up/log in with email/password or social login; personal library per user.  
- 🎯 Server API & Database: Supabase backend stores users, songs, playlists, favorites; Next.js API routes for custom logic.  
- 🎯 Waveform/Visualizer & Cross-Fade: Visual waveform and smooth cross-fade transitions.

---

## Architecture & Tech Stack

### Overview
- **Frontend:** React + Next.js (TypeScript)  
- **State Management:** React hooks + custom hooks (`useUserSessions`)  
- **Backend & Database:** Supabase (PostgreSQL)  
- **Styling:** Tailwind CSS or standard CSS  
- **Deployment:** Production-ready via Next.js build  

### Project Structure
LIFE-SIMPLE/
├── Best-Music-Streaming-Platform/
│ ├── next/
│ ├── custom-hooks/
│ │ └── useUserSessions/
│ ├── layouts/frontendLayout.tsx
│ ├── lib/
│ ├── auth/
│ │ ├── loginUser.ts
│ │ ├── logoutUser.ts
│ │ ├── signUpUser.ts
│ │ ├── auth.ts
│ │ └── SupabaseClient.tsx
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── app/login/
│ │ ├── app/signup/
│ │ ├── app/upload-song/
│ │ ├── components/
│ │ │ ├── AllSongs.tsx
│ │ │ ├── DeleteButton.tsx
│ │ │ ├── MusicPlayer.tsx
│ │ │ ├── Navbar.tsx
│ │ │ ├── Queue.tsx
│ │ │ ├── Sidebar.tsx
│ │ │ └── UserSongs.tsx
│ │ └── types/
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── .env.local
│ ├── .eslintrc.json
│ ├── next-env.d.ts
│ ├── next.config.ts
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.mjs
│ ├── README.md
│ ├── sample.html
│ └── tsconfig.json
└── (other files/folders not listed)

markdown
Copy code

### Architecture Breakdown
- **Next.js:** Routing, SSR, SSG, API routes.  
- **Components:** Reusable UI components (typed with TypeScript).  
- **Custom Hooks:** Manage audio player state and user sessions.  
- **Authentication:** Supabase Auth (email/password & social login).  
- **Utilities:** Helper functions in `lib/`.  
- **Styling:** Mobile-first design, global CSS in `globals.css`.  
- **Database:** Supabase PostgreSQL stores users, songs, playlists, favorites.  
- **TypeScript & Types:** Type safety across components and API responses.  
- **Configuration:** Managed via `next.config.ts`, `tsconfig.json`, `.eslintrc.json`, `.env.local`, `postcss.config.mjs`.

### Flow Explanation
1. **Next.js** handles routing and server logic.  
2. **React components** render UI and interact with hooks.  
3. **Custom hooks** manage player state and fetch data.  
4. **Supabase** handles authentication and database queries.  
5. **PostgreSQL** stores persistent data (users, songs, playlists, favorites).

---
 ## Contributors
- [@username1](https://github.com/username1) – 💻 Code
- [@EseteEyesus](https://github.com/EseteEyesus)) – 🎨 Design
- 
## Running the Project

### Prerequisites
- Node.js ≥ 18  
- Package manager: npm / yarn / pnpm  

### Install & Run
```bash
# Clone the repository
git clone [(https://github.com/mahidertsidik/music-streaming-app)]
cd music-streaming-app

# Install dependencies
npm install

# Run in development mode
npm run dev
# Open http://localhost:3000

# Build & start for production
npm run build && npm start
No environment variables required for MVP. .env.example will be added when Auth/DB features are implemented.

Demo Data & Test Account
Demo tracks: Add 3–5 short MP3 files in /public/tracks/.

Demo user (if Auth added):

Email: demo@example.com

Password: Demo#2025 (read-only)

