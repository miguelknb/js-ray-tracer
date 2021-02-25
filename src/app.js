import {Render} from './renderer.js'
import * as alg from './library/vec3.js'
import {Vec3} from './library/vec3.js'
import {Scene} from './scene.js'
import {Camera} from './camera.js'
import {Sphere} from './primitives/sphere.js'
import {Material} from './primitives/material.js'
import { Light } from './primitives/light.js'


var clipColor = (number) => {
    if (number > 1) {
        number = 1;
    }
    if (number < 0) {
        number = 0;
    }

    return number;
}

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
//console.log(alg.addNumber(new Vec3(1, 2, 3), 2));

//console.log( alg.scale( new Vec3(255, 0, 0), 1/255));
//test camera

var cam = new Camera(800, 600, 90, 90);
var eye = new Vec3(0, 0, -50);
var center = new Vec3(0, 0, 0);
var up = new Vec3(0, 1, 0);

cam.setPosition(eye, center, up)

let scene = new Scene();


let sphere1 = new Sphere('Esfera 1', new Vec3(-30, 0, 10), 20);
let sphere2 = new Sphere('Esfera 2', new Vec3(30, 0, 10), 25);


// var sphere2 = new Sphere(new Vec3(90, 10, 0), 25);

var light1 = new Light(new Vec3(40, 20, -40), new Vec3(1,1,1), new Vec3(1,1,1), new Vec3(1,1,1));

var light2 = new Light(new Vec3(20, 20, -40), new Vec3(1,1,1), new Vec3(1,1,1), new Vec3(1,1,1));

var redMaterial = new Material( new Vec3(0.2, 0.0, 0.0), new Vec3(0.8, 0.0, 0.0), new Vec3(1, 1, 1), 100, 0);
var blueMaterial = new Material( new Vec3(0.0, 0.0, 0.3), new Vec3(0.0, 0.0, 0.8), new Vec3(1, 1, 1), 100, 0);

sphere1.addMaterial(redMaterial);
sphere2.addMaterial(blueMaterial);

scene.setCamera(cam);
scene.addObject(sphere1);
scene.addObject(sphere2);
scene.addLight(light1);
scene.addLight(light2);
scene.setAmbientLight(new Vec3(0.2, 0.2, 0.2));
scene.setBackgroundColor(new Vec3(0.2, 0.2, 0.2));
// scene.addObject(sphere2);



//Actual app code
var canvas;
var ctx;

let canvasWidth = 800;
let canvasHeight = 600;
let renderData;


window.setSphere = function(form) {
    var newPos = new Vec3(parseInt(form.x.value), parseInt(form.y.value), parseInt(form.z.value)) 
    sphere1.setPosition(newPos);
    console.log(sphere1)
}

window.setDimensions = function(form) {
    if (form.width.value > 0 && form.height.value > 0) {
        console.log(form.height.value)
        canvasHeight = form.height.value;
        canvasWidth = form.width.value;
    }
}

window.render = function () {
    renderData = Render(canvas, ctx, scene);
    var objList = document.getElementById("ObjectList");
    objList.style.display = "flex";
    objList.style.flexDirection = "column"; 

    for(var i = 0; i < renderData.visibleObjects.length; i++ ) {
        var textnode = document.createTextNode(renderData.visibleObjects[i].name)
        var objName = document.createElement("P")
        objName.appendChild(textnode)
        objList.appendChild(objName)
        //objList.appendChild(textnode);
        
    }
    //document.getElementById("ObjectList").append(objList);
}


window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}