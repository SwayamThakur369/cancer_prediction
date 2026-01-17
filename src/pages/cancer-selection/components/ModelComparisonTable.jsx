import Icon from '../../../components/AppIcon';

const ModelComparisonTable = () => {
  const comparisonData = [
    {
      cancer: "Breast Cancer",
      model: "Support Vector Machine (SVM)",
      accuracy: "96.5",
      sensitivity: "94.2",
      specificity: "98.1",
      color: "#ec4899"
    },
    {
      cancer: "Lung Cancer",
      model: "Random Forest",
      accuracy: "94.8",
      sensitivity: "92.5",
      specificity: "96.3",
      color: "#6b7280"
    },
    {
      cancer: "Prostate Cancer",
      model: "Random Forest",
      accuracy: "93.2",
      sensitivity: "91.8",
      specificity: "94.7",
      color: "#3b82f6"
    }
  ];

  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="BarChart3" size={24} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Model Performance Comparison
        </h3>
      </div>
      <p className="text-sm md:text-base text-muted-foreground mb-6">
        Comparative analysis of machine learning models used for each cancer type prediction, validated through cross-validation and independent test datasets.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-foreground">
                Cancer Type
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-foreground">
                ML Model
              </th>
              <th className="text-center py-3 px-4 text-xs md:text-sm font-semibold text-foreground">
                Accuracy
              </th>
              <th className="text-center py-3 px-4 text-xs md:text-sm font-semibold text-foreground">
                Sensitivity
              </th>
              <th className="text-center py-3 px-4 text-xs md:text-sm font-semibold text-foreground">
                Specificity
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData?.map((row, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: row?.color }}
                    />
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      {row?.cancer}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs md:text-sm text-muted-foreground">
                  {row?.model}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    {row?.accuracy}%
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-xs md:text-sm text-muted-foreground">
                  {row?.sensitivity}%
                </td>
                <td className="py-4 px-4 text-center text-xs md:text-sm text-muted-foreground">
                  {row?.specificity}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 md:p-5 rounded-lg bg-primary/5 border border-primary/10">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-medium text-foreground mb-1">
              Performance Metrics Explained
            </p>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              <strong>Accuracy:</strong> Overall correctness of predictions. <strong>Sensitivity:</strong> Ability to correctly identify positive cases. <strong>Specificity:</strong> Ability to correctly identify negative cases. All metrics validated using IEEE-standard cross-validation protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparisonTable;