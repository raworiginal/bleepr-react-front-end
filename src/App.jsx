// src/App.jsx
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router"; // Import React Router
import { BleeprContext } from "./contexts/BleeprContext";
import BleepFeed from "./components/BleepFeed/BleepFeed";
import * as bleepsService from "./services/bleepsService";
import * as bleeprService from "./services/bleeprService";
import BleepForm from "./components/BleepForm/BleepForm";
import NavBar from "./components/NavBar/NavBar";
// Import the SignUpForm component
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import BleepDetails from "./components/BleepDetails/BleepDetails";
import AboutMeCard from "./components/AboutMeCard/AboutMeCard";
import AboutMeForm from "./components/AboutMeForm/AboutMeForm";

const App = () => {
	const { bleepr } = useContext(BleeprContext);
	const [bleeps, setBleeps] = useState([]);
	const [bleeprs, setBleeprs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAllBleeps = async () => {
			const bleepData = await bleepsService.index();
			setBleeps(bleepData);
		};
		if (bleepr) fetchAllBleeps();
	}, [bleepr]);

	useEffect(() => {
		const fetchAllBleeprs = async () => {
			const bleeprData = await bleeprService.index();
			setBleeprs(bleeprData);
		};
		if (bleepr) fetchAllBleeprs();
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

	const handleFavoriteBleep = async (bleepId) => {
		const favoritedBleep = await bleepsService.favorite(bleepId);
		console.log(bleepId);
		// setLikedCount(likedBleep.count);
	};

	const handleUpdateAboutMe = async (bleeprId, formData) => {
		const updateAboutMe = await bleeprService.editAboutMe(bleeprId, formData);

		setBleeprs(
			bleeprs.map((bleepr) =>
				bleeprId === bleepr._id ? updateAboutMe : bleepr
			)
		);

		navigate(`/${bleeprId}/aboutMe`);
	};

	return (
		<>
			<NavBar bleeprId={bleepr?._id} />
			<Routes>
				<Route
					path="/bleeps"
					element={
						bleepr ? (
							<BleepFeed
								bleeps={bleeps}
								handleDeleteBleep={handleDeleteBleep}
								handleUpdateBleep={handleUpdateBleep}
								handleFavoriteBleep={handleFavoriteBleep}
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
						<Route
							path="/:bleeprId/aboutMe"
							element={<AboutMeCard bleeprs={bleeprs} />}
						/>
						<Route
							path="/:bleeprId/aboutMe/edit"
							element={
								<AboutMeForm handleUpdateAboutMe={handleUpdateAboutMe} />
							}
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
