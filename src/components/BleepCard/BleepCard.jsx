import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState();
	return (
		<article>
			<header>
				<p>{`@${props.bleep.author.username}`}</p>
			</header>
			<main>
				<p>{props.bleep.text}</p>
			</main>
			<footer>
				<p>{`posted on ${new Date(
					props.bleep.createdAt
				).toLocaleDateString()}`}</p>
				<div role="group">
					<button>Like</button>
					{props.bleep.author._id === bleepr._id && (
						<>
							<button onClick={() => props.handleUpdatedBleep(bleepId)}>edit</button>
							<button onClick={() => props.handleDeleteBleep(bleepId)}>delete</button>
						</>
					)}
			</div>
		</footer>
		</article >
	);
};

export default BleepCard;
