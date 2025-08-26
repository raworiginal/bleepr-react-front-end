import { Link } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";



const BleepFeed = (props) => {
	const { bleepr } = useContext(BleeprContext);

	return (
		<main className="container">
			{props.bleeps.map((bleep) => (
				<Link key={bleep._id} to={`/bleeps/${bleep._id}`}>
					<BleepCard bleep={bleep} />
				</Link>
			))}
		</main>
	);
};

export default BleepFeed;
