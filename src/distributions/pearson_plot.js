// This part provides resizing and hovering functionality for the Pearson plot.
// Its a little bit dirty, but I don't have a better solution yet.
var globalPearsonPlotReference = null, globalPearsonPlotResizeEventId;
window.onresize = function(){
    clearTimeout(globalPearsonPlotResizeEventId);
    globalPearsonPlotResizeEventId = setTimeout(function() {
        if(globalPearsonPlotReference != null) {
           globalPearsonPlotReference.plotChart();
        }
    }, 100);
};

class PearsonPlot {
    constructor(mainCanvas, config) {
        // Check if canvas object is available and valid 
        if(!(canvas instanceof HTMLCanvasElement)) {
           throw "Please provide a canvas.";
        }
        // Set attributes to this object
        var configAvailable = (config != null && config != undefined);
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d');
        this.dpiRatio = (configAvailable && "dpi_ratio" in config)?parseFloat(config.dpi_ratio):4;
        this.data = (configAvailable && "data" in config)?parseFloat(config.data):null;
        this.bootstrapSamples = (configAvailable && "bootstrap" in config)?parseFloat(config.bootstrap):0;
        this.method = (configAvailable && "method" in config && config.method == "sample")?"sample":"unbiased";
        // Create a buffer to improve performance on interaction
        this.bufferCanvas = document.createElement('canvas');
        // This attribut change the chart axis eg. h=19 is from 0 to 19-4 (15), w=29 is from 0 to 29-4 (25).
        // Since I do not plan to change this parameter, it is not tested for any case.
        this.hCells = (configAvailable && "hCells" in config)?parseFloat(config.hCells):19;
        this.wCells = (configAvailable && "wCells" in config)?parseFloat(config.wCells):29;
        // Add hover event listener for interactions
        mainCanvas.onmousemove = function(e) {
           globalPearsonPlotReference.interaction(e);
        };
        // Sets this object to a global reference as described at the beginning of the file
        globalPearsonPlotReference = this;
        // Start plotting
        this.plotChart();
    }

