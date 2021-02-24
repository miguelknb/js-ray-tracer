import * as alg from './library/vec3.js'
import {Vec3} from './library/vec3.js'
import {Ray} from './ray.js'

export class Camera {
    constructor(width, height, fov, focal_length) {
        this.width = width;
        this.height = height;
        this.fov = fov;
        this.focal_length = focal_length

        this.a = 2 * focal_length * Math.tan(Math.PI*fov/360);
        this.b = this.width * this.a / this.height

        this.xe = new Vec3(1, 0, 0);
        this.ye = new Vec3(0, 1, 0);
        this.ze = new Vec3(0, 0, 1);
    }

    setPosition(eye, center, up) {
        this.ze = alg.normalize(alg.subtract(center, eye));
        this.xe = alg.normalize(alg.cross(this.ze, up));
        this.ye = alg.cross(this.ze, this.xe);
        this.origin = eye;
    }

    shootRay(pixelX, pixelY) {
        var a = alg.scale(this.ze, this.focal_length);
        var b = alg.scale(this.ye, this.a*(pixelY/this.height-0.5));
        var c = alg.scale(this.xe, this.b * (pixelX/this.width-0.5));

        const direction = alg.add( alg.scale(this.ze, this.focal_length), 
                                   alg.add(alg.scale(this.ye, this.a*(pixelY/this.height-0.5) ), alg.scale(this.xe, this.b * (pixelX/this.width-0.5))));
        
        // console.log('a: ', a, 'b: ', b, 'c: ', c)
        return new Ray(this.origin, direction)
    }
}