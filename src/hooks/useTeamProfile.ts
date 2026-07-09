import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'
import { useProfileQuery } from './useProfileQuery'

export function useTeamProfile(teamName: string) {
  return useProfileQuery('team_profiles', 'team_name', 'team-profile', teamName);
}
