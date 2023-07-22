const axios = require('axios');
const configs = require('../configs/config');
const simEndpoint = configs.sim_endpoint;
const simController = {};

simController.sendData = async (data) => {
  const res = await axios.post(simEndpoint, data);
  return res.data;
}

module.exports = simController;