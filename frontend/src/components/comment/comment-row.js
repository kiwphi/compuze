import { useContext } from 'react';
import { AuthContext } from '../../util/auth-context';
import { epochToElapsed } from '../../util/helpers';

const CommentRow = (props) => {
  // props
  const { comment } = props;

  // auth
  const { authData } = useContext(AuthContext);

  // render
  return (
    <div className="comment-row">
      <span className="comment-row-left">
        <span className="comment-author">{comment.username}</span>
        <span className="comment-content">{comment.content}</span>
      </span>

      <span className="comment-row-right">
        {authData.username === comment.username ? props.children : ''}
        <span>{epochToElapsed(comment.created_at)}</span>
      </span>
    </div>
  );
};

export default CommentRow;
