const db = require('../config/db_connect');
const Labels = db.Labels;

const getlabels = (req, res) => {
  Labels.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      next(new Error(err.message));
    });
};

const getLabelById = (req, res, next) => {
  const id = req.params.labelId;
  Labels.findByPk(id)
    .then((data) => {
      if (data === null) {
        return next({ message: 'label not found', statusCode: 400 });
      }

      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('label not found');
        e.statusCode = 400;
        return next(e);
      }

      return next(new Error());
    });
};

const createLabels = (req, res, next) => {
  if (req.body.name && req.body.name.trim() !== '') {
    Labels.create(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        return next(new Error(err.message));
      });
  } else {
    const e = new Error('Name is required');
    e.statusCode = 400;
    return next(e);
  }
};

const updateLablebyId = (req, res, next) => {
  const id = req.params.labelId;

  Labels.update(req.body, {
    where: { id: id },
    returning: true,
  })
    .then((result) => {
      if (result[0] === 0) {
        const e = new Error('label does not found');
        e.statusCode = 400;
        return next(e);
      }

      res.status(200).json(result[1]);
    })
    .catch((err) => {
      next(new Error(err.message));
    });
};

const deleteLabelById = (req, res, next) => {
  const id = req.params.labelId;
  Labels.destroy({ where: { id: id } })
    .then((num) => {
      console.log(num);
      if (num == 0) {
        const e = new Error('label not found');
        e.statusCode = 400;
        return next(e);
      }

      res.status(200).end();
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('label not found');
        e.statusCode = 400;
        return next(e);
      }

      return next(new Error());
    });
};

module.exports = {
  getlabels,
  createLabels,
  getLabelById,
  updateLablebyId,
  deleteLabelById,
};
