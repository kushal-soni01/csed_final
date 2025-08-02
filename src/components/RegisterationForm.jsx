import React from "react";
import "./RegisterationForm.css";

export default function RegisterationForm() {
	return (
		<div className="registeration-form">
			<h1>Join our team to work with excellent crews.</h1>
			<form action="" className="register">
				<select
					className="dropdown"
					placeholder="Select your expertise field"
				>
					<option value="AIML">AIML</option>
					<option value="Backend">Backend</option>
					<option value="Content">Content</option>
					<option value="CR-PR">CR-PR</option>
					<option value="Data">Data</option>
					<option value="Design">Design</option>
					<option value="Events">Events & Hospitality</option>
					<option value="Frontend">Frontend</option>
					<option value="Full-stack">Full-stack</option>
					<option value="IoT">IoT</option>
					<option value="Media">Media</option>
					<option value="Robotics">Robotics</option>
				</select>
				<input
					type="number"
					placeholder="Enter your University Roll Number"
				/>
				<input type="email" placeholder="Enter your official Email" />
				<input type="email" placeholder="Enter your personal Email" />
				<input type="number" placeholder="Enter your contact number" />
				<input type="text" placeholder="Enter your Full Name" />
				<input type="text" placeholder="Enter your branch and course" />
				<select className="dropdown" placeholder="Select your year">
					<option value="1">I</option>
					<option value="2">II</option>
					<option value="3">III</option>
					<option value="4">IV</option>
				</select>
				<button type="submit">Submit Now</button>
			</form>
		</div>
	);
}
