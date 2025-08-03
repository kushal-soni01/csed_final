import React from "react";
import { Link } from "react-router-dom";

export default function () {
	return (
		<>
			<div className="footer">
				<div className="left_area_info">
					<h2>CSED CLUB GLAU</h2>
					<h5>SUBSCRIBE TO OUR BLOG</h5>
					<button className="subscribe-to">
						<i className="fa-solid fa-arrow-right"></i>
					</button>
				</div>
				<div className="our_projects_section">
					<h3>OUR PROJECTS</h3>
					<Link to="/Projects">
						<span className="project_name">GrimeRover</span>
					</Link>
					<Link to="/Projects">
						<span className="project_name">Drone</span>
					</Link>
					<Link to="/Projects">
						<span className="project_name">RC Car</span>
					</Link>
					<Link to="/Projects">
						<span className="project_name">Aaroi</span>
					</Link>
				</div>
				<div className="useful_links_section">
					<h3>USEFUL LINKS</h3>
					<Link to="/">
						<span className="page_link">Home</span>
					</Link>
					<Link to="/team">
						<span className="page_link">Team</span>
					</Link>
					<Link to="/events">
						<span className="page_link">Events</span>
					</Link>
					<Link to="/projects">
						<span className="page_link">Project</span>
					</Link>
				</div>
				<div className="social_links_section">
					<h3>SOCIAL</h3>
					<a href="https://www.instagram.com/csed_club_glau/">
						<i className="fa-brands fa-instagram"></i>
						Instagram
					</a>
					<a href="https://www.linkedin.com/company/csed-club-glau/posts/?feedView=all">
						<i className="fa-brands fa-linkedin fa- l"></i>
						Linkedin
					</a>
				</div>
				<div className="contact_section">
					<h3>CONTACT</h3>
					<span className="address">GLAU, Mathura</span>
					<a className="email" href="mailto:csed.club@gla.ac.in">
						Email: csed.club@gla.ac.in
					</a>
				</div>
				<div className="copyright_section">
					&copy; 2025 Copyright: CSED CLUB GLAU
				</div>
			</div>
		</>
	);
}
