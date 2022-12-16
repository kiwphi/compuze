import { useRouter } from 'next/router';
import { useState } from 'react';
import { postRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';

const SignupForm = () => {
  // form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  // router
  const router = useRouter();

  // api call
  const signup = async () => {
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      phone: phone,
      email: email,
    });
    setIsLoading(false);

    if (!json.success) {
      return setErrors(json.errors);
    }

    return router.replace('/auth/login?message=Signup successful, please login');
  };

  // render
  return (
    <>
      {/* errors */}
      {errors ? <ErrorList errors={errors} /> : ''}

      {/* sign-up form */}
      <form className="form">
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
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            id="phone"
            maxLength="15"
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            id="email"
            maxLength="100"
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="form-group">
          <label>Repeat Password</label>
          <input
            type="password"
            value={repeatPassword}
            id="repeatPassword"
            maxLength="100"
            onChange={(e) => setRepeatPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* button */}
        {isLoading ? (
          <span>Creating account...</span>
        ) : (
          <button className="big-btn blue-btn" type="button" onClick={signup}>
            Sign-up
          </button>
        )}
      </form>
    </>
  );
};

export default SignupForm;
