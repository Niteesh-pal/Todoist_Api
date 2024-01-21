const express = require('express');
const {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  reOpenTask,
  deleteTask,
  closeTask,
} = require('../controllers/taskControllers');
const taskRoute = express.Router();

taskRoute.get('/:projectId/', getAllTask);
taskRoute.post('/:projectId/', createTask);
taskRoute.get('/:projectId/:taskId', getTask);
taskRoute.put('/:projectId/:taskId', updateTask);
taskRoute.delete('/:projectId/:taskId', deleteTask);
taskRoute.put('/:projectId/:taskId/close', closeTask);
taskRoute.put('/:projectId/:taskId/reopen', reOpenTask);

module.exports = taskRoute;
