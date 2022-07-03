const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//# MIDDLEWARES
// parser for raw json
app.use(express.json());
// parser for url encoded data
app.use(express.urlencoded({ extended: true }));

// # API ROUTES
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// # STATIC FILES
if (process.env.NODE_ENV === 'production') {
  // provide the path to build folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // get routes (index.html)
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production...'));
}

// override default error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
