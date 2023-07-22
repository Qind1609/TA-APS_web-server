
const utils = require('./helpers/utils');
const axios = require('axios');

const test = () => {
  let count = 0;
  const testInterval = setInterval(() => {
    const Temperature = utils.randomFloat(0, 50);
    const Pressure = utils.randomFloat(0, 7);;
    const Flow = utils.randomFloat(0, 250);
    const kw1 = utils.randomFloat(0, 12);
    const kw2 = utils.randomFloat(0, 12);
    const kw3 = utils.randomFloat(0, 12);
    const kwh = 60.55;
    const Day = 22;
    const Month = 7;
    const Year = 2023;
    const Hour = 15;
    const Minute = 40;
    const Second = 50;
    const Total = 542;
    const Valve_1 = 1;
    const Valve_2 = 1;
    const Valve_3 = 0;
    const Valve_4 = 1;
    const Valve_5 = 1;
    const M_1 = 0;
    const M_2 = 0;
    const M_3 = 1;
    const data = {
        Day: Day,
        Month: Month,
        Year: Year,
        Hour: Hour,
        Minute: Minute,
        Second: Second,
        Total: Total,
        Valve_1: Valve_1,
        Valve_2: Valve_2,
        Valve_3: Valve_3,
        Valve_4: Valve_4,
        Valve_5: Valve_5,
        M_1: M_1,
        M_2: M_2,
        M_3: M_3,
        Temperature: Temperature,
        Pressure: Pressure,
        Flow: Flow,
        kw1: kw1,
        kw2: kw2,
        kw3: kw3,
        kwh: kwh,
    }
    const headers = {
      'content-type': 'application/json',
      'accept': '*/*',
      'Connection': 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
    };
    axios.post('http://localhost:1609/db/insert_data', data, headers)
    count += 1;
    if (count === 60) {
      clearInterval(testInterval);
    }
  }, 1000);
}

test();