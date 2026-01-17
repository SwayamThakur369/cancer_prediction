import Icon from '../../../components/AppIcon';

const AccuracyMetricsCard = ({ cancerType, metrics }) => {
  const getCancerTypeColor = (type) => {
    if (type === 'Breast') return 'bg-pink-600';
    if (type === 'Lung') return 'bg-slate-600';
    return 'bg-blue-600';
  };

  const getMetricIcon = (metricName) => {
    switch (metricName) {
      case 'Accuracy':
        return 'Target';
      case 'Precision':
        return 'Crosshair';
      case 'Recall':
        return 'Search';
      case 'F1 Score':
        return 'Zap';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg ${getCancerTypeColor(cancerType)} flex items-center justify-center`}>
          <Icon name="Activity" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{cancerType} Cancer</h3>
          <p className="text-sm text-muted-foreground">Model Performance Metrics</p>
        </div>
      </div>
      <div className="space-y-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name={getMetricIcon(metric?.name)} size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{metric?.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{metric?.value}%</span>
            </div>
            <div className="relative w-full bg-muted rounded-full h-2">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                style={{ width: `${metric?.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Predictions</span>
          <span className="font-semibold text-foreground">{metrics?.[0]?.totalPredictions || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default AccuracyMetricsCard;