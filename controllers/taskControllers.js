const Task = require('../Model/Task.js');

const getAllTask = (req, res) => {
  Task.findAll({
    where: { project_id: req.params.projectId, is_completed: false },
  })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).json({
        message: `${err.message} from getAlltask ` || 'some error occured',
      })
    );
};

const createTask = (req, res) => {
  const date = new Date();
  if (req.body.content) {
    const newTask = {
      ...req.body,
      project_id: req.params.projectId,
      due: {
        date: date.getDate(),
        string: req.body.due_string ? req.body.due_string : '',
        datetime: date.getUTCDate(),
        isRecurring: req.body.isRecurring,
        timezone: req.body.timezone,
      },
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
        message: err.message || 'some error occureb0556afb-5d1f-4bb2-8e32-249ddbcfa1e9d',
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

const getAllCompleteTask = (req, res) => {
  Task.findAll({ where: { is_completed: true } })
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Some error has occured' })
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
  getAllCompleteTask,
};
