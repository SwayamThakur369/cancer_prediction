import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LungCancerPrediction from './pages/lung-cancer-prediction';
import ResultsDashboard from './pages/results-dashboard';
import ProstateCancerPrediction from './pages/prostate-cancer-prediction';
import BreastCancerPrediction from './pages/breast-cancer-prediction';
import CancerSelection from './pages/cancer-selection';
import Homepage from './pages/homepage';
import AutoCancerDetection from './pages/auto-cancer-detection';
import AutoDetectionResults from './pages/auto-detection-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/lung-cancer-prediction" element={<LungCancerPrediction />} />
        <Route path="/results-dashboard" element={<ResultsDashboard />} />
        <Route path="/prostate-cancer-prediction" element={<ProstateCancerPrediction />} />
        <Route path="/breast-cancer-prediction" element={<BreastCancerPrediction />} />
        <Route path="/cancer-selection" element={<CancerSelection />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/auto-cancer-detection" element={<AutoCancerDetection />} />
        <Route path="/auto-detection-results" element={<AutoDetectionResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