    drawPolygon = function(ctx, a, b, c, d, color, border = null) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.lineTo(c[0], c[1]);
        ctx.lineTo(d[0], d[1]);
        ctx.closePath();
        ctx.fill(); 
        if(border != null) {
            ctx.lineWidth = border.width;
            ctx.strokeStyle = border.color;
            ctx.stroke();
        }
        ctx.restore();
    }

    line(ctx, a, b, lineWidth, color, lineDash=null) {
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        if(lineDash != null) {
           ctx.setLineDash(lineDash);
        }
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
        ctx.restore();
    }

    drawText(ctx, text, a, fontStyle, rotate=0) {
        ctx.save();
        ctx.font = fontStyle;
        if(rotate != 0) {
           ctx.translate(a[0], a[1]);
           ctx.rotate(rotate);
           ctx.fillText(text, 0, 0);
        } else {
           ctx.fillText(text, a[0], a[1]);
        }
        ctx.restore();
    }

    drawCircle(ctx, center, radius, fillColor, border=null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        if(border != null) {
            ctx.lineWidth = border.width;
            ctx.strokeStyle = border.color;
            ctx.stroke();
        }
        ctx.restore();
    }

    coordinates(a, wCells, hCells, cellSize, marginLeft, marginTop) {
        return [
           (3 + a[0]) * cellSize + marginLeft,
           ((hCells - 3) - a[1]) * cellSize + marginTop
        ];
    }

    findMaxCoordinate(wCells, hCells, fkt, start=0, increment=1.0) {
        var valuePair = [], data = [];
        for(var i=start; (increment > 0.0)?i<=wCells:i>=0; i+=increment) {
           valuePair = fkt(i);
           if(valuePair[0] > wCells || valuePair[1] > hCells) {
               break;
           } else {
               data.push(valuePair);
           }
        }
        if((valuePair[1] * 1.05) > hCells) { // Prevent from float point artefacts
           data[data.length - 1] = [data[data.length - 1][0], hCells];
        }
        return data;
    }

    interaction(e) {
        // Get cursor position
        var rect = this.mainCanvas.getBoundingClientRect(),
            cursor = [(e.clientX - rect.left) * (this.mainCanvas.width / rect.width), 
                      (e.clientY - rect.top) * (this.mainCanvas.height / rect.height)];
        // Restore static background from buffer
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.drawImage(this.bufferCanvas, 0, 0);
        // Do interactive stuff (comming soon)
        this.drawCircle(this.mainCtx, [cursor[0],cursor[1]], 10, "red");
    }

    plotChart() {
        //// Setup
        // Create local var because I dont wanna use "this." every time...
        var canvas = this.bufferCanvas, ctx = canvas.getContext('2d'), hCells = this.hCells, wCells = this.wCells,
           polygon = this.drawPolygon, line = this.line, cicle = this.drawCicle, circle = this.drawCircle, text = this.drawText,
           coordinates = this.coordinates, findMaxCoordinate = this.findMaxCoordinate,
           dataAvailable = this.data != null; 
        // Change canvas DPI and size
        var rect = this.mainCanvas.getBoundingClientRect();
        this.mainCanvas.width = rect.width * this.dpiRatio;
        this.mainCanvas.height = rect.height * this.dpiRatio;
        var width = this.mainCanvas.width, height = this.mainCanvas.height;
        canvas.width = width;
        canvas.height = height;
        // Clear canves
        ctx.clearRect(0, 0,  width, height);
        // Calculate ratio
        var marginLeft = 0.0, marginTop = 0.0, cellSize = 0.0;
        if(width / height < wCells / hCells) {   // Width is boundary
           cellSize = (width / wCells);
           marginTop = (height - (hCells * cellSize)) / 2;
        } else {                              // Height is boundary
           cellSize = (height / hCells);
           marginLeft = (width - (wCells * cellSize)) / 2;
        }
        //// Draw areas of distribution types
        // Draw impossible area
        var a = coordinates([0, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        b = coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        c = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, x - 1];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop), 
        d = coordinates([0, hCells - 4],wCells,hCells,cellSize,marginLeft,marginTop);
        polygon(ctx, a, coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), c, d, "#e5e5ec");
        // Draw area (I)
        a = coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        b = coordinates([3, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        d = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, x - 1];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop), 
        c = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, (2/3) * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        polygon(ctx, a, b, c, d, "#fdbfe5");
        // Draw area (VI)
        var pointCollection = findMaxCoordinate(wCells - 4, hCells - 4, 
           function(x){
               x = Math.exp(x);
               return [3 * (x + 5) * (x - 2) / (x - 3) / (x - 4), 16 * (x - 2) / Math.pow(x - 3, 2)];
           }, Math.log(854.711383), -0.001);
        pointCollection.unshift([3,0]);
        a = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, (2/3) * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        for(var i=1; i<pointCollection.length; i++) {
           b = coordinates([pointCollection[i], pointCollection[i] / (2/3)],wCells,hCells,cellSize,marginLeft,marginTop); 
           polygon(ctx, a, coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop), coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop), b, "#faebb8");
        }
        // Draw area (IV)
        a = coordinates([3,0],wCells,hCells,cellSize,marginLeft,marginTop);
        b = coordinates([wCells - 4, 0],wCells,hCells,cellSize,marginLeft,marginTop);
        for(var i=1; i<pointCollection.length; i++) { // use points of IV
           d = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
           c = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
           polygon(ctx, a, b, c, d, "#ccfad6");
        }
        //// Draw lines of distribution types
        // Draw line (III)
        b = coordinates([3, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        c = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, (2/3) * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        line(ctx, b, c, cellSize * 0.1, "#fb84c4");
        // Draw lognormal line
        pointCollection = findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [Math.pow(x, 4) + 2 *Math.pow(x, 3) + 3 * Math.pow(x, 2) - 3, Math.pow(x + 2, 2) * (x - 1)];}, 1.0, 0.01);
        for(var i=1; i<pointCollection.length; i++) {
            a = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
            b = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
            line(ctx, a, b, cellSize * 0.1, "#bbbbbb", [15, 15]);
        }
        // Draw line (V)
        pointCollection = findMaxCoordinate(wCells - 4, hCells - 4, 
           function(x){
               x = Math.exp(x);
               return [3 * (x + 5) * (x - 2) / (x - 3) / (x - 4), 16 * (x - 2) / Math.pow(x - 3, 2)];
           }, Math.log(854.711383), -0.001);
        pointCollection.unshift([3,0]);
        for(var i=1; i<pointCollection.length; i++) {
            a = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
            b = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
            line(ctx, a, b, cellSize * 0.1, "#f5d97b");
        }
        //// Draw axis and legend
        // First remove chart outliers
        polygon(ctx, [0, 0], [marginLeft + (cellSize * 3), 0], [marginLeft + (cellSize * 3), height], [0, height], "#FFFFFF");
        polygon(ctx, [0, height], [width, height], [width, marginTop + ((hCells - 2) * cellSize) - cellSize], [0, marginTop + ((hCells - 2) * cellSize) - cellSize], "#FFFFFF");
        polygon(ctx, [width, 0], [width, height], [width - (marginLeft + cellSize), height], [width - (marginLeft + cellSize), 0], "#FFFFFF");
        polygon(ctx, [0, 0], [width, 0], [width, marginTop + cellSize], [0, marginTop + cellSize], "#FFFFFF");
        // Draw x-axis
        line(ctx, [marginLeft + (cellSize * 3), marginTop + cellSize], [marginLeft + (cellSize * 3), marginTop + ((hCells - 2) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        for(var i=1; i<=(hCells - 3); i++) {
           if(i != (hCells - 3)) {
               text(ctx, (((hCells - 3) - i)<10?"  ":"") + ((hCells - 3) - i), [marginLeft + (cellSize * 1.75), marginTop + (cellSize * (i + 0.25))], (cellSize * 0.7) + "px Arial");
           }
           line(ctx, [marginLeft + (cellSize * 2.7), marginTop + (cellSize * i)], [marginLeft + (cellSize * 3), marginTop + (cellSize * i)], cellSize * 0.05, "#aaaaaa");
        }
        // Draw y-axis
        line(ctx, [marginLeft + (cellSize * 3), marginTop + ((hCells - 2) * cellSize) - cellSize], [marginLeft + ((wCells * cellSize) - cellSize), marginTop + ((hCells - 2) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        for(var i=1; i<=(wCells - 3); i++) {
           if(i != 1) {
               text(ctx, (i<=9?" ":"") + (i - 1), [marginLeft + (cellSize * (1.63 + i)), marginTop + ((hCells - 1) * cellSize) - cellSize], (cellSize * 0.7) + "px Arial");
           }
           line(ctx, [marginLeft + (cellSize * (2 + i)), marginTop + ((hCells - 2) * cellSize) - cellSize], [marginLeft + (cellSize * (2 + i)), marginTop + ((hCells - 1.7) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        }
        text(ctx, "0", [marginLeft + (cellSize * 2.15), marginTop + ((hCells - 1.05) * cellSize) - cellSize], (cellSize * 0.7) + "px Arial");
        // Draw legends
        text(ctx, "SKEWNESS (β1)", [marginLeft + cellSize, marginTop + (((hCells / 2) + 4) * cellSize) - cellSize], "bold " + cellSize + "px Arial", -Math.PI/2);
        text(ctx, "KURTOSIS (β2)", [marginLeft + ((wCells / 2) - 2) * cellSize, marginTop + ((hCells + 0.5) * cellSize) - cellSize], "bold " + cellSize + "px Arial");
        //// Draw distribution labels
        text(ctx, "U", coordinates([1.6, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "N", coordinates([2.8, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "E", coordinates([8.8, 4],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "L", coordinates([4, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "t", coordinates([12, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "impossible", coordinates([3, 8],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "beta", coordinates([10, 7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "beta prime, F", coordinates([15.85, 7.75],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        text(ctx, "gamma", coordinates([11.25, 5.5],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.6);
        text(ctx, "lognormal", coordinates([14, 5.3],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.4);
        text(ctx, "inverse gamma", coordinates([16.5, 5.3],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.3);
        text(ctx, "(I)", coordinates([10.4, 6.5],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(II)", coordinates([2.05, 0.07],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(III)", coordinates([13, 7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(IV)", coordinates([15, 2],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(V)", coordinates([20.8, 6.7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(VI)", coordinates([17, 7.2],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        text(ctx, "(VII)", coordinates([12.3, 0.07],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        //// Draw distribution labels description
        var expandBorder = dataAvailable?1.2:0;
        polygon(ctx, [marginLeft + (cellSize * 3.5), marginTop + (cellSize * 1.5)], [marginLeft + (cellSize * 3.5), marginTop + (cellSize * (4 + expandBorder))], 
                     [marginLeft + (cellSize * 8.5), marginTop + (cellSize * (4 + expandBorder))], [marginLeft + (cellSize * 8.5), marginTop + (cellSize * 1.5)], "#e5e5ec", {"color": "#333333", "width": 3});
        text(ctx, "U - uniform", [marginLeft + (cellSize * 3.9), marginTop + (cellSize * 1.7) + (cellSize * 0.6)], "bold " + (cellSize * 0.6) + "px Arial");
        text(ctx, "N - normal", [marginLeft + (cellSize * 3.9), marginTop + (cellSize * 2.3) + (cellSize * 0.6)], "bold " + (cellSize * 0.6) + "px Arial");
        text(ctx, "E - exponential", [marginLeft + (cellSize * 3.9), marginTop + (cellSize * 2.9) + (cellSize * 0.6)], "bold " + (cellSize * 0.6) + "px Arial");
        if(dataAvailable) {
            text(ctx, "Observation", [marginLeft + (cellSize * 3.9), marginTop + (cellSize * 3.5) + (cellSize * 0.6)], "bold " + (cellSize * 0.6) + "px Arial");
            circle(ctx, [marginLeft + (cellSize * 8), marginTop + (cellSize * 3.35) + (cellSize * 0.6)], cellSize * 0.2, "#00008b");
            text(ctx, "Bootstrapped", [marginLeft + (cellSize * 3.9), marginTop + (cellSize * 4.1) + (cellSize * 0.6)], "bold " + (cellSize * 0.6) + "px Arial");
            circle(ctx, [marginLeft + (cellSize * 8.2), marginTop + (cellSize * 3.85) + (cellSize * 0.6)], cellSize * 0.05, "#fea500");
            circle(ctx, [marginLeft + (cellSize * 8), marginTop + (cellSize * 3.95) + (cellSize * 0.6)], cellSize * 0.05, "#fea500");
            circle(ctx, [marginLeft + (cellSize * 8.1), marginTop + (cellSize * 4.1) + (cellSize * 0.6)], cellSize * 0.05, "#fea500");
        }
        //// Plot observation and bootstrapped values
        if(dataAvailable) {
            var momentFunction = function(data, k) {
                    var mean = SMathJsUtils.mean(data), sum = 0.0, n = data.length;
                    for(var i=0; i<n; i++) {
                        sum += Math.pow(data[i] - mean, k);
                    }
                    return sum / n;
                },
                skewnessFunction = null, kurtosisFunction = null;
            if(this.method == "sample") {
                skewnessFunction = function(data) {
                    return momentFunction(data, 3) / Math.pow(Math.sqrt(momentFunction(data, 2)), 3);
                };
                kurtosisFunction = function(data) {
                    return momentFunction(data, 4) / Math.pow(momentFunction(data, 2), 2);
                };
            } else { // unbiased estimation (Fisher 1930)
                skewnessFunction = function(data) {
                    var n = data.length;
                    return Math.sqrt(n * (n - 1)) * (momentFunction(data, 3) / Math.pow(Math.sqrt(momentFunction(data, 2)), 3)) / (n - 2);
                };
                kurtosisFunction = function(data) {
                    var n = data.length;
                    return (n - 1) / ((n - 2) * (n - 3)) * ((n + 1) * (momentFunction(data, 4) / Math.pow(momentFunction(data, 2), 2)) - 3 * (n - 1)) + 3;
                };
            }
            var kurtosis = kurtosisFunction(data), skewness = skewnessFunction(data);
            circle(ctx, coordinates([kurtosis, skewness],wCells,hCells,cellSize,marginLeft,marginTop), cellSize * 0.2, "#00008b");
        }
        //// Draw buffer- to main-canvas
        this.mainCtx.drawImage(this.bufferCanvas, 0, 0);
    }
}
