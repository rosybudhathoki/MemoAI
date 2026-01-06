**MemoAI** is a full-stack AI-powered note-taking web app. Create notebooks, auto generate notebook topic images, jot down ideas, and let AI autocomplete your content for faster, smarter writing.

---

## 🌟 Features

- Rich-text editor powered by **TipTap**
- AI autocomplete via **OpenAI API**
- Real-time autosave to **Drizle Database**
- Secure authentication with **Clerk**
- Responsive design for mobile & desktop
- Organize notebooks with optional images

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, TipTap  
- **Backend:** Next.js API Routes, Drizzle  
- **Authentication:** Clerk  
- **AI Integration:** OpenAI API (via `useCompletion`)  
- **State & Data Fetching:** TanStack Query, Debounced Editor State  

---

## ⚡ Demo

> Live demo: https://memosai.netlify.app/

## 💻 Installation

1. Clone the repo:
 
- git clone https://github.com/rosybudhathoki/MemoAI.git
- cd memoai

3. Install dependencies:

- npm install

3. Create .env.local with:

- DATABASE_URL=your_postgresql_url
- NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
- CLERK_API_KEY=your_clerk_api_key
- OPENAI_API_KEY=your_openai_key

4. Run development server:

- npm run dev

5. Open http://localhost:3000
