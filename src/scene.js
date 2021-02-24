export class Scene { 
    constructor() { 
        this.objects = [];
        this.lights = [];
        this.ambientLight = null;
    }

    setAmbientLight(ambientLight) {
        this.setAmbientLight = ambientLight; 
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    addLight(light) {
        this.lights.push(light);
    }

    setCamera(camera) {
        this.camera = camera;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    intercept(ray) {

        var nearestObject = null;
        var minDistance = Number.MAX_VALUE;
        let tempDistance;
        var hit;

        //Checking interception distances from all objects
        //If object is not intercepted, distance is infinity
        for (var i = 0; i < this.objects.length; i++) {
            
            tempDistance =  this.objects[i].interceptDistance(ray);

            if ( tempDistance && tempDistance < minDistance ) {
                minDistance = tempDistance;
                nearestObject =  this.objects[i]
                hit = true;
            }
        }

        const data = {
            object: nearestObject,
            distance: minDistance,
            hit: hit,
        }

        return data
        
    }

}