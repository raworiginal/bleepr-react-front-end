import { useState, useContext } from "react";
import { BleeprContext } from "../../contexts/BleeprContext";
import * as BleepsService from "../../services/bleepsService";
import styles from "./CommentCard.module.css"
import {
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineTrash,
  HiOutlinePencil,
  HiHeart,
} from "react-icons/hi";
const CommentCard = (props) => {
  
  const { bleepr } = useContext(BleeprContext);
  

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await BleepsService.deleteComment(
      props.bleepId,
      commentId
    );
    props.setBleep({
      ...props.bleep,
      comments: props.bleep.comments.filter(
        (comment) => comment._id !== commentId
      ),
    });
  };

  const toggleEdit = (comment) => {
    props.setIsBeingEdited(true);
    props.setSelected(comment)
  };
console.log(props)
  return (
    <article key={props.comment._id}>
      <div className={styles.topRow}>
        <img
          className={styles.avatar}
          src={
            props.bleep.author.profilePicture ||
            `https://i.pravatar.cc/300?u=${props.bleep.author._id}`
          }
          alt="profile picture"
        />
        <div className={styles.username}>
          <p>{`@${props.comment.author.username}`}</p>
        </div>
      </div>

      {props.comment.author._id === bleepr._id && (
        <>
            {props.isBeingEdited === true ? (
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

          <div className={styles.bottomRow}>
            <button
              className="outline "
              onClick={() => toggleEdit(props.comment)}
            >
              <HiOutlinePencil />
            </button>

            <button
              className="outline "
              onClick={() => handleDeleteComment(props.comment._id)}
            >
              <HiOutlineTrash />
            </button>
              <div className={styles.date}>
              <>
                {`posted on ${new Date(
                props.bleep.createdAt
              ).toLocaleDateString()}`}
              </>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default CommentCard;
