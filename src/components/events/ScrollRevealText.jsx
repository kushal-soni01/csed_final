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
  {/* Background shapes removed as requested */}
      
      {children}
    </section>
  );
};

export default ScrollRevealText;