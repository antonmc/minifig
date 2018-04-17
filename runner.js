var minifig = require('./minifig');

minifig.makeSVG( function(svgtext){
  console.log(svgtext)
});

minifig.makeBase64( function(stuff){
  console.log(stuff)
});
