import { useParams } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import { useContext, useState, useEffect } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleepFeed = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const { tag } = useParams();
	const [displayedBleeps, setDisplayedBleeps] = useState(props.bleeps);

	useEffect(() => {
		if (tag) {
			const filteredBleeps = props.bleeps.filter((bleep) => {
				return bleep.text.includes(`#${tag}`);
			});
			setDisplayedBleeps(filteredBleeps);
		} else {
			setDisplayedBleeps(props.bleeps);
		}
	}, [props.bleeps, tag]);

	if (!props.bleeps.length)
		return <span aria-busy="true">bleepin' around...</span>;
	return (
		<main className="container feed">
			{displayedBleeps.map((bleep) => (
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
