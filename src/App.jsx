// src/App.jsx
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router"; // Import React Router
import { BleeprContext } from "./contexts/BleeprContext";
import BleepFeed from "./components/BleepFeed/BleepFeed";
import * as bleepsService from "./services/bleepsService";
import BleepForm from "./components/BleepForm/BleepForm";
import NavBar from "./components/NavBar/NavBar";
// Import the SignUpForm component
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import { hydrateRoot } from "react-dom/client";
import BleepDetails from "./components/BleepDetails/BleepDetails";

const App = () => {
	const { bleepr } = useContext(BleeprContext);
	const [bleeps, setBleeps] = useState([]);
	const navigate = useNavigate();
	

	useEffect(() => {
		const fetchAllBleeps = async () => {
			const bleepData = await bleepsService.index();
			setBleeps(bleepData);
		};
		if (bleepr) fetchAllBleeps();
	}, [bleepr]);

	const handleAddBleep = async (bleepFormData) => {
		const newBleep = await bleepsService.create(bleepFormData);
		setBleeps([newBleep, ...bleeps]);
		navigate("/");
	};

	const handleUpdateBleep = async (bleepId, bleepFormData) => {
		const updatedBleep = await bleepsService.update(bleepId, bleepFormData);
		setBleeps(
			bleeps.map((bleep) => (bleepId === bleep._id ? updatedBleep : bleep))
		);
		navigate(`/bleeps/${bleepId}`);
	};

	const handleDeleteBleep = async (bleepId) => {
		const deletedBleep = await bleepsService.deleteBleep(bleepId);
		setBleeps(bleeps.filter((bleep) => bleep._id !== deletedBleep._id));
		navigate("/bleeps");
	};



	return (
		<>
			<NavBar />
			{/* Add the Routes component to wrap our individual routes*/}
			<Routes>
				<Route
					path="/"
					element={
						bleepr ? (
							<BleepFeed
								bleeps={bleeps}
								handleDeleteBleep={handleDeleteBleep}
								handleUpdateBleep={handleUpdateBleep}
							/>
						) : (
							<Landing />
						)
					}
				/>
				{bleepr ? (
					<>
						<Route
							path="/bleeps"
							element={
								<BleepFeed
									bleeps={bleeps}
									handleDeleteBleep={handleDeleteBleep}
									handleUpdateBleep={handleUpdateBleep}
								/>
							}
						/>
						<Route
							path="bleeps/new"
							element={<BleepForm handleAddBleep={handleAddBleep} />}
						/>
						<Route path="bleeps/:bleepId" element={<BleepDetails />} />
						<Route
							path="bleeps/:bleepId/edit"
							element={<BleepForm handleUpdateBleep={handleUpdateBleep} />}
						/>
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
