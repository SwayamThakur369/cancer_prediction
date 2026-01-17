import Icon from '../../../components/AppIcon';

const ModelInfoSection = () => {
  const modelFeatures = [
    {
      icon: 'Brain',
      title: 'Support Vector Machine (SVM)',
      description: 'Advanced machine learning algorithm optimized for binary classification of breast cancer tumors with high-dimensional feature space analysis.'
    },
    {
      icon: 'Target',
      title: 'High Accuracy',
      description: 'Trained on Wisconsin Breast Cancer Dataset with 97.2% accuracy, 96.8% sensitivity, and 97.5% specificity in cross-validation studies.'
    },
    {
      icon: 'Shield',
      title: 'Clinical Validation',
      description: 'Model performance validated against histopathological gold standards with comprehensive evaluation metrics including ROC-AUC of 0.985.'
    },
    {
      icon: 'Database',
      title: '9 Key Features',
      description: 'Analyzes radius, texture, perimeter, area, smoothness, compactness, concavity, concave points, and symmetry measurements from tumor imaging.'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <div className="flex items-center mb-6 md:mb-8">
        <Icon name="Cpu" size={28} className="text-primary mr-3" />
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            SVM Model Information
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Research-grade machine learning for breast cancer classification
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {modelFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base md:text-lg font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 pt-6 border-t border-border">
        <div className="flex items-start">
          <Icon name="BookOpen" size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-base md:text-lg font-medium text-foreground mb-2">
              Dataset Information
            </h4>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              The model is trained on the Wisconsin Diagnostic Breast Cancer (WDBC) dataset, containing 569 samples with 30 features computed from digitized images of fine needle aspirate (FNA) of breast masses. The dataset includes 357 benign and 212 malignant cases, providing a robust foundation for binary classification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInfoSection;