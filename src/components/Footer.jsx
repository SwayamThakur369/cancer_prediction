import { Link } from 'react-router-dom';
import Icon from './AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Cancer Selection', path: '/cancer-selection' },
        { name: 'Breast Cancer Prediction', path: '/breast-cancer-prediction' },
        { name: 'Lung Cancer Prediction', path: '/lung-cancer-prediction' },
        { name: 'Prostate Cancer Prediction', path: '/prostate-cancer-prediction' },
        { name: 'Results Dashboard', path: '/results-dashboard' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Research Paper', path: '#', external: true },
        { name: 'Methodology', path: '#' },
        { name: 'Documentation', path: '#' },
        { name: 'Educational Resources', path: '#' },
        { name: 'FAQ', path: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '#' },
        { name: 'Contact', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Medical Disclaimer', path: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="flex items-center mb-4">
              <div className="header-logo">
                <Icon name="Activity" size={24} color="var(--color-primary)" />
              </div>
              <span className="header-logo-text ml-3">CancerPredict ML</span>
            </div>
            <p className="footer-description mb-4">
              AI-assisted cancer prediction platform supporting healthcare decisions through transparent, research-grade machine learning algorithms.
            </p>
            <div className="space-y-2">
              <div className="footer-trust-badge">
                <Icon name="Award" size={14} className="mr-1" />
                IEEE Published Research
              </div>
              <div className="footer-trust-badge">
                <Icon name="Shield" size={14} className="mr-1" />
                Medical-Grade Accuracy
              </div>
            </div>
          </div>

          {footerSections?.map((section) => (
            <div key={section?.title} className="footer-section">
              <h3 className="footer-heading">{section?.title}</h3>
              <ul className="footer-links">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    {link?.external ? (
                      <a
                        href={link?.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link flex items-center"
                      >
                        {link?.name}
                        <Icon name="ExternalLink" size={14} className="ml-1" />
                      </a>
                    ) : (
                      <Link to={link?.path} className="footer-link">
                        {link?.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} CancerPredict ML. All rights reserved. This platform is for research and educational purposes. Always consult qualified healthcare professionals for medical decisions.
            </p>
            <div className="footer-social-links">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;