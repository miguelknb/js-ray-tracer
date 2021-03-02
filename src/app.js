import {Render} from './renderer.js'
import * as alg from './library/vec3.js'
import {Vec3} from './library/vec3.js'
import {Scene} from './scene.js'
import {Camera} from './camera.js'
import {Sphere} from './primitives/sphere.js'
import {Material} from './primitives/material.js'
import { Light } from './primitives/light.js'

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

var cam = new Camera(400, 300, 90, 90);
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
//scene.addObject(sphere1);
//scene.addObject(sphere2);
scene.addLight(light1);
scene.addLight(light2);
scene.setAmbientLight(new Vec3(0.2, 0.2, 0.2));
scene.setBackgroundColor(new Vec3(0.2, 0.2, 0.2));
// scene.addObject(sphere2);



//Actual app code
var canvas;
var ctx;

let canvasWidth = 400;
let canvasHeight = 300;
let renderData;

function cleanElement(element) {
    while(element.firstChild){
        element.removeChild(element.lastChild)
    }
}


var createObjectForm = (objectType) => {
    //console.log(propertyContainer)
    var objFormProps = document.getElementById("objForm");
    var objProperties = document.createElement("div");
    objProperties.classList.add("objectPropertiesContainer");

    

    console.log(objFormProps)

    switch (objectType) {
        case 'sphere':
            cleanElement(objFormProps);
            var xinput = document.createElement("input");
            var yinput = document.createElement("input");
            var zinput = document.createElement("input");

            var radiusInput = document.createElement("input");

            xinput.classList.add("objectInput");
            yinput.classList.add("objectInput");
            zinput.classList.add("objectInput");
            radiusInput.classList.add("objectInput");

            xinput.name = "x";
            yinput.name = "y";
            zinput.name = "z";
            radiusInput.name = "radius";

            var xContainer = document.createElement("div");
            var yContainer = document.createElement("div");
            var zContainer = document.createElement("div");
            var radiusContainer = document.createElement("div");

            xContainer.classList.add("objectInputContainer");
            yContainer.classList.add("objectInputContainer");
            zContainer.classList.add("objectInputContainer");
            radiusContainer.classList.add("objectInputContainer");


            var xLabel = document.createElement("label");
            var yLabel = document.createElement("label");
            var zLabel = document.createElement("label");
            var radiusLabel = document.createElement("label");

            xLabel.setAttribute("for", "x")
            xLabel.appendChild(document.createTextNode("X"));
            yLabel.setAttribute("for", "y")
            yLabel.appendChild(document.createTextNode("Y"));
            zLabel.setAttribute("for", "z")
            zLabel.appendChild(document.createTextNode("Z"));
            radiusLabel.setAttribute("for", "radius");
            radiusLabel.appendChild(document.createTextNode("Radius"));


            //x
            xContainer.appendChild(xLabel);
            xContainer.appendChild(xinput);
            //y
            yContainer.appendChild(yLabel);
            yContainer.appendChild(yinput);
            //z
            zContainer.appendChild(zLabel);
            zContainer.appendChild(zinput);
            //radius
            radiusContainer.appendChild(radiusLabel);
            radiusContainer.appendChild(radiusInput);
            
            objProperties.appendChild(xContainer);
            objProperties.appendChild(yContainer);
            objProperties.appendChild(zContainer);
            objProperties.appendChild(radiusContainer);

            break;
        
        case 'box':
            cleanElement(objFormProps);

            var xminnput = document.createElement("input")
            var xmaxinput = document.createElement("input")

            var ymininput = document.createElement("input")
            var ymaxinput = document.createElement("input")
            
            objProperties.appendChild(xinput)



            break;

        case 'mesh':
            cleanElement(objFormProps);


            break;
    
        default:
            cleanElement(objFormProps);


            break;

        }
    
    objFormProps.appendChild(objProperties);
}


window.createObject = function() {
    var objForm = document.getElementById("objForm");
    var objList = document.getElementById("objectList");
    var newObjContainer = document.createElement("div")
    newObjContainer.classList.add("objectContainer");
    var objName = document.createElement("p");
    var typeForm = document.getElementById("typeForm")
    
    if (!typeForm.type || !objForm) {
        console.log('Sem type definido')
        return
    }

    var type = typeForm.type.value

    switch (type) {
        case 'sphere':
            var center = new Vec3(parseInt(objForm.x.value), parseInt(objForm.y.value), parseInt(objForm.z.value));
            var radius = objForm.radius.value;

            var name = "Sphere" + Math.floor(Math.random() * 10);  
            var newSphere = new Sphere(name, center, radius);
            newSphere.addMaterial(redMaterial); 

            console.log(newSphere)
            scene.addObject(newSphere);
            objName.appendChild(document.createTextNode(newSphere.name));
            newObjContainer.appendChild(objName);
            objList.appendChild(newObjContainer);

            
            break;

        case 'box':
            
            break;

        case 'mesh':
            
            break;
        
        
    
        default:
            break;
    }
    
    //cleanElement(objForm);
}

window.changeObjectInput = function(form) {
    console.log(form.type.value)
    createObjectForm(form.type.value);
}


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
    var objList = document.getElementById("visibleObjectList");
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