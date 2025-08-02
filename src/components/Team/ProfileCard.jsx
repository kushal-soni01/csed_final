import React, { useEffect, useRef, useCallback, useMemo } from "react";
import './ProfileCard.css';

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCard = ({
  member = null,
  name = "Javi A. Torres",
  title = "Software Engineer", 
  handle = "javicodes",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick = () => {}
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;
    let isAnimating = false;
    
    const updateCardTransform = (offsetX, offsetY, card, wrap, smooth = true) => {
      if (!enableTilt) return;
      
      // Check if mobile tilt is disabled on mobile devices (adjusted breakpoint)
      if (!enableMobileTilt && window.innerWidth <= 480) return;
      
      // Reduce jitter by checking if movement is significant
      const deltaX = Math.abs(offsetX - lastX);
      const deltaY = Math.abs(offsetY - lastY);
      
      if (smooth && deltaX < 2 && deltaY < 2 && isAnimating) {
        return; // Skip update if movement is too small
      }
      
      lastX = offsetX;
      lastY = offsetY;
      
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      
      // Reduce rotation intensity for smoother effect
      const rotateX = round(-(centerX / 8)); // Reduced from /5 to /8
      const rotateY = round(centerY / 6);    // Reduced from /4 to /6
      
      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${rotateX}deg`,
        "--rotate-y": `${rotateY}deg`,
      };
      
      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
      
      // Also set properties on the card itself for better compatibility
      Object.entries(properties).forEach(([property, value]) => {
        card.style.setProperty(property, value);
      });
      
      isAnimating = true;
    };
    
    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;
      
      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);
        
        updateCardTransform(currentX, currentY, card, wrap);
        
        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };
      
      rafId = requestAnimationFrame(animationLoop);
    };
    
    return {
      updateCardTransform,
      createSmoothAnimation,
      rafId: null,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        isAnimating = false;
      },
    };
  }, [enableTilt, enableMobileTilt]);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    
    // Use requestAnimationFrame for smoother updates
    if (animationHandlers.rafId) {
      cancelAnimationFrame(animationHandlers.rafId);
    }
    
    animationHandlers.rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap,
        true // Enable smoothing
      );
    });
  }, [animationHandlers]);

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    
    // Debug: Log when pointer enters
    console.log('Pointer enter detected on card:', card);
    
    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback((event) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.SMOOTH_DURATION,
      event.offsetX,
      event.offsetY,
      card,
      wrap
    );
    wrap.classList.remove("active");
    card.classList.remove("active");
  }, [animationHandlers]);

  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;

    // Add both pointer and mouse events for better compatibility
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);
    
    // Also add mouse events as fallback
    card.addEventListener("mouseenter", handlePointerEnter);
    card.addEventListener("mousemove", handlePointerMove);
    card.addEventListener("mouseleave", handlePointerLeave);

    console.log('Event listeners added to card:', card, 'Props:', { enableTilt, enableMobileTilt });

    // Initial animation
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      card.removeEventListener("mouseenter", handlePointerEnter);
      card.removeEventListener("mousemove", handlePointerMove);
      card.removeEventListener("mouseleave", handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave, enableTilt, enableMobileTilt]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <div ref={cardRef} className="pc-card">
        <div className="pc-avatar-content">
          <img 
            className="avatar" 
            src={member ? member.avatarUrl : avatarUrl} 
            alt={`${member ? member.name : name} avatar`}
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              if (!e.target.dataset.fallbackAttempted) {
                e.target.dataset.fallbackAttempted = 'true';
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member ? member.name : name)}&size=400&background=000&color=fff&bold=true`;
              }
            }}
          />
        </div>
        
        <div className="pc-content">
          <div className="pc-details">
            <h3>{member ? member.name : name}</h3>
            
            {/* Team and Department in first row */}
            {member && (member.teamName || member.departmentName) && (
              <div className="team-department-row">
                {member.teamName && (
                  <span className="member-team-box">{member.teamName}</span>
                )}
                {member.departmentName && (
                  <span className="member-department-box">{member.departmentName}</span>
                )}
              </div>
            )}
            
            {/* Position in second row */}
            {member && member.position && (
              <div className="position-row">
                <span className="member-position-box">{member.position}</span>
              </div>
            )}
            
            {/* Social Media Buttons */}
            <div className="social-buttons">
              {member && member.github && (
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-btn github-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              )}
              {member && member.linkedin && (
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-btn linkedin-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
