const csv = require('csvtojson');

const utils = {}

utils.getCsvData = async (filePath) => {
  const data = await csv().fromFile(filePath);
  return data;
}

module.exports = utils;