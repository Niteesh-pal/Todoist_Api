const express = require('express');
const {
  createLabels,
  getlabels,
  getLabelById,
  updateLablebyId,
  deleteLabelById,
} = require('../controllers/labelsController');
const labelsRoute = express.Router();

labelsRoute.get('/', getlabels);
labelsRoute.post('/', createLabels);
labelsRoute.get('/:labelId', getLabelById);
labelsRoute.put('/:labelId', updateLablebyId);
labelsRoute.delete('/:labelId', deleteLabelById);

module.exports = labelsRoute;
