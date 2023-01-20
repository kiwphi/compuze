import { useRouter } from 'next/router';
import { useState } from 'react';
import { postRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';

const PostCommentForm = ({ setComments }) => {
  // form data
  const [content, setContent] = useState('');

  // feedback
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();
  const { itemId } = router.query;

  // api call
  const postComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      content: content,
      itemId: itemId,
    });
    setIsLoading(false);

    if (!json.success) {
      return setErrors(json.errors);
    }
    setErrors(false); // done manually because below state changes don't trigger re-render

    setContent('');
    setComments((current) => [...current, json.data.comment]);
  };

  // render
  return (
    <form onSubmit={postComment}>
      <label>Post a comment</label>
      {errors ? <ErrorList errors={errors} /> : ''}
      <input
        type="text"
        id="title"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength="254"
        disabled={isLoading}
      />

      {/* button */}
      {isLoading ? (
        <span>Posting comment...</span>
      ) : (
        <button className="small-btn blue-btn" type="submit" onClick={postComment}>
          Post
        </button>
      )}
    </form>
  );
};

export default PostCommentForm;
