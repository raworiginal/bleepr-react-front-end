import { useState, useContext } from "react";
import { useParams } from "react-router";
import * as bleeprService from "../../services/bleeprService"
import { BleeprContext } from "../../contexts/BleeprContext";


const AboutMeCard = (props) => {
	const { bleepr } = useContext(BleeprContext);
	const [aboutMe, setAboutMe] = useState(null);
	const { bleeprId } = useParams();

let result 
props.bleeprs.map((bleepr) => {
	if (bleeprId === bleepr._id) {
		console.log(bleepr)
		result = bleepr;
	}
});



	return (
		<div>
			<article class="aboutMe">
			<h1>{props.bleeprs.username}</h1>
	
			<h1>{result ? result.username : "User not found"}</h1>
        <p>{result ? result.aboutMe : ""}</p>
					<img
					width={64}
					src={
						props.bleeprs.profilePicture ||
						`https://i.pravatar.cc/300?u=${props.bleeprs._id}`
					}
					alt="profile picture"
				/>
				</article>
		</div>
	);
}

export default AboutMeCard;