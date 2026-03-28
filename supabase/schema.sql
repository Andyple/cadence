--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA IF NOT EXISTS next_auth;

--
-- Name: accounts; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  type text NOT NULL,
  provider text NOT NULL,
  "providerAccountId" text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  "userId" uuid NOT NULL,
  CONSTRAINT accounts_pkey PRIMARY KEY (id)
);

--
-- Name: sessions; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  expires timestamp with time zone NOT NULL,
  "sessionToken" text NOT NULL,
  "userId" uuid NOT NULL,
  CONSTRAINT sessions_pkey PRIMARY KEY (id)
);

--
-- Name: users; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS next_auth.users (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  name text,
  email text,
  "emailVerified" timestamp with time zone,
  image text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

--
-- Name: verification_tokens; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier text,
  token text,
  expires timestamp with time zone NOT NULL,
  CONSTRAINT verification_tokens_pkey PRIMARY KEY (token)
);

--
-- Name: focus_sessions; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  "userId" uuid NOT NULL,
  duration integer NOT NULL, -- in minutes
  "completedAt" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT focus_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT focus_sessions_userId_fkey FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE
);

--
-- Name: streaks; Type: TABLE;
--
CREATE TABLE IF NOT EXISTS public.streaks (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  "userId" uuid NOT NULL,
  "currentStreak" integer DEFAULT 0 NOT NULL,
  "lastCompletedAt" timestamp with time zone,
  CONSTRAINT streaks_pkey PRIMARY KEY (id),
  CONSTRAINT streaks_userId_fkey FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE,
  CONSTRAINT streaks_userId_key UNIQUE ("userId")
);
