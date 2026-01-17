import Icon from '../../../components/AppIcon';

const PreparationChecklist = () => {
  const checklistItems = [
    {
      icon: "ClipboardList",
      title: "Gather Clinical Data",
      description: "Collect all relevant patient medical records, lab results, and imaging reports before starting the assessment."
    },
    {
      icon: "Shield",
      title: "Review Privacy Guidelines",
      description: "Ensure all patient data is de-identified and complies with HIPAA regulations before input into the system."
    },
    {
      icon: "FileCheck",
      title: "Verify Data Accuracy",
      description: "Double-check all clinical measurements and test results for accuracy to ensure reliable prediction outcomes."
    },
    {
      icon: "Users",
      title: "Consult Medical Team",
      description: "Discuss the use of AI-assisted predictions with your medical team and understand the tool\'s supportive role."
    }
  ];

  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="CheckCircle2" size={24} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Before You Begin
        </h3>
      </div>
      <p className="text-sm md:text-base text-muted-foreground mb-6">
        Ensure you have the following prepared for accurate cancer risk assessment:
      </p>
      <div className="space-y-4 md:space-y-5">
        {checklistItems?.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name={item?.icon} size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-medium text-foreground mb-1">
                {item?.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 p-4 md:p-5 rounded-lg bg-warning/10 border border-warning/20">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-medium text-foreground mb-1">
              Medical Disclaimer
            </p>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              These AI predictions are designed to support, not replace, professional medical judgment. Always consult qualified healthcare professionals for diagnosis and treatment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationChecklist;