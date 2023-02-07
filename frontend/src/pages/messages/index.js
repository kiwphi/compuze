import Link from 'next/link';
import MessageList from '../../components/message/message-list';

const Messages = () => {
  return (
    <>
      <h2>Inbox</h2>
      <div className="compose-button-wrapper">
        <Link href={`/messages/send`}>
          <button className="big-btn green-btn">Compose</button>
        </Link>
      </div>
      <MessageList />
    </>
  );
};

export default Messages;
