import React from "react";
import "./JoinUsHeader.css";

export default function JoinUsHeader({ onTeamClick }) {
	return (
		<div className="join-us-header-container">
			<div
				className="teamCell"
				onClick={() => onTeamClick("Tech Cell")}
				style={{
					background: `url("/images/team/Tech.jpg")`,
					backgroundSize: "cover",
				}}
			></div>
			<div
				className="teamCell"
				onClick={() => onTeamClick("Operations & Relations")}
				style={{
					background: `url("/images/team/operations.jpg")`,
					backgroundSize: "cover",
				}}
			></div>
			<div
				className="teamCell"
				onClick={() => onTeamClick("Media Cell")}
				style={{
					background: `url("/images/team/Media.jpg")`,
					backgroundSize: "cover",
				}}
			></div>
		</div>
	);
}
