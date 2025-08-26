// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signIn } from "../../services/authService";

import { BleeprContext } from "../../contexts/BleeprContext";

const SignInForm = () => {
	const navigate = useNavigate();
	const { setBleepr } = useContext(BleeprContext);
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (evt) => {
		setMessage("");
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			// This function doesn't exist yet, but we'll create it soon.
			// It will cause an error right now
			const signedInBleepr = await signIn(formData);

			setBleepr(signedInBleepr);
			navigate("/");
		} catch (err) {
			setMessage(err.message);
		}
	};

	return (
		<main className="container">
			<h1>Sign In</h1>
			<p>{message}</p>
			<form autoComplete="off" onSubmit={handleSubmit}>
				<label htmlFor="username">username:</label>
				<input
					type="text"
					autoComplete="off"
					id="username"
					value={formData.username}
					name="username"
					onChange={handleChange}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					autoComplete="off"
					id="password"
					value={formData.password}
					name="password"
					onChange={handleChange}
					required
				/>
				<button>Sign In</button>
				<button onClick={() => navigate("/")}>Cancel</button>
			</form>
		</main>
	);
};

export default SignInForm;
