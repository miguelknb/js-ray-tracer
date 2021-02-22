import {Render, GenerateRandomColor} from './renderer.js'
import * as alg from './vec3.js'
import {Vec3} from './vec3.js'
import {Scene} from './scene.js'
import {Camera} from './camera.js'
import {Sphere} from './primitives/sphere.js'



//testing vec3
var v1 = new Vec3(1, 1, 1);
// var v2 = new Vec3(2, 2, 2);

// console.log(alg.add(v1,v2));
// console.log(alg.subtract(v2,v1));
// console.log(alg.scale(v1,2))
// console.log(alg.length(v1));
// console.log(alg.dot(new Vec3(1, 2, 3), new Vec3(1, 5, 7)));
// console.log(alg.cross( new Vec3(1, 2, 2), new Vec3(2, 1, 1)))
//
//console.log(alg.square(new Vec3(1, 2, 3)))
//test camera



var cam = new Camera(300, 300, 90, 30);
var eye = new Vec3(100, 40, 40);
var center = new Vec3(0, 0, 0);
var up = new Vec3(0, 1, 0);

cam.setPosition(eye, center, up)

var ray = cam.shootRay(200, 200);

console.log(ray)

const options = {
    initialColor : [Math.floor(Math.random() * 256) , Math.floor(Math.random() * 256),  Math.floor(Math.random() * 256) ]
}

let scene = new Scene();

var sphere1 = new Sphere(new Vec3(0, 20, 0), 25);

var sphere2 = new Sphere(new Vec3(90, 10, 0), 25);

scene.setBackgroundColor([105, 105, 105]);
scene.setCamera(cam);
scene.addObject(sphere1);
scene.addObject(sphere2);


//Actual usable code
var canvas;
var ctx;

let canvasWidth = 800;
let canvasHeight = 400;

window.setDimensions = function(form) {
    if (form.width.value > 0 && form.height.value > 0) {
        console.log(form.height.value)
        canvasHeight = form.height.value;
        canvasWidth = form.width.value;
    }
}

window.render = function () {
    Render(canvas, ctx, scene, options);
}

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}