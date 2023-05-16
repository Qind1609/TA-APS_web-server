const async = require('async');
const fs = require('fs');
const path = require('path');
const config = require('../configs/config');
const utils = require('../helpers/utils');

const { data_path } = config;

module.exports = {
  importData: (req, res) => {
    const file = req.files.file;
    const fileName = file.name;
    console.log(fileName);
    //restore file in data folder
    async.waterfall([
      cb => file.mv(path.join(data_path, fileName), (err) => {
        cb(err)
      }),
      // read file csv with csv to json, process data and send back to client
      cb => {
        utils.getCsvData(path.join(data_path, fileName)).then(csv_data => {
          console.log(csv_data);
            // // process data
            // const dataArr = data.split('\n');
            // const header = dataArr[0].split(',');
            // const dataArrProcessed = dataArr.slice(1).map((item) => {
            //   const itemArr = item.split(',');
            //   const itemObj = {};
            //   header.forEach((key, index) => {
            //     itemObj[key] = itemArr[index];
            //   });
            //   return itemObj;
            // });
            cb(null);
          })
        }
    ], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Import failed', code: 200 });
      } else {
        console.log('Import success');
        res.status(200).send({ success: true, code: 200 });
      }
    });
  }
}