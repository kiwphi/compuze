import { useState } from 'react';
import { patchRequest } from '../../util/api-requests';

const PrivacyCheckbox = ({ user, setErrors }) => {
  // checkbox state
  const [privacy, setPrivacy] = useState(user.privacy);

  // api call
  const togglePrivacy = async () => {
    const json = await patchRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
      privacy: !privacy,
    });

    if (!json.success) {
      return setErrors(json.errors);
    }
    setPrivacy(!privacy);
    setErrors(false);
  };

  // render
  return (
    <span>
      <input checked={privacy} id="privacy" name="privacy" type="checkbox" onChange={togglePrivacy} />
      <label for="privacy">Keep my personal info private</label>
    </span>
  );
};

export default PrivacyCheckbox;
