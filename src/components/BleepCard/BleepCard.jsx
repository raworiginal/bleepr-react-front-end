import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
import styles from "./BleepCard.module.css";
import * as bleepsService from "../../services/bleepsService";

import {
	HiOutlineHeart,
	HiOutlineChat,
	HiOutlineTrash,
	HiOutlinePencil,
	HiHeart,
} from "react-icons/hi";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState(props.bleep);

	const handleFavoriteBleep = async (bleepId) => {
		await bleepsService.favorite(bleepId);
		const favoritedBleep = await bleepsService.show(bleepId);
		setBleep(favoritedBleep);
		// setLikedCount(likedBleep.count);
	};

	return (
		<article className={styles.bleepCard}>
			<div className={styles.topRow}>
				<img
					className={styles.avatar}
					src={
						bleep.author.profilePicture ||
						`https://i.pravatar.cc/300?u=${bleep.author._id}`
					}
					alt="profile picture"
				/>

				<div className={styles.username}>
					<span>{`@${props.bleep.author.username}`}</span>
				</div>
			</div>
			<main className={styles.bleepText}>
				<Link to={`/bleeps/${bleep._id}`}>
					<p className="{styles.bleepText}">{bleep.text}</p>
				</Link>
			</main>
			<div className={styles.bottomRow}>
				<div className={styles.buttons}>
					<span className="styles.favorited">
						<a onClick={() => handleFavoriteBleep(bleep._id)}>
							{bleep.favoritedBy.includes(bleepr._id) ? (
								<HiHeart />
							) : (
								<HiOutlineHeart />
							)}
						</a>
						<span> {bleep.favoritedBy.length}</span>
					</span>
					<span>
						<Link to={`/bleeps/${bleep._id}`}>
							<HiOutlineChat />
						</Link>
						<span> {bleep.comments.length}</span>
					</span>
					{props.bleep.author._id === bleepr._id && (
						<>
							<Link to={`/bleeps/${bleep._id}/edit`}>
								<HiOutlinePencil />
							</Link>
							<a onClick={() => props.handleDeleteBleep(bleep._id)}>
								<HiOutlineTrash />
							</a>
						</>
					)}
				</div>
				<div className={styles.date}>
					<>{`posted on ${new Date(
						props.bleep.createdAt
					).toLocaleDateString()}`}</>
				</div>
			</div>
		</article>
	);
};

export default BleepCard;
