const express = require('express');
const {
  getAllProject,
  createProject,
  deleteAProject,
  deleteAllProject,
  getProjectById,
  updateProjectById,
} = require('../controllers/projectController.js');

const router = express.Router();

router.route('/').get(getAllProject);
router.route('/').post(createProject);
router.route('/:id').get(getProjectById);
router.route('/:id').put(updateProjectById);
router.route('/:id').delete(deleteAProject);
router.route('/all/delete').delete(deleteAllProject);

module.exports = router;
