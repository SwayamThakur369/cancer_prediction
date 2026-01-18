import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SymptomInput from './components/SymptomInput';
import SmokingHistorySection from './components/SmokingHistorySection';
import SymptomProgressionTimeline from './components/SymptomProgressionTimeline';
import RiskResultDisplay from './components/RiskResultDisplay';
import ModelInfoCard from './components/ModelInfoCard';

const LungCancerPrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    persistentCough: '',
    coughSeverity: '',
    chestPain: '',
    chestPainSeverity: '',
    shortnessOfBreath: '',
    breathingSeverity: '',
    wheezing: '',
    coughingBlood: '',
    fatigue: '',
    weightLoss: '',
    recurrentInfections: ''
  });

  const [smokingData, setSmokingData] = useState({
    status: '',
    years: '',
    perDay: '',
    yearsSinceQuit: ''
  });

  const [progressionData, setProgressionData] = useState({
    duration: '',
    pattern: ''
  });

  const [errors, setErrors] = useState({});
  const [smokingErrors, setSmokingErrors] = useState({});
  const [progressionErrors, setProgressionErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter age',
      description: 'Patient age in years',
      required: true,
      min: 18,
      max: 120,
      tooltip: 'Lung cancer risk increases significantly with age, particularly after 65 years'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender',
      description: 'Biological sex',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      tooltip: 'Gender affects lung cancer risk patterns and symptom presentation'
    },
    {
      name: 'persistentCough',
      label: 'Persistent Cough',
      type: 'select',
      placeholder: 'Select option',
      description: 'Cough lasting more than 3 weeks',
      required: true,
      tooltip: 'A persistent cough is one of the most common early symptoms of lung cancer'
    },
    {
      name: 'coughSeverity',
      label: 'Cough Severity',
      type: 'severity',
      placeholder: 'Select severity',
      description: 'Rate the intensity of cough',
      required: true,
      tooltip: 'Severity assessment helps determine urgency of clinical evaluation'
    },
    {
      name: 'chestPain',
      label: 'Chest Pain',
      type: 'select',
      placeholder: 'Select option',
      description: 'Pain or discomfort in chest area',
      required: true,
      tooltip: 'Chest pain may indicate tumor growth affecting chest wall or pleura'
    },
    {
      name: 'chestPainSeverity',
      label: 'Chest Pain Severity',
      type: 'severity',
      placeholder: 'Select severity',
      description: 'Rate the intensity of chest pain',
      required: true,
      tooltip: 'Pain severity correlates with disease progression and location'
    },
    {
      name: 'shortnessOfBreath',
      label: 'Shortness of Breath',
      type: 'select',
      placeholder: 'Select option',
      description: 'Difficulty breathing or breathlessness',
      required: true,
      tooltip: 'Dyspnea may result from airway obstruction or pleural effusion'
    },
    {
      name: 'breathingSeverity',
      label: 'Breathing Difficulty Severity',
      type: 'severity',
      placeholder: 'Select severity',
      description: 'Rate the intensity of breathing difficulty',
      required: true,
      tooltip: 'Severity indicates degree of respiratory compromise'
    },
    {
      name: 'wheezing',
      label: 'Wheezing',
      type: 'select',
      placeholder: 'Select option',
      description: 'Whistling sound when breathing',
      required: true,
      tooltip: 'Wheezing suggests partial airway obstruction'
    },
    {
      name: 'coughingBlood',
      label: 'Coughing Blood (Hemoptysis)',
      type: 'select',
      placeholder: 'Select option',
      description: 'Blood in cough or sputum',
      required: true,
      tooltip: 'Hemoptysis is a serious symptom requiring immediate medical attention'
    },
    {
      name: 'fatigue',
      label: 'Unexplained Fatigue',
      type: 'select',
      placeholder: 'Select option',
      description: 'Persistent tiredness not relieved by rest',
      required: true,
      tooltip: 'Cancer-related fatigue differs from normal tiredness in persistence and severity'
    },
    {
      name: 'weightLoss',
      label: 'Unintentional Weight Loss',
      type: 'select',
      placeholder: 'Select option',
      description: 'Weight loss without trying',
      required: true,
      tooltip: 'Unexplained weight loss &gt; 10 pounds is a significant warning sign'
    },
    {
      name: 'recurrentInfections',
      label: 'Recurrent Respiratory Infections',
      type: 'select',
      placeholder: 'Select option',
      description: 'Repeated pneumonia or bronchitis',
      required: true,
      tooltip: 'Tumors can block airways leading to recurrent infections'
    }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const newSmokingErrors = {};
    const newProgressionErrors = {};

    formFields?.forEach(field => {
      if (field?.required && !formData?.[field?.name]) {
        newErrors[field.name] = `${field?.label} is required`;
      }
      if (field?.type === 'number' && formData?.[field?.name]) {
        const value = parseInt(formData?.[field?.name]);
        if (field?.min && value < field?.min) {
          newErrors[field.name] = `Minimum value is ${field?.min}`;
        }
        if (field?.max && value > field?.max) {
          newErrors[field.name] = `Maximum value is ${field?.max}`;
        }
      }
    });

    if (!smokingData?.status) {
      newSmokingErrors.status = 'Smoking status is required';
    }

    if (smokingData?.status === 'former' || smokingData?.status === 'current') {
      if (!smokingData?.years) {
        newSmokingErrors.years = 'Years of smoking is required';
      }
      if (!smokingData?.perDay) {
        newSmokingErrors.perDay = 'Cigarettes per day is required';
      }
      if (smokingData?.status === 'former' && !smokingData?.yearsSinceQuit) {
        newSmokingErrors.yearsSinceQuit = 'Years since quit is required';
      }
    }

    if (!progressionData?.duration) {
      newProgressionErrors.duration = 'Symptom duration is required';
    }
    if (!progressionData?.pattern) {
      newProgressionErrors.pattern = 'Progression pattern is required';
    }

    setErrors(newErrors);
    setSmokingErrors(newSmokingErrors);
    setProgressionErrors(newProgressionErrors);

    return Object.keys(newErrors)?.length === 0 && 
           Object.keys(newSmokingErrors)?.length === 0 && 
           Object.keys(newProgressionErrors)?.length === 0;
  };

  const calculateRiskScore = () => {
    let riskScore = 0;
    
    const age = parseInt(formData?.age);
    if (age >= 65) riskScore += 15;
    else if (age >= 50) riskScore += 10;
    else if (age >= 40) riskScore += 5;

    if (smokingData?.status === 'current') riskScore += 25;
    else if (smokingData?.status === 'former') riskScore += 15;

    if (smokingData?.years) {
      const years = parseInt(smokingData?.years);
      if (years >= 30) riskScore += 15;
      else if (years >= 20) riskScore += 10;
      else if (years >= 10) riskScore += 5;
    }

    if (formData?.coughingBlood === 'yes') riskScore += 20;
    if (formData?.persistentCough === 'yes') riskScore += 10;
    if (formData?.chestPain === 'yes') riskScore += 8;
    if (formData?.shortnessOfBreath === 'yes') riskScore += 8;
    if (formData?.weightLoss === 'yes') riskScore += 7;
    if (formData?.recurrentInfections === 'yes') riskScore += 6;

    if (formData?.coughSeverity === '4') riskScore += 5;
    else if (formData?.coughSeverity === '3') riskScore += 3;

    if (progressionData?.pattern === 'rapid') riskScore += 10;
    else if (progressionData?.pattern === 'gradual') riskScore += 5;

    return Math.min(Math.round(riskScore), 100);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine all form data for prediction
      const combinedData = {
        ...formData,
        ...smokingData,
        ...progressionData
      };

      // Make prediction using real API
      const mlService = (await import('../../services/mlService')).default;
      const response = await mlService.predict('lung', combinedData);
      
      if (response.success && response.prediction) {
        const result = {
          ...response.prediction,
          riskScore: response.prediction.prediction_code === 1 ? 85 : 15,
          timestamp: new Date().toISOString(),
          modelVersion: response.prediction.model_type || 'Random Forest v2.1'
        };
        
        setPredictionResult(result);
        setShowResult(true);
      } else {
        throw new Error('Invalid prediction response');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Prediction failed: ' + (error.message || 'Please ensure the model is trained and backend is running.'));
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewPrediction = () => {
    setFormData({
      age: '',
      gender: '',
      persistentCough: '',
      coughSeverity: '',
      chestPain: '',
      chestPainSeverity: '',
      shortnessOfBreath: '',
      breathingSeverity: '',
      wheezing: '',
      coughingBlood: '',
      fatigue: '',
      weightLoss: '',
      recurrentInfections: ''
    });
    setSmokingData({
      status: '',
      years: '',
      perDay: '',
      yearsSinceQuit: ''
    });
    setProgressionData({
      duration: '',
      pattern: ''
    });
    setErrors({});
    setSmokingErrors({});
    setProgressionErrors({});
    setShowResult(false);
    setPredictionResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Lung Cancer Prediction - CancerPredict ML</title>
        <meta name="description" content="AI-assisted lung cancer risk assessment using Random Forest algorithm. Comprehensive 13-field symptom evaluation with smoking history analysis." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-600/10 flex items-center justify-center">
                  <Icon name="Wind" size={28} className="text-gray-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Lung Cancer Risk Assessment</h1>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">Random Forest Classification Model - 13 Symptom Analysis</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">Clinical Decision Support Tool</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      This AI-assisted prediction analyzes respiratory symptoms, smoking history, and temporal patterns to assess lung cancer risk. Results support clinical decision-making but do not replace professional medical diagnosis. Always consult qualified healthcare providers for interpretation and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showResult ? (
              <RiskResultDisplay 
                result={predictionResult} 
                onNewPrediction={handleNewPrediction}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                          <Icon name="ClipboardList" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h2 className="text-base md:text-lg font-semibold text-foreground">Patient Information</h2>
                          <p className="text-xs md:text-sm text-muted-foreground">Basic demographic data</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {formFields?.slice(0, 2)?.map(field => (
                          <SymptomInput
                            key={field?.name}
                            field={field}
                            value={formData?.[field?.name]}
                            onChange={(value) => handleInputChange(field?.name, value)}
                            error={errors?.[field?.name]}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                          <Icon name="Activity" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h2 className="text-base md:text-lg font-semibold text-foreground">Respiratory Symptoms</h2>
                          <p className="text-xs md:text-sm text-muted-foreground">Detailed symptom assessment</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {formFields?.slice(2)?.map(field => (
                          <SymptomInput
                            key={field?.name}
                            field={field}
                            value={formData?.[field?.name]}
                            onChange={(value) => handleInputChange(field?.name, value)}
                            error={errors?.[field?.name]}
                          />
                        ))}
                      </div>
                    </div>

                    <SmokingHistorySection
                      smokingData={smokingData}
                      onChange={setSmokingData}
                      errors={smokingErrors}
                    />

                    <SymptomProgressionTimeline
                      progressionData={progressionData}
                      onChange={setProgressionData}
                      errors={progressionErrors}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <Button
                        type="submit"
                        variant="default"
                        iconName="Brain"
                        iconPosition="left"
                        loading={isSubmitting}
                        fullWidth
                      >
                        {isSubmitting ? 'Analyzing Symptoms...' : 'Generate Risk Assessment'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        iconName="RotateCcw"
                        iconPosition="left"
                        onClick={handleNewPrediction}
                        disabled={isSubmitting}
                        fullWidth
                      >
                        Reset Form
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="space-y-6">
                  <ModelInfoCard />

                  <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="BookOpen" size={20} className="text-primary" />
                      <h3 className="text-base md:text-lg font-semibold text-foreground">Quick Reference</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1">Warning Signs</h4>
                        <p className="text-xs text-muted-foreground">Persistent cough, chest pain, coughing blood, unexplained weight loss</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1">Risk Factors</h4>
                        <p className="text-xs text-muted-foreground">Smoking history, age &gt; 50, family history, occupational exposure</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1">Next Steps</h4>
                        <p className="text-xs text-muted-foreground">Consult pulmonologist, imaging studies (CT/PET), biopsy if indicated</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="HelpCircle" size={20} className="text-primary" />
                      <h3 className="text-base md:text-lg font-semibold text-foreground">Need Help?</h3>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                      For questions about symptom assessment or result interpretation, consult our clinical guidelines or contact your healthcare provider.
                    </p>
                    <Button variant="outline" iconName="ExternalLink" iconPosition="right" fullWidth>
                      View Guidelines
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LungCancerPrediction;