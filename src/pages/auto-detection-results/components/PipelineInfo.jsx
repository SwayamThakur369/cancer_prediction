import Icon from '../../../components/AppIcon';

const PipelineInfo = ({ stage1, stage2 }) => {
  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center mb-6">
        <Icon name="Cpu" size={24} className="text-primary mr-3" />
        <h4 className="text-lg md:text-xl font-semibold text-foreground">
          ML Pipeline Used
        </h4>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-primary">1</span>
            </div>
            <h5 className="text-base md:text-lg font-medium text-foreground">Stage 1: Cancer Type Classifier</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="text-sm md:text-base text-muted-foreground">
              {stage1}
            </p>
            <div className="bg-primary/5 rounded-md p-3">
              <p className="text-xs md:text-sm text-muted-foreground">
                <strong>Function:</strong> Analyzes general symptoms and clinical data to predict the most likely cancer type from breast, lung, and prostate cancer.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Icon name="ArrowDown" size={24} className="text-primary" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-success">2</span>
            </div>
            <h5 className="text-base md:text-lg font-medium text-foreground">Stage 2: Specialized Model</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="text-sm md:text-base text-muted-foreground">
              {stage2}
            </p>
            <div className="bg-success/5 rounded-md p-3">
              <p className="text-xs md:text-sm text-muted-foreground">
                <strong>Function:</strong> Automatically activates the cancer-specific ML model for detailed risk prediction and clinical assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start">
          <Icon name="Zap" size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <h5 className="text-sm md:text-base font-medium text-foreground mb-1">Intelligent Pipeline</h5>
            <p className="text-xs md:text-sm text-muted-foreground">
              This two-stage approach eliminates manual cancer type selection and provides comprehensive multi-cancer screening with specialized model activation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineInfo;