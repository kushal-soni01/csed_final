import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EventFeature from "../components/events/EventFeature"; // Import the EventFeature component
import EventCardsStack from "../components/events/EventCardsStack";
import CompletedEventCard from "../components/events/CompletedEventCard";
import EventHero from "../components/events/EventHero";
import ScrollRevealText from "../components/events/ScrollRevealText.jsx";
import HorizontalEventBar from "../components/events/horizontalEventBar";

export default function App() {
	const eventData = {
		imageUrl: "/images/event/EventBack.jpg",
		videoUrl: "/images/event/frontVideo.mp4",
		heading: "About Our Annual Tech Summit",
		subheading: "INNOVATION HUB, TECH UNIVERSITY",
		description:
			"Join us for an exciting series of workshops, keynote speeches, and networking events. Our annual tech summit is dedicated to fostering innovation, promoting creativity, and connecting the brightest minds in the industry. Explore cutting-edge technologies and gain insights from leading experts.",
		stats: [
			{ number: "300+", label: "Attendees" },
			{ number: "40+", label: "Speakers" },
			{ number: "20+", label: "Workshops" },
			{ number: "3", label: "Days Event" },
		],
	};

	const events = [
		{
			id: 1,
			title: "EVENT 1",
			subtitle: "Team Building",
			image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format&q=80",
			heading: "Team Building Workshop",
			description: [
				"Interactive team collaboration exercises and group challenges",
				"Problem-solving activities designed to strengthen workplace bonds",
				"Communication skill development through engaging scenarios",
				"Leadership training sessions with real-world applications",
				"Trust-building activities and team bonding experiences",
			],
			time: "9:00 AM - 5:00 PM",
			fee: "$150 per person",
			location: "Conference Center Hall A",
			date: "March 15, 2024",
			capacity: "50 participants",
			category: "Professional Development",
		},
		{
			id: 2,
			title: "EVENT 2",
			subtitle: "Developers fest",
			image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&auto=format&q=80",
			heading: "Developers Festival 2024",
			description: [
				"Latest technology trends including AI, blockchain, and cloud computing",
				"Hands-on coding workshops led by industry experts",
				"Networking opportunities with top-tier professionals",
				"Open source project showcases and collaboration sessions",
				"Startup pitch competitions with exciting prizes",
			],
			time: "10:00 AM - 8:00 PM",
			fee: "Free Entry",
			location: "Tech Hub Auditorium",
			date: "April 22, 2024",
			capacity: "500 participants",
			category: "Technology",
		},
		{
			id: 3,
			title: "EVENT 3",
			subtitle: "Guest Lectures",
			image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop&auto=format&q=80",
			heading: "Expert Guest Lectures Series",
			description: [
				"Industry leaders sharing cutting-edge insights and experiences",
				"Career guidance sessions and mentorship opportunities",
				"Interactive Q&A sessions with renowned professionals",
				"Real-world case study discussions and problem-solving",
				"Networking mixer with speakers and attendees",
			],
			time: "2:00 PM - 6:00 PM",
			fee: "$75 per session",
			location: "University Lecture Hall",
			date: "May 10, 2024",
			capacity: "200 participants",
			category: "Education",
		},
		{
			id: 4,
			title: "EVENT 4",
			subtitle: "Innovation Summit",
			image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80",
			heading: "Innovation Summit 2024",
			description: [
				"Breakthrough innovations across various industries and sectors",
				"Startup showcase featuring the most promising new ventures",
				"Investment opportunities and venture capital connections",
				"Future technology demonstrations and prototype testing",
				"Innovation workshops and ideation sessions",
			],
			time: "8:00 AM - 7:00 PM",
			fee: "$200 per person",
			location: "Innovation Center Downtown",
			date: "June 18, 2024",
			capacity: "300 participants",
			category: "Innovation",
		},
	];

	const completedEvents = [
		{
			id: 1,
			title: "Navis Dockerum - The ultimate Docker Challenge",
			date: "April 14, 2024",
			image: "/images/event/navis.jpg",
			summary:
				"Navis Dockerum invited participants to dive hands-on into the world of Docker, building and deploying containers in real time.",
			description:
				"Navis Dockerum invited participants to dive hands-on into the world of Docker, building and deploying containers in real time.             Attendees collaborated on live projects, tackled challenges, and left empowered to transform             their workflows with Docker magic!",
			perks: [
				"Participants containerized their first legacy application, witnessing real-time transformation to a modern workflow. ",
				"Teams built and launched multi-container projects using Docker Compose, simulating realworld microservices architecture.",
				"Attendees customized Docker files for optimized image builds, learning advanced strategies to reduce size and boost performance. ",
				"The workshop fostered live debugging sessions, equipping everyone with practical troubleshooting skills for containerized environments. ",
				" Participants collaborated on a final group challenge, deploying applications to a cloud environment using Docker best practices. ",
			],
			speakers: [
				{
					id: 1,
					name: "Mr. Krishna Mittal",
					title: "Ex-CSED member",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
			],
		},
		{
			id: 2,
			title: "AI/IoT Survival Challenge ",
			date: "January 31, 2025",
			image: "/images/event/aiiot.jpg",
			summary:
				"The “AI/IoT Survival Challenge” plunged participants into real-world crisis scenarios, where they leveraged AI and IoT technologies to engineer smart, resilient solutions. ",
			description:
				"The “AI/IoT Survival Challenge” plunged participants into real-world crisis scenarios, where they leveraged AI and IoT technologies to engineer smart, resilient solutions. Teams collaborated in dynamic, hands-on challenges—transforming data, devices, and creativity into survival-ready innovations.",
			perks: [
				"Participants built real-time IoT solutions using Arduino and Raspberry Pi, directly interfacing with diverse sensors and actuators. ",
				"Attendees programmed a “Red Light, Green Light” voice-controlled system (inspired by Squid Game), combining machine learning with hardware for interactive gameplay. ",
				"Teams collaborated to integrate AI models on Raspberry Pi for object detection and automation in survival-themed tasks. ",
				"The workshop oAered guided, hands-on prototyping sessions, enabling participants to rapidly design and deploy functional devices from scratch. ",
				"Everyone left with practical experience in fusing AI and IoT—demonstrated by working projects using Arduino and Raspberry Pi for real-world challenges.",
			],
			speakers: [
				{
					id: 1,
					name: "Pres. Shubh Singhal",
					title: "President of CSED Club",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
			],
		},
		{
			id: 3,
			title: "Versio Custodia – Finally, Git Made Sense!",
			date: "November 30, 2024",
			image: "/images/event/versio.jpg",
			summary:
				"The Git and GitHub Workshop provided hands-on training in version control and collaborative coding best practices.",
			description:
				"The Git and GitHub Workshop provided hands-on training in version control and collaborative coding best practices. Participants learned to manage projects eAiciently, track changes, and contribute seamlessly using GitHub.",
			perks: [
				"Participants gained practical skills in version control using Git, enabling eAicient management of code changes. ",
				"Attendees learned collaborative workflows on GitHub, including branching, pull requests, and code reviews. ",
				"The workshop empowered teams to resolve conflicts and maintain clean project histories. ",
				"Real-world exercises provided hands-on experience in contributing to open-source projects.",
				"Participants left with increased confidence to manage, share, and collaborate on coding projects using modern tools.",
			],
			speakers: [
				{
					id: 1,
					name: "Mr. Krishna Mittal",
					title: "Ex-CSED member",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
				{
					id: 1,
					name: "Pres. Shubh Singhal",
					title: "President of CSED Clubr",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "/images/team/shubh.jpg",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
			],
		},
		{
			id: 4,
			title: "Wissenaire Future – Workshop of Communication protocols",
			date: "November 4, 2024",
			image: "/images/event/wissenaire.jpg",
			summary:
				"Wissenaire Future unlocked the secrets of communication protocols with live decoding and hands-on data exchange projects. ",
			description:
				"Wissenaire Future unlocked the secrets of communication protocols with live decoding and hands-on data exchange projects. Participants explored how digital devices truly connect and communicate in real-world scenarios. ",
			perks: [
				"Participants decoded and analyzed live protocol data streams, gaining real-world troubleshooting skills. ",
				"Attendees simulated device-to-device communication, building foundational knowledge of network protocols. ",
				"The workshop oAered guided, hands-on activities with protocol analyzers and custom data packet creation. ",
				"Participants collaboratively mapped out the flow of data across diAerent communication layers. ",
				"Everyone left with a practical understanding of how everyday digital communications are structured and secured. ",
			],
			speakers: [
				{
					id: 1,
					name: " Mr. Hemant Sharma",
					title: "Backend Software Engineer",
					company: "IOT83",
					bio: "Alex has been instrumental in developing Ethereum's Layer 2 scaling solutions and has contributed to major DeFi protocols used by millions.",
					image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/alexcrypto",
					twitter: "https://twitter.com/alex_blockchain",
				},
			],
		},
		{
			id: 5,
			title: "Tech driven Entrepreneurship – Mastering the Market of Industry 4.0 ",
			date: "September 21, 2024",
			image: "/images/event/techdriven.jpg",
			summary:
				"Tech Driven Entrepreneurship” immersed participants in the evolving landscape of Industry 4.0, blending innovation with practical business strategies. ",
			description:
				"Tech Driven Entrepreneurship immersed participants in the evolving landscape of Industry 4.0, blending innovation with practical business strategies. Attendees explored real-world tools and trends, gaining actionable insights to launch and scale ventures in the digital era. ",
			perks: [
				"Participants designed tech-driven business models tailored to Industry 4.0 trends through interactive case studies. ",
				"Attendees developed actionable go-to-market strategies using real-time market analysis and digital tools. ",
				"The workshop fostered startup ideation sessions, leading to the creation of innovative solutions for smart industries. ",
				"Participants networked with industry mentors, receiving personalized feedback on entrepreneurial concepts. ",
				"Everyone left with a toolkit of resources and strategies for launching and scaling tech ventures in the Industry 4.0 era.",
			],
			speakers: [
				{
					id: 1,
					name: "Mr. Jitendra Sharma",
					title: "Founder & CEO",
					company: "HAIR Original",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
			],
			photos: [
				"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
			],
			sponsors: {
				platinum: [
					{
						name: "NVIDIA",
						logo: "https://via.placeholder.com/200x80/76B900/FFFFFF?text=NVIDIA",
					},
					{
						name: "Google AI",
						logo: "https://via.placeholder.com/200x80/4285F4/FFFFFF?text=Google+AI",
					},
				],
				gold: [
					{
						name: "Microsoft",
						logo: "https://via.placeholder.com/150x60/00BCF2/FFFFFF?text=Microsoft",
					},
					{
						name: "OpenAI",
						logo: "https://via.placeholder.com/150x60/412991/FFFFFF?text=OpenAI",
					},
					{
						name: "Meta AI",
						logo: "https://via.placeholder.com/150x60/1877F2/FFFFFF?text=Meta+AI",
					},
				],
				silver: [
					{
						name: "Hugging Face",
						logo: "https://via.placeholder.com/120x50/FFD21E/000000?text=🤗+HF",
					},
					{
						name: "Anthropic",
						logo: "https://via.placeholder.com/120x50/8B5CF6/FFFFFF?text=Anthropic",
					},
					{
						name: "Cohere",
						logo: "https://via.placeholder.com/120x50/39C5BB/FFFFFF?text=Cohere",
					},
				],
			},
		},
	];

	const horizontalEventData = [
		{
			id: 1,
			date: "22 Aug",
			time: "10:00-3:00",
			title: "Workshop 1",
			description: "Something Delecious is being cooked for you 🍽️.",
		},
		{
			id: 2,
			date: "22 Aug",
			time: "2:00-6:00",
			title: "Workshop 2",
			description: "Something Delecious is being cooked for you 👨🏻‍💻.",
		},
	];

	const HorizontalRegisterButtonText = "Coming Soon";

	return (
		<div className="App" style={{ background: "var(--primary-bg)" }}>
			<div className="hero-background-shapes"></div>{" "}
			{/* Single, full-page background animation */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="true"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
				rel="stylesheet"
			/>
			<script src="https://cdn.tailwindcss.com"></script>
			<EventHero />
			<EventFeature
				imageUrl={eventData.imageUrl}
				videoUrl={eventData.videoUrl}
				heading={eventData.heading}
				subheading={eventData.subheading}
				description={eventData.description}
				stats={eventData.stats}
			/>
			<main className="content-wrapper">
				<ScrollRevealText>
					<h2>Upcoming Events</h2>
					<p>Discover amazing experiences waiting for you</p>
				</ScrollRevealText>
			</main>
			<EventCardsStack
				events={events}
				title={events.title}
				subtitle={events.subtitle}
				particleCount={events.particleCount}
				categoryColors={events.categoryColors}
			/>
			<main className="content-wrapper">
				<ScrollRevealText>
					<h2>Completed Events</h2>
					<p>
						Explore the highlights and memories from our past events
					</p>
				</ScrollRevealText>
			</main>
			<div style={{ marginTop: "6rem" }}>
				{" "}
				{/* New wrapper div for spacing */}
				<div className="events-grid-container">
					{/* Removed individual background shapes from here, now handled globally */}

					{completedEvents.map((event, index) => (
						<CompletedEventCard
							key={event.id || index}
							completedEvent={event}
						/>
					))}
				</div>
			</div>
			<main className="content-wrapper">
				<ScrollRevealText>
					<h2>Event Calendar Of The Month</h2>
					<p>
						Stay updated with our event calendar for the month of
						August 2025
					</p>
				</ScrollRevealText>
			</main>
			<HorizontalEventBar
				events={horizontalEventData}
				buttonText={HorizontalRegisterButtonText}
			/>
		</div>
	);
}
