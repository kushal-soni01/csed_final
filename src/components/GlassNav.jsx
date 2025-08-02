import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./GlassNav.css";

const GlassNav = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navItems = [
		{ name: "Team", to: "/team" },
		{ name: "Events", to: "/events" },
		{ name: "Projects", to: "/projects" },
		{ name: "Newsletter", to: "/newsletter" },
		{ name: "Join Us", to: "/join" },
	];

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);
	const closeMenu = () => setIsOpen(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useGSAP(() => {
		gsap.from(".glass-overlay", {
			backgroundColor: "transparent",
			ease: "power2.inOut",
			scrollTrigger: {
				trigger: ".glass-nav",
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		});
	});

	const location = useLocation();

	return (
		<div className="navbar-container">
			{/* SVG Filter for Glass Distortion */}
			<svg style={{ display: "none" }}>
				<filter id="glass-distortion">
					<feTurbulence
						type="turbulence"
						baseFrequency="0.008"
						numOctaves="2"
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="77"
					/>
				</filter>
			</svg>

			<nav className="glass-nav">
				<div className="glass-filter"></div>
				<div className="glass-overlay"></div>
				<div className="glass-specular"></div>

				<div className="glass-content">
					{/* Desktop Layout */}
					<div className="desktop-nav">
						{/* Logo */}
						<div className="logo-section">
							<Link to="/" className="logo" onClick={closeMenu}>
								CSED
							</Link>
						</div>

						{/* Navigation Items */}
						<div className="nav-indicator-container">
							<ul className="nav-list">
								{navItems.map((item) => (
									<li key={item.name}>
										<Link
											to={item.to}
											className={`nav-item`}
											onClick={closeMenu}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Mobile Layout */}
					<div className="mobile-nav">
						{/* Mobile Menu Button */}
						<button
							className="mobile-menu-button"
							onClick={toggleMobileMenu}
						>
							<div
								className={`hamburger ${
									isMobileMenuOpen ? "active" : ""
								}`}
							>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>

						{/* Logo */}
						<div className="logo-section">
							<Link to="/" className="logo" onClick={closeMenu}>
								CSED
							</Link>
						</div>
					</div>

					{/* Mobile Slide Menu */}
					<div
						className={`mobile-slide-menu ${
							isMobileMenuOpen ? "open" : ""
						}`}
					>
						<ul className="mobile-nav-list">
							{navItems.map((item) => (
								<li key={item.name}>
									<Link
										to={item.to}
										className={`nav-item`}
										onClick={closeMenu}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default GlassNav;
