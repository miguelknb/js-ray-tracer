
export class Hittable {
    constructor(name) {
        this.name = name;
        this.firstHit = true;
     }

    hit(x, y) {
        this.firstHit = false;
        this.firstHitPoint = [x, y];
    }

    intersect() { }

    addMaterial(material) {
        this.material = material;
    }
    
    getNormal() { }
    
}