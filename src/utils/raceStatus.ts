export type RaceBadgeStatus = 'done' | 'live' | 'next' | 'upcoming' | 'postponed'

export interface RaceInput {
  id: string
  scheduled_date: string
  start_time_utc?: string
  duration_hours: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

function getRaceWindow(race: RaceInput): { start: Date; end: Date } {
  const time = race.start_time_utc ?? '11:00:00'
  const start = new Date(`${race.scheduled_date}T${time}Z`)
  const end = new Date(start.getTime() + race.duration_hours * 60 * 60 * 1000)
  return { start, end }
}

export function computeAllRaceStatuses(
  races: RaceInput[],
  now: Date = new Date()
): Map<string, RaceBadgeStatus> {
  const result = new Map<string, RaceBadgeStatus>()

  const withStatus = races.map(race => {
    if (race.status === 'completed') return { id: race.id, computed: 'done' as const }
    if (race.status === 'cancelled') return { id: race.id, computed: 'postponed' as const }

    const { start, end } = getRaceWindow(race)
    if (now >= start && now <= end) return { id: race.id, computed: 'live' as const }
    if (now > end) return { id: race.id, computed: 'done' as const }

    const startMs = start.getTime()
    return { id: race.id, computed: 'upcoming' as const, sortKey: startMs }
  })

  // Exactly one race gets 'next' — earliest upcoming
  const upcomingRaces = withStatus
    .filter(r => r.computed === 'upcoming')
    .sort((a, b) => (a.sortKey ?? 0) - (b.sortKey ?? 0))

  const nextId = upcomingRaces[0]?.id ?? null

  withStatus.forEach(r => {
    if (r.computed === 'upcoming' && r.id === nextId) {
      result.set(r.id, 'next')
    } else {
      result.set(r.id, r.computed)
    }
  })

  return result
}
