export class Scene { 
    constructor() { 
        this.objects = [];
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
        var distances = [];
        var nearestObject = null
        var minDistance = Number.MAX_VALUE;

        //Checking interception distances from all objects
        //If object is not intercepted, distance is infinity
        for (var i = 0; i < this.objects.length; i++) {

            distances.push(this.objects[i].interceptDistance(ray));

            //TODO Reduzir função em apenas 1 for
        }
        for (var j = 0; j < distances.length; j++) {
            if ( distances[j] && distances[j] < minDistance) {
                minDistance = distances[j];
                nearestObject = this.objects[j];
            } 
        }

        const data = {
            object: nearestObject,
            distances: minDistance
        }

        return data
        
    }

}