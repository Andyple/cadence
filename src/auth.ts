import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

// Development workaround: Next.js dev server forces req.url to localhost,
// which breaks Spotify's strict 127.0.0.1 redirect_uri validation during token exchange.
if (process.env.NODE_ENV === "development") {
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    if (url === "https://accounts.spotify.com/api/token" && options?.body) {
      if (typeof options.body === "string" && options.body.includes("localhost")) {
        options.body = options.body.replace(/localhost/g, "127.0.0.1");
      } else if (options.body instanceof URLSearchParams) {
        const redirectUri = options.body.get("redirect_uri");
        if (redirectUri && redirectUri.includes("localhost")) {
          options.body.set("redirect_uri", redirectUri.replace(/localhost/g, "127.0.0.1"));
        }
      }
    }
    return originalFetch(url, options);
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(
        "user-read-email user-read-private user-modify-playback-state user-read-currently-playing user-read-playback-state streaming playlist-read-private playlist-read-collaborative"
      )}`,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
