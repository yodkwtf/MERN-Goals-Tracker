const express = require('express');
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

// # ROUTES
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// override default error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
