import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/api-requests';
import Pagination from '../common/pagination';
import MessageTitleBar from './message-title-bar';

const MessageList = () => {
  // data
  const [data, setData] = useState(null);

  // UI
  const [page, setPage] = useState(1);

  // feedback
  const [isLoading, setIsLoading] = useState(true);

  // api call - fetch messages
  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages?page=${page}`);
      setData(json.data);
      setIsLoading(false);
    })();
  }, [page]);

  // render
  if (data && !data.messages.length) {
    return 'No messages';
  }

  return (
    <>
      <div className="messages-section">
        {isLoading
          ? Array(5).fill(<div className="skeleton message-row-skeleton" />)
          : data &&
            data.messages.map((message) => (
              <Link key={message.id} href={`/messages/${message.id}`}>
                <MessageTitleBar message={message} />
              </Link>
            ))}
      </div>
      <Pagination count={data && data.count} perPage={data && data.perPage} page={page} setPage={setPage} />
    </>
  );
};

export default MessageList;
