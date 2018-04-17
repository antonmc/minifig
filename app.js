/*eslint-env node*/

var express = require('express');
var cfenv = require('cfenv');

var minifig = require('./minifig');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use('/minifig', function(req, res, next) {

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  res.sendFile(__dirname + '/public/test.svg');

  console.log('called minifig')

})

minifig.makeSVG();


// start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });
