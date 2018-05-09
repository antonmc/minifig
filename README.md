# minifig

Minifig is a random avatar generator that makes lego minifigure style avatars.

![Alt text](https://raw.githubusercontent.com/antonmc/minifig/HEAD/output.svg?sanitize=true)

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save minifig
```

In Node.js:
```js
var minifig = require('minifig');

var svgString;

minifig.makeSVG(function(stuff){
  svgString = stuff;
});

or

var theme = { background:"#E5F5FB", colors:["#5ebd3e", "#ffb900", "#f78200", "#e23838", "#973999", "#009cdf"]}

minifig.makeSVG(function(stuff){
  svgString = stuff;
}, theme);




```

## Why Minifig?

Have you ever needed a bunch of avatars for a mockup, or to randomly assign an avatar to a new user etc? Minifig has you covered ;)
