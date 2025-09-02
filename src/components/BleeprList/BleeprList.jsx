import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import styles from "./BleeprList.module.css";

const BleeprList = (props) => {
	const { bleepr } = useContext(BleeprContext);
	return (
		<div className={styles.bleeprListContainer}>
			<h1 className={styles.title}>★ find cool bleeprs ★</h1>{" "}
			{/* moved outside */}
			<div className={styles.bleeprContainer}>
				{props.bleeprs.length ? (
					props.bleeprs.map((b) => (
						<div key={b._id} className={styles.bleeprCard}>
							<img
								className={styles.bleeprPic}
								src={b.profilePicture || `https://i.pravatar.cc/300?u=${b._id}`}
								alt={b.username}
							/>
							<p className={styles.bleeprName}>{b.username}</p>

							{b.friends.includes(bleepr._id) ? (
								<button
									className={`${styles.bleeprBtn} ${styles.remove}`}
									onClick={() => props.handleUpdateFriends(b._id)}>
									remove
								</button>
							) : (
								<button
									className={`${styles.bleeprBtn} ${styles.add}`}
									onClick={() => props.handleUpdateFriends(b._id)}>
									add
								</button>
							)}
						</div>
					))
				) : (
					<p className={styles.noBleeprs}>no Bleeprs yet : </p>
				)}
			</div>
		</div>
	);
};

export default BleeprList;
