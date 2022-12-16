# Compuze Backend

API of Compuze, using NodeJS & Express

### API Endpoints

#### Users

- Get users: `GET /users`

- Get user: `GET /users/:userId`

- Get user's items: `GET /users/:userId/items`

- Get user's favorites: `GET /users/:userId/favorites`

- Edit user: `PATCH /users/:userId`  
  Valid Request content-type: **application/json**  
  Required body parameters: **userId**  
  Optional body parameters: **phone, email, password**  
  `Credentials required`

#### Auth

- Login: `POST /auth/login`  
  Valid Request content-type: **application/json**  
  Required parameters: **username, password**

- Signup: `POST /auth/signup`  
  Valid Request content-type: **application/json**  
  Required body parameters: **username, password, email, phone**

- Request password reset email: `POST /auth/forgot`  
  Valid Request content-type: **application/json**  
  Required body parameters: **email**

- Reset password: `POST /auth/reset`  
  Valid Request content-type: **application/json**  
  Required body parameters: **password, repeatPassword, token, userId**

- Whoami: `GET /users/whoami`  
  `Credentials required`

- Logout: `POST /users/logout`  
  `Credentials required`

#### Items

- Get items: `GET /items`

- Get item: `GET /items/:itemId`

- Increment views: `PATCH /items/:itemId/views`

- Post item: `POST /items`  
  Valid Request content-type: **multipart/form-data**  
  Required parameters: **type, brand, model, description, location, image, price**  
  `Credentials required`

- Edit item: `PUT /items/:itemId`  
  Valid Request content-type: **multipart/form-data**  
  Required parameters: **itemId, type, brand, model, description, location, image, price**  
  `Credentials required`

- Delete item: `DELETE /items/:itemId`  
  `Credentials required`

- Check if item is in favorites: `GET /:itemId/favorites`  
  `Credentials required`

- Add item to favorites: `POST /:itemId/favorites`  
  `Credentials required`

- Remove item from favorites: `DELETE /:itemId/favorites`  
  `Credentials required`

- Get item's comments: `GET /:itemId/comments`

#### Comments

- Get comment : `GET /comments/:commendId`

- Post comment: `POST /comments`
  Valid Request content-type: **application/json**  
  Required body parameters: **content, itemId**  
  `Credentials required`

- Delete comment: `DELETE /comments/:commentId`  
  `Credentials required`

#### Messages

- Get messages: `GET /messages`  
  `Credentials required`

- Get message: `GET /messages/:messageId`  
  `Credentials required`

- Send message: `POST /messages`  
  Valid Request content-type: **application/json**  
  Required body parameters: **subject, content, senderId, recipientId**  
  `Credentials required`

- Delete messages: `DELETE /messages/:messageId`  
  `Credentials required`

- Mark as read: `PATCH /messages/:messageId/read`  
  `Credentials required`

- Mark as unread: `DELETE /messages/:messageId/read`  
  `Credentials required`
