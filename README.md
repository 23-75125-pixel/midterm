# 📦 Containerization Quiz App

Multiplayer exam reviewer for Docker, Kubernetes, and Cloud-Native concepts.
Players join via a shared link, enter their name, take the quiz, and get ranked on a live leaderboard.

## 🚀 Deploy to Render (Free)

### Step 1 — Push to GitHub
1. Create a new repository on GitHub (e.g. `container-quiz`)
2. Upload all files from this folder to the repo

### Step 2 — Deploy on Render
1. Go to [https://render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Fill in the settings:
   - **Name**: `container-quiz` (or any name)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"**
6. Wait ~2 minutes for deployment

### Step 3 — Share the Link
- Render gives you a URL like: `https://container-quiz.onrender.com`
- Share this link with your classmates
- Everyone enters their name and takes the quiz
- Scores appear on the live leaderboard in real time

## 🏠 Run Locally

```bash
npm install
npm start
# Open http://localhost:3000
```

## 📁 File Structure

```
(repo root)
├── server.js        # Express + Socket.io backend
├── package.json     # Dependencies and scripts
├── public/
│   └── index.html   # Frontend quiz app
└── README.md
```

## ⚠️ Notes
- Scores are stored in memory — they reset if the server restarts
- Render free tier may sleep after 15 min of inactivity (first load takes ~30s to wake up)
- Upgrade to Render paid tier for always-on service
