import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';

import StepIndicator from './components/StepIndicator';
import UnifiedForm from './components/UnifiedForm';
import MedicalDisclaimer from '../breast-cancer-prediction/components/MedicalDisclaimer';

const AutoCancerDetection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep(2);
    setIsAnalyzing(true);

    // Simulate Stage 1: Cancer Type Detection
    setTimeout(() => {
      setCurrentStep(3);
      
      // Simulate Stage 2: Specialized Model Prediction
      setTimeout(() => {
        setIsAnalyzing(false);
        
        // Two-stage ML pipeline simulation
        const detectionResult = simulateTwoStagePipeline(data);
        
        // Navigate to results page with detection data
        navigate('/auto-detection-results', { 
          state: { 
            detectionResult,
            inputData: data 
          } 
        });
      }, 1500);
    }, 2000);
  };

  const simulateTwoStagePipeline = (data) => {
    // Stage 1: Cancer Type Classifier
    // Rule-based scoring for cancer type detection
    let breastScore = 0;
    let lungScore = 0;
    let prostateScore = 0;

    // Age-based scoring
    const age = parseInt(data?.age);
    if (age >= 50) {
      breastScore += 15;
      prostateScore += 20;
      lungScore += 15;
    }

    // Gender-based scoring
    if (data?.gender === 'female') {
      breastScore += 30;
      prostateScore = 0; // Prostate cancer only affects males
    } else if (data?.gender === 'male') {
      prostateScore += 30;
      breastScore = 5; // Males can get breast cancer but it's rare
    }

    // Smoking impact
    if (data?.smoking === 'yes') {
      lungScore += 35;
      breastScore += 5;
      prostateScore += 5;
    }

    // Alcohol impact
    if (data?.alcohol === 'yes') {
      breastScore += 10;
      lungScore += 10;
      prostateScore += 5;
    }

    // Family history
    if (data?.familyHistory === 'yes') {
      breastScore += 15;
      lungScore += 15;
      prostateScore += 15;
    }

    // Symptom-based scoring
    if (data?.lumps === 'yes') {
      breastScore += 25;
      prostateScore += 10;
    }

    if (data?.chestPain === 'yes') {
      lungScore += 20;
      breastScore += 5;
    }

    if (data?.shortnessOfBreath === 'yes') {
      lungScore += 25;
    }

    const fatigueLevel = parseInt(data?.fatigue) || 0;
    const weightLossLevel = parseInt(data?.weightLoss) || 0;
    const painLevel = parseInt(data?.painLevel) || 0;
    const appetiteLossLevel = parseInt(data?.appetiteLoss) || 0;

    // Add severity-based scores
    breastScore += fatigueLevel * 2 + weightLossLevel * 2 + painLevel * 2;
    lungScore += fatigueLevel * 3 + weightLossLevel * 3 + appetiteLossLevel * 3;
    prostateScore += painLevel * 3 + appetiteLossLevel * 2;

    // Normalize scores to percentages
    const totalScore = breastScore + lungScore + prostateScore;
    
    if (totalScore === 0) {
      // Low risk scenario
      return {
        detectedType: 'Low Risk',
        probabilities: {
          breast: 10,
          lung: 10,
          prostate: data?.gender === 'male' ? 10 : 0
        },
        riskLevel: 'Low',
        confidence: 85,
        stage1: 'Cancer Type Classifier',
        stage2: 'No specialized model activated',
        recommendation: 'Continue regular health screenings'
      };
    }

    const breastProb = Math.round((breastScore / totalScore) * 100);
    const lungProb = Math.round((lungScore / totalScore) * 100);
    const prostateProb = Math.round((prostateScore / totalScore) * 100);

    // Determine primary cancer type
    const maxProb = Math.max(breastProb, lungProb, prostateProb);
    let detectedType = '';
    let riskLevel = '';
    let stage2Model = '';

    if (maxProb === breastProb) {
      detectedType = 'Breast Cancer';
      stage2Model = 'Breast Cancer SVM Model';
    } else if (maxProb === lungProb) {
      detectedType = 'Lung Cancer';
      stage2Model = 'Lung Cancer Neural Network';
    } else {
      detectedType = 'Prostate Cancer';
      stage2Model = 'Prostate Cancer Random Forest';
    }

    // Determine risk level based on max probability
    if (maxProb >= 60) {
      riskLevel = 'High';
    } else if (maxProb >= 40) {
      riskLevel = 'Medium';
    } else {
      riskLevel = 'Low';
    }

    const confidence = Math.min(maxProb + Math.floor(Math.random() * 10), 95);

    return {
      detectedType,
      probabilities: {
        breast: breastProb,
        lung: lungProb,
        prostate: prostateProb
      },
      riskLevel,
      confidence,
      stage1: 'Cancer Type Classifier',
      stage2: stage2Model,
      recommendation: riskLevel === 'High' 
        ? `Immediate consultation recommended for ${detectedType} assessment`
        : `Follow-up screening recommended for ${detectedType}`
    };
  };

  const infoCards = [
    {
      icon: 'Brain',
      title: 'Intelligent Detection',
      description: 'Two-stage ML pipeline automatically identifies cancer type from symptoms without manual selection.',
      color: 'primary'
    },
    {
      icon: 'Zap',
      title: 'Multi-Cancer Analysis',
      description: 'Analyzes patterns across breast, lung, and prostate cancer models for comprehensive assessment.',
      color: 'success'
    },
    {
      icon: 'Shield',
      title: 'Clinical-Grade Pipeline',
      description: 'Stage 1 classifies cancer type, Stage 2 activates specialized model for detailed risk prediction.',
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
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-4">
                <Icon name="Brain" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Auto Cancer Type Detection
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2">
                  Intelligent screening with automated cancer type identification
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary">
                <Icon name="Cpu" size={14} className="mr-1" />
                Two-Stage Pipeline
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-success/10 text-success">
                <Icon name="Target" size={14} className="mr-1" />
                Multi-Cancer Detection
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-warning/10 text-warning">
                <Icon name="Zap" size={14} className="mr-1" />
                Automated Classification
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <StepIndicator currentStep={currentStep} isAnalyzing={isAnalyzing} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {infoCards?.map((card, index) => (
              <div key={index} className="breathing-card p-6">
                <div className={`w-12 h-12 rounded-lg bg-${card?.color}/10 flex items-center justify-center mb-4`}>
                  <Icon name={card?.icon} size={24} className={`text-${card?.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{card?.title}</h3>
                <p className="text-sm text-muted-foreground">{card?.description}</p>
              </div>
            ))}
          </div>

          <MedicalDisclaimer />

          <div className="mt-8 md:mt-12">
            <div className="bg-card rounded-lg border border-border p-6 md:p-8 lg:p-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  General Medical & Symptom Information
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your medical history and symptoms. Our AI will automatically detect the most likely cancer type and provide specialized risk assessment.
                </p>
              </div>

              <UnifiedForm onSubmit={handleFormSubmit} isLoading={isAnalyzing} />

              <div className="mt-6 md:mt-8 pt-6 border-t border-border">
                <div className="flex items-start">
                  <Icon name="Info" size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-medium text-foreground mb-2">
                      How Auto Detection Works
                    </h4>
                    <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                      <p>
                        <strong>Stage 1 - Cancer Type Classifier:</strong> Analyzes your symptoms and clinical data to predict the most likely cancer type (Breast, Lung, or Prostate).
                      </p>
                      <p>
                        <strong>Stage 2 - Specialized Model:</strong> Automatically activates the corresponding cancer-specific ML model for detailed risk prediction.
                      </p>
                      <p>
                        This intelligent pipeline eliminates the need for manual cancer type selection and provides comprehensive multi-cancer screening.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AutoCancerDetection;