import Link from 'next/link';
import { useRouter } from 'next/router';

const GuestOnlyNav = () => {
  //router
  const router = useRouter();

  //render
  return (
    <>
      {/* Login */}
      <li className={router.pathname == '/auth/login' ? 'active' : ''}>
        <Link href="/auth/login">Login</Link>
      </li>

      {/* Signup */}
      <li className={router.pathname == '/auth/signup' ? 'active' : ''}>
        <Link href="/auth/signup">Signup</Link>
      </li>
    </>
  );
};

export default GuestOnlyNav;
