const x = /** @type {HTMLCanvasElement} */  (document.getElementById("myCanvas"))
const ctx = x.getContext('2d')
const A = {x:0,y:0}
const B = {x:90,y:180}
const C = {x:B.x,y:0}
const offset = {
    x:x.width/2,
    y:x.height/2
}

ctx.translate(offset.x,offset.y)
update()
document.onmousemove = (event) => {
    B.x = event.x -offset.x
    B.y = event.y -offset.y
    C.x = B.x
    update()
}

function update(){
    const c = distance(A,B)
    const a = distance(B,C)
    const b = distance(A,C)
    const sin = a/c
    const theta = Math.asin(sin)
    ctx.clearRect(-offset.x,-offset.y,x.width,x.height)
    drawCoordinateSystem(ctx,offset)


    drawText(
        "sin = a/c =" +sin.toFixed(2),{x:-offset.x/2,y:offset.y *0.7}
    );
   
    drawText(
        "0 =" +theta.toFixed(2),{x:offset.x/2,y:offset.y *0.7}
    );
   


    drawLine(A,B)
    drawText("c",average(A,B))
    drawLine(A,C)
    drawText("b",average(A,C))
    drawLine(B,C)
    drawText("a",average(B,C))
    drawText("0",A)





//     drawPoint(A)
// drawText("A",A)
// drawPoint(B)
// drawText("B",B)
// drawPoint(C)
// drawText("C",C)

}

function average(p1,p2){
    return{
        x:(p1.x + p2.x)/2,
        y:(p1.y + p2.y)/2
    }
}


function distance(p1,p2){
    return Math.hypot(p1.x - p1.y-p1.y-p2.y)
}


function drawPoint(loc,size=20,color="black"){
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(loc.x,loc.y,size/2,0,Math.PI*2 )
    ctx.fill()
}

function drawLine(p1,p2,color='black'){
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.moveTo(p1.x,p1.y)
  ctx.lineTo(p2.x,p2.y)
  ctx.stroke()
}


function drawText(text,loc,color="black"){
    ctx.fillStyle = color
    ctx.textAlign = "center"
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 35px Courier'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 7
    ctx.strokeText(text,loc.x,loc.y)
    ctx.fillText(text,loc.x,loc.y)
}

function drawCoordinateSystem(ctx,offset){
    ctx.beginPath()
    ctx.moveTo(-offset.x,0)
    ctx.lineTo(ctx.canvas.width-offset.x,0)
    ctx.moveTo(0,-offset.y)
    ctx.lineTo(0,ctx.canvas.height -offset.y)
    ctx.setLineDash([4,2])
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray'
    ctx.stroke()
    ctx.setLineDash([])
}


