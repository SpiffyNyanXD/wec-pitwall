import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'

export function useDriverProfile(fullName: string) {
  return useQuery({
    queryKey: ['driver-profile', fullName],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('driver_profiles')
        .select('*')
        .eq('full_name', fullName)
        .maybeSingle()
      if (error) throw error
      return data // null if no profile found — handle gracefully in UI
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!fullName && !!supabase,
  })
}
