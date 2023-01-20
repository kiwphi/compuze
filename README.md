# Compuze

A platform to facilitate buying and selling used computer parts

### Dev dependencies

- NodeJS & Nodemon
- MySQL/MariaDB
- Docker (Optional)

### Running the development server manually

- Clone the repo
- Create a local MySQL database
- Edit the environment variables in the .env files
- Install dependencies & run dev servers in both ./backend & ./frontend directories: `npm install && npm run dev`
- By default, the frontend will be served at localhost:3000 and the backend at localhost:5500

### Running the development using the provided script

- If your system has tmux, neovim & docker installed, running the `dev.sh` script will setup a dev environment

### Documentation

- The <a href="https://github.com/kiwphi/compuze/blob/master/docs/API.md">API Documentation</a> has information about the API's endpoints
- A basic linux <a href="https://github.com/kiwphi/compuze/blob/master/docs/DEPLOYMENT.md">deployment guide</a>

### Screenshots

#### Viewing a single item

<img src="docs/screenshot1.png" alt="screenshot1">

#### Browsing items with some filters on

<img src="docs/screenshot2.png" alt="screenshot2">

#### Inbox

<img src="docs/screenshot3.png" alt="screenshot3">
