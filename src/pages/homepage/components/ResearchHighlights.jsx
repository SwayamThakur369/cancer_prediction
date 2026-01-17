import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResearchHighlights = () => {
  const highlights = [
    {
      metric: "95.8%",
      label: "Average Model Accuracy",
      description: "Across all three cancer prediction models with cross-validation",
      icon: "TrendingUp",
      color: "text-emerald-600"
    },
    {
      metric: "3",
      label: "Cancer Types Supported",
      description: "Breast, Lung, and Prostate cancer prediction capabilities",
      icon: "Activity",
      color: "text-blue-600"
    },
    {
      metric: "10K+",
      label: "Training Data Points",
      description: "Validated medical records from UCI ML Repository",
      icon: "Database",
      color: "text-violet-600"
    },
    {
      metric: "IEEE",
      label: "Published Research",
      description: "Peer-reviewed methodology and results validation",
      icon: "Award",
      color: "text-amber-600"
    }
  ];

  const algorithms = [
    {
      name: "Support Vector Machine",
      cancerType: "Breast Cancer",
      accuracy: "96.5%",
      features: "9 clinical parameters",
      icon: "Heart",
      color: "bg-pink-500"
    },
    {
      name: "Random Forest",
      cancerType: "Lung Cancer",
      accuracy: "95.2%",
      features: "13 symptom indicators",
      icon: "Wind",
      color: "bg-slate-500"
    },
    {
      name: "Random Forest",
      cancerType: "Prostate Cancer",
      accuracy: "95.7%",
      features: "8 clinical markers",
      icon: "User",
      color: "bg-blue-500"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="BookOpen" size={16} className="mr-2" />
            Research Highlights
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Evidence-Based Performance Metrics
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Our models are rigorously tested and validated against established medical datasets with transparent reporting of all performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {highlights?.map((highlight, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-clinical transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon name={highlight?.icon} size={24} className={highlight?.color} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {highlight?.metric}
              </div>
              <div className="text-sm font-medium text-foreground mb-2">
                {highlight?.label}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                {highlight?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 border border-border shadow-clinical">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">
            Algorithm Performance Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {algorithms?.map((algo, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-lg p-6 border border-border hover:border-primary transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${algo?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={algo?.icon} size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{algo?.accuracy}</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{algo?.cancerType}</h4>
                <p className="text-sm text-muted-foreground mb-3">{algo?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Database" size={14} className="mr-1" />
                  {algo?.features}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Full Research Paper
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchHighlights;