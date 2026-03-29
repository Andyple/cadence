import { auth, signIn, signOut } from "@/auth";
import { SidebarToggle } from "./sidebar-toggle";
import { ThemeToggle } from "./theme-toggle";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Cadence</div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "http://127.0.0.1:3000/" });
            }}
          >
            <button className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
              Sign Out
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("spotify", { redirectTo: "http://127.0.0.1:3000/" });
            }}
          >
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full text-sm transition-colors shadow-sm">
              Login with Spotify
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
