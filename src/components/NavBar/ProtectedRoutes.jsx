import { Link } from "react-router";

const ProtectedRoutes = (props) => {
	return (
		<ul>
			<li>Welcome, {props.bleepr.username} </li>
			<li>
				<Link to="/bleeps">Bleep Feed</Link>
			</li>
			<li>
				<Link to={"/"} onClick={props.handleSignOut}>
					Sign Out
				</Link>
			</li>
		</ul>
	);
};

export default ProtectedRoutes;
