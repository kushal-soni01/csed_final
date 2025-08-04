import React from "react";
import NeuronAnimation from "../components/NeuronAnimation";
import FloatingText from "../components/FloatingText";
import ProjectBG from "../content/alex-knight-2EJCSULRwC8-unsplash.jpg";
import HomeGradient from "../components/HomeGradient";
import Phases from "../components/Phases";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
	useGSAP(() => {
		gsap.fromTo(
			".apply-now-container",
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".apply-now-container",
					start: "top 80%",
					end: "bottom 20%",
					scrub: 1,
				},
			}
		);
	});

	return (
		<>
			<NeuronAnimation />
			<HomeGradient />
			<Phases
				heading="About CSED?"
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
			<FloatingText
				source="/images/event/homeevent.mp4"
				mainContent="Events & Activities"
				contentLine1="Our goal is to bridge the gap between learning and doing by helping members gain real-world skills, inspire others, and grow together through collaboration and contribution.
                CSED club is where it all begins — a place where learning, leading, and contributing go hand in hand. "
			/>
			<Phases
				tagline_1="Where Visionaries Forge Skills &"
				tagline_3="Spark Innovation"
				content=" CSED is a vibrant tapestry of dreamers, doers, and digital pioneers, united by the pursuit of excellence. We don’t just teach skills—we cultivate curiosity, foster fearless creativity, and open doors to boundless opportunities. Whether you aspire to master cutting-edge tech, shape your entrepreneurial journey, or join a thriving community of forward-thinkers."
			/>
			<FloatingText
				source="/images/projects/projectHome.mp4"
				mainContent="Ideate. Implement. Innovate."
				contentLine1="The CSED Club nurtures startup mindsets through mentorship, resources, and networking opportunities.
                It hosts events and connects students with leaders to build impactful ventures."
			/>
			<Phases
				tagline_1="Join Our Community &"
				tagline_3="Explore the world of innovation"
				content="The CSED Club drives innovation and technological growth within the department. It organizes hackathons, workshops, and speaker sessions to equip students with practical, industry-relevant skills. By fostering collaboration and creativity, the club transforms ideas into impactful projects. Join us to explore, build, and lead in the evolving world of technology."
			/>
			<div
				className="apply-now-wrapper"
				style={{
					margin: "-50px auto 50px auto",
				}}
			>
				<div className="apply-now-container">
					<button className="apply-now-btn">
						<div className="overline-effect"></div>
						<span
							style={{
								background: "#7b68ee",
								background:
									"linear-gradient(135deg,rgba(123, 104, 238, 1) 0%,rgba(14, 51, 134, 1) 100%)",
								backgroundSize: "cover",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							<Link to="/join">Join Now</Link>
						</span>
						<div className="underline-effect"></div>
					</button>
				</div>
			</div>
		</>
	);
}
