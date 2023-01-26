import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/api-requests';
import MessageTitleBar from './message-title-bar';

const MessageList = () => {
  // data
  const [messages, setMessages] = useState(null);

  // feedback
  const [isLoading, setIsLoading] = useState(true);

  // api call - fetch messages
  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
      setMessages(json.data.messages);
      setIsLoading(false);
    })();
  }, []);

  // render
  if (messages && !messages.length) {
    return 'No messages';
  }

  return (
    <>
      <div className="messages-section">
        {isLoading
          ? Array(5).fill(<div className="skeleton message-row-skeleton" />)
          : messages &&
            messages.map((message) => (
              <Link key={message.id} href={`/messages/${message.id}`}>
                <MessageTitleBar message={message} />
              </Link>
            ))}
      </div>
    </>
  );
};

export default MessageList;
