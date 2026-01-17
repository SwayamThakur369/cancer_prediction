import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const affiliations = [
  {
    name: "IEEE",
    description: "Published Research",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b50758c8-1767871294465.png",
    logoAlt: "IEEE Institute of Electrical and Electronics Engineers logo with blue and white color scheme on professional background"
  },
  {
    name: "UCI ML Repository",
    description: "Validated Datasets",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e8462724-1768629259435.png",
    logoAlt: "University of California Irvine Machine Learning Repository logo featuring academic institution branding with blue and gold colors"
  },
  {
    name: "Medical Ethics Board",
    description: "Approved Methodology",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9537393-1766534512949.png",
    logoAlt: "Medical ethics board certification seal with caduceus symbol and professional healthcare authority branding in blue tones"
  },
  {
    name: "Research Institution",
    description: "Academic Partnership",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18e4c7dbb-1768629259003.png",
    logoAlt: "Academic research institution logo with traditional university architecture and scholarly emblems in professional blue and white design"
  }];


  const certifications = [
  {
    icon: "Shield",
    title: "HIPAA Compliant",
    description: "Full compliance with healthcare data privacy regulations"
  },
  {
    icon: "Lock",
    title: "Data Security",
    description: "End-to-end encryption for all patient information"
  },
  {
    icon: "FileCheck",
    title: "FDA Guidelines",
    description: "Follows FDA software as medical device guidelines"
  },
  {
    icon: "Users",
    title: "Peer Reviewed",
    description: "Methodology validated by medical professionals"
  }];


  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="Award" size={16} className="mr-2" />
            Trust & Credibility
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Built on Scientific Integrity
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform is backed by leading academic institutions, peer-reviewed research, and strict adherence to medical ethics and data privacy standards.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {affiliations?.map((affiliation, index) =>
          <div
            key={index}
            className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-all duration-300 group">

              <div className="aspect-[2/1] mb-4 overflow-hidden rounded-md bg-muted flex items-center justify-center">
                <Image
                src={affiliation?.logo}
                alt={affiliation?.logoAlt}
                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" />

              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1 text-center">
                {affiliation?.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center">
                {affiliation?.description}
              </p>
            </div>
          )}
        </div>

        <div className="bg-gradient-overlay rounded-2xl p-6 md:p-8 lg:p-10 border border-border">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            Compliance & Certifications
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) =>
            <div
              key={index}
              className="bg-card rounded-lg p-6 border border-border text-center hover:shadow-clinical transition-all duration-300">

                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {cert?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustIndicators;