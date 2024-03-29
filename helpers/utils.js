const csv = require('csvtojson');

const utils = {}

utils.getCsvData = async (filePath) => {
  const data = await csv().fromFile(filePath);
  return data;
}

utils.handleTimeData = (timeArr) => {
  const result = {};
  const day = {};
  const week = {};
  const month = {};
  const dayArr = [];
  const weekArr = [];
  const monthArr = [];
  timeArr.forEach((item, index) => {
    //const dateTemp = `${item[0]} ${item[1]}, ${item[2]} ${item[3]}`;
    const date = new Date(item);
    const dayKey = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const weekKey = `${utils.getWeek(date)}/${date.getFullYear()}`
    const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!dayArr.includes(dayKey)) {
      dayArr.push(dayKey);
    };
    if (!day[dayKey]) {
      day[dayKey] = {
        from: index,
        to: index,
      };
    } else {
      day[dayKey].to = index;
    }

    if (!week[weekKey]) {
      week[weekKey] = {
        from: index,
        to: index,
      };
    } else {
      week[weekKey].to = index;
    }
    if (!monthArr.includes(monthKey)) {
      monthArr.push(monthKey);
    };
    if (!month[monthKey]) {
      month[monthKey] = {
        from: index,
        to: index,
      };
    } else {
      month[monthKey].to = index;
    }
  })

  dayArr.forEach((item, index) => {
    const dateTemp = item.split('/');
    const date = new Date(`${dateTemp[2]}-${dateTemp[1]}-${dateTemp[0]}`);
    if (index === 0 || date.getDay() === 1) {
      weekArr.push(item);
    }
  })

  result.timeArr = timeArr;
  result.dayArr = dayArr;
  result.weekArr = weekArr;
  result.monthArr = monthArr;
  result.day = day;
  result.week = week;
  result.month = month;
  console.log("result", result);
  return result;
}

utils.getWeekImport = (date) => {
  const week = Math.ceil((date.getDay() + 1 + days) / 7);
  return week;
}

utils.handleFlowData = (flowArr, timeList) => {
  let flowTemp = {};
  Object.entries(timeList.day).forEach(([day, value]) => {
    let sumFlowDay = 0;
    for (let i = value.from; i <= value.to; i++) {
      sumFlowDay += flowArr[i] * 5 / 60;
    }
    if (!flowTemp.day) {
      flowTemp.day = [];
    }
    flowTemp.day.push(sumFlowDay);
  });
  Object.entries(timeList.week).forEach(([week, value]) => {
    let sumFlowWeek = 0;
    for (let i = value.from; i <= value.to; i++) {
      sumFlowWeek += flowArr[i] * 5 / 60;
    }
    if (!flowTemp.week) {
      flowTemp.week = [];
    }
    flowTemp.week.push(sumFlowWeek);
  });
  Object.entries(timeList.month).forEach(([month, value]) => {
    let sumFlowMonth = 0;
    for (let i = value.from; i <= value.to; i++) {
      sumFlowMonth += flowArr[i] * 5 / 60;
    }
    if (!flowTemp.month) {
      flowTemp.month = [];
    }
    flowTemp.month.push(sumFlowMonth);
  });
  console.log("flowTemp", flowTemp)
  return flowTemp;
}

utils.handleConsumptionData = (consumptionArr, timeList) => {
  let consumptionTemp = {};
  let weekBelongCurrent = null;
  let weekBelongPrevious = null;
  let monthBelongCurrent = null;
  let monthBelongPrevious = null;
  let sumConsumptionWeek = 0;
  let sumConsumptionMonth = 0;
  Object.entries(timeList.day).forEach(([day, value]) => {
    let consumptionDay = consumptionArr[value.to];
    let dayComponent =  day.split('/');
    let dayCorrect = new Date(`${dayComponent[2]}-${dayComponent[1]}-${dayComponent[0]}`);
    weekBelongCurrent = utils.getWeek(dayCorrect);
    monthBelongCurrent = dayCorrect.getMonth() + 1;
    if (!consumptionTemp.day) {
      consumptionTemp.day = [];
    }
    if (!consumptionTemp.week) {
      consumptionTemp.week = [];
    }
    if (!consumptionTemp.month) {
      consumptionTemp.month = [];
    }

    consumptionTemp.day.push(utils.format2Decimals(consumptionDay));
    if (weekBelongCurrent === weekBelongPrevious || weekBelongPrevious === null) {
      sumConsumptionWeek += consumptionDay;
    }
    else {
      consumptionTemp.week.push(utils.format2Decimals(sumConsumptionWeek));
      sumConsumptionWeek = consumptionDay;
    }
    if (monthBelongCurrent === monthBelongPrevious || monthBelongPrevious === null) {
      sumConsumptionMonth += consumptionDay;
    } else {
      consumptionTemp.month.push(utils.format2Decimals(sumConsumptionMonth));
      sumConsumptionMonth = consumptionDay;
    }
    if (day === timeList.dayArr[timeList.dayArr.length - 1]) {
      consumptionTemp.week.push(utils.format2Decimals(sumConsumptionWeek));
      consumptionTemp.month.push(utils.format2Decimals(sumConsumptionMonth));
    }
    monthBelongPrevious = monthBelongCurrent;
    weekBelongPrevious = weekBelongCurrent;
  });
  //console.log("consumptionTemp", consumptionTemp)
  return consumptionTemp;
}

utils.getWeek = (date) => {
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

utils.format2Decimals = (number) => {
  return Math.round(number * 100) / 100;
}

utils.randomFloat = (min, max) => {
  return parseFloat(Math.random() * (max - min) + min);
}

module.exports = utils;