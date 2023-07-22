const path = require('path');
const fs = require('fs');
const data_folder = './data'

const configs = {
  data_path: path.resolve(data_folder),
  sim_endpoint: 'https://b03983789131-7345058576910038254.ngrok-free.app/gascompressor/status',
};

// create data folder if not exist
if (!fs.existsSync(data_folder)) {
  fs.mkdirSync(data_folder);
}

module.exports = configs;