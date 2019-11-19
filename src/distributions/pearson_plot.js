class PearsonPlot {
    constructor(canvas, dpiRatio=4) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpiRatio = dpiRatio;
        // Interaction (Maybe implemented soon)
        /*
        canvas.onmousemove = function(e) {
            var r = canvas.getBoundingClientRect(),
                x = e.clientX - r.left, y = e.clientY - r.top;
            //plot(); <--- Reference not possible 
        };
        */
    }
    
    plotPearsonChart() {
        // Because I dont wanna use "this." every time...
        var ctx = this.ctx, canvas = this.canvas,
            hCells = 19, wCells = 29; 
        // Draw polygon
        var polygon = function(ctx, a, b, c, d, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.lineTo(c[0], c[1]);
            ctx.lineTo(d[0], d[1]);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        // Draw line
        var drawLine = function(ctx, a, b, lineWidth, color, lineDash=null){
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
        // Write text
        var write = function(text, a, fontStyle, rotate=0) {
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
        // Calculate diagram coordinates
        var coordinates = function(a, wCells, hCells, cellSize, marginLeft, marginTop) {
            return [
                (3 + a[0]) * cellSize + marginLeft,
                ((hCells - 3) - a[1]) * cellSize + marginTop
            ];
        }
        // Find max coordinate
        var findMaxCoordinate = function(wCells, hCells, fkt, start=0, increment=1.0) {
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
        // Change DPI
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * this.dpiRatio;
        canvas.height = rect.height * this.dpiRatio;
        var width = canvas.width, height = canvas.height;
        // Clear canves
        ctx.clearRect(0, 0,  width, height);
        // Calculate ratio
        var marginLeft = 0.0, marginTop = 0.0, cellSize = 0.0;
        if(width / height < wCells / hCells) {   // Width is boundary
            cellSize = (width / wCells);
            marginTop = (height - (hCells * cellSize)) / 2;
        } else {                                 // Height is boundary
            cellSize = (height / hCells);
            marginLeft = (width - (wCells * cellSize)) / 2;
        }
        // Draw impossible area
        var a = coordinates([0, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
            b = coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
            c = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, x - 1];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop), 
            d = coordinates([0, hCells - 4],wCells,hCells,cellSize,marginLeft,marginTop);
        polygon(ctx, a, coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), c, d, "#e5e5ec");
        drawLine(ctx, b, c, cellSize * 0.1, "#c9c9c9");
        // Draw beta area
        a = coordinates([1, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        b = coordinates([3, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        d = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, x - 1];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop), 
        c = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, 0.66666666666666666666666666666666 * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        polygon(ctx, a, b, c, d, "#fdbfe5");
        drawLine(ctx, b, c, cellSize * 0.1, "#fb84c4");
        // Draw  gamma
        a = coordinates([3, 0],wCells,hCells,cellSize,marginLeft,marginTop), 
        b = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, 0.66666666666666666666666666666666 * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        drawLine(ctx, a, b, cellSize * 0.1, "#fb84c4");
        // Draw beta prime (VI)
        var pointCollection = findMaxCoordinate(wCells - 4, hCells - 4, 
            function(x){
                x = Math.exp(x);
                return [3 * (x + 5) * (x - 2) / (x - 3) / (x - 4), 16 * (x - 2) / Math.pow(x - 3, 2)];
            }, Math.log(854.711383), -0.001);
        pointCollection.unshift([3,0]);
        a = coordinates(findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [x, 0.66666666666666666666666666666666 * x - 2];}).pop(),wCells,hCells,cellSize,marginLeft,marginTop);
        for(var i=1; i<pointCollection.length; i++) {
            b = coordinates([pointCollection[i], pointCollection[i] / 0.66666666666666666666666666666666],wCells,hCells,cellSize,marginLeft,marginTop); 
            polygon(ctx, a, coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop), coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop), b, "#faebb8");
        }
        for(var i=1; i<pointCollection.length; i++) {
            a = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
            b = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
            drawLine(ctx, a, b, cellSize * 0.1, "#f5d97b");
        }
        // Draw IV
        a = coordinates([3,0],wCells,hCells,cellSize,marginLeft,marginTop);
        b = coordinates([wCells - 4, 0],wCells,hCells,cellSize,marginLeft,marginTop);
        for(var i=1; i<pointCollection.length; i++) { // use points of IV
            d = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
            c = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
            polygon(ctx, a, b, c, d, "#ccfad6");
        }
        // Draw lognormal
        pointCollection = findMaxCoordinate(wCells - 4, hCells - 4, function(x){return [Math.pow(x, 4) + 2 *Math.pow(x, 3) + 3 * Math.pow(x, 2) - 3, Math.pow(x + 2, 2) * (x - 1)];}, 1.0, 0.01);
        for(var i=1; i<pointCollection.length; i++) {
            a = coordinates(pointCollection[i - 1],wCells,hCells,cellSize,marginLeft,marginTop);
            b = coordinates(pointCollection[i],wCells,hCells,cellSize,marginLeft,marginTop);
            drawLine(ctx, a, b, cellSize * 0.1, "#bbbbbb", [15, 15]);
        }
        // Draw x-axis and y-axis
        drawLine(ctx, [marginLeft + (cellSize * 3), marginTop + cellSize], [marginLeft + (cellSize * 3), marginTop + ((hCells - 2) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        for(var i=1; i<=(hCells - 3); i++) {
            if(i != (hCells - 3)) {
                write((((hCells - 3) - i)<10?"  ":"") + ((hCells - 3) - i), [marginLeft + (cellSize * 1.75), marginTop + (cellSize * (i + 0.25))], (cellSize * 0.7) + "px Arial");
            }
            drawLine(ctx, [marginLeft + (cellSize * 2.7), marginTop + (cellSize * i)], [marginLeft + (cellSize * 3), marginTop + (cellSize * i)], cellSize * 0.05, "#aaaaaa");
        }
        drawLine(ctx, [marginLeft + (cellSize * 3), marginTop + ((hCells - 2) * cellSize) - cellSize], [marginLeft + ((wCells * cellSize) - cellSize), marginTop + ((hCells - 2) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        for(var i=1; i<=(wCells - 3); i++) {
            if(i != 1) {
                write((i<=9?" ":"") + (i - 1), [marginLeft + (cellSize * (1.63 + i)), marginTop + ((hCells - 1) * cellSize) - cellSize], (cellSize * 0.7) + "px Arial");
            }
            drawLine(ctx, [marginLeft + (cellSize * (2 + i)), marginTop + ((hCells - 2) * cellSize) - cellSize], [marginLeft + (cellSize * (2 + i)), marginTop + ((hCells - 1.7) * cellSize) - cellSize], cellSize * 0.05, "#aaaaaa");
        }
        write("0", [marginLeft + (cellSize * 2.15), marginTop + ((hCells - 1.05) * cellSize) - cellSize], (cellSize * 0.7) + "px Arial");
        // Draw labels
        write("U - uniform", coordinates([1, 14],wCells,hCells,cellSize,marginLeft,marginTop), "bold " + (cellSize * 0.6) + "px Arial");
        write("N - normal", coordinates([1, 13.25],wCells,hCells,cellSize,marginLeft,marginTop), "bold " + (cellSize * 0.6) + "px Arial");
        write("E - exponential", coordinates([1, 12.5],wCells,hCells,cellSize,marginLeft,marginTop), "bold " + (cellSize * 0.6) + "px Arial");
        write("U", coordinates([1.6, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("N", coordinates([2.8, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("E", coordinates([8.8, 4],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("L", coordinates([4, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("t", coordinates([12, 0],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("impossible", coordinates([3, 8],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("beta", coordinates([10, 7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("beta prime, F", coordinates([15.85, 7.75],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial");
        write("gamma", coordinates([11.25, 5.5],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.6);
        write("lognormal", coordinates([14, 5.3],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.4);
        write("inverse gamma", coordinates([16.5, 5.3],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.6) + "px Arial", -0.3);
        write("(I)", coordinates([10.4, 6.5],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(II)", coordinates([2.05, 0.07],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(III)", coordinates([13, 7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(IV)", coordinates([15, 2],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(V)", coordinates([20.8, 6.7],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(VI)", coordinates([17, 7.2],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        write("(VII)", coordinates([12.3, 0.07],wCells,hCells,cellSize,marginLeft,marginTop), (cellSize * 0.5) + "px Arial");
        // Draw legends
        write("SKEWNESS (β1)", [marginLeft + cellSize, marginTop + (((hCells / 2) + 4) * cellSize) - cellSize], "bold " + cellSize + "px Arial", -Math.PI/2);
        write("KURTOSIS (β2)", [marginLeft + ((wCells / 2) - 2) * cellSize, marginTop + ((hCells + 0.5) * cellSize) - cellSize], "bold " + cellSize + "px Arial");
    }
}