import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import { Link } from "react-router";
import styles from "./BleepCard.module.css";
import {
	HiOutlineHeart,
	HiOutlineChat,
	HiOutlineTrash,
	HiOutlinePencil,
	HiHeart,
} from "react-icons/hi";

const BleepCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [bleep, setBleep] = useState();

	return (
		<article className={styles.bleepCard}>
			<div className={styles.topRow}>
				<img
					className={styles.avatar}
					src={
						props.bleep.author.profilePicture ||
						`https://i.pravatar.cc/300?u=${props.bleep.author._id}`
					}
					alt="profile picture"
				/>

				<div className={styles.username}>
					<span>{`@${props.bleep.author.username}`}</span>
				</div>
			</div>
			<main className={styles.bleepText}>
				<Link to={`/bleeps/${props.bleep._id}`}>
					<p className="{styles.bleepText}">{props.bleep.text}</p>
				</Link>
			</main>
			<div className={styles.bottomRow}>
				<div className={styles.buttons}>
					<span>
						<HiOutlineHeart /> 0
					</span>
					<span>
						<HiOutlineChat /> 0
					</span>
					{props.bleep.author._id === bleepr._id && (
						<>
							<Link to={`/bleeps/${props.bleep._id}/edit`}>
								<HiOutlinePencil />
							</Link>
							<a onClick={() => props.handleDeleteBleep(props.bleep._id)}>
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
