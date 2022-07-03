# goals-tracker-mern

A MERN stack application that allows users to track their goals.

## Deployment

Production server doesn't look for separate frontend and backend folders, that's just for development. Hence, we'll need to create the build of the react frontend and point our backend server to it's _index.html_ file.

Go to **server.js** in backend directory and import the path module

```js
const path = require('path');
```

Below the API routes in _server.js_, serve the frontend

```js
if (process.env.NODE_ENV === 'production') {
  // provide the path to build folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // get routes (index.html)
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
}
```
