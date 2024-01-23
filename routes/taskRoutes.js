const express = require('express');
const {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  reOpenTask,
  deleteTask,
  closeTask,
  getAllCompleteTask,
} = require('../controllers/taskControllers');
const taskRoute = express.Router();

taskRoute.get('/complete', getAllCompleteTask);
taskRoute.get('/', getAllTask);
taskRoute.post('/', createTask);
taskRoute.get('/:taskId', getTask);
taskRoute.put('/:taskId', updateTask);
taskRoute.delete('/:taskId', deleteTask);
taskRoute.put('/:taskId/close', closeTask);
taskRoute.put('/:taskId/reopen', reOpenTask);

module.exports = taskRoute;
