import { usePreference } from './usePreference';
import { formatInTimeZone, toDate } from 'date-fns-tz';

export type TimezonePreference = 'auto' | 'UTC' | 'Europe/Paris' | 'Asia/Kolkata' | 'Asia/Tokyo' | 'America/Sao_Paulo' | 'America/Chicago' | 'Asia/Riyadh';

export type TimeFormat = '24h' | '12h';

export const useTimeFormat = () => {
  const [timeFormat, setTimeFormat] = usePreference<TimeFormat>('wec-time-format','24h');
  return { timeFormat, setTimeFormat };
};

export const TIMEZONE_OPTIONS: { value: TimezonePreference; label: string }[] = [
  { value: 'auto', label: 'Local Time (Auto)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/Paris', label: 'CET/CEST (Europe)' },
  { value: 'America/Chicago', label: 'CST/CDT (US Central)' },
  { value: 'America/Sao_Paulo', label: 'BRT (Brasília)' },
  { value: 'Asia/Riyadh', label: 'AST (Arabia)' },
  { value: 'Asia/Kolkata', label: 'IST (India)' },
  { value: 'Asia/Tokyo', label: 'JST (Japan)' },
];

export const CIRCUIT_TIMEZONES: Record<string, string> = {
  'Lusail International Circuit': 'Asia/Qatar',
  'Autodromo Enzo e Dino Ferrari': 'Europe/Rome',
  'Circuit de Spa-Francorchamps': 'Europe/Brussels',
  'Circuit de la Sarthe': 'Europe/Paris',
  'Interlagos': 'America/Sao_Paulo',
  'Circuit of the Americas': 'America/Chicago',
  'Fuji Speedway': 'Asia/Tokyo',
  'Bahrain International Circuit': 'Asia/Bahrain',
  'Circuit de Barcelona-Catalunya': 'Europe/Madrid',
  'Autodromo Nazionale Monza': 'Europe/Rome'
};

export const useTimezone = () => {
  const [timezone, setTimezone] = usePreference<TimezonePreference>('wec-timezone','auto');

  const getTargetTimezone = () => {
    if (timezone === 'auto') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return timezone;
  };

  const { timeFormat } = useTimeFormat();

  const convertTime = (dateStr: string, timeStr: string, circuitName: string) => {
    if (!dateStr || !timeStr || !circuitName) return timeStr;
    try {
      const sourceTimezone = CIRCUIT_TIMEZONES[circuitName] || 'UTC';
      const targetTimezone = getTargetTimezone();

      const [hours, minutes] = timeStr.split(':');
      // Create a string that can be parsed as UTC, then we will pretend it's the local time
      // The reliable way to parse a date string as being in a specific timezone in date-fns-tz:
      // We know the date and time in the source timezone.

      const dateTimeString = `${dateStr}T${hours}:${minutes}:00`;

      // Get the UTC time corresponding to the time in the source timezone
      // We parse it assuming it's in the source timezone
      const dateInSourceTZ = toDate(dateTimeString, { timeZone: sourceTimezone });

      // Now format this absolute time into the target timezone
      const formatString = timeFormat === '12h' ? 'hh:mm a' : 'HH:mm';
      const formattedTime = formatInTimeZone(dateInSourceTZ, targetTimezone, formatString);

      return formattedTime;
    } catch (e) {
      // An invalid venue/time does not create a fabricated converted time.
      return timeStr;
    }
  };

  return { timezone, setTimezone, getTargetTimezone, convertTime };
};
