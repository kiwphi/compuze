import { useState } from 'react';
import { patchRequest } from '../../util/api-requests';

const EditEmailButton = ({ user, setEmail, setErrors }) => {
  // button state
  const [clicked, setClicked] = useState(false);

  // form data
  const [newEmail, setNewEmail] = useState(user.email);

  // api call
  const editEmail = async () => {
    const json = await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
      email: newEmail,
    });

    if (!json.success) {
      return setErrors(json.errors);
    }

    setErrors(false);
    setEmail(newEmail);
    setClicked(false);
  };

  // render
  if (clicked) {
    return (
      <>
        <input
          type="text"
          placeholder="New Email"
          maxLength="100"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button className="small-btn blue-btn" onClick={editEmail}>
          Confirm
        </button>
        <button className="small-btn pink-btn" onClick={() => setClicked(false)}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <button className="small-btn blue-btn" onClick={() => setClicked(true)}>
      Edit
    </button>
  );
};

export default EditEmailButton;
