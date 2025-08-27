import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as bleeprService from "../../services/bleeprService"


const AboutMeCard = (props) => {
	const [aboutMe, setAboutMe] = useState(null);
	const { bleeprId } = useParams();

const result = props.bleeprs.find(( bleepr ) => bleepr._id === bleeprId);

console.log(result);
console.log(props);
	return (
		<div>
			<article class="aboutMe">
			<h1>{props.bleeprs.username}</h1>
		<img
					width={200
					}
					src={
						props.bleeprs.profilePicture ||
						`https://i.pravatar.cc/300?u=${props.bleeprs._id}`
					}
					alt="profile picture"
				/>
				<p>{props.bleepr.isOnline}</p>
				</article>
		</div>
	);
}

export default AboutMeCard;