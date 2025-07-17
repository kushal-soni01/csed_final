import React from "react";
import {
	useLocation,
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import GlassNav from "./components/GlassNav";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Team from "./pages/Teams";
import JoinUs from "./pages/JoinUs";
import Footer from "./components/Footer";
import "./App.css";

// const ScrollToTop = () => {
// 	const { pathname } = useLocation();

// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	}, [pathname]);

// 	return null;
// };

function App() {
	return (
		<>
			<Router>
				{/* <ScrollToTop /> */}
				<GlassNav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/team" element={<Team />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/events" element={<Events />} />
					<Route path="/join" element={<JoinUs />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
