import { useState } from "react";


const CommentForm = (props) => {
 

  


  return (
    <form id="comment-form" onSubmit={props.handleSubmit}>
      <label htmlFor="comment">Comment:</label>
      <input
        required
        type="text"
        name="text"
        id="comment"
        value={props.formData.text}
        onChange={props.handleChange}
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm