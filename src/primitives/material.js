import * as alg from '../library/vec3.js'

export class Material {
    constructor(ambient, diffuse, specular, shininess, reflection) {
        this.ambient = ambient
        this.diffuse = diffuse
        this.specular = specular
        this.shininess = shininess
        this.reflection = reflection
    }
}