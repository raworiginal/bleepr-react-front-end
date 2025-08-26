// SignUpForm.jsx

import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { BleeprContext } from "../../contexts/BleeprContext";

const SignUpForm = () => {
	const navigate = useNavigate();
	const { setBleepr } = useContext(BleeprContext);
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		passwordConf: "",
	});

	const { username, email, password, passwordConf } = formData;

	const handleChange = (evt) => {
		setMessage("");
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const newBleepr = await signUp(formData);
			setBleepr(newBleepr);
			navigate("/");
		} catch (err) {
			setMessage(err.message);
		}
	};

	const isFormInvalid = () => {
		return !(username && password && password === passwordConf);
	};

	return (
		<main className="container">
			<h1>Sign Up</h1>
			<p>{message}</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">username:</label>
				<input
					type="text"
					id="name"
					value={username}
					name="username"
					onChange={handleChange}
					required
				/>
				<label htmlFor="email">email:</label>
				<input
					type="email"
					id="email"
					value={email}
					name="email"
					onChange={handleChange}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					name="password"
					onChange={handleChange}
					required
				/>
				<label htmlFor="confirm">Confirm Password:</label>
				<input
					type="password"
					id="confirm"
					value={passwordConf}
					name="passwordConf"
					onChange={handleChange}
					required
				/>

				<button disabled={isFormInvalid()}>Sign Up</button>
				<button onClick={() => navigate("/")}>Cancel</button>
			</form>
		</main>
	);
};

export default SignUpForm;
