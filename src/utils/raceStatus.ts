export type RaceBadgeStatus = 'done' | 'live' | 'next' | 'upcoming' | 'postponed'

interface RaceForStatus {
  id: string
  scheduled_date: string       // "YYYY-MM-DD"
  start_time_utc?: string      // "HH:MM:SS" — may not exist yet, default to "11:00:00"
  duration_hours: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

function getRaceWindowStatus(race: RaceForStatus, now: Date): 'done' | 'live' | 'upcoming' {
  if (race.status === 'completed') return 'done'

  const timeStr = race.start_time_utc ?? '11:00:00'
  const start = new Date(`${race.scheduled_date}T${timeStr}Z`)
  const end = new Date(start.getTime() + race.duration_hours * 60 * 60 * 1000)

  if (now >= start && now <= end) return 'live'
  if (now > end) return 'done'   // window passed, DB not updated yet
  return 'upcoming'
}

export function computeAllRaceStatuses(
  races: RaceForStatus[]
): Map<string, RaceBadgeStatus> {
  const now = new Date()
  const result = new Map<string, RaceBadgeStatus>()

  // First pass
  const computed = races.map(r => ({
    id: r.id,
    status: r.status === 'cancelled'
      ? 'postponed' as const
      : getRaceWindowStatus(r, now),
    date: r.scheduled_date,
    startTime: r.start_time_utc ?? '11:00:00',
  }))

  // Find single "next" race — earliest upcoming
  const nextRace = computed
    .filter(r => r.status === 'upcoming')
    .sort((a, b) =>
      new Date(`${a.date}T${a.startTime}Z`).getTime() -
      new Date(`${b.date}T${b.startTime}Z`).getTime()
    )[0]

  computed.forEach(r => {
    if (r.status === 'upcoming' && r.id === nextRace?.id) {
      result.set(r.id, 'next')
    } else {
      result.set(r.id, r.status)
    }
  })

  return result
}
