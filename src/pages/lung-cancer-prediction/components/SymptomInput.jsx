import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SymptomInput = ({ field, value, onChange, error }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const severityOptions = [
    { value: '1', label: 'Mild' },
    { value: '2', label: 'Moderate' },
    { value: '3', label: 'Severe' },
    { value: '4', label: 'Very Severe' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const renderInput = () => {
    switch (field?.type) {
      case 'select':
        return (
          <Select
            label={field?.label}
            description={field?.description}
            options={field?.options || yesNoOptions}
            value={value}
            onChange={onChange}
            error={error}
            required={field?.required}
            placeholder={field?.placeholder}
          />
        );
      case 'severity':
        return (
          <Select
            label={field?.label}
            description={field?.description}
            options={severityOptions}
            value={value}
            onChange={onChange}
            error={error}
            required={field?.required}
            placeholder="Select severity level"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            label={field?.label}
            description={field?.description}
            value={value}
            onChange={(e) => onChange(e?.target?.value)}
            error={error}
            required={field?.required}
            placeholder={field?.placeholder}
            min={field?.min}
            max={field?.max}
          />
        );
      default:
        return (
          <Input
            type="text"
            label={field?.label}
            description={field?.description}
            value={value}
            onChange={(e) => onChange(e?.target?.value)}
            error={error}
            required={field?.required}
            placeholder={field?.placeholder}
          />
        );
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          {renderInput()}
        </div>
        {field?.tooltip && (
          <div className="relative mt-8">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="More information"
            >
              <Icon name="Info" size={18} />
            </button>
            {showTooltip && (
              <div className="absolute left-full ml-2 top-0 w-64 p-3 bg-popover border border-border rounded-md shadow-clinical z-50">
                <p className="text-sm text-foreground">{field?.tooltip}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomInput;