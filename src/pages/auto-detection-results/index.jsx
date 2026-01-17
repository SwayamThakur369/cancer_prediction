import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProbabilityDisplay from './components/ProbabilityDisplay';
import RecommendationPanel from './components/RecommendationPanel';
import PipelineInfo from './components/PipelineInfo';

const AutoDetectionResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { detectionResult, inputData } = location?.state || {};

  useEffect(() => {
    if (!detectionResult) {
      navigate('/auto-cancer-detection');
    }
  }, [detectionResult, navigate]);

  if (!detectionResult) {
    return null;
  }

  const handleNewDetection = () => {
    navigate('/auto-cancer-detection');
  };

  const handleSpecializedPrediction = () => {
    const typeMap = {
      'Breast Cancer': '/breast-cancer-prediction',
      'Lung Cancer': '/lung-cancer-prediction',
      'Prostate Cancer': '/prostate-cancer-prediction'
    };
    const path = typeMap?.[detectionResult?.detectedType];
    if (path) {
      navigate(path);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High':
        return { bg: 'bg-error/5', border: 'border-error', text: 'text-error', icon: 'AlertCircle' };
      case 'Medium':
        return { bg: 'bg-warning/5', border: 'border-warning', text: 'text-warning', icon: 'AlertTriangle' };
      case 'Low':
        return { bg: 'bg-success/5', border: 'border-success', text: 'text-success', icon: 'CheckCircle2' };
      default:
        return { bg: 'bg-primary/5', border: 'border-primary', text: 'text-primary', icon: 'Info' };
    }
  };

  const riskStyle = getRiskColor(detectionResult?.riskLevel);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-gradient-overlay py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4 md:mb-6">
              <Link
                to="/auto-cancer-detection"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                <span className="text-sm md:text-base">Back to Auto Detection</span>
              </Link>
            </div>

            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-4">
                <Icon name="Activity" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Auto Detection Results
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2">
                  AI-powered cancer type identification and risk assessment
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Analysis Complete
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${riskStyle?.bg} ${riskStyle?.text}`}>
                <Icon name={riskStyle?.icon} size={14} className="mr-1" />
                {detectionResult?.riskLevel} Risk
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className={`breathing-card p-6 md:p-8 border-2 ${riskStyle?.border} ${riskStyle?.bg} mb-8`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${riskStyle?.bg}`}>
                  <Icon name={riskStyle?.icon} size={28} className={riskStyle?.text} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    Detected Cancer Type
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Two-Stage ML Pipeline Analysis
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Primary Detection</span>
                  <span className={`text-2xl md:text-3xl font-bold ${riskStyle?.text}`}>
                    {detectionResult?.detectedType}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
                  <span className="text-lg md:text-xl font-semibold text-primary">
                    {detectionResult?.confidence}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500 bg-primary"
                    style={{ width: `${detectionResult?.confidence}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-start">
                  <Icon name="Info" size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    This prediction is for assistance only and does not replace professional diagnosis. Always consult with qualified healthcare professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            <ProbabilityDisplay probabilities={detectionResult?.probabilities} detectedType={detectionResult?.detectedType} />
            <PipelineInfo stage1={detectionResult?.stage1} stage2={detectionResult?.stage2} />
          </div>

          <RecommendationPanel
            detectedType={detectionResult?.detectedType}
            riskLevel={detectionResult?.riskLevel}
            recommendation={detectionResult?.recommendation}
          />

          <div className="mt-8">
            <div className="breathing-card p-6 md:p-8 bg-primary/5 border border-primary/20">
              <div className="flex items-start">
                <Icon name="Lightbulb" size={24} className="text-primary flex-shrink-0 mt-1 mr-3" />
                <div className="flex-1">
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                    Next Steps
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">
                    Based on the detected cancer type, you can proceed with specialized prediction for more detailed assessment:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li className="flex items-start">
                      <Icon name="Check" size={18} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                      <span>Use the specialized prediction form for {detectionResult?.detectedType} for detailed clinical parameter analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" size={18} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                      <span>Consult with healthcare professionals for clinical validation and diagnostic testing</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" size={18} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                      <span>Schedule regular screenings based on your risk level and medical history</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleNewDetection}
              iconName="Plus"
              iconPosition="left"
            >
              New Auto Detection
            </Button>
            {detectionResult?.detectedType !== 'Low Risk' && (
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleSpecializedPrediction}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Go to {detectionResult?.detectedType} Prediction
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Download Report
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AutoDetectionResults;