var concat = require('concat');
var fs = require('fs');
var path = require('path');
var base64Img = require('base64-img');

var destination = './output.svg';

// paths for reading svg fragments

var folder = path.join(__dirname, "frankenstein")

var callback;

var body = "/body";
var hair = "/hair";
var face = "/face";

var hairstyleCount;
var faceCount;

var prefix = folder + body + "/prefix.svg";
var postfix = folder + body + "/postfix.svg";
var style = folder + body + "/style.svg";
var hairfile;
var facefile;
var base = folder + body + "/base.svg"

var styleblock;

// style/color collections for skin, hair, clothes

var skincolors = ["#f9ac2f", "#a67c52"];
var haircolors = ["#754c24", "#c7b299", "#a54632", "#42210b"];
var sweatercolors = ["#f7cee0", "#c3dbd4", "#b61c50", "#6c4e79", "#223a5e", "#64bfa4", "#fe840e"];

function createStyle(skincolor, haircolor, sweatercolor) {

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

// concatenate the minifig file

function createMiniFigure(callback) {
  concat([prefix,
    style,
    base,
    facefile,
    hairfile,
    postfix
  ]).then(result => callback(result))
}

function getString(destination) {

  var data = fs.readFileSync(destination).toString();
  return data;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function buildSVG(data){
  var stuff = fs.readFileSync(prefix).toString()
  var firstblock = stuff.concat(styleblock);
  var svg = firstblock.concat(data);
  console.log(svg)
  callback(svg)
}

module.exports = {

  makeSVG: function(call) {

    callback = call;

    fs.readdir(folder + hair, (err, files) => {

      hairstyleCount = files.length;

      fs.readdir(folder + face, (err, files) => {

        faceCount = files.length;

        var randomHair = haircolors[getRandomInt(haircolors.length)]
        var randomSkin = skincolors[getRandomInt(skincolors.length)]
        var randomSweater = sweatercolors[getRandomInt(sweatercolors.length)]

        styleblock = createStyle(randomSkin, randomHair, randomSweater)

        // find a random hair and face

        hairfile = folder + hair + "/hair" + getRandomInt(hairstyleCount) + ".svg"
        facefile = folder + face + "/face" + getRandomInt(faceCount) + ".svg";

        concat([
          base,
          facefile,
          hairfile,
          postfix
        ]).then(result => buildSVG(result))
      });
    })
  },

  makeBase64: function(call) {
    this.makeSVG(function() {
      var data = base64Img.base64Sync(destination);
      call(data)
    })
  }
}
