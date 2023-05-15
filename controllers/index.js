// Create index.js that exports all controller functions
const import_data = require('./import.controller');
const export_data = require('./export.controller');

module.exports = {
  import_data,
  export_data
};