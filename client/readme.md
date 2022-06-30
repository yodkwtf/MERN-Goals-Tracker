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
