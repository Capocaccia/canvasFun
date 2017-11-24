const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const clearButton = document.querySelector('.clear');
const colors = document.querySelectorAll('.color');
const widthSelect = document.querySelector('.width-select');

widthSelect.addEventListener('click', function(){
	ctx.lineWidth = widthSelect.value * 5;
});


colors.forEach((color) => {
	var currentColor = color.dataset.color;
	color.style.width = '25px';
	color.style.height = '25px';
	color.style.backgroundColor = currentColor;

	color.addEventListener('click', function(){
		ctx.strokeStyle = currentColor;
	});
});

clearButton.addEventListener('click', function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e){
	if(!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	[lastX, lastY] = [e.offsetX, e.offsetY];
	ctx.stroke();
}



canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);