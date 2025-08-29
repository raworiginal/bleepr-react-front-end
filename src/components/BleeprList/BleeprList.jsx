import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleeprList = (props) => {
	const { bleepr } = useContext(BleeprContext);
	console.log(bleepr);
	return (
		<>
			<h1>this is where the bleepr list will go</h1>

			{
				props.bleeprs.length ? (
					props.bleeprs.map((b) => (
						<div key={b._id}>
							<img src={b.profilePicture || `https://i.pravatar.cc/300?u=${b._id}`}
								alt={b.username}
							/>
							<p>{b.username}</p>
							<p>{b.friends.join("")}</p>
						{
							b.friends.includes(bleepr._id) ? (
								<button>remove</button>
							) : (
								<button>add</button>
							)
						}

						</div>
					))
				) : (
					<p>no Bleeprs yet</p>
				)
			}
		</>
	)
}

export default BleeprList