import React from "react";
import "./JoinUsHeader.css";

export default function JoinUsHeader({ onTeamClick }) {
	return (
		<div className="join-us-header-container">
			<div className="teamCell" onClick={() => onTeamClick("Tech Cell")}>
				Tech Cell
			</div>
			<div
				className="teamCell"
				onClick={() => onTeamClick("Operations & Relations")}
			>
				Operations & Relations
			</div>
			<div className="teamCell" onClick={() => onTeamClick("Media Cell")}>
				Media Cell
			</div>
		</div>
	);
}
