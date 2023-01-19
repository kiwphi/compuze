import { useRouter } from 'next/router';
import { useState } from 'react';
import { postRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';

const ResetPasswordForm = () => {
  // form data
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // feedback
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();
  const { token, userId } = router.query;

  // api call
  const resetPassword = async () => {
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset`, {
      password: password,
      repeatPassword: repeatPassword,
      token: token,
      userId: userId,
    });

    if (!json.success) {
      setIsLoading(false);
      return setErrors(json.errors);
    }

    return router.replace('/auth/login?message=Please login using your new password');
  };

  return (
    <>
      {/* errors */}
      {errors ? <ErrorList errors={errors} /> : ''}

      {/* form */}
      <form className="form">
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
          <span> Changing Password...</span>
        ) : (
          <button className="big-btn blue-btn" type="button" onClick={resetPassword}>
            Change Password
          </button>
        )}
      </form>
    </>
  );
};

export default ResetPasswordForm;
