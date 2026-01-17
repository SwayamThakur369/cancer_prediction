import Icon from '../../../components/AppIcon';

const RecommendationPanel = ({ detectedType, riskLevel, recommendation }) => {
  const getRiskIcon = (level) => {
    switch (level) {
      case 'High':
        return { icon: 'AlertCircle', color: 'text-error', bgColor: 'bg-error/10' };
      case 'Medium':
        return { icon: 'AlertTriangle', color: 'text-warning', bgColor: 'bg-warning/10' };
      case 'Low':
        return { icon: 'CheckCircle2', color: 'text-success', bgColor: 'bg-success/10' };
      default:
        return { icon: 'Info', color: 'text-primary', bgColor: 'bg-primary/10' };
    }
  };

  const riskStyle = getRiskIcon(riskLevel);

  const getRecommendations = () => {
    if (detectedType === 'Low Risk') {
      return [
        'Continue regular health screenings as recommended by your healthcare provider',
        'Maintain a healthy lifestyle with balanced diet and regular exercise',
        'Monitor any new symptoms and report them to your doctor',
        'Schedule annual check-ups for preventive care'
      ];
    }

    const baseRecommendations = [
      `Schedule consultation with a specialist for ${detectedType} assessment`,
      'Undergo comprehensive diagnostic testing and imaging studies',
      'Provide complete medical history and family history to your healthcare provider',
      'Follow up with recommended screening protocols'
    ];

    if (riskLevel === 'High') {
      return [
        `Immediate consultation with oncology specialist for ${detectedType} evaluation`,
        'Comprehensive diagnostic workup including biopsy and advanced imaging',
        'Discuss treatment options and clinical trial eligibility',
        ...baseRecommendations?.slice(2)
      ];
    }

    return baseRecommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${riskStyle?.bgColor} flex items-center justify-center mr-3`}>
          <Icon name={riskStyle?.icon} size={24} className={riskStyle?.color} />
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-foreground">
            Clinical Recommendations
          </h4>
          <p className="text-sm text-muted-foreground">
            {riskLevel} Risk Level - {detectedType}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Stethoscope" size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h5 className="text-sm md:text-base font-medium text-foreground mb-1">Primary Recommendation</h5>
              <p className="text-sm md:text-base text-muted-foreground">{recommendation}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-sm md:text-base font-medium text-foreground">Recommended Actions:</h5>
          <ul className="space-y-2">
            {recommendations?.map((rec, index) => (
              <li key={index} className="flex items-start">
                <Icon name="ChevronRight" size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {riskLevel === 'High' && (
          <div className="bg-error/5 border-l-4 border-error rounded-md p-4 mt-4">
            <div className="flex items-start">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h5 className="text-sm md:text-base font-semibold text-error mb-1">Urgent Action Required</h5>
                <p className="text-xs md:text-sm text-muted-foreground">
                  High risk prediction warrants immediate medical attention. Do not delay consultation with healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs md:text-sm text-muted-foreground">
              These recommendations are AI-generated guidance based on detection results. Always consult with qualified healthcare professionals for personalized medical advice and treatment planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;