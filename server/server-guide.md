## Setting Up Server

- Create package.json file in project root
  ```bash
  npm init
  ```
- Install necessary dependencies to start
  ```bash
  npm i express mongoose dotenv
  ```
- Install nodemon as a dev dependency
  ```bash
  npm i -D nodemon
  ```
- Go to package.json and create add start scripts
  ```json
  "start": "node backend/server.js",
  "server": "nodemon backend/server.js"
  ```

#### Things to Remember

- Create a .gitignore file
- Create a .env file for port variables and more

## A Basic Server

```js
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// get request
app.get('/api/goals', (req, res) => {
  res.send('Get Goals');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Creating APIs

- Create different folders and files for all routes and controllers
- Add middleware if we need to send something inside the request body
  ```js
  // parser for raw json
  app.use(express.json());
  // parser for url encoded data
  app.use(express.urlencoded({ extended: true }));
  ```
- Errors can be handled via _express-error-handler_
  - By default it sends the html but we can create a custom middleware to make it send json response
  - The error middlewares should always be below the routes in _server.js_ otherwise it won't work

> Middlwares are basically functions that execute during the request-response cycle and they have access to both req and res object.

- When we start working with _mongoose_ our controllers functions should be async since we'll get promise as response
  - Instead of using _try-catch_ blocks over and over again we can use a package called _express-async-handler_
    ```bash
    npm i express-async-handler
    ```
  - Wrap all the controllers with `express-async-handler`

## Creating Database on MongoDB

- Sign in to mongoDB and create a new project
- Enter required details and create a new cluster
- Add yourself as user and your IP address for better security
- Cluster creating might take a minute or two

#### Connect to MongoDB

- Once done, click on the **Connect** button at the top of your created button
- Choose apt. options to get the **connection string** to connect to your app
- Paste the string in the required place (usually in .env file)
- Edit the password and database name in the connection string to connect to the database

#### Create New Collections

- Click on **Browse Collections** button on the cluster page to see and create collections
- Click on **add my own data** to create a new collection
- Provide a _database name_ which will have all the different collections (users, goals, etc.)

#### Connect to Mongoose

- Make sure to have the **mongoose** package installed
- Create a new config/db director with a _db.js_ file
- Import mongoose and create an async function called connectDB (name doesn't matter)
- Connect to the database in try block and print error in catch block
  ```js
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
      );
    } catch (error) {
      console.log(error);
      process.exit(1); // exit process with failure
    }
  };
  ```
- Import the function in _server.js_ and invoke it

## Creating Models

Models contain schema for a particular object (blogs, posts, goals, users, etc.). These schema are like the blurprint of that object and contain the data about different fields on that object.

- Create a new directory called _model_
- Create a new file for a model (goalModel.js)
- Require mongoose and create a new schema using `mongoose.Schema()` method and pass in the required fields
- Add `timestamps: true` as an option second argument to get the time related fields
- Export the model by providing the model name and its created Schema
  ```js
  module.exports = mongoose.model('Goal', goalSchema);
  ```
- Import the model in the controllers to perform the CRUD operations using mongoose

## CRUD Operations

**/GET**

- Get all goals using _find()_ method
- Send them as JSON

**/POST**

- Check if req body has data, throw error if it doesn't
- Use _create(data)_ method to create a goal
- Return the created goal

**/PUT**

- Get the goal/data using a unique field (\_id)
- Send 404 it not found
- Use one of the _findAndUpdate(findingQuery, updatedData)_ methods to update it
- Return the updated goal

**/DELETE**

- Get the goal/data using a unique field (\_id)
- Send 404 it not found
- Use one of the _remove()_ methods to delete it
- Return the deleted goal for confirmation

---

## User Model

- Create a user schema in /models with _name_, _email_ and _password_ fields
- Add _user_ as a field to the goal model referencing the user's id
  ```js
  user: {
    type: mongoose.Schema.Types.ObjectId, // type will be user's id
    ref: 'User', // reference to the user model
    required: true,
  },
  ```
- Create routes and controllers for user (login, register, etc.)
- Call the _userRouter_ in _server.js_
  ```js
  app.use('/api/users', require('./routes/userRoutes'));
  ```

#### Controller Functions Setup

- Install **bcryptjs** package to hash user passwords
  ```bash
  npm i bcryptjs
  ```
- Install **jsonwebtoken** to work with JWTs
  ```bash
  npm i jsonwebtoken
  ```
- Import _jwt_, _bcrypt_, _asyncHandler_, and _User Model_ to user controller
- Wrap all the functions with asyncHandler and make the functions async

#### Generating JWT & Protected Routes

Create a function to create JWT in the user controller

```js
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
```

1. We can use this function to create and send a JWT while registering or logging a user in.
2. Now we can extract userID from this token and hence validate it to send users to protected route.
3. We create a middleware function that runs and checks the token when we're trying to send the user to protected routes.
   - Check if token present on _req.headers_
   - Retrieve the Bearer token from _req.headers_
   - Verify token using `jwt.verify(token, secret)` method
   - Retrieve id from the decoded token and find user by that id
   - Set that user on the request object
     ```js
     req.user = await User.findById(decoded.id).select('-password');
     ```
   - Throw _unauthorized_ error if token isn't there or doesn't match
4. Now add this middleware as a second argument to all the routes that need to protected
5. Now any route where we added the middleware has access to the user on _req.user_

## User Controllers

**Register User**

- Get user data from _req.body_
- Check if all fields are provided
- Check if user with email already exists & throw error if true
- Hash password if the user is a new one
  ```js
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  ```
- Create the new user
- Send user data as a response along with the token, if user was created
- Send error if was unable to create user

**Login User**

- Get passed credentials from req.body
- Check if all fields are provided
- Find user by email
- If user found
  - Compare passed password with hashed password in the database
  - If true, send user data as response along with token
- If user not found
  - Send 400 status code with a msg like "Invalid Credentials"

**Get Me**

- Make it a protected route using the _auth middleware_
- Get user data from _req.user_ returned by auth middleware
- Send user data as response

## Protecting Goal Routes

- Once protected routes are setup, make all goal routes as protected
- Now all goals controllers will have access to user from `req.user` since they use auth middleware

**Get Goals**

- Use find method to get all goals by a specific user

**Set Goals**

- While passing goal to create method, pass user's id to reference a specific user

**Update Goal**

- Find user using _req.user_ and check if it exists
- Check user's id with goal's user reference to check if user owns that goal
- If yes, update goal else throw _unauthorized_ error

**Delete Goal**

- Find user using _req.user_ and check if it exists
- Check user's id with goal's user reference to check if user owns that goal
- If yes, delete goal else throw _unauthorized_ error
