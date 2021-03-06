/* 
 * Toolbox of functions for creating visual memory experiments in js
 * 
 */
var objects=new Array();

// Make and draw basic objects

function makeLine(id,x1,y1,x2,y2,color,linewidth){
    linewidth = typeof linewidth !== 'undefined' ? linewidth : 2.5;
    color = typeof color !== 'undefined' ? color : '#000000';
    line=new Object();
    line.id=id;
    line.x1=x1;
    line.x2=x2;
    line.y1=y1;
    line.y2=y2;
    line.color=color;
    line.linewidth=linewidth;
    line.type='line';  
    objects.push(line);
    return line;
}

function drawLine(ctx,line){    
    ctx.beginPath();
    ctx.lineWidth=line.linewidth;
    ctx.strokeStyle=line.color;
    ctx.moveTo(line.x1,line.y1);
    ctx.lineTo(line.x2,line.y2);
    ctx.stroke();
}

function makeText(id,x,y,words,color,style){
    style = typeof style !== 'undefined' ? style : "12px Arial";
    color = typeof color !== 'undefined' ? color : "Black";;
    text=new Object();
    text.id=id;
    text.x=x;
    text.y=y;
    text.color = color;
    text.style = style;
    text.words=words;
    text.type='text';  
    objects.push(text);
    return text;
}

function drawText(ctx,text){     
    ctx.fillStyle = text.color;
    ctx.font = text.style;
    ctx.fillText(text.words, text.x, text.y);
}

function makeCircle(id,x,y,radius,canMove,color,lineCol,lineWidth,arc1,arc2){
     lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 0;
     lineCol = typeof lineCol !== 'undefined' ? lineCol : '#000000';
     color = typeof color !== 'undefined' ? color : '#000000';
     arc1 = typeof arc1 !== 'undefined' ? arc1 : 0;
     arc2 = typeof arc2 !== 'undefined' ? arc2 : Math.PI*2;
     canMove = typeof canMove !== 'undefined' ? canMove : false;
     
     circle=new Object();
     circle.id=id;
     circle.x=x;
     circle.y=y;
     circle.radius=radius;
     circle.color=color;
     circle.lineCol=lineCol;
     circle.lineWidth=lineWidth;
     circle.arc1=arc1;
     circle.arc2=arc2;
     circle.canMove=canMove;
     circle.type='circle';
     objects.push(circle)
     return circle;
}

function drawCircle(ctx,circle){
    // Draw circle outline
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius+circle.lineWidth, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.lineCol;
     ctx.fill();
     ctx.lineWidth = circle.lineWidth;
     
     // Draw circle fill
     ctx.strokeStyle=circle.color;
     ctx.fillStyle=circle.color;
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.color;
     ctx.fill();
     ctx.lineWidth = 0;
     ctx.stroke();
     ctx.closePath();
     return circle;
}

function drawCircle2(ctx,circle){     
     // Draw circle fill
     ctx.strokeStyle=circle.color;
     ctx.fillStyle=circle.color;
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.color;
     ctx.fill();
     ctx.lineWidth = 0;
     ctx.stroke();
     return circle;
}

function overlapCircle(x,y,circle){
    dist=Math.pow(Math.pow(circle.x-x,2)+Math.pow(circle.y-y,2),.5);
    if (dist<=circle.radius){
        return true;
    }else{
        return false;
    }  
}

function makeRectangle(id,x,y,width,height,canMove,color,lineCol,lineWidth,rot){
     canMove = typeof canMove !== 'undefined' ? canMove : false;
     color = typeof color !== 'undefined' ? color : '#000000';
     lineCol = typeof lineCol !== 'undefined' ? lineCol : '#000000';
     lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 0;
     rot = typeof rot !== 'undefined' ? rot : 0;

     
     rectangle=new Object();
     rectangle.id=id;
     rectangle.x=x;
     rectangle.y=y;
     rectangle.width=width;
     rectangle.height=height;
     rectangle.color=color;
     rectangle.rot=rot;
     rectangle.canMove=canMove
     rectangle.lineWidth = lineWidth;
     rectangle.lineCol = lineWidth;
     rectangle.type='rectangle';
     objects.push(rectangle)
     return rectangle;
}

function overlapRectangle(x,y,rectangle){
    x2=x-rectangle.x;
    y2=y-rectangle.y;
    
    xBound=(x>=rectangle.x-rectangle.width/2 & x<=rectangle.x+rectangle.width/2) | (x<=rectangle.x-rectangle.width/2 & x>=rectangle.x+rectangle.width/2);
    yBound=(y>=rectangle.y-rectangle.height/2 & y<=rectangle.y+rectangle.height/2) | (y<=rectangle.y-rectangle.height/2 & y>=rectangle.y+rectangle.height/2)
    if(xBound & yBound){
        return true;
    }else{
        return false;
    }
}

