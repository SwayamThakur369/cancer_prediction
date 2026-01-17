import Icon from '../../../components/AppIcon';

const StatisticsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{value}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className={`p-3 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={16} 
              className={trendColors?.[trend]}
            />
            <span className={`text-sm font-medium ${trendColors?.[trend]}`}>
              {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;