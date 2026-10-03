import { AUTH_ENABLED } from '@/lib/featureFlags';
import SEOHead from "@/components/SEOHead";
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Heart, Star, LogIn, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FavoriteTeam {
  id: string;
  team_id: string;
  team_name: string;
  car_class: string;
}

const FavoritesPage = () => {
  useEffect(() => {
    document.title = "Favorites | WEC Pitwall";
  }, []);

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: favoriteTeams = [], isLoading: loading, error: favoritesError, refetch: loadFavorites } = useQuery({
    queryKey: ['favorite-teams', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorite_teams')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data as FavoriteTeam[];
    },
    enabled: !!user && !!supabase,
    staleTime: 5 * 60 * 1000,
  });

  const teamsList: Record<string, unknown>[] = [];

  const addFavorite = async (team: Record<string, unknown>) => {
    if (AUTH_ENABLED && !user) {
      toast.error('Please sign in to add favorites');
      return;
    }
    if (!supabase) {
      toast.error('Supabase is not configured');
      return;
    }

    const { error } = await supabase
      .from('favorite_teams')
      .insert({
        user_id: user?.id,
        team_id: team.id,
        team_name: team.name,
        car_class: team.class,
      });

    if (error) {
      toast.error('Failed to add favorite');
    } else {
      toast.success(`Added ${team.name} to favorites`);
      await queryClient.invalidateQueries({ queryKey: ['team-favorite', user?.id, team.id] });
      await loadFavorites();
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    if ((AUTH_ENABLED && !user) || !supabase) return;

    const { error } = await supabase
      .from('favorite_teams')
      .delete()
      .eq('id', favoriteId)
      .eq('user_id', user?.id);

    if (error) {
      toast.error('Failed to remove favorite');
    } else {
      toast.success('Removed from favorites');
      await queryClient.invalidateQueries({ queryKey: ['team-favorite', user?.id] });
      await loadFavorites();
    }
  };

  const isFavorite = (teamId: string) => {
    return favoriteTeams.some(f => f.team_id === teamId);
  };

  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPERCAR': return 'bg-wec-red/20 text-wec-red border-wec-red/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (AUTH_ENABLED && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center glass-card p-8"
          >
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to manage your favorite teams and drivers.
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
      <SEOHead title="Favourites" url="/favorites" noIndex={true} />
      <Header />
      
      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground mb-8">Select your favorite teams to follow</p>

          {loading && <p role="status">Loading favorites…</p>}
          {favoritesError && (
            <div role="alert" className="glass-card p-4 mb-8">
              <p>Failed to load favorites.</p>
              <Button variant="outline" onClick={() => void loadFavorites()}>Retry</Button>
            </div>
          )}

          {/* Current Favorites */}
          {favoriteTeams.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-wec-gold" />
                Your Favorites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteTeams.map((fav) => (
                  <div key={fav.id} className="glass-card p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{fav.team_name}</p>
                      <Badge variant="outline" className={getClassBadge(fav.car_class)}>
                        {fav.car_class}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Teams */}
          <h2 className="text-lg mb-4">All Teams</h2>
          {teamsList.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground glass-card">
              Team browser coming soon with live data.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamsList.map((team) => (
                <motion.div
                  key={team.id}
                  className="glass-card p-4 flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-racing text-primary">{team.carNumber}</span>
                      <p className="font-medium">{team.name}</p>
                    </div>
                    <Badge variant="outline" className={getClassBadge(team.class)}>
                      {team.class}
                    </Badge>
                  </div>
                  <Button
                    variant={isFavorite(team.id) ? "default" : "outline"}
                    size="icon"
                    onClick={() => isFavorite(team.id)
                      ? removeFavorite(favoriteTeams.find(f => f.team_id === team.id)?.id || '')
                      : addFavorite(team)
                    }
                    className={isFavorite(team.id) ? "bg-transparent hover:bg-transparent border-wec-gold" : ""}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isFavorite(team.id) ? "fill-wec-gold text-wec-gold" : ""}`} />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default FavoritesPage;
