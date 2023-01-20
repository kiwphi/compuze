import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteRequest } from '../../util/api-requests';

const DeleteMessageButton = ({ messageId }) => {
  // router
  const router = useRouter();

  // feedback
  const [isLoading, setIsLoading] = useState(false);

  // api call
  const deleteMessage = async () => {
    setIsLoading(true);
    await deleteRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}`);
    return router.replace('/messages');
  };

  // render
  if (isLoading) {
    return <span>Deleting message...</span>;
  }

  return (
    <button className="small-btn pink-btn" onClick={deleteMessage}>
      Delete
    </button>
  );
};

export default DeleteMessageButton;
