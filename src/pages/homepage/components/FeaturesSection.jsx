import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: "Brain",
      title: "Advanced ML Algorithms",
      description: "Utilizing Support Vector Machines and Random Forest models trained on validated medical datasets with peer-reviewed accuracy metrics.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: "Shield",
      title: "Clinical-Grade Accuracy",
      description: "Models achieve 95%+ accuracy rates through rigorous cross-validation and testing on diverse patient populations.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: "FileText",
      title: "IEEE Published Research",
      description: "Our methodology and results are published in peer-reviewed IEEE journals, ensuring scientific rigor and reproducibility.",
      color: "text-violet-600",
      bgColor: "bg-violet-50"
    },
    {
      icon: "Eye",
      title: "Transparent Predictions",
      description: "Every prediction includes confidence scores, feature importance analysis, and clear interpretation guidelines for clinical context.",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: "Database",
      title: "Validated Datasets",
      description: "Training data sourced from UCI Machine Learning Repository and validated medical databases with proper ethical approvals.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: "Users",
      title: "Healthcare Professional Focus",
      description: "Designed specifically for clinical decision support, not patient self-diagnosis, with appropriate medical disclaimers.",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="Zap" size={16} className="mr-2" />
            Platform Features
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research-Grade AI for Clinical Excellence
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge machine learning with medical best practices to provide reliable, transparent cancer risk assessment tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="breathing-card p-6 md:p-8 group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${feature?.bgColor} rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={24} className={feature?.color} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                {feature?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;