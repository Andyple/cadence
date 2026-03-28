import { auth } from "@/auth";
import { PlaylistSelector } from "@/components/playlist-selector";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {!session ? (
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tight">Sync your focus.</h1>
          <p className="text-zinc-400">
            A premium Pomodoro timer that moves with your Spotify workflow.
            Login to start your session.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl py-12">
          {/* Mock Pomodoro Timer */}
          <div className="aspect-square w-full max-w-sm rounded-full border-4 border-zinc-800 flex flex-col items-center justify-center space-y-2 mb-12">
            <span className="text-7xl font-mono font-bold">25:00</span>
            <span className="text-zinc-500 font-medium uppercase tracking-widest text-sm">
              Focus
            </span>
          </div>
          
          <div className="flex items-center gap-6 mb-16">
            <button className="px-8 py-3 bg-zinc-50 text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors">
              Start Timer
            </button>
            <button className="px-8 py-3 bg-zinc-900 text-zinc-50 font-bold rounded-full hover:bg-zinc-800 border border-zinc-800 transition-colors">
              Reset
            </button>
          </div>

          <hr className="w-full border-zinc-800 mb-8" />
          
          {/* Test Component for Spotify API integration */}
          <PlaylistSelector />
        </div>
      )}
    </div>
  );
}
