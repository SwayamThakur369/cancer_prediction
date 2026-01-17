import Icon from '../../../components/AppIcon';

const MedicalDisclaimer = () => {
  return (
    <div className="bg-warning/5 border-l-4 border-warning rounded-lg p-4 md:p-6">
      <div className="flex items-start">
        <Icon name="AlertTriangle" size={24} className="text-warning mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Important Medical Disclaimer
          </h4>
          <div className="space-y-2 text-sm md:text-base text-muted-foreground">
            <p>
              This AI-powered prediction tool is designed for <strong>research and educational purposes only</strong>. It should not be used as the sole basis for clinical decision-making.
            </p>
            <p>
              All predictions must be validated through proper medical channels including physical examination, imaging studies, and histopathological analysis. This tool is intended to <strong>assist</strong>, not replace, professional medical judgment.
            </p>
            <p>
              Always consult with qualified healthcare professionals, including oncologists and radiologists, for accurate diagnosis and treatment planning. The SVM model's predictions are based on historical data patterns and may not account for individual patient variations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;