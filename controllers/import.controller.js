const async = require('async');
module.exports = {
  importData: (req, res) => {
    console.log(req.body);
    const file = req.files.file;
    const fileName = file.name;
    
  }
}