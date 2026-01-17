import Icon from '../../../components/AppIcon';

const InfoCard = ({ icon, title, description, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 hover:shadow-clinical transition-all duration-300">
      <div className="flex items-start">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses?.[color]}`}>
          <Icon name={icon} size={20} />
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
            {title}
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;