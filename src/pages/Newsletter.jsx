import React from "react";
import GlobalBackgorund from "../components/Team/GlobalBackground";

export default function Newsletter() {
	return (
		<div>
			<img
				src="/images/content/newsletter-background.png"
				style={{
					height: "100vh",
					width: "100vw",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					opacity: 0.2,
				}}
			/>
			<div
				className="coming-soon"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					textAlign: "center",
					color: "#fff",
					fontSize: "3rem",
					fontWeight: "bold",
				}}
			>
				<h1>Coming Soon</h1>
				<span
					style={{
						fontSize: "1.5rem",
						color: "#fff",
						fontWeight: "normal",
						textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
					}}
				>
					Stay tuned for the updates
				</span>
			</div>
		</div>
	);
}
