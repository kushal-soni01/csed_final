import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealText.css';

const ScrollRevealText = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } else {
          // Only reset if we want to replay animation on scroll
          setIsVisible(false);
        }
      },
      {
        // Make it appear sooner - reduced margin for earlier triggering
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`reveal-container ${isVisible ? 'visible' : ''} ${hasBeenVisible ? 'has-been-visible' : ''}`}
    >
      {/* Background Shapes Animation */}
      <div className="horizontal-background-shapes">
        {/* Basic geometric shapes */}
        <div className="horizontal-shape horizontal-triangle horizontal-triangle-1"></div>
        <div className="horizontal-shape horizontal-triangle horizontal-triangle-2"></div>
        <div className="horizontal-shape horizontal-triangle horizontal-triangle-3"></div>
        
        <div className="horizontal-shape horizontal-square horizontal-square-1"></div>
        <div className="horizontal-shape horizontal-square horizontal-square-2"></div>
        <div className="horizontal-shape horizontal-square horizontal-square-3"></div>
        
        <div className="horizontal-shape horizontal-circle horizontal-circle-1"></div>
        <div className="horizontal-shape horizontal-circle horizontal-circle-2"></div>
        <div className="horizontal-shape horizontal-circle horizontal-circle-3"></div>
        
        <div className="horizontal-shape horizontal-hexagon horizontal-hexagon-1"></div>
        <div className="horizontal-shape horizontal-hexagon horizontal-hexagon-2"></div>
        
        <div className="horizontal-shape horizontal-diamond horizontal-diamond-1"></div>
        <div className="horizontal-shape horizontal-diamond horizontal-diamond-2"></div>
        
        {/* Tech symbols */}
        <div className="horizontal-tech-symbol horizontal-symbol-1">&lt;/&gt;</div>
        <div className="horizontal-tech-symbol horizontal-symbol-2">{ }</div>
        <div className="horizontal-tech-symbol horizontal-symbol-3">&lt;&gt;</div>
        
        {/* Simple dots */}
        <div className="horizontal-dot horizontal-dot-1"></div>
        <div className="horizontal-dot horizontal-dot-2"></div>
        <div className="horizontal-dot horizontal-dot-3"></div>
        <div className="horizontal-dot horizontal-dot-4"></div>
        <div className="horizontal-dot horizontal-dot-5"></div>
      </div>
      
      {children}
    </section>
  );
};

export default ScrollRevealText;