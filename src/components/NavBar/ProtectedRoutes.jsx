import { Link } from "react-router";

const ProtectedRoutes = (props) => {
	return (
		<>
			<ul>
				<li>
					<Link to="/bleeps">Bleep Feed</Link>
				</li>
				<li>
					<Link to="/bleeps/new">New Bleep</Link>
				</li>
				<li>
					<Link to={`/${props.bleepr._id}/aboutMe`}>My Profile</Link>
				</li>
				<li>
					<Link to={`/${props.bleepr._id}/aboutMe/edit`}>edit profile</Link>
				</li>
				<li>
					<Link to={"/"} onClick={props.handleSignOut}>
						Sign Out
					</Link>
				</li>
			</ul>
		</>
	);
};

export default ProtectedRoutes;
