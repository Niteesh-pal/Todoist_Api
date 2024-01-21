const Task = require('../Model/Task.js');

const getAllTask = (req, res) => {
  Task.findAll({
    where: { project_id: req.params.projectId, is_completed: false },
  })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).json({ message: err.message || 'some error occured' })
    );
};

const createTask = (req, res) => {
  if (req.body.content) {
    const newTask = {
      project_id: req.params.projectId,
      section_id: req.body.section_id,
      content: req.body.content,
      description: req.body.description,
      is_completed: req.body.is_completed,
      labels: req.body.labels,
      parent_id: req.body.parent_id,
      order: req.body.order,
      priority: req.body.priority,
      due: req.body.due,
      url: req.body.url,
      comment_count: req.body.comment_count,
      creator_id: req.body.creator_id,
      assignee_id: req.body.assignee_id,
      assigner_id: req.body.assigner_id,
    };

    Task.create(newTask)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.status(500).json({ message: 'Error' }));
  } else {
    res.status(400).json({
      message: 'content is required',
    });
  }
};

const getTask = (req, res) => {
  const id = req.params.taskId;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).json({
          message: 'unable to get requested data',
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message || 'some error occured',
      })
    );
};

const updateTask = (req, res) => {
  const id = req.params.taskId;
  Task.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.status(200).json({ message: 'Update Successfully' });
      } else {
        res.status(500).json({ message: `Cannot update task with id ${id}` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: err.message || `Unable To update task of id ${id}` });
    });
};
const closeTask = (req, res) => {
  const id = req.params.taskId;
  Task.update({ is_completed: true }, { where: { id: id } })
    .then((num) => {
      if (num[0] === 1) {
        res.status(204).send({});
      } else {
        res
          .status(500)
          .send({ message: 'Error while processing your request' });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: err.message || 'Error while updating task' })
    );
};

const reOpenTask = (req, res) => {
  const id = req.params.taskId;

  Task.update({ is_completed: false }, { where: { id: id } })
    .then((num) => {
      if (num[0] === 1) {
        res.status(204).send({});
      } else {
        res.status(500).json({ message: 'Something went Wrong' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'error aa gya' }));
};

const deleteTask = (req, res) => {
  Task.destroy({ where: { id: req.params.taskId } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send({});
      } else {
        res.status(500).json({ message: 'Error while deleting task' });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Internal server Error' })
    );
};
module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  closeTask,
  reOpenTask,
  deleteTask,
};
