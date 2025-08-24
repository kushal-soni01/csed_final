import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamHero from "./TeamHero.jsx";
import ProfileCardComponent from "./ProfileCard.jsx";
import GlobalBackground from "./GlobalBackground.jsx";
import "./CSEDClubShowcase.css";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

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

	useGSAP(() => {
		gsap.fromTo(
			".particle-navbar",
			{
				opacity: 0,
				yPercent: "-100",
			},
			{
				opacity: 1,
				yPercent: 0,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".teams-section",
					start: "top top",
					end: "+=100px",
					scrub: 1,
				},
			}
		);
	});

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
			// if (teamsSectionTop <= viewportHeight * 0.3 && !showNavbar) {
			// 	console.log("Showing navbar - reached teams section");
			// 	setNavbarAnimating(true);
			// 	setTimeout(() => {
			// 		setShowNavbar(true);
			// 	}, 100);
			// }
			// // Hide navbar when teams section is far below viewport (user scrolled back up)
			// else if (teamsSectionTop > viewportHeight * 0.8 && showNavbar) {
			// 	console.log("Hiding navbar - left teams section");
			// 	setShowNavbar(false);
			// 	setNavbarAnimating(false);
			// }
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
	const getGridClassForHierarchy = (position, memberName, departmentName) => {
		// Check if member is a Head based on department name
		if (departmentName === "Head") {
			// Special classes for each Head to ensure proper row placement
			if (memberName === "Kavya Upadhyay") {
				return "team-card-container hierarchy-team-head hierarchy-head-tech leader-row team-head-row"; // Tech Head - position 1
			} else if (memberName === "Devansh Kumar Dhangar") {
				return "team-card-container hierarchy-team-head hierarchy-head-operations leader-row team-head-row"; // Operations Head - position 2
			} else if (memberName === "Shivendra Kumar") {
				return "team-card-container hierarchy-team-head hierarchy-head-media leader-row team-head-row"; // Media Head - position 3
			} else {
				return "team-card-container hierarchy-team-head leader-row team-head-row"; // Fallback for other heads
			}
		}
		
		switch (position) {
			case "President":
				return "team-card-container hierarchy-executive hierarchy-president leader-row executive-row upper-executive"; // Executive row - 1 card per row on mobile, 2 on large screens only
			case "Vice President":
				return "team-card-container hierarchy-executive hierarchy-vice-president leader-row executive-row upper-executive"; // Executive row - 1 card per row on mobile, 2 on large screens only
			case "General Secretary":
			case "Joint Secretary":
				return "team-card-container hierarchy-secretary leader-row secretary-row lower-executive"; // Secretary row - exactly 2 cards per row
			case "Head":
				// This case should not be reached anymore since we check departmentName first
				return "team-card-container hierarchy-team-head leader-row team-head-row"; // Fallback for other heads
			case "Co-Head":
				return "team-card-container hierarchy-co-head leader-row co-head-row"; // Department co-heads
			case "Advisor":
				return "team-card-container hierarchy-advisor leader-row advisor-row"; // Advisors
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

		// Sort by hierarchy first, then by specific order for Heads, then alphabetically
		const sortedMembers = allMembers.sort((a, b) => {
			// Check if member is a Head based on department name instead of position
			const aIsHead = a.departmentName === "Head";
			const bIsHead = b.departmentName === "Head";
			
			// Hierarchy order - now includes department-based Head detection
			const getHierarchy = (member) => {
				if (member.position === "President") return 1;
				if (member.position === "Vice President") return 2;
				if (member.position === "General Secretary") return 3;
				if (member.position === "Joint Secretary") return 4;
				if (member.departmentName === "Head") return 5; // Head department comes after secretaries
				if (member.position === "Co-Head") return 6;
				if (member.position === "Advisor") return 7;
				return 99; // Regular members
			};

			const aHierarchy = getHierarchy(a);
			const bHierarchy = getHierarchy(b);

			if (aHierarchy !== bHierarchy) {
				return aHierarchy - bHierarchy;
			}

			// Special order for Heads (when both are in Head department)
			if (aIsHead && bIsHead) {
				const headOrder = {
					"Kavya Upadhyay": 1,
					"Devansh Kumar Dhangar": 2, 
					"Shivendra Kumar": 3,
				};
				
				const aOrder = headOrder[a.name] || 999;
				const bOrder = headOrder[b.name] || 999;
				
				if (aOrder !== bOrder) {
					return aOrder - bOrder;
				}
			}

			return a.name.localeCompare(b.name);
		});
		
		return sortedMembers;
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

	// Mentor data organized by sections
	const patronData = [
		{
			name: "Dr. Anoop Gupta",
			title: "Chief Patron",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/2563eb/ffffff?text=RK",
			linkedin: "https://www.linkedin.com/in/anoop-gupta-61236717/",
		},
		{
			name: "Mr. Pushkar Sharma",
			title: "Patron",
			// linkedin: "https://www.linkedin.com/in/pushkar-sharma-3ba943178/",
			avatarUrl:
				"https://via.placeholder.com/300x400/059669/ffffff?text=DG",
		},
	];

	const mentorData = [
		{
			name: "Mr. Deepansh Goyal",
			title: "Mentor",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/7c3aed/ffffff?text=AS",
			linkedin: "https://www.linkedin.com/in/deepansh-goyal-359022196/",
		},
		{
			name: "Mr. Mridul Bajpayee",
			title: "Snr. Technical Mentor",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/dc2626/ffffff?text=NV",
		},
		{
			name: "Mr. Devendra Kumar Rathode",
			title: "Snr. Technical Mentor",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/f59e0b/ffffff?text=VS",
			avatarUrl:
				"https://via.placeholder.com/300x400/10b981/ffffff?text=LY",
		},
		{
			name: "Mr. Pawan Kumar Sharma",
			title: "Snr. Technical Mentor",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/8b5cf6/ffffff?text=PKS",
		},
	];

	const studentMentorData = [
		{
			name: "Lovely Yadav",
			title: "Student Mentor",
			// avatarUrl:
			// 	"https://via.placeholder.com/300x400/10b981/ffffff?text=LY",
		},
		{
			name: "Abhishek Goswami",
			title: "Student Mentor",
			avatarUrl:
				"https://via.placeholder.com/300x400/6b7280/ffffff?text=Coming+Soon",
		},
	];

	const teamData = [
		// LEADERSHIP TEAM FIRST - This ensures it gets processed first
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
						avatarUrl: "/images/team/shubh.jpg",
						linkedin: "https://www.linkedin.com/in/shubh-singhal-/",
						github: "https://github.com/Shubh-Singhal-Taken",
					},
					{
						name: "Devansh Kumar Dhangar",
						title: "Vice President",
						position: "Vice President",
						avatarUrl: "/images/team/devansh.jpg",
						linkedin:
							"https://www.linkedin.com/in/devansh-kumar-dhangar-837b55223/",
						github: "https://github.com/Roccodevil",
					},
					{
						name: "Shivendra Kumar",
						title: "Secretary",
						position: "General Secretary",
						avatarUrl: "/images/team/shivendra.jpg",
						linkedin: "https://www.linkedin.com/in/shivendra-kumar-467b9a2a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github:"https://github.com/SHIVENDRA3030"
					},
					{
						name: "Bhoomika Agarwal",
						title: "Treasurer",
						position: "Joint Secretary",
						avatarUrl: "/images/team/bhoomika.jpg",
						linkedin:
							"https://www.linkedin.com/in/bhoomika-agarwal-981196326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/bhoomikaa9",
					},
				],
			},
		},
		{
			key: "tech",
			title: "Tech Cell",
			description:
				"Our tech team drives innovation through cutting-edge development and research.",
			subTeams: ["Head", "IOT", "Robotics", "AIML", "Full-stack"],
			members: {
				Head: [
					{
						name: "Kavya Upadhyay",
						title: "Tech Head",
					
						avatarUrl: "/images/team/kavya.jpg",
						linkedin: "https://www.linkedin.com/in/kavya-upadhyay-7600362b0/",
						github: "https://github.com/Kavya-Upadhyay",
					},
				],
				IOT: [
					{
						name: "Karan Pal",
						title: "IoT Developer",
						avatarUrl: "/images/team/karan.jpg",
					},
					{
						name: "Khush Pandit",
						title: "Hardware Engineer",
						avatarUrl: "/images/team/khush.jpg",
						linkedin:
							"https://www.linkedin.com/in/khush-pandit-9b6473256/",
						github: "https://github.com/khushpandit",
					},
					{
						name: "Kushal Soni",
						title: "IoT Engineer",
						avatarUrl: "/images/team/kushal.jpg",
						linkedin: "https://www.linkedin.com/in/soni-kushal/",
						github: "https://github.com/kushal-soni01",
					},
				],
				AIML: [
					{
						name: "Akshat Gupta",
						title: "AI/ML Engineer",
						avatarUrl: "/images/team/akshat.jpg",
						linkedin:
							"https://www.linkedin.com/in/akshat-gupta-88b129325/?original_referer=&originalSubdomain=in",
						github: "https://github.com/akshat-gupta-111",
					},
					{
						name: "Utkarsh Agarwal",
						title: "Ai/ML Engineer",
						avatarUrl: "/images/team/utkarsh.jpg",
						linkedin: "https://linkedin.com/in/utkarsh-agarwal",
						github: "https://github.com/Utkarsh45650",
					},
				],
				"Full-stack": [
					{
						name: "Arju Shrivastava",
						title: "Full-stack Developer",
						position: "Co-Head",
						avatarUrl: "/images/team/arju.jpg",
					},
					{
						name: "Shaurya Pratap Singh",
						title: "Full-stack Developer",
						avatarUrl: "/images/team/shaurya.jpg",
						linkedin: "https://www.linkedin.com/in/Zmy-Shaurya/",
						github: "https://github.com/zmy-shaurya/",
					},
				],
			},
		},
		{
			key: "operations",
			title: "Operations & Relations",
			description:
				"The operations team ensures smooth functioning of all club activities.",
			subTeams: ["Head", "CR PR", "Event & Hospitality", "Data"],
			members: {
				Head: [
					{
						name: "Devansh Kumar Dhangar",
						title: "Operations Head",
						
						avatarUrl: "/images/team/devansh.jpg",
						linkedin: "https://www.linkedin.com/in/devansh-kumar-dhangar-837b55223/",
						github: "https://github.com/Roccodevil",
					},
				],
				"CR & PR": [
					{
						name: "Anmol Sharma",
						title: "CR/PR Head",
						position: "Co-Head",
						avatarUrl: "/images/team/anmol.jpg",
						linkedin:
							"https://www.linkedin.com/in/anmol-sharma-26a67b324",
						github: "https://github.com/AnmolSharma1711",
					},
					{
						name: "Debraj Mondal",
						title: "CR/PR",
						position: "Advisor",
						avatarUrl: "/images/team/debraj.jpg",
						linkedin:
							"https://www.linkedin.com/in/debraj-mondal-9ba1b52b2/",
						github: "https://github.com/debraj1505",
					},
					{
						name: "Keerti",
						title: "CR/PR",
						avatarUrl: "/images/team/keerti.jpg",
						linkedin:
							"https://www.linkedin.com/in/keerti-yaduvanshi-4813b9280/",
						github: "https://github.com/Keerti-12",
					},
					{
						name: "Krish Kumar",
						title: "CR/PR",
						avatarUrl: "/images/team/krish.jpg",
						linkedin:
							"https://www.linkedin.com/in/krish-kumar-194562358/",
					},
					{
						name: "Shresth Soni",
						title: "CR/PR",
						avatarUrl: "/images/team/shresth.jpg",
						linkedin:
							"https://www.linkedin.com/in/shresth-soni-965910326/",
						github: "https://github.com/shresth-soni",
					},
				],
				"Event & Hospitality": [
					{
						name: "Shilpi Tiwari",
						title: "Event Coordinator",
						position: "Co-Head",
						avatarUrl: "/images/team/shilpi.jpg",
						linkedin:
							"https://www.linkedin.com/in/shilpi-tiwari-416180328/",
						github: "https://github.com/Shilpi82",
					},
					{
						name: "Shubham Singh",
						title: "Hospitality Manager",
						position: "Co-Head",
						avatarUrl: "/images/team/shubham.jpg",
						linkedin:
							"https://www.linkedin.com/in/shubham-kumar-singh-981874338/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/shubhamsingh900",
					},
					{
						name: "Piyush Maurya",
						title: "Venue Coordinator",
						position: "Advisor",
						avatarUrl: "/images/team/piyush.jpg",
					},
					{
						name: "Kashish Gangwar",
						title: "Event Planning Specialist",
						avatarUrl: "/images/team/kashish.jpg",
						linkedin:
							"https://www.linkedin.com/in/kashish-gangwar-366b88329",
						github: "https://github.com/kashishgangwar/c-assignment",
					},
					{
						name: "Kaushal Kumar",
						title: "Venue Coordinator",
						avatarUrl: "/images/team/kaushal.jpg",
						linkedin:
							"www.linkedin.com/in/ kaushal-kumar-613139348",
						github: "https://github.com/kosu-11",
					},
					// {
					// 	name: "Krishna Upadhyay",
					// 	title: "Venue Coordinator",
					// 	avatarUrl: "/images/team/krishna.jpg",
					// },
					{
						name: "Aavya Agarwal",
						title: "Venue Coordinator",
						avatarUrl: "/images/team/avya.jpg",
					},
					{
						name: "Kush Somvanshi",
						title: "Venue Coordinator",
						avatarUrl: "/images/team/kush.jpg",
					},
					{
						name: "Kirtan Agarwal",
						title: "Venue Coordinator",
						avatarUrl: "/images/team/kirtan.jpg",
						linkedin:
							"https://www.linkedin.com/in/kirtan-agrwal-925428357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
					},
				],
				Data: [
					{
						name: "Kishlay Kumar",
						title: "Data Analyst",
						position: "Co-Head",
						avatarUrl: "/images/team/kishlay.jpg",
						linkedin:
							"https://www.linkedin.com/in/kishlay-kumar-19318a210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/beyondcode776",
					},
					{
						name: "Amrita Singh",
						title: "Database Administrator",
						avatarUrl: "/images/team/amrita.jpg",
						linkedin:
							"https://www.linkedin.com/in/amrita-singh-308333326/",
						github: "https://github.com/Amritasingh600",
					},
					{
						name: "Ansh Agarwal",
						title: "Data Scientist",
						position: "Advisor",
						avatarUrl: "/images/team/ansh.jpg",
					},
					{
						name: "Kanishka Gautam",
						title: "Analytics Lead",
						avatarUrl: "/images/team/kanishka.jpg",
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
			subTeams: ["Head", "Design", "Content"],
			members: {
				Head: [
					{
						name: "Shivendra Kumar",
						title: "Media Head",
						
						avatarUrl: "/images/team/shivendra.jpg",
						linkedin: "https://www.linkedin.com/in/shivendra-kumar-467b9a2a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/SHIVENDRA3030",
					},
				],
				Design: [
					{
						name: "Tanmay Pathak",
						title: "Graphic Designer",
						position: "Co-Head",
						avatarUrl: "/images/team/tanmay.jpg",
					},
					{
						name: "Kritika Sharan",
						title: "Visual Designer",
						avatarUrl: "/images/team/kritika.jpg",
						linkedin: "https://github.com/krittx",
						github: "https://www.linkedin.com/in/kritika-sharan-ab32a3221?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
					},
					{
						name: "Dhanvi Sharma",
						title: "Brand Designer",
						avatarUrl: "/images/team/dhanvi.jpg",
						linkedin:
							"https://www.linkedin.com/in/dhanvi-sharma-2ba47126b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/Dhanvi00",
					},
					{
						name: "Shivam Baghel",
						title: "Motion Graphics Designer",
						avatarUrl: "/images/team/shivam.jpg",
					},
				],
				Content: [
					{
						name: "Muskan Singh",
						title: "Content Writer",
						position: "Co-Head",
						avatarUrl: "/images/team/muskan.jpg",
						linkedin:
							"https://www.linkedin.com/in/muskan-singh-454405314/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
						github: "https://github.com/Muskansingh-ms",
					},
					{
						name: "Ankush Kaushik",
						title: "Copy Writer",
						position: "Advisor",
						avatarUrl: "/images/team/ankush.jpg",
						linkedin: "www.linkedin.com/in/ankush212",
						github: "https://github.com/ankushman",
					},
					{
						name: "Apoorv Mehrotra",
						title: "Technical Writer",
						avatarUrl: "/images/team/apoorv.jpg",
						linkedin: "https://www.linkedin.com/in/its-apoorv-?",
						github: "https://github.com/programmerbeast2004",
					},
					{
						name: "Anwesha Kumari",
						title: "Content Strategist",
						avatarUrl: "/images/team/anvesha.jpg",
						linkedin:
							"https://www.linkedin.com/in/anwesha-kumari-3a55a3326/",
						github: "https://github.com/Anweshakumari77",
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

			{/* Mentors Section - Split into Three Subsections */}
			<div className="mentors-section">
				<div className="mentors-container">
					{/* Patrons Subsection */}
					<div className="mentor-subsection patrons-subsection">
						<div className="mentors-header-wrapper">
							<div className="mentors-header-container">
								<h1 className="mentors-main-title">OUR PATRONS</h1>
							</div>
						</div>

						{/* Patron Cards - 2 cards side by side */}
						<div className="patrons-grid">
							{patronData.map((patron, index) => (
								<div
									key={index}
									className="patron-card-container patron-row"
								>
									<ProfileCardComponent
										member={{
											name: patron.name,
											title: "Patron",
											position: patron.title,
											avatarUrl: patron.avatarUrl,
											linkedin: patron.linkedin,
											github: patron.github,
										}}
										enableTilt={true}
										enableMobileTilt={true}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Mentors Subsection */}
					<div className="mentor-subsection mentors-subsection">
						<div className="mentors-header-wrapper">
							<div className="mentors-header-container">
								<h1 className="mentors-main-title">OUR MENTORS</h1>
							</div>
						</div>

						{/* Mentor Cards - Hierarchical Layout */}
						<div className="mentors-grid">
							{mentorData.map((mentor, index) => {
								// First mentor (index 0) - centered in first row
								// Next three mentors (index 1-3) - three cards in second row
								let gridClass;
								if (index === 0) {
									gridClass =
										"mentor-card-container hierarchy-mentor-head mentor-row";
								} else {
									gridClass =
										"mentor-card-container hierarchy-mentor-senior mentor-row";
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

					{/* Student Mentors Subsection */}
					<div className="mentor-subsection student-mentors-subsection">
						<div className="mentors-header-wrapper">
							<div className="mentors-header-container">
								<h1 className="mentors-main-title">OUR STUDENT MENTORS</h1>
							</div>
						</div>

						{/* Student Mentor Cards - 2 cards side by side */}
						<div className="student-mentors-grid">
							{studentMentorData.map((studentMentor, index) => (
								<div
									key={index}
									className="student-mentor-card-container student-mentor-row"
								>
									<ProfileCardComponent
										member={{
											name: studentMentor.name,
											title: "Student Mentor",
											position: studentMentor.title,
											avatarUrl: studentMentor.avatarUrl,
											linkedin: studentMentor.linkedin,
											github: studentMentor.github,
										}}
										enableTilt={true}
										enableMobileTilt={true}
									/>
								</div>
							))}
						</div>
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
						{getAllMembersAlphabetically().map((member, index, array) => {
							// Check if this is the last Head and the next member is a Co-Head
							const isLastHead = member.departmentName === "Head" && 
								index < array.length - 1 && 
								array[index + 1].position === "Co-Head";
							
							return (
								<React.Fragment key={`${member.name}-${index}`}>
									<div
										className={getGridClassForHierarchy(
											member.position,
											member.name,
											member.departmentName
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
									{/* Add row break after last head */}
									{isLastHead && (
										<div className="grid-row-break"></div>
									)}
								</React.Fragment>
							);
						})}
					</div>

					<div className="apply-now-wrapper">
						<div className="apply-now-container">
							<button
								onClick={handleApplyClick}
								className="apply-now-btn"
							>
								<div className="overline-effect"></div>
								<span>
									<Link to="/join">Apply Now</Link>
								</span>
								<div className="underline-effect"></div>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Application Modal */}
			{/* {showApplicationForm && (
				<ApplicationModal onClose={closeApplicationForm} />
			)} */}
		</div>
	);
};

export default CSEDClubShowcase;
