-- Portfolio schema for Neon (PostgreSQL)

CREATE TABLE IF NOT EXISTS stories (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  period      TEXT,
  description TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  position    INT  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  kind        TEXT NOT NULL DEFAULT 'laptop',
  url         TEXT,
  position    INT  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id        SERIAL PRIMARY KEY,
  quote     TEXT NOT NULL,
  author    TEXT NOT NULL,
  role      TEXT,
  position  INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_assets (
  key          TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data         TEXT NOT NULL,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Live visitor presence (heartbeat) and counters
CREATE TABLE IF NOT EXISTS presence (
  visitor_id TEXT PRIMARY KEY,
  last_seen  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  key   TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);

INSERT INTO stats (key, value) VALUES ('views', 0) ON CONFLICT (key) DO NOTHING
