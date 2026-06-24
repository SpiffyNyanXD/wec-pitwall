import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import WecLogo from '@/components/WecLogo';
import { Menu, Bell, Settings, LogIn, LogOut, User, X, Home, Trophy, Calendar, Users, Car, Heart, MapPin, Milestone, Factory, ChevronDown, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const primaryNav = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/standings', label: 'Standings', icon: Trophy },
  { to: '/schedule', label: 'Schedule', icon: Calendar },
  { to: '/drivers', label: 'Drivers', icon: Users },
  { to: '/teams', label: 'Teams', icon: Car },
];

const secondaryNav = [
  { to: '/championship', label: 'Championship', icon: Trophy },
  { to: '/timeline', label: 'Timeline', icon: Milestone },
  { to: '/circuits', label: 'Circuits', icon: MapPin },
  { to: '/manufacturers', label: 'Manufacturers', icon: Factory },
  { to: '/compare', label: 'Driver Compare', icon: ArrowLeftRight },
];

const Header = () => {
  const { user, profile, signOut, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>


    <motion.header 
      className="md:hidden sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-background/95 backdrop-blur-xl">
              <SheetHeader className="pb-6 border-b border-border/50">
                <SheetTitle asChild>
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <WecLogo />
                    <div>
                      <span className="text-xl font-bold text-foreground tracking-wide">
                        WEC <span className="text-primary">Pitwall</span>
                      </span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2 mt-6">
                {[...primaryNav, ...secondaryNav].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.to) 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                <div className="my-4 border-t border-border/50" />
                
                {user && (
                  <Link
                    to="/favorites"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive('/favorites') 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Favorites</span>
                  </Link>
                )}
                
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive('/settings') 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>

                {!loading && (
                  <>
                    {user ? (
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all mt-4"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        to="/auth"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg racing-gradient text-primary-foreground mt-4"
                      >
                        <LogIn className="w-5 h-5" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                    )}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-3">
            <WecLogo />
            <div className="hidden sm:block">
              <p className="text-xl font-bold text-foreground tracking-wide">
                WEC <span className="text-primary">Pitwall</span>
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                WEC Analytics Platform
              </p>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive(item.to)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground">
                More <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {secondaryNav.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex items-center gap-2 cursor-pointer">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/settings">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-2 flex items-center gap-2 p-1.5 px-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {profile?.username
                            ? profile.username[0].toUpperCase()
                            : profile?.display_name
                              ? profile.display_name[0].toUpperCase()
                              : user?.email?.[0].toUpperCase() ?? 'U'}
                        </span>
                      </div>
                      <span className="hidden md:block text-sm text-muted-foreground">
                        {profile?.username ? `@${profile.username}` : profile?.display_name ?? 'Account'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium truncate">{profile?.username ? `@${profile.username}` : profile?.display_name ?? user.email}</p>
                      {(profile?.username || profile?.display_name) && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="default" size="sm" className="ml-2 racing-gradient">
                  <Link to="/auth">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.header>

      {/* Desktop Sidebar (>=768px) */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen bg-background border-r border-border/50 z-40 flex-col transition-all duration-300 w-20 lg:w-64 3xl:w-72">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border/50 shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <WecLogo className="w-8 h-8" />
            <div className="hidden lg:block">
              <p className="text-lg font-bold text-foreground tracking-wide">
                WEC <span className="text-primary">Pitwall</span>
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-3 lg:px-4">
          {[...primaryNav, ...secondaryNav].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive(item.to)
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium hidden lg:block whitespace-nowrap">{item.label}</span>
            </Link>
          ))}

          <div className="my-4 border-t border-border/50" />

          {user && (
            <Link
              to="/favorites"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive('/favorites')
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
              title="Favorites"
            >
              <Heart className="w-5 h-5 shrink-0" />
              <span className="font-medium hidden lg:block whitespace-nowrap">Favorites</span>
            </Link>
          )}

          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              isActive('/settings')
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="font-medium hidden lg:block whitespace-nowrap">Settings</span>
          </Link>
        </div>

        {/* User / Sign In at bottom */}
        <div className="p-4 border-t border-border/50 shrink-0">
          {!loading && (
            <>
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center lg:justify-start gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {profile?.username
                          ? profile.username[0].toUpperCase()
                          : profile?.display_name
                            ? profile.display_name[0].toUpperCase()
                            : user?.email?.[0].toUpperCase() ?? 'U'}
                      </span>
                    </div>
                    <div className="hidden lg:block overflow-hidden">
                      <p className="font-medium text-sm truncate">{profile?.username ? `@${profile.username}` : profile?.display_name ?? 'Account'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all mt-2 w-full justify-center lg:justify-start"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="font-medium hidden lg:block whitespace-nowrap">Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg racing-gradient text-primary-foreground"
                  title="Sign In"
                >
                  <LogIn className="w-5 h-5 shrink-0" />
                  <span className="font-medium hidden lg:block whitespace-nowrap">Sign In</span>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
