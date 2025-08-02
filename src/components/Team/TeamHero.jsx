import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TeamHero.css";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

export default function TeamHero() {
	const scrollRef = useRef();
	const tl = gsap.timeline();

	useGSAP(() => {
		gsap.from(".team_greet", {
			top: "90px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".team_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".team_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".team-hero-container",
				start: "10px",
				end: "40px",
				scrub: true,
			},
		});
		gsap.to(".team_greet", {
			top: "-15px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".team-hero-container",
				start: "30px",
				end: "120px",
				scrub: true,
			},
		});

		tl.fromTo(
			".team_letter",
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
		).to(".team_letter", {
			opacity: 0,
			top: "-264px",
			ease: "expo",
			duration: 1,
			stagger: {
				each: 0.1,
				from: "start",
			},
			scrollTrigger: {
				trigger: ".team-hero-container",
				start: "12px",
				end: "120px",
				scrub: true,
			},
		});

		gsap.from(".team_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".team_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			delay: 1.5,
		});
		gsap.from(".team_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".team-hero-container",
				start: "90px",
				end: "120px",
				scrub: true,
			},
		});
		gsap.to(".team_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".team-hero-container",
				start: "92px",
				end: "175px",
				scrub: true,
			},
		});
	}, []);

	useEffect(() => {
		const newtl = gsap.timeline({
			repeat: -1,
			yoyo: true,
		});
		const words_container = document.querySelector(".t_words");
		let heightResp = parseFloat(
			getComputedStyle(words_container).getPropertyValue("height")
		);

		for (let i = 0; i < 4; i++) {
			newtl.to(".t_words", {
				bottom: `+=${heightResp}px`,
				duration: 1.5,
				ease: "elastic.inOut",
			});
		}
	});

	return (
		<>
			<div className="team-hero-container" ref={scrollRef}>
				<span className="team_greet">
					We welcome you to the CSED CLUB
				</span>
				<div className="team_letter_container" ref={scrollRef}>
					<span className="team_letter"></span>
					<span className="team_letter">T</span>
					<span className="team_letter">E</span>
					<span className="team_letter">A</span>
					<span className="team_letter">M</span>
					<span className="team_letter">S</span>
				</div>
				<span className="team_slogan" ref={scrollRef}>
					Where the artwork ignites&nbsp;
					<div className="team_words_container">
						<span className="t_words" id="t_word1">
							innovation
						</span>
						<span className="t_words" id="t_word2">
							ideas
						</span>
						<span className="t_words" id="t_word3">
							minds
						</span>
						<span className="t_words" id="t_word4">
							dreams
						</span>
						<span className="t_words" id="t_word5">
							future
						</span>
					</div>
				</span>
			</div>
		</>
	);
}
