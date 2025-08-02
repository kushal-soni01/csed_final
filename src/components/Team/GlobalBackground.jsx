import React, { useEffect } from 'react';
import './GlobalBackground.css';

const GlobalBackground = () => {
  useEffect(() => {
    // Optional: Add any dynamic background effects using GSAP here
  }, []);

  return (
    <div className="global-background">
      {/* Gradient overlays */}
      <div className="bg-gradient-overlay-1"></div>
      <div className="bg-gradient-overlay-2"></div>
      <div className="bg-gradient-overlay-3"></div>
      
      {/* Animated particles */}
      <div className="bg-particles">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div className="bg-grid-pattern"></div>
      
      {/* Floating shapes */}
      <div className="bg-floating-shapes">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`bg-shape bg-shape-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalBackground;
