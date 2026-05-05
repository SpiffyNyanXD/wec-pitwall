-- ============================================================
-- VIEW: Hypercar Drivers Championship
-- Aggregates points_drivers across all races per car
-- ============================================================
CREATE OR REPLACE VIEW public.v_hypercar_drivers_standings AS
SELECT
  c.car_number,
  c.team_name,
  m.name AS manufacturer,
  COALESCE(SUM(rr.points_drivers), 0) AS total_points,
  COUNT(rr.id) AS races_entered,
  RANK() OVER (ORDER BY COALESCE(SUM(rr.points_drivers), 0) DESC) AS position
FROM public.cars c
JOIN public.manufacturers m ON m.id = c.manufacturer_id
LEFT JOIN public.race_results rr ON rr.car_id = c.id
WHERE c.category = 'Hypercar'
GROUP BY c.id, c.car_number, c.team_name, m.name
ORDER BY total_points DESC;

-- ============================================================
-- VIEW: Hypercar Manufacturers Championship
-- Top 2 cars per manufacturer per race only
-- ============================================================
CREATE OR REPLACE VIEW public.v_hypercar_manufacturers_standings AS
WITH ranked_per_race AS (
  SELECT
    rr.race_id,
    m.name AS manufacturer,
    rr.points_manufacturers,
    ROW_NUMBER() OVER (
      PARTITION BY rr.race_id, m.id
      ORDER BY rr.finish_position ASC NULLS LAST
    ) AS car_rank_in_race
  FROM public.race_results rr
  JOIN public.cars c ON c.id = rr.car_id
  JOIN public.manufacturers m ON m.id = c.manufacturer_id
  WHERE c.category = 'Hypercar'
)
SELECT
  manufacturer,
  SUM(CASE WHEN car_rank_in_race <= 2 THEN points_manufacturers ELSE 0 END) AS total_points,
  RANK() OVER (
    ORDER BY SUM(CASE WHEN car_rank_in_race <= 2 THEN points_manufacturers ELSE 0 END) DESC
  ) AS position
FROM ranked_per_race
GROUP BY manufacturer
ORDER BY total_points DESC;

-- ============================================================
-- VIEW: LMGT3 Teams Championship (primary trophy)
-- ============================================================
CREATE OR REPLACE VIEW public.v_lmgt3_teams_standings AS
SELECT
  c.car_number,
  c.team_name,
  COALESCE(SUM(rr.points_teams), 0) AS total_points,
  COUNT(rr.id) AS races_entered,
  RANK() OVER (ORDER BY COALESCE(SUM(rr.points_teams), 0) DESC) AS position
FROM public.cars c
LEFT JOIN public.race_results rr ON rr.car_id = c.id
WHERE c.category = 'LMGT3'
GROUP BY c.id, c.car_number, c.team_name
ORDER BY total_points DESC;

-- ============================================================
-- VIEW: LMGT3 Drivers Championship (secondary)
-- ============================================================
CREATE OR REPLACE VIEW public.v_lmgt3_drivers_standings AS
SELECT
  c.car_number,
  c.team_name,
  COALESCE(SUM(rr.points_drivers), 0) AS total_points,
  RANK() OVER (ORDER BY COALESCE(SUM(rr.points_drivers), 0) DESC) AS position
FROM public.cars c
LEFT JOIN public.race_results rr ON rr.car_id = c.id
WHERE c.category = 'LMGT3'
GROUP BY c.id, c.car_number, c.team_name
ORDER BY total_points DESC;

-- Grant read on all views
GRANT SELECT ON public.v_hypercar_drivers_standings TO anon, authenticated;
GRANT SELECT ON public.v_hypercar_manufacturers_standings TO anon, authenticated;
GRANT SELECT ON public.v_lmgt3_teams_standings TO anon, authenticated;
GRANT SELECT ON public.v_lmgt3_drivers_standings TO anon, authenticated;
