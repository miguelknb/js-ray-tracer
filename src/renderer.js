import * as alg from './library/vec3.js'

var RayColor = (ray, rayData, scene) => {

    var object = rayData.object;
    var distanceToObject = rayData.distance;

    var ks =    object.material.specular;
    var kd =    object.material.diffuse;
    var ka =    scene.ambientLight ? scene.ambientLight : object.material.ambient;
    var alpha = object.material.shininess;
    
    var hitPoint = alg.add(ray.origin, alg.scale(ray.direction, distanceToObject));

    //todo Texture check

    var color = new alg.Vec3(0, 0, 0);

    var shadow = 1;

    var surfaceNormal = alg.normalize(object.getNormal(hitPoint));

    //biased optional
    var biasedPoint = alg.add(hitPoint, surfaceNormal);

    
    //TODO iterate lights
    var light = scene.lights[0];
    //

    var lightDirection = alg.normalize(alg.subtract(light.position, biasedPoint));
    
    
    //TODO add reflection
    var lightDistance = alg.norm(alg.subtract(light.position, hitPoint)) //biased point???
    
    //nextObj
    
    var cameraDirection = alg.normalize(alg.subtract(ray.origin, hitPoint));
    
    //Phong illumination model
    
    var Rm = alg.subtract( alg.scale(surfaceNormal, (2 * alg.dot(lightDirection, surfaceNormal) )), lightDirection );
    
    //Diffuse light
    var diffusePart = alg.scale(kd, alg.dot(alg.normalize(lightDirection), surfaceNormal))
    color = alg.add(color, alg.multiply(light.diffuse, diffusePart))
    
    //Specular Light
    color = alg.add(color, alg.scale(alg.multiply(light.specular, ks), alg.dot(Rm, cameraDirection) ** alpha));

    //Apply shadow
    color = alg.scale(color, shadow);
    
    //end light iteration

    color = alg.add(color, alg.multiply(ka, light.ambient));
    
    color = alg.clip(color, 0, 1)
    
    var finalColor = alg.round(alg.scale(color, 255));
    
    //console.log(finalColor)

    return finalColor;

}


export var Render = (canvas, ctx, scene, options) => {

    var width = canvas.width
    var height = canvas.height

    var buffer = new Uint8ClampedArray(width * height * 4);
    var idata = ctx.createImageData(width, height);
    
    var visibleObjects = [];

    const camera = scene.camera;

    for (var y = 0; y < height; y++) {
        //for each line of pixels
        for (var x = 0; x < width; x++) {
            //for each pixel
            var pos = (y * width + x) * 4;

            var ray = camera.shootRay(x, y);

            let data = scene.intercept(ray);

            //if (data.hit) console.log('a',data);

            let rayData = {
                hit : data.hit,
                finalColor: scene.backgroundColor,
                object : data.object,
                distance: data.distance,
                reflectedRay : null
            }
            
            if (rayData.object && rayData.hit) {
                //ray hit object
                //console.log(rayData)
                //break;

                if  (rayData.object.firstHit) {
                    //first hit on object
                    console.log('oi');
                    rayData.object.hit(x, y);
                    visibleObjects.push(rayData.object);
                }
                
                rayData.finalColor = RayColor(ray, rayData, scene);
            }

            buffer[pos] = rayData.finalColor.p0;         // some R value [0, 255]
            buffer[pos + 1] = rayData.finalColor.p1;     // some G value
            buffer[pos + 2] = rayData.finalColor.p2;     // some B value
            buffer[pos + 3] = 255;                       // Alpha

        }
    }

    console.log(visibleObjects)

    idata.data.set(buffer);

    ctx.putImageData(idata, 0, 0);

    var dataUri = canvas.toDataURL();
}
