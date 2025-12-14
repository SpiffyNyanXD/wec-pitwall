import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Heart, User, ChevronRight, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const loadNotificationSettings = async () => {
    if (!user) return;
    
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
      <Header />
      
      <main className="container py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="font-racing text-3xl font-bold mb-6">Settings</h1>

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
