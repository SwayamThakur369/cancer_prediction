import Icon from '../../../components/AppIcon';

const InfoPanel = () => {
  const keyFactors = [
    {
      icon: 'Activity',
      title: 'PSA Level',
      description: 'Prostate-Specific Antigen blood test measuring protein levels produced by prostate cells'
    },
    {
      icon: 'Ruler',
      title: 'Prostate Volume',
      description: 'Size of prostate gland measured through imaging, affecting PSA density calculations'
    },
    {
      icon: 'Stethoscope',
      title: 'DRE Findings',
      description: 'Digital Rectal Exam results detecting abnormalities in prostate texture and shape'
    },
    {
      icon: 'Users',
      title: 'Family History',
      description: 'Genetic predisposition through first-degree relatives with prostate cancer diagnosis'
    }
  ];

  const ageRiskFactors = [
    { range: '40-49 years', risk: 'Low baseline risk', percentage: '1 in 350' },
    { range: '50-59 years', risk: 'Moderate risk increase', percentage: '1 in 52' },
    { range: '60-69 years', risk: 'Elevated risk period', percentage: '1 in 19' },
    { range: '70+ years', risk: 'Highest risk category', percentage: '1 in 11' }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="breathing-card p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Info" size={24} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">About Prostate Cancer Prediction</h3>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          This AI-powered prediction tool uses a Random Forest machine learning algorithm trained on clinical 
          datasets to assess prostate cancer risk. The model analyzes eight key clinical parameters to provide 
          a percentage-based risk assessment, supporting healthcare professionals in early detection and 
          treatment planning decisions.
        </p>
      </div>
      <div className="breathing-card p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Key Clinical Factors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {keyFactors?.map((factor, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={factor?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{factor?.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{factor?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="breathing-card p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Age-Adjusted Risk Factors</h3>
        <div className="space-y-3 md:space-y-4">
          {ageRiskFactors?.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/50">
              <div>
                <div className="text-sm md:text-base font-semibold text-foreground">{factor?.range}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{factor?.risk}</div>
              </div>
              <div className="text-xs md:text-sm font-medium text-primary">{factor?.percentage}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="breathing-card p-6 md:p-8 bg-warning/10 border border-warning/20">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="text-sm md:text-base font-semibold text-foreground">Medical Disclaimer</h4>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              This prediction tool is designed for research and educational purposes to support clinical 
              decision-making. It should not replace professional medical diagnosis, examination, or treatment. 
              Always consult with qualified healthcare professionals for accurate diagnosis and personalized 
              treatment recommendations. The model's predictions are based on statistical patterns and may not 
              account for all individual clinical factors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;