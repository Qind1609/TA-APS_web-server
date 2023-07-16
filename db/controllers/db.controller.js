// CRUD functions defined here

const db = require('../models');
const Table = db.table;
const Op = db.Sequelize.Op;

const dbController = {};
// Create and Save a new Table
dbController.create = () => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Table
  const table = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Table in the database
  Table.create(table)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a table."
      });
    });
};

// Retrieve all data in table from the database.
dbController.findAll = () => {
  return new Promise((resolve, reject) => {
    Table.findAll()
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

// Find a single Table with an id
dbController.findOne = () => {
  const id = req.params.id;

  Table.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Table with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Table with id=" + id
      });
    });
};

// Update a Table by the id in the request
dbController.update = (req, res) => {
  const id = req.params.id;

  Table.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Table with id=${id}. Maybe Table was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Table with id=" + id
      });
    });
};

// Delete a Table with the specified id in the request
dbController.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Table with id=${id}. Maybe Table was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Table with id=" + id
      });
    });
};

// Delete all Tables from the database.
dbController.deleteAll = (req, res) => {
  Table.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tables were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tables."
      });
    });
};

// find all published Table
dbController.findAllPublished = (req, res) => {
  Table.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tables."
      });
    });
};

module.exports = dbController;