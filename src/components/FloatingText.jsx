import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FloatingText.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingText(props) {
	const containerRef = useRef(null);
	const textRef = useRef(null);

	useGSAP(() => {
		let trigger = null;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "center center",
					end: "+=200%",
					scrub: true,
					pin: true,
					anticipatePin: 1,
					onRefresh: (self) => {
						trigger = self;
					},
				},
			});
			tl.fromTo(
				textRef.current,
				{ top: "100%", opacity: 0 },
				{
					top: "25%",
					opacity: 1,
					ease: "power2.out",
				}
			).to(
				textRef.current,
				{
					y: "-50%",
					opacity: 0,
					ease: "power2.in",
				},
				">"
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className="scroll-container" ref={containerRef}>
			<video
				src={props.source}
				className="scroll-background"
				loop
				muted
				autoPlay
				playsInline
			/>
			<div className="floating-text" ref={textRef}>
				<h1 className="main-head-text">{props.mainContent}</h1>
				<span className="contentLine1">
					&quot;{props.contentLine1}&quot;
				</span>
				<span className="contentLine2">{props.contentLine2}</span>
				<span className="contentLine3">{props.contentLine3}</span>
				<div className=""></div>
			</div>
		</section>
	);
}
