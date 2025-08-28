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
		openTo: [],
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

	// const handleCheckboxChange = () => {
	// 	const updatedCheckedBoxes = 
	// }

	return (
		<form className={styles.editForm} onSubmit={handleSubmit}>
			<label>
				Name:
				<input type="text" value={formData.name} onChange={handleChange} />
			</label>

			<label>
				Age:
				<input type="number" value={formData.age} onChange={handleChange} />
			</label>

			<label>
				Gender:
				<input type="text" value={formData.gender} onChange={handleChange} />
			</label>

			<label>
				Location:
				<input type="text" value={formData.location} onChange={handleChange} />
			</label>

			<label>
				Bio:
				<textarea value={formData.bio} onChange={handleChange} />
			</label>

			<label>
				Relationship Status:
				<select value={formData.relationshipStatus} onChange={handleChange}>
					<option value="">Select...</option>
					<option value="single">Single</option>
					<option value="in a relationship">In a relationship</option>
					<option value="married">Married</option>
					<option value="it's complicated">It's complicated</option>
					<option value="open">Open</option>
				</select>
			</label>
			{/* <fieldset>
				<legend>Open To:</legend>
				{["networking", "dating", "making-friends", "mentoring"].map(option, index => (
					<label key={option}>
						<input type="checkbox"

</label>
				))}
				<label>
					<input type="checkbox" name="networking" value="networking" checked={formData.openTo} />
					networking
				</label>
				<label>
					<input type="checkbox" name="dating" value="dating" checked={formData.openTo} />
					dating
				</label>
				<label>
					<input type="checkbox" name="making-friends" value="making-friends" checked={formData.openTo} />
					making friends
				</label>
				<label>
					<input type="checkbox" name="mentoring" value="mentoring" checked={formData.openTo} />
					mentoring
				</label>
			</fieldset> */}
			<label>
				About Me:
				<textarea value={formData.aboutMe} onChange={handleChange} />
			</label>

			<button type="submit">Save</button>
		</form>
	);
}


export default AboutMeForm;