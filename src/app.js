import {Render, GenerateRandomColor} from './renderer.js'

var canvas;
var ctx;

let canvasWidth = 800;
let canvasHeight = 400;


function randomCanvas() {
    var color = [Math.floor(Math.random() * 256) , Math.floor(Math.random() * 256),  Math.floor(Math.random() * 256) ];
    console.log(color)
    Render(canvas, ctx, color);
}

window.setDimensions =function(form) {
    if (form.width.value > 0 && form.height.value > 0) {
        console.log(form.height.value)
        canvasHeight = form.height.value;
        canvasWidth = form.width.value;
    }
}

window.randomColor = function randomColor() {
    randomCanvas();
}

window.redClearColor = function () {
    Render(canvas, ctx, [255, 0, 0]);
}

window.greenClearColor = function () {
    Render(canvas, ctx, [0, 255, 0]);
}

window.blueClearColor = function () {
    Render(canvas, ctx, [0, 0, 255]);
}

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var color = null;
    
    Render(canvas, ctx, color);
}