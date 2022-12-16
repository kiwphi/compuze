import { useState } from 'react';
import { patchRequest } from '../../util/api-requests';

const EditPhoneButton = ({ user, setPhone, setErrors }) => {
  // form data
  const [newPhone, setNewPhone] = useState(user.phone);

  // button state
  const [clicked, setClicked] = useState(false);

  // api call
  const editPhone = async () => {
    const json = await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
      phone: newPhone,
    });

    if (!json.success) {
      return setErrors(json.errors);
    }

    setErrors(false);
    setPhone(newPhone);
    setClicked(false);
  };

  // render
  if (clicked) {
    return (
      <>
        <input
          type="text"
          placeholder="New Phone"
          maxLength="15"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <button className="small-btn blue-btn" onClick={editPhone}>
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

export default EditPhoneButton;
