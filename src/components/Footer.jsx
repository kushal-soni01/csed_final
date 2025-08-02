import React from "react";

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
					<span className="project_name">Project 1</span>
					<span className="project_name">Project 2</span>
					<span className="project_name">Project 3</span>
					<span className="project_name">Project 4</span>
				</div>
				<div className="useful_links_section">
					<h3>USEFUL LINKS</h3>
					<span className="page_link">Home</span>
					<span className="page_link">Team</span>
					<span className="page_link">Events</span>
					<span className="page_link">Project</span>
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
