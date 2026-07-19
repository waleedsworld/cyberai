import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RouteFallback from "./components/RouteFallback";

// Secondary routes are code-split so the landing page ships a smaller
// initial bundle. Each becomes its own async chunk fetched on navigation.
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ApiTest = lazy(() => import("./pages/ApiTest"));
const ComplianceCheck = lazy(() => import("./pages/ComplianceCheck"));
const ComplianceReports = lazy(() => import("./pages/ComplianceReports"));
const ReadinessScorecard = lazy(() => import("./pages/ReadinessScorecard"));
const SecurityLab = lazy(() => import("./pages/SecurityLab"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/api-test" element={<ApiTest />} />
            <Route path="/compliance-check" element={<ComplianceCheck />} />
            <Route path="/reports" element={<ComplianceReports />} />
            <Route path="/readiness" element={<ReadinessScorecard />} />
            <Route path="/security-lab" element={<SecurityLab />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
