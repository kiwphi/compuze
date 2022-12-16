import ItemList from '../../components/item/item-list';
import { getRequest } from '../../util/api-requests';

const Items = ({ json }) => {
  return <ItemList json={json} />;
};

export const getServerSideProps = async () => {
  const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items`);

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
export default Items;
