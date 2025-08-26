import { createContext, useState } from "react";

const BleeprContext = createContext();

const getBleeprFromToken = () => {
	const token = localStorage.getItem("token");

	if (!token) return null;

	return JSON.parse(atob(token.split(".")[1])).payload;
};

function BleeprProvider({ children }) {
	// call getBleeprFromToken() to get our initial user state
	const [bleepr, setBleepr] = useState(getBleeprFromToken());
	const value = { bleepr, setBleepr };

	return (
		<BleeprContext.Provider value={value}>{children}</BleeprContext.Provider>
	);
}

export { BleeprProvider, BleeprContext };
