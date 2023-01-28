import UserProfile from '../../../components/user/user-profile';
import { getRequest } from '../../../util/api-requests';

const User = ({ jsonUser, jsonUserItems }) => {
  return <UserProfile jsonUser={jsonUser} jsonUserItems={jsonUserItems} />;
};

export const getServerSideProps = async (context) => {
  const { userId } = context.params;

  const jsonUser = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
  const jsonUserItems = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/items`);

  if (!jsonUser.success || !jsonUserItems.success) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      key: jsonUser.data.user.id,
      jsonUser: jsonUser,
      jsonUserItems: jsonUserItems,
    },
  };
};
export default User;
