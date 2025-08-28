import { Link } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleepFeed = (props) => {
	// console.log(props.bleeps);
	const { bleepr } = useContext(BleeprContext);
	if (!props.bleeps.length)
		return <span aria-busy="true">bleepin' around...</span>;
	return (
		<main className="container feed">
			{props.bleeps.map((bleep) => (
				<BleepCard
					key={bleep._id}
					bleep={bleep}
					handleDeleteBleep={props.handleDeleteBleep}
					handleUpdateBleep={props.handleUpdateBleep}
					handleFavoriteBleep={props.handleFavoriteBleep}
				/>
			))}
		</main>
	);
};

export default BleepFeed;
