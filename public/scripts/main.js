var canvas = document.createElement('canvas');

canvas.id = "Screen"
canvas.width = 500;
canvas.height = 500;


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 50, 50);