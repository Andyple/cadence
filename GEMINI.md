# 🍅 Spotify Pomodoro Focus Timer

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-blue?style=for-the-badge)

A premium web-based Pomodoro focus timer that directly integrates with the Spotify Web API. This app moves beyond standard timers by syncing your workflow with your music and visually tracking your study habits over time.

## Features

* **The Auto-DJ (Playlist Context Switching):** Select a "Focus Playlist" and a "Break Playlist." The app automatically swaps the audio context when your timer transitions, pulling you into focus and actively pulling you out for a real break.
* **Smart Pausing (Flow State Protection):** An optional toggle that checks the currently playing track. If the study timer hits zero but you are in the middle of a song, the app waits for the track to naturally finish before triggering the break state so your momentum isn't interrupted.
* **GitHub-Style Contribution Calendar:** Every completed focus block is logged to a database and visually represented on a heatmap calendar, allowing you to see your productivity trends over the year.
* **Daily Streaks:** Tracks consecutive days of successful study sessions to gamify your workflow and build consistent habits.

## System Architecture

* **Authentication:** Single-Sign-On via "Login with Spotify" using Auth.js.
* **The State Machine:** Synchronizes JavaScript interval timers with the Spotify Player API (`/play` and `/pause` endpoints).
* **Data Persistence:** User profiles, session timestamps, and streak data are securely stored in a relational database.

## Tech Stack

* **Frontend:** Next.js (React)
* **Styling:** Tailwind CSS
* **Authentication:** Auth.js (NextAuth)
* **Database:** Supabase (PostgreSQL)
* **API:** Spotify Web API (Connect / Player endpoints)

## Prerequisites

To run this application locally, you must have:
* Node.js installed.
* An active **Spotify Premium** account.
* A registered application on the Spotify Developer Dashboard.
* A free Supabase project for the database.
