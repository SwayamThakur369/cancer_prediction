import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const StepIndicator = ({ currentStep, isAnalyzing }) => {
  const steps = [
    { number: 1, title: 'Data Entry', icon: 'FileText' },
    { number: 2, title: 'Cancer Type Detection', icon: 'Brain' },
    { number: 3, title: 'Risk Prediction', icon: 'Activity' }
  ];

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps?.map((step, index) => (
          <div key={step?.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300',
                  currentStep > step?.number
                    ? 'bg-success text-success-foreground'
                    : currentStep === step?.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {currentStep > step?.number ? (
                  <Icon name="Check" size={24} />
                ) : currentStep === step?.number && isAnalyzing ? (
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <Icon name={step?.icon} size={24} />
                )}
              </div>
              <div className="mt-2 md:mt-3 text-center">
                <p
                  className={cn(
                    'text-xs md:text-sm font-medium',
                    currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step?.title}
                </p>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 md:mx-4">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    currentStep > step?.number ? 'bg-success' : 'bg-muted'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;