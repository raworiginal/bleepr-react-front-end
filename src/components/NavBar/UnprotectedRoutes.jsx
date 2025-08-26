import { Link } from "react-router";

const UnprotectedRoutes = (props) => {
	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/sign-in">Sign In</Link>
			</li>
			<li>
				<Link to="/sign-up">Sign Up</Link>
			</li>
		</ul>
	);
};

export default UnprotectedRoutes;
