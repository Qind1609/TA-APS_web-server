const port = process.env.PORT || 1609;
const env = process.env.NODE_ENV || 'development';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const db = require('./db/models');

// Watch env
console.log('Environment:', env);

/**
 * Creating express server
 */

const app = express();
const server = http.createServer(app);

/**
 * Middlewares
 */

app.use(morgan('dev'))
app.use(cors());
app.use(fileupload());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

/**
 * Router
 */

// Main APIs
const api = require('./routes/api');
app.use('/', api);


// Error handler
const { uncatchableAPI, errorHandler } = require('./routes/error');
app.use(uncatchableAPI);
app.use(errorHandler);

// Sync database
db.sequelize.sync().then(() => {
  console.log('Sync db successfully');
}).catch((err) => {
  console.log("Failed to sync db: ", err.message);
});

/**
 * Start server
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('*** Listening on ' + bind);
}
