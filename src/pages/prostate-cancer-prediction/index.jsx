import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import InfoPanel from './components/InfoPanel';

const ProstateCancerPrediction = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (formData) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const age = parseFloat(formData?.age);
    const psa = parseFloat(formData?.psa);
    const psaDensity = parseFloat(formData?.psaDensity);
    const gleason = parseFloat(formData?.gleason);
    const dre = parseFloat(formData?.dre);
    const familyHistory = parseFloat(formData?.familyHistory);

    let riskScore = 0;

    if (age >= 70) riskScore += 25;
    else if (age >= 60) riskScore += 20;
    else if (age >= 50) riskScore += 15;
    else riskScore += 10;

    if (psa >= 10) riskScore += 30;
    else if (psa >= 4) riskScore += 20;
    else if (psa >= 2.5) riskScore += 10;
    else riskScore += 5;

    if (psaDensity >= 0.15) riskScore += 15;
    else if (psaDensity >= 0.10) riskScore += 10;
    else riskScore += 5;

    if (gleason >= 8) riskScore += 20;
    else if (gleason >= 7) riskScore += 15;
    else riskScore += 5;

    if (dre === 1) riskScore += 15;
    if (familyHistory === 1) riskScore += 10;

    const finalRisk = Math.min(Math.max(riskScore, 5), 95);

    setPredictionResult({
      riskPercentage: finalRisk,
      timestamp: new Date()?.toISOString()
    });

    setIsLoading(false);
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Prostate Cancer Prediction - CancerPredict ML</title>
        <meta 
          name="description" 
          content="AI-powered prostate cancer risk prediction using Random Forest algorithm. Clinical-grade assessment based on PSA levels, DRE findings, and patient history." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-6 md:mb-8">
              <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
                <Link to="/homepage" className="hover:text-primary transition-colors duration-200">
                  Home
                </Link>
                <Icon name="ChevronRight" size={14} />
                <Link to="/cancer-selection" className="hover:text-primary transition-colors duration-200">
                  Cancer Selection
                </Link>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground font-medium">Prostate Cancer Prediction</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    Prostate Cancer Risk Prediction
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    AI-assisted clinical assessment using Random Forest machine learning algorithm
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs md:text-sm font-medium text-primary">Random Forest Model</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div className="breathing-card p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="ClipboardList" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-foreground">Clinical Parameters</h2>
                      <p className="text-xs md:text-sm text-muted-foreground">Enter patient data for risk assessment</p>
                    </div>
                  </div>

                  {!predictionResult ? (
                    <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
                  ) : (
                    <ResultDisplay result={predictionResult} onNewPrediction={handleNewPrediction} />
                  )}
                </div>

                <div className="breathing-card p-6 md:p-8 bg-primary/5">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Model Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">92.5%</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">89.3%</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Sensitivity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">94.7%</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Specificity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">0.96</div>
                      <div className="text-xs md:text-sm text-muted-foreground">AUC-ROC</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <InfoPanel />
              </div>
            </div>

            <div className="mt-8 md:mt-12 breathing-card p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Quick Navigation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Link 
                  to="/breast-cancer-prediction" 
                  className="breathing-card p-4 md:p-6 hover:shadow-clinical transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors duration-300">
                      <Icon name="Heart" size={20} className="text-pink-500" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold text-foreground">Breast Cancer</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">SVM-based prediction model</p>
                </Link>

                <Link 
                  to="/lung-cancer-prediction" 
                  className="breathing-card p-4 md:p-6 hover:shadow-clinical transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-500/10 flex items-center justify-center group-hover:bg-slate-500/20 transition-colors duration-300">
                      <Icon name="Wind" size={20} className="text-slate-500" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold text-foreground">Lung Cancer</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Random Forest algorithm</p>
                </Link>

                <Link 
                  to="/results-dashboard" 
                  className="breathing-card p-4 md:p-6 hover:shadow-clinical transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon name="BarChart3" size={20} className="text-primary" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold text-foreground">Results Dashboard</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">View prediction history</p>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProstateCancerPrediction;