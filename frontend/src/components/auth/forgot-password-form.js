import { useState } from 'react';
import { postRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';

const ForgotPasswordForm = () => {
  // form data
  const [email, setEmail] = useState('');

  // feedback
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // api call
  const submitForgotRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot`, { email: email });
    setIsLoading(false);

    if (!json.success) {
      return setErrors(json.errors);
    }

    setSuccess(true);
  };

  // render
  if (success) {
    return 'Password reset instructions were sent. Please check your email.';
  }

  return (
    <>
      {/* errors */}
      {errors ? <ErrorList errors={errors} /> : ''}

      {/* form */}
      <form className="form" onSubmit={submitForgotRequest}>
        <div className="form-group">
          <label>Type your email address and well send you instructions on how to reset your password.</label>
          <input
            type="text"
            value={email}
            id="username"
            maxLength="100"
            placeholder="Your email address"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* button */}
        {isLoading ? (
          <span>Sending request...</span>
        ) : (
          <button className="big-btn blue-btn" type="submit" onClick={submitForgotRequest}>
            Send Reset Instructions
          </button>
        )}
      </form>
    </>
  );
};

export default ForgotPasswordForm;
