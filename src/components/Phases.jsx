import React from "react";
import "./Phases.css";

export default function Phases(props) {
	return (
		<>
			<div className="phases-container">
				{props.heading && (
					<div className="home-phase-heading">
						<h2>{props.heading}</h2>
					</div>
				)}
				<div className="home-phase-tagline">
					<h1>{props.tagline_1}</h1>
					<h1>{props.tagline_2}</h1>
					<h1>{props.tagline_3}</h1>
				</div>
				<div className="home-phase-text">{props.content}</div>
			</div>
		</>
	);
}
