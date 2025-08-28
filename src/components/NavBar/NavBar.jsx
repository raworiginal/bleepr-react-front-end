import { Link } from "react-router";
import { useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";
import ColorSchemeSwitcher from "../ColorSchemeSwitcher/ColorSchemeSwitcher"

import styles from "./NavBar.module.css";



const NavBar = () => {
	const { bleepr, setBleepr } = useContext(BleeprContext);

	const handleSignOut = () => {
		localStorage.removeItem("token");
		setBleepr(null);
	};

	return (
    <nav className="container">
      <ul>
        <li>
          <img
            src="https://images.pexels.com/photos/33642104/pexels-photo-33642104.png"
            alt="bleepo-nav"
            className="bleepo-nav"
            width="60px"
          />
        </li>
      </ul>
      <ColorSchemeSwitcher className="contrast" />
      {bleepr ? (
        <ProtectedRoutes bleepr={bleepr} handleSignOut={handleSignOut} />
      ) : (
        <UnprotectedRoutes />
      )}
    </nav>
  );
};

export default NavBar;
