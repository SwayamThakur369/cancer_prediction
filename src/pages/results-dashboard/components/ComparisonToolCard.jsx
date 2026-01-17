import { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComparisonToolCard = () => {
  const [comparison, setComparison] = useState({
    model1: 'svm',
    model2: 'random-forest',
    metric: 'accuracy'
  });

  const modelOptions = [
    { value: 'svm', label: 'Support Vector Machine (SVM)' },
    { value: 'random-forest', label: 'Random Forest' },
    { value: 'logistic-regression', label: 'Logistic Regression' },
    { value: 'neural-network', label: 'Neural Network' }
  ];

  const metricOptions = [
    { value: 'accuracy', label: 'Accuracy' },
    { value: 'precision', label: 'Precision' },
    { value: 'recall', label: 'Recall' },
    { value: 'f1-score', label: 'F1 Score' }
  ];

  const handleCompare = () => {
    console.log('Comparing models:', comparison);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Model Comparison Tool</h3>
          <p className="text-sm text-muted-foreground">Compare performance across different ML models</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon name="GitCompare" size={20} className="text-primary" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Model 1"
            options={modelOptions}
            value={comparison?.model1}
            onChange={(value) => setComparison({ ...comparison, model1: value })}
          />
          
          <Select
            label="Model 2"
            options={modelOptions}
            value={comparison?.model2}
            onChange={(value) => setComparison({ ...comparison, model2: value })}
          />
        </div>

        <Select
          label="Comparison Metric"
          options={metricOptions}
          value={comparison?.metric}
          onChange={(value) => setComparison({ ...comparison, metric: value })}
        />

        <Button
          variant="default"
          onClick={handleCompare}
          iconName="Play"
          iconPosition="left"
          fullWidth
        >
          Run Comparison
        </Button>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="relative bg-muted/30 rounded-lg border-2 border-dashed border-border aspect-[16/9] flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Icon name="BarChart3" size={24} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Comparison results will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonToolCard;