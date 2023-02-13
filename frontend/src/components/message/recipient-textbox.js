import { useState } from 'react';

const RecipientTextbox = ({ json, recipientUsername, setRecipientUsername, isLoading }) => {
  // data
  const users = json.data.users;
  const [suggestions, setSuggestions] = useState([]);

  // narrow suggestions when typing
  const filterResults = (e) => {
    const usernames = users.map((user) => user.username);
    setSuggestions(e === '' ? [] : usernames.filter((user) => user.includes(e)));
    setRecipientUsername(e);
  };

  // render
  return (
    <>
      <input
        list="usernames"
        id="recipientUsername"
        value={recipientUsername}
        onChange={(e) => filterResults(e.target.value)}
        disabled={isLoading}
      />
      <datalist id="usernames">
        {suggestions.map((username, i) => {
          return <option value={username} key={i} />;
        })}
      </datalist>
    </>
  );
};

export default RecipientTextbox;
