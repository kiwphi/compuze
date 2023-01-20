import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/api-requests';
import Loading from '../common/loading';
import Pagination from '../common/pagination';
import Filters from '../filter/filters';
import ItemRow from './item-row';

// search delay, in ms after the user starts typing a search term,
// in order to avoid bombing the api with requests on each keystroke
const SEARCH_DELAY = 1000;

const ItemList = ({ json }) => {
  // data
  const [data, setData] = useState(json.data);

  // filters
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // feedback
  const [isLoading, setIsLoading] = useState(false);

  // api call - fetch items
  const fetchItems = async () => {
    const json = await getRequest(
      `${process.env.NEXT_PUBLIC_API_URL}/items/?type=${type}&page=${page}&sort=${sort}&order=${order}&search=${search}`
    );
    setIsLoading(false);
    setData(json.data);
  };

  // refetch items when a filter is selected
  useEffect(() => {
    setIsLoading(true);
    fetchItems();
  }, [type, sort, order, page]);

  // refetch items after a delay when a search term is entered
  useEffect(() => {
    setIsLoading(true);
    const searchDelay = setTimeout(() => {
      fetchItems();
    }, SEARCH_DELAY);
    return () => clearTimeout(searchDelay);
  }, [search]);

  // render
  return (
    <>
      <div className="no-margin-header">
        <h2>{type ? `Viewing ${type}` : 'Viewing all items'}</h2>
        {search ? (
          <p>
            Searching for <strong>`{search}`</strong>
          </p>
        ) : (
          ''
        )}
      </div>

      <div className="item-list-section">
        <Filters
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          type={type}
          setType={setType}
          order={order}
          setOrder={setOrder}
          setPage={setPage}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data && data.items.length ? (
              data.items.map((item) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <a>
                    <ItemRow item={item} />
                  </a>
                </Link>
              ))
            ) : (
              <p>No items found</p>
            )}
            <Pagination count={data && data.count} perPage={data && data.perPage} page={page} setPage={setPage} />
          </>
        )}
      </div>
    </>
  );
};

export default ItemList;
