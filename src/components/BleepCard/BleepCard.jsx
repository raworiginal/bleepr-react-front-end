import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
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
					{bleepr && (
						<>
							<button>Edit</button>
							<button>Delete</button>
						</>
					)}
				</div>
			</footer>
		</article>
	);
};

export default BleepCard;
