import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'

export function useProfileQuery(table: string, column: string, value: string) {
  return useQuery({
    queryKey: [`${table}-profile`, value],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(column, value)
        .maybeSingle()
      if (error) throw error
      return data // null if no profile found — handle gracefully in UI
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!value && !!supabase,
  })
}
