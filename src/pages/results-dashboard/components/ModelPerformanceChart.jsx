import Icon from '../../../components/AppIcon';

const ModelPerformanceChart = ({ title, description, chartType = 'accuracy' }) => {
  const getChartIcon = () => {
    switch (chartType) {
      case 'accuracy':
        return 'BarChart3';
      case 'roc':
        return 'TrendingUp';
      case 'confusion':
        return 'Grid3x3';
      default:
        return 'LineChart';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon name={getChartIcon()} size={20} className="text-primary" />
        </div>
      </div>

      <div className="relative bg-muted/30 rounded-lg border-2 border-dashed border-border aspect-[16/9] flex flex-col items-center justify-center p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10">
            <Icon name={getChartIcon()} size={32} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-base md:text-lg font-semibold text-foreground">
              Chart Visualization
            </h4>
            <p className="text-sm text-muted-foreground max-w-md">
              {chartType === 'accuracy' && 'Model accuracy comparison across different cancer types will be displayed here'}
              {chartType === 'roc' && 'ROC curve showing true positive rate vs false positive rate will be displayed here'}
              {chartType === 'confusion' && 'Confusion matrix showing prediction accuracy breakdown will be displayed here'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>Chart.js / D3.js integration ready</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Breast Cancer</p>
            <p className="text-lg font-semibold text-foreground">94.2%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Lung Cancer</p>
            <p className="text-lg font-semibold text-foreground">91.8%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Prostate Cancer</p>
            <p className="text-lg font-semibold text-foreground">93.5%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Overall</p>
            <p className="text-lg font-semibold text-primary">93.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformanceChart;