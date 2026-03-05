import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import WeeklyAnalysis from "@/pages/WeeklyAnalysis";
import FestivalAnomalies from "@/pages/FestivalAnomalies";
import RoadQualityIndex from "@/pages/RoadQualityIndex";
import MapView from "@/pages/MapView";
import RoadAnalyzer from "@/pages/RoadAnalyzer";
import Reports from "@/pages/Reports";
import NotFound from "@/pages/NotFound";
import LoadingScreen from "@/components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading && <LoadingScreen onComplete={handleComplete} />}
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weekly" element={<WeeklyAnalysis />} />
              <Route path="/festivals" element={<FestivalAnomalies />} />
              <Route path="/quality" element={<RoadQualityIndex />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/analyzer" element={<RoadAnalyzer />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
