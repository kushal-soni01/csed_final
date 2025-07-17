import React from "react";
import HomeHero from "../components/HomeHero";
import Phases from "../components/Phases";

export default function Home() {
	return (
		<>
			<HomeHero />
			<Phases
				heading="So, What is CSED?"
				tagline_1="A place where spark"
				tagline_2="turn into stars."
				content="CSED CLUB GLA helps the hustling startups and young
				professionals vía dynamie workshops, thought-provoking speaker
				sessions, high-stakes business plan competitions, and numerous
				other game-changing initiatives throughout the year to create a
				crucible for innovation. We stand as pillars of support for
				budding entrepreneurs, providing them with personalized guidance
				from experienced mentors, crucial funding opportunities, and a
				robust network that can change the course of their journey
				forever!"
			/>
			<Phases
				tagline_1="Join Our Community &"
				tagline_3="Explore the world of innovation"
				content="The CSED Club drives innovation and technological growth within the department. It organizes hackathons, workshops, and speaker sessions to equip students with practical, industry-relevant skills. By fostering collaboration and creativity, the club transforms ideas into impactful projects. Join us to explore, build, and lead in the evolving world of technology."
			/>
		</>
	);
}
