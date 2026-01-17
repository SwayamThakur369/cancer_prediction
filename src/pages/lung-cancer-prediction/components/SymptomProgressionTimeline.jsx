
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SymptomProgressionTimeline = ({ progressionData, onChange, errors }) => {
  const durationOptions = [
    { value: 'less_than_month', label: 'Less than 1 month' },
    { value: '1_3_months', label: '1-3 months' },
    { value: '3_6_months', label: '3-6 months' },
    { value: '6_12_months', label: '6-12 months' },
    { value: 'more_than_year', label: 'More than 1 year' }
  ];

  const progressionOptions = [
    { value: 'stable', label: 'Stable - No change' },
    { value: 'gradual', label: 'Gradual worsening' },
    { value: 'rapid', label: 'Rapid worsening' },
    { value: 'fluctuating', label: 'Fluctuating' }
  ];

  const handleChange = (field, value) => {
    onChange({
      ...progressionData,
      [field]: value
    });
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Symptom Progression</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Temporal pattern assessment</p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Select
          label="Symptom Duration"
          description="How long have symptoms been present?"
          options={durationOptions}
          value={progressionData?.duration}
          onChange={(value) => handleChange('duration', value)}
          error={errors?.duration}
          required
          placeholder="Select duration"
        />

        <Select
          label="Progression Pattern"
          description="How have symptoms changed over time?"
          options={progressionOptions}
          value={progressionData?.pattern}
          onChange={(value) => handleChange('pattern', value)}
          error={errors?.pattern}
          required
          placeholder="Select progression pattern"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground">Early Detection</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Symptoms present for less than 3 months may indicate early-stage disease
            </p>
          </div>

          <div className="bg-muted/30 rounded-md p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-xs md:text-sm font-medium text-foreground">Rapid Progression</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Rapidly worsening symptoms require immediate medical attention
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomProgressionTimeline;