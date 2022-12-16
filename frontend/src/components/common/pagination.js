const Pagination = ({ count, perPage, page, setPage }) => {
  const prevPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      {/* previous button */}
      <button className={`page-change-button ${page === 1 ? 'invisible' : ''}`} onClick={prevPage}>
        &lt;
      </button>

      {/* page number */}
      {count ? <span className="page-number">Page {page}</span> : ''}

      {/* next button */}
      <button className={`page-change-button ${page * perPage >= count ? 'invisible' : ''}`} onClick={nextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
