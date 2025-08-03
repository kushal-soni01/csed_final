import React from "react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./HomeGradient.css";

export default function HomeGradient() {
	const containerRef = useRef(null);
	const statsRefs = useRef([]);
	const [hasAnimated, setHasAnimated] = useState(false);

	const statsData = [
		{
			number: 50,
			suffix: "+",
			label: "Events",
			icon: "🎯",
			color: "#64ffda",
		},
		{
			number: 12,
			suffix: "+",
			label: "Hackathon Hosted",
			icon: "💻",
			color: "#ff6b9d",
		},
		{
			number: 60,
			suffix: "+",
			label: "Alumni Members",
			icon: "👥",
			color: "#c77dff",
		},
		{
			number: 10,
			suffix: "+",
			label: "Tie up Companies",
			icon: "🤝",
			color: "#ffd93d",
		},
	];

	useEffect(() => {
		const container = containerRef.current;
		const statElements = statsRefs.current;

		// Initial setup - hide elements
		gsap.set(statElements, {
			opacity: 0,
			y: 50,
			scale: 0.8,
		});

		// Create intersection observer for scroll trigger
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						animateStats();
						setHasAnimated(true);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (container) {
			observer.observe(container);
		}

		const animateStats = () => {
			// Animate container appearance
			gsap.to(statElements, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
			});

			// Animate numbers
			statElements.forEach((element, index) => {
				const numberElement = element.querySelector(".stat-number");
				const targetNumber = statsData[index].number;

				// Create counter object
				const counter = { value: 0 };

				gsap.to(counter, {
					value: targetNumber,
					duration: 2,
					delay: 0.5 + index * 0.2,
					ease: "power2.out",
					onUpdate: () => {
						numberElement.textContent = Math.floor(counter.value);
					},
					onComplete: () => {
						numberElement.textContent = targetNumber;
					},
				});
			});
		};

		return () => {
			if (container) {
				observer.unobserve(container);
			}
		};
	}, [hasAnimated, statsData]);

	const handleStatHover = (index, isHovering) => {
		const element = statsRefs.current[index];

		gsap.to(element, {
			scale: isHovering ? 1.05 : 1,
			rotationY: isHovering ? 5 : 0,
			duration: 0.3,
			ease: "power2.out",
		});

		// Animate the icon
		const icon = element.querySelector(".stat-icon");
		gsap.to(icon, {
			scale: isHovering ? 1.2 : 1,
			rotation: isHovering ? 10 : 0,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	return (
		<div className="GradientContainer">
			<div className="data-details">
				<div className="csedFullForm">
					<div className="logoLetter">
						C<span>enter for</span>
					</div>
					<div className="logoLetter">
						S<span>kills &</span>
					</div>
					<div className="logoLetter">
						E<span>ntrepreneurship</span>
					</div>
					<div className="logoLetter">
						D<span>evelopment</span>
					</div>
				</div>
				<div className="stats-section">
					<div className="stats-container" ref={containerRef}>
						<div className="stats-grid">
							{statsData.map((stat, index) => (
								<div
									key={index}
									className="stat-card"
									ref={(el) =>
										(statsRefs.current[index] = el)
									}
									style={{ "--accent-color": stat.color }}
									onMouseEnter={() =>
										handleStatHover(index, true)
									}
									onMouseLeave={() =>
										handleStatHover(index, false)
									}
								>
									<div className="stat-icon">{stat.icon}</div>
									<div className="stat-content">
										<div className="stat-number-container">
											<span className="stat-number">
												0
											</span>
											<span className="stat-suffix">
												{stat.suffix}
											</span>
										</div>
										<div className="stat-label">
											{stat.label}
										</div>
									</div>
									<div className="stat-glow"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="imp-people-intro">
				<div className="imp-image-area"></div>
				<div className="imp-data-area">
					<h1 className="imp-title">Prof. Anup Kumar Gupta</h1>
					<h3 className="imp-sub-title">
						Vice Chancellor & Director Institute of Applied Sciences
						& Humanities Department of English
					</h3>
					<span className="imp-desc">
						<p>
							Prof. Anup Kumar Gupta serves as the Vice Chancellor
							and Director of the Institute of Applied Sciences &
							Humanities at our college. With over 28 years of
							academic and administrative experience, he plays a
							key role in fostering academic excellence and
							institutional growth.
						</p>
						<p>
							A Gold Medalist in M.A. (English), Prof. Gupta holds
							a Ph.D., M.Phil., MBA, and Executive MBA (Overall
							Topper). His leadership and scholarly contributions
							have significantly enriched the Department of
							English and continue to guide both faculty and
							students toward higher standards of learning and
							research.
						</p>
					</span>
				</div>
			</div>
		</div>
	);
}
