import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { postRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';
import RecipientTextbox from './recipient-textbox';

const SendMessageForm = ({ json }) => {
  // router
  const router = useRouter();
  const { recipient, reply } = router.query;

  // form data
  const [subject, setSubject] = useState(reply ? reply : '');
  const [content, setContent] = useState('');
  const [recipientUsername, setRecipientUsername] = useState(recipient ? recipient : '');

  // feedback
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // api call
  const postMessage = async () => {
    setIsLoading(true);
    const json = await postRequest(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      subject: subject,
      content: content,
      recipientUsername: recipientUsername,
    });

    if (!json.success) {
      setIsLoading(false);
      return setErrors(json.errors);
    }

    return router.replace('/messages');
  };

  // render
  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ''}
      <form className="form">
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            id="subject>"
            onChange={(e) => setSubject(e.target.value)}
            maxLength="50"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            id="content>"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="254"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Recipient</label>
          <RecipientTextbox
            json={json}
            recipientUsername={recipientUsername}
            setRecipientUsername={setRecipientUsername}
            isLoading={isLoading}
          />
        </div>

        {/* Buttons */}
        {isLoading ? (
          <span>Sending message...</span>
        ) : (
          <>
            <button
              className="big-btn pink-btn"
              type="button"
              onClick={() => router.replace('/messages')}
              disabled={isLoading}
            >
              Discard
            </button>
            <button
              className="big-btn blue-btn"
              type="button"
              onClick={postMessage}
              disabled={!(subject && content && recipientUsername)}
            >
              Send
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default SendMessageForm;
