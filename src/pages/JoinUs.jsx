import React from "react";
import JoinUsHeader from "../components/JoinUsHeader";
import JoinUsTeam from "../components/JoinUsTeam";

export default function JoinUs() {
	return (
		<>
			<JoinUsHeader />
			<JoinUsTeam
				title="{Tech Cell}"
				desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias"
				departments={[
					"IoT",
					"Robotics",
					"Frontend",
					"Backend",
					"Full-stack",
					"AIML",
				]}
			/>{" "}
			<JoinUsTeam
				title="{Operations & Relations}"
				desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias"
				departments={["CR-PR", "Events & Hospitality", "Data"]}
			/>{" "}
			<JoinUsTeam
				title="{Media Cell}"
				desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis velit voluptas minus commodi corrupti aliquam modi corporis nihil natus, veritatis soluta. Tenetur iure, repellat temporibus iste ullam expedita vero, aperiam, quas aut veniam tempora qui ducimus aliquam asperiores ipsam veritatis autem molestias"
				departments={["Design", "Media", "Content"]}
			/>
		</>
	);
}
