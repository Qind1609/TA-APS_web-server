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
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while inserting data.",
      });
    }
    try {
      const { Temperature, Pressure, Flow, kw1, kw2, kw3 } = req.body;
      const data = {
        temperature: Temperature,
        pressure: Pressure,
        flow: Flow,
        powerEnergy1: kw1,
        powerEnergy2: kw2,
        powerEnergy3: kw3,
      }
      const simRespones = await simController.sendData(data);
      console.log("Simulation Machine Response: ", simRespones);
    } catch (err) {
      console.log("Error while sending data to simulation machine: ", err);
    }
  }
};
