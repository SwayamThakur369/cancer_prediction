import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UnifiedForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    smoking: '',
    alcohol: '',
    familyHistory: '',
    fatigue: '',
    weightLoss: '',
    chestPain: '',
    lumps: '',
    shortnessOfBreath: '',
    painLevel: '',
    appetiteLoss: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const severityOptions = [
    { value: '0', label: 'None' },
    { value: '1', label: 'Mild' },
    { value: '2', label: 'Moderate' },
    { value: '3', label: 'Severe' },
    { value: '4', label: 'Very Severe' }
  ];

  const formFields = [
    {
      section: 'Demographics & History',
      fields: [
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          placeholder: 'e.g., 45',
          min: 18,
          max: 120,
          tooltip: 'Age is a significant risk factor for most cancers'
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          options: genderOptions,
          placeholder: 'Select gender',
          tooltip: 'Certain cancers are gender-specific or more common in specific genders'
        },
        {
          name: 'smoking',
          label: 'Smoking History',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Smoking significantly increases lung cancer risk and affects other cancer types'
        },
        {
          name: 'alcohol',
          label: 'Alcohol Consumption',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Regular alcohol consumption can increase cancer risk'
        },
        {
          name: 'familyHistory',
          label: 'Family History of Cancer',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Family history indicates genetic predisposition to certain cancers'
        }
      ]
    },
    {
      section: 'Symptoms & Clinical Indicators',
      fields: [
        {
          name: 'fatigue',
          label: 'Fatigue Level',
          type: 'select',
          options: severityOptions,
          placeholder: 'Select severity',
          tooltip: 'Persistent fatigue can be an early cancer symptom'
        },
        {
          name: 'weightLoss',
          label: 'Unexplained Weight Loss',
          type: 'select',
          options: severityOptions,
          placeholder: 'Select severity',
          tooltip: 'Unintentional weight loss may indicate cancer progression'
        },
        {
          name: 'chestPain',
          label: 'Chest Pain',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Chest pain can indicate lung or breast cancer'
        },
        {
          name: 'lumps',
          label: 'Lumps / Abnormal Growth',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Lumps or masses are key indicators for breast and other cancers'
        },
        {
          name: 'shortnessOfBreath',
          label: 'Shortness of Breath',
          type: 'select',
          options: yesNoOptions,
          placeholder: 'Select option',
          tooltip: 'Breathing difficulties may indicate lung cancer'
        },
        {
          name: 'painLevel',
          label: 'General Pain Level',
          type: 'select',
          options: severityOptions,
          placeholder: 'Select severity',
          tooltip: 'Persistent pain can be associated with various cancer types'
        },
        {
          name: 'appetiteLoss',
          label: 'Appetite Loss',
          type: 'select',
          options: severityOptions,
          placeholder: 'Select severity',
          tooltip: 'Loss of appetite is a common symptom in cancer patients'
        }
      ]
    }
  ];

  const validateField = (name, value) => {
    if (!value || value?.trim() === '') {
      return 'This field is required';
    }

    if (name === 'age') {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 18 || numValue > 120) {
        return 'Please enter a valid age between 18 and 120';
      }
    }

    return '';
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched?.[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData?.[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const newErrors = {};
    const newTouched = {};

    formFields?.forEach(section => {
      section?.fields?.forEach(field => {
        newTouched[field?.name] = true;
        const error = validateField(field?.name, formData?.[field?.name]);
        if (error) {
          newErrors[field?.name] = error;
        }
      });
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
      gender: '',
      smoking: '',
      alcohol: '',
      familyHistory: '',
      fatigue: '',
      weightLoss: '',
      chestPain: '',
      lumps: '',
      shortnessOfBreath: '',
      painLevel: '',
      appetiteLoss: ''
    });
    setErrors({});
    setTouched({});
  };

  const isFormValid = () => {
    let allFieldsValid = true;
    formFields?.forEach(section => {
      section?.fields?.forEach(field => {
        if (!formData?.[field?.name] || validateField(field?.name, formData?.[field?.name])) {
          allFieldsValid = false;
        }
      });
    });
    return allFieldsValid;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      {formFields?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center">
            <Icon name="ChevronRight" size={20} className="text-primary mr-2" />
            {section?.section}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {section?.fields?.map((field) => (
              <div key={field?.name} className="relative">
                {field?.type === 'select' ? (
                  <Select
                    label={field?.label}
                    options={field?.options}
                    value={formData?.[field?.name]}
                    onChange={(value) => handleChange(field?.name, value)}
                    error={touched?.[field?.name] ? errors?.[field?.name] : ''}
                    placeholder={field?.placeholder}
                    required
                  />
                ) : (
                  <Input
                    type={field?.type}
                    name={field?.name}
                    label={field?.label}
                    placeholder={field?.placeholder}
                    value={formData?.[field?.name]}
                    onChange={(e) => handleChange(field?.name, e?.target?.value)}
                    onBlur={() => handleBlur(field?.name)}
                    error={touched?.[field?.name] ? errors?.[field?.name] : ''}
                    required
                    min={field?.min}
                    max={field?.max}
                  />
                )}
                {field?.tooltip && (
                  <div className="mt-1 flex items-start">
                    <Icon name="Info" size={14} className="text-muted-foreground mt-0.5 mr-1 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{field?.tooltip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 md:pt-6">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid() || isLoading}
          iconName="Brain"
          iconPosition="left"
        >
          {isLoading ? 'Analyzing...' : 'Start Auto Detection'}
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

export default UnifiedForm;