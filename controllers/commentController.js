const db = require('../config/db_connect');
const Comment = db.Comment;
const project = db.project;
const Task = db.Task;

const validation = (projectId = '', taskId = '') => {
  if (
    (projectId === '' && taskId === '') ||
    (projectId !== '' && taskId !== '')
  ) {
    return false;
  }
  if (projectId !== '' && projectId.trim() !== '') {
    projectId = projectId.trim();
    return { projectId, taskId: null };
  }

  taskId = taskId.trim();
  return { projectId: null, taskId };
};

const getAllComment = (req, res, next) => {
  if (!validation(req.query.projectId, req.query.taskId)) {
    const error = new Error('projectId or taskId is required');
    error.statusCode = 400;
    return next(error);
  }

  const { taskId, projectId } = validation(
    req.query.projectId,
    req.query.taskId
  );

  Comment.findAll({ where: { project_id: projectId, task_id: taskId } })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('comment not found');
        e.statusCode = 404;
        return next(e);
      }
      next(new Error(err.message));
    });
};

const createComment = (req, res, next) => {
  console.log('line61', req.body.projectId, req.body.taskId);

  if (!validation(req.body.projectId, req.body.taskId)) {
    const error = new Error('projectId or taskId is required');
    error.statusCode = 400;
    return next(error);
  }

  const { projectId, taskId } = validation(req.body.projectId, req.body.taskId);

  if (req.body.content && req.body.content.trim() !== '') {
    const newComment = {
      ...req.body,
      project_id: projectId,
      task_id: taskId,
      attachment: {
        filename: req.body.filename,
        filetype: req.body.filetype,
        fileurl: req.body.fileurl,
        resourceType: req.body.resourceType,
      },
    };

    Comment.create(newComment)
      .then((data) => res.send(data))
      .catch((err) => next(new Error(err.message)));
  } else {
    const error = new Error('Content is required');
    error.statusCode = 400;
    next(error);
  }
};

const getCommentById = (req, res, next) => {
  const id = req.params.commentId;

  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        return res.status(200).json(data);
      }

      const error = new Error('comment not found');
      error.statusCode = 400;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('comment not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

const updateCommentById = (req, res, next) => {
  const id = req.params.commentId;
  const content = req.body.content;

  if (content && content.trim() != '') {
    Comment.update(
      { ...req.body, content: content },
      { where: { id: id }, returning: true }
    )
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).json(result[1]);
        }

        const error = new Error('comment not found');
        error.statusCode = 400;
        next(error);
      })
      .catch((err) => {
        if (err.name === 'SequelizeDatabaseError') {
          const e = new Error('comment not found');
          e.statusCode = 404;
          return next(e);
        }

        next(new Error(err.message));
      });
  } else {
    const error = new Error('content is required');
    error.statusCode = 400;
    next(error);
  }
};

const deleteCommentById = (req, res, next) => {
  const id = req.params.commentId;
  Comment.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        return res.status(204).json({});
      }

      const error = new Error('comment not found');
      error.statusCode = 400;
      next(error);
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('comment not found');
        e.statusCode = 404;
        return next(e);
      }

      next(new Error(err.message));
    });
};

module.exports = {
  getAllComment,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
