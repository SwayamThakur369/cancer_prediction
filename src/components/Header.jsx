import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage' },
    { name: 'Cancer Selection', path: '/cancer-selection' },
    { name: 'Predictions', path: '/breast-cancer-prediction', isDropdown: true },
    { name: 'Auto Detect', path: '/auto-cancer-detection' },
    { name: 'Results', path: '/results-dashboard' },
  ];

  const predictionDropdownItems = [
    { name: 'Breast Cancer', path: '/breast-cancer-prediction' },
    { name: 'Lung Cancer', path: '/lung-cancer-prediction' },
    { name: 'Prostate Cancer', path: '/prostate-cancer-prediction' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  const isActivePath = (path) => {
    if (path === '/breast-cancer-prediction') {
      return ['/breast-cancer-prediction', '/lung-cancer-prediction', '/prostate-cancer-prediction']?.includes(location?.pathname);
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header-container ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-inner">
          <div className="header-logo-container">
            <Link to="/homepage" className="flex items-center">
              <div className="header-logo">
                <Icon name="Activity" size={24} color="var(--color-primary)" />
              </div>
              <span className="header-logo-text">CancerPredict ML</span>
            </Link>
          </div>

          <nav className="header-nav">
            {navigationItems?.map((item) => {
              if (item?.isDropdown) {
                return (
                  <div key={item?.name} className="relative group">
                    <button
                      className={`header-nav-link flex items-center ${
                        isActivePath(item?.path) ? 'header-nav-link-active' : ''
                      }`}
                    >
                      {item?.name}
                      <Icon name="ChevronDown" size={16} className="ml-1" />
                    </button>
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-popover rounded-md shadow-clinical border border-border">
                      <div className="py-2">
                        {predictionDropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem?.path}
                            to={dropdownItem?.path}
                            className={`block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 ${
                              location?.pathname === dropdownItem?.path ? 'text-primary bg-primary/10' : ''
                            }`}
                          >
                            {dropdownItem?.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`header-nav-link ${
                    isActivePath(item?.path) ? 'header-nav-link-active' : ''
                  }`}
                >
                  {item?.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="header-mobile-toggle"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="header-mobile-menu">
          <nav className="header-mobile-nav">
            {navigationItems?.map((item) => {
              if (item?.isDropdown) {
                return (
                  <div key={item?.name} className="space-y-1">
                    <div className="header-mobile-link flex items-center justify-between">
                      <span>{item?.name}</span>
                      <Icon name="ChevronDown" size={16} />
                    </div>
                    <div className="pl-4 space-y-1">
                      {predictionDropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem?.path}
                          to={dropdownItem?.path}
                          className={`header-mobile-link ${
                            location?.pathname === dropdownItem?.path ? 'header-mobile-link-active' : ''
                          }`}
                        >
                          {dropdownItem?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`header-mobile-link ${
                    isActivePath(item?.path) ? 'header-mobile-link-active' : ''
                  }`}
                >
                  {item?.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;