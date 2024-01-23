const Task = require('../Model/Task.js');

const getAllTask = (req, res, next) => {
  const projectId = req.query.projectId;

  if (projectId && projectId.trim() !== '') {
    Task.findAll({
      where: {
        project_id: projectId.trim(),
        is_completed: false,
      },
    })
      .then((data) => res.json(data))
      .catch((err) => next(new Error(err.message)));
  } else {
    const error = new Error('Project ID is required');
    error.statusCode = 400;
    next(error);
  }
};

const createTask = (req, res, next) => {
  if (req.body.content && req.body.content.trim() !== '') {
    const newTask = {
      ...req.body,
      project_id: req.query.projectId,
      due: {
        date: req.body.due_date,
        string: req.body.due_string,
        datetime: req.body.datatime,
        isRecurring: false,
        timezone: req.body.timezone,
      },
    };
    Task.create(newTask)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        return next(new Error(err.message));
      });
  } else {
    res.status(400).json({
      message: 'content is required',
    });
  }
};

const getTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        return res.status(200).json(data);
      }

      const error = new Error('Task not found');
      error.statusCode = 400;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Task not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const updateTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.update(req.body, { where: { id: id }, returning: true })
    .then((result) => {
      if (result[0] === 1) {
        return res.status(200).json(result[1]);
      }

      const error = new Error('Task not found');
      error.statusCode = 404;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Task not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const closeTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.update({ is_completed: true }, { where: { id: id } })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(204).json({});
      }

      const error = new Error('Task not found');
      error.statusCode = 404;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Task not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const reOpenTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.update({ is_completed: false }, { where: { id: id } })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(204).json({});
      }

      const error = new Error('Task not found');
      error.statusCode = 404;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Task not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const deleteTask = (req, res, next) => {
  Task.destroy({ where: { id: req.params.taskId } })
    .then((num) => {
      if (num === 1) {
        return res.status(204).json({});
      }

      const error = new Error('Task not found');
      error.statusCode = 404;
      return next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Task not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const getAllCompleteTask = (req, res, next) => {
  Task.findAll({ where: { is_completed: true } })
    .then((data) => res.status(200).json(data))
    .catch((err) => next(new Error(err.message)));
};
module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  closeTask,
  reOpenTask,
  deleteTask,
  getAllCompleteTask,
};
