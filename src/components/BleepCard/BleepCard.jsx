import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState();
	const [likeCount, setLikedCount] = useState(
		props.bleep.favoritedBy ? props.bleep.favoritedBy.length : 0
	);
	
	const handleUpdateLike = async () => {
		const likedBleep = await bleepsService.updateLike(props.bleep._id, bleepr._id);
		setLikedCount(likedBleep.count);
	}

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
					<button onClick={handleUpdateLike}>like</button>
					{props.bleep.author._id === bleepr._id && (
						<>
							<Link role="button" to={`/bleeps/${props.bleep._id}/edit`}>
								edit
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
