export var GenerateRandomColor = () => {
    let number = Math.floor(Math.random() * 256); 
    console.log(number)   
}

export var Render = (canvas, ctx, initialColor, options) => {

    var width = canvas.width
    var height = canvas.height

    var buffer = new Uint8ClampedArray(width * height * 4);

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {

            var pos = (y * width + x) * 4;

            //randomColor
            if (initialColor) {

                buffer[pos] = initialColor[0];              // some R value [0, 255]
                buffer[pos + 1] = initialColor[1];          // some G value
                buffer[pos + 2] = initialColor[2];          // some B value
                buffer[pos + 3] = 255;
            }

            else {

                buffer[pos]     = 125 ;         // some R value [0, 255]
                buffer[pos + 1] = 125;          // some G value
                buffer[pos + 2] = 125;          // some B value
                buffer[pos + 3] = 255;
            }

        }
    }
    
    var idata = ctx.createImageData(width, height);

    idata.data.set(buffer);

    ctx.putImageData(idata, 0, 0);

    var dataUri = canvas.toDataURL();
}
