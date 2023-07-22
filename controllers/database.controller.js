const dbController = require('../db/controllers/db.controller');
const simController = require('../app/sim.controller');

module.exports = {
  insertData: async (req, res) => {
    console.log("New data row: ", req.body);
    try {
      await dbController.insert(req.body);
      res.status(200).send({
      success: true,
      message: 'POST data success',
    });
      await simController.sendData(req.body);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while inserting data.",
      });
    }
  }
};
