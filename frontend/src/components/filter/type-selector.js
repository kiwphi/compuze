import useItemTypes from '../../util/useItemTypes';

const TypeSelector = ({ type, setType, setPage }) => {
  const handleType = (value) => {
    // if clicking on an already selected type, de-select it
    if (type === value) {
      return setType('');
    }

    setType(value);
    setPage(1);
  };

  const { itemTypes } = useItemTypes();

  return (
    <>
      {itemTypes.map((itemType, index) => (
        <button
          key={index}
          className={type === itemType ? 'filter-select-btn active' : 'filter-select-btn'}
          onClick={() => handleType(itemType)}
        >
          {itemType}
        </button>
      ))}
    </>
  );
};

export default TypeSelector;
