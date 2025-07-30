import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./JoinUsTeam.css";

gsap.registerPlugin(ScrollTrigger);

export default function JoinUsTeam(props) {
	const secRef = useRef(null);
	const headingRef = useRef(null);
	const descRef = useRef(null);
	const deptRef = useRef(null);

	useGSAP(() => {
		let trigger = null;
		const contxt = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: secRef.current,
					start: "top center",
					end: "+=200px",
					scrub: 1,
					onRefresh: (self) => {
						trigger = self;
					},
				},
			});
			tl.fromTo(
				headingRef.current,
				{ y: "100px", opacity: 0 },
				{
					y: 0,
					opacity: 1,
					ease: "power2.inOut",
				}
			)
				.fromTo(
					descRef.current,
					{ y: "100px", opacity: 0 },
					{
						y: 0,
						opacity: 1,
						ease: "power2.inOut",
					}
				)
				.fromTo(
					deptRef.current,
					{ y: "100px", opacity: 0 },
					{
						y: 0,
						opacity: 1,
						ease: "power2.inOut",
					}
				);
		});
	});

	return (
		<div className="join-us-team-section" ref={secRef}>
			<h1 className="team-name-heading" ref={headingRef}>
				{props.title}
			</h1>
			<div className="team-short-desc" ref={descRef}>
				{props.desc}
			</div>
			<div className="department-list-name" ref={deptRef}>
				{props.departments &&
					props.departments.map((dept, idx) => (
						<div key={idx} className="department-name">
							<div>
								<img
									src={`src/content/${dept}.png`}
									alt=""
									className="deptIcon"
									style={{
										backgroundSize: "cover",
										height: "40px",
										width: "40px",
									}}
								/>
							</div>
							<span>{dept}</span>
						</div>
					))}
			</div>
		</div>
	);
}
