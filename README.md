# OnTalk - BACKEND

## Getting Started


### Dependencies

We use all this main following dependencies:

1. Express
2. Body-parser
3. Multer
4. Bcrypt
5. Jsonwebtoken
6. CORS
7. socket.io

### Database
We provide database with four tables:
1. Users
2. Chat
3. Friend

![db_scheme](https://i.ibb.co/hVLsCMC/db-scheme.jpg)

### Installing

Here is few step to run the server of Payment Web:

1. Create your database based on database scheme above
2. Open your terminal and head to your project directory
3. Clone this repository
```
git clone https://github.com/cotbakheu/OnTalk_Backend
``` 
4. Set ".env" file in root :
    - `PORT`        : fill for set the API running port
    - `db_host`     : fill with HOSTNAME in your  database configuration
    - `db_user`     : fill with USERNAME in your database configuration
    - `db_password` : fill with PASSWORD in your database configuration (Or leave it null if your database haven't password)
    - `db_name`     : fill with the NAME OF DATABASE
    - `JWT_SECRET`  : fill with the unique value due to signature verifier on JWT

6. Use this command to install all dependencies
```
npm install
```
7. You can install nodemon for easier development (optional)
 * local
```
npm install nodemon
```
 * global
```
npm install -g nodemon
```
8. Run the server
 * With nodemon installed
```
nodemon
```
 * Without nodemon
```
node app.js
```

## Frontend Repository
[Frontend OnTalk Web Aplication](https://github.com/cotbakheu/OnTalk_Frontend)