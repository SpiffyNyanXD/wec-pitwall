import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { SeasonProvider } from "@/contexts/SeasonContext";
import { SkeletonBox } from "@/components/PageSkeleton";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Keep Index as eager (it's the first page)
import Index from "./pages/Index";

// Lazy load everything else
const Auth = lazy(() => import("./pages/Auth"));
const Drivers = lazy(() => import("./pages/Drivers"));
const DriverProfile = lazy(() => import("./pages/DriverProfile"));
const Teams = lazy(() => import("./pages/Teams"));
const Circuits = lazy(() => import("./pages/Circuits"));
const CircuitDetail = lazy(() => import("./pages/CircuitDetail"));
const TeamProfile = lazy(() => import("./pages/TeamProfile"));
const Schedule = lazy(() => import("./pages/Schedule"));
const RaceProfile = lazy(() => import("./pages/RaceProfile"));
const Standings = lazy(() => import("./pages/Standings"));
const Championship = lazy(() => import("./pages/Championship"));
const Settings = lazy(() => import("./pages/Settings"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="space-y-3 w-full max-w-md px-4">
      <SkeletonBox className="h-8 w-1/2 mx-auto" />
      <SkeletonBox className="h-4 w-3/4 mx-auto" />
      <div className="grid gap-3 mt-6">
        {[1,2,3].map(i => <SkeletonBox key={i} className="h-16 w-full rounded-xl" />)}
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <SeasonProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/championship" element={<Championship />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        </TooltipProvider>
        </SeasonProvider>
      </AuthProvider>
    </ThemeProvider>
    <SpeedInsights />
  </QueryClientProvider>
);

export default App;
