const express = require('express');
const {
  getAllComment,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require('../controllers/commentController');
const commentRoute = express.Router();

commentRoute.get('/', getAllComment);
commentRoute.post('/', createComment);
commentRoute.get('/:commentId', getCommentById);
commentRoute.put('/:commentId', updateCommentById);
commentRoute.delete('/:commentId', deleteCommentById);

module.exports = commentRoute;
