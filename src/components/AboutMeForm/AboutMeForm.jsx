import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./AboutMeForm.module.css";

const AboutMeForm = (props) => {
	const { bleeprId } = useParams();
	const [formData, setFormData] = useState({
		aboutMe: {
			name: "",
			age: "",
			gender: "",
			location: "",
			bio: "",
			relationshipStatus: "single",
		}
	});


	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prevFormData => ({
			...prevFormData,
			aboutMe: {
				...prevFormData.aboutMe,
				[name]: value
			}
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleUpdateAboutMe(bleeprId, formData.aboutMe)
	}


	return (
		<form className={styles.editForm} onSubmit={handleSubmit}>
			<label>
				Name:
				<input
					type="text"
					name="name"
					value={formData.aboutMe.name}
					onChange={handleChange}
				/>
			</label>

			<label>
				Age:
				<input
					type="number"
					name="age"
					value={formData.aboutMe.age}
					onChange={handleChange}
				/>
			</label>

			<label>
				Gender:
				<input
					type="text"
					name="gender"
					value={formData.aboutMe.gender}
					onChange={handleChange}
				/>
			</label>

			<label>
				Location:
				<input
					type="text"
					name="location"
					value={formData.aboutMe.location}
					onChange={handleChange}
				/>
			</label>

			<label>
				Relationship Status:
				<select
					name="relationshipStatus"
					value={formData.aboutMe.relationshipStatus}
					onChange={handleChange}
				>
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
				<textarea
					name="bio"
					value={formData.aboutMe.bio}
					onChange={handleChange}
				/>
			</label>

			<button type="submit">Save</button>
		</form>
	);
};



export default AboutMeForm;