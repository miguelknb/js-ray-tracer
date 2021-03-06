import {Hittable} from './hittable.js'
import * as alg from '../library/vec3.js'
export class Sphere extends Hittable {
    constructor(name, center, radius) {
        super(name);
        this.center = center;
        this.radius = radius;
    }

    interceptDistance(ray) {
        var originCenter = alg.subtract(ray.origin, this.center);
        
        var a = alg.sum( alg.square(ray.direction));
        var b = 2 * alg.dot(ray.direction, originCenter); 
        var c = alg.dot(originCenter, originCenter) - this.radius * this.radius;

        var delta = b * b - 4*a*c;

        if (delta >= Number.EPSILON) {
            var delta_sqrt = Math.sqrt(delta);

            var t1 = (-b + delta_sqrt) / (2*a);
            var t2 = (-b - delta_sqrt) / (2*a);
            return Math.min(t1, t2);
        }
        return Number.MAX_VALUE;
    }

    getNormal(point) {
        return alg.normalize(alg.subtract(point, this.center));
    }

    setPosition(newPos) {
        this.center.p0 = newPos.p0
        this.center.p1 = newPos.p1
        this.center.p2 = newPos.p2
    }
}