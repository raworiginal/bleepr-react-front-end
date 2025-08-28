import { useState,useContext } from "react"
import { BleeprContext } from "../../contexts/BleeprContext";
import * as BleepsService from "../../services/bleepsService";


const CommentCard = (props) => {
  console.log("PROPS:", props)
  const { bleepr } = useContext(BleeprContext);
const [isBeingEdited, setIsBeingEdited] = useState(false);
  
  const handleDeleteComment = async (commentId) => {
    const deletedComment = await BleepsService.deleteComment(
      props.bleepId,
      props.commentId
    );
    props.setBleep({
      ...props.bleep,
      comments: props.bleep.comments.filter((comment) => comment._id !== commentId),
    });
  };


  const toggleEdit = () => {
    setIsBeingEdited(true);
  };

return (
  <article key={props.comment._id}>
    <header>
      <p>
        {`${props.comment.author.username} posted on ${new Date(
          props.comment.createdAt
        ).toLocaleDateString()}`}
      </p>
    </header>

    {props.comment.author._id === bleepr._id && (
      <>
        <button onClick={() => handleDeleteComment(props.comment._id)}>
          Delete
        </button>
        {isBeingEdited === true ? (
          <form onSubmit={props.handleSubmit}> 
          <input
          required
          type="text"
          form="comment-form"
          name="text"
          id="comment"
          value={props.formData.text}
          onChange={props.handleChange}
          />
          <button type="submit">Submit</button>
          </form>
        ) : (
          <p>{props.comment.text}</p>
        )}
        <button onClick={() => toggleEdit()}>Edit</button>
      </>
    )}
  </article>
);
};


export default CommentCard;
