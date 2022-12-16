import SendMessageForm from '../../../components/message/send-message-form';
import { getRequest } from '../../../util/api-requests';

const SendMessage = ({ json }) => {
  return (
    <>
      <h2>Compose message</h2>
      <SendMessageForm json={json} />
    </>
  );
};

export const getServerSideProps = async () => {
  const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  if (!json.success) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      json: json,
    },
  };
};
export default SendMessage;
