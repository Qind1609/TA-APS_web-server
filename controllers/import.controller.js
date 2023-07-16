const async = require('async');
const path = require('path');
const config = require('../configs/config');
const utils = require('../helpers/utils');

const { data_path } = config;

module.exports = {
  importData: (req, res) => {
    const file = req.files.file;
    const fileName = file.name;
    async.waterfall([
      cb => file.mv(path.join(data_path, fileName), (err) => {
        cb(err)
      }),
      cb => {
        utils.getCsvData(path.join(data_path, fileName)).then(csv_data => {
          let timeArr = [];
          let tempArr = [];
          let pressArr = [];
          let flowArr = [];
          let consumptionArr = [];
          csv_data.map((item, index) => {
            timeArr.push(item.Month + '-' + item.Day + '-' + item.Year + ' ' + item.Hour + ':' + item.Minute + ':' + item.Second);
            tempArr.push(parseFloat(item.T));
            pressArr.push(parseFloat(item.P));
            flowArr.push(parseFloat(item.F));
            consumptionArr.push(parseFloat(item.kW));
          });
          let timeList = utils.handleTimeDataImport(timeArr);                                // output: {timeArr: [...], dayArr: [...], weekArr: [...], monthArr: [...], day: {...}, week: {...}, month: {...}}
          let flowList = utils.handleFlowDataImport(flowArr, timeList);                      // output: {day: [...], week: [...], month: [...]}
          let consumptionList = utils.handleConsumptionDataImport(consumptionArr, timeList); // output: {day: [...], week: [...], month: [...]}
          let data = {
            time: timeList,
            temp: tempArr,
            press: pressArr,
            flow: flowList,
            consumption: consumptionList
          }
          cb(null, data);
        })
      }
    ], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Import failed', code: 200 });
        return;
      }
      console.log('Import success');
      res.status(200).send({
        success: true,
        message: 'Import success',
        data: results,
        code: 200
      });
      return;
    });
  }
}