import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultDisplay = ({ result, onNewPrediction }) => {
  const getRiskLevel = (percentage) => {
    if (percentage < 20) return { level: 'Low', color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle2' };
    if (percentage < 50) return { level: 'Moderate', color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertTriangle' };
    return { level: 'High', color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' };
  };

  const riskInfo = getRiskLevel(result?.riskPercentage);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="breathing-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Prediction Result</h3>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${riskInfo?.bgColor}`}>
            <Icon name={riskInfo?.icon} size={20} className={riskInfo?.color} />
            <span className={`text-sm md:text-base font-semibold ${riskInfo?.color}`}>
              {riskInfo?.level} Risk
            </span>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="text-center py-6 md:py-8">
            <div className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-4 md:mb-6">
              <div className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${riskInfo?.color}`}>
                  {result?.riskPercentage}%
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">Risk Score</div>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on the clinical parameters provided, the Random Forest model predicts a{' '}
              <span className={`font-semibold ${riskInfo?.color}`}>{riskInfo?.level?.toLowerCase()} risk</span>{' '}
              of prostate cancer with a confidence score of {result?.riskPercentage}%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="breathing-card p-4 md:p-6 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Brain" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-muted-foreground">Model Used</div>
                  <div className="text-sm md:text-base font-semibold text-foreground">Random Forest</div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Ensemble learning algorithm with high accuracy for prostate cancer prediction
              </p>
            </div>

            <div className="breathing-card p-4 md:p-6 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-muted-foreground">Model Accuracy</div>
                  <div className="text-sm md:text-base font-semibold text-foreground">92.5%</div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Validated on clinical dataset with cross-validation
              </p>
            </div>

            <div className="breathing-card p-4 md:p-6 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-muted-foreground">Analysis Time</div>
                  <div className="text-sm md:text-base font-semibold text-foreground">&lt;1 second</div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Real-time prediction with instant results
              </p>
            </div>
          </div>

          <div className="breathing-card p-4 md:p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="text-sm md:text-base font-semibold text-foreground">Clinical Interpretation</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  This prediction is based on machine learning analysis of clinical parameters including PSA levels, 
                  prostate volume, DRE findings, and patient history. The result should be interpreted by a qualified 
                  healthcare professional in conjunction with other diagnostic tests and clinical examination.
                </p>
                {result?.riskPercentage >= 50 && (
                  <p className="text-xs md:text-sm text-error font-medium">
                    High risk prediction warrants immediate consultation with a urologist for further evaluation 
                    and potential biopsy consideration.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              variant="default"
              onClick={onNewPrediction}
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              New Prediction
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="flex-1 sm:flex-initial"
            >
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;