import React, { useRef } from "react";
import JoinUsHeader from "../components/JoinUsHeader";
import JoinUsTeam from "../components/JoinUsTeam";

export default function JoinUs() {
	// Remove curly braces from title props for matching
	const teams = [
		{
			name: "Tech Cell",
			desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias",
			departments: [
				"IoT",
				"Robotics",
				"Frontend",
				"Backend",
				"Full-stack",
				"AIML",
			],
		},
		{
			name: "Operations & Relations",
			desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias",
			departments: ["CR-PR", "Events & Hospitality", "Data"],
		},
		{
			name: "Media Cell",
			desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias",
			departments: ["Design", "Media", "Content"],
		},
	];

	// Create refs for each team section
	const sectionRefs = teams.map(() => useRef(null));

	// Scroll handler
	const handleTeamClick = (teamName) => {
		const idx = teams.findIndex((t) => t.name === teamName);
		if (idx !== -1 && sectionRefs[idx].current) {
			sectionRefs[idx].current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<JoinUsHeader onTeamClick={handleTeamClick} />
			{teams.map((team, idx) => (
				<JoinUsTeam
					key={team.name}
					title={team.name}
					desc={team.desc}
					departments={team.departments}
					sectionRef={sectionRefs[idx]}
				/>
			))}
		</>
	);
}
