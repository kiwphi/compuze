# COMPUZE | DEPLOYMENT GUIDE

#### 1- Users

- SSH into the server as root:  
  `ssh root@<server-ip>`

- Add a new user and allow it to sudo:  
  `adduser username`  
  `adduser username sudo`

- Logout & SSH again with the new user  
  `ssh new_username@<server-ip>`

- Optionally disable the root account

- Update the system  
  `sudo apt update`  
  `sudo apt upgrade`

#### 2- Firewall

- Install UFW  
  `sudo apt install ufw`

- Deny incoming requests  
  `sudo ufw default deny incoming`

- Allow outgoing requests  
  `sudo ufw default allow outgoing`

- Allow SSH, HTTP & HTTPS  
  `sudo ufw allow ssh`  
  `sudo ufw allow http`  
  `sudo ufw allow https`

- Allow localhost to use all ports  
  `sudo ufw allow from <server-ip>`

- Activate firewall  
  `sudo ufw enable`

#### 3- NGINX

- Install NGINX  
  `sudo apt install nginx`

- Edit the default configuration  
  `/etc/nginx/sites-enabled/default`

- Reload NGINX  
  `sudo systemctl reload nginx`

#### 4- Backend

- Install NodeJS

- Install MariaDB  
  `sudo apt install mariadb-server`  
  `sudo mysql_secure_installation`

- Create the database  
  `sudo mysql -u root -p`  
  `create database <dbname>;`

#### 5- HTTPS

- Install cerbot on the server  
  `sudo apt install python3-certbot-nginx`

- Download & install SSL/TLS certificate  
  `sudo certbot --nginx`

- Setup automatic renewal  
  `sudo certbot renew --dry-run`

Cert keys are only accessible by root. NodeJS needs to read them to serve over HTTPS.  
We add the standard user to a ssl-cert group and give that group permission to read the keys

- Create the group & add user to the group  
  `sudo groupadd ssl-cert`  
  `sudo usermod -a -G ssl-cert username`

- Set keys permissions  
  `sudo chgrp -R ssl-cert /etc/letsencrypt/live`  
  `sudo chgrp -R ssl-cert /etc/letsencrypt/archive`  
  `sudo chmod -R 750 /etc/letsencrypt/live`  
  `sudo chmod -R 750 /etc/letsencrypt/archive`

#### 6- PM2

- Install PM2  
  `npm install pm2 -g`

- Run the backend using PM2  
  `pm2 start ./app.js --name backend`

- Built the frontend  
  `npm run build`

- Run the frontend using PM2  
  `pm2 start npm --name frontend -- run start`

- Setup PM2 to run at startup in case of server reboot  
  `pm2 startup`  
  `pm2 save`

#### 7- Fail2ban

Fail2Ban will automatically ban IP addresses of users who fail to login consecutively

- Install & start fail2ban  
  `sudo apt install fail2ban`  
  `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`  
  `<edit jail.local>`  
  `sudo service fail2ban restart`
