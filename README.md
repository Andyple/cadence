# Cadence: Spotify Pomodoro Focus Timer

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-blue?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Cadence is a premium web-based Pomodoro focus timer that directly integrates with the Spotify Web API. It moves beyond standard timers by syncing your workflow with your music and visually tracking your study habits over time.

## 🚀 Features

- **The Auto-DJ (Playlist Context Switching):** Select a "Focus Playlist" and a "Break Playlist." The app automatically swaps the audio context when your timer transitions, pulling you into focus and actively pulling you out for a real break.
- **Smart Pausing (Flow State Protection):** An optional toggle that checks the currently playing track. If the study timer hits zero but you are in the middle of a song, the app waits for the track to naturally finish before triggering the break state so your momentum isn't interrupted.
- **GitHub-Style Contribution Calendar:** Every completed focus block is logged to a database and visually represented on a heatmap calendar, allowing you to see your productivity trends over the year.
- **Daily Streaks:** Tracks consecutive days of successful study sessions to gamify your workflow and build consistent habits.
- **Modern UI:** A clean, distraction-free interface built with Next.js and Tailwind CSS, featuring a centralized timer and a hidden sidebar for configuration.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Auth.js](https://authjs.dev/) (NextAuth v5)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API:** [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## 🏁 Getting Started

### Prerequisites

- Node.js installed.
- An active **Spotify Premium** account.
- A registered application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
- A [Supabase](https://supabase.com/) project for the database.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cadence.git
   cd cadence
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Auth.js / NextAuth
   AUTH_SECRET=your_nextauth_secret
   AUTH_SPOTIFY_ID=your_spotify_client_id
   AUTH_SPOTIFY_SECRET=your_spotify_client_secret

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

   # In development, use 127.0.0.1 instead of localhost for Spotify Redirect URIs
   NEXTAUTH_URL=http://127.0.0.1:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.

### ⚠️ Spotify Redirect URI Note
In your Spotify Developer Dashboard, ensure you add the following redirect URI:
`http://127.0.0.1:3000/api/auth/callback/spotify`

> **Note:** Due to Spotify's strict validation, `127.0.0.1` is preferred over `localhost` during development.

## 🗄 Database Schema
The database schema for Supabase can be found in `supabase/schema.sql`. Make sure to run this in your Supabase SQL Editor to set up the necessary tables for logging focus sessions and streaks.

## 📄 License
This project is licensed under the MIT License.
