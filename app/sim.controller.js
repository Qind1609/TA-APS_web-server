const axios = require('axios');
const configs = require('../configs/config');
const simEndpoint = configs.sim_endpoint;
const simController = {};

simController.sendData = async (data) => {
  const result = await axios.post(simEndpoint, data, {
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  return result.data;
}

module.exports = simController;