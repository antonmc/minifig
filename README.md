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

var svgString = minifig.makeSVG();
var base64 = minifig.makeBase64();

```

**Note:**<br>
Install [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## Why Lodash?

Lodash makes JavaScript easier by taking the hassle out of working with arrays,<br>
numbers, objects, strings, etc. Lodash’s modular methods are great for:

 * Iterating arrays, objects, & strings
 * Manipulating & testing values
 * Creating composite functions
