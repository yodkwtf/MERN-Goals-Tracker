# goals-tracker-mern

A MERN stack application that allows users to track their goals.

## Prepare for Deployment

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

## Heroku Setup

1. Create an account on Heroku
2. Install the Heroku CLI or check if it's present
   ```bash
   heroku --version #should print the version
   ```
3. Login to Heroku CLI
   ```bash
   heroku login
   ```
4. Create a new heroku app with a custom unique name

   ```bash
   heroku create goals-tracker-dk
   ```

   Now our Heroku app will be created with our custom url

   > Since _.env_ file doesn't get pushed, we will manually need to add all the env variables to the app using Heroku's GUI on the website

5. Add a Heroku post build script to _package.json_ so heroku can build our react app too on every build

   ```json
   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
   ```

6. Add and commit the files

   ```bash
   git add .
   git commit -m 'initial deploy'
   ```

7. Check if git remote for heroku is added

   ```bash
   git remote -v
   ```

   If the remote is not displaying, add it manually

   ```bash
   heroku git:remote -a goalstracker-mern-dk
   ```

8. Push it to heroku

   ```bash
   git push heroku main/master
   ```

9. Once deployment is done, see it live!
   ```bash
   heroku open
   ```
