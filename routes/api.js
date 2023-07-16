const express = require('express');
const router = express.Router();
const { import_data, export_data, home, admin, energy, flow, pressure, temperature, database } = require('../controllers');

/**
 * Convention
 * @method GET: get data
 * @method POST: add new data
 * @method PUT: update data
 * @method DELETE: delete data
 */

router.post('/import', import_data.importData);
router.get('/export', export_data.exportData);
router.get('/home/get_home_data', home.fetchData);
router.get('/get_all_data', admin.getAllData);
// router.get('/energy/get_energy_data', energy.getEnergyData);
// router.get('/flow/get_flow_data', flow.getFlowData);
// router.get('/pressure/get_pressure_data', pressure.getPressureData);
// router.get('/temperature/get_temperature_data', temperature.getTemperatureData);
router.post('/db/insert_data', database.insertData);


module.exports = router;