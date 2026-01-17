import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CancerTypeCard = ({ 
  type, 
  title, 
  description, 
  accuracy, 
  estimatedTime, 
  requiredFields, 
  modelType, 
  icon, 
  color, 
  route, 
  image, 
  imageAlt 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = () => {
    navigate(route);
  };

  return (
    <div
      className={`breathing-card p-6 md:p-8 transition-all duration-300 ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center`}
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon name={icon} size={28} color={color} />
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${color}10`, color: color }}
          >
            {accuracy}% Accuracy
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3">
            {title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mb-4 md:mb-6 overflow-hidden rounded-lg">
          <div className="aspect-[16/9] w-full">
            <Image
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}10` }}
            >
              <Icon name="Clock" size={16} color={color} />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground">
                Estimated Time
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {estimatedTime}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}10` }}
            >
              <Icon name="FileText" size={16} color={color} />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground">
                Required Fields
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {requiredFields} clinical parameters
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}10` }}
            >
              <Icon name="Brain" size={16} color={color} />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground">
                ML Model
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {modelType}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="default"
          fullWidth
          onClick={handleNavigate}
          iconName="ArrowRight"
          iconPosition="right"
          className="mt-auto"
          style={{ backgroundColor: color, borderColor: color }}
        >
          Start {type} Assessment
        </Button>
      </div>
    </div>
  );
};

export default CancerTypeCard;