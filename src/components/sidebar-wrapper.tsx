import { auth } from "@/auth";
import { getUserPlaylists } from "@/lib/spotify";
import { Sidebar } from "./sidebar";

export async function SidebarWrapper() {
  const session = await auth();
  let playlists = [];

  if (session?.accessToken) {
    try {
      playlists = await getUserPlaylists(session.accessToken);
    } catch (error) {
      console.error("Failed to fetch playlists for sidebar:", error);
    }
  }

  return <Sidebar playlists={playlists} />;
}
