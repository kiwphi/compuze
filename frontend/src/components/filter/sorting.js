const Sorting = ({ sort, setSort, order, setOrder, setPage }) => {
  // parameter => 'price' or 'created_at'
  const sortItemsBy = (parameter) => {
    setSort(parameter);
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    setPage(1);
  };

  // render
  return (
    <>
      <button
        className={sort === 'price' ? 'filter-select-btn active' : 'filter-select-btn'}
        onClick={() => sortItemsBy('price')}
      >
        Price {sort === 'price' ? (order === 'ASC' ? '\u2191' : '\u2193') : ''}
      </button>
      <button
        className={sort === 'created_at' ? 'filter-select-btn active' : 'filter-select-btn'}
        onClick={() => sortItemsBy('created_at')}
      >
        Date {sort === 'created_at' ? (order === 'ASC' ? '\u2191' : '\u2193') : ''}
      </button>
    </>
  );
};

export default Sorting;
