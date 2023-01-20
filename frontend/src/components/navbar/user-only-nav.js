import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { postRequest } from '../../util/api-requests';
import { AuthContext } from '../../util/auth-context';
import InboxLink from './inbox-link';

const UserOnlyNav = () => {
  // auth
  const { authData } = useContext(AuthContext);

  // router
  const router = useRouter();

  // api call
  const logout = async () => {
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    if (json.success) {
      return (window.location.href = '/');
    }
  };

  // render
  return (
    <>
      {/* Post item */}
      <li className={router.pathname == '/items/add' ? 'active' : ''}>
        <Link href="/items/add">Post Item</Link>
      </li>

      {/* Favorites */}
      <li className={router.pathname == '/users/[userId]/favorites' ? 'active' : ''}>
        <Link href={`/users/${authData.userId}/favorites`}>Favorites</Link>
      </li>

      {/* Inbox */}
      <li className={router.pathname == '/messages' ? 'active' : ''}>
        <InboxLink />
      </li>

      {/* My Profiles */}
      <li className={router.pathname == '/users/[userId]' && router.query.userId == authData.userId ? 'active' : ''}>
        <Link href={`/users/${authData.userId}`}>My Profile</Link>
      </li>

      {/* Logout */}
      <li>
        <button className="big-btn pink-btn" onClick={logout}>
          Logout ({authData.username})
        </button>
      </li>
    </>
  );
};

export default UserOnlyNav;
