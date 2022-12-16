import { useRouter } from 'next/router';
import { deleteRequest } from '../../util/api-requests';

const DeleteMessageButton = ({ messageId }) => {
  // router
  const router = useRouter();

  // api call
  const deleteMessage = async () => {
    await deleteRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}`);
    return router.replace('/messages');
  };

  // render
  return (
    <button className="small-btn pink-btn" onClick={deleteMessage}>
      Delete
    </button>
  );
};

export default DeleteMessageButton;
