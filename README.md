# SaveTheGaels

SaveTheGaels is my personal blog hosted [here](https://savethegaels.herokuapp.com/). It uses the MERN stack (MongoDB, Express, React, Node.js). The project supports admin authentication using Passport.js, authenticated users can then create, read, update, and delete blog posts (which are seen globally). 

## Getting Started

Note: this project requires a MongoDB database.

First, clone the repository and install dependencies using [npm](https://docs.npmjs.com/cli/v8/configuring-npm/install).

```bash
git clone https://github.com/lukebrichey/SaveTheGaels.git
cd SaveTheGaels
npm install
```

## Usage

First, create a .env file in the backend directory using the following commands:
```bash
cd backend
touch .env
```
Then, initialize the following environment variables:
```bash
DEVELOPMENT_DATABASE_URI=<your_mongodb_uri>
DEVELOPMENT_SESSION_SECRET=<your_express-session_secret>
```

You can run the app locally using the following command in the project root:

```bash
npm run server
```
 
To start the development server, perform the following commands:
```bash
cd backend
npm run dev
```

To start the frontend, perform the following commands:
```bash
cd frontend
npm run start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
