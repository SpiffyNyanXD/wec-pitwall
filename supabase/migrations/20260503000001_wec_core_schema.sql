-- ============================================================
-- WEC PITWALL — CORE SCHEMA
-- ============================================================

-- SEASONS
CREATE TABLE public.seasons (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year         INTEGER NOT NULL UNIQUE,
  name         TEXT NOT NULL, -- e.g. "2026 FIA WEC Season"
  is_active    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RACES (calendar rounds)
CREATE TABLE public.races (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id        UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  round_number     INTEGER NOT NULL,
  name             TEXT NOT NULL,        -- "6 Hours of Imola"
  circuit          TEXT NOT NULL,        -- "Autodromo Enzo e Dino Ferrari"
  country_code     TEXT NOT NULL,        -- ISO 3166-1 alpha-2, e.g. "IT"
  scheduled_date   DATE NOT NULL,
  duration_hours   INTEGER NOT NULL,     -- 6, 24 etc.
  status           TEXT NOT NULL DEFAULT 'scheduled'
                   CHECK (status IN ('scheduled','completed','cancelled')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (season_id, round_number)
);

-- MANUFACTURERS
CREATE TABLE public.manufacturers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL UNIQUE,    -- "Toyota", "Ferrari", "BMW" etc.
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CARS (entries per season)
CREATE TABLE public.cars (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id        UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  car_number       TEXT NOT NULL,       -- "8", "51", "007" etc.
  team_name        TEXT NOT NULL,       -- "Toyota Gazoo Racing"
  manufacturer_id  UUID NOT NULL REFERENCES public.manufacturers(id),
  category         TEXT NOT NULL CHECK (category IN ('Hypercar','LMGT3')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (season_id, car_number)
);

-- DRIVERS (linked to car entries)
CREATE TABLE public.drivers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id       UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RACE RESULTS (one row per car per race)
CREATE TABLE public.race_results (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  race_id           UUID NOT NULL REFERENCES public.races(id) ON DELETE CASCADE,
  car_id            UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  finish_position   INTEGER,            -- NULL = DNF/DSQ before classification
  classified        BOOLEAN NOT NULL DEFAULT TRUE, -- FALSE = DNF not classified
  status            TEXT NOT NULL DEFAULT 'finished'
                    CHECK (status IN ('finished','dnf','dsq','dns')),
  laps_completed    INTEGER,
  points_drivers    NUMERIC(6,2) NOT NULL DEFAULT 0,
  points_teams      NUMERIC(6,2) NOT NULL DEFAULT 0,
  points_manufacturers NUMERIC(6,2) NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (race_id, car_id)
);

-- POINTS SCALES (per race duration)
CREATE TABLE public.points_scales (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  duration_hours   INTEGER NOT NULL,   -- 6, 24 etc.
  finish_position  INTEGER NOT NULL,
  points           NUMERIC(6,2) NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (duration_hours, finish_position)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX ON public.race_results (race_id);
CREATE INDEX ON public.race_results (car_id);
CREATE INDEX ON public.cars (season_id, category);
CREATE INDEX ON public.races (season_id, round_number);

-- ============================================================
-- ROW LEVEL SECURITY — all tables read-public, write-restricted
-- ============================================================
ALTER TABLE public.seasons              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_results         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_scales        ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "public_read_seasons"       ON public.seasons       FOR SELECT USING (true);
CREATE POLICY "public_read_races"         ON public.races         FOR SELECT USING (true);
CREATE POLICY "public_read_manufacturers" ON public.manufacturers FOR SELECT USING (true);
CREATE POLICY "public_read_cars"          ON public.cars          FOR SELECT USING (true);
CREATE POLICY "public_read_drivers"       ON public.drivers       FOR SELECT USING (true);
CREATE POLICY "public_read_race_results"  ON public.race_results  FOR SELECT USING (true);
CREATE POLICY "public_read_points_scales" ON public.points_scales FOR SELECT USING (true);

-- No public write — only service role can insert/update/delete
