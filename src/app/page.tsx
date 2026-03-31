import { auth } from "@/auth";
import { Timer } from "@/components/timer";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 transition-colors duration-300">
      {!session ? (
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Sync your focus.</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            A premium Pomodoro timer that moves with your Spotify workflow.
            Login to start your session.
          </p>
        </div>
      ) : (
        <Timer />
      )}
    </div>
  );
}
