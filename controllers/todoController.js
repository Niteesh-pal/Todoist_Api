const todo = require('../Model/Todo.js');
const db = require('../config/db_connect.js');

const getAllTodos = (req, res) => {
  try {
    todo
      .findAll()
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res
          .status(500)
          .json({ message: err.message || 'Unable to get request' })
      );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createTodo = (req, res) => {
  try {
    if (req.body.name) {
      const {
        name,
        parent_id,
        color,
        order,
        comment_count,
        is_shared,
        is_favourite,
        is_inbox_project,
        is_team_inbox,
        viewStyle,
        url,
      } = req.body;

      const newTodo = {
        name: name,
        parent_id: parent_id ? parent_id : null,
        color: color ? color : 'none',
        order: order ? order : 0,
        comment_count: comment_count ? comment_count : 0,
        is_shared: is_shared ? is_shared : false,
        is_favourite: is_favourite ? is_favourite : false,
        is_inbox_project: is_inbox_project ? is_inbox_project : false,
        is_team_inbox: is_team_inbox ? is_team_inbox : false,
        viewStyle: viewStyle ? viewStyle : 'list',
        url: url ? url : '',
      };

      todo
        .create(newTodo)
        .then((data) => res.send(data))
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'some error occured',
          });
        });
    } else {
      return res.status(400).json({ msg: 'name is required' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getATodo = (req, res) => {
  const id = req.params.id;
  todo
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).json({ message: 'unable to get data' });
      }
    })
    .catch((err) => res.status(500).json({ message: `error: ${err.message}` }));
};

const updateATodo = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  todo
    .update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.status(200).json({ message: 'Updated' });
      } else {
        res.status(500).json({ message: `Cannot update Todo with id ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Unable to update Todo of id ${id}` });
      console.log(err);
    });
};

const deleteATodo = (req, res) => {
  const id = req.params.id;
  todo.destroy({ where: { id: id } }).then((num) => {
    if (num === 1) {
      res.status(200).json({ message: `Todo deleted successfully` });
    } else {
      res
        .status(500)
        .send({ message: `Error while deleting Todo of id ${id}` });
    }
  });
};

const deleteAllTodo = (req, res) => {
  todo
    .destroy({ where: {} })
    .then((num) =>
      res.status(200).json({ message: `${num} Todo deleted successfully` })
    )
    .catch((err) =>
      res
        .status(500)
        .json({
          message: err.message || 'Some Error occurred while deleting todos',
        })
    );
};
module.exports = {
  getAllTodos,
  createTodo,
  getATodo,
  updateATodo,
  deleteATodo,
  deleteAllTodo,
};
