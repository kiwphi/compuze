import Link from 'next/link';
import { useContext } from 'react';
import FavoriteButton from './favorite-button';
import DeleteItemButton from './delete-item-button';
import CommentSection from '../comment/comment-section';
import { AuthContext } from '../../util/auth-context';
import ItemRow from './item-row';

const ItemDetails = ({ json_item, json_comments }) => {
  // data
  const data = json_item.data;

  // auth
  const { authData } = useContext(AuthContext);

  // render
  return (
    <>
      {/* Item Title & Price */}
      <div className="no-margin-header">
        <h2>
          {data.item.brand} {data.item.model}
        </h2>
      </div>
      <p className="views">This item has been viewed {data.item.views} times.</p>
      <p>
        It is located in <strong>{data.item.location}</strong>.
      </p>

      {/* Item Details & Buttons */}
      <div className="item-details-content">
        <ItemRow item={data.item} />
      </div>

      <div className="item-description">
        <h3>Description:</h3>
        <p>{data.item.description}</p>
      </div>

      <div className="item-details-buttons">
        {authData.username !== data.item.username ? (
          <Link href={`/users/${data.item.user_id}`}>
            <button className="big-btn green-btn">Contact {data.item.username}</button>
          </Link>
        ) : (
          ''
        )}

        {/* Favorite Button */}
        {authData.isLoggedIn ? <FavoriteButton itemId={data.item.id} /> : ''}

        {/* Edit Button */}
        {authData.username === data.item.username ? (
          <Link href={`/items/edit/${data.item.id}`}>
            <button className="big-btn green-btn">Edit</button>
          </Link>
        ) : (
          ''
        )}

        {/* Delete Button */}
        {authData.username === data.item.username ? <DeleteItemButton itemId={data.item.id} /> : ''}
      </div>

      <CommentSection json_comments={json_comments} />
    </>
  );
};

export default ItemDetails;
