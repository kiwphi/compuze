import { useState } from 'react';
import { patchRequest } from '../../util/api-requests';

const EditPasswordButton = ({ user, setErrors }) => {
  // button state
  const [clicked, setClicked] = useState(false);

  // form data
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');

  // api call
  const editPassword = async () => {
    const json = await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
      password: newPassword,
      repeatPassword: newRepeatPassword,
    });

    if (!json.success) {
      return setErrors(json.errors);
    }

    setErrors(false);
    setClicked(false);
  };

  // render
  return (
    <>
      {clicked ? (
        <>
          <input
            type="password"
            maxLength="100"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            maxLength="100"
            placeholder="Repeat Password"
            onChange={(e) => setNewRepeatPassword(e.target.value)}
          />
          <button className="small-btn blue-btn" onClick={editPassword}>
            Confirm
          </button>
          <button className="small-btn pink-btn" onClick={() => setClicked(false)}>
            Cancel
          </button>
        </>
      ) : (
        <button className="small-btn blue-btn" onClick={() => setClicked(true)}>
          Change Password
        </button>
      )}
    </>
  );
};

export default EditPasswordButton;
