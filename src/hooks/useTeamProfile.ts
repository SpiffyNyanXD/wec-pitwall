import { useProfileQuery } from './useProfileQuery'

export function useTeamProfile(teamName: string) {
  return useProfileQuery('team_profiles', 'team_name', teamName)
}
