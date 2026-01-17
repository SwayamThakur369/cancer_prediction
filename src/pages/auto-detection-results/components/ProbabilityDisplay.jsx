import Icon from '../../../components/AppIcon';

const ProbabilityDisplay = ({ probabilities, detectedType }) => {
  const cancerTypes = [
    { name: 'Breast Cancer', key: 'breast', color: 'text-pink-600', bgColor: 'bg-pink-600', icon: 'Heart' },
    { name: 'Lung Cancer', key: 'lung', color: 'text-blue-600', bgColor: 'bg-blue-600', icon: 'Wind' },
    { name: 'Prostate Cancer', key: 'prostate', color: 'text-purple-600', bgColor: 'bg-purple-600', icon: 'Activity' }
  ];

  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center mb-6">
        <Icon name="BarChart3" size={24} className="text-primary mr-3" />
        <h4 className="text-lg md:text-xl font-semibold text-foreground">
          Cancer Type Probabilities
        </h4>
      </div>

      <div className="space-y-4">
        {cancerTypes?.map((type) => {
          const probability = probabilities?.[type?.key] || 0;
          const isDetected = detectedType === type?.name;

          return (
            <div key={type?.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name={type?.icon} size={18} className={`${type?.color} mr-2`} />
                  <span className={`text-sm md:text-base font-medium ${
                    isDetected ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  }`}>
                    {type?.name}
                  </span>
                  {isDetected && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Detected
                    </span>
                  )}
                </div>
                <span className={`text-base md:text-lg font-semibold ${
                  isDetected ? type?.color : 'text-muted-foreground'
                }`}>
                  {probability}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${type?.bgColor}`}
                  style={{ width: `${probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Probabilities are calculated based on symptom patterns, clinical indicators, and demographic factors. The highest probability indicates the most likely cancer type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityDisplay;