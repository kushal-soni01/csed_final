import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RandomVideo from "../content/6982946-uhd_2880_2160_25fps.mp4";
import "./HomeHero.css";
gsap.registerPlugin(ScrollTrigger);

function HomeHero() {
	const scrollRef = useRef();
	const videoRef = useRef(null);
	const tl = gsap.timeline();

	useGSAP(() => {
		gsap.to("#hero-video", {
			scale: 55,
			opacity: 0,
			ease: "slow(0.7,0.7,false)",
			filter: "blur(200px)",
			scrollTrigger: {
				trigger: ".container",
				start: "5px",
				end: "95px",
				scrub: 1,
			},
		});
		gsap.from(".content", {
			y: "0px",
			opacity: 1,
			ease: "circ.out",
		});
		gsap.to(".content", {
			y: "-500px",
			opacity: 0,
			ease: "circ.out",
			scrollTrigger: {
				trigger: ".container",
				ease: "circ.out",
				start: "15px",
				end: "65px",
				scrub: 1,
			},
		});
		tl.to(".gradient-bg", {
			opacity: 1,
			scrollTrigger: {
				trigger: ".container",
				start: "20px",
				end: "95px",
				scrub: 1,
			},
		}).to(".about-us-content", {
			opacity: 1,
			top: "110px",
			ease: "power4.in",
			scrollTrigger: {
				trigger: ".gradient-bg",
				start: "75px",
				end: "145px",
				scrub: 1,
			},
		});
	});

	return (
		<>
			<div className="container" ref={scrollRef}>
				<video
					id="hero-video"
					ref={videoRef}
					src={RandomVideo}
					autoPlay={true}
					muted
					loop
					className="video"
				/>
				<div className="content">
					<h2 className="greet">Welcome to CSED CLUB GLAU</h2>
					<h3>
						Unlock potential. Embrace change. Always
						[Inspire/Innovate/Build/Lead]
					</h3>
				</div>
			</div>
			<div className="gradient-bg" ref={scrollRef}>
				<span className="about-us-content">
					We are the entreprenuership cell of a premier institution,
					dedicared to nuturing innovation, fostering creativity a
					builiding the next generation of entreprenuers who will
					shape the future.
				</span>
			</div>
		</>
	);
}

export default HomeHero;
