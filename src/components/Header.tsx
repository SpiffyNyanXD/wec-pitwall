import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Settings, LogIn, LogOut, User, X, Home, Trophy, Calendar, Users, Car, Heart, MapPin, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
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

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/standings', label: 'Standings', icon: Trophy },
  { to: '/schedule', label: 'Schedule', icon: Calendar },
  { to: '/circuits', label: 'Circuits', icon: MapPin },
  { to: '/drivers', label: 'Drivers', icon: Users },
  { to: '/compare', label: 'Compare', icon: () => <span className="text-base w-5 h-5 flex items-center justify-center">⚔️</span> },
  { to: '/teams', label: 'Teams', icon: Car },
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };
  const { user, signOut, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
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
                    <div className="w-10 h-10 rounded-lg racing-gradient flex items-center justify-center shadow-lg">
                      <span className="font-racing text-lg font-bold text-primary-foreground">W</span>
                    </div>
                    <div>
                      <span className="font-racing text-xl font-bold text-foreground tracking-wide">
                        WEC<span className="text-primary">Hub</span>
                      </span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
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
            <div className="w-10 h-10 rounded-lg racing-gradient flex items-center justify-center shadow-lg">
              <span className="font-racing text-lg font-bold text-primary-foreground">W</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-racing text-xl font-bold text-foreground tracking-wide">
                WEC<span className="text-primary">Hub</span>
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Fan-Made Companion
              </p>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.to}
              to={item.to} 
              className={`text-sm font-medium transition-colors ${
                isActive(item.to) 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            title={`Current theme: ${theme}. Click to change.`}
          >
            {theme === 'dark' ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : theme === 'light' ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Monitor className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/settings">
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
                    <Button variant="ghost" size="icon" className="ml-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium truncate">{user.email}</p>
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
  );
};

export default Header;
