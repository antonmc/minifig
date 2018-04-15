/*eslint-env node*/

var express = require('express');
var cfenv = require('cfenv');
var fs = require('fs');
var concat = require('concat-files');


// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var folder = "frankenstein";

var body = "/body";
var hair = "/hair";
var face = "/face";

var prefix = folder + body + "/prefix.svg";
var postfix = folder + body + "/postfix.svg";
var style = folder + body + "/style.svg";
var hair = folder + hair + "/hair1.svg"
var base = folder + body + "/base.svg"

// write the style file

var styleblock = createStyle("#a67c52","#c7b299","#c3dbd4")

fs.writeFile(style, styleblock, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Generated Style Data");
});


// concatenate the minifig file


  concat([
    prefix,
    style,
    base,
    hair,
    postfix
  ], 'test.svg', function(err) {
    if (err) throw err
    console.log('done');
  });

  function createStyle(skincolor, haircolor, sweatercolor){

    var open = '<style type="text/css">\n'
    var background = '.background{fill:#F4F5F0;}\n'

    var skin = '.skin{fill:' + skincolor + ';stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n';
    var sweater = '.sweater{fill:' + sweatercolor + ';stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n';
    var hair = '.hair{fill:#42210B;}\n'

    var close = '</style>'

    var style = open + background + skin + sweater + hair + close;

    return style;
  }


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
