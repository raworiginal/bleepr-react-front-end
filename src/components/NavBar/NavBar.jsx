import { Link } from "react-router";
import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";

const NavBar = () => {
	const { bleepr, setBleepr } = useContext(BleeprContext);

	const handleSignOut = () => {
		localStorage.removeItem("token");
		setBleepr(null);
	};

	return (
		<nav className="container">
			{bleepr ? (
				<ProtectedRoutes bleepr={bleepr} handleSignOut={handleSignOut} />
			) : (
				<UnprotectedRoutes />
			)}
		</nav>
	);
};

export default NavBar;
