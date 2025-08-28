import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { BleeprContext } from "../../contexts/BleeprContext";
import styles from "./AboutMeCard.module.css"


const AboutMeCard = (props) => {
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
			setProfile(currentProfile)
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

	return (
		<div className={styles.myProfileContainer}>
      <div className={styles.profilePageTopHalf}>
        <div className={styles.profileBox}>
          <img
            width={150}
            src={profile?.profilePicture || `https://i.pravatar.cc/300?u=${profile?._id}`}
            alt="profile picture"
          />
          <h2>{profile?.username || "User not found"}</h2>
          {showOnlineNow ? (
            <span className={styles.onlineNow}>Online Now</span>
          ) : (
            <span className={styles.offlineMsg}>{offlineMsg || "Offline"}</span>
          )}
          <p>Age: {profile?.age || "N/A"}</p>
          <p>Gender: {profile?.gender || "N/A"}</p>
          <p>Location: {profile?.location || "N/A"}</p>
          <p>Bio: {profile?.bio || "No bio"}</p>
          <p>Relationship Status: {profile?.relationshipStatus || "N/A"}</p>
        </div>

        <div className={styles.aboutMeBox}>
          <h3>About Me</h3>
          <p>{profile?.aboutMe || "No additional info"}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;