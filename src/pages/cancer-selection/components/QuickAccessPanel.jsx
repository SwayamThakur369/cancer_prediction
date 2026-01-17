import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickAccessPanel = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: "FileBarChart",
      title: "View Results Dashboard",
      description: "Access your prediction history and analytics",
      route: "/results-dashboard",
      variant: "outline"
    },
    {
      icon: "Home",
      title: "Return to Homepage",
      description: "Go back to the main platform overview",
      route: "/homepage",
      variant: "ghost"
    }
  ];

  return (
    <div className="breathing-card p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Zap" size={24} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Quick Access
        </h3>
      </div>
      <div className="space-y-4">
        {quickLinks?.map((link, index) => (
          <div
            key={index}
            className="p-4 md:p-5 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(link?.route)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon name={link?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {link?.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {link?.description}
                  </p>
                </div>
              </div>
              <Icon
                name="ArrowRight"
                size={20}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 md:p-5 rounded-lg bg-muted/50">
        <div className="flex items-start space-x-3">
          <Icon name="BookOpen" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-medium text-foreground mb-1">
              Need Help?
            </p>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Review our methodology documentation and clinical guidelines for detailed information about each prediction model and interpretation best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessPanel;