import { useState } from "react";
import { useParams, Link } from "react-router";
import * as bleeprService from "../../services/bleeprService";
import styles from "./AboutMeForm.module.css";

const AboutMeForm = (props) => {
	const { bleeprId } = useParams();
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		gender: "",
		location: "",
		bio: "",
		relationshipStatus: "single",
		aboutMe: ""
	});

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleUpdateAboutMe(bleeprId, formData)
	}


	return (
		<form className={styles.editForm} onSubmit={handleSubmit}>
			<label>
				Name:
				<input type="text" name="name" value={formData.name} onChange={handleChange} />
			</label>

			<label>
				Age:
				<input type="number" name="age" value={formData.age} onChange={handleChange} />
			</label>

			<label>
				Gender:
				<input type="text" name="gender" value={formData.gender} onChange={handleChange} />
			</label>

			<label>
				Location:
				<input type="text" name="location" value={formData.location} onChange={handleChange} />
			</label>

			<label>
				Bio:
				<textarea name="bio" value={formData.bio} onChange={handleChange} />
			</label>

			<label>
				Relationship Status:
				<select name="relationshipStatus" value={formData.relationshipStatus} onChange={handleChange}>
					<option value="">Select...</option>
					<option value="single">Single</option>
					<option value="in a relationship">In a relationship</option>
					<option value="married">Married</option>
					<option value="it's complicated">It's complicated</option>
					<option value="open">Open</option>
				</select>
			</label>

			<label>
				About Me:
				<textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} />
			</label>

			<button type="submit">Save</button>
		</form>
	);
}


export default AboutMeForm;