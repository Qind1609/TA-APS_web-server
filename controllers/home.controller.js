const dbController = require('../db/controllers/db.controller');

module.exports = {
  fetchData: async (req, res) => {
    console.log("Home page request: ", req.body);
    let data;
    try {
      data = await dbController.findAll(['id', 'Day', 'Month', 'Year', 'Hour', 'Minute', 'Second', 'kwh', 'Flow']);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving table.",
        data: []
      });
    }
    res.status(200).send({
      success: true,
      message: 'Fetch data success',
      data: data
    });
  }
}