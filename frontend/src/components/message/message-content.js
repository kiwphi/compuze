import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRequest, patchRequest } from '../../util/api-requests';
import DeleteMessageButton from './delete-message-button';
import Loading from '../common/loading';

const MessageContent = () => {
  // state
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // router
  const router = useRouter();
  const { messageId } = router.query;

  // api call - mark as read
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    (async () => {
      setIsLoading(true);
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}`);
      setMessage(json.data.message);
      await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}/read`);
      setIsLoading(false);
    })();
  }, [messageId, router.isReady]);

  // render
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>{message && message.subject}</h2>
      <div>{message && message.content}</div>
      <div className="message-buttons">
        <Link href={`/messages/send/?recipient=${message && message.sender}&reply=Re: ${message && message.subject}`}>
          <button className="small-btn blue-btn">Reply</button>
        </Link>
        <DeleteMessageButton messageId={router.isReady && messageId} />
        <Link href={`/users/${message && message.sender_id}`}>
          <button className="small-btn green-btn">View {message && message.sender}&apos;s profile</button>
        </Link>
      </div>
    </div>
  );
};

export default MessageContent;
