import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../util/auth-context';
import GuestOnlyNav from './guest-only-nav';
import UserOnlyNav from './user-only-nav';

const Navbar = () => {
  // auth
  const { authData } = useContext(AuthContext);

  // router
  const router = useRouter();

  // render
  return (
    <div id="navigation">
      <ul>
        {/* Title */}
        <li>
          <Link href="/">
            <a>
              <strong>Compuze | Buy & Sell</strong>
            </a>
          </Link>
        </li>

        {/* All Items */}
        <li className={router.pathname == '/items' ? 'active' : ''}>
          <Link href="/items">All Items</Link>
        </li>

        {/* Usernav or Guestnav */}
        {authData.isLoggedIn ? <UserOnlyNav /> : <GuestOnlyNav />}
      </ul>
    </div>
  );
};

export default Navbar;
