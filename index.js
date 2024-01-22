const projectRoutes = require('./routes/projectRoutes.js');
const db = require('./config/db_connect.js');
const express = require('express');
const taskRoute = require('./routes/taskRoutes.js');
const { getAllComment } = require('./controllers/commentController.js');
const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/rest/v2/project', projectRoutes);
app.use('/rest/v2/project', taskRoute);
app.get("/rest/v2/comment/all", getAllComment)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  db.authenticate()
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));
});
