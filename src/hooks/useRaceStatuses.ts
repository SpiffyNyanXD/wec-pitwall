import { useEffect, useState } from 'react'
import { computeAllRaceStatuses, RaceBadgeStatus, RaceInput } from '../utils/raceStatus'

export function useRaceStatuses(races: RaceInput[]): Map<string, RaceBadgeStatus> {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000) // update every 60s
    return () => clearInterval(interval)
  }, [])

  return computeAllRaceStatuses(races, now)
}
