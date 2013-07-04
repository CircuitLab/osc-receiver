
# osc-receiver

A tiny OSC message receiver.

## Installation

npm:

    $ npm install osc-receiver

## Usage

Example:

```js
var OscReceiver = require('osc-receiver')
  , receiver = new OscReceiver();

receiver.bind(9337);

receiver.on('/foo', function(a, b, c) {
  // do something.
});

receiver.on('/bar', function(x, y) {
  // do something.
});
```

## License

The MIT License

Copyright (c) 2013 Circuit Lab. &lt;info@uniba.jp&gt;