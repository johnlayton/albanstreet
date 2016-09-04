//var five = require("johnny-five");

//var board = new five.Board();


//board.on("ready", function() {
//
//    var servo = new five.Servo({
//        pin: 8,
//        type: "continuous"
//    });
//
//    // Clockwise, top speed.
//    servo.cw(1);
//});

var five = require("johnny-five");
var keypress = require("keypress");

keypress(process.stdin);



var board = new five.Board();

board.on("ready", function () {

    console.log("Use Up and Down arrows for CW and CCW respectively. Space to stop.");

    var left = new five.Servo.Continuous(10).stop();
    var right = new five.Servo.Continuous(9).stop();

    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);

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
            left.stop();
            right.stop();
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
            if (i > 0) {
                left.cw(Math.abs(i) / 10);
            } else {
                left.ccw(Math.abs(i) / 10);
            }
            if (j > 0) {
                right.ccw(Math.abs(j) / 10);
            } else {
                right.cw(Math.abs(j) / 10);
            }
        }
    });
});
