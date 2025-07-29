import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Phases.css";
gsap.registerPlugin(ScrollTrigger);

export default function Phases(props) {
	const phasesContainerRef = useRef(null);
	const phaseHeadingRef = useRef(null);
	const phaseTaglineRef = useRef(null);
	const phaseTextRef = useRef(null);

	useGSAP(() => {
		let trigger = null;
		const ctx = gsap.context(() => {
			const timline = gsap.timeline({
				scrollTrigger: {
					trigger: phasesContainerRef.current,
					start: "top center",
					end: "+=200px",
					scrub: 1,
					onRefresh: (self) => {
						trigger = self;
					},
				},
			});
			timline
				.fromTo(
					phaseHeadingRef.current,
					{
						y: "100px",
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						ease: "power2.out",
					}
				)
				.fromTo(
					phaseTaglineRef.current,
					{
						y: "100px",
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						ease: "power2.out",
					}
				)
				.fromTo(
					phaseTextRef.current,
					{
						y: "100px",
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						ease: "power2.out",
					}
				);
		});
	});

	return (
		<>
			<div className="phases-container" ref={phasesContainerRef}>
				{props.heading && (
					<div className="home-phase-heading" ref={phaseHeadingRef}>
						<h2>{props.heading}</h2>
					</div>
				)}
				<div className="home-phase-tagline" ref={phaseTaglineRef}>
					<h1>{props.tagline_1}</h1>
					<h1>{props.tagline_2}</h1>
					<h1>{props.tagline_3}</h1>
				</div>
				<div className="home-phase-text" ref={phaseTextRef}>
					{props.content}
				</div>
			</div>
		</>
	);
}
