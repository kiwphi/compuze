import { useEffect, useState } from 'react';
import { deleteRequest, getRequest, postRequest } from '../../util/api-requests';

const FavoriteButton = ({ itemId }) => {
  // state
  const [isFavorite, setIsFavorite] = useState(false);

  // api call - toggle favorite
  const toggleFavorite = async () => {
    const json = isFavorite
      ? await deleteRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/favorites`)
      : await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/favorites`);
    if (json.success) {
      setIsFavorite(!isFavorite);
    }
  };

  // api call - check if item is in favorites
  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/favorites`);
      setIsFavorite(json.success);
    })();
  }, [itemId]);

  // render
  return (
    <button className={`big-btn ${isFavorite ? 'pink-btn' : 'blue-btn'}`} onClick={toggleFavorite}>
      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  );
};

export default FavoriteButton;
