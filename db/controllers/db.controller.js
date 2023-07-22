// CRUD functions defined here

const db = require('../models');
const Table = db.table;
const Op = db.Sequelize.Op;

const dbController = {};

// Insert new data row into table
dbController.insert = (data) => {
  return new Promise((resolve, reject) => {

    // Create a Table
    const row = {
      Day: data.Day,
      Month: data.Month,
      Year: data.Year,
      Hour: data.Hour,
      Minute: data.Minute,
      Second: data.Second,
      Temperature: data.Temperature,
      Pressure: data.Pressure,
      Flow: data.Flow,
      Total: data.Total,
      Valve_1: data.Valve_1,
      Valve_2: data.Valve_2,
      Valve_3: data.Valve_3,
      Valve_4: data.Valve_4,
      Valve_5: data.Valve_5,
      M_1: data.M_1,
      M_2: data.M_2,
      M_3: data.M_3,
      kw1: data.kw1,
      kw2: data.kw2,
      kw3: data.kw3,
      kwh: data.kwh,
    };

    // Save row data in the db table
    Table.create(row, { fields: [
      'Day',
      'Month',
      'Year',
      'Hour',
      'Minute',
      'Second',
      'Temperature',
      'Flow',
      'Total',
      'Valve_1',
      'Valve_2',
      'Valve_3',
      'Valve_4',
      'Valve_5',
      'M_1',
      'M_2',
      'M_3',
      'kw1',
      'kw2',
      'kw3',
      'kwh'
    ]})
      .then(data => {
        console.log("Insert data success. Current ID: ", data.dataValues.id);
        return resolve();
      })
      .catch(err => {
        console.log("Insert data error: ", err);
        return reject();
      });
  });
};

// Retrieve all data in table from the database.
dbController.findAll = (columns) => {
  return new Promise((resolve, reject) => {
    Table.findAll({ attributes: columns })
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

// Find a single Table with an id
dbController.findOne = (id) => {
  return new Promise((resolve, reject) => {
    Table.findByPk(id)
      .then(data => {
        if (data) {
          return resolve(data);
        } else {
          return reject(`Cannot find Table with id=${id}.`)
        }
      })
      .catch(err => {
        return reject(`Error retrieving Table with id: ${id} - ${err}`);
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