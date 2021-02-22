export var GenerateRandomColor = () => {
    let number = Math.floor(Math.random() * 256);
    console.log(number)
}

var RayColor = (ray, obj, distance, scene) => {
    if (!obj || !distance) {
        return scene.backgroundColor;
    }
}


export var Render = (canvas, ctx, scene, options) => {

    var width = canvas.width
    var height = canvas.height

    var buffer = new Uint8ClampedArray(width * height * 4);
    var idata = ctx.createImageData(width, height);
    
    var obj, distance = null;
    const camera = scene.camera;

    for (var y = 0; y < height; y++) {
        //for each line of pixels
        for (var x = 0; x < width; x++) {
            //for each pixel
            var pos = (y * width + x) * 4;

            var ray = camera.shootRay(x, y);

            var pixelColor = RayColor(ray, obj, distance, scene);

            buffer[pos] = pixelColor[0];              // some R value [0, 255]
            buffer[pos + 1] = pixelColor[1];          // some G value
            buffer[pos + 2] = pixelColor[2];          // some B value
            buffer[pos + 3] = 255;          // Alpha

        }
    }

    idata.data.set(buffer);

    ctx.putImageData(idata, 0, 0);

    var dataUri = canvas.toDataURL();
}
