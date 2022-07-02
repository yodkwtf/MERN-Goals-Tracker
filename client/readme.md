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

## Connecting to Backend

Install **axios** to frontend for async data fetching

```bash
npm i axios
```

Install **react-toastify** to frontend for displaying alerts

```bash
npm i react-toastify
```

#### Setting Up Proxy

Whenever we make a request to the backend api using the routes like _/api/users_ or _/api/users/login_ from the frontend it'll automatically prefix the routes with _http://localhost:3000_ since that's the port our client is running on.

But instead we want it to make a request to _http://localhost:5000_ and hence we set up a proxy.

Move to the frontend directory

```bash
cd client
```

Set up a _proxy_ in the frontend's _package.json_

```json
"proxy": "http://localhost:5000"
```

Now all of our api requests will be prefixed with _http://localhost:5000_ and hence our backend server.

## Redux Toolkit Setup

- Setup **store** in _/src/app/store.js_
- Create all the required slices in the features directory

  > _/src/features/auth/authSlice.js_

  > _/src/features/goals/goalSlice.js_

- Create initial states and respective slices
- Connect to store by exporting reducers and actions from the slices

#### Register User

1. Create async thunk function to register user

   - Send a post request to _/api/users_ with user data
   - Save user to local storage to save the JWT
   - Show required errors, if any

2. Add it to the extra reducers using builder

   - Add 3 cases
   - Pending (loading), fulfilled (set user), and rejected (show error)

3. Hook it up the register form

   - Get register function from authSlice using _useSelector_
   - Call it with user data from the form when submitted using _dispatch_
   - Check for change in authState and set up a useEffect
     - Show error if there's one
     - If register is success or user's logged in push to dashboard
     - Clear success, loading, error states after at the end

#### Logout User

1. Create asyncThunk function for logout to remove the token/user form the local storage
2. Add a case in extra reducer where we set user to null when logout function is fulfilled
3. Conditionally render the logout button in navbar if user if truthy
4. Setup an _onClick_ function on logout button to do the following
   - Call logout function from authSlice
   - Call reset to reset the state values
   - Navigate user to _/login_ page after they logout
5. Make the dashboard protected
   - Check if user is null and push to login page it true

#### Login User

1. Create asyncThunk function to login user

   - Send a post request to _/api/users/login_ with user data
   - Save user to local storage to save the JWT
   - Show required errors, if any

2. Add 3 cases of the login function to extraReducer, same as register user

3. Hook it up the login form

   - Get login, reset function from authSlice using _useSelector_
   - Call it with user data from the form when submitted using _dispatch_
   - Check for change in authState and set up a useEffect
     - Show error if there's one
     - If register is success or user's logged in push to dashboard
     - Clear success, loading, error states after at the end

#### Create Goal

1. Create asyncThunk function to create goal
2. On clicking the add goal button, dispatch the createGoal function with _{text}_ as an input since we expect the text property on the req.body in the backend

   ```js
   console.log({ text }); // {text: 'the entered goal'}
   ```

3. Get user's token using thunkAPI and send a post request to _/api/goals_ passing the goal and headers containing the bearer token

   ```js
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   const response = await axios.post(API_URL, goal, config);
   return response.data;
   ```

4. Add _extraReducers_ for all 3 cases of promise

   - Push goals to state.goals on fulfillment
   - Show error on rejection
