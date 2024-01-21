const express = require('express');
const {
  getAllTodos,
  createTodo,
  getATodo,
  updateATodo,
  deleteATodo,
  deleteAllTodo,
  getTask,
} = require('../controllers/todoController.js');
const router = express.Router();

router.route('/').get(getAllTodos);
router.route('/').post(createTodo);
router.route('/:id').get(getATodo);
router.route('/:id').put(updateATodo);
router.route('/:id').delete(deleteATodo);
router.route('/all/delete').delete(deleteAllTodo);

module.exports = router;
