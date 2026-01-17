
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SmokingHistorySection = ({ smokingData, onChange, errors }) => {
  const smokingStatusOptions = [
    { value: 'never', label: 'Never Smoked' },
    { value: 'former', label: 'Former Smoker' },
    { value: 'current', label: 'Current Smoker' }
  ];

  const handleChange = (field, value) => {
    onChange({
      ...smokingData,
      [field]: value
    });
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-600/10 flex items-center justify-center">
          <Icon name="Cigarette" size={20} className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Smoking History</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Critical risk factor assessment</p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Select
          label="Smoking Status"
          description="Current or past smoking habits"
          options={smokingStatusOptions}
          value={smokingData?.status}
          onChange={(value) => handleChange('status', value)}
          error={errors?.status}
          required
          placeholder="Select smoking status"
        />

        {(smokingData?.status === 'former' || smokingData?.status === 'current') && (
          <>
            <Input
              type="number"
              label="Years of Smoking"
              description="Total years of smoking history"
              value={smokingData?.years}
              onChange={(e) => handleChange('years', e?.target?.value)}
              error={errors?.years}
              required
              placeholder="Enter number of years"
              min="0"
              max="100"
            />

            <Input
              type="number"
              label="Cigarettes Per Day"
              description="Average number of cigarettes smoked daily"
              value={smokingData?.perDay}
              onChange={(e) => handleChange('perDay', e?.target?.value)}
              error={errors?.perDay}
              required
              placeholder="Enter average per day"
              min="0"
              max="100"
            />

            {smokingData?.status === 'former' && (
              <Input
                type="number"
                label="Years Since Quit"
                description="Years since stopping smoking"
                value={smokingData?.yearsSinceQuit}
                onChange={(e) => handleChange('yearsSinceQuit', e?.target?.value)}
                error={errors?.yearsSinceQuit}
                required
                placeholder="Enter years since quit"
                min="0"
                max="50"
              />
            )}
          </>
        )}

        <div className="bg-muted/50 rounded-md p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Smoking history is the most significant risk factor for lung cancer. Accurate information is crucial for risk assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmokingHistorySection;