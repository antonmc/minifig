var minifig = require('./minifig');

var theme = { background:"#E5F5FB", colors:["#5ebd3e", "#ffb900", "#f78200", "#e23838", "#973999", "#009cdf"]}

minifig.makeSVG( function(svgtext){
  console.log(svgtext)
}, theme);
