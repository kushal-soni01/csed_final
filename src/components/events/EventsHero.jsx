import React, { useEffect } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EventsHero.css";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

// const arr = ["innovation", "ideas", "dreams", "the"
//     "future", "minds"]

export default function EventsHero() {
	const eventsScrollRef = useRef();
	const eventsTl = gsap.timeline();

	useGSAP(() => {
		//Events_greet
		gsap.from(".events_greet", {
			top: "90px",
			opacity: 0,
			duration: 1.5,
			ease: "power1.in",
		});
		gsap.to(".events_greet", {
			top: "25px",
			opacity: 1,
			duration: 1.5,
			ease: "power1.out",
		});
		gsap.from(".events_greet", {
			top: "25px",
			opacity: 1,
			duration: 1.5,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".events-hero-container",
				start: "10px",
				end: "40px",
				scrub: true,
			},
		});
		gsap.to(".events_greet", {
			top: "-15px",
			opacity: 0,
			duration: 1.5,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".events-hero-container",
				start: "30px",
				end: "120px",
				scrub: true,
			},
		});

		//Events_letter
		eventsTl.fromTo(
			".events_letter",
			{
				opacity: 0,
				top: "264px",
				ease: "expo",
				duration: 0.8,
				stagger: {
					each: 0.05,
					from: "center",
				},
			},
			{
				opacity: 1,
				top: "0px",
				ease: "expo",
				duration: 0.8,
				stagger: {
					each: 0.05,
					from: "center",
				},
			}
		).to(".events_letter", {
			opacity: 0,
			top: "-264px",
			ease: "expo",
			duration: 1.5,
			stagger: {
				each: 0.1,
				from: "start",
			},
			scrollTrigger: {
				trigger: ".events-hero-container",
				start: "12px",
				end: "120px",
				scrub: true,
			},
		});

		//Events_Slogan
		gsap.from(".events_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1.5,
			ease: "power1.in",
		});
		gsap.to(".events_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1.5,
			ease: "power1.out",
			delay: 1.5,
		});
		gsap.from(".events_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1.5,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".events-hero-container",
				start: "90px",
				end: "120px",
				scrub: true,
			},
		});
		gsap.to(".events_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1.5,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".events-hero-container",
				start: "92px",
				end: "190px",
				scrub: true,
			},
		});
		gsap.from(".events-entry-bg", {
			scale: 0.5,
			autoAlpha: 0,
			ease: "expo.in",
			duration: 1.5,
		});
	}, []);

	useEffect(() => {
		let newtl;
		
		// Wait for component to mount and elements to be available
		const timer = setTimeout(() => {
			const eventsWordsElements = document.querySelectorAll(".events_words");
			
			if (eventsWordsElements.length > 0) {
				// Create the timeline
				newtl = gsap.timeline({
					repeat: -1,
				});

				// Set initial positions - hide all words except the first one
				eventsWordsElements.forEach((word, index) => {
					if (index === 0) {
						gsap.set(word, { y: 0, opacity: 1 });
					} else {
						gsap.set(word, { y: "100%", opacity: 0 });
					}
				});

				// Create animation sequence
				let currentTime = 2; // Start after 2 seconds

				for (let i = 0; i < eventsWordsElements.length; i++) {
					const currentIndex = i;
					const nextIndex = (i + 1) % eventsWordsElements.length;
					
					// Hide current word
					newtl.to(eventsWordsElements[currentIndex], {
						y: "-100%",
						opacity: 0,
						duration: 0.6,
						ease: "power2.in",
					}, currentTime);
					
					// Show next word
					newtl.fromTo(eventsWordsElements[nextIndex], {
						y: "100%",
						opacity: 0,
					}, {
						y: "0%",
						opacity: 1,
						duration: 0.6,
						ease: "power2.out",
					}, currentTime + 0.1);
					
					currentTime += 2.5; // Wait 2.5 seconds before next transition
				}
			}
		}, 1000); // Increased delay to ensure everything is loaded

		// Cleanup function
		return () => {
			clearTimeout(timer);
			if (newtl) {
				newtl.kill();
			}
		};
	}, []);

	return (
		<>
			<div className="events-entry-bg"></div>
			<div className="events-hero-container" ref={eventsScrollRef}>
				{/* Background Shapes Animation */}
				<div className="hero-background-shapes">
					{/* Basic geometric shapes */}
					<div className="hero-shape hero-triangle hero-triangle-1"></div>
					<div className="hero-shape hero-triangle hero-triangle-2"></div>
					<div className="hero-shape hero-triangle hero-triangle-3"></div>
					<div className="hero-shape hero-triangle hero-triangle-4"></div>
					
					<div className="hero-shape hero-square hero-square-1"></div>
					<div className="hero-shape hero-square hero-square-2"></div>
					<div className="hero-shape hero-square hero-square-3"></div>
					<div className="hero-shape hero-square hero-square-4"></div>
					
					<div className="hero-shape hero-circle hero-circle-1"></div>
					<div className="hero-shape hero-circle hero-circle-2"></div>
					<div className="hero-shape hero-circle hero-circle-3"></div>
					<div className="hero-shape hero-circle hero-circle-4"></div>
					
					<div className="hero-shape hero-hexagon hero-hexagon-1"></div>
					<div className="hero-shape hero-hexagon hero-hexagon-2"></div>
					<div className="hero-shape hero-hexagon hero-hexagon-3"></div>
					
					<div className="hero-shape hero-diamond hero-diamond-1"></div>
					<div className="hero-shape hero-diamond hero-diamond-2"></div>
					<div className="hero-shape hero-diamond hero-diamond-3"></div>
					
					{/* Tech symbols */}
					<div className="hero-tech-symbol hero-symbol-1">&lt;/&gt;</div>
					<div className="hero-tech-symbol hero-symbol-2">{ }</div>
					<div className="hero-tech-symbol hero-symbol-3">&lt;&gt;</div>
					<div className="hero-tech-symbol hero-symbol-4">console.log</div>
					<div className="hero-tech-symbol hero-symbol-5">function()</div>
					
					{/* Simple dots */}
					<div className="hero-dot hero-dot-1"></div>
					<div className="hero-dot hero-dot-2"></div>
					<div className="hero-dot hero-dot-3"></div>
					<div className="hero-dot hero-dot-4"></div>
					<div className="hero-dot hero-dot-5"></div>
					<div className="hero-dot hero-dot-6"></div>
					<div className="hero-dot hero-dot-7"></div>
					<div className="hero-dot hero-dot-8"></div>
				</div>

				<span className="events_greet">
					We welcome you to the CSED CLUB
				</span>
				<div className="events_letter_container" ref={eventsScrollRef}>
					<span className="events_letter"></span>
					<span className="events_letter">E</span>
					<span className="events_letter">V</span>
					<span className="events_letter">E</span>
					<span className="events_letter">N</span>
					<span className="events_letter">T</span>
					<span className="events_letter">S</span>
				</div>
				<span className="events_slogan" ref={eventsScrollRef}>
					Where the artwork ignites&nbsp;
					<div className="events_words_container">
						<span className="events_words" id="word1">
							innovation
						</span>
						<span className="events_words" id="word2">
							ideas
						</span>
						<span className="events_words" id="word3">
							minds
						</span>
						<span className="events_words" id="word4">
							dreams
						</span>
						<span className="events_words" id="word5">
							future
						</span>
					</div>
				</span>
			</div>
		</>
	);
}
