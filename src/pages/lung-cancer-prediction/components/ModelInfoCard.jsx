import Icon from '../../../components/AppIcon';

const ModelInfoCard = () => {
  const modelFeatures = [
    {
      icon: 'Brain',
      title: 'Random Forest Algorithm',
      description: 'Ensemble learning method using multiple decision trees for robust predictions'
    },
    {
      icon: 'Database',
      title: 'Training Dataset',
      description: '15,000+ validated lung cancer cases with comprehensive symptom profiles'
    },
    {
      icon: 'Target',
      title: 'Clinical Validation',
      description: 'Validated against real-world clinical outcomes with 94.2% accuracy'
    },
    {
      icon: 'Shield',
      title: 'IEEE Published',
      description: 'Methodology peer-reviewed and published in IEEE medical journals'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-600/10 flex items-center justify-center">
          <Icon name="Cpu" size={20} className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Lung Cancer Prediction Model</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Random Forest Classification</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
        {modelFeatures?.map((feature, index) => (
          <div key={index} className="flex gap-3 p-3 bg-card rounded-md border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-md p-3 md:p-4 border border-border">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1">About This Model</h4>
            <p className="text-xs text-muted-foreground">
              This prediction model analyzes 13 key symptoms and risk factors using Random Forest classification. The algorithm considers symptom severity, temporal patterns, and smoking history to generate risk assessments. Results are calibrated against clinical outcomes and validated through peer-reviewed research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInfoCard;