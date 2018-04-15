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

var skincolors = [ "#f9ac2f", "#a67c52" ];
var haircolors = [ "#754c24", "#c7b299", "#a54632", "#42210b"];
var sweatercolors = ["#f7cee0","#c3dbd4","#b61c50","#6c4e79", "#223a5e","#64bfa4", "#fe840e"];

var body = "/body";
var hair = "/hair";
var face = "/face";

var prefix = folder + body + "/prefix.svg";
var postfix = folder + body + "/postfix.svg";
var style = folder + body + "/style.svg";
var hair = folder + hair + "/hair" + getRandomInt(3) + ".svg"
var face = folder + face + "/face0.svg";
var base = folder + body + "/base.svg"

// write the style file

var randomHair = haircolors[getRandomInt(haircolors.length)]
var randomSkin = skincolors[getRandomInt(skincolors.length)]
var randomSweater = sweatercolors[getRandomInt(sweatercolors.length)]

var styleblock = createStyle(randomSkin, randomHair, randomSweater)

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
    face,
    hair,
    postfix
  ], 'test.svg', function(err) {
    if (err) throw err
    console.log('done');
  });




  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function createStyle(skincolor, haircolor, sweatercolor){

    var open = '<style type="text/css">\n'
    var background = '.background{fill:#F4F5F0;}\n'

    var skin = '.skin{fill:' + skincolor + ';stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n';
    var sweater = '.sweater{fill:' + sweatercolor + ';stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n';
    var hair = '.hair{fill:' + haircolor + ';}\n'

    var eyes = '.eyes{stroke:#000000;stroke-width:2;stroke-miterlimit:10;}\n';
  	var mouth = '.mouth{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n';

    var close = '</style>'

    var style = open + background + skin + sweater + eyes + mouth + hair + face + close;

    return style;
  }


// start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });
