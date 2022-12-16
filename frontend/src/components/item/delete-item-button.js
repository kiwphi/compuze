import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteRequest } from '../../util/api-requests';

const DeleteItemButton = ({ itemId }) => {
  // button state
  const [clicked, setClicked] = useState(false);

  // router
  const router = useRouter();

  // api call
  const deleteItem = async () => {
    await deleteRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`);
    return router.replace('/items');
  };

  // render
  if (clicked) {
    return (
      <>
        <button className="small-btn pink-btn" onClick={deleteItem}>
          Confirm Delete
        </button>
        <button className="small-btn blue-btn" onClick={() => setClicked(false)}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <button className="big-btn pink-btn" onClick={() => setClicked(true)}>
      Delete Item
    </button>
  );
};

export default DeleteItemButton;
