import Icon from '../../../components/AppIcon';

const PredictionHistoryTable = ({ predictions = [] }) => {
  const getResultColor = (result) => {
    const lowerResult = result?.toLowerCase();
    if (lowerResult === 'high' || lowerResult === 'malignant') {
      return 'bg-error/10 text-error border-error/20';
    }
    if (lowerResult === 'medium') {
      return 'bg-warning/10 text-warning border-warning/20';
    }
    return 'bg-success/10 text-success border-success/20';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              Prediction History
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete log of all predictions across all models
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Cancer Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Result
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {predictions?.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="Inbox" size={32} className="text-muted-foreground/50" />
                    <p>No predictions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              predictions?.map((prediction) => (
                <tr key={prediction?.id} className="hover:bg-muted/30 transition-colors duration-150">
                  <td className="px-4 py-3 text-sm text-foreground">
                    <div className="flex flex-col">
                      <span className="font-medium">{prediction?.date}</span>
                      <span className="text-xs text-muted-foreground">{prediction?.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={prediction?.cancerType === 'Breast' ? 'Heart' : prediction?.cancerType === 'Lung' ? 'Wind' : 'Activity'} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                      <span>{prediction?.cancerType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                      {prediction?.model}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getResultColor(prediction?.result)}`}>
                      {prediction?.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getConfidenceColor(prediction?.confidence)}`}>
                        {prediction?.confidence}%
                      </span>
                      <div className="flex-1 max-w-[60px] h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            prediction?.confidence >= 90
                              ? 'bg-success'
                              : prediction?.confidence >= 80
                              ? 'bg-warning'
                              : 'bg-error'
                          }`}
                          style={{ width: `${prediction?.confidence}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {predictions?.length > 0 && (
        <div className="p-4 md:p-6 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            Showing {predictions?.length} {predictions?.length === 1 ? 'prediction' : 'predictions'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionHistoryTable;

