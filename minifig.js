var concat = require('concat-files');
var fs = require('fs');

// paths for reading svg fragments

var folder = "frankenstein";

var body = "/body";
var hair = "/hair";
var face = "/face";

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

function createMiniFigure() {
  concat([
    prefix,
    style,
    base,
    face,
    hair,
    postfix
  ], 'public/test.svg', function(err) {
    if (err) throw err
    console.log('done');
  });
}



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


var hairstyles;
var faces;

var prefix = folder + body + "/prefix.svg";
var postfix = folder + body + "/postfix.svg";
var style = folder + body + "/style.svg";
var hair
var face
var base = folder + body + "/base.svg"

module.exports = {

  makeAvatar: function() {

    fs.readdir(folder + hair, (err, files) => {

      // count number of hairstyles

      hairstyles = files.length;
      console.log(hairstyles)

      // count number of faces

      fs.readdir(folder + face, (err, files) => {
        faces = files.length;

        // write the style file

        //  find random colors

        var randomHair = haircolors[getRandomInt(haircolors.length)]
        var randomSkin = skincolors[getRandomInt(skincolors.length)]
        var randomSweater = sweatercolors[getRandomInt(sweatercolors.length)]

        var styleblock = createStyle(randomSkin, randomHair, randomSweater)

        fs.writeFile(style, styleblock, function(err) {
          if (err) {
            return console.log(err);
          }

          // find a random hairstyle

          hair = folder + hair + "/hair" + getRandomInt(hairstyles) + ".svg"

          // find a random face

          face = folder + face + "/face" + getRandomInt(faces) + ".svg";

          createMiniFigure();

          console.log("Generated Style Data");
        });

      });
    });
  }
}
