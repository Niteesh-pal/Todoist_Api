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
const { getComment } = require('../controllers/commentController');
const taskRoute = express.Router();

taskRoute.get('/task/complete', getAllCompleteTask);
taskRoute.get('/:projectId/task', getAllTask);
taskRoute.post('/:projectId/task', createTask);
taskRoute.get('/:projectId/task/:taskId', getTask);
taskRoute.put('/:projectId/task/:taskId', updateTask);
taskRoute.delete('/:projectId/task/:taskId', deleteTask);
taskRoute.put('/:projectId/task/:taskId/close', closeTask);
taskRoute.put('/:projectId/task/:taskId/reopen', reOpenTask);

taskRoute.get('/task/comment', getComment);

module.exports = taskRoute;
