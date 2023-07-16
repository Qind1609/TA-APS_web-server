// Create index.js that exports all controller functions
const import_data = require('./import.controller');
const export_data = require('./export.controller');
const home = require('./home.controller');
const admin = require('./admin.controller');
const energy = require('./energy.controller');
const flow = require('./flow.controller');
const pressure = require('./pressure.controller');
const temperature = require('./temperature.controller');
const database = require('./database.controller');

module.exports = {
  import_data,
  export_data,
  home,
  admin,
  energy,
  flow,
  pressure,
  temperature,
  database
};