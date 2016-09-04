'use strict';

var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");

//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
    host: '192.168.4.1',
    type: 'udp4',
    port: 1025
});

////use the serial port to send a command to a remote firmata(arduino) device
//board.on("ready", function () {
//
//  console.log("Use Up and Down arrows for CW and CCW respectively. Space to stop.");
//
//  var left = new five.Servo.Continuous(10).stop();
//  var right = new five.Servo.Continuous(9).stop();
//
//  process.stdin.resume();
//  process.stdin.setEncoding("utf8");
//  process.stdin.setRawMode(true);
//
//  var i = 0;
//  var j = 0;
//
//  process.stdin.on("keypress", function (ch, key) {
//
//    if (!key) {
//      return;
//    }
//
//    if (key.name === "q") {
//      console.log("Quitting");
//      process.exit();
//    } else if (key.name === "space") {
//      console.log("Stopping");
//      left.stop();
//      right.stop();
//      i = 0;
//      j = 0;
//    } else {
//      if (key.name === "r") {
//        i++;
//      } else if (key.name === "f") {
//        i--;
//      }
//      if (key.name === "u") {
//        j++;
//      } else if (key.name === "h") {
//        j--;
//      }
//      if (i > 0) {
//        left.cw(Math.abs(i) / 10);
//      } else {
//        left.ccw(Math.abs(i) / 10);
//      }
//      if (j > 0) {
//        right.ccw(Math.abs(j) / 10);
//      } else {
//        right.cw(Math.abs(j) / 10);
//      }
//    }
//  });
//});


var io = new firmata.Board(sp);
io.once('ready', function () {
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function () {

        console.log('five ready');

        var left = new five.Servo.Continuous(10).stop();
        var right = new five.Servo.Continuous(9).stop();

        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        process.stdin.setRawMode(true);

        var led = new five.Led(13);
        led.strobe(1000, function () {
        });

        var i = 0;
        var j = 0;

        process.stdin.on("keypress", function (ch, key) {

            if (!key) {
                return;
            }

            if (key.name === "q") {
                console.log("Quitting");
                process.exit();
            } else if (key.name === "space") {
                console.log("Stopping");
                //left.stop();
                //right.stop();
                i = 0;
                j = 0;
            } else {
                if (key.name === "r") {
                    i++;
                } else if (key.name === "f") {
                    i--;
                }
                if (key.name === "u") {
                    j++;
                } else if (key.name === "h") {
                    j--;
                }
                if (i == 0) {
                    left.ccw(0);
                }
                else if (i > 0) {
                    left.cw(Math.abs(i) / 10);
                } else {
                    left.ccw(Math.abs(i) / 10);
                }
                if (j == 0) {
                    right.ccw(0);
                }
                else if (j > 0) {
                    right.ccw(Math.abs(j) / 10);
                } else {
                    right.cw(Math.abs(j) / 10);
                }
            }
        });


        //  console.log('five ready');
        //  //Full Johnny-Five support here:
        //
        //  var red = new five.Led(8);
        //  var yel = new five.Led(12);
        //  //led.strobe( 1000, function() {  });
        //
        //  var ping = new five.Proximity({
        //    controller: "HCSR04",
        //    pin: 7
        //  });
        //
        //  //var ping = new five.Ping(7);
        //  ping.on("change", function( err, value ) {
        //
        //    console.log( this.cm );
        //
        //    if ( this.cm < 15 ) {
        //      red.on();
        //    } else {
        //      red.off();
        //    }
        //
        //    if ( this.cm < 20 ) {
        //      yel.on();
        //    } else {
        //      yel.off();
        //    }
        //  });
        //
    });
});