import { useState } from 'react';
import ErrorList from '../common/error-list';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { postRequest } from '../../util/api-requests';

const LoginForm = () => {
  // form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  // router
  const router = useRouter();
  const { redirect, message } = router.query;

  // api call
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username: username,
      password: password,
    });

    if (!json.success) {
      setIsLoading(false);
      return setErrors(json.errors);
    }

    return (window.location.href = `/${redirect || ''}`);
  };

  // render
  return (
    <>
      {/* errors */}
      {errors ? <ErrorList errors={errors} /> : ''}
      {/* informational messages */}
      {message ? <p className="informational"> {message} </p> : ''}
      {/* form */}
      <form className="form" onSubmit={login}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            id="username"
            maxLength="30"
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            id="password"
            maxLength="100"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {/* button */}
        {isLoading ? (
          <span>Logging in...</span>
        ) : (
          <button className="big-btn blue-btn" type="submit">
            Login
          </button>
        )}
      </form>
      {/* bottom links */}
      No account yet? <Link href="/auth/signup">Sign-up for one</Link> |{' '}
      <Link href="/auth/forgot">Forgot your password?</Link>
    </>
  );
};

export default LoginForm;
