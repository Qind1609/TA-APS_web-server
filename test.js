const utils = require('./helpers/utils');

const date = '18/5/2023';
const dateTemp = date.split('/');
const test = utils.getWeek(new Date(`${dateTemp[2]}-${dateTemp[1]}-${dateTemp[0]}`));
console.log(test)