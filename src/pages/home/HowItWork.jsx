import { Radio, Wrench, Smartphone, ArrowRight } from 'lucide-react';
import '../../style/howItWork.css'

const steps = [
  {
    id: 1,
    icon: <Radio />,
    label: 'Choose Tracker',
    description: 'Select the perfect GPS tracker for your vehicle from our range of advanced devices.',
  },
  {
    id: 2,
    icon: <Wrench />,
    label: 'We Install',
    description: 'Our certified technicians professionally install your tracker at your convenience.',
  },
  {
    id: 3,
    icon: <Smartphone />,
    label: 'Track via App',
    description: 'Monitor your vehicle in real-time through our intuitive mobile and web application.',
  },
];

export function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Headline */}
        <div className="how-it-works-headline">
          <h2 className="how-it-works-title">
            How It Works
          </h2>
          <p className="how-it-works-subtitle">
            Get started with our GPS tracking solution in three simple steps
          </p>
        </div>

        {/* Desktop: Horizontal Flow with Connecting Lines */}
        <div className="steps-container-desktop">
          <div className="steps-grid">
            {/* Background connecting line */}
            <div className="connecting-line" />
            
            {steps.map((step, index) => (
              <div key={step.id} className="step-wrapper">
                {/* Step Card */}
                <div className="step-card">
                  {/* Step Number Badge */}
                  <div className="step-number-badge">
                    {step.id}
                  </div>

                  {/* Icon Container */}
                  <div className="icon-container-wrapper">
                    <div className="icon-container">
                      {step.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="step-label">
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className="step-description">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps (not after last step) */}
                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Flow */}
        <div className="steps-container-mobile">
          {steps.map((step, index) => (
            <div key={step.id}>
              {/* Step Card */}
              <div className="step-card-mobile">
                {/* Step Number Badge */}
                <div className="step-number-badge-mobile">
                  {step.id}
                </div>

                <div className="step-content-mobile">
                  {/* Icon Container */}
                  <div className="icon-container-mobile">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="step-text-mobile">
                    <h3 className="step-label-mobile">
                      {step.label}
                    </h3>
                    <p className="step-description-mobile">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting Arrow (not after last step) */}
              {index < steps.length - 1 && (
                <div className="mobile-arrow-connector">
                  <div className="mobile-arrow-line" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button Section */}
        <div className="cta-section">
          <button className="cta-button">
            Get Started Today
          </button>
          <p className="cta-subtitle">
            No credit card required • Free consultation
          </p>
        </div>
      </div>
    </section>
  );
}
