import Link from 'next/link';
import MessageContent from '../../components/message/message-content';

const Message = () => {
  return (
    <>
      <Link href="/messages">Back to inbox</Link>
      <MessageContent />
    </>
  );
};

export default Message;
