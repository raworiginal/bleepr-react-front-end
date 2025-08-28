import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
import styles from "./BleepCard.module.css";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState();

	return (
		<article className={styles.bleepCard}>
			<div className={styles.username}>
				<p>{`@${props.bleep.author.username}`}</p>
			</div>
			<img
				className={styles.avatar}
				src={
					props.bleep.author.profilePicture ||
					`https://i.pravatar.cc/300?u=${props.bleep.author._id}`
				}
				alt="profile picture"
			/>
			<div className={styles.bleepText}>
				<Link to={`/bleeps/${props.bleep._id}`}>
					<p className="{styles.bleepText}">{props.bleep.text}</p>
				</Link>
			</div>

			<div className={styles.metrics} aria-label="engagement">
				<p>❤️ 8</p>
				<p>🔁 100</p>
				<p>💬 4</p>
			</div>

			<div className={styles.post}>
				<p>{`posted on ${new Date(
					props.bleep.createdAt
				).toLocaleDateString()}`}</p>
			</div>

			<div className={styles.buttons}>
				<a onClick={() => props.handleUpdateLike(props.bleep._id)}>like</a>
				{props.bleep.author._id === bleepr._id && (
					<>
						<Link to={`/bleeps/${props.bleep._id}/edit`}>edit</Link>
						<a onClick={() => props.handleDeleteBleep(props.bleep._id)}>
							delete
						</a>
					</>
				)}
			</div>
		</article>
	);
};

export default BleepCard;
