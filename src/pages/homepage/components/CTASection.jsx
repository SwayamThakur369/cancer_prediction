import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-blue-50 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 md:p-12 lg:p-16 text-white shadow-clinical relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Start Your Analysis Today
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Ready to Experience AI-Assisted Cancer Prediction?
            </h2>
            
            <p className="text-base md:text-lg text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join healthcare professionals and researchers worldwide who trust our platform for evidence-based cancer risk assessment. Get started with your first prediction in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Activity"
                iconPosition="left"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/cancer-selection">Choose Cancer Type</Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="BarChart3"
                iconPosition="left"
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/results-dashboard">View Sample Results</Link>
              </Button>
            </div>
            
            <div className="mt-10 md:mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
                  <div className="text-sm text-white/80">Cancer Types</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">95%+</div>
                  <div className="text-sm text-white/80">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-white/80">Platform Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;