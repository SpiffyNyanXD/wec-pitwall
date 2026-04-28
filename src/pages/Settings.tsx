import SEOHead from "@/components/SEOHead";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Heart, User, ChevronRight, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTimezone, TIMEZONE_OPTIONS, useTimeFormat } from '@/hooks/useTimezone';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { timezone, setTimezone } = useTimezone();
  const [editUsername, setEditUsername] = useState('');
  const [editDisplayName, setEditDisplayName] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid' | 'unchanged'>('idle');
  const [savingProfile, setSavingProfile] = useState(false);
  const usernameCheckTimer = useRef<NodeJS.Timeout | null>(null);
  const { timeFormat, setTimeFormat } = useTimeFormat();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    raceStartAlerts: true,
    favoriteTeamAlerts: true,
    pushNotifications: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotificationSettings();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditUsername(profile.username ?? '');
      setEditDisplayName(profile.display_name ?? '');
    }
  }, [profile]);

  const handleUsernameEdit = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setEditUsername(cleaned);

    if (cleaned === profile?.username) {
      setUsernameStatus('unchanged');
      return;
    }
    if (cleaned.length < 3) {
      setUsernameStatus('idle');
      return;
    }
    if (!/^[a-z0-9_]+$/.test(cleaned)) {
      setUsernameStatus('invalid');
      return;
    }

    setUsernameStatus('checking');
    if (usernameCheckTimer.current) clearTimeout(usernameCheckTimer.current);
    usernameCheckTimer.current = setTimeout(async () => {
      const { data } = await supabase.rpc('is_username_available', { uname: cleaned });
      setUsernameStatus(data ? 'available' : 'taken');
    }, 500);
  };

  const saveProfile = async () => {
    if (!user || !supabase) return;
    if (usernameStatus === 'taken' || usernameStatus === 'invalid' || usernameStatus === 'checking') {
      toast.error('Fix username issues before saving');
      return;
    }
    if (editUsername.length > 0 && editUsername.length < 3) {
      toast.error('Username must be at least 3 characters');
      return;
    }

    setSavingProfile(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        username: editUsername || null,
        display_name: editDisplayName || null,
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to save profile');
    } else {
      toast.success('Profile updated');
      await refreshProfile();
      setUsernameStatus('idle');
    }
    setSavingProfile(false);
  };

  const loadNotificationSettings = async () => {
    if (!user || !supabase) {
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('notification_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setNotifications({
        raceStartAlerts: data.race_start_alerts,
        favoriteTeamAlerts: data.favorite_team_alerts,
        pushNotifications: data.push_notifications,
      });
    }
    setLoading(false);
  };

  const updateNotificationSetting = async (key: string, value: boolean) => {
    if (!user) {
      toast.error('Please sign in to update settings');
      return;
    }
    if (!supabase) {
      toast.error('Supabase is not configured');
      return;
    }

    const dbKey = key === 'raceStartAlerts' ? 'race_start_alerts' 
      : key === 'favoriteTeamAlerts' ? 'favorite_team_alerts' 
      : 'push_notifications';

    const { error } = await supabase
      .from('notification_subscriptions')
      .update({ [dbKey]: value })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to update setting');
    } else {
      setNotifications(prev => ({ ...prev, [key]: value }));
      toast.success('Setting updated');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center glass-card p-8"
          >
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-racing text-xl mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access your settings and preferences.
            </p>
            <Button asChild className="racing-gradient">
              <Link to="/auth">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Settings" url="/settings" noIndex={true} />
      <Header />
      
      <main className="container py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="font-racing text-3xl font-bold mb-6">Settings</h1>

          {/* Account */}
          {user && (
            <div className="glass-card p-6 mb-6">
              <h3 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Account
              </h3>

              <div className="space-y-4">
                {/* Email — read only */}
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Email</Label>
                  <p className="text-foreground mt-1 text-sm">{user.email}</p>
                </div>

                {/* Username */}
                <div>
                  <Label htmlFor="settings-username" className="text-muted-foreground text-xs uppercase tracking-wide">
                    Username
                  </Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                    <Input
                      id="settings-username"
                      value={editUsername}
                      onChange={(e) => handleUsernameEdit(e.target.value)}
                      className="pl-7 bg-muted/30 border-border"
                      placeholder="yourname"
                      maxLength={20}
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </div>
                  {editUsername.length >= 3 && usernameStatus !== 'unchanged' && (
                    <p className={`text-xs mt-1 ${
                      usernameStatus === 'available' ? 'text-green-500' :
                      usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      {usernameStatus === 'available' && `✓ @${editUsername} is available`}
                      {usernameStatus === 'taken' && `✗ @${editUsername} is already taken`}
                      {usernameStatus === 'invalid' && '✗ Invalid characters'}
                      {usernameStatus === 'checking' && 'Checking...'}
                    </p>
                  )}
                </div>

                {/* Display Name */}
                <div>
                  <Label htmlFor="settings-displayname" className="text-muted-foreground text-xs uppercase tracking-wide">
                    Display Name
                  </Label>
                  <Input
                    id="settings-displayname"
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    className="mt-1.5 bg-muted/30 border-border"
                    placeholder="Your Name"
                    maxLength={50}
                  />
                </div>

                <Button
                  onClick={saveProfile}
                  disabled={savingProfile || usernameStatus === 'taken' || usernameStatus === 'invalid' || usernameStatus === 'checking'}
                  className="w-full racing-gradient text-white"
                >
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </div>
          )}

          {/* Preferences */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-racing text-lg">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Timezone</p>
                  <p className="text-sm text-muted-foreground">Select how session times are displayed</p>
                </div>
                <Select value={timezone} onValueChange={(val: any) => setTimezone(val)}>
                  <SelectTrigger className="w-[180px] bg-background/50 border-border/50">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONE_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Time Format</p>
                  <p className="text-sm text-muted-foreground">12-hour or 24-hour clock</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={timeFormat === '24h' ? 'default' : 'outline'}
                    onClick={() => setTimeFormat('24h')}
                    size="sm"
                    className="w-16"
                  >
                    24h
                  </Button>
                  <Button
                    variant={timeFormat === '12h' ? 'default' : 'outline'}
                    onClick={() => setTimeFormat('12h')}
                    size="sm"
                    className="w-16"
                  >
                    12h
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-racing text-lg font-bold mb-4">Theme</h3>
            <div className="flex gap-3">
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex-1"
              >
                Dark
              </Button>
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex-1"
              >
                Light
              </Button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="font-racing text-lg">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Race Start Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified before races begin</p>
                </div>
                <Switch
                  checked={notifications.raceStartAlerts}
                  onCheckedChange={(v) => updateNotificationSetting('raceStartAlerts', v)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Favorite Team Alerts</p>
                  <p className="text-sm text-muted-foreground">Updates about your favorite teams</p>
                </div>
                <Switch
                  checked={notifications.favoriteTeamAlerts}
                  onCheckedChange={(v) => updateNotificationSetting('favoriteTeamAlerts', v)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Enable browser push notifications</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(v) => updateNotificationSetting('pushNotifications', v)}
                />
              </div>
            </div>
          </div>

          {/* Favorites Link */}
          <Link to="/favorites" className="glass-card p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Favorite Teams & Drivers</p>
                <p className="text-sm text-muted-foreground">Manage your favorites</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default SettingsPage;
