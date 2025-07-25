import React, { useState, useEffect, useRef } from 'react';
import './horizontalEventBar.css';

const HorizontalEventBar = ({ events, buttonText, onRegisterClick }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.dataset.cardId);
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(cardId);
            } else {
              newSet.delete(cardId);
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const cards = containerRef.current?.querySelectorAll('.horizontal-event-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    }
  };

  return (
    <div className="horizontal-events-container" ref={containerRef}>
      <div className="hero-background-shapes"></div>
      
      {/* Main Content */}
      <div className="horizontal-content-wrapper">
        
        <div className="horizontal-events-list">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className={`horizontal-event-card ${visibleCards.has(event.id) ? 'horizontal-visible' : ''}`}
              data-card-id={event.id}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="horizontal-event-date-time">
                <div className="horizontal-event-date">{event.date}</div>
                <div className="horizontal-event-time">{event.time}</div>
              </div>
              <div className="horizontal-event-content">
                <h3 className="horizontal-event-title">{event.title}</h3>
                <p className="horizontal-event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="horizontal-register-button" onClick={handleRegisterClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HorizontalEventBar;