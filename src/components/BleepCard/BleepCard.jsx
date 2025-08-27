import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	console.log(props);
	const [bleep, setBleep] = useState();
	return (
		<article>
			<header>
				<img
					width={64}
					src={
						props.bleep.author.profilePicture ||
						`https://i.pravatar.cc/300?u=${props.bleep.author._id}`
					}
					alt=""
				/>
				<p>{`@${props.bleep.author.username}`}</p>
			</header>
			<main>
				<p>{props.bleep.text}</p>
			</main>
			<footer>
				<p>{`posted on ${new Date(
					props.bleep.createdAt
				).toLocaleDateString()}`}</p>
				<div>
					<button>Like</button>
					{props.bleep.author._id === bleepr._id && (
						<>
							<button
								className="outline"
								onClick={() => props.handleUpdatedBleep(bleepId)}>
								edit
							</button>
							<button onClick={() => props.handleDeleteBleep(bleepId)}>
								delete
							</button>
						</>
					)}
				</div>
			</footer>
		</article>
	);
};

export default BleepCard;
