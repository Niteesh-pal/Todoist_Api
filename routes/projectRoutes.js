const express = require('express');
const {
  getAllProject,
  createProject,
  deleteAProject,
  deleteAllProject,
  getProjectById,
  updateProjectById,
} = require('../controllers/projectController.js');
const {
  createComment,
  getComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require('../controllers/commentController.js');
const router = express.Router();

router.route('/comment').get(getComment);
router.route('/comment').post(createComment);
router.route('/comment/:commentId').get(getCommentById);
router.route('/comment/:commentId').put(updateCommentById);
router.route('/comment/:commentId').delete(deleteCommentById);

router.route('/').get(getAllProject);
router.route('/').post(createProject);
router.route('/:id').get(getProjectById);
router.route('/:id').put(updateProjectById);
router.route('/:id').delete(deleteAProject);
router.route('/all/delete').delete(deleteAllProject);

module.exports = router;
