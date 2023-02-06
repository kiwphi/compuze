import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../util/auth-context';
import PostCommentForm from './post-comment-form';
import DeleteCommentButton from './delete-comment-button';
import CommentRow from './comment-row';
import { getRequest } from '../../util/api-requests';

const CommentSection = ({ json_comments }) => {
  // data
  const [comments, setComments] = useState(json_comments.data.comments);
  const itemId = json_comments.data.itemId;

  // auth
  const { authData } = useContext(AuthContext);

  // api call
  const updateComments = async () => {
    const comments = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/comments`);
    setComments(comments.data.comments);
  };

  // render
  return (
    <>
      <h2>Comments</h2>

      <div className="comment-section">
        {/* comments list */}
        {comments.length
          ? comments.map((comment) => (
              <CommentRow key={comment.id} comment={comment}>
                <DeleteCommentButton updateComments={updateComments} commentId={comment.id} />
              </CommentRow>
            ))
          : 'No comments posted yet... '}

        {/* form */}
        {authData.isLoggedIn ? (
          <PostCommentForm updateComments={updateComments} />
        ) : (
          <Link href={`/auth/login?redirect=items/${itemId}`}>Login to post a comment</Link>
        )}
      </div>
    </>
  );
};

export default CommentSection;
