import useItemTypes from '../../util/useItemTypes';
import ImageSelector from './image-selector';

const ItemFormFields = ({
  type,
  setType,
  brand,
  setBrand,
  model,
  setModel,
  description,
  setDescription,
  location,
  setLocation,
  image,
  setImage,
  price,
  setPrice,
  isLoading,
  postItem,
  buttonText,
  imageSrc,
}) => {
  const { itemTypes } = useItemTypes();

  return (
    <form className="form">
      <div className="form-group">
        <label>Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} disabled={isLoading}>
          <option value="">- Select Item Type -</option>
          {itemTypes.map((itemType, index) => (
            <option key={index} value={itemType}>
              {itemType}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <input
          type="text"
          value={brand}
          id="brand"
          maxLength="50"
          onChange={(e) => setBrand(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          value={model}
          id="model"
          maxLength="50"
          onChange={(e) => setModel(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          id="description"
          value={description}
          maxLength="254"
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label>Item Location</label>
        <input
          type="text"
          value={location}
          id="location"
          maxLength="50"
          onChange={(e) => setLocation(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <span>Picture</span>
        <ImageSelector
          image={image}
          setImage={setImage}
          imageSrc={imageSrc} // existing image src. only if editing
          isLoading={isLoading}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          value={price}
          maxLength="7"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {isLoading ? (
        <span>Posting item...</span>
      ) : (
        <button className="big-btn blue-btn" type="button" onClick={postItem}>
          {buttonText}
        </button>
      )}
    </form>
  );
};

export default ItemFormFields;
