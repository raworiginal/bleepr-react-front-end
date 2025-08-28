import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
import styles from "./BleepCard.module.css";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState();

	return (
		<article className={styles.bleepCard}>
			<div className={styles.leftColumn}>
				<div className={styles.username}>
					<span>{`@${props.bleep.author.username}`}</span>
				</div>
				<div className={styles.avatarFrame}>
					<img
						className={styles.avatar}
						src={
							props.bleep.author.profilePicture ||
							`https://i.pravatar.cc/300?u=${props.bleep.author._id}`
						}
						alt="profile picture"
					/>
				</div>

				<div className={styles.metrics} aria-label="engagement">
					<span>❤️ 8</span>
					<span>🔁 100</span>
					<span>💬 4</span>
				</div>
			</div>

			<div className={styles.rightColumn}>
				<div className={styles.post}>
					<small>{`posted on ${new Date(
						props.bleep.createdAt
					).toLocaleDateString()}`}</small>
				</div>

				<article className={styles.bleepText}>
					<Link to={`/bleeps/${props.bleep._id}`}>
						<p className="{styles.bleepText}">{props.bleep.text}</p>
					</Link>
				</article>

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
			</div>
		</article>
	);
};

export default BleepCard;
