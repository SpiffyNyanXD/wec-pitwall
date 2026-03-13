import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { getNextRace, races2026, Race, Session } from '@/data/wecData';

export default function Notifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    'default'
  );

  // Safe check for Notification API
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(window.Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support desktop notifications');
      return;
    }
    const perm = await window.Notification.requestPermission();
    setPermission(perm);
    if (perm === 'granted') {
      toast.success('Notifications enabled!');
    }
  };

  const [savedReminders, setSavedReminders] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wec-notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [timingOffset, setTimingOffset] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wec-notif-timing');
      return saved ? parseInt(saved, 10) : 60; // default 60 mins
    } catch {
      return 60;
    }
  });

  useEffect(() => {
    localStorage.setItem('wec-notifications', JSON.stringify(savedReminders));
    // Dispatch a custom event to notify other components (like Header)
    window.dispatchEvent(new Event('wec-notifications-updated'));
  }, [savedReminders]);

  useEffect(() => {
    localStorage.setItem('wec-notif-timing', timingOffset.toString());
  }, [timingOffset]);

  useEffect(() => {
    // Also dispatch event when timing offset changes, so Header updates timeouts
    window.dispatchEvent(new Event('wec-notifications-updated'));
  }, [timingOffset]);

  const toggleReminder = (race: Race, session: Session, checked: boolean) => {
    const reminderId = `${race.id}-${session.type}`;
    if (checked) {
      setSavedReminders((prev) => [...prev, reminderId]);
      toast.success(`Reminder set for ${session.type}`);
    } else {
      setSavedReminders((prev) => prev.filter((id) => id !== reminderId));
    }
  };

  const getSessionColor = (type: string) => {
    if (type.includes('FP')) return 'text-primary';
    if (type === 'Qualifying' || type === 'Hyperpole') return 'text-secondary';
    if (type === 'Race') return 'text-[#C4A747]'; // wec-gold
    return 'text-foreground';
  };

  const nextRace = getNextRace();
  const allUpcomingRaces = races2026.filter((r) => r.status === 'upcoming');

  const renderRaceSessions = (race: Race) => (
    <motion.div
      key={race.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <span className="text-2xl">{race.flag}</span>
        <h2 className="font-racing text-xl text-foreground">{race.name}</h2>
      </div>

      <div className="space-y-4">
        {race.sessions?.map((session) => {
          const reminderId = `${race.id}-${session.type}`;
          const isChecked = savedReminders.includes(reminderId);

          // Format date like "Fri, Apr 17"
          // Add T00:00:00 to prevent parsing as UTC and shifting timezones
          const dateObj = new Date(`${session.date}T00:00:00`);
          const dateStr = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div key={session.type} className="flex items-center justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className={`font-racing font-bold w-24 ${getSessionColor(session.type)}`}>
                  [{session.type}]
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {dateStr} — {session.startTime}
                </span>
              </div>
              <Switch
                checked={isChecked}
                onCheckedChange={(c) => toggleReminder(race, session, c)}
                className="scale-125 my-1"
                aria-label={`Toggle reminder for ${session.type}`}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="w-8 h-8 text-primary" />
        <h1 className="font-racing text-3xl text-gradient">Notifications & Reminders</h1>
      </div>

      {/* Permission Banner */}
      <div className="mb-8">
        {permission === 'default' && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-medium">
                Enable browser notifications to get session reminders
              </p>
            </div>
            <Button onClick={requestPermission} className="racing-gradient shrink-0">
              Enable
            </Button>
          </div>
        )}

        {permission === 'granted' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-green-500">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Notifications enabled</p>
          </div>
        )}

        {permission === 'denied' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 text-destructive">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              Notifications blocked — enable them in your browser settings
            </p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 mb-8 text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          Reminders only fire while this browser tab is open. Make sure to keep this site running in a tab to receive them.
        </p>
      </div>

      {/* Timing Selector */}
      <div className="mb-10">
        <h3 className="font-racing text-xl mb-4 text-foreground">Reminder Timing</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '1 hour before', value: 60 },
            { label: '30 mins before', value: 30 },
            { label: '15 mins before', value: 15 },
          ].map((option) => (
            <Button
              key={option.value}
              variant={timingOffset === option.value ? 'default' : 'outline'}
              className={timingOffset === option.value ? 'racing-gradient' : 'border-border/50 hover:bg-muted/50'}
              onClick={() => {
                setTimingOffset(option.value);
                toast.success(`Timing updated to ${option.label}`);
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Next Race */}
      {nextRace && (
        <div className="mb-12">
          <h3 className="font-racing text-2xl text-gradient mb-6">Next Race</h3>
          {renderRaceSessions(nextRace)}
        </div>
      )}

      {/* All Upcoming Sessions */}
      <div>
        <h3 className="font-racing text-2xl text-gradient mb-6">All Upcoming Sessions</h3>
        {allUpcomingRaces
          .filter((race) => race.id !== nextRace?.id)
          .map((race) => renderRaceSessions(race))}

        {allUpcomingRaces.length === 0 && (
          <p className="text-muted-foreground text-center py-12 glass-card rounded-xl">
            No upcoming races found.
          </p>
        )}
      </div>
    </div>
  );
}
