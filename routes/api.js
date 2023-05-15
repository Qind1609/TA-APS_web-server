const express = require('express');
const router = express.Router();
const { import_data, export_data } = require('../controllers');

/**
 * Convention
 * @method GET: get data
 * @method POST: add new data
 * @method PUT: update data
 * @method DELETE: delete data
 */

router.post('/import', import_data.importData);
router.get('/export', export_data.exportData);

module.exports = router;