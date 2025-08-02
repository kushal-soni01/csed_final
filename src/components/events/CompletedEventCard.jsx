import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CompletedEventCard.css";

const CompletedEventCard = ({ completedEvent }) => {
	const [isCompletedEventHovered, setIsCompletedEventHovered] =
		useState(false);
	const [isCompletedEventModalOpen, setIsCompletedEventModalOpen] =
		useState(false);
	const [completedEventActiveTab, setCompletedEventActiveTab] =
		useState("description");

	// Default values in case props are not provided
	const eventData = completedEvent || {
		title: "Default Event",
		date: "TBD",
		time: "TBD",
		location: "TBD",
		summary: "Event details coming soon",
		image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop&crop=faces",
		description: "Event description coming soon",
		perks: [],
		speakers: [],
		photos: [],
		sponsors: {},
	};

	const handleCompletedEventMouseEnter = () => {
		setIsCompletedEventHovered(true);
	};

	const handleCompletedEventMouseLeave = () => {
		setIsCompletedEventHovered(false);
	};

	const openCompletedEventModal = () => setIsCompletedEventModalOpen(true);
	const closeCompletedEventModal = () => {
		setIsCompletedEventModalOpen(false);
		setCompletedEventActiveTab("description");
	};

	const handleCompletedEventTabChange = (tab) => {
		setCompletedEventActiveTab(tab);
	};

	return (
		<>
			{/* Individual event card wrapper - removed the main container */}
			<div className="completed-event-wrapper">
				{/* Container for the entire interactive element - NO mouse events here */}
				<motion.div className="completed-event-interactive-container">
					{/* Circular Image - ONLY this triggers the animation */}
					<motion.div
						className="completed-event-image-container"
						onMouseEnter={handleCompletedEventMouseEnter}
						onMouseLeave={handleCompletedEventMouseLeave}
						animate={{
							rotate: isCompletedEventHovered ? 360 : 0,
							scale: isCompletedEventHovered ? 1.05 : 1,
							y: isCompletedEventHovered ? -8 : 0,
						}}
						transition={{
							rotate: { duration: 1.0, ease: "easeInOut" },
							scale: {
								duration: 0.4,
								ease: [0.175, 0.885, 0.32, 1.275],
							},
							y: {
								duration: 0.4,
								ease: [0.175, 0.885, 0.32, 1.275],
							},
						}}
					>
						<div className="completed-event-image-circle">
							<img
								src={eventData.image}
								alt={eventData.title}
								className="completed-event-image"
							/>
						</div>
					</motion.div>

					{/* Info Box - Garage Door Animation (slides down from above) */}
					<AnimatePresence>
						{isCompletedEventHovered && (
							<motion.div
								initial={{
									height: 0,
									opacity: 0,
									y: -20,
									scaleY: 0,
									transformOrigin: "top",
								}}
								animate={{
									height: "auto",
									opacity: 1,
									y: 0,
									scaleY: 1,
									transformOrigin: "top",
								}}
								exit={{
									height: 0,
									opacity: 0,
									y: -20,
									scaleY: 0,
									transformOrigin: "top",
								}}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
									height: {
										duration: 0.6,
										ease: [0.25, 0.46, 0.45, 0.94],
									},
									opacity: { duration: 0.4, delay: 0.1 },
									scaleY: {
										duration: 0.6,
										ease: [0.25, 0.46, 0.45, 0.94],
									},
								}}
								className="completed-event-info-box-container"
								onMouseEnter={handleCompletedEventMouseEnter}
								onMouseLeave={handleCompletedEventMouseLeave}
							>
								<div className="completed-event-info-box">
									{/* Header with gradient */}
									<div className="completed-event-header">
										<motion.h3
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.2,
												duration: 0.4,
											}}
											className="completed-event-title"
										>
											{eventData.title}
										</motion.h3>

										<motion.p
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.3,
												duration: 0.4,
											}}
											className="completed-event-summary"
										>
											{eventData.summary}
										</motion.p>
									</div>

									{/* Event Details */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.4,
											duration: 0.4,
										}}
										className="completed-event-details"
									>
										{/* Date */}
										<div className="completed-event-detail-item">
											<div className="completed-event-icon">
												<svg
													className="completed-event-svg completed-event-date-icon"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="completed-event-detail-text">
												{eventData.date}
											</span>
										</div>
									</motion.div>

									{/* Action Button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.5,
											duration: 0.4,
										}}
									>
										<button
											onClick={openCompletedEventModal}
											className="completed-event-button"
										>
											More Info
										</button>
									</motion.div>

									{/* Bottom accent line */}
									<motion.div
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{
											delay: 0.6,
											duration: 0.8,
										}}
										className="completed-event-accent-line"
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Event Name */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.6 }}
					className="completed-event-name"
				>
					<h2 className="completed-event-name-text">
						{eventData.title}
					</h2>
				</motion.div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{isCompletedEventModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="completed-event-modal-overlay"
					>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="completed-event-backdrop"
							onClick={closeCompletedEventModal}
						/>

						{/* Modal Content */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0, y: 50 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.8, opacity: 0, y: 50 }}
							transition={{ type: "spring", duration: 0.5 }}
							className="completed-event-modal-content"
						>
							{/* Modal Header */}
							<div className="completed-event-modal-header">
								<h2 className="completed-event-modal-title">
									{eventData.title}
								</h2>
								<button
									onClick={closeCompletedEventModal}
									className="completed-event-close-button"
								>
									<svg
										className="completed-event-close-icon"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* Tabs */}
							<div className="completed-event-tabs">
								{[
									"description",
									"speakers",
									"photos",
									"sponsors",
								].map((tab) => (
									<button
										key={tab}
										onClick={() =>
											handleCompletedEventTabChange(tab)
										}
										className={`completed-event-tab ${
											completedEventActiveTab === tab
												? "completed-event-tab-active"
												: ""
										}`}
									>
										{tab.charAt(0).toUpperCase() +
											tab.slice(1)}
									</button>
								))}
							</div>

							{/* Tab Content */}
							<div className="completed-event-tab-content">
								<AnimatePresence mode="wait">
									{/* Description Tab */}
									{completedEventActiveTab ===
										"description" && (
										<motion.div
											key="description"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ duration: 0.3 }}
										>
											<p className="completed-event-description">
												{eventData.description}
											</p>

											{eventData.perks &&
												eventData.perks.length > 0 && (
													<div>
														<h3 className="completed-event-perks-title">
															<svg
																className="completed-event-star-icon"
																fill="currentColor"
																viewBox="0 0 20 20"
															>
																<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
															</svg>
															Event Perks
														</h3>
														<ul className="completed-event-perks-list">
															{eventData.perks.map(
																(
																	perk,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className="completed-event-perk-item"
																	>
																		<svg
																			className="completed-event-check-icon"
																			fill="currentColor"
																			viewBox="0 0 20 20"
																		>
																			<path
																				fillRule="evenodd"
																				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																				clipRule="evenodd"
																			/>
																		</svg>
																		<span>
																			{
																				perk
																			}
																		</span>
																	</li>
																)
															)}
														</ul>
													</div>
												)}
										</motion.div>
									)}

									{/* Speakers Tab */}
									{completedEventActiveTab === "speakers" && (
										<motion.div
											key="speakers"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ duration: 0.3 }}
											className="completed-event-speakers"
										>
											{eventData.speakers &&
											eventData.speakers.length > 0 ? (
												eventData.speakers.map(
													(speaker) => (
														<div
															key={speaker.id}
															className="completed-event-speaker-card"
														>
															<div className="completed-event-speaker-header">
																<img
																	src={
																		speaker.image
																	}
																	alt={
																		speaker.name
																	}
																	className="completed-event-speaker-image"
																/>
																<div className="completed-event-speaker-info">
																	<h4 className="completed-event-speaker-name">
																		{
																			speaker.name
																		}
																	</h4>
																	<p className="completed-event-speaker-title">
																		{
																			speaker.title
																		}
																	</p>
																	<p className="completed-event-speaker-company">
																		{
																			speaker.company
																		}
																	</p>
																</div>
															</div>
															<p className="completed-event-speaker-bio">
																{speaker.bio}
															</p>
															<div className="completed-event-speaker-social">
																<a
																	href={
																		speaker.linkedin
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="completed-event-social-link"
																>
																	<svg
																		className="completed-event-social-icon"
																		fill="currentColor"
																		viewBox="0 0 20 20"
																	>
																		<path
																			fillRule="evenodd"
																			d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
																			clipRule="evenodd"
																		/>
																	</svg>
																	LinkedIn
																</a>
																<a
																	href={
																		speaker.twitter
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="completed-event-social-link"
																>
																	<svg
																		className="completed-event-social-icon"
																		fill="currentColor"
																		viewBox="0 0 20 20"
																	>
																		<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
																	</svg>
																	Twitter
																</a>
															</div>
														</div>
													)
												)
											) : (
												<p className="completed-event-no-data">
													No speakers information
													available.
												</p>
											)}
										</motion.div>
									)}

									{/* Photos Tab */}
									{completedEventActiveTab === "photos" && (
										<motion.div
											key="photos"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ duration: 0.3 }}
										>
											{eventData.photos &&
											eventData.photos.length > 0 ? (
												<div className="completed-event-photos-grid">
													{eventData.photos.map(
														(photo, index) => (
															<motion.div
																key={index}
																whileHover={{
																	scale: 1.05,
																}}
																transition={{
																	duration: 0.2,
																}}
																className="completed-event-photo-item"
															>
																<img
																	src={photo}
																	alt={`Event ${
																		index +
																		1
																	}`}
																	className="completed-event-photo"
																/>
															</motion.div>
														)
													)}
												</div>
											) : (
												<p className="completed-event-no-data">
													No photos available.
												</p>
											)}
										</motion.div>
									)}

									{/* Sponsors Tab */}
									{completedEventActiveTab === "sponsors" && (
										<motion.div
											key="sponsors"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ duration: 0.3 }}
											className="completed-event-sponsors"
										>
											{eventData.sponsors &&
											Object.keys(eventData.sponsors)
												.length > 0 ? (
												Object.entries(
													eventData.sponsors
												).map(([tier, sponsors]) => (
													<div
														key={tier}
														className="completed-event-sponsor-tier"
													>
														<h3 className="completed-event-sponsor-tier-title">
															<svg
																className="completed-event-star-icon"
																fill="currentColor"
																viewBox="0 0 20 20"
															>
																<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
															</svg>
															{tier} Sponsors
														</h3>
														<div className="completed-event-sponsors-grid">
															{sponsors.map(
																(
																	sponsor,
																	index
																) => (
																	<motion.div
																		key={
																			index
																		}
																		whileHover={{
																			scale: 1.05,
																		}}
																		transition={{
																			duration: 0.2,
																		}}
																		className="completed-event-sponsor-item"
																	>
																		<img
																			src={
																				sponsor.logo
																			}
																			alt={
																				sponsor.name
																			}
																			className="completed-event-sponsor-logo"
																		/>
																	</motion.div>
																)
															)}
														</div>
													</div>
												))
											) : (
												<p className="completed-event-no-data">
													No sponsor information
													available.
												</p>
											)}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default CompletedEventCard;
