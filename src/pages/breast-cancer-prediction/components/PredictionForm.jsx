import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PredictionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    radiusMean: '',
    textureMean: '',
    perimeterMean: '',
    areaMean: '',
    smoothnessMean: '',
    compactnessMean: '',
    concavityMean: '',
    concavePointsMean: '',
    symmetryMean: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const formFields = [
    {
      name: 'radiusMean',
      label: 'Radius Mean',
      description: 'Mean of distances from center to points on the perimeter (6.0-30.0)',
      placeholder: 'e.g., 14.5',
      min: 6.0,
      max: 30.0,
      helpText: 'Typical range: 10-20 for benign, 15-25 for malignant'
    },
    {
      name: 'textureMean',
      label: 'Texture Mean',
      description: 'Standard deviation of gray-scale values (9.0-40.0)',
      placeholder: 'e.g., 19.3',
      min: 9.0,
      max: 40.0,
      helpText: 'Higher values indicate more irregular texture'
    },
    {
      name: 'perimeterMean',
      label: 'Perimeter Mean',
      description: 'Mean size of the core tumor perimeter (40.0-190.0)',
      placeholder: 'e.g., 91.5',
      min: 40.0,
      max: 190.0,
      helpText: 'Measured in millimeters'
    },
    {
      name: 'areaMean',
      label: 'Area Mean',
      description: 'Mean area of the tumor (140.0-2500.0)',
      placeholder: 'e.g., 654.0',
      min: 140.0,
      max: 2500.0,
      helpText: 'Measured in square millimeters'
    },
    {
      name: 'smoothnessMean',
      label: 'Smoothness Mean',
      description: 'Local variation in radius lengths (0.05-0.17)',
      placeholder: 'e.g., 0.096',
      min: 0.05,
      max: 0.17,
      helpText: 'Lower values indicate smoother boundaries'
    },
    {
      name: 'compactnessMean',
      label: 'Compactness Mean',
      description: 'Perimeter² / area - 1.0 (0.02-0.35)',
      placeholder: 'e.g., 0.104',
      min: 0.02,
      max: 0.35,
      helpText: 'Measures shape compactness'
    },
    {
      name: 'concavityMean',
      label: 'Concavity Mean',
      description: 'Severity of concave portions of the contour (0.0-0.43)',
      placeholder: 'e.g., 0.088',
      min: 0.0,
      max: 0.43,
      helpText: 'Higher values indicate more irregular boundaries'
    },
    {
      name: 'concavePointsMean',
      label: 'Concave Points Mean',
      description: 'Number of concave portions of the contour (0.0-0.21)',
      placeholder: 'e.g., 0.048',
      min: 0.0,
      max: 0.21,
      helpText: 'Counts indentations in tumor boundary'
    },
    {
      name: 'symmetryMean',
      label: 'Symmetry Mean',
      description: 'Symmetry of the tumor (0.10-0.30)',
      placeholder: 'e.g., 0.181',
      min: 0.10,
      max: 0.30,
      helpText: 'Lower values indicate more symmetrical tumors'
    }
  ];

  const validateField = (name, value) => {
    const field = formFields?.find(f => f?.name === name);
    
    if (!value || value?.trim() === '') {
      return 'This field is required';
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }

    if (numValue < field?.min || numValue > field?.max) {
      return `Value must be between ${field?.min} and ${field?.max}`;
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
    
    formFields?.forEach(field => {
      newTouched[field.name] = true;
      const error = validateField(field?.name, formData?.[field?.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors)?.length === 0) {
      const numericData = {};
      Object.keys(formData)?.forEach(key => {
        numericData[key] = parseFloat(formData?.[key]);
      });
      onSubmit(numericData);
    }
  };

  const handleReset = () => {
    setFormData({
      radiusMean: '',
      textureMean: '',
      perimeterMean: '',
      areaMean: '',
      smoothnessMean: '',
      compactnessMean: '',
      concavityMean: '',
      concavePointsMean: '',
      symmetryMean: ''
    });
    setErrors({});
    setTouched({});
  };

  const isFormValid = formFields?.every(field => 
    formData?.[field?.name] && !validateField(field?.name, formData?.[field?.name])
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {formFields?.map((field) => (
          <div key={field?.name} className="relative">
            <Input
              type="number"
              name={field?.name}
              label={field?.label}
              description={field?.description}
              placeholder={field?.placeholder}
              value={formData?.[field?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.[field?.name] ? errors?.[field?.name] : ''}
              required
              step="0.001"
              min={field?.min}
              max={field?.max}
            />
            <div className="mt-1 flex items-start">
              <Icon name="Info" size={14} className="text-muted-foreground mt-0.5 mr-1 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">{field?.helpText}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 md:pt-6">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid || isLoading}
          iconName="Activity"
          iconPosition="left"
        >
          {isLoading ? 'Analyzing...' : 'Predict Cancer Type'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleReset}
          disabled={isLoading}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Form
        </Button>
      </div>
    </form>
  );
};

export default PredictionForm;