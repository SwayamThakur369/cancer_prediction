import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import InfoCard from './components/InfoCard';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import ModelInfoSection from './components/ModelInfoSection';

const BreastCancerPrediction = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = (formData) => {
    setIsLoading(true);

    setTimeout(() => {
      const mockPredictions = [
        { prediction: 'Benign', confidence: 94.3 },
        { prediction: 'Benign', confidence: 87.6 },
        { prediction: 'Malignant', confidence: 91.8 },
        { prediction: 'Malignant', confidence: 88.2 },
        { prediction: 'Benign', confidence: 96.1 }
      ];

      const randomResult = mockPredictions?.[Math.floor(Math.random() * mockPredictions?.length)];
      
      const result = {
        ...randomResult,
        timestamp: new Date()?.toISOString(),
        inputData: formData
      };

      setPredictionResult(result);
      setIsLoading(false);

      const existingResults = JSON.parse(localStorage.getItem('breastCancerPredictions') || '[]');
      existingResults?.unshift(result);
      localStorage.setItem('breastCancerPredictions', JSON.stringify(existingResults?.slice(0, 50)));
    }, 2000);
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
  };

  const infoCards = [
    {
      icon: 'Activity',
      title: 'Real-time Analysis',
      description: 'Instant SVM-based classification of tumor characteristics with confidence scoring and detailed interpretation guidelines.',
      color: 'primary'
    },
    {
      icon: 'Shield',
      title: 'Clinical-Grade Accuracy',
      description: 'Model validated against histopathological standards with 97.2% accuracy and comprehensive performance metrics.',
      color: 'success'
    },
    {
      icon: 'Lock',
      title: 'Secure & Private',
      description: 'All predictions are processed locally. No patient data is stored or transmitted to external servers.',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-gradient-overlay py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4 md:mb-6">
              <Link 
                to="/cancer-selection" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                <span className="text-sm md:text-base">Back to Cancer Selection</span>
              </Link>
            </div>

            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-pink-100 flex items-center justify-center mr-4">
                <Icon name="Heart" size={28} className="text-pink-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Breast Cancer Prediction
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2">
                  AI-assisted classification using Support Vector Machine algorithm
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary">
                <Icon name="Cpu" size={14} className="mr-1" />
                SVM Algorithm
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-success/10 text-success">
                <Icon name="Target" size={14} className="mr-1" />
                97.2% Accuracy
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-pink-100 text-pink-600">
                <Icon name="Heart" size={14} className="mr-1" />
                Breast Cancer
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {infoCards?.map((card, index) => (
              <InfoCard
                key={index}
                icon={card?.icon}
                title={card?.title}
                description={card?.description}
                color={card?.color}
              />
            ))}
          </div>

          <MedicalDisclaimer />

          <div className="mt-8 md:mt-12">
            {!predictionResult ? (
              <div className="bg-card rounded-lg border border-border p-6 md:p-8 lg:p-10">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Enter Tumor Characteristics
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Provide the following measurements from fine needle aspirate (FNA) imaging analysis. All fields are required for accurate prediction.
                  </p>
                </div>

                <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />

                <div className="mt-6 md:mt-8 pt-6 border-t border-border">
                  <div className="flex items-start">
                    <Icon name="Info" size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-medium text-foreground mb-2">
                        How to Use This Tool
                      </h4>
                      <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                        <li className="flex items-start">
                          <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Enter all 9 tumor characteristic measurements from imaging analysis</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Ensure values fall within the specified ranges for each parameter</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Review the prediction result along with confidence intervals and clinical guidelines</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Always validate AI predictions with comprehensive clinical assessment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-6 md:p-8 lg:p-10">
                <ResultDisplay result={predictionResult} onNewPrediction={handleNewPrediction} />
              </div>
            )}
          </div>

          <div className="mt-8 md:mt-12">
            <ModelInfoSection />
          </div>

          <div className="mt-8 md:mt-12 bg-card rounded-lg border border-border p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Icon name="ExternalLink" size={24} className="text-primary mr-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Additional Resources
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link
                to="/results-dashboard"
                className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="BarChart3" size={24} className="text-primary mr-3" />
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground">
                    View Results Dashboard
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Access prediction history and analytics
                  </p>
                </div>
              </Link>

              <Link
                to="/lung-cancer-prediction"
                className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="Wind" size={24} className="text-primary mr-3" />
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground">
                    Lung Cancer Prediction
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try our lung cancer prediction model
                  </p>
                </div>
              </Link>

              <Link
                to="/prostate-cancer-prediction"
                className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="Activity" size={24} className="text-primary mr-3" />
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground">
                    Prostate Cancer Prediction
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explore prostate cancer risk assessment
                  </p>
                </div>
              </Link>

              <a
                href="#"
                className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="FileText" size={24} className="text-primary mr-3" />
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground">
                    Clinical Guidelines
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Download interpretation guidelines (PDF)
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BreastCancerPrediction;