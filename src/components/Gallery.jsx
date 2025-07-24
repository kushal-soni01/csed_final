// CSEDProjectsGallery.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectsImg from "../content/Projects.jpg";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		name: "HealthCare Automation",
		image: ProjectsImg,
		desc: "Automates patient queue and report delivery system.",
		members: ["Alice", "Bob", "Charlie"],
	},
	{
		name: "EduConnect Portal",
		image: ProjectsImg,
		desc: "A platform connecting students and mentors for academic support.",
		members: ["David", "Eva", "Frank"],
	},
	{
		name: "Smart Inventory",
		image: ProjectsImg,
		desc: "IoT-based inventory management for small businesses.",
		members: ["Grace", "Heidi", "Ivan"],
	},
	{
		name: "EventEase",
		image: ProjectsImg,
		desc: "Automated event scheduling and notifications.",
		members: ["Judy", "Karl", "Liam"],
	},
	{
		name: "Campus Navigator",
		image: ProjectsImg,
		desc: "Interactive campus maps and navigation for new students.",
		members: ["Mallory", "Nina", "Oscar"],
	},
	{
		name: "CodeCollab",
		image: ProjectsImg,
		desc: "Real-time collaborative coding platform.",
		members: ["Peggy", "Quentin", "Rita"],
	},
	{
		name: "FitTrack",
		image: ProjectsImg,
		desc: "Personal fitness tracking and analytics app.",
		members: ["Sam", "Trudy", "Uma"],
	},
	{
		name: "GreenThumb",
		image: ProjectsImg,
		desc: "Urban gardening assistant with plant care reminders.",
		members: ["Victor", "Wendy", "Xander"],
	},
];

export default function Gallery(props) {
	const containerRef = useRef(null);
	const titleRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		const sections = container.querySelectorAll(".project-section");
		const title = titleRef.current;

		// Title animation
		gsap.fromTo(
			title,
			{ opacity: 0, y: -60 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: container,
					start: "top center",
				},
			}
		);

		// Pin the container for the duration of all sections
		gsap.to(container, {
			scrollTrigger: {
				trigger: container,
				start: "top top",
				end: () => `+=${sections.length * 100}vh`,
				scrub: true,
				// pin: true,
				// anticipatePin: 1,
			},
		});

		// Overlapping sticky sections
		sections.forEach((section, i) => {
			gsap.fromTo(
				section,
				{ yPercent: 100, zIndex: i + 2 },
				{
					yPercent: 0,
					zIndex: i + 2,
					scrollTrigger: {
						trigger: container,
						start: () => `top top+=${i * 100}vh`,
						end: () => `top top+=${(i + 1) * 100}vh`,
						scrub: true,
					},
				}
			);
		});
	}, []);

	const toggleDetails = (e) => {
		e.currentTarget.classList.toggle("show-details");
	};

	return (
		<div className="component-container" ref={containerRef}>
			<h1 className="gallery-title" ref={titleRef}>
				{props.title || "{CSED Projects Gallery}"}
			</h1>
			<div className="project-gallery">
				{projects.map((project, idx) => (
					<div
						className="project-section"
						key={idx}
						onClick={toggleDetails}
						tabIndex={0}
						aria-label={`Project: ${project.name}`}
					>
						<h2>{project.name}</h2>
						<img src={project.image} alt={project.name} />
						<div className="project-details">
							<p className="desc">{project.desc}</p>
							<p className="members">
								<strong>Members:</strong>{" "}
								{project.members.join(", ")}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
