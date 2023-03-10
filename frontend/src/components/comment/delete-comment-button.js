import { useState } from 'react';
import { deleteRequest } from '../../util/api-requests';

const DeleteCommentButton = ({ commentId, updateComments }) => {
  // button state
  const [clicked, setClicked] = useState(false);

  // feedback
  const [isLoading, setIsLoading] = useState(false);

  // api call
  const deleteComment = async () => {
    setIsLoading(true);
    await deleteRequest(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`);
    setIsLoading(false);
    updateComments();
  };

  // render
  if (isLoading) {
    return <span>Deleting...</span>;
  }

  if (clicked) {
    return (
      <>
        <button className="small-btn pink-btn" onClick={deleteComment}>
          Confirm Delete
        </button>
        <button className="small-btn blue-btn" onClick={() => setClicked(false)}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <button className="small-btn pink-btn" onClick={() => setClicked(true)}>
      Delete Comment
    </button>
  );
};

export default DeleteCommentButton;
