const projectRoutes = require('./routes/projectRoutes.js');
const db = require('./config/db_connect.js');
const taskRoute = require('./routes/taskRoutes.js');
const { getAllComment } = require('./controllers/commentController.js');
const labelsRoute = require('./routes/labelsRoute.js');
const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const app = express();

const PORT = 5000;

app.use(express.json());

app.use('/rest/v2/project', projectRoutes);
app.use('/rest/v2/task', taskRoute);
app.get('/rest/v2/comment/all', getAllComment);

app.use('/rest/v2/labels', labelsRoute);
app.all('*', (req, res, next) => {
  const error = new Error(`cannot find ${req.originalUrl} on the server`);
  error.statusCode = 404;

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  db.authenticate()
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));
});
