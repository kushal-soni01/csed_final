import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./FAQSection.css";
gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
	const [activeIndex, setActiveIndex] = useState(null);
	const faqRefs = useRef([]);
	const titleRef = useRef(null);
	const containerRef = useRef(null);
	const shapesRef = useRef([]);

	const faqData = [
		{
			question: "What is the CSED Club?",
			answer: "The CSED Club is a student-led community that fosters innovation, learning, and collaboration in the fields of technology, coding, and development.",
		},
		{
			question: "Why Join the CSED Club?",
			answer: "Being a part of the CSED Club isn't just about coding — it's about growing, connecting, and creating. Whether you're a beginner or a tech pro, the club opens doors to hands-on learning, real-world projects, exciting events, and a vibrant community that supports your journey every step of the way.",
		},
		{
			question: "Who can join the CSED Club?",
			answer: "The club is open to all students of GLA University who are passionate about computer science, coding, or related fields—regardless of experience level.",
		},
		{
			question: "What kind of activities does the CSED Club organize?",
			answer: "We conduct coding competitions, workshops, guest lectures, project showcases, hackathons, and fun tech-based events to encourage peer learning and real-world skills.",
		},
		{
			question: "How often does the club hold meetings or events?",
			answer: "We organize events regularly including workshops, team discussions, and major tech events per semester.",
		},
		{
			question: "How will it help society?",
			answer: "The CSED Club empowers students to solve real-world problems through technology. By promoting innovation, digital literacy, and collaboration, we create practical solutions and raise awareness, building a tech-savvy community that drives positive change.",
		},
		{
			question:
				"How can I stay updated about upcoming events and activities?",
			answer: "Follow our official Instagram page, LinkedIn profile, and join our WhatsApp community group for instant updates.",
		},
		{
			question: "What makes CSED Club different from other tech clubs?",
			answer: "We're not just about coding—we're about creating. Here, you'll find a mix of tech enthusiasts, designers, innovators, and problem-solvers who collaborate, compete, and contribute with purpose. It's not just a club, it's a culture.",
		},
	];

	useEffect(() => {
		// Initial animation for the title
		gsap.fromTo(
			titleRef.current,
			{ opacity: 0, y: -50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
		);

		// Stagger animation for FAQ items
		gsap.fromTo(
			".faq-item",
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top top",
					end: "+=400px",
					scrub: 1,
				},
				stagger: 0.1,
				ease: "power2.out",
			}
		);

		// Animate floating shapes
		shapesRef.current.forEach((shape, index) => {
			if (shape) {
				// Random initial position
				gsap.set(shape, {
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					rotation: Math.random() * 360,
					scale: 0.5 + Math.random() * 0.5,
				});

				// Continuous floating animation
				gsap.to(shape, {
					x: `+=${Math.random() * 200 - 100}`,
					y: `+=${Math.random() * 200 - 100}`,
					rotation: `+=${360 + Math.random() * 360}`,
					duration: 10 + Math.random() * 10,
					repeat: -1,
					yoyo: true,
					ease: "none",
				});

				// Pulsing scale animation
				gsap.to(shape, {
					scale: `+=${0.2 + Math.random() * 0.3}`,
					duration: 3 + Math.random() * 4,
					repeat: -1,
					yoyo: true,
					ease: "power2.inOut",
				});
			}
		});
	}, []);

	const toggleFAQ = (index) => {
		const isCurrentlyActive = activeIndex === index;
		const newActiveIndex = isCurrentlyActive ? null : index;

		// Close current active item
		if (activeIndex !== null && activeIndex !== index) {
			const currentAnswer =
				faqRefs.current[activeIndex].querySelector(".faq-answer");
			const currentIcon =
				faqRefs.current[activeIndex].querySelector(".faq-icon");

			gsap.to(currentAnswer, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: "power2.inOut",
			});

			gsap.to(currentIcon, {
				rotation: 0,
				duration: 0.3,
				ease: "power2.inOut",
			});
		}

		// Open/close clicked item
		if (!isCurrentlyActive) {
			const answer = faqRefs.current[index].querySelector(".faq-answer");
			const icon = faqRefs.current[index].querySelector(".faq-icon");

			gsap.set(answer, { height: "auto" });
			const height = answer.offsetHeight;
			gsap.set(answer, { height: 0 });

			gsap.to(answer, {
				height: height,
				opacity: 1,
				duration: 0.4,
				ease: "power2.out",
			});

			gsap.to(icon, {
				rotation: 45,
				duration: 0.3,
				ease: "power2.inOut",
			});

			// Add a subtle bounce effect to the FAQ item
			gsap.to(faqRefs.current[index], {
				scale: 1.02,
				duration: 0.1,
				yoyo: true,
				repeat: 1,
				ease: "power2.inOut",
			});
		} else {
			const answer = faqRefs.current[index].querySelector(".faq-answer");
			const icon = faqRefs.current[index].querySelector(".faq-icon");

			gsap.to(answer, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: "power2.inOut",
			});

			gsap.to(icon, {
				rotation: 0,
				duration: 0.3,
				ease: "power2.inOut",
			});
		}

		setActiveIndex(newActiveIndex);
	};

	return (
		<div className="faq-section" ref={containerRef}>
			{/* Floating Background Shapes */}
			<div className="floating-shapes">
				<div
					className="shape shape-circle"
					ref={(el) => (shapesRef.current[0] = el)}
				></div>
				<div
					className="shape shape-triangle"
					ref={(el) => (shapesRef.current[1] = el)}
				></div>
				<div
					className="shape shape-square"
					ref={(el) => (shapesRef.current[2] = el)}
				></div>
				<div
					className="shape shape-hexagon"
					ref={(el) => (shapesRef.current[3] = el)}
				></div>
				<div
					className="shape shape-diamond"
					ref={(el) => (shapesRef.current[4] = el)}
				></div>
				<div
					className="shape shape-circle-outline"
					ref={(el) => (shapesRef.current[5] = el)}
				></div>
				<div
					className="shape shape-star"
					ref={(el) => (shapesRef.current[6] = el)}
				></div>
				<div
					className="shape shape-pentagon"
					ref={(el) => (shapesRef.current[7] = el)}
				></div>
			</div>

			<div className="faq-container">
				<h2 className="faq-title" ref={titleRef}>
					Frequently Asked Questions
					<span className="title-accent"></span>
				</h2>

				<div className="faq-list">
					{faqData.map((item, index) => (
						<div
							key={index}
							className={`faq-item ${
								activeIndex === index ? "active" : ""
							}`}
							ref={(el) => (faqRefs.current[index] = el)}
							onClick={() => toggleFAQ(index)}
						>
							<div className="faq-question">
								<h3>{item.question}</h3>
								<div className="faq-icon">
									<span></span>
									<span></span>
								</div>
							</div>
							<div className="faq-answer">
								<p>{item.answer}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FAQSection;
