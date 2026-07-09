import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'

export function useTeamProfile(teamName: string) {
  return useQuery({
    queryKey: ['team-profile', teamName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_profiles')
        .select('*')
        .eq('team_name', teamName)
        .maybeSingle()
      if (error) throw error
      return data // null if no profile found — handle gracefully in UI
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!teamName,
  })
}
