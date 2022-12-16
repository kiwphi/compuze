import Link from 'next/link';
import ItemRow from '../../../components/item/item-row';
import { getRequest } from '../../../util/api-requests';

const Favorites = ({ json }) => {
  return (
    <>
      <h2>Your favorites</h2>
      {json.data.favorites.length
        ? json.data.favorites.map((item) => (
            <Link key={item.id} href={`/items/${item.id}`}>
              <a>
                <ItemRow item={item} />
              </a>
            </Link>
          ))
        : 'No favorites yet'}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { userId } = context.params;
  const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/favorites`);

  if (!json.success) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      json: json,
    },
  };
};
export default Favorites;
