import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../util/auth-context';
import { epochToElapsed } from '../../util/helpers';
import ErrorList from '../common/error-list';
import ItemRow from '../item/item-row';
import EditEmailButton from './edit-email-button';
import EditPasswordButton from './edit-password-button';
import EditPhoneButton from './edit-phone-button';
import PrivacyCheckbox from './privacy-checkbox';

const UserProfile = ({ jsonUser, jsonUserItems }) => {
  // data
  const user = jsonUser.data.user;
  const userItems = jsonUserItems.data.items;
  const [phone, setPhone] = useState(jsonUser.data.user.phone);
  const [email, setEmail] = useState(jsonUser.data.user.email);

  // feedback
  const [errors, setErrors] = useState(false);

  // auth
  const { authData } = useContext(AuthContext);

  // render
  return (
    <>
      <h2>{user.username}&apos;s profile</h2>

      {errors ? <ErrorList errors={errors} /> : ''}

      <div className="user-details-section">
        <div className="user-details">
          <span>
            Email: {user.privacy && authData.username !== user.username ? <i>(Hidden)</i> : <strong>{email}</strong>}
            {authData.isLoggedIn && authData.username === user.username ? (
              <EditEmailButton user={user} setEmail={setEmail} setErrors={setErrors} />
            ) : (
              ''
            )}
          </span>

          <div className="user-details-row-2">
            <span>
              Phone: {user.privacy && authData.username !== user.username ? <i>(Hidden)</i> : <strong>{phone}</strong>}
              {authData.isLoggedIn && authData.username === user.username ? (
                <EditPhoneButton user={user} setPhone={setPhone} setErrors={setErrors} />
              ) : (
                ''
              )}
            </span>
            <span>Join date: {epochToElapsed(user.created_at)}</span>
          </div>
        </div>
        <div className="user-details-buttons">
          {authData.isLoggedIn && authData.username !== user.username ? (
            <Link href={`/messages/send/?recipient=${user.username}`}>
              <button className="big-btn blue-btn">Send Message to {user.username}</button>
            </Link>
          ) : (
            ''
          )}
          {!authData.isLoggedIn ? (
            <Link href={`/auth/login?redirect=users/${user.id}`}>Login to send a message</Link>
          ) : (
            ''
          )}

          {authData.isLoggedIn && authData.username === user.username ? (
            <EditPasswordButton user={user} setErrors={setErrors} />
          ) : (
            ''
          )}
        </div>
        <div>
          {authData.isLoggedIn && authData.username === user.username ? (
            <PrivacyCheckbox user={user} setErrors={setErrors} />
          ) : (
            ''
          )}
        </div>
      </div>

      {userItems && userItems.length ? (
        <>
          <h2>{user.username}&apos;s Items</h2>
          <div className="user-items-section">
            {userItems.map((item) => {
              return (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <ItemRow item={item} />
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default UserProfile;
