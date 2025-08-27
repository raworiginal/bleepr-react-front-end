import { Link } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleepFeed = (props) => {
	{
		console.log("Props:", props);
	}
	const { bleepr } = useContext(BleeprContext);
	if (!props.bleeps.length)
		return <span aria-busy="true">bleepin' around...</span>;
	return (
		<main className="container">
			{props.bleeps.map((bleep) => (
				// <Link
				// 	style={{ textDecoration: "none" }}
				// 	key={bleep._id}
				// 	to={`/bleeps/${bleep._id}`}>
				<BleepCard
					key={bleep._id}
					bleep={bleep}
					handleDeleteBleep={props.handleDeleteBleep}
					handleUpdateBleep={props.handleUpdateBleep}
				/>
				// </Link>
			))}
		</main>
	);
};

export default BleepFeed;
