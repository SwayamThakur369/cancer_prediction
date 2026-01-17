import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MedicalDisclaimer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-16 bg-amber-50 border-t border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-amber-300 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-amber-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 flex items-center">
                Important Medical Disclaimer
                <Icon 
                  name="Info" 
                  size={18} 
                  className="ml-2 text-muted-foreground cursor-help" 
                  title="Click to expand full disclaimer"
                />
              </h3>
              
              <div className="space-y-3 text-sm md:text-base text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">This platform is designed for research and clinical decision support purposes only.</strong> It is not intended to replace professional medical diagnosis, treatment, or advice from qualified healthcare providers.
                </p>
                
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <p className="leading-relaxed">
                      The machine learning models used in this platform are trained on validated medical datasets and have been peer-reviewed through IEEE publication. However, all predictions should be interpreted within the context of comprehensive clinical evaluation, patient history, and additional diagnostic procedures.
                    </p>
                    
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Healthcare professionals should:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Use predictions as supplementary information alongside standard diagnostic protocols</li>
                      <li>Consider individual patient factors not captured by the model</li>
                      <li>Verify results through established clinical testing procedures</li>
                      <li>Maintain professional judgment in all clinical decisions</li>
                    </ul>
                    
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Patients should:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Always consult with qualified healthcare professionals for medical advice</li>
                      <li>Not use this platform for self-diagnosis or treatment decisions</li>
                      <li>Discuss any concerns or questions with their healthcare provider</li>
                      <li>Seek immediate medical attention for urgent health concerns</li>
                    </ul>
                    
                    <p className="leading-relaxed">
                      The developers, researchers, and affiliated institutions assume no liability for clinical decisions made based on predictions from this platform. All users acknowledge that this is a research tool designed to support, not replace, professional medical expertise.
                    </p>
                  </div>
                )}
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 mt-4"
                >
                  {isExpanded ? (
                    <>
                      <Icon name="ChevronUp" size={18} className="mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <Icon name="ChevronDown" size={18} className="mr-1" />
                      Read Full Disclaimer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalDisclaimer;