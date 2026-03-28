import { auth } from "@/auth";
import { getUserPlaylists } from "@/lib/spotify";
import Image from "next/image";

export async function PlaylistSelector() {
  const session = await auth();

  if (!session?.accessToken) {
    return (
      <div className="text-zinc-500 text-sm mt-4 p-4 border border-zinc-800 rounded-lg">
        Please sign in with Spotify to access your playlists.
      </div>
    );
  }

  try {
    const playlists = await getUserPlaylists(session.accessToken);

    return (
      <div className="w-full mt-12">
        <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* We slice to 8 just for testing UI purposes */}
          {playlists.slice(0, 8).map((playlist: any) => (
            <div
              key={playlist.id}
              className="bg-zinc-900 rounded-lg p-3 hover:bg-zinc-800 transition-colors cursor-pointer group flex flex-col items-center border border-transparent hover:border-zinc-700"
            >
              <div className="aspect-square w-full relative mb-3 overflow-hidden rounded-md bg-zinc-800">
                {playlist.images?.[0]?.url ? (
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm truncate w-full text-center">
                {playlist.name}
              </h3>
              <p className="text-xs text-zinc-500 truncate w-full text-center mt-1">
                {playlist.tracks.total} Tracks
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return (
      <div className="text-red-400 text-sm mt-4 p-4 border border-red-900/50 bg-red-950/20 rounded-lg">
        Failed to load playlists. Make sure your Spotify Premium account is active
        and you granted the correct permissions.
      </div>
    );
  }
}
