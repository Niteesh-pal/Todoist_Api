const db = require('../config/db_connect');
const project = db.project;

const getAllProject = (req, res, next) => {
  const userId = req.userId;
  project
    .findAll({ where: { user_id: userId } })
    .then((data) => res.status(200).json(data))
    .catch((err) => next(new Error(err.message)));
};

const createProject = (req, res, next) => {
  if (req.body.name && req.body.name.trim() !== '') {
    project
      .create({ ...req.body, user_id: req.userId })
      .then((data) => res.send(data))
      .catch((err) => {
        return next(new Error(err.message));
      });
  } else {
    const error = new Error('Name is required');
    error.statusCode = 400;

    next(error);
  }
};

const getProjectById = (req, res, next) => {
  const id = req.params.id;
  project
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        const error = new Error('Project not found');
        error.statusCode = 404;
        next(error);
      }
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('label not found');
        e.statusCode = 400;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const updateProjectById = (req, res, next) => {
  const id = req.params.id;

  project
    .update(req.body, {
      where: { id: id, user_id: req.userId },
      returning: true,
    })
    .then((result) => {
      if (result[0] === 1) {
        return res.status(200).json(result[1]);
      }

      const error = new Error('project not found');
      error.statusCode = 400;
      return next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Project not found');
        e.statusCode = 400;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const deleteAProject = (req, res, next) => {
  const id = req.params.id;
  project
    .destroy({ where: { id: id, user_id: req.userId } })
    .then((num) => {
      if (num == 1) {
        return res.status(204).json({});
      }

      const error = new Error('Project not found');
      error.statusCode = 400;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Project not found');
        e.statusCode = 400;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const deleteAllProject = (req, res, next) => {
  project
    .destroy({ where: { user_id: req.userId } })
    .then(() => res.status(200).json({ message: 'All Projects are deleted' }))
    .catch((err) => next(new Error(err.message)));
};
module.exports = {
  getAllProject,
  createProject,
  getProjectById,
  updateProjectById,
  deleteAProject,
  deleteAllProject,
};
