const Comment = require('../Model/Comment.js');

const validation = (projectId = '', taskId = '') => {
  if (
    (projectId === '' && taskId === '') ||
    (projectId !== '' && taskId !== '')
  ) {
    return false;
  }
  if (projectId !== '' && projectId.trim() !== '') {
    projectId = projectId.trim();
    return { projectId, taskId: undefined };
  }
  taskId = taskId.trim();
  return { projectId: undefined, taskId };
};

const getAllComment = (req, res) => {
  Comment.findAll({})
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Some error has occured' })
    );
};

const getComment = (req, res) => {
  if (!validation(req.query.projectId, req.query.taskId)) {
    return res
      .status(500)
      .json({ message: 'either projectId or taskId is required' });
  }

  const { projectId, taskId } = validation(
    req.query.projectId,
    req.query.taskId
  );

  if (projectId !== undefined) {
    return Comment.findAll({ where: { project_id: projectId } })
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).json({ message: err.message || 'some Error occured' })
      );
  }

  if (taskId !== undefined) {
    return Comment.findAll({ where: { task_id: taskId } })
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).json({ message: err.message || 'Some error occured' })
      );
  }
};

const createComment = (req, res) => {
  if (!validation(req.query.projectId, req.query.taskId)) {
    return res
      .status(500)
      .json({ message: 'Either project_id or task_id is required' });
  }

  const { projectId, taskId } = validation(
    req.query.projectId,
    req.query.taskId
  );

  if (req.body.content) {
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
      .catch((err) => res.status(500).json({ message: err.message }));
  } else {
    res.status(500).json({ message: 'content is required' });
  }
};

const getCommentById = (req, res) => {
  const id = req.params.commentId;
  console.log(id);
  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).json({ message: 'Unable to get requested data' });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Some error has occured' })
    );
};

const updateCommentById = (req, res) => {
  const id = req.params.commentId;

  if (req.body.content && req.body.content.trim()) {
    Comment.update(
      { content: req.body.content.trim() },
      { where: { id: id } }
    ).then((num) => {
      if (num[0] === 1) {
        Comment.findOne({ where: { id: id } })
          .then((data) => res.send(data))
          .catch((err) =>
            res
              .status(500)
              .json({ message: err.message || 'Some error occured' })
          );
      } else {
        res.status(500).json({ message: 'Unable to update comment' });
      }
    });
  } else {
    res.status(500).json({ message: 'content is required' });
  }
};

const deleteCommentById = (req, res) => {
  const id = req.params.commentId;
  Comment.destroy({ where: { id: id } })
    .then(() => res.status(204).send())
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Some error occured' })
    );
};

module.exports = {
  getAllComment,
  getComment,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
