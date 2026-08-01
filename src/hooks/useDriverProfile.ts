import { useProfileQuery } from './useProfileQuery'

export function useDriverProfile(fullName: string) {
  return useProfileQuery('driver_profiles', 'full_name', fullName)
}
