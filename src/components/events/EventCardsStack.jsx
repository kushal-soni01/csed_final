import React, { useState, useEffect, useRef } from 'react';
import './EventCardsStack.css'; // ← Make sure this line exists

const EventCardsStack = ({
  events = [],
  particleCount = 20,
  categoryColors = {}
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [displayStack, setDisplayStack] = useState(true);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [isStackExiting, setIsStackExiting] = useState(false);
  const [isDetailExiting, setIsDetailExiting] = useState(false);
  const [rotatingCardId, setRotatingCardId] = useState(null); // Track which card is rotating
  const [showFloatingCard, setShowFloatingCard] = useState(false); // Track whether to show center floating card
  
  // Refs to track timeouts for cleanup
  const timeoutsRef = useRef([]);

  // Default category colors - can be overridden via props
  const defaultCategoryColors = {
    'Professional Development': 'professional-development',
    'Technology': 'technology',
    'Education': 'education',
    'Innovation': 'innovation',
    'Business': 'business',
    'Health': 'health',
    'Sports': 'sports',
    'Entertainment': 'entertainment',
    ...categoryColors
  };

  const SIMPLE_FADE_DURATION_MS = 500; // Simple fade animation duration  
  const ROTATION_DURATION_MS = 1000; // 2 rotations in 1 second = perfect 120 RPM!
 
  // Animation timing helpers for consistency - optimized for smooth transitions
  const DETAIL_SHOW_DELAY_MS = 1150; // Show detail after rotation completes (200ms delay + 1000ms rotation + 100ms buffer)
  const FLOATING_CARD_DELAY_MS = 50; // Consistent timing for floating card appearance with delay

  // Helper function to safely create timeouts with cleanup tracking
  const createTimeout = (callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  // Helper function to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  // Helper function to get responsive transform values
  const getResponsiveTransform = (index, isHovered) => {
    const screenWidth = window.innerWidth;
    
    // Adjust transform values based on screen size
    let translateXValue, translateYValue;
    
    if (screenWidth <= 575) {
      // Mobile Portrait: Smaller stacking offsets
      translateXValue = index * 25; // Reduced from 50px
      translateYValue = index * 20; // Reduced from 35px
    } else if (screenWidth <= 768) {
      // Mobile Landscape / Small Tablets: Medium stacking offsets
      translateXValue = index * 35; // Reduced from 50px
      translateYValue = index * 25; // Reduced from 35px
    } else {
      // Desktop: Full stacking offsets
      translateXValue = index * 50;
      translateYValue = index * 35;
    }

    return `
      translateX(${translateXValue}px)
      translateY(${translateYValue}px)
      rotate(${(index - 1.5) * 3}deg)
      ${isHovered ? 'translateY(-12px) scale(1.05)' : ''}
    `;
  };

  // Helper function to scroll to center dialogue box in viewport (or top on mobile/tablet)
  const scrollToCenter = () => {
    // Use requestAnimationFrame twice to ensure DOM is fully updated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Check if we're on mobile or tablet (screen width <= 1024px)
        const isMobileOrTablet = window.innerWidth <= 1024;
        
        const dialogueBox = document.querySelector('.detail-view');
        if (dialogueBox) {
          const rect = dialogueBox.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate the current top position of dialogue box relative to document
          const dialogueTopInDocument = rect.top + window.pageYOffset;
          
          if (isMobileOrTablet) {
            // On mobile/tablet, scroll to the top of the dialogue box for better UX
            window.scrollTo({
              top: Math.max(0, dialogueTopInDocument - 20), // Small offset from top
              behavior: 'smooth'
            });
          } else {
            // On desktop/laptop, center the dialogue box as before
            // Calculate where to scroll so dialogue center aligns with viewport center
            const dialogueCenterOffset = rect.height / 2; // Half height of dialogue
            const viewportCenterOffset = viewportHeight / 2; // Half height of viewport
            
            // The scroll position that will center the dialogue in the viewport
            const scrollToPosition = dialogueTopInDocument + dialogueCenterOffset - viewportCenterOffset;
            
            // Smooth scroll to center the dialogue box in viewport
            window.scrollTo({
              top: Math.max(0, scrollToPosition),
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  // Helper function to scroll to center the stack both horizontally and vertically
  const scrollToStackCenter = () => {
    // Use requestAnimationFrame twice to ensure DOM is fully updated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const stackContainer = document.querySelector('.stack-container');
        if (stackContainer) {
          // Get the stack container position and dimensions
          const rect = stackContainer.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          // Calculate the current position of stack container relative to document
          const stackTopInDocument = rect.top + window.pageYOffset;
          const stackLeftInDocument = rect.left + window.pageXOffset;
          
          // Calculate where to scroll so stack center aligns with viewport center
          const stackCenterOffsetY = rect.height / 2; // Half height of stack
          const stackCenterOffsetX = rect.width / 2; // Half width of stack
          const viewportCenterOffsetY = viewportHeight / 2; // Half height of viewport
          const viewportCenterOffsetX = viewportWidth / 2; // Half width of viewport
          
          // The scroll positions that will center the stack in the viewport
          const scrollToPositionY = stackTopInDocument + stackCenterOffsetY - viewportCenterOffsetY;
          const scrollToPositionX = stackLeftInDocument + stackCenterOffsetX - viewportCenterOffsetX;
          
          // Smooth scroll to center the stack both horizontally and vertically
          window.scrollTo({
            top: Math.max(0, scrollToPositionY),
            left: Math.max(0, scrollToPositionX),
            behavior: 'smooth'
          });
        }
      });
    });
  };

  const handleBackToStack = () => {
    // Clear any existing timeouts to prevent race conditions
    clearAllTimeouts();
    
    // Back to stack - use simple fade animation
    setIsDetailExiting(true);
    setIsAnimating(true);
    
    createTimeout(() => {
      setSelectedCard(null);
      setDisplayDetail(false);
      setDisplayStack(true);
      setIsDetailExiting(false);
      setIsAnimating(false);
      setRotatingCardId(null); // Clear rotating card state
      setShowFloatingCard(false); // Clear floating card state
      
      // Scroll to center the stack after transition completes
      scrollToStackCenter();
    }, SIMPLE_FADE_DURATION_MS);
  };

  // Enhanced card click handler with proper timing synchronization
  const handleCardClick = (cardData, event) => {
    // Validate cardData to prevent errors
    if (!cardData || !cardData.id) {
      console.warn('EventCardsStack: Invalid card data provided to handleCardClick');
      return;
    }
    
    if (event && event.target && event.target.closest('.card-button-back')) {
      // Back to stack - use the dedicated back function
      handleBackToStack();
    } else {
      // Clear any existing timeouts to prevent race conditions
      clearAllTimeouts();
      
      // Check if we're switching between cards (already have a selected card and it's different)
      const isSwitchingCards = selectedCard && selectedCard.id !== cardData.id && displayDetail;
      
      if (isSwitchingCards) {
        // Card switching - hide current detail, show new detail without center animation
        setIsAnimating(true);
        setIsDetailExiting(true);
        setShowFloatingCard(false); // No floating card during switching
        setRotatingCardId(null); // No rotation during switching
        
        // Quickly hide current detail and show new card
        createTimeout(() => {
          setSelectedCard(cardData);
          setIsDetailExiting(false);
          setDisplayDetail(true);
          setIsAnimating(false);
        }, 300); // Short transition for card switching
        
        // Scroll to center with proper delay after content is rendered
        createTimeout(() => {
          scrollToCenter();
        }, 500); // Consistent delay to ensure content is fully rendered
        
      } else {
        // Initial card selection from stack - show full animation
        setIsStackExiting(true);
        setIsAnimating(true);
        setShowFloatingCard(true); // Show floating card for initial selection
        
        // Show new card data but keep detail hidden during animation
        setSelectedCard(cardData);
        
        // Show rotating card only when stack is actually hiding (after brief delay)
        createTimeout(() => {
          setRotatingCardId(cardData.id);
          setDisplayStack(false);
        }, FLOATING_CARD_DELAY_MS); // Use consistent timing constant
        
        createTimeout(() => {
          setIsStackExiting(false);
        }, DETAIL_SHOW_DELAY_MS); // Reset stack exiting state
        
        // Show detail view only after rotation completes
        createTimeout(() => {
          setDisplayDetail(true);
          // Scroll to center after detail view is displayed
          scrollToCenter();
        }, DETAIL_SHOW_DELAY_MS);
        
        // Clean up rotation state after animation completes
        createTimeout(() => {
          setRotatingCardId(null);
          setShowFloatingCard(false);
          setIsAnimating(false);
        }, ROTATION_DURATION_MS + 200); // Animation cleanup after full rotation plus delay
      }
    }
  };

  const handleImageLoad = (eventId) => {
    setImageLoaded(prev => ({ ...prev, [eventId]: true }));
  };

  const getCategoryColor = (category) => {
    return defaultCategoryColors[category] || 'default-gradient';
  };

  useEffect(() => {
    // Validate events before processing
    if (!Array.isArray(events)) {
      console.warn('EventCardsStack: events prop should be an array');
      return;
    }
    
    events.forEach(event => {
      // Validate event structure
      if (!event || !event.id || !event.image) {
        console.warn('EventCardsStack: Invalid event object detected', event);
        return;
      }
      
      const img = new Image();
      img.onload = () => handleImageLoad(event.id);
      img.onerror = () => {
        console.warn(`EventCardsStack: Failed to load image for event ${event.id}:`, event.image);
      };
      img.src = event.image;
    });
  }, [events]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Handle empty events array
  if (!events || events.length === 0) {
    return (
      <div className="event-container">
        <div className="hero-background-shapes"></div>
        <div className="empty-state">
          <h2>No Events Available</h2>
          <p>Check back later for upcoming events!</p>
        </div>
      </div>
    );
  }

  if (events.length === 1) {
    const singleEvent = events[0];
    
    // Enhanced single card click handler with proper timing synchronization
    const handleSingleCardClick = (event) => {
      if (event && event.target && event.target.closest('.card-button-back')) {
        // Back to stack - use the dedicated back function
        handleBackToStack();
      } else {
        // Clear any existing timeouts to prevent race conditions
        clearAllTimeouts();
        
        // For single card, always show full animation since there's no card switching
        setIsStackExiting(true);
        setIsAnimating(true);
        setShowFloatingCard(true); // Show floating card for single card
        
        // Show new card data but keep detail hidden during animation
        setSelectedCard(singleEvent);
        
        // Show rotating card only when stack is actually hiding (after brief delay)
        createTimeout(() => {
          setRotatingCardId(singleEvent.id);
          setDisplayStack(false);
        }, FLOATING_CARD_DELAY_MS); // Use consistent timing constant
        
        createTimeout(() => {
          setIsStackExiting(false);
        }, DETAIL_SHOW_DELAY_MS); // Reset stack exiting state
        
        // Show detail view only after rotation completes
        createTimeout(() => {
          setDisplayDetail(true);
          // Scroll to center after detail view is displayed
          scrollToCenter();
        }, DETAIL_SHOW_DELAY_MS);
        
        // Clean up rotation state after animation completes
        createTimeout(() => {
          setRotatingCardId(null);
          setShowFloatingCard(false);
          setIsAnimating(false);
        }, ROTATION_DURATION_MS + 200); // Animation cleanup after full rotation plus delay
      }
    };    return (
      <div className="event-container">
        <div className="hero-background-shapes"></div>

        <div className="background-particles">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="event-wrapper">
          
          {(displayStack || isStackExiting) && (
            <div className="stack-container single-card-container">
              <div className="stack-wrapper single-card-wrapper">
                <div
                  className={`
                    stack-card single-card-stack
                    ${isStackExiting ? 'card-transition-exit' : ''}
                    ${rotatingCardId === singleEvent.id ? 'card-rotating' : ''}
                    ${hoveredCard === singleEvent.id ? 'hovered' : ''}
                  `}
                  style={{
                    transform: isStackExiting || rotatingCardId === singleEvent.id
                      ? null 
                      : `${hoveredCard === singleEvent.id ? 'translateY(-12px) scale(1.05)' : ''}`,
                    zIndex: hoveredCard === singleEvent.id ? 100 : 10,
                  }}
                  onClick={handleSingleCardClick}
                  onMouseEnter={() => !isAnimating && setHoveredCard(singleEvent.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-content">
                    <div className={`card-overlay ${getCategoryColor(singleEvent.category)}`} />
                    {!imageLoaded[singleEvent.id] && (
                      <div className="loading-placeholder" />
                    )}
                    <img
                      src={singleEvent.image}
                      alt={singleEvent.title || 'Event'}
                      className="card-image"
                      onLoad={() => handleImageLoad(singleEvent.id)}
                      onError={(e) => {
                        console.warn('Failed to load card image:', singleEvent.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="card-gradient" />
                    <div className="card-category-badge">
                      <span className={`card-category-tag ${getCategoryColor(singleEvent.category)}`}>
                        {singleEvent.category}
                      </span>
                    </div>
                    <div className="card-text">
                      <h3 className="card-title">
                        {singleEvent.title}
                      </h3>
                      <p className="card-subtitle">
                        {singleEvent.subtitle}
                      </p>
                    </div>
                    <div className="hover-overlay" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(displayDetail || isDetailExiting) && selectedCard && (
            <>
              <div className={`detail-view ${isDetailExiting ? 'card-transition-exit' : (isAnimating ? 'card-transition-enter' : '')}`}>
                <div className="detail-image-section">
                  <div className="detail-image-container">
                    <div className={`detail-image-overlay ${getCategoryColor(selectedCard.category)}`} />
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.heading || selectedCard.title || 'Event image'}
                      className="detail-image"
                      onError={(e) => {
                        console.warn('Failed to load detail image:', selectedCard.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="detail-gradient-overlay" />
                    <div className="detail-category-badge">
                      <span className={`detail-category-tag ${getCategoryColor(selectedCard.category)}`}>
                        {selectedCard.category}
                      </span>
                    </div>
                    <div className="floating-elements">
                      <div className="floating-dot floating-dot-1" />
                      <div className="floating-dot floating-dot-2" />
                      <div className="floating-dot floating-dot-3" />
                    </div>
                  </div>
                </div>
                
                <div className="detail-content-section">
                  <div>
                    <h1 className="detail-title">
                      {selectedCard.heading || selectedCard.title || 'Event Title'}
                    </h1>
                    <p className="detail-date">{selectedCard.date || 'Date TBD'}</p>
                  </div>
                  
                  <ul className="detail-description-list">
                    {(selectedCard.description || []).map((item, index) => (
                      <li key={index} className="detail-description-item" style={{ animationDelay: `${index * 100}ms` }}>
                        <span className={`detail-description-bullet ${getCategoryColor(selectedCard.category)}`} />
                        <span className="detail-description-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="detail-info-grid">
                    <div className="detail-info-item">
                      <i className="fas fa-clock detail-icon"></i>
                      <span className="detail-info-label">Time:</span>
                      <span className="detail-info-value">{selectedCard.time || 'TBD'}</span>
                    </div>
                    <div className="detail-info-item">
                      <i className="fas fa-calendar-alt detail-icon"></i>
                      <span className="detail-info-label">Date:</span>
                      <span className="detail-info-value">{selectedCard.date || 'TBD'}</span>
                    </div>
                    <div className="detail-info-item">
                      <i className="fas fa-map-marker-alt detail-icon"></i>
                      <span className="detail-info-label">Location:</span>
                      <span className="detail-info-value">{selectedCard.location || 'TBD'}</span>
                    </div>
                    <div className="detail-info-item">
                      <i className="fas fa-users detail-icon"></i>
                      <span className="detail-info-label">Capacity:</span>
                      <span className="detail-info-value">{selectedCard.capacity || 'TBD'}</span>
                    </div>
                    <div className="detail-info-item">
                      <i className="fas fa-dollar-sign detail-icon"></i>
                      <span className="detail-info-label">Fee:</span>
                      <span className="detail-info-value">{selectedCard.fee || 'TBD'}</span>
                    </div>
                  </div>

                  <div className="register-button-container">
                    <button className={`register-button ${getCategoryColor(selectedCard.category)}`}>
                      <i className="fas fa-ticket-alt register-icon"></i>
                      <span>Register Now</span>
                      <i className="fas fa-arrow-right register-arrow"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating rotating card overlay during initial animation only */}
              {rotatingCardId === selectedCard.id && showFloatingCard && (
                <div className="floating-rotating-card">
                  <div className="stack-card card-rotating">
                    <div className="card-content">
                      <div className={`card-overlay ${getCategoryColor(selectedCard.category)}`} />
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.title || 'Event'}
                        className="card-image"
                        onError={(e) => {
                          console.warn('Failed to load floating card image:', selectedCard.image);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="card-gradient" />
                      <div className="card-category-badge">
                        <span className={`card-category-tag ${getCategoryColor(selectedCard.category)}`}>
                          {selectedCard.category}
                        </span>
                      </div>
                      <div className="card-text">
                        <h3 className="card-title">
                          {selectedCard.title}
                        </h3>
                        <p className="card-subtitle">
                          {selectedCard.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {selectedCard && (
            <button
              onClick={handleBackToStack}
              className="back-button"
            >
              <i className="fas fa-arrow-left back-arrow"></i>
              <span>Back to Event</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="event-container">
      <div className="hero-background-shapes"></div>
      <div className="background-particles">
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="event-wrapper">
        
        {(displayStack || isStackExiting) && (
          <div className="stack-container">
            <div className="stack-wrapper">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`
                    stack-card
                    ${isStackExiting ? 'card-transition-exit' : ''}
                    ${rotatingCardId === event.id ? 'card-rotating' : ''}
                    ${hoveredCard === event.id ? 'hovered' : ''}
                  `}
                  style={{
                    transform: isStackExiting || rotatingCardId === event.id // If animating out from stack or this specific card is rotating
                      ? null // Remove inline transform to let CSS animation take over
                      : getResponsiveTransform(index, hoveredCard === event.id),
                    zIndex: events.length - index + (hoveredCard === event.id ? 100 : 0),
                    filter: hoveredCard && hoveredCard !== event.id ? 'brightness(0.7)' : 'brightness(1)',
                  }}
                  onClick={() => handleCardClick(event)}
                  onMouseEnter={() => !isAnimating && setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-content">
                    <div className={`card-overlay ${getCategoryColor(event.category)}`} />
                    {!imageLoaded[event.id] && (
                      <div className="loading-placeholder" />
                    )}
                    <img
                      src={event.image}
                      alt={event.title || 'Event'}
                      className="card-image"
                      onLoad={() => handleImageLoad(event.id)}
                      onError={(e) => {
                        console.warn('Failed to load card image:', event.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="card-gradient" />
                    <div className="card-category-badge">
                      <span className={`card-category-tag ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <div className="card-text">
                      <h3 className="card-title">
                        {event.title}
                      </h3>
                      <p className="card-subtitle">
                        {event.subtitle}
                      </p>
                    </div>
                    <div className="hover-overlay" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(displayDetail || isDetailExiting) && selectedCard && (
          <>
            <div className={`detail-view ${isDetailExiting ? 'card-transition-exit' : (isAnimating ? 'card-transition-enter' : '')}`}>
              <div className="detail-image-section">
                <div className="detail-image-container">
                  <div className={`detail-image-overlay ${getCategoryColor(selectedCard.category)}`} />
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.heading || selectedCard.title || 'Event image'}
                    className="detail-image"
                    onError={(e) => {
                      console.warn('Failed to load detail image:', selectedCard.image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="detail-gradient-overlay" />
                  <div className="detail-category-badge">
                    <span className={`detail-category-tag ${getCategoryColor(selectedCard.category)}`}>
                      {selectedCard.category}
                    </span>
                  </div>
                  <div className="floating-elements">
                    <div className="floating-dot floating-dot-1" />
                    <div className="floating-dot floating-dot-2" />
                    <div className="floating-dot floating-dot-3" />
                  </div>
                </div>
              </div>
              
              <div className="detail-content-section">
                <div>
                  <h1 className="detail-title">
                    {selectedCard.heading || selectedCard.title || 'Event Title'}
                  </h1>
                  <p className="detail-date">{selectedCard.date || 'Date TBD'}</p>
                </div>
                
                <ul className="detail-description-list">
                  {(selectedCard.description || []).map((item, index) => (
                    <li key={index} className="detail-description-item" style={{ animationDelay: `${index * 100}ms` }}>
                      <span className={`detail-description-bullet ${getCategoryColor(selectedCard.category)}`} />
                      <span className="detail-description-text">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <i className="fas fa-clock detail-icon"></i>
                    <span className="detail-info-label">Time:</span>
                    <span className="detail-info-value">{selectedCard.time || 'TBD'}</span>
                  </div>
                  <div className="detail-info-item">
                    <i className="fas fa-calendar-alt detail-icon"></i>
                    <span className="detail-info-label">Date:</span>
                    <span className="detail-info-value">{selectedCard.date || 'TBD'}</span>
                  </div>
                  <div className="detail-info-item">
                    <i className="fas fa-map-marker-alt detail-icon"></i>
                    <span className="detail-info-label">Location:</span>
                    <span className="detail-info-value">{selectedCard.location || 'TBD'}</span>
                  </div>
                  <div className="detail-info-item">
                    <i className="fas fa-users detail-icon"></i>
                    <span className="detail-info-label">Capacity:</span>
                    <span className="detail-info-value">{selectedCard.capacity || 'TBD'}</span>
                  </div>
                  <div className="detail-info-item">
                    <i className="fas fa-dollar-sign detail-icon"></i>
                    <span className="detail-info-label">Fee:</span>
                    <span className="detail-info-value">{selectedCard.fee || 'TBD'}</span>
                  </div>
                </div>

                <div className="register-button-container">
                  <button className={`register-button ${getCategoryColor(selectedCard.category)}`}>
                    <i className="fas fa-ticket-alt register-icon"></i>
                    <span>Register Now</span>
                    <i className="fas fa-arrow-right register-arrow"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating rotating card overlay during initial animation only */}
            {rotatingCardId === selectedCard.id && showFloatingCard && (
              <div className="floating-rotating-card">
                <div className="stack-card card-rotating">
                  <div className="card-content">
                    <div className={`card-overlay ${getCategoryColor(selectedCard.category)}`} />
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.title || 'Event'}
                      className="card-image"
                      onError={(e) => {
                        console.warn('Failed to load floating card image:', selectedCard.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="card-gradient" />
                    <div className="card-category-badge">
                      <span className={`card-category-tag ${getCategoryColor(selectedCard.category)}`}>
                        {selectedCard.category}
                      </span>
                    </div>
                    <div className="card-text">
                      <h3 className="card-title">
                        {selectedCard.title}
                      </h3>
                      <p className="card-subtitle">
                        {selectedCard.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {selectedCard && (
          <div className="mini-cards-container">
            <div className="mini-cards-wrapper">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`mini-card ${selectedCard.id === event.id ? 'mini-card-active' : ''}`}
                  onClick={() => handleCardClick(event)}
                >
                  <img
                    src={event.image}
                    alt={event.title || 'Event'}
                    className="mini-card-image"
                    onError={(e) => {
                      console.warn('Failed to load mini card image:', event.image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className={`mini-card-overlay ${selectedCard.id === event.id ? 'mini-card-overlay-active' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCard && (
          <button
            onClick={handleBackToStack}
            className="back-button"
          >
            <i className="fas fa-arrow-left back-arrow"></i>
            <span>Back to Events</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCardsStack;