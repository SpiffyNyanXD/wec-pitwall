import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'

export function useProfileQuery(table: string, filterColumn: string, queryKeyPrefix: string, filterValue: string) {
  return useQuery({
    queryKey: [queryKeyPrefix, filterValue],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(filterColumn, filterValue)
        .maybeSingle()
      if (error && error.code !== 'PGRST116') throw error;
      if (error && error.code === 'PGRST116') return null;
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!filterValue && !!supabase,
  })
}
