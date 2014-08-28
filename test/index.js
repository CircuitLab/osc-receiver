
var assert = require('better-assert');
var dgram = require('dgram');
var osc = require('osc-min');
var sock = dgram.createSocket('udp4');

describe('osc-receiver', function() {
  var OscReceiver = require('..');

  it('should expose OscReceiver constructor', function() {
    assert('function' === typeof OscReceiver);
    assert('OscReceiver' === OscReceiver.name);
  });

  describe('OscReceiver', function() {
    var receiver = new OscReceiver();

    receiver.bind(32000);

    it('receive /foo', function(done) {
      receiver.once('/foo', function(a, b) {
        assert(a === 1);
        assert(b === 2);

        done();
      });

      setImmediate(function() {
        var message = osc.toBuffer({ address: '/foo', args: [1, 2] });
        sock.send(message, 0, message.length, 32000);
      });
    });

    it('receive /bar', function(done) {
      receiver.once('/bar', function(x, y) {
        assert('hello' === x);
        assert('world' === y);

        done();
      });

      setImmediate(function() {
        var message = osc.toBuffer({ address: '/bar', args: ['hello', 'world'] });
        sock.send(message, 0, message.length, 32000);
      });
    });

    it('handles all message', function(done) {
      receiver.on('message', function() {
        assert('/baz' === arguments[0]);
        assert(1 === arguments[1]);
        assert(2 === arguments[2]);
        done();
      });

      setImmediate(function() {
        var message = osc.toBuffer({ address: '/baz', args: [1, 2] });
        sock.send(message, 0, message.length, 32000);
      });
    });
  });
});
