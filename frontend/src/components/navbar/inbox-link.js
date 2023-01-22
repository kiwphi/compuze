import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/api-requests';

const InboxLink = () => {
  // data
  const [unreadCount, setUnreadCount] = useState(0);

  // router
  const router = useRouter();

  // api call - update unreadCount on each path change
  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
      setUnreadCount(json.data.unreadCount);
    })();
  }, [router.pathname]);

  // render
  return <Link href="/messages">Inbox {unreadCount > 0 && unreadCount ? `(${unreadCount})` : ''}</Link>;
};

export default InboxLink;