function drawRectangle(ctx,rectangle){   
     ctx.fillStyle=rectangle.color;
     ctx.translate(rectangle.x, rectangle.y);
     ctx.rotate(rectangle.rot*Math.PI/180);
     ctx.translate(-rectangle.x, -rectangle.y);
     ctx.fillRect(rectangle.x-rectangle.width/2,rectangle.y-rectangle.height/2,rectangle.width,rectangle.height);
     ctx.lineWidth = rectangle.lineWidth;
    
     ctx.translate(rectangle.x, rectangle.y);
     ctx.rotate(-rectangle.rot*Math.PI/180);
     ctx.translate(-rectangle.x, -rectangle.y);
}

function makeIm(id,x,y,width,height,file,canMove,rot){
    rot = typeof rot !== 'undefined' ? rot : 0;
    canMove = typeof canMove !== 'undefined' ? canMove : false;
    image=new Object();
    image.id=id;
    image.x=x;
    image.y=y;
    image.width=width;
    image.height=height;
    image.canMove=canMove;
    
    image.file=file;
    image.rot=rot;
    image.type='image';
    objects.push(image);
    return image;
}

function drawIm(ctx,image,border){
    im=new Image();
    im.src=image.file;
    im.onload = function(){
        ctx.drawImage(im, image.x-image.width/2, image.y-image.height/2,image.width,image.height);
    };   
}

function makeTriangle(id,x,y,width,height,canMove,color,rot){
     canMove = typeof canMove !== 'undefined' ? canMove : '#000000';
     color = typeof color !== 'undefined' ? color : '#000000';
     rot = typeof rot !== 'undefined' ? rot : 0;
     
     triangle=new Object();
     triangle.id=id;
     triangle.x=x;
     triangle.y=y;
     triangle.width=width;
     triangle.height=height;
     triangle.color=color;
     triangle.rot=rot;
     triangle.type='triangle';
     triangle.canMove=canMove;
     objects.push(triangle)
     return triangle
}

function drawTriangle(ctx,triangle){  
     ctx.fillStyle=triangle.color;
     ctx.translate(triangle.x, triangle.y);
     ctx.rotate(triangle.rot*Math.PI/180);
     ctx.translate(-triangle.x, -triangle.y);
     
     botLeftX=triangle.x-triangle.width/2;
     botLeftY=triangle.y-triangle.height/2;
     botRightX=triangle.x+triangle.width/2;
     botRightY=triangle.y-triangle.height/2;
     topX=triangle.x;
     topY=triangle.y+triangle.height/2;
     
     ctx.beginPath();
     ctx.moveTo(botLeftX,botLeftY);
     ctx.lineTo(botRightX,botRightY);
     ctx.lineTo(topX,topY);
     ctx.closePath();
     ctx.fill(); 
     
     ctx.translate(triangle.x, triangle.y);
     ctx.rotate(-triangle.rot*Math.PI/180);
     ctx.translate(-triangle.x, -triangle.y);
}

function overlapTriangle(x,y,triangle){
    slopeH=triangle.height/(triangle.width/2)
    slopeW=triangle.width/(triangle.height/2)
    x2=x-triangle.x;
    y2=y-triangle.y;
    xBound=(x2<=y2*slopeH & x2>=-y2*slopeH) | (x2>=y2*slopeH & x2<=-y2*slopeH);
    yBound=(y2<=(triangle.height/2) & y2>=-(triangle.height/2)) | (y2>=(triangle.height/2) & y2<=-(triangle.height/2));
    if(xBound & yBound){
        return true;
    }else{
        return false;
    }
}

function drawObjects(ctx,objects){
    for(i=0;i<objects.length;i++){
        if(objects[i].type=='circle'){
            drawCircle(ctx,objects[i])
        }else if(objects[i].type=='rectangle'){
            drawRectangle(ctx,objects[i])
        }else if(objects[i].type=='triangle'){
            drawTriangle(ctx,objects[i])
        }else if(objects[i].type=='line'){
            drawLine(ctx,objects[i])
        }else if(objects[i].type=='image'){
            drawIm(ctx,objects[i])
        }else if(objects[i].type=='text'){
            drawText(ctx,objects[i])
        }        
        
    }
    
}

function drawGrid(ctx,numCol,numRow){
   numCol = typeof numCol !== 'undefined' ? numCol : 10;
   numRow = typeof numRow !== 'undefined' ? numRow : 5;
   ctx.fillStyle='#000000';
   ctx.strokeStyle='#000000';
   width=ctx.canvas.width;
   wShift=width/numCol;
   height=ctx.canvas.height; 
   hShift=height/numRow;
   // Draw columns
   for(i=0;i<numCol;i++){
        ctx.beginPath();
        ctx.moveTo(wShift*i,0);
        ctx.lineTo(wShift*i,height);
        ctx.closePath();
        ctx.stroke()
        ctx.fillText(wShift*i,wShift*i,10)
   }
   for( j=0;j<numRow;j++){
        ctx.beginPath();
        ctx.moveTo(0,hShift*j);
        ctx.lineTo(width,hShift*j);
        ctx.closePath();
        ctx.stroke()
        ctx.fillText(hShift*j,5,hShift*j)           
   }  
}

