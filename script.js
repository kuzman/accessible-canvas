// script.js
const canvas = document.getElementById('salesChart');
const ctx = canvas.getContext('2d');
const salesData = [
    { month: 'January', value: 10000 },
    { month: 'February', value: 12000 },
    { month: 'March', value: 15000 }
];
const bars = [];
// Draw title
const titleText = 'Sales Data for Q1 2024';
ctx.font = '24px Arial';
ctx.textAlign = 'center';
ctx.fillText(titleText, canvas.width / 2, 30);
// Draw axes
ctx.beginPath();
ctx.moveTo(50, 350);
ctx.lineTo(550, 350); // X-axis
ctx.lineTo(550, 50);  // Y-axis
ctx.strokeStyle = '#000';
ctx.stroke();
// Draw Y-axis labels and ticks
ctx.font = '16px Arial';
ctx.fillStyle = '#000';
for (let i = 0; i <= 15000; i += 5000) {
    const y = 350 - (i / 100);
    ctx.fillText(i, 30, y + 5);
    ctx.moveTo(60, y);
    ctx.lineTo(65, y);
}
ctx.stroke();
// Draw bars and labels
salesData.forEach((data, index) => {
    const x = 100 + index * 150;
    const y = 350 - data.value / 100;
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(x, y, 100, data.value / 100);
    ctx.fillStyle = '#000';
    ctx.fillText(data.month, x + 50, 370);
    // Store bar positions and dimensions for keyboard focus
    bars.push({
        x: x,
        y: y,
        width: 100,
        height: data.value / 100,
        data: data
    });
});

// Make title focusable
const canvasContainer = document.querySelector('.canvas-container');
const titleButton = document.createElement('button');
titleButton.style.left = `${canvas.width / 2 - ctx.measureText(titleText).width / 2 - 35}px`;
titleButton.style.top = '10px';
titleButton.style.width = `${ctx.measureText(titleText).width + 70}px`;
titleButton.style.height = '30px';
titleButton.classList.add('title-button');
titleButton.setAttribute('aria-label', titleText);
titleButton.setAttribute('tabindex', '0');
titleButton.addEventListener('focus', () => {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 - ctx.measureText(titleText).width / 2 - 40, 5, ctx.measureText(titleText).width + 80, 30);
});
titleButton.addEventListener('blur', () => {
    ctx.clearRect(canvas.width / 2 - ctx.measureText(titleText).width / 2 - 42, 3, ctx.measureText(titleText).width + 84, 34);
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(titleText, canvas.width / 2, 30);
});
canvasContainer.appendChild(titleButton);

// Make bars focusable
bars.forEach((bar) => {
    const button = document.createElement('button');
    button.style.left = `${bar.x}px`;
    button.style.top = `${bar.y}px`;
    button.style.width = `${bar.width}px`;
    button.style.height = `${bar.height}px`;
    button.classList.add('bar-button');
    button.setAttribute('aria-label', `Sales in ${bar.data.month}: $${bar.data.value}`);
    button.setAttribute('role', 'button');
    button.addEventListener('focus', () => {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 4;
        ctx.strokeRect(bar.x, bar.y, bar.width, bar.height);
    });
    button.addEventListener('blur', () => {
        ctx.clearRect(bar.x - 2, bar.y - 2, bar.width + 4, bar.height + 4);
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    });
    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            alert(`Sales in ${bar.data.month}: $${bar.data.value}`);
        }
    });
    canvasContainer.appendChild(button);
});
