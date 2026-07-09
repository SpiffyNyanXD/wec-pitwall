import { useQuery } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'
import { useProfileQuery } from './useProfileQuery'

export function useDriverProfile(fullName: string) {
  return useProfileQuery('driver_profiles', 'full_name', 'driver-profile', fullName);
}
