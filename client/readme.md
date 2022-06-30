## Setting Up Frontend

Install _create-react-app_ along with redux (optional) in client directory

```bash
npx create-react-app client --template redux
```

Add start scripts to root _package.json_ so we don't have cd into frontend

```json
"client": "npm start --prefix client"
```

Start the frontend server

```bash
npm run client
```

## React Router Setup

- Clean the app and remove unwanted files
- Move into the _frontend_ directory
  ```bash
  cd client
  ```
- Install _react-router-dom_ package
  ```bash
  npm i react-router-dom
  ```
- Create required pages
- Set up the required routes in _app.js_

#### Basic React Router v6 Setup

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Login, Register } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Creating Pages and Components

- Create all the basic frontend for all the pages
- Add whatever form, states and onChange functions are required
- Create the required static components like _Nav_, _Footer_, etc.

## NOTE - Installing Concurrently

Before we start working with Redux and setting up reducers, we need both of our frontend and backend servers running simultaneously.

Now we can either run both of them separately by their respective script commands or optionally, use a package called **concurrently** to run multiple scripts at the same.

Install _concurrently_ as a dev dependency in the root

```bash
npm i -D concurrently
```

Add run command in root's package.json to run both the servers at the same time

```json
"dev": "concurrently \"npm run server\" \"npm run client\""
```

Start both the servers

```bash
npm run dev
```
