const dbController = require('../db/controllers/db.controller');
const utils = require('../helpers/utils');

module.exports = {
  getPressureData: async (req, res) => {
    console.log("Pressure page request: ", req.body);
    try {
      let rawData = await dbController.getData(['id', 'Day', 'Month', 'Year', 'Hour', 'Minute', 'Second', 'Pressure']);
      // process data
      let timeArr = [];
      let pressArr = [];
      rawData.map((item, index) => {
        timeArr.push(item.Month + '-' + item.Day + '-' + item.Year + ' ' + item.Hour + ':' + item.Minute + ':' + item.Second);
        pressArr.push(parseFloat(item.Pressure));
      });
      let timeList = utils.handleTimeData(timeArr);                // output: {timeArr: [...], dayArr: [...], weekArr: [...], monthArr: [...], day: {...}, week: {...}, month: {...}}
      let data = {
        time: timeList,
        press: pressArr
      }
      res.status(200).send({
        success: true,
        message: 'Fetch pressure data success',
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