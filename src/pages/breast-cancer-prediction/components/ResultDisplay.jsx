import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultDisplay = ({ result, onNewPrediction }) => {
  const isMalignant = result?.prediction === 'Malignant';
  const confidence = result?.confidence;

  const getConfidenceLevel = (conf) => {
    if (conf >= 90) return { label: 'Very High', color: 'text-success' };
    if (conf >= 75) return { label: 'High', color: 'text-primary' };
    if (conf >= 60) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Low', color: 'text-error' };
  };

  const confidenceLevel = getConfidenceLevel(confidence);

  const interpretationGuidelines = [
    {
      title: 'Clinical Context',
      content: 'This prediction is based on SVM machine learning analysis of tumor characteristics. It should be used as a supplementary tool in conjunction with comprehensive clinical evaluation, imaging studies, and histopathological examination.'
    },
    {
      title: 'Next Steps',
      content: isMalignant 
        ? 'A malignant prediction suggests further diagnostic procedures are warranted, including biopsy confirmation, staging studies, and consultation with an oncology specialist.' :'A benign prediction indicates lower concern, but clinical correlation is essential. Follow-up imaging and monitoring may still be recommended based on individual patient factors.'
    },
    {
      title: 'Confidence Interpretation',
      content: `The ${confidenceLevel?.label?.toLowerCase()} confidence level (${confidence}%) indicates the model's certainty in this prediction. Higher confidence suggests stronger alignment with training data patterns, but does not replace clinical judgment.`
    }
  ];

  const clinicalConsiderations = [
    'Patient medical history and risk factors',
    'Physical examination findings',
    'Imaging study results (mammography, ultrasound, MRI)',
    'Family history of breast cancer',
    'Age and hormonal status',
    'Previous breast conditions or biopsies'
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className={`p-6 md:p-8 rounded-lg border-2 ${
        isMalignant 
          ? 'bg-error/5 border-error' :'bg-success/5 border-success'
      }`}>
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex items-center">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
              isMalignant ? 'bg-error/10' : 'bg-success/10'
            }`}>
              <Icon 
                name={isMalignant ? 'AlertTriangle' : 'CheckCircle'} 
                size={28} 
                color={isMalignant ? 'var(--color-error)' : 'var(--color-success)'} 
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Prediction Result
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                SVM Model Analysis Complete
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Classification</span>
              <span className={`text-2xl md:text-3xl font-bold ${
                isMalignant ? 'text-error' : 'text-success'
              }`}>
                {result?.prediction}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  isMalignant ? 'bg-error' : 'bg-success'
                }`}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Confidence Level</span>
              <span className={`text-lg md:text-xl font-semibold ${confidenceLevel?.color}`}>
                {confidence}% ({confidenceLevel?.label})
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  confidence >= 75 ? 'bg-success' : confidence >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start">
              <Icon name="Info" size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Confidence intervals: 95% CI [{(confidence - 5)?.toFixed(1)}% - {(confidence + 5)?.toFixed(1)}%]
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 md:p-8">
        <div className="flex items-center mb-4 md:mb-6">
          <Icon name="BookOpen" size={24} className="text-primary mr-3" />
          <h4 className="text-lg md:text-xl font-semibold text-foreground">
            Clinical Interpretation Guidelines
          </h4>
        </div>

        <div className="space-y-4 md:space-y-6">
          {interpretationGuidelines?.map((guideline, index) => (
            <div key={index} className="space-y-2">
              <h5 className="text-base md:text-lg font-medium text-foreground flex items-center">
                <Icon name="ChevronRight" size={18} className="text-primary mr-2" />
                {guideline?.title}
              </h5>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-6">
                {guideline?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 md:p-8">
        <div className="flex items-center mb-4 md:mb-6">
          <Icon name="Stethoscope" size={24} className="text-primary mr-3" />
          <h4 className="text-lg md:text-xl font-semibold text-foreground">
            Clinical Considerations
          </h4>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-4">
          This AI prediction should be integrated with comprehensive clinical assessment including:
        </p>

        <ul className="space-y-2 md:space-y-3">
          {clinicalConsiderations?.map((consideration, index) => (
            <li key={index} className="flex items-start">
              <Icon name="Check" size={18} className="text-success mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm md:text-base text-muted-foreground">{consideration}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onNewPrediction}
          iconName="Plus"
          iconPosition="left"
        >
          New Prediction
        </Button>
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
  );
};

export default ResultDisplay;