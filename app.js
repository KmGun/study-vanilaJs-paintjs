const canvas = document.getElementById('jsCanvas'),
    ctx = canvas.getContext('2d');
const control__colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

//setting canvas
canvas.width = 500;
canvas.height = 400;
// setting pen
ctx.lineWidth = 1;
ctx.strokeStyle = 'black';

// setting basic fillRect, fillStyle
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height)

let filling = false;
let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}


function onMouseMove(event){
    const x = event.offsetX
    const y = event.offsetY
    console.log(x,y)
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}

function changeColorOnClick(event){
    const color = event.target.style
    ctx.strokeStyle = color.backgroundColor
    ctx.fillStyle = color.backgroundColor;

}

function changeBrushSize(event){
    const value = event.target.value;
    ctx.lineWidth = value;
}

function changeMode(event){
    if(filling){
        filling = false;
        event.target.innerText = 'Fill';
    } else{
        filling = true;
        event.target.innerText = 'Paint';
    }
}

function fillWhole(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}

function rightClickPrevent(event){
    event.preventDefault();
}

function handleSave(){
    const image = canvas.toDataURL()
    const a = document.createElement('a');
    a.href = image;
    a.download = 'CANVAS';
    a.click();
}

if (canvas){
    canvas.addEventListener('mousedown',startPainting)
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mouseup',stopPainting)
    canvas.addEventListener('mouseleave',stopPainting)
    canvas.addEventListener('click',fillWhole)
    canvas.addEventListener('contextmenu',rightClickPrevent)
}

Array.from(control__colors).forEach(function(each){
    each.addEventListener('click',changeColorOnClick)
})

if (range){
   range.addEventListener('input',changeBrushSize) 
}

if(mode){
    mode.addEventListener('click',changeMode)
}

if(saveBtn){
    saveBtn.addEventListener('click',handleSave)
}

function init(){
    
}

init();