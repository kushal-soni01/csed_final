// CSEDProjectsGallery.jsx
import React from "react";
import ProjectsImg from "../content/Projects.jpg";
import "./Gallery.css";

const projects = [
	{
		name: "GrimeRover",
		image: "/images/projects/grimerover.jpg",
		desc: "This rover is a small robot made to go into places that are dirty narrow, or ot unsafe for people - like inside drains or under the ground. It can move by itself or be controlled from far away, It has a camera to show what's happening around it and can check if the air or water in that area is dirty or dangerous. This robot helps in finding problems like blockagesm bad smells, or harmful gases, without sending any person inside. It's useful fir keeping cities clean and safe.",
		members: ["Chaitanya Srivastava", "Vedant Sharma", "Reet Bharadwaj"],
		mentors: ["Dr. Ram Manohar Nisarg", "Mr. Devendra Rathore"],
	},
	{
		name: "Drone",
		image: "images/projects/drone.jpg",
		desc: "VoiceLight is an Arduino Mega-based interactive system that uses a microphone to detect and respond to spoken traffic light commands. When the user says “green light,” the multi-color LED glows green; when “red light” is spoken, it switches to red. This voice-responsive control system demonstrates basic natural language interaction with embedded electronics and highlights the potential of speech-based automation in signaling and accessibility-focused applications.",
		members: [
			"Shubh Singhal",
			"Sparsh Sharma",
			"Aditya Yadav",
			"Krishna Mittal",
			"Ansh Agrawal",
			"Kavya Upadhyay",
			"Manas",
		],
		mentors: ["Mr. Devendra Kumar Rathore", "Dr. Ram Manohar Nisarg"],
	},
	{
		name: "RC Car",
		image: "images/projects/rccar.jpg",
		desc: "SafeStop is a microcontroller-based anti-braking system designed to enhance vehicle safety using an Arduino Uno and servo motors. The system detects sudden braking conditions and intelligently regulates braking force through servo actuation, minimizing the risk of wheel lock-up or skidding. This project simulates core concepts of Anti-lock Braking Systems (ABS) in real-world vehicles and showcases how embedded systems can improve control and safety in braking mechanisms.",
		members: ["Shubh Singhal", "Shubhang Dixit", "Roopam Ganguly"],
		mentors: ["Mr. Devendra Kumar Rathore", "Dr. Ram Manohar Nisarg"],
	},
	{
		name: "Aaroi",
		image: "images/projects/aaroi.jpg",
		desc: "This rover is a small robot made to go into places that are dirty narrow, or ot unsafe for people - like inside drains or under the ground. It can move by itself or be controlled from far away, It has a camera to show what's happening around it and can check if the air or water in that area is dirty or dangerous. This robot helps in finding problems like blockagesm bad smells, or harmful gases, without sending any person inside. It's useful fir keeping cities clean and safe.",
		members: [
			"Krishna Mittal",
			"Sparsh Sharma",
			"Shubh Singhal",
			"Ansh Agrawal",
		],
		mentors: [
			"Mr. Mradul Vajpayee",
			"Mr. Devendra Kumar Rathore",
			"Mr. Pawan Kumar Sharma",
		],
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
						<p className="members">
							<strong>Mentors:</strong>{" "}
							{project.mentors.join(", ")}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
