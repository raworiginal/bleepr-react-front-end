// src/App.jsx
import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router"; // Import React Router
import { BleeprContext } from "./contexts/BleeprContext";
import BleepFeed from "./components/BleepFeed/BleepFeed";
import * as bleepsService from "./services/bleepsService"

import NavBar from "./components/NavBar/NavBar";
// Import the SignUpForm component
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
	const { bleepr } = useContext(BleeprContext);
	const [bleeps, setBleeps] = useState([]);

	useEffect(() => {
		const fetchAllBleeps = async () => {
			const bleepData = await bleepsService.index();
			setBleeps(bleepData);
		};
		if (bleepr) fetchAllBleeps();
	}, [bleepr]);

	return (
		<>
			<NavBar />
			{/* Add the Routes component to wrap our individual routes*/}
			<Routes>
				<Route path="/" element={bleepr ? <BleepFeed /> : <Landing />} />
				{bleepr ? (
					<>
						<Route path="/bleeps" element={<BleepFeed bleeps={bleeps} />} />
					</>
				) : (
					<>
						<Route path="/sign-up" element={<SignUpForm />} />
						<Route path="/sign-in" element={<SignInForm />} />
					</>
				)}
			</Routes>
		</>
	);
};

export default App;
