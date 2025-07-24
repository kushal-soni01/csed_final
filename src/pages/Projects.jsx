import React from "react";
import { useEffect } from "react";
import ProjectHero from "../components/ProjectHero";
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
			<Gallery></Gallery>
		</>
	);
}
