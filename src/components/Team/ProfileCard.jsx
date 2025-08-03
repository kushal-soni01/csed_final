import React, {
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useState,
} from "react";
import "./ProfileCard.css";

const ANIMATION_CONFIG = {
	SMOOTH_DURATION: 600,
	INITIAL_DURATION: 1500,
	INITIAL_X_OFFSET: 70,
	INITIAL_Y_OFFSET: 60,
};

const clamp = (value, min = 0, max = 100) =>
	Math.min(Math.max(value, min), max);

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
	round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
	x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// Hook to detect if device is mobile/touch
const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const isTouchDevice =
				"ontouchstart" in window || navigator.maxTouchPoints > 0;
			const isSmallScreen = window.innerWidth <= 768;
			setIsMobile(isTouchDevice || isSmallScreen);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
};

// Hook for responsive breakpoints
const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState("desktop");

	useEffect(() => {
		const updateBreakpoint = () => {
			const width = window.innerWidth;
			if (width < 480) setBreakpoint("mobile");
			else if (width < 768) setBreakpoint("tablet");
			else if (width < 1200) setBreakpoint("desktop");
			else setBreakpoint("large");
		};

		updateBreakpoint();
		window.addEventListener("resize", updateBreakpoint);

		return () => window.removeEventListener("resize", updateBreakpoint);
	}, []);

	return breakpoint;
};

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
	onContactClick = () => {},
}) => {
	const wrapRef = useRef(null);
	const cardRef = useRef(null);
	const [backgroundImage, setBackgroundImage] = useState(
		member ? member.avatarUrl : avatarUrl
	);
	const [imageError, setImageError] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const isMobile = useIsMobile();
	const breakpoint = useBreakpoint();

	// Handle background image loading and fallback
	useEffect(() => {
		const imageUrl = member ? member.avatarUrl : avatarUrl;

		if (!imageUrl) {
			// Fallback to generated avatar immediately if no URL provided
			const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
				member ? member.name : name
			)}&size=400&background=000&color=fff&bold=true`;
			setBackgroundImage(fallbackUrl);
			setIsLoaded(true);
			return;
		}

		// Create a new image element to test loading
		const img = new Image();
		img.onload = () => {
			setBackgroundImage(imageUrl);
			setImageError(false);
			setIsLoaded(true);
		};
		img.onerror = () => {
			// Fallback to generated avatar
			const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
				member ? member.name : name
			)}&size=400&background=000&color=fff&bold=true`;
			setBackgroundImage(fallbackUrl);
			setImageError(true);
			setIsLoaded(true);
		};
		img.src = imageUrl;
	}, [member, avatarUrl, name]);

	const animationHandlers = useMemo(() => {
		let rafId = null;
		let lastX = 0;
		let lastY = 0;
		let isAnimating = false;

		const updateCardTransform = (
			offsetX,
			offsetY,
			card,
			wrap,
			smooth = true
		) => {
			if (!enableTilt) return;

			// Check if mobile tilt is disabled on mobile devices
			if (!enableMobileTilt && (isMobile || breakpoint === "mobile"))
				return;

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

			// Adjust rotation intensity based on device type
			const rotationIntensity = isMobile ? 0.3 : 1;
			const rotateX = round(-(centerX / 8) * rotationIntensity);
			const rotateY = round((centerY / 6) * rotationIntensity);

			const properties = {
				"--pointer-x": `${percentX}%`,
				"--pointer-y": `${percentY}%`,
				"--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
				"--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
				"--pointer-from-center": `${clamp(
					Math.hypot(percentY - 50, percentX - 50) / 50,
					0,
					1
				)}`,
				"--pointer-from-top": `${percentY / 100}`,
				"--pointer-from-left": `${percentX / 100}`,
				"--rotate-x": `${rotateX}deg`,
				"--rotate-y": `${rotateY}deg`,
			};

			Object.entries(properties).forEach(([property, value]) => {
				wrap.style.setProperty(property, value);
				card.style.setProperty(property, value);
			});

			isAnimating = true;
		};

		const createSmoothAnimation = (
			duration,
			startX,
			startY,
			card,
			wrap
		) => {
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
	}, [enableTilt, enableMobileTilt, isMobile, breakpoint]);

	const handlePointerMove = useCallback(
		(event) => {
			const card = cardRef.current;
			const wrap = wrapRef.current;
			if (!card || !wrap || !animationHandlers) return;

			// Use requestAnimationFrame for smoother updates
			if (animationHandlers.rafId) {
				cancelAnimationFrame(animationHandlers.rafId);
			}

			animationHandlers.rafId = requestAnimationFrame(() => {
				const rect = card.getBoundingClientRect();
				const clientX = event.touches
					? event.touches[0].clientX
					: event.clientX;
				const clientY = event.touches
					? event.touches[0].clientY
					: event.clientY;

				animationHandlers.updateCardTransform(
					clientX - rect.left,
					clientY - rect.top,
					card,
					wrap,
					true
				);
			});
		},
		[animationHandlers]
	);

	const handlePointerEnter = useCallback(() => {
		const card = cardRef.current;
		const wrap = wrapRef.current;
		if (!card || !wrap || !animationHandlers) return;

		animationHandlers.cancelAnimation();
		wrap.classList.add("active");
		card.classList.add("active");
	}, [animationHandlers]);

	const handlePointerLeave = useCallback(
		(event) => {
			const card = cardRef.current;
			const wrap = wrapRef.current;
			if (!card || !wrap || !animationHandlers) return;

			const offsetX =
				event.offsetX || (event.touches ? 0 : event.offsetX);
			const offsetY =
				event.offsetY || (event.touches ? 0 : event.offsetY);

			animationHandlers.createSmoothAnimation(
				ANIMATION_CONFIG.SMOOTH_DURATION,
				offsetX,
				offsetY,
				card,
				wrap
			);
			wrap.classList.remove("active");
			card.classList.remove("active");
		},
		[animationHandlers]
	);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handlePointerEnter();
			}
		},
		[handlePointerEnter]
	);

	const handleKeyUp = useCallback(
		(event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handlePointerLeave({ offsetX: 0, offsetY: 0 });
			}
		},
		[handlePointerLeave]
	);

	useEffect(() => {
		const card = cardRef.current;
		const wrap = wrapRef.current;
		if (!card || !wrap || !animationHandlers) return;

		// Add event listeners based on device capability
		if (isMobile) {
			// Touch events for mobile
			card.addEventListener("touchstart", handlePointerEnter, {
				passive: true,
			});
			card.addEventListener("touchmove", handlePointerMove, {
				passive: true,
			});
			card.addEventListener("touchend", handlePointerLeave, {
				passive: true,
			});
		} else {
			// Mouse events for desktop
			card.addEventListener("mouseenter", handlePointerEnter);
			card.addEventListener("mousemove", handlePointerMove);
			card.addEventListener("mouseleave", handlePointerLeave);
		}

		// Keyboard events for accessibility
		card.addEventListener("keydown", handleKeyDown);
		card.addEventListener("keyup", handleKeyUp);

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
			if (isMobile) {
				card.removeEventListener("touchstart", handlePointerEnter);
				card.removeEventListener("touchmove", handlePointerMove);
				card.removeEventListener("touchend", handlePointerLeave);
			} else {
				card.removeEventListener("mouseenter", handlePointerEnter);
				card.removeEventListener("mousemove", handlePointerMove);
				card.removeEventListener("mouseleave", handlePointerLeave);
			}
			card.removeEventListener("keydown", handleKeyDown);
			card.removeEventListener("keyup", handleKeyUp);
			animationHandlers.cancelAnimation();
		};
	}, [
		animationHandlers,
		handlePointerMove,
		handlePointerEnter,
		handlePointerLeave,
		handleKeyDown,
		handleKeyUp,
		isMobile,
	]);

	// Truncate text for responsive display
	const truncateText = useCallback((text, maxLength) => {
		if (!text) return "";
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength - 3) + "...";
	}, []);

	// Get max text lengths based on breakpoint
	const getMaxTextLengths = useCallback(() => {
		switch (breakpoint) {
			case "mobile":
				return { name: 20, team: 8, department: 8, position: 12 };
			case "tablet":
				return { name: 25, team: 10, department: 10, position: 15 };
			default:
				return { name: 30, team: 12, department: 12, position: 20 };
		}
	}, [breakpoint]);

	const maxLengths = getMaxTextLengths();
	const displayName = truncateText(
		member ? member.name : name,
		maxLengths.name
	);

	return (
		<div
			ref={wrapRef}
			className="pc-card-wrapper"
			style={{ opacity: isLoaded ? 1 : 0.7 }}
		>
			<div
				ref={cardRef}
				className="pc-card"
				style={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
				tabIndex={0}
				role="button"
				aria-label={`Profile card for ${displayName}`}
			>
				{/* Background overlay for text readability */}
				<div className="pc-card-overlay"></div>

				<div className="pc-content">
					<div className="pc-details">
						<h3 title={member ? member.name : name}>
							{displayName}
						</h3>

						{/* Team and Department in first row */}
						{member &&
							(member.teamName || member.departmentName) && (
								<div className="team-department-row">
									{member.teamName && (
										<span
											className="member-team-box"
											title={member.teamName}
										>
											{truncateText(
												member.teamName,
												maxLengths.team
											)}
										</span>
									)}
									{member.departmentName && (
										<span
											className="member-department-box"
											title={member.departmentName}
										>
											{truncateText(
												member.departmentName,
												maxLengths.department
											)}
										</span>
									)}
								</div>
							)}

						{/* Position in second row */}
						{member && member.position && (
							<div className="position-row">
								<span
									className="member-position-box"
									title={member.position}
								>
									{truncateText(
										member.position,
										maxLengths.position
									)}
								</span>
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
									aria-label={`${displayName}'s GitHub profile`}
									tabIndex={0}
								>
									<svg
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
									aria-label={`${displayName}'s LinkedIn profile`}
									tabIndex={0}
								>
									<svg
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
