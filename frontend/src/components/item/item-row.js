import Image from 'next/image';
import { epochToElapsed } from '../../util/helpers';

const ItemRow = ({ item }) => {
  return (
    <div className="item-row">
      <div className="item-picture">
        <Image
          src={
            item.image_src === 'default'
              ? '/default-image.png'
              : `${process.env.NEXT_PUBLIC_API_URL}/public/images/${item.image_src}`
          }
          height="200"
          width="200"
          objectFit="cover"
          alt="Image"
        />
      </div>

      <div className="item-text">
        <div className="item-first-row">
          <div>
            <strong>
              {item.brand} {item.model}
            </strong>
            <p>{item.type}</p>
          </div>

          <strong className="price">${item.price}</strong>
        </div>

        <div className="item-second-row">
          <span>
            Posted by <strong>{item.username}</strong>
          </span>
          <span className="time">{epochToElapsed(item.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
