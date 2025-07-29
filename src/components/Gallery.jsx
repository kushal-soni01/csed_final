// CSEDProjectsGallery.jsx
import React from "react";
import ProjectsImg from "../content/Projects.jpg";
import "./Gallery.css";

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
	const toggleDetails = (e) => {
		e.currentTarget.classList.toggle("show-details");
		const img = e.currentTarget.querySelector("img");
		if (img) {
			img.classList.toggle("dimmed");
		}
	};

	return (
		<div className="component-container">
			<h1 className="gallery-title">{props.title || "{Gallery}"}</h1>
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
	);
}
