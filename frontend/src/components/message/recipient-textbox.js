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

  // handle clicking on a suggestion
  const handleClick = (username) => {
    setRecipientUsername(username);
    setSuggestions([]);
  };

  // render
  return (
    <>
      <input
        type="text"
        id="recipientUsername"
        value={recipientUsername}
        maxLength="30"
        onChange={(e) => filterResults(e.target.value)}
        disabled={isLoading}
      />
      <nav>
        {suggestions.map((username, i) => {
          return (
            <a href="#" onClick={() => handleClick(username)} key={i}>
              {username}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default RecipientTextbox;
