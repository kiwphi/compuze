import Link from 'next/link';
import ItemDetails from '../../components/item/item-details';
import { getRequest, patchRequest } from '../../util/api-requests';

const Item = ({ json_item, json_comments }) => {
  return (
    <>
      <Link href="/items">Back to items list</Link>
      <ItemDetails json_item={json_item} json_comments={json_comments} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { itemId } = context.params;

  const json_item = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`);
  const json_comments = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/comments`);

  if (!json_item.success || !json_comments.success) {
    return {
      redirect: {
        destination: '/items',
        permanent: false,
      },
    };
  }

  // increment views
  await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/views`);

  return {
    props: {
      key: json_item.data.item.id,
      json_item: json_item,
      json_comments: json_comments,
    },
  };
};

export default Item;
