import { useContext } from "react";
import { useEffect, useState } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import * as bleeprService from "../../services/bleeprService";
import BleepFeed from "../BleepFeed/BleepFeed";
const Dashboard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleeprs, setBleeprs] = useState([]);
	useEffect(() => {
		const fetchBleeprs = async () => {
			try {
				const fetchedBleeprs = await bleeprService.index();
				setBleeprs(fetchedBleeprs);
			} catch (err) {
				console.log(err);
			}
		};
		if (bleepr) fetchBleeprs();
	}, [bleepr]);

	return (
		<main className="container">
			<h1>Welcome, {bleepr.username}</h1>
			<Route Path="/bleeps" element={<BleepFeed bleep={bleep} />} />
			<ul>
				{bleeprs.map((bleepr) => {
					return <li key={bleepr._id}>{bleepr.username}</li>;
				})}
			</ul>
		</main>
	);
};

export default Dashboard;
