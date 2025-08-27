import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as BleepsService from "../../services/bleepsService";

const BleepForm = (props) => {
	const { bleepId } = useParams();
	const [formData, setFormData] = useState({
		text: "",
		hashtags: [],
	});

	useEffect(() => {
		const fetchBleep = async () => {
			const bleepData = await BleepsService.show(bleepId);
			setFormData(bleepData);
		};
		if (bleepId) fetchBleep();
		return () => setFormData({ text: "", hashtags: [] });
	}, [bleepId]);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (bleepId) {
			props.handleUpdateBleep(bleepId, formData);
		} else {
			props.handleAddBleep(formData);
		}
	};

	return (
		<main className="container">
			<h2>{bleepId ? "Edit Bleep" : "New Bleep"}</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="text">bleep:</label>
				<textarea
					required
					rows={3}
					type="text"
					name="text"
					id="bleep"
					maxLength={128}
					value={formData.text}
					onChange={handleChange}
				/>

				{/* <label htmlFor="hashtags">hastags#</label>
				<input
					type="text"
					name="hashtags"
					id="hashtags"
					maxLength={128}
					value={formData.hastags}
					onChange={handleChange}
				/> */}
				<button type="submit">Submit Bleep</button>
			</form>
		</main>
	);
};

export default BleepForm;
