import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import FilterPanel from './components/FilterPanel';
import StatisticsCard from './components/StatisticsCard';
import PredictionHistoryTable from './components/PredictionHistoryTable';
import ModelPerformanceChart from './components/ModelPerformanceChart';
import AccuracyMetricsCard from './components/AccuracyMetricsCard';
import ComparisonToolCard from './components/ComparisonToolCard';

const ResultsDashboard = () => {
  const [filters, setFilters] = useState({
    cancerType: 'all',
    dateRange: '30days',
    riskLevel: 'all'
  });

  const [filteredPredictions, setFilteredPredictions] = useState([]);

  const mockPredictions = [
    {
      id: 1,
      date: '2026-01-16',
      time: '14:32:15',
      cancerType: 'Breast',
      model: 'SVM',
      result: 'Benign',
      confidence: 94.2
    },
    {
      id: 2,
      date: '2026-01-16',
      time: '11:18:42',
      cancerType: 'Lung',
      model: 'Random Forest',
      result: 'High',
      confidence: 87.5
    },
    {
      id: 3,
      date: '2026-01-15',
      time: '16:45:23',
      cancerType: 'Prostate',
      model: 'Random Forest',
      result: 'Low',
      confidence: 91.8
    },
    {
      id: 4,
      date: '2026-01-15',
      time: '09:22:11',
      cancerType: 'Breast',
      model: 'SVM',
      result: 'Malignant',
      confidence: 96.3
    },
    {
      id: 5,
      date: '2026-01-14',
      time: '13:55:37',
      cancerType: 'Lung',
      model: 'Random Forest',
      result: 'Medium',
      confidence: 82.4
    },
    {
      id: 6,
      date: '2026-01-14',
      time: '10:12:58',
      cancerType: 'Prostate',
      model: 'Random Forest',
      result: 'Medium',
      confidence: 88.9
    },
    {
      id: 7,
      date: '2026-01-13',
      time: '15:38:44',
      cancerType: 'Breast',
      model: 'SVM',
      result: 'Benign',
      confidence: 93.7
    },
    {
      id: 8,
      date: '2026-01-13',
      time: '08:47:19',
      cancerType: 'Lung',
      model: 'Random Forest',
      result: 'Low',
      confidence: 89.2
    },
    {
      id: 9,
      date: '2026-01-12',
      time: '14:23:56',
      cancerType: 'Prostate',
      model: 'Random Forest',
      result: 'High',
      confidence: 92.6
    },
    {
      id: 10,
      date: '2026-01-12',
      time: '11:09:33',
      cancerType: 'Breast',
      model: 'SVM',
      result: 'Benign',
      confidence: 95.1
    },
    {
      id: 11,
      date: '2026-01-11',
      time: '16:52:27',
      cancerType: 'Lung',
      model: 'Random Forest',
      result: 'High',
      confidence: 86.8
    },
    {
      id: 12,
      date: '2026-01-11',
      time: '09:34:15',
      cancerType: 'Prostate',
      model: 'Random Forest',
      result: 'Low',
      confidence: 90.4
    },
    {
      id: 13,
      date: '2026-01-10',
      time: '13:17:42',
      cancerType: 'Breast',
      model: 'SVM',
      result: 'Malignant',
      confidence: 97.2
    },
    {
      id: 14,
      date: '2026-01-10',
      time: '10:41:28',
      cancerType: 'Lung',
      model: 'Random Forest',
      result: 'Medium',
      confidence: 84.3
    },
    {
      id: 15,
      date: '2026-01-09',
      time: '15:26:51',
      cancerType: 'Prostate',
      model: 'Random Forest',
      result: 'Medium',
      confidence: 87.7
    }
  ];

  const breastCancerMetrics = [
    { name: 'Accuracy', value: 94.2, totalPredictions: 1247 },
    { name: 'Precision', value: 93.8, totalPredictions: 1247 },
    { name: 'Recall', value: 94.5, totalPredictions: 1247 },
    { name: 'F1 Score', value: 94.1, totalPredictions: 1247 }
  ];

  const lungCancerMetrics = [
    { name: 'Accuracy', value: 91.8, totalPredictions: 892 },
    { name: 'Precision', value: 90.9, totalPredictions: 892 },
    { name: 'Recall', value: 92.3, totalPredictions: 892 },
    { name: 'F1 Score', value: 91.6, totalPredictions: 892 }
  ];

  const prostateCancerMetrics = [
    { name: 'Accuracy', value: 93.5, totalPredictions: 1056 },
    { name: 'Precision', value: 92.7, totalPredictions: 1056 },
    { name: 'Recall', value: 93.9, totalPredictions: 1056 },
    { name: 'F1 Score', value: 93.3, totalPredictions: 1056 }
  ];

  useEffect(() => {
    let filtered = [...mockPredictions];

    if (filters?.cancerType !== 'all') {
      filtered = filtered?.filter(p => p?.cancerType?.toLowerCase() === filters?.cancerType);
    }

    if (filters?.riskLevel !== 'all') {
      filtered = filtered?.filter(p => {
        const result = p?.result?.toLowerCase();
        if (filters?.riskLevel === 'high') return result === 'high' || result === 'malignant';
        if (filters?.riskLevel === 'medium') return result === 'medium';
        if (filters?.riskLevel === 'low') return result === 'low' || result === 'benign';
        return true;
      });
    }

    setFilteredPredictions(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Time', 'Cancer Type', 'Model', 'Result', 'Confidence'],
      ...filteredPredictions?.map(p => [
        p?.date,
        p?.time,
        p?.cancerType,
        p?.model,
        p?.result,
        `${p?.confidence}%`
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `predictions_export_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Results Dashboard - CancerPredict ML</title>
        <meta name="description" content="Comprehensive prediction analysis with visual data representation and historical tracking of cancer predictions across all models" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="BarChart3" size={28} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    Results Dashboard
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Comprehensive prediction analysis and model performance metrics
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Transparency in every prediction
                </span>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <FilterPanel onFilterChange={handleFilterChange} onExport={handleExport} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatisticsCard
                  title="Total Predictions"
                  value="3,195"
                  subtitle="Across all cancer types"
                  icon="Activity"
                  color="primary"
                  trend="up"
                  trendValue="+12.5%"
                />
                <StatisticsCard
                  title="Average Accuracy"
                  value="93.2%"
                  subtitle="Combined model performance"
                  icon="Target"
                  color="success"
                  trend="up"
                  trendValue="+2.3%"
                />
                <StatisticsCard
                  title="High Risk Cases"
                  value="287"
                  subtitle="Requiring immediate attention"
                  icon="AlertTriangle"
                  color="warning"
                  trend="down"
                  trendValue="-5.8%"
                />
                <StatisticsCard
                  title="Models Active"
                  value="3"
                  subtitle="SVM & Random Forest"
                  icon="Cpu"
                  color="primary"
                  trend="neutral"
                  trendValue="Stable"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <ModelPerformanceChart
                  title="Model Accuracy Comparison"
                  description="Performance metrics across different cancer types"
                  chartType="accuracy"
                />
                <ModelPerformanceChart
                  title="ROC Curve Analysis"
                  description="True positive rate vs false positive rate"
                  chartType="roc"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <AccuracyMetricsCard
                  cancerType="Breast"
                  metrics={breastCancerMetrics}
                />
                <AccuracyMetricsCard
                  cancerType="Lung"
                  metrics={lungCancerMetrics}
                />
                <AccuracyMetricsCard
                  cancerType="Prostate"
                  metrics={prostateCancerMetrics}
                />
              </div>

              <PredictionHistoryTable predictions={filteredPredictions} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <ComparisonToolCard />
                <ModelPerformanceChart
                  title="Confusion Matrix"
                  description="Prediction accuracy breakdown by classification"
                  chartType="confusion"
                />
              </div>

              <div className="bg-card rounded-lg shadow-sm border border-border p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-warning/10 flex-shrink-0">
                    <Icon name="Info" size={24} className="text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Medical Disclaimer
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This dashboard presents AI-assisted predictions for research and educational purposes only. All results should be interpreted by qualified healthcare professionals within the appropriate clinical context. These predictions are not a substitute for professional medical diagnosis, treatment, or advice. Always consult with licensed medical practitioners for clinical decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResultsDashboard;