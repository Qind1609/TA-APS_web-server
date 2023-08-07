const dbController = require('../db/controllers/db.controller');
const utils = require('../helpers/utils');

module.exports = {
  getTemperatureData: async (req, res) => {
    console.log("Temperature page request: ", req.body);
    try {
      let rawData = await dbController.getData(['id', 'Day', 'Month', 'Year', 'Hour', 'Minute', 'Second', 'Temperature']);
      // process data
      let timeArr = [];
      let tempArr = [];
      rawData.map((item, index) => {
        timeArr.push(item.Month + '-' + item.Day + '-' + item.Year + ' ' + item.Hour + ':' + item.Minute + ':' + item.Second);
        tempArr.push(parseFloat(item.Temperature));
      });
      let timeList = utils.handleTimeData(timeArr);                // output: {timeArr: [...], dayArr: [...], weekArr: [...], monthArr: [...], day: {...}, week: {...}, month: {...}}
      let data = {
        time: timeList,
        temp: tempArr
      }
      res.status(200).send({
        success: true,
        message: 'Fetch temperature data success',
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