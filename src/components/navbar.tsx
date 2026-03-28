import { auth, signIn, signOut } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <div className="text-xl font-bold tracking-tight">Cadence</div>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Sign Out
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("spotify");
            }}
          >
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full text-sm transition-colors">
              Login with Spotify
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
