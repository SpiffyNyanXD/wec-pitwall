import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { SeasonProvider } from "@/contexts/SeasonContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";
import Teams from "./pages/Teams";
import Circuits from "./pages/Circuits";
import CircuitDetail from "./pages/CircuitDetail";
import TeamProfile from "./pages/TeamProfile";
import Schedule from "./pages/Schedule";
import RaceProfile from "./pages/RaceProfile";
import Standings from "./pages/Standings";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Manufacturers from "./pages/Manufacturers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <SeasonProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/:id" element={<DriverProfile />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamProfile />} />
            <Route path="/circuits" element={<Circuits />} />
            <Route path="/circuit/:id" element={<CircuitDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/race/:id" element={<RaceProfile />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/manufacturers" element={<Manufacturers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
        </SeasonProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
