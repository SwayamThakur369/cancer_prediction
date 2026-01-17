import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';
import CancerTypeCard from './components/CancerTypeCard';
import PreparationChecklist from './components/PreparationChecklist';
import ModelComparisonTable from './components/ModelComparisonTable';
import QuickAccessPanel from './components/QuickAccessPanel';

const CancerSelection = () => {
  const cancerTypes = [
  {
    type: "Breast Cancer",
    title: "Breast Cancer Prediction",
    description: "Advanced SVM-based prediction model analyzing 9 critical clinical parameters including tumor characteristics, cell morphology, and tissue patterns for benign/malignant classification.",
    accuracy: "96.5",
    estimatedTime: "3-5 minutes",
    requiredFields: "9",
    modelType: "Support Vector Machine (SVM)",
    icon: "Heart",
    color: "#ec4899",
    route: "/breast-cancer-prediction",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_143917329-1766848869484.png",
    imageAlt: "Medical professional examining breast cancer mammogram scan on digital display screen showing detailed tissue analysis and tumor markers in clinical radiology setting"
  },
  {
    type: "Lung Cancer",
    title: "Lung Cancer Prediction",
    description: "Random Forest algorithm evaluating 13 comprehensive symptom indicators including respiratory patterns, lifestyle factors, and clinical manifestations for early detection risk assessment.",
    accuracy: "94.8",
    estimatedTime: "5-7 minutes",
    requiredFields: "13",
    modelType: "Random Forest",
    icon: "Wind",
    color: "#6b7280",
    route: "/lung-cancer-prediction",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17437f05f-1764703839638.png",
    imageAlt: "Chest X-ray image showing detailed lung anatomy with clear visualization of bronchial structures and pulmonary tissue patterns on illuminated medical viewing screen"
  },
  {
    type: "Prostate Cancer",
    title: "Prostate Cancer Prediction",
    description: "Random Forest model processing 8 essential clinical biomarkers including PSA levels, age factors, and diagnostic indicators to calculate percentage-based cancer risk probability.",
    accuracy: "93.2",
    estimatedTime: "4-6 minutes",
    requiredFields: "8",
    modelType: "Random Forest",
    icon: "Activity",
    color: "#3b82f6",
    route: "/prostate-cancer-prediction",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb77cf13-1764835168508.png",
    imageAlt: "Medical laboratory technician analyzing prostate cancer biomarker test results on computer screen showing PSA level graphs and diagnostic data in modern clinical laboratory"
  }];


  return (
    <>
      <Helmet>
        <title>Cancer Type Selection - CancerPredict ML | AI-Assisted Cancer Risk Assessment</title>
        <meta
          name="description"
          content="Select from breast, lung, or prostate cancer prediction models. Each uses validated machine learning algorithms with 93-96% accuracy for clinical decision support." />

      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-16">
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 mb-6">
                  <Icon name="Stethoscope" size={36} color="var(--color-primary)" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  Select Cancer Type for Prediction
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Choose the appropriate cancer prediction model based on your clinical assessment needs. Each model uses validated machine learning algorithms trained on extensive medical datasets.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                {cancerTypes?.map((cancer, index) =>
                <CancerTypeCard key={index} {...cancer} />
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="lg:col-span-2">
                  <ModelComparisonTable />
                </div>
                <div className="space-y-6 md:space-y-8">
                  <PreparationChecklist />
                  <QuickAccessPanel />
                </div>
              </div>

              <div className="breathing-card p-6 md:p-8 lg:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                        Important Clinical Notice
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                      These AI-assisted prediction tools are designed to support clinical decision-making, not replace professional medical judgment. All predictions should be interpreted by qualified healthcare professionals within the context of comprehensive patient evaluation.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Icon name="Award" size={14} className="mr-1.5" />
                        IEEE Published Research
                      </div>
                      <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        <Icon name="CheckCircle2" size={14} className="mr-1.5" />
                        Clinically Validated
                      </div>
                      <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Icon name="Shield" size={14} className="mr-1.5" />
                        HIPAA Compliant
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
                      <img
                        src="https://img.rocket.new/generatedImages/rocket_gen_img_195a6e902-1764648555298.png"
                        alt="Healthcare professional doctor in white coat reviewing medical charts and patient data on tablet device in modern hospital clinical setting"
                        className="w-full h-full object-cover" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>);

};

export default CancerSelection;