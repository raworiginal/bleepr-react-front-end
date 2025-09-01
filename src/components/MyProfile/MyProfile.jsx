import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { BleeprContext } from "../../contexts/BleeprContext";
import styles from "./MyProfile.module.css";

const MyProfile = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [aboutMe, setAboutMe] = useState(null);
	const { bleeprId } = useParams();
	const [profile, setProfile] = useState(null);
	const [offlineMsg, setOfflineMsg] = useState("");

	useEffect(() => {
		let currentProfile;
		props.bleeprs.map((bleepr) => {
			if (bleeprId === bleepr._id) {
				currentProfile = bleepr;
			}
		});

		if (currentProfile) {
			setProfile(currentProfile);
			setOfflineMsg(currentProfile.offlineMsg || "");
		} else {
			setProfile(null);
			setOfflineMsg("");
		}
	}, [props.bleeprs, bleeprId]);

	let showOnlineNow = false;
	if (profile && bleepr) {
		const isSignedIn = bleepr._id === profile._id;
		showOnlineNow = isSignedIn;
	}
	console.log(profile.friends);
	return (
		<div className={styles.myProfileContainer}>
			<div className={styles.profilePageTopHalf}>
				<img
					className={styles.profileImage}
					src={
						profile?.profilePicture ||
						`https://i.pravatar.cc/300?u=${profile?._id}`
					}
					alt="profile picture"
				/>

				<div className={styles.infoColumn}>
					<h2>{profile?.username || "User not found"}</h2>
					{showOnlineNow ? (
						<span className={styles.onlineNow}>Online Now</span>
					) : (
						<span className={styles.offlineMsg}>{offlineMsg || "Offline"}</span>
					)}
					<p>Age: {profile?.aboutMe?.age || "N/A"}</p>
					<p>{profile?.aboutMe?.gender || "N/A"}</p>
					<p>{profile?.aboutMe?.location || "N/A"}</p>
					<p>
						Relationship Status: {profile?.aboutMe?.relationshipStatus || "N/A"}
					</p>
				</div>

				<div className={styles.rightColumn}>
					<div className={styles.aboutMeBox}>
						<h3>About Me</h3>
						<p>{profile?.aboutMe?.bio || "No additional info"}</p>
					</div>

					<div className={styles.friendsSection}>
						<h2>{profile?.username}'s friends</h2>
						{profile?.friends?.length > 0 ? (
							<div className={styles.friendsBox}>
								{profile.friends.map((friend) => (
									<div key={friend._id}>
										<img
											src={
												friend.profilePicture ||
												`https://i.pravatar.cc/300?u=${friend._id}`
											}
											alt={friend.username}
										/>
										<p>{friend.username}</p>
									</div>
								))}
							</div>
						) : (
							<p>No friends yet</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