function erase(ctx){
    width=ctx.canvas.width;
    height=ctx.canvas.height;
    ctx.fillStyle='#FFFFFF';
    ctx.fillRect(0,0,width,height);
}

function clear(){
    objects=new Array();
}

// Detect clicks
var sel=false;

// Allow rotations
var ad_KeyRotate=false;
var rotRate=10;

// Allow object movement
var mousemove_moveObject=true;

// Allow size changes
var ws_changeSize=false;
var heightRate=2.5;
var widthRate=2.5;
var radRate=2.5;


$(document).keypress(function(e){
});

$(document).on("mouseup", function(e) {

});

$("#yes").click(function(e) {
    // console.log(isTrain)
    inBound=e.target.id=='myCanvas';
    if(isTest & inBound | isTrain){
        xdif=e.offsetX;
        ydif=e.offsetY;
        xsq = X.map(function(v) { return ((v - xdif)**2); })
        ysq = Y.map(function(v) { return ((v - ydif)**2); })
        pickId = xsq.map(function(v,i) { return (((v + ysq[i])**0.5)<Xblock/2); })  

        if (pickId.some(v => v===true)) {
            console.log('picked!')
            var dT2 = new Date();
            ET=dT2.getTime();
            rt = ET-STT;
            if (pickId[pickId.length-1]) {
                console.log('right!')
                if (rt<timeLimit){
                    trackRecord = trackRecord+1;
                    thatRight = true;
                }else{
                    console.log('right but too late')
                    thatRight = false;
                    trackRecord = 0;
                }
            }else{
                console.log('nope')
                thatRight = false;
                trackRecord = 0;
            }
            isTest = false;
            trialIsOver();
            
        }
        else {
            console.log('waiting...')
        }
    }
    
});

function checkOverlap(x,y,objects){
    over=[]
    for(i=0;i<objects.length;i++){
        if(objects[i].type=='circle'){
            overlap=overlapCircle(x,y,objects[i])
        }else if(objects[i].type=='rectangle'){
            overlap=overlapRectangle(x,y,objects[i])
        }else if(objects[i].type=='triangle'){
            overlap=overlapTriangle(x,y,objects[i])
        }else if(objects[i].type=='image'){
            overlap=overlapRectangle(x,y,objects[i])
        } 
        if(overlap){
            over.push(i);
        }
    }
    return over;
}

// Timing functions

function wait(time,func){
    setTimeout(function(){func},time);
}

// Probability

function normRand() {
    var x1, x2, rad;
 
    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad == 0);
 
    var c = Math.sqrt(-2 * Math.log(rad) / rad);
 
    return x1 * c;
};

function changeInnerHTML(id,text){
            document.getElementById(id).innerHTML=text;
}

// Load multiple images
// http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
      images[src].src = sources[src];
    }
    return images;
}


function loadImages2(){
// Insert code that actually loads images
}

function nextPage(){
    document.nextpage.submit();	
}

function angle2HEX(wholeDegree){
    
    w=wholeDegree*(Math.PI/180); // Round to integer degree
    l=65;
    a = 9.0 + 50.0*Math.cos(w);
    b = 9.0 + 50.0*Math.sin(w);
    image=[l,a,b];

    whitePoint = [0.950456,1,1.088754]; 

    fY=(image[0]+16)/116;
    fX=fY+image[1]/500;
    fZ=fY-image[2]/200

    function invf(fi){
        Y=Math.pow(fi, 3);
        i=(Y<.008856);
        if(i){
            Y=(fi-(4/29))*(108/841);
        }
        return Y;
    }


    image2=[];
    image2[0]=whitePoint[0]*invf(fX);
    image2[1]=whitePoint[1]*invf(fY);
    image2[2]=whitePoint[2]*invf(fZ);


    T=[3.240479,-0.969256,0.055648,-1.53715,1.875992,-0.204043,-0.498535,0.041556,1.057311];
    R = T[0]*image2[0] + T[3]*image2[1] + T[6]*image2[2];  
    G = T[1]*image2[0] + T[4]*image2[1] + T[7]*image2[2];  
    B = T[2]*image2[0] + T[5]*image2[1] + T[8]*image2[2];  
  

    AddWhite = -Math.min(Math.min(Math.min(R,G),B),0);
    Scale = Math.max(Math.max(Math.max(R,G),B)+AddWhite,1);
    R = (R + AddWhite)/Scale;
    G = (G + AddWhite)/Scale;
    B = (B + AddWhite)/Scale;   

    function gammacorrection(R){
        Rp=(1.099*Math.pow(R,0.45) - 0.099);// See if we need the real function
        i=R<.018
        if(i){
            Rp=4.5138*R
        }
        return Rp;
    }


    newColorRGB=[];
    newColorRGB[0]=gammacorrection(R);
    newColorRGB[1]=gammacorrection(G);
    newColorRGB[2]=gammacorrection(B);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


    newColorHex=rgbToHex(Math.round(255*newColorRGB[0]), Math.round(255*newColorRGB[1]), Math.round(255*newColorRGB[2])); 

    return newColorHex;
}

