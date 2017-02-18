var express = require('express');
var path = require('path');
const cors = require('cors');
const jwt = require('express-jwt');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./schemas/dbConnection');

 
var app = express();

app.use(cors());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: 'hMtXWh9av9AWqBJZfG2b5GouTuCeLksmXSvbVdf2YV5Sl9yBJnR6_rlXmkXBeSLS',
  audience: 'YC3FUClO463cLES8AT0V0QKdrv4lKGYi'
});
 
app.use(logger('dev'));
app.use(bodyParser.json());
 
app.all('/*', function(req, res, next) {
  console.log('getting request from client');
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
 
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.all('/api/v1/*', authCheck);
 
app.use('/', require('./routes'));
 
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// Start the server
app.set('port', process.env.PORT || 3000);
 
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
