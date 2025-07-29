import React from "react";
import "./HomeGradient.css";

export default function HomeGradient() {
	return (
		<div className="GradientContainer">
			<div className="csedFullForm">
				<div className="logoLetter">
					C<span>enter for</span>
				</div>
				<div className="logoLetter">
					S<span>kills &</span>
				</div>
				<div className="logoLetter">
					E<span>ntrepreneurship</span>
				</div>
				<div className="logoLetter">
					D<span>evelopment</span>
				</div>
			</div>
			<div className="gradient-animated-video">
				<video
					id="animated-video"
					src="/"
					autoPlay={true}
					muted
					loop
					className="video"
				/>
			</div>
		</div>
	);
}
