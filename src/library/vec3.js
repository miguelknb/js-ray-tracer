export class Vec3 {
    constructor(p0, p1, p2) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
    }

    toArray() {
        return [this.p0, this.p1, this.p2];
    }
}

var clipNumber = (number, min, max) => {
    if (number > max) {
        number = max;
    }
    if (number < min) {
        number = min;
    }

    return number;
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

export const sum = (v1) => {
    return v1.p0 + v1.p1 + v1.p2;
}

export const square = (v1) => {
    return new Vec3(v1.p0 * v1.p0, v1.p1 * v1.p1, v1.p2 * v1.p2);
}

export const norm = (v1) => {
    var squared = square(v1);
    return new Vec3(Math.sqrt(squared.p0), Math.sqrt(squared.p1), Math.sqrt(squared.p2));
}

export const addNumber = (v1, number) => {
    return new Vec3(v1.p0 + number, v1.p1 + number, v1.p2 + number);
}

export const multiply = (v1, v2) => {
    return new Vec3(v1.p0 * v2.p0, v1.p1 * v2.p1, v1.p2 * v2.p2);
}

export const round = (v1) => {
    return new Vec3(Math.round(v1.p0), Math.round(v1.p1), Math.round(v1.p2));
}

export const clip = (v1, min, max) => {
    return new Vec3(clipNumber(v1.p0, min, max), clipNumber(v1.p1, min, max), clipNumber(v1.p2, min, max) );
}