const SearchBar = ({ search, setSearch, setPage }) => {
  const searchBy = (term) => {
    setSearch(term);
    setPage(1);
  };

  return <input type="text" id="searchBox" maxLength="50" value={search} onChange={(e) => searchBy(e.target.value)} />;
};

export default SearchBar;
