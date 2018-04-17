# minifig

Minifig is a random avatar generator that makes lego minifigure style avatars.

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

var base64String;

minifig.makeBase64(function(stuff){
  base64String = stuff;
});

```

## Why Minifig?

Have you ever needed a bunch of avatars for a mockup, or to randomly assign an avatar to a new user etc? Minifig has you covered ;)
