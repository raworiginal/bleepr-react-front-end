import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";

const BleeprList = (props) => {
	const { bleepr } = useContext(BleeprContext);
	return (
		<>
			<h1>find cool bleeprs</h1>

			{props.bleeprs.length ? (
				props.bleeprs.map((b) => (
					<div key={b._id}>
						<img
							src={b.profilePicture || `https://i.pravatar.cc/300?u=${b._id}`}
							alt={b.username}
						/>
						<p>{b.username}</p>
						{console.log(b.friends)}
						{b.friends.includes(bleepr._id) ? (
							<button onClick={() => props.handleUpdateFriends(b._id)}>
								remove
							</button>
						) : (
							<button onClick={() => props.handleUpdateFriends(b._id)}>
								add
							</button>
						)}
					</div>
				))
			) : (
				<p>no Bleeprs yet</p>
			)}
		</>
	);
};

export default BleeprList;
