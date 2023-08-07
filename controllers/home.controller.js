const dbController = require('../db/controllers/db.controller');
const utils = require('../helpers/utils');
module.exports = {
  fetchData: async (req, res) => {
    console.log("Home page request: ", req.body);
    try {
      let rawData = await dbController.getData(['id', 'Day', 'Month', 'Year', 'Hour', 'Minute', 'Second', 'kwh', 'Flow']);
      // process data
      let timeArr = [];
      let flowArr = [];
      let consumptionArr = [];
      rawData.map((item, index) => {
        timeArr.push(item.Month + '-' + item.Day + '-' + item.Year + ' ' + item.Hour + ':' + item.Minute + ':' + item.Second);
        flowArr.push(parseFloat(item.Flow));
        consumptionArr.push(parseFloat(item.kwh));
      });
      let timeList = utils.handleTimeData(timeArr);                                // output: {timeArr: [...], dayArr: [...], weekArr: [...], monthArr: [...], day: {...}, week: {...}, month: {...}}
      let flowList = utils.handleFlowData(flowArr, timeList);                      // output: {day: [...], week: [...], month: [...]}
      let consumptionList = utils.handleConsumptionData(consumptionArr, timeList); // output: {day: [...], week: [...], month: [...]}
      let data = {
        time: timeList,
        flow: flowList,
        consumption: consumptionList
      }
      res.status(200).send({
        success: true,
        message: 'Fetch home data success',
        data: data
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving table.",
        data: {}
      });
    }
  }
}