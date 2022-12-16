import { epochToElapsed } from '../../util/helpers';

const MessageTitleBar = ({ message }) => {
  return (
    <div className={message.is_read ? 'message-read-row' : 'message-unread-row'}>
      {message.subject}
      <span className="sender">
        {message.sender} | {epochToElapsed(message.created_at)}
      </span>
    </div>
  );
};

export default MessageTitleBar;
