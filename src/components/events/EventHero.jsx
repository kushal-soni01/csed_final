import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EventHero.css";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

export default function EventHero() {
	const scrollRef = useRef();
	const tl = gsap.timeline();

	useGSAP(() => {
		//Event_greet
		gsap.from(".event_greet", {
			top: "90px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".event_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".event_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".event-hero-container",
				start: "10px",
				end: "40px",
				scrub: true,
			},
		});
		gsap.to(".event_greet", {
			top: "-15px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".event-hero-container",
				start: "30px",
				end: "120px",
				scrub: true,
			},
		});

		//Event_letter
		tl.fromTo(
			".event_letter",
			{
				opacity: 0,
				top: "264px",
				ease: "expo",
				duration: 0.5,
				stagger: {
					each: 0.05,
					from: "center",
				},
			},
			{
				opacity: 1,
				top: "0px",
				ease: "expo",
				duration: 0.5,
				stagger: {
					each: 0.05,
					from: "center",
				},
			}
		).to(".event_letter", {
			opacity: 0,
			top: "-264px",
			ease: "expo",
			duration: 1,
			stagger: {
				each: 0.1,
				from: "start",
			},
			scrollTrigger: {
				trigger: ".event-hero-container",
				start: "12px",
				end: "120px",
				scrub: true,
			},
		});

		//Event_Slogan
		gsap.from(".event_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".event_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			delay: 1.5,
		});
		gsap.from(".event_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".event-hero-container",
				start: "90px",
				end: "120px",
				scrub: true,
			},
		});
		gsap.to(".event_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".event-hero-container",
				start: "92px",
				end: "175px",
				scrub: true,
			},
		});
		// gsap.from(".entry-bg", {
		// 	scale: 0.5,
		// 	autoAlpha: 0,
		// 	ease: "expo.in",
		// 	scrollTrigger: {
		// 		trigger: ".event-hero-container",
		// 		start: "173px",
		// 		end: "210px",
		// 		scrub: 1,
		// 	},
		// });
	}, []);

	useEffect(() => {
		const newtl = gsap.timeline({
			repeat: -1,
			yoyo: true,
		});
		const words_container = document.querySelector(".words");
		let heightResp = parseFloat(
			getComputedStyle(words_container).getPropertyValue("height")
		);

		for (let i = 0; i < 4; i++) {
			newtl.to(".words", {
				bottom: `+=${heightResp}px`,
				duration: 1.5,
				ease: "elastic.inOut",
			});
		}
	});

	return (
		<>
			{/* <div className="entry-bg"></div> */}
			<div className="event-hero-container" ref={scrollRef}>
				<span className="event_greet">
					We welcome you to the CSED CLUB
				</span>
				<div className="event_letter_container" ref={scrollRef}>
					<span className="event_letter"></span>
					<span className="event_letter">E</span>
					<span className="event_letter">V</span>
					<span className="event_letter">E</span>
					<span className="event_letter">N</span>
					<span className="event_letter">T</span>
					<span className="event_letter">S</span>
				</div>
				<span className="event_slogan" ref={scrollRef}>
					Where the artwork ignites&nbsp;
					<div className="words_container">
						<span className="words" id="word1">
							innovation
						</span>
						<span className="words" id="word2">
							ideas
						</span>
						<span className="words" id="word3">
							minds
						</span>
						<span className="words" id="word4">
							dreams
						</span>
						<span className="words" id="word5">
							future
						</span>
					</div>
				</span>
			</div>
			<div className="event-gallery"></div>
			
		</>
	);
}
