
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskResultDisplay = ({ result, onNewPrediction }) => {
  const getRiskLevel = (score) => {
    if (score >= 75) return { level: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: 'AlertTriangle' };
    if (score >= 50) return { level: 'Moderate Risk', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', icon: 'AlertCircle' };
    if (score >= 25) return { level: 'Low-Moderate Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', icon: 'Info' };
    return { level: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', icon: 'CheckCircle' };
  };

  const riskInfo = getRiskLevel(result?.riskScore);

  const recommendations = [
    {
      icon: 'Stethoscope',
      title: 'Consult Healthcare Provider',
      description: 'Discuss these results with your oncologist or pulmonologist for professional interpretation and next steps.'
    },
    {
      icon: 'FileText',
      title: 'Additional Testing',
      description: 'Based on risk level, imaging studies (CT scan, PET scan) or biopsy may be recommended for definitive diagnosis.'
    },
    {
      icon: 'Activity',
      title: 'Monitor Symptoms',
      description: 'Track any changes in symptoms and report new or worsening conditions to your healthcare team immediately.'
    },
    {
      icon: 'Heart',
      title: 'Lifestyle Modifications',
      description: 'If applicable, smoking cessation, improved air quality, and healthy lifestyle choices can reduce risk factors.'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className={`${riskInfo?.bgColor} ${riskInfo?.borderColor} border-2 rounded-lg p-6 md:p-8`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${riskInfo?.bgColor} flex items-center justify-center border-2 ${riskInfo?.borderColor}`}>
              <Icon name={riskInfo?.icon} size={32} className={riskInfo?.color} />
            </div>
            <div>
              <h3 className={`text-xl md:text-2xl font-bold ${riskInfo?.color}`}>{riskInfo?.level}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Based on Random Forest Model Analysis</p>
            </div>
          </div>
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold ${riskInfo?.color}`}>{result?.riskScore}%</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Risk Score</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h4 className="text-base md:text-lg font-semibold text-foreground">Model Performance Metrics</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
            <p className="text-lg md:text-xl font-bold text-foreground">94.2%</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <p className="text-xs text-muted-foreground mb-1">Precision</p>
            <p className="text-lg md:text-xl font-bold text-foreground">92.8%</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <p className="text-xs text-muted-foreground mb-1">Recall</p>
            <p className="text-lg md:text-xl font-bold text-foreground">91.5%</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <p className="text-xs text-muted-foreground mb-1">F1-Score</p>
            <p className="text-lg md:text-xl font-bold text-foreground">92.1%</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h4 className="text-base md:text-lg font-semibold text-foreground">Clinical Recommendations</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {recommendations?.map((rec, index) => (
            <div key={index} className="flex gap-3 p-3 md:p-4 bg-muted/30 rounded-md">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={rec?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h5 className="text-sm md:text-base font-semibold text-foreground mb-1">{rec?.title}</h5>
                <p className="text-xs md:text-sm text-muted-foreground">{rec?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Important Medical Disclaimer</h4>
            <p className="text-xs md:text-sm text-muted-foreground mb-3">
              This AI-assisted prediction is a supportive tool and NOT a definitive diagnosis. Results should be interpreted by qualified healthcare professionals within the context of complete clinical evaluation, imaging studies, and laboratory tests. Never make treatment decisions based solely on this prediction.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Prediction generated on: {new Date()?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Button
          variant="default"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onNewPrediction}
          fullWidth
        >
          New Prediction
        </Button>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          fullWidth
        >
          Download Report
        </Button>
        <Button
          variant="outline"
          iconName="Share2"
          iconPosition="left"
          fullWidth
        >
          Share with Provider
        </Button>
      </div>
    </div>
  );
};

export default RiskResultDisplay;