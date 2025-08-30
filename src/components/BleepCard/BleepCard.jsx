import { useState, useContext, useEffect } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link, useNavigate } from "react-router";
import styles from "./BleepCard.module.css";
import * as bleepsService from "../../services/bleepsService";
import { Filter } from "bad-words";
const profanityFilter = new Filter({ placeHolder: "🤬" });
import {
	HiOutlineHeart,
	HiOutlineChat,
	HiOutlineTrash,
	HiOutlinePencil,
	HiHeart,
} from "react-icons/hi";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const navigate = useNavigate();

	const [bleep, setBleep] = useState(props.bleep);
	const [bleepText, setBleepText] = useState(() =>
		profanityFilter.clean(props.bleep.text)
	);

	const handleCardClick = (event) => {
		if (event.target.closest("a")) return;
		navigate(`/bleeps/${bleep._id}`);
	};
	const handleFavoriteBleep = async (bleepId) => {
		await bleepsService.favorite(bleepId);
		const favoritedBleep = await bleepsService.show(bleepId);
		setBleep(favoritedBleep);
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
			<main onClick={handleCardClick} className={styles.bleepText}>
				<p className={styles.bleepText}>
					{bleepText.split(" ").map((word, index) => {
						if (word[0] === "#")
							return (
								<Link key={index} to={`/bleeps/t/${word.slice(1)}`}>
									{`${word}`}{" "}
								</Link>
							);
						else return <span key={index}>{word} </span>;
					})}
				</p>
			</main>
			<div className={styles.bottomRow}>
				<div className={styles.buttons}>
					<div
						onClick={() => handleFavoriteBleep(bleep._id)}
						className={styles.metic}>
						<a>
							{bleep.favoritedBy.includes(bleepr._id) ? (
								<HiHeart />
							) : (
								<HiOutlineHeart />
							)}
						</a>
						{bleep.favoritedBy.length}
					</div>
					<Link to={`/bleeps/${bleep._id}`}>
						<div className={styles.metric}>
							<HiOutlineChat />
							{bleep.comments.length}
						</div>
					</Link>
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
