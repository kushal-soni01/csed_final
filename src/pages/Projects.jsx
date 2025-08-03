import React from "react";
import { useEffect } from "react";
import ProjectHero from "../components/ProjectHero";
import Phases from "../components/Phases";
import Gallery from "../components/Gallery";

export default function Projects() {
	useEffect(() => {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};

		const fadeDiv = document.getElementById("reload-fade");
		if (fadeDiv) {
			setTimeout(() => {
				fadeDiv.classList.add("hide");
			}, 100);
		}
	}, []);
	return (
		<>
			<ProjectHero></ProjectHero>
			<Phases
				tagline_1="Meet our team who made these"
				tagline_3="made these projects to come to life"
				content="The CSED Club drives innovation and technological growth within the department. It organizes hackathons, workshops, and speaker sessions to equip students with practical, industry-relevant skills. By fostering collaboration and creativity, the club transforms ideas into impactful projects. Join us to explore, build, and lead in the evolving world of technology."
			/>
			<Gallery title="{CSED Projects Gallery}"></Gallery>
			<Phases
				tagline_1="{NEXT PROJECT}"
				content="AgriBot is a smart agriculture robot equipped with a mobile rover and a precision robotic arm. It is capable of identifying, differentiating, and selectively plucking various fruits using onboard sensors and computer vision. The system supports both autonomous operation for routine harvesting and manual control for precision tasks. AgriBot aims to increase efficiency, reduce labor, and bring intelligent automation to modern farming."
			/>
		</>
	);
}
