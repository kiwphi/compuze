import Sorting from './sorting';
import TypeSelector from './type-selector';
import SearchBar from './search-bar';

const Filters = ({ type, setType, order, setOrder, sort, setSort, setPage, search, setSearch }) => {
  const removeFilters = () => {
    setType('');
    setSort('');
    setOrder('');
    setPage(1);
  };

  return (
    <>
      <div className="all-filters">
        {/* search */}
        <strong>Search:</strong>
        <SearchBar search={search} setSearch={setSearch} setPage={setPage} />

        {/* type */}
        <strong>Filter by type:</strong>
        <div className="filter-controls">
          <TypeSelector type={type} setType={setType} setPage={setPage} />
        </div>

        {/* sorting */}
        <strong>Sort by:</strong>
        <div className="filter-controls">
          <Sorting sort={sort} setSort={setSort} order={order} setOrder={setOrder} setPage={setPage} />
        </div>

        {/* remove filters */}
        {type || sort || order ? (
          <button className={'remove-filters-btn'} onClick={removeFilters}>
            Remove Filters
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Filters;
