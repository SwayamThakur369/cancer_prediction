import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PredictionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: '',
    psa: '',
    psaDensity: '',
    gleason: '',
    prostatevolume: '',
    dre: '',
    familyHistory: '',
    previousBiopsy: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const fieldConfig = [
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter age (40-90 years)',
      description: 'Patient age in years',
      min: 40,
      max: 90,
      tooltip: 'Age is a significant risk factor for prostate cancer. Risk increases with age, particularly after 50 years.'
    },
    {
      name: 'psa',
      label: 'PSA Level (ng/mL)',
      type: 'number',
      placeholder: 'Enter PSA level (0-100)',
      description: 'Prostate-Specific Antigen blood test result',
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'PSA levels above 4.0 ng/mL may indicate prostate cancer, though levels can be elevated for other reasons.'
    },
    {
      name: 'psaDensity',
      label: 'PSA Density',
      type: 'number',
      placeholder: 'Enter PSA density (0-1)',
      description: 'PSA level divided by prostate volume',
      min: 0,
      max: 1,
      step: 0.01,
      tooltip: 'PSA density >0.15 is considered elevated and may indicate higher cancer risk.'
    },
    {
      name: 'gleason',
      label: 'Gleason Score',
      type: 'number',
      placeholder: 'Enter Gleason score (6-10)',
      description: 'Biopsy grading score (if available)',
      min: 6,
      max: 10,
      tooltip: 'Gleason score grades cancer aggressiveness. Scores 6-7 are lower grade, 8-10 are higher grade.'
    },
    {
      name: 'prostatevolume',
      label: 'Prostate Volume (cc)',
      type: 'number',
      placeholder: 'Enter volume (10-150 cc)',
      description: 'Prostate gland volume from imaging',
      min: 10,
      max: 150,
      tooltip: 'Normal prostate volume is 20-30cc. Enlarged prostates may have lower cancer risk for same PSA level.'
    },
    {
      name: 'dre',
      label: 'DRE Finding',
      type: 'number',
      placeholder: 'Enter 0 (normal) or 1 (abnormal)',
      description: 'Digital Rectal Exam result',
      min: 0,
      max: 1,
      tooltip: 'DRE findings: 0 = Normal (smooth, symmetric), 1 = Abnormal (nodules, asymmetry, hardness)'
    },
    {
      name: 'familyHistory',
      label: 'Family History',
      type: 'number',
      placeholder: 'Enter 0 (no) or 1 (yes)',
      description: 'First-degree relative with prostate cancer',
      min: 0,
      max: 1,
      tooltip: 'Family history: 0 = No family history, 1 = Father, brother, or son diagnosed with prostate cancer'
    },
    {
      name: 'previousBiopsy',
      label: 'Previous Biopsy',
      type: 'number',
      placeholder: 'Enter 0 (no) or 1 (yes)',
      description: 'History of previous prostate biopsy',
      min: 0,
      max: 1,
      tooltip: 'Previous biopsy: 0 = No prior biopsy, 1 = Previous biopsy performed (regardless of result)'
    }
  ];

  const validateField = (name, value) => {
    const field = fieldConfig?.find(f => f?.name === name);
    if (!field) return '';

    if (!value || value === '') {
      return `${field?.label} is required`;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return `${field?.label} must be a valid number`;
    }

    if (field?.min !== undefined && numValue < field?.min) {
      return `${field?.label} must be at least ${field?.min}`;
    }

    if (field?.max !== undefined && numValue > field?.max) {
      return `${field?.label} must not exceed ${field?.max}`;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched?.[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e?.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const newErrors = {};
    const newTouched = {};

    fieldConfig?.forEach(field => {
      newTouched[field.name] = true;
      const error = validateField(field?.name, formData?.[field?.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors)?.length === 0) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      psa: '',
      psaDensity: '',
      gleason: '',
      prostatevolume: '',
      dre: '',
      familyHistory: '',
      previousBiopsy: ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {fieldConfig?.map((field) => (
          <div key={field?.name} className="relative">
            <Input
              type={field?.type}
              name={field?.name}
              label={field?.label}
              placeholder={field?.placeholder}
              description={field?.description}
              value={formData?.[field?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.[field?.name] ? errors?.[field?.name] : ''}
              required
              min={field?.min}
              max={field?.max}
              step={field?.step}
              disabled={isLoading}
            />
            {field?.tooltip && (
              <div className="group absolute top-0 right-0 mt-1 mr-1">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={`Information about ${field?.label}`}
                >
                  <Icon name="Info" size={16} />
                </button>
                <div className="invisible group-hover:visible absolute right-0 top-6 w-64 p-3 bg-popover border border-border rounded-lg shadow-clinical z-10 text-xs text-popover-foreground">
                  {field?.tooltip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="Activity"
          iconPosition="left"
          className="flex-1"
        >
          {isLoading ? 'Analyzing...' : 'Predict Risk'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1 sm:flex-initial"
        >
          Reset Form
        </Button>
      </div>
    </form>
  );
};

export default PredictionForm;