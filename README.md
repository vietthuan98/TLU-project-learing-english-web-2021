# Description

Website project to learning english to graduate from TLU university.

## Tool

Client side: [VueJs](https://vuejs.org/) & [Typescript](https://www.typescriptlang.org/)

Server side: [ExpressJs](https://expressjs.com/)

Database: [Mongoose](https://mongoosejs.com/)

Mail service: [SendGrid](https://sendgrid.com/)

Cloud to store image, video, etc...: [Cloudinary](https://cloudinary.com/)

### Installation

Root folder should be

```
client

server

README.md
```

1. Client side

```
cd client

npm install

npm run serve
```

2. Server side

```
cd server

npm install

npm run dev
```

3. Set up .env file of each side

Create a .env file as the .env.example and edit the value of the necessary variables.
Remember, VUE_APP_API_URL in the .env file of the client must be resource api of the server side.
