const projectRoutes = require('./routes/projectRoutes.js');
// const db = require('./config/db_connect.js');
const taskRoute = require('./routes/taskRoutes.js');
const labelsRoute = require('./routes/labelsRoute.js');
const commentRoute = require('./routes/commentRoute.js');
const errorHandler = require('./middleware/errorHandler.js');
const express = require('express');
require('dotenv').config();
const app = express();

const db = require('./config/db_connect.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => console.log('Synced'))
  .catch((err) => console.log('Failed to sync DB',err));

app.use('/rest/v2/project', projectRoutes);
app.use('/rest/v2/task', taskRoute);
app.use('/rest/v2/comments', commentRoute);
app.use('/rest/v2/labels', labelsRoute);

app.all('*', (req, res, next) => {
  const error = new Error(`cannot find ${req.originalUrl} on the server`);
  error.statusCode = 404;

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
 
});
