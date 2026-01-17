import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Icon name="Award" size={16} className="mr-2" />
              IEEE Published Research
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              AI-Assisted Cancer Prediction for{' '}
              <span className="text-primary">Clinical Decision Support</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Research-grade machine learning algorithms supporting healthcare professionals with transparent, evidence-based cancer risk assessment. Our platform bridges cutting-edge AI research with practical clinical applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Activity"
                iconPosition="left"
                asChild
              >
                <Link to="/cancer-selection">Start Prediction</Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                asChild
              >
                <Link to="/results-dashboard">View Research</Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Shield" size={18} className="mr-2 text-primary" />
                Medical-Grade Accuracy
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Lock" size={18} className="mr-2 text-primary" />
                HIPAA Compliant
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Users" size={18} className="mr-2 text-primary" />
                Trusted by Researchers
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-clinical p-6 md:p-8 border border-border">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Quick Prediction Access</h3>
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                
                <div className="space-y-4">
                  <Link
                    to="/breast-cancer-prediction"
                    className="block p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                          <Icon name="Heart" size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Breast Cancer</h4>
                          <p className="text-sm text-muted-foreground">SVM Algorithm</p>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                  
                  <Link
                    to="/lung-cancer-prediction"
                    className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-500 rounded-lg flex items-center justify-center">
                          <Icon name="Wind" size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Lung Cancer</h4>
                          <p className="text-sm text-muted-foreground">Random Forest</p>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                  
                  <Link
                    to="/prostate-cancer-prediction"
                    className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Icon name="User" size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Prostate Cancer</h4>
                          <p className="text-sm text-muted-foreground">Random Forest</p>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;