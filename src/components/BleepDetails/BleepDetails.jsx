import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import BleepCard from "../BleepCard/BleepCard";
import * as BleepsService from "../../services/bleepsService";
import CommentForm from "../CommentForm/CommentForm";
import { BleeprContext } from "../../contexts/BleeprContext";


const BleepDetails = (props) => {
	const { bleepId } = useParams();
	const [bleep, setBleep] = useState(null);
	const { bleepr } = useContext(BleeprContext)
	const [toggle, setToggle] = useState(true)

	useEffect(() => {
		const fetchBleep = async () => {
			const bleepData = await BleepsService.show(bleepId);
			setBleep(bleepData);
		};
		fetchBleep();
	}, [bleepId, toggle]);


	const handleAddComment = async (commentFormData) => {
		const newComment = await BleepsService.createComment(bleepId, commentFormData);
		setBleep({ ...bleep, comments: [...bleep.comments, newComment] });
	};

	const handleDeleteComment = async (commentId) => {
		console.log("commentId:", commentId);
		  await BleepsService.deleteComment(bleepId, commentId)
		setBleep({ ...bleep, commments: bleep.comments.filter((comment) => comment._id !== commentId) })
		setToggle(!toggle)
	};
	
	
	if (!bleep) {
		return <article aria-busy="true"></article>;
	}

	return (
    <main className="container">
      <BleepCard bleep={bleep} />

      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!bleep.comments?.length && <p>There are no comments.</p>}

        {bleep.comments?.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on ${new Date(
                  comment.createdAt
                ).toLocaleDateString()}`}
              </p>
            </header>
						<p>{comment.text}</p>
						{comment.author._id === bleepr._id && (
							<>
							<button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
							<button onClick={() => props.handleUpdateComment}>Edit</button>
							
							</>
						)}
          </article>
        ))}
      </section>
    </main>
  );
};

export default BleepDetails;
