import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'

export function useProfileQuery(table: string, column: string, value: string) {
  return useQuery({
    queryKey: [`${table}-profile`, column, value],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(column, value)
        .maybeSingle()
      if (error) {
        if (error.code === 'PGRST116') {
          console.log(`No ${table} found for ${column}=${value} (PGRST116)`);
          return null;
        }
        throw error;
      }
      return data // null if no profile found — handle gracefully in UI
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!value && !!supabase,
  })
}
