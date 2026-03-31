const SPOTIFY_API_URL = "https://api.spotify.com/v1";

/**
 * Helper to execute fetch requests to the Spotify API.
 * Requires a valid user access token.
 */
async function fetchWebApi(endpoint: string, method: string, token: string, body?: any) {
  const res = await fetch(`${SPOTIFY_API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) {
    return null; // 204 No Content (e.g., successful pause/play)
  }

  if (!res.ok) {
    if (res.status === 401) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[Spotify API 401 Debug]:", {
        tokenSnippet: token ? `${token.substring(0, 10)}...` : "null",
        error: errorData,
        endpoint
      });
    }
    throw new Error(`Spotify API error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Get a list of the playlists owned or followed by the current Spotify user.
 */
export async function getUserPlaylists(token: string) {
  const data = await fetchWebApi("me/playlists?limit=50", "GET", token);
  return data.items;
}

/**
 * Get information about the user's current playback state, including track details.
 */
export async function getCurrentlyPlaying(token: string) {
  const data = await fetchWebApi("me/player/currently-playing", "GET", token);
  return data;
}

/**
 * Pause playback on the user's active device.
 */
export async function pausePlayback(token: string) {
  await fetchWebApi("me/player/pause", "PUT", token);
}

/**
 * Start a new context or resume current playback on the user's active device.
 * Provide a `contextUri` (like a playlist URI) to play specific content.
 */
export async function startPlayback(token: string, contextUri?: string) {
  const body = contextUri ? { context_uri: contextUri } : undefined;
  await fetchWebApi("me/player/play", "PUT", token, body);
}
