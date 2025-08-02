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
		imageUrl:
			"https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		videoUrl:
			"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
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
			title: "AI & Machine Learning Summit 2024",
			date: "March 15, 2024",
			time: "9:00 AM - 6:00 PM",
			location: "Silicon Valley Convention Center",
			image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"A comprehensive technology conference featuring the latest innovations in AI, machine learning, and neural networks with industry leaders.",
			description:
				"The AI & Machine Learning Summit 2024 brought together industry leaders, researchers, and tech enthusiasts for a day of groundbreaking presentations and networking. Attendees explored cutting-edge AI technologies, learned from expert speakers, and connected with like-minded professionals in the rapidly evolving field of artificial intelligence.",
			perks: [
				"Networking with 500+ AI professionals",
				"Access to exclusive AI model demos",
				"Premium lunch and refreshments",
				"Digital certificate of attendance",
				"Access to recorded sessions",
				"AI toolkit worth $1000",
			],
			speakers: [
				{
					id: 1,
					name: "Dr. Sarah Johnson",
					title: "Chief AI Officer",
					company: "DeepMind Technologies",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
				{
					id: 2,
					name: "Michael Chen",
					title: "Machine Learning Architect",
					company: "OpenAI Research",
					bio: "Michael has been at the forefront of ML technology development, creating innovative solutions for large language models and neural network architectures.",
					image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/michaelchen",
					twitter: "https://twitter.com/mchen_ml",
				},
				{
					id: 3,
					name: "Dr. Aisha Patel",
					title: "Research Scientist",
					company: "Google AI",
					bio: "Dr. Patel specializes in computer vision and natural language processing, with groundbreaking work in multimodal AI systems.",
					image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/aishapatel",
					twitter: "https://twitter.com/aisha_ai",
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
		{
			id: 2,
			title: "Digital Marketing Revolution",
			date: "April 22, 2024",
			time: "10:00 AM - 5:00 PM",
			location: "New York Marketing Hub",
			image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"Explore the future of digital marketing with AI-powered strategies, influencer marketing, and data-driven campaigns that convert.",
			description:
				"The Digital Marketing Revolution showcased the latest trends, tools, and techniques in digital marketing. From AI-powered social media strategies to advanced data analytics, attendees gained valuable insights to drive their marketing efforts forward in 2024 and beyond.",
			perks: [
				"Workshops on AI marketing tools",
				"1-on-1 consultations with experts",
				"Marketing toolkit worth $750",
				"Certificate of completion",
				"Access to exclusive marketing templates",
				"Networking with 300+ marketers",
			],
			speakers: [
				{
					id: 1,
					name: "Emma Rodriguez",
					title: "Chief Marketing Officer",
					company: "BrandForward Inc.",
					bio: "Emma has helped dozens of Fortune 500 brands achieve remarkable growth through innovative digital marketing strategies and AI-powered campaigns.",
					image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/emmarodriguez",
					twitter: "https://twitter.com/emma_marketing",
				},
				{
					id: 2,
					name: "James Wilson",
					title: "Growth Hacking Specialist",
					company: "ViraLabs",
					bio: "James is a growth marketing expert who has scaled multiple startups from zero to millions in revenue using data-driven marketing strategies.",
					image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/jameswilson",
					twitter: "https://twitter.com/james_growth",
				},
			],
			photos: [
				"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&h=400&fit=crop",
			],
			sponsors: {
				platinum: [
					{
						name: "HubSpot",
						logo: "https://via.placeholder.com/200x80/FF7A59/FFFFFF?text=HubSpot",
					},
					{
						name: "Salesforce",
						logo: "https://via.placeholder.com/200x80/00A1E0/FFFFFF?text=Salesforce",
					},
				],
				gold: [
					{
						name: "Mailchimp",
						logo: "https://via.placeholder.com/150x60/FFE01B/000000?text=Mailchimp",
					},
					{
						name: "Shopify",
						logo: "https://via.placeholder.com/150x60/96BF47/FFFFFF?text=Shopify",
					},
				],
				silver: [
					{
						name: "Buffer",
						logo: "https://via.placeholder.com/120x50/168EEA/FFFFFF?text=Buffer",
					},
					{
						name: "Canva",
						logo: "https://via.placeholder.com/120x50/00C4CC/FFFFFF?text=Canva",
					},
				],
			},
		},
		{
			id: 3,
			title: "Web3 & Blockchain Expo",
			date: "May 18, 2024",
			time: "11:00 AM - 7:00 PM",
			location: "Miami Blockchain Center",
			image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"Dive deep into the world of decentralized finance, NFTs, smart contracts, and the future of Web3 technology.",
			description:
				"The Web3 & Blockchain Expo brought together crypto enthusiasts, DeFi experts, and blockchain developers for an immersive experience into the decentralized web. Participants explored cutting-edge blockchain technologies, learned about DeFi protocols, and networked with industry pioneers shaping the future of finance.",
			perks: [
				"Access to exclusive NFT drops",
				"Crypto wallet with $100 in tokens",
				"Blockchain developer toolkit",
				"DeFi yield farming guide",
				"Web3 security best practices",
				"Networking with crypto leaders",
				"Smart contract templates",
			],
			speakers: [
				{
					id: 1,
					name: "Alex Crypto",
					title: "Blockchain Architect",
					company: "Ethereum Foundation",
					bio: "Alex has been instrumental in developing Ethereum's Layer 2 scaling solutions and has contributed to major DeFi protocols used by millions.",
					image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/alexcrypto",
					twitter: "https://twitter.com/alex_blockchain",
				},
				{
					id: 2,
					name: "Luna Martinez",
					title: "DeFi Protocol Designer",
					company: "Uniswap Labs",
					bio: "Luna specializes in automated market makers and has designed several successful DeFi protocols that have processed billions in transactions.",
					image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/lunamartinez",
					twitter: "https://twitter.com/luna_defi",
				},
				{
					id: 3,
					name: "Ryan Thompson",
					title: "NFT Marketplace Founder",
					company: "OpenSea",
					bio: "Ryan built one of the largest NFT marketplaces and has deep insights into digital asset trading and blockchain gaming.",
					image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/ryanthompson",
					twitter: "https://twitter.com/ryan_nft",
				},
			],
			photos: [
				"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
			],
			sponsors: {
				platinum: [
					{
						name: "Coinbase",
						logo: "https://via.placeholder.com/200x80/0052FF/FFFFFF?text=Coinbase",
					},
					{
						name: "Binance",
						logo: "https://via.placeholder.com/200x80/F3BA2F/000000?text=Binance",
					},
				],
				gold: [
					{
						name: "Polygon",
						logo: "https://via.placeholder.com/150x60/8247E5/FFFFFF?text=Polygon",
					},
					{
						name: "Chainlink",
						logo: "https://via.placeholder.com/150x60/375BD2/FFFFFF?text=Chainlink",
					},
					{
						name: "Solana",
						logo: "https://via.placeholder.com/150x60/14F195/000000?text=Solana",
					},
				],
				silver: [
					{
						name: "MetaMask",
						logo: "https://via.placeholder.com/120x50/F6851B/FFFFFF?text=MetaMask",
					},
					{
						name: "Uniswap",
						logo: "https://via.placeholder.com/120x50/FF007A/FFFFFF?text=Uniswap",
					},
					{
						name: "OpenSea",
						logo: "https://via.placeholder.com/120x50/2081E2/FFFFFF?text=OpenSea",
					},
				],
			},
		},
		{
			id: 4,
			title: "AI & Machine Learning Summit 2024",
			date: "March 15, 2024",
			time: "9:00 AM - 6:00 PM",
			location: "Silicon Valley Convention Center",
			image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"A comprehensive technology conference featuring the latest innovations in AI, machine learning, and neural networks with industry leaders.",
			description:
				"The AI & Machine Learning Summit 2024 brought together industry leaders, researchers, and tech enthusiasts for a day of groundbreaking presentations and networking. Attendees explored cutting-edge AI technologies, learned from expert speakers, and connected with like-minded professionals in the rapidly evolving field of artificial intelligence.",
			perks: [
				"Networking with 500+ AI professionals",
				"Access to exclusive AI model demos",
				"Premium lunch and refreshments",
				"Digital certificate of attendance",
				"Access to recorded sessions",
				"AI toolkit worth $1000",
			],
			speakers: [
				{
					id: 1,
					name: "Dr. Sarah Johnson",
					title: "Chief AI Officer",
					company: "DeepMind Technologies",
					bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence with over 15 years of experience leading AI research teams at top tech companies. She has published over 50 papers on machine learning and neural networks.",
					image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/sarahjohnson",
					twitter: "https://twitter.com/sarahj_ai",
				},
				{
					id: 2,
					name: "Michael Chen",
					title: "Machine Learning Architect",
					company: "OpenAI Research",
					bio: "Michael has been at the forefront of ML technology development, creating innovative solutions for large language models and neural network architectures.",
					image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/michaelchen",
					twitter: "https://twitter.com/mchen_ml",
				},
				{
					id: 3,
					name: "Dr. Aisha Patel",
					title: "Research Scientist",
					company: "Google AI",
					bio: "Dr. Patel specializes in computer vision and natural language processing, with groundbreaking work in multimodal AI systems.",
					image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/aishapatel",
					twitter: "https://twitter.com/aisha_ai",
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
		{
			id: 5,
			title: "Digital Marketing Revolution",
			date: "April 22, 2024",
			time: "10:00 AM - 5:00 PM",
			location: "New York Marketing Hub",
			image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"Explore the future of digital marketing with AI-powered strategies, influencer marketing, and data-driven campaigns that convert.",
			description:
				"The Digital Marketing Revolution showcased the latest trends, tools, and techniques in digital marketing. From AI-powered social media strategies to advanced data analytics, attendees gained valuable insights to drive their marketing efforts forward in 2024 and beyond.",
			perks: [
				"Workshops on AI marketing tools",
				"1-on-1 consultations with experts",
				"Marketing toolkit worth $750",
				"Certificate of completion",
				"Access to exclusive marketing templates",
				"Networking with 300+ marketers",
			],
			speakers: [
				{
					id: 1,
					name: "Emma Rodriguez",
					title: "Chief Marketing Officer",
					company: "BrandForward Inc.",
					bio: "Emma has helped dozens of Fortune 500 brands achieve remarkable growth through innovative digital marketing strategies and AI-powered campaigns.",
					image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/emmarodriguez",
					twitter: "https://twitter.com/emma_marketing",
				},
				{
					id: 2,
					name: "James Wilson",
					title: "Growth Hacking Specialist",
					company: "ViraLabs",
					bio: "James is a growth marketing expert who has scaled multiple startups from zero to millions in revenue using data-driven marketing strategies.",
					image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/jameswilson",
					twitter: "https://twitter.com/james_growth",
				},
			],
			photos: [
				"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&h=400&fit=crop",
			],
			sponsors: {
				platinum: [
					{
						name: "HubSpot",
						logo: "https://via.placeholder.com/200x80/FF7A59/FFFFFF?text=HubSpot",
					},
					{
						name: "Salesforce",
						logo: "https://via.placeholder.com/200x80/00A1E0/FFFFFF?text=Salesforce",
					},
				],
				gold: [
					{
						name: "Mailchimp",
						logo: "https://via.placeholder.com/150x60/FFE01B/000000?text=Mailchimp",
					},
					{
						name: "Shopify",
						logo: "https://via.placeholder.com/150x60/96BF47/FFFFFF?text=Shopify",
					},
				],
				silver: [
					{
						name: "Buffer",
						logo: "https://via.placeholder.com/120x50/168EEA/FFFFFF?text=Buffer",
					},
					{
						name: "Canva",
						logo: "https://via.placeholder.com/120x50/00C4CC/FFFFFF?text=Canva",
					},
				],
			},
		},
		{
			id: 6,
			title: "Web3 & Blockchain Expo",
			date: "May 18, 2024",
			time: "11:00 AM - 7:00 PM",
			location: "Miami Blockchain Center",
			image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=entropy",
			summary:
				"Dive deep into the world of decentralized finance, NFTs, smart contracts, and the future of Web3 technology.",
			description:
				"The Web3 & Blockchain Expo brought together crypto enthusiasts, DeFi experts, and blockchain developers for an immersive experience into the decentralized web. Participants explored cutting-edge blockchain technologies, learned about DeFi protocols, and networked with industry pioneers shaping the future of finance.",
			perks: [
				"Access to exclusive NFT drops",
				"Crypto wallet with $100 in tokens",
				"Blockchain developer toolkit",
				"DeFi yield farming guide",
				"Web3 security best practices",
				"Networking with crypto leaders",
				"Smart contract templates",
			],
			speakers: [
				{
					id: 1,
					name: "Alex Crypto",
					title: "Blockchain Architect",
					company: "Ethereum Foundation",
					bio: "Alex has been instrumental in developing Ethereum's Layer 2 scaling solutions and has contributed to major DeFi protocols used by millions.",
					image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/alexcrypto",
					twitter: "https://twitter.com/alex_blockchain",
				},
				{
					id: 2,
					name: "Luna Martinez",
					title: "DeFi Protocol Designer",
					company: "Uniswap Labs",
					bio: "Luna specializes in automated market makers and has designed several successful DeFi protocols that have processed billions in transactions.",
					image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/lunamartinez",
					twitter: "https://twitter.com/luna_defi",
				},
				{
					id: 3,
					name: "Ryan Thompson",
					title: "NFT Marketplace Founder",
					company: "OpenSea",
					bio: "Ryan built one of the largest NFT marketplaces and has deep insights into digital asset trading and blockchain gaming.",
					image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
					linkedin: "https://linkedin.com/in/ryanthompson",
					twitter: "https://twitter.com/ryan_nft",
				},
			],
			photos: [
				"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
				"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
			],
			sponsors: {
				platinum: [
					{
						name: "Coinbase",
						logo: "https://via.placeholder.com/200x80/0052FF/FFFFFF?text=Coinbase",
					},
					{
						name: "Binance",
						logo: "https://via.placeholder.com/200x80/F3BA2F/000000?text=Binance",
					},
				],
				gold: [
					{
						name: "Polygon",
						logo: "https://via.placeholder.com/150x60/8247E5/FFFFFF?text=Polygon",
					},
					{
						name: "Chainlink",
						logo: "https://via.placeholder.com/150x60/375BD2/FFFFFF?text=Chainlink",
					},
					{
						name: "Solana",
						logo: "https://via.placeholder.com/150x60/14F195/000000?text=Solana",
					},
				],
				silver: [
					{
						name: "MetaMask",
						logo: "https://via.placeholder.com/120x50/F6851B/FFFFFF?text=MetaMask",
					},
					{
						name: "Uniswap",
						logo: "https://via.placeholder.com/120x50/FF007A/FFFFFF?text=Uniswap",
					},
					{
						name: "OpenSea",
						logo: "https://via.placeholder.com/120x50/2081E2/FFFFFF?text=OpenSea",
					},
				],
			},
		},
	];

	const horizontalEventData = [
		{
			id: 1,
			date: "4 Aug",
			time: "10:00-3:00",
			title: "Workshop 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam veritatis, consectetur adipiscing elit.",
		},
		{
			id: 2,
			date: "8 Aug",
			time: "10:00-3:00",
			title: "The Future of JS",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam veritatis, consectetur adipiscing elit.",
		},
		{
			id: 3,
			date: "14 Aug",
			time: "10:00-3:00",
			title: "Javascript Ecosystem",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam veritatis, consectetur adipiscing elit.",
		},
		{
			id: 4,
			date: "26 Aug",
			time: "10:00-3:00",
			title: "Javascript Algorithm",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam veritatis, consectetur adipiscing elit.",
		},
	];

	const HorizontalRegisterButtonText = "REGISTER NOW";

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
