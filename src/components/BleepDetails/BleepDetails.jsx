import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import * as BleepsService from "../../services/bleepsService";
import CommentForm from "../CommentForm/CommentForm";
import { BleeprContext } from "../../contexts/BleeprContext";
import CommentCard from "../CommentCard/CommentCard";

const BleepDetails = (props) => {
	const navigate = useNavigate();
	const { bleepId } = useParams();
	const [bleep, setBleep] = useState(null);
	const { bleepr } = useContext(BleeprContext);
	const [toggle, setToggle] = useState(true);
	const [formData, setFormData] = useState({ text: "" });
	const [selected, setSelected] = useState(null);
	const [isBeingEdited, setIsBeingEdited] = useState(false);

	useEffect(() => {
		const fetchBleep = async () => {
			const bleepData = await BleepsService.show(bleepId);
			setBleep(bleepData);
		};
		fetchBleep();
	}, [bleepId, toggle]);

	const handleAddComment = async (commentFormData) => {
		const newComment = await BleepsService.createComment(
			bleepId,
			commentFormData
		);
		setBleep({ ...bleep, comments: [...bleep.comments, newComment] });
	};

	const handleChange = (event) => {
		setFormData({ ...props.formData, [event.target.name]: event.target.value });
	};

	const handleUpdateComment = async (bleepId, commentId, commentFormData) => {
		const updatedComment = await BleepsService.updateComment(
			bleepId,
			commentId,
			commentFormData
		);
		setBleep({ ...bleep, comments: [...bleep.comments, updatedComment] });
	};

	const handleSelect = (comment) => {
		setSelected(comment);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(selected);
		if (selected) {
			handleUpdateComment(bleepId, selected._id, formData);
			setIsBeingEdited(false);
		} else {
			handleAddComment(formData);
			setFormData({ text: "" });
		}
	};

	if (!bleep) {
		return <article aria-busy="true"></article>;
	}

	return (
		<main className="container">
			<BleepCard bleep={bleep} />

			<section>
				<h2>Comments</h2>
				<CommentForm
					handleAddComment={handleAddComment}
					formData={formData}
					setFormData={setFormData}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
				{!bleep.comments?.length && <p>There are no comments.</p>}

				{bleep.comments?.map((comment) => (
					<CommentCard
						key={comment._id}
						comment={comment}
						bleepId={bleepId}
						bleep={bleep}
						setBleep={setBleep}
						formData={formData}
						handleChange={handleChange}
						handleUpdateComment={handleUpdateComment}
						handleSubmit={handleSubmit}
						selected={selected}
						setSelected={setSelected}
						isBeingEdited={isBeingEdited}
						setIsBeingEdited={setIsBeingEdited}
					/>
				))}
			</section>
		</main>
	);
};

export default BleepDetails;
