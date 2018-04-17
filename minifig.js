var concat = require('concat-files');
var fs = require('fs');
var base64Img = require('base64-img');

var destination = './output.svg';

// paths for reading svg fragments

var folder = "frankenstein";

var body = "/body";
var hair = "/hair";
var face = "/face";

var hairstyles;
var faces;

var prefix = folder + body + "/prefix.svg";
var postfix = folder + body + "/postfix.svg";
var style = folder + body + "/style.svg";
var hairfile;
var facefile;
var base = folder + body + "/base.svg"

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
  concat([
    prefix,
    style,
    base,
    facefile,
    hairfile,
    postfix
  ], destination, function(err) {
    if (err) throw err
    console.log('done');
    var s =  fs.readFileSync(destination).toString()
    callback(s)
  });
}

function getString(destination) {

  var data = fs.readFileSync(destination).toString();
  return data;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



module.exports = {

  makeSVG: function(call) {

    fs.readdir(folder + hair, (err, files) => {

      hairstyles = files.length;
      console.log(hairstyles)

      fs.readdir(folder + face, (err, files) => {
        faces = files.length;

        var randomHair = haircolors[getRandomInt(haircolors.length)]
        var randomSkin = skincolors[getRandomInt(skincolors.length)]
        var randomSweater = sweatercolors[getRandomInt(sweatercolors.length)]

        var styleblock = createStyle(randomSkin, randomHair, randomSweater)

        fs.writeFile(style, styleblock, function(err) {
          if (err) {
            return console.log(err);
          }

          // find a random hairstyle

          hairfile = folder + hair + "/hair" + getRandomInt(hairstyles) + ".svg"

          // find a random face

          facefile = folder + face + "/face" + getRandomInt(faces) + ".svg";

          var svg;

          var stuff = createMiniFigure(call);
          console.log("Generated Style Data");
        });
      });
    })
  },

  makeBase64:function(call){
    this.makeSVG(function(){
      var data = base64Img.base64Sync(destination);
      call(data)
    })
  }
}
