export class Vec3 {
    constructor(p0, p1, p2) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
    }
}

export const add = (v1, v2) => {
    return new Vec3(v1.p0 + v2.p0, v1.p1 + v2.p1, v1.p2 + v2.p2);
}

export const subtract = (v1, v2) => {
    return new Vec3(v1.p0 - v2.p0, v1.p1 - v2.p1, v1.p2 - v2.p2);
}

export const scale = (v1, number) => {
    return new Vec3(v1.p0 * number, v1.p1 * number, v1.p2 * number);
}

export const length = (v1) => {
    return Math.hypot(v1.p0, v1.p1, v1.p2);
}

export const dot = (v1, v2) => {
    return ( (v1.p0 * v2.p0) + (v1.p1 * v2.p1) + (v1.p2 * v2.p2) );
}

export const normalize = (v1) => {
    return scale(v1, (1 / length(v1)));
}

export const cross = (v1, v2) => {
    return new Vec3(v1.p1 * v2.p2 - v1.p2 * v2.p1,
                    v1.p2 * v2.p0 - v1.p0 * v2.p2,
                    v1.p0 * v2.p1 - v1.p1 * v2.p0);
}