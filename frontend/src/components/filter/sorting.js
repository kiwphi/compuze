const Sorting = ({ sort, setSort, order, setOrder, setPage }) => {
  // parameter = 'price' or 'created_at'
  const sortItemsBy = (parameter) => {
    setSort(parameter);
    setOrder('ASC');
    setPage(1);
  };

  // value = 'ASC' or 'DESC'
  const orderItems = (value) => {
    setOrder(value);
    setPage(1);
  };

  return (
    <>
      <button
        className={sort === 'price' ? 'filter-select-btn active' : 'filter-select-btn'}
        onClick={() => sortItemsBy('price')}
      >
        Price
      </button>
      <button
        className={sort === 'created_at' ? 'filter-select-btn active' : 'filter-select-btn'}
        onClick={() => sortItemsBy('created_at')}
      >
        Date
      </button>

      {sort ? (
        <>
          <strong>Order:</strong>
          <button
            className={order === 'ASC' ? 'filter-select-btn active' : 'filter-select-btn'}
            onClick={() => orderItems('ASC')}
          >
            {sort === 'price' ? 'Lowest First' : 'Oldest First'}
          </button>
          <button
            className={order === 'DESC' ? 'filter-select-btn active' : 'filter-select-btn'}
            onClick={() => orderItems('DESC')}
          >
            {sort === 'price' ? 'Highest First' : 'Newest First'}
          </button>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Sorting;
