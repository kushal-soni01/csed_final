import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamHero from "./TeamHero.jsx";
import ProfileCardComponent from "./ProfileCard.jsx";
import GlobalBackground from "./GlobalBackground.jsx";
import "./CSEDClubShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const CSEDClubShowcase = () => {
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true); // Temporarily set to true to see navbar immediately
	const [navbarAnimating, setNavbarAnimating] = useState(false);
	const [selectedTeamFilter, setSelectedTeamFilter] = useState(null);
	const [selectedDepartmentFilter, setSelectedDepartmentFilter] =
		useState(null);

	console.log("CSEDClubShowcase state:", { showNavbar, navbarAnimating });
	const heroSectionRef = useRef(null);
	const teamsSectionRef = useRef(null);
	const teamsGridRef = useRef(null);
	const teamsHeaderRef = useRef(null);
	const teamsTitleRef = useRef(null);
	const teamsSubtitleRef = useRef(null);

	useEffect(() => {
		// GSAP Animation for Teams Header - Ultra subtle for smooth scrolling
		if (teamsTitleRef.current && teamsSubtitleRef.current) {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: teamsHeaderRef.current,
					start: "top 95%", // Trigger very early for smoother appearance
					end: "bottom 5%",
					toggleActions: "play none none reverse",
					scrub: false, // Disable scrub for smoother animations
				},
			});

			// Animate main title - ultra subtle
			tl.fromTo(
				teamsTitleRef.current,
				{
					y: 15, // Further reduced from 30 to 15
					opacity: 0.6, // Increased from 0.3 to 0.6 to reduce flash
					scale: 0.98, // Further reduced from 0.95 to 0.98
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.5, // Further reduced from 0.8 to 0.5
					ease: "power1.out", // Changed from power2.out to power1.out for smoother
				}
			);

			// Animate subtitle - ultra subtle
			tl.fromTo(
				teamsSubtitleRef.current,
				{
					y: 10, // Further reduced from 20 to 10
					opacity: 0.7, // Increased from 0.4 to 0.7
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.4, // Reduced from 0.6 to 0.4
					ease: "power1.out",
				},
				"-=0.3" // Increased overlap
			);

			// Animate the highlight word - ultra subtle
			const highlightWord =
				teamsSubtitleRef.current.querySelector(".highlight-word");
			if (highlightWord) {
				tl.fromTo(
					highlightWord,
					{
						scale: 1,
					},
					{
						scale: 1.02, // Further reduced from 1.05 to 1.02
						duration: 0.3, // Reduced from 0.4 to 0.3
						ease: "power1.out",
						yoyo: true,
						repeat: 1,
					},
					"-=0.2" // Increased overlap
				);
			}
		}
	}, [selectedTeamFilter, selectedDepartmentFilter]);

	useEffect(() => {
		// Navbar scroll observer - show when reaching teams section
		const handleScroll = () => {
			if (!teamsSectionRef.current) return;

			const teamsSectionTop =
				teamsSectionRef.current.getBoundingClientRect().top;
			const viewportHeight = window.innerHeight;

			// Show navbar when teams section is near the top of viewport
			if (teamsSectionTop <= viewportHeight * 0.3 && !showNavbar) {
				console.log("Showing navbar - reached teams section");
				setNavbarAnimating(true);
				setTimeout(() => {
					setShowNavbar(true);
				}, 100);
			}
			// Hide navbar when teams section is far below viewport (user scrolled back up)
			else if (teamsSectionTop > viewportHeight * 0.8 && showNavbar) {
				console.log("Hiding navbar - left teams section");
				setShowNavbar(false);
				setNavbarAnimating(false);
			}
		};

		// Add scroll listener
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [showNavbar]);

	const handleApplyClick = () => {
		setShowApplicationForm(true);
	};

	const closeApplicationForm = () => {
		setShowApplicationForm(false);
	};

	const handleNavbarTeamClick = (teamKey) => {
		// Toggle filter: if same team clicked, show all; otherwise filter by team
		const newTeamFilter = selectedTeamFilter === teamKey ? null : teamKey;
		setSelectedTeamFilter(newTeamFilter);
		// Clear department filter when team filter changes
		setSelectedDepartmentFilter(null);

		// Scroll to the appropriate position
		setTimeout(() => {
			const isFiltering = !!newTeamFilter; // Will we be in filtering mode after this click?

			if (isFiltering && teamsGridRef.current) {
				// When filtering, scroll to the beginning of the teams grid to show first filtered cards
				const navbarHeight = 120;
				const extraOffset = 60; // Small offset to show some space above the grid

				const gridPosition =
					teamsGridRef.current.getBoundingClientRect().top +
					window.pageYOffset;
				const offsetPosition =
					gridPosition - navbarHeight - extraOffset;

				window.scrollTo({
					top: Math.max(0, offsetPosition),
					behavior: "smooth",
				});
			} else if (!isFiltering && teamsSectionRef.current) {
				// When showing all, scroll to the teams section header
				const navbarHeight = 120;
				const extraOffset = 80;

				const elementPosition =
					teamsSectionRef.current.getBoundingClientRect().top +
					window.pageYOffset;
				const offsetPosition =
					elementPosition - navbarHeight - extraOffset;

				window.scrollTo({
					top: Math.max(0, offsetPosition),
					behavior: "smooth",
				});
			}
		}, 250); // Longer delay to ensure DOM updates and animations are complete
	};

	const handleNavbarDepartmentClick = (departmentName) => {
		// Toggle filter: if same department clicked, show all; otherwise filter by department
		const newDepartmentFilter =
			selectedDepartmentFilter === departmentName ? null : departmentName;
		setSelectedDepartmentFilter(newDepartmentFilter);

		// Scroll to the appropriate position
		setTimeout(() => {
			const isFiltering = !!newDepartmentFilter; // Will we be in filtering mode after this click?

			if (isFiltering && teamsGridRef.current) {
				// When filtering, scroll to the beginning of the teams grid to show first filtered cards
				const navbarHeight = 120;
				const extraOffset = 60; // Small offset to show some space above the grid

				const gridPosition =
					teamsGridRef.current.getBoundingClientRect().top +
					window.pageYOffset;
				const offsetPosition =
					gridPosition - navbarHeight - extraOffset;

				window.scrollTo({
					top: Math.max(0, offsetPosition),
					behavior: "smooth",
				});
			} else if (!isFiltering && teamsSectionRef.current) {
				// When showing all, scroll to the teams section header
				const navbarHeight = 120;
				const extraOffset = 80;

				const elementPosition =
					teamsSectionRef.current.getBoundingClientRect().top +
					window.pageYOffset;
				const offsetPosition =
					elementPosition - navbarHeight - extraOffset;

				window.scrollTo({
					top: Math.max(0, offsetPosition),
					behavior: "smooth",
				});
			}
		}, 250); // Longer delay to ensure DOM updates and animations are complete
	};

	// Function to get grid class based on hierarchy position for pyramid structure
	const getGridClassForHierarchy = (position) => {
		switch (position) {
			case "President":
			case "Vice President":
				return "team-card-container hierarchy-executive leader-row executive-row"; // Executive row - 1 card per row on mobile, 2 on large screens only
			case "General Secretary":
			case "Joint Secretary":
				return "team-card-container hierarchy-secretary leader-row secretary-row"; // Secretary row - exactly 2 cards per row
			case "Head":
			case "Co-Head":
				return "team-card-container hierarchy-head leader-row"; // 4 cards per row
			default:
				return "team-card-container hierarchy-regular member-row"; // Regular grid - 4 cards per row
		}
	};

	// Function to get all members in hierarchical order, optionally filtered by team and department
	const getAllMembersAlphabetically = () => {
		const allMembers = [];

		teamData.forEach((team) => {
			// If a team filter is selected, only include members from that team
			if (!selectedTeamFilter || team.key === selectedTeamFilter) {
				Object.entries(team.members).forEach(
					([departmentName, departmentMembers]) => {
						// If a department filter is selected, only include members from that department
						if (
							!selectedDepartmentFilter ||
							departmentName === selectedDepartmentFilter
						) {
							departmentMembers.forEach((member) => {
								allMembers.push({
									...member,
									teamName: team.title,
									departmentName: departmentName,
								});
							});
						}
					}
				);
			}
		});

		// Define hierarchy order - maintain original hierarchy even when filtering
		const hierarchyOrder = {
			President: 1,
			"Vice President": 1, // Same level as President to appear in same row
			"General Secretary": 2,
			"Joint Secretary": 2, // Same level as General Secretary to appear in same row
			Head: 4,
			"Co-Head": 4, // Same level as Head
			default: 5, // Everyone else comes after leaders
		};

		// Sort by hierarchy first, then alphabetically within each hierarchy level
		return allMembers.sort((a, b) => {
			const aHierarchy =
				hierarchyOrder[a.position] || hierarchyOrder["default"];
			const bHierarchy =
				hierarchyOrder[b.position] || hierarchyOrder["default"];

			// First sort by hierarchy level
			if (aHierarchy !== bHierarchy) {
				return aHierarchy - bHierarchy;
			}

			// Within same hierarchy level, sort alphabetically by name
			return a.name.localeCompare(b.name);
		});
	};

	// Function to get all unique departments across all teams
	const getAllDepartments = () => {
		const allDepartments = new Set();

		teamData.forEach((team) => {
			// If a team filter is selected, only include departments from that team
			if (!selectedTeamFilter || team.key === selectedTeamFilter) {
				Object.keys(team.members).forEach((departmentName) => {
					allDepartments.add(departmentName);
				});
			}
		});

		return Array.from(allDepartments).sort();
	};

	// Mentor data
	const mentorData = [
		{
			name: "Dr. Anoop Gupta",
			title: "Chief Patron",
			avatarUrl:
				"https://via.placeholder.com/300x400/2563eb/ffffff?text=RK",
			linkedin: "https://www.linkedin.com/in/anoop-gupta-61236717/",
		},
		{
			name: "Mr. Pushkar Sharma",
			title: "Patron",
			avatarUrl:
				"https://via.placeholder.com/300x400/7c3aed/ffffff?text=PS",
			linkedin: "https://www.linkedin.com/in/pushkar-sharma-3ba943178/",
		},
		{
			name: "Mr. Deepansh Goyal",
			title: "Mentor",
			avatarUrl:
				"https://via.placeholder.com/300x400/059669/ffffff?text=AG",
			linkedin: "https://www.linkedin.com/in/deepansh-goyal-359022196/",
		},
		{
			name: "Mr. Mridul Bajpayee",
			title: "Snr. Technical Mentor",
			avatarUrl:
				"https://via.placeholder.com/300x400/dc2626/ffffff?text=NV",
			linkedin: "https://linkedin.com/in/ms-neha-verma",
		},
		{
			name: "Mr. Devendra Kumar Rathode",
			title: "Snr. Technical Mentor",
			avatarUrl:
				"https://via.placeholder.com/300x400/f59e0b/ffffff?text=VS",
			linkedin: "https://linkedin.com/in/dr-vikash-singh",
		},
	];

	const teamData = [
		{
			key: "tech",
			title: "Tech Cell",
			description:
				"Our tech team drives innovation through cutting-edge development and research.",
			subTeams: ["IOT", "Robotics", "AIML", "Full-stack"],
			members: {
				IOT: [
					{
						name: "Karan Pal",
						title: "IoT Developer",
						avatarUrl:
							"https://via.placeholder.com/300x400/4f46e5/ffffff?text=AC",
						linkedin: "https://linkedin.com/in/alexander-chen",
						github: "https://github.com/alexander-chen",
					},
					{
						name: "Khush Pandit",
						title: "Hardware Engineer",
						avatarUrl:
							"https://via.placeholder.com/300x400/7c3aed/ffffff?text=MP",
						linkedin:
							"https://www.linkedin.com/in/khush-pandit-9b6473256/",
						github: "https://github.com/khushpandit",
					},
					{
						name: "Kushal Soni",
						title: "IoT Engineer",
						avatarUrl:
							"https://via.placeholder.com/300x400/7c3aed/ffffff?text=MP",
						linkedin: "https://linkedin.com/in/maya-patel",
						github: "https://github.com/maya-patel",
					},
				],
				AIML: [
					{
						name: "Akshat Gupta",
						title: "AI/ML Engineer",
						avatarUrl:
							"https://via.placeholder.com/300x400/7c3aed/ffffff?text=AG",
						linkedin:
							"https://www.linkedin.com/in/akshat-gupta-88b129325/?original_referer=&originalSubdomain=in",
						github: "https://github.com/akshat-gupta-111",
					},
					{
						name: "Utkarsh Agarwal",
						title: "Ai/ML Engineer",
						avatarUrl:
							"https://via.placeholder.com/300x400/06b6d4/ffffff?text=UA",
						linkedin: "https://linkedin.com/in/utkarsh-agarwal",
						github: "https://github.com/Utkarsh45650",
					},
				],
				"Full-stack": [
					{
						name: "Arju Shrivastava",
						title: "Full-stack Developer",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/10b981/ffffff?text=LB",
						linkedin: "https://linkedin.com/in/liam-brown",
						github: "https://github.com/zmy-shaurya/",
					},
					{
						name: "Shaurya Pratap Singh",
						title: "Full-stack Developer",
						avatarUrl:
							"https://via.placeholder.com/300x400/8b5cf6/ffffff?text=CF",
						linkedin: "https://www.linkedin.com/in/Zmy-Shaurya/",
						github: "https://github.com/caleb-foster",
					},
					{
						name: "Kavya Upadhyay",
						title: "Full-stack Developer",
						avatarUrl:
							"https://via.placeholder.com/300x400/8b5cf6/ffffff?text=CF",
						linkedin: "https://linkedin.com/in/caleb-foster",
						github: "https://github.com/caleb-foster",
					},
				],
			},
		},
		{
			key: "operations",
			title: "Operations & Relations",
			description:
				"The operations team ensures smooth functioning of all club activities.",
			subTeams: ["CR PR", "Event & Hospitality", "Data"],
			members: {
				"CR & PR": [
					{
						name: "Anmol Sharma",
						title: "CR/PR Head",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/6366f1/ffffff?text=CM",
						linkedin:
							"https://www.linkedin.com/in/anmol-sharma-26a67b324",
						github: "https://github.com/AnmolSharma1711",
					},
					{
						name: "Keerti",
						title: "CR/PR",
						avatarUrl:
							"https://via.placeholder.com/300x400/a855f7/ffffff?text=JW",
						linkedin:
							"https://www.linkedin.com/in/keerti-yaduvanshi-4813b9280/",
						github: "https://github.com/Keerti-12",
					},
					{
						name: "Debraj Mondal",
						title: "CR/PR",
						avatarUrl:
							"https://via.placeholder.com/300x400/0ea5e9/ffffff?text=AT",
						linkedin:
							"https://www.linkedin.com/in/debraj-mondal-9ba1b52b2/",
						github: "https://github.com/debraj1505",
					},
					{
						name: "Shresth Soni",
						title: "CR/PR",
						avatarUrl:
							"https://via.placeholder.com/300x400/059669/ffffff?text=LM",
						linkedin:
							"https://www.linkedin.com/in/shresth-soni-965910326/",
						github: "https://github.com/shresth-soni",
					},
					{
						name: "Krish Kumar",
						title: "CR/PR",
						avatarUrl:
							"https://via.placeholder.com/300x400/dc2626/ffffff?text=HJ",
						linkedin:
							"https://www.linkedin.com/in/krish-kumar-194562358/",
						github: "https://github.com/harper-jackson",
					},
				],
				"Event & Hospitality": [
					{
						name: "Shilpi Tiwari",
						title: "Event Coordinator",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/d97706/ffffff?text=MW",
						linkedin:
							"https://www.linkedin.com/in/shilpi-tiwari-416180328/",
						github: "https://github.com/Shilpi82",
					},
					{
						name: "Shubham Singh",
						title: "Hospitality Manager",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/7c2d12/ffffff?text=EH",
						linkedin:
							"https://www.linkedin.com/in/shubham-kumar-singh-981874338/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/shubhamsingh900",
					},
					{
						name: "Devansh Kumar Dhangar",
						title: "Head",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/1e40af/ffffff?text=LC",
						linkedin:
							"https://www.linkedin.com/in/devansh-kumar-dhangar-837b55223/",
						github: "https://github.com/logan-clark",
					},
					{
						name: "Piyush Maurya",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
					{
						name: "Kashish Gangwar",
						title: "Event Planning Specialist",
						avatarUrl:
							"https://via.placeholder.com/300x400/14b8a6/ffffff?text=JA",
						linkedin: "https://linkedin.com/in/jacob-adams",
						github: "https://github.com/jacob-adams",
					},
					{
						name: "Kaushal Kumar",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
					{
						name: "Krishna Upadhyay",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
					{
						name: "Aavya Agarwal",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
					{
						name: "Kush Somvanshi",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
					{
						name: "Kirtan Agarwal",
						title: "Venue Coordinator",
						avatarUrl:
							"https://via.placeholder.com/300x400/be185d/ffffff?text=AL",
						linkedin: "https://linkedin.com/in/aria-lewis",
						github: "https://github.com/aria-lewis",
					},
				],
				Data: [
					{
						name: "Kishlay Kumar",
						title: "Data Analyst",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/047857/ffffff?text=CR",
						linkedin: "https://linkedin.com/in/carter-robinson",
						github: "https://github.com/carter-robinson",
					},
					{
						name: "Amrita Singh",
						title: "Database Administrator",
						avatarUrl:
							"https://via.placeholder.com/300x400/7c3aed/ffffff?text=LW",
						linkedin:
							"https://www.linkedin.com/in/amrita-singh-308333326/",
						github: "https://github.com/luna-walker",
					},
					{
						name: "Ansh Agarwal",
						title: "Data Scientist",
						avatarUrl:
							"https://via.placeholder.com/300x400/0891b2/ffffff?text=JH",
						linkedin: "https://linkedin.com/in/jackson-hall",
						github: "https://github.com/jackson-hall",
					},
					{
						name: "Kanishka Gautam",
						title: "Analytics Lead",
						avatarUrl:
							"https://via.placeholder.com/300x400/ea580c/ffffff?text=SY",
						linkedin:
							"https://www.linkedin.com/in/kanishka-gautam-708bbb341/",
						github: "https://github.com/kanishkagautam2005",
					},
				],
			},
		},
		{
			key: "media",
			title: "Media Operations",
			description:
				"Our media team crafts compelling visual narratives and manages digital presence.",
			subTeams: ["Design", "Content"],
			members: {
				Design: [
					{
						name: "Shivendra Kumar",
						title: "UI/UX Designer",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/8b5cf6/ffffff?text=GK",
						linkedin: "https://linkedin.com/in/gabriel-king",
						github: "https://github.com/gabriel-king",
					},
					{
						name: "Tanmay Pathak",
						title: "Graphic Designer",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/ec4899/ffffff?text=ZW",
						linkedin: "https://linkedin.com/in/zoe-wright",
						github: "https://github.com/zoe-wright",
					},
					{
						name: "Kritika Sharan",
						title: "Visual Designer",
						avatarUrl:
							"https://via.placeholder.com/300x400/06b6d4/ffffff?text=JS",
						linkedin: "https://linkedin.com/in/julian-scott",
						github: "https://github.com/julian-scott",
					},
					{
						name: "Dhanvi Sharma",
						title: "Brand Designer",
						avatarUrl:
							"https://via.placeholder.com/300x400/10b981/ffffff?text=NG",
						linkedin: "https://linkedin.com/in/nora-green",
						github: "https://github.com/nora-green",
					},
					{
						name: "Shivam Baghel",
						title: "Motion Graphics Designer",
						avatarUrl:
							"https://via.placeholder.com/300x400/f59e0b/ffffff?text=AR",
						linkedin: "https://linkedin.com/in/alex-rivera",
						github: "https://github.com/alex-rivera",
					},
				],
				Content: [
					{
						name: "Muskan Singh",
						title: "Content Writer",
						position: "Head",
						avatarUrl:
							"https://via.placeholder.com/300x400/6366f1/ffffff?text=CC",
						linkedin:
							"https://www.linkedin.com/in/muskan-singh-454405314/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/Muskansingh-ms",
					},
					{
						name: "Ankush Kaushik",
						title: "Copy Writer",
						avatarUrl:
							"https://via.placeholder.com/300x400/a855f7/ffffff?text=HM",
						linkedin: "https://linkedin.com/in/ankush-kaushik",
						github: "https://github.com/ankush-kaushik",
					},
					{
						name: "Apoorv Mehrotra",
						title: "Technical Writer",
						avatarUrl:
							"https://via.placeholder.com/300x400/0ea5e9/ffffff?text=GP",
						linkedin: "https://linkedin.com/in/apoorv-mehrotra",
						github: "https://github.com/apoorv-mehrotra",
					},
					{
						name: "Anwesha Kumari",
						title: "Content Strategist",
						avatarUrl:
							"https://via.placeholder.com/300x400/059669/ffffff?text=SR",
						linkedin:
							"https://www.linkedin.com/in/anwesha-kumari-3a55a3326/",
						github: "https://github.com/Anweshakumari77",
					},
				],
			},
		},
		{
			key: "leadership",
			title: "Executive Leadership",
			description:
				"The executive team provides strategic direction and overall leadership.",
			subTeams: ["Executive Board"],
			members: {
				"Executive Board": [
					{
						name: "Shubh Singhal",
						title: "Club President",
						position: "President",
						avatarUrl:
							"https://via.placeholder.com/300x400/ff6b6b/ffffff?text=SC",
						linkedin: "https://www.linkedin.com/in/shubh-singhal-/",
						github: "https://github.com/Shubh-Singhal-Taken",
					},
					{
						name: "Sparsh Sharma",
						title: "Vice President",
						position: "Vice President",
						avatarUrl:
							"https://via.placeholder.com/300x400/4ecdc4/ffffff?text=RK",
						linkedin:
							"https://www.linkedin.com/in/sparsh-sharma-356761289/",
						github: "https://github.com/ryan-kumar",
					},
					{
						name: "Aditya Yadav",
						title: "Secretary",
						position: "General Secretary",
						avatarUrl:
							"https://via.placeholder.com/300x400/45b7d1/ffffff?text=ER",
						linkedin:
							"https://www.linkedin.com/in/aditya-yadav-570846289/",
						github: "https://github.com/emily-rodriguez",
					},
					{
						name: "Bhoomika Agarwal",
						title: "Treasurer",
						position: "Joint Secretary",
						avatarUrl:
							"https://via.placeholder.com/300x400/f9ca24/ffffff?text=JP",
						linkedin:
							"https://www.linkedin.com/in/bhoomika-agarwal-981196326/",
						github: "https://github.com/jason-park",
					},
				],
			},
		},
	];

	const ApplicationModal = ({ onClose }) => {
		return (
			<div className="application-modal-overlay" onClick={onClose}>
				<div
					className="application-modal"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="modal-header">
						<h2 className="modal-title">APPLICATION FORM</h2>
						<button className="close-btn" onClick={onClose}>
							×
						</button>
					</div>
					<div className="modal-content">
						<form>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Your Name"
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									className="form-control form-control-lg"
									placeholder="Your Email"
								/>
							</div>
							<div className="form-group">
								<select className="form-select form-select-lg">
									<option value="">Select a team</option>
									<option value="tech">Tech Cell</option>
									<option value="operations">
										Operations & Relation
									</option>
									<option value="media">Media Ops</option>
								</select>
							</div>
							<button
								type="submit"
								className="btn btn-success btn-lg w-100"
							>
								SUBMIT
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	};

	const ParticleNavbar = ({
		teams,
		departments,
		onTeamClick,
		onDepartmentClick,
		show,
		animating,
		selectedTeamFilter,
		selectedDepartmentFilter,
	}) => {
		console.log("ParticleNavbar render:", {
			show,
			animating,
			selectedTeamFilter,
			selectedDepartmentFilter,
		});
		return (
			<div
				className={`particle-navbar ${show ? "show" : ""} ${
					animating ? "animating" : ""
				}`}
			>
				<div className="navbar-particles">
					{[...Array(50)].map((_, i) => (
						<div
							key={i}
							className="particle"
							style={{
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 2}s`,
								animationDuration: `${2 + Math.random() * 3}s`,
							}}
						/>
					))}
				</div>
				<div className="navbar-content">
					<div className="navbar-brand">
						{selectedTeamFilter
							? `${teamData
									.find(
										(team) =>
											team.key === selectedTeamFilter
									)
									?.title.toUpperCase()} TEAM`
							: selectedDepartmentFilter
							? `${selectedDepartmentFilter.toUpperCase()} DEPARTMENT`
							: "CSED CLUB"}
					</div>
					<div className="navbar-filters">
						<div className="navbar-teams">
							{teams.map((team, index) => (
								<button
									key={team.key}
									className={`navbar-team-btn ${
										selectedTeamFilter === team.key
											? "active"
											: ""
									}`}
									onClick={() => onTeamClick(team.key)}
									style={{
										animationDelay: `${0.1 + index * 0.1}s`,
									}}
								>
									{team.title}
								</button>
							))}
						</div>
						<div className="navbar-departments">
							{departments.map((department, index) => (
								<button
									key={department}
									className={`navbar-department-btn ${
										selectedDepartmentFilter === department
											? "active"
											: ""
									}`}
									onClick={() =>
										onDepartmentClick(department)
									}
									style={{
										animationDelay: `${
											0.1 + index * 0.05
										}s`,
									}}
								>
									{department}
								</button>
							))}
						</div>
					</div>
					<div className="navbar-spacer"></div>
				</div>
				{/* Rainbow line effect */}
				<div className="navbar-rainbow-line"></div>
			</div>
		);
	};

	return (
		<div className="min-h-screen w-100 main-container">
			{/* Global Background Elements */}
			<GlobalBackground />

			{/* Particle Navbar */}
			<ParticleNavbar
				teams={teamData}
				departments={getAllDepartments()}
				onTeamClick={handleNavbarTeamClick}
				onDepartmentClick={handleNavbarDepartmentClick}
				show={showNavbar}
				animating={navbarAnimating}
				selectedTeamFilter={selectedTeamFilter}
				selectedDepartmentFilter={selectedDepartmentFilter}
			/>

			{/* Hero Section with TeamHero */}
			<TeamHero />

			{/* Mentors Section */}
			<div className="mentors-section">
				<div className="mentors-container">
					<div className="mentors-header-wrapper">
						<div className="mentors-header-container">
							<h1 className="mentors-main-title">OUR MENTORS</h1>
						</div>
					</div>

					{/* Mentor Cards - Hierarchical Layout */}
					<div className="mentors-grid">
						{mentorData.map((mentor, index) => {
							// Determine grid class based on position in array for hierarchical layout
							let gridClass;
							if (index === 0) {
								// First mentor - single card in first row (full width centered)
								gridClass =
									"mentor-card-container hierarchy-mentor-head mentor-row";
							} else if (index === 1 || index === 2) {
								// Second and third mentors - 2 cards in second row
								gridClass =
									"mentor-card-container hierarchy-mentor-senior mentor-row";
							} else {
								// Fourth and subsequent mentors - 2 cards in third row
								gridClass =
									"mentor-card-container hierarchy-mentor-regular mentor-row";
							}

							return (
								<div key={index} className={gridClass}>
									<ProfileCardComponent
										member={{
											name: mentor.name,
											title: "Mentor",
											position: mentor.title,
											avatarUrl: mentor.avatarUrl,
											linkedin: mentor.linkedin,
											github: mentor.github,
										}}
										enableTilt={true}
										enableMobileTilt={true}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Profile Cards Section */}
			<div ref={teamsSectionRef} className="teams-section">
				<div className="teams-container">
					<div className="teams-header-wrapper">
						<div className="teams-header-container">
							{!(
								selectedTeamFilter || selectedDepartmentFilter
							) && (
								<div
									ref={teamsHeaderRef}
									className="teams-header"
								>
									<h1
										ref={teamsTitleRef}
										className="teams-main-title"
									>
										<>
											OUR{" "}
											<span className="highlight-word">
												TEAMS
											</span>
										</>
									</h1>
									<p
										ref={teamsSubtitleRef}
										className="teams-subtitle"
									>
										<>
											WHERE INNOVATION MEETS{" "}
											<span className="highlight-word">
												EXCELLENCE
											</span>
										</>
									</p>
								</div>
							)}
							{(selectedTeamFilter ||
								selectedDepartmentFilter) && (
								<div className="show-all-wrapper">
									<button
										onClick={() => {
											setSelectedTeamFilter(null);
											setSelectedDepartmentFilter(null);
										}}
										className="show-all-btn"
									>
										Show All Members
									</button>
								</div>
							)}
						</div>
					</div>

					<div ref={teamsGridRef} className="teams-grid">
						{getAllMembersAlphabetically().map((member, index) => (
							<div
								key={`${member.name}-${index}`}
								className={getGridClassForHierarchy(
									member.position
								)}
							>
								<ProfileCardComponent
									member={{
										...member,
										teamName: member.teamName,
										departmentName: member.departmentName,
									}}
									enableTilt={true}
									enableMobileTilt={true}
								/>
							</div>
						))}
					</div>

					<div className="apply-now-wrapper">
						<div className="apply-now-container">
							<button
								onClick={handleApplyClick}
								className="apply-now-btn"
							>
								<div className="overline-effect"></div>
								<span>Apply Now</span>
								<div className="underline-effect"></div>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Application Modal */}
			{showApplicationForm && (
				<ApplicationModal onClose={closeApplicationForm} />
			)}
		</div>
	);
};

export default CSEDClubShowcase;
