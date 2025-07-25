import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectHero.css";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

export default function ProjectHero() {
	const scrollRef = useRef();
	const tl = gsap.timeline();

	useGSAP(() => {
		//Peject_greet
		gsap.from(".project_greet", {
			top: "90px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".project_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".project_greet", {
			top: "25px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".project-hero-container",
				start: "10px",
				end: "40px",
				scrub: true,
			},
		});
		gsap.to(".project_greet", {
			top: "-15px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".project-hero-container",
				start: "30px",
				end: "120px",
				scrub: true,
			},
		});

		//Project_letter
		tl.fromTo(
			".project_letter",
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
		).to(".project_letter", {
			opacity: 0,
			top: "-264px",
			ease: "expo",
			duration: 1,
			stagger: {
				each: 0.1,
				from: "start",
			},
			scrollTrigger: {
				trigger: ".project-hero-container",
				start: "12px",
				end: "120px",
				scrub: true,
			},
		});

		//Project_Slogan
		gsap.from(".project_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.in",
		});
		gsap.to(".project_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			delay: 1.5,
		});
		gsap.from(".project_slogan", {
			top: "-30px",
			opacity: 1,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".project-hero-container",
				start: "90px",
				end: "120px",
				scrub: true,
			},
		});
		gsap.to(".project_slogan", {
			top: "-60px",
			opacity: 0,
			duration: 1,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".project-hero-container",
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
		// 		trigger: ".project-hero-container",
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
			<div className="project-hero-container" ref={scrollRef}>
				<span className="project_greet">
					We welcome you to the CSED CLUB
				</span>
				<div className="project_letter_container" ref={scrollRef}>
					<span className="project_letter"></span>
					<span className="project_letter">P</span>
					<span className="project_letter">R</span>
					<span className="project_letter">O</span>
					<span className="project_letter">J</span>
					<span className="project_letter">E</span>
					<span className="project_letter">C</span>
					<span className="project_letter">T</span>
					<span className="project_letter">S</span>
				</div>
				<span className="project_slogan" ref={scrollRef}>
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
			<div className="project-gallery"></div>
			{/* <div className="video-gallery-container">
				<div id="video-box1">
					<video
						src={null}
						style={{
							height: "250px",
							background: "aqua",
							width: "250px",
						}}
					></video>
					<span>Project Name</span>
				</div>
				<div id="video-box2">
					<video
						src={null}
						style={{
							height: "250px",
							width: "250px",
							background: "aqua",
						}}
					></video>
					<span>Project Name</span>
				</div>
				<div id="video-box3">
					<video
						src={null}
						style={{
							height: "250px",
							width: "250px",
							background: "aqua",
						}}
					></video>
					<span>Project Name</span>
				</div>
				<div id="video-box4">
					<video
						src={null}
						style={{
							height: "250px",
							width: "250px",
							background: "aqua",
						}}
					></video>
					<span>Project Name</span>
				</div>
				<div id="video-box5">
					<video
						src={null}
						style={{
							height: "250px",
							width: "250px",
							background: "aqua",
						}}
					></video>
					<span>Project Name</span>
				</div>
			</div> */}
		</>
	);
}
