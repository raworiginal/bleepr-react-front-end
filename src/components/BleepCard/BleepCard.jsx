import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
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
					alt="profile picture"
				/>
				<p>{`@${props.bleep.author.username}`}</p>
			</header>
			<main>
				<Link to={`/bleeps/${props.bleep._id}`}>
					<p>{props.bleep.text}</p>
				</Link>
			</main>
			<footer>
				<p>{`posted on ${new Date(
					props.bleep.createdAt
				).toLocaleDateString()}`}</p>
				<div>
					<button>Like</button>
					{props.bleep.author._id === bleepr._id && (
						<>
							<Link role="button" to={`/bleeps/${props.bleep._id}/edit`}>
								Edit
							</Link>
							<button onClick={() => props.handleDeleteBleep(props.bleep._id)}>
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
