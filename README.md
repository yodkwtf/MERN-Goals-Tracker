## Goals Tracker | MERN Stack Application

A MERN stack application that allows users to track their goals.

## Live Preview

[Goals Tracker | MERN App](https://goalstracker-dk.onrender.com/)

## How To Run?

Clone the repository

```bash
git clone https://github.com/yodkwtf/goals-tracker-mern.git
```

Move inside the app and install server dependencies

```bash
cd goals-tracker-mern
```

```bash
npm install
```

Install dependencies for frontend

```bash
cd client
```

```bash
npm install
```

Create a `.env` file in root and set the following env variables

```js
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://YOURMONGOURI
JWT_SECRET = <YOUR_SECRET>
JWT_EXPIRES_IN = 30d
```

Start the servers

```bash
npm run dev
```
