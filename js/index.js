const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const clearButton = document.querySelector('.clear');
const widthSelect = document.querySelector('.width-select');
const widthCounter = document.querySelector('.width-counter');
const colorPicker = document.querySelector('.color-picker');
const lineTypes = document.querySelectorAll('.line-type');

var widthSelectValue = widthSelect.value * 5;

lineTypes.forEach((type) => {
	type.addEventListener('click', (e) => {
		ctx.lineJoin = e.target.dataset.linetype;
		ctx.lineCap = e.target.dataset.linetype;
	});
});


widthSelect.addEventListener('change', function() {
	widthSelectValue = widthSelect.value * 5;
	ctx.lineWidth = widthSelectValue;
	widthCounter.innerHTML  = widthSelectValue / 5;
});

colorPicker.addEventListener('change', function() {
	ctx.strokeStyle = this.value;
});

clearButton.addEventListener('click', function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'square';
ctx.lineCap = 'square';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

const draw = (e) => {
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

// When the page loads, set the width counter value
const setWidthCounterValue = () => {
	widthCounter.innerHTML  = widthSelectValue / 6;
}

setWidthCounterValue();

// When the page loads, thickness of line should match width counter value
const setLineThickness = () => {
	ctx.lineWidth = widthSelectValue;
}

setLineThickness();