// script.js
const canvas = document.getElementById('salesChart');
const ctx = canvas.getContext('2d');
const salesData = [
    { month: 'January', value: 10000 },
    { month: 'February', value: 12000 },
    { month: 'March', value: 15000 }
];
const bars = [];
let focusedElementIndex = -1; // No element focused initially

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
    ctx.moveTo(45, y);
    ctx.lineTo(50, y);
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
        data: data,
        ariaLabel: `Sales in ${data.month}: $${data.value}`
    });
});

// Handle keyboard events
canvas.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        if (event.key === 'ArrowRight') {
            focusedElementIndex = (focusedElementIndex + 1) % (bars.length + 1);
        } else {
            focusedElementIndex = (focusedElementIndex - 1 + bars.length + 1) % (bars.length + 1);
        }
        drawFocus();
    } else if (event.key === 'Enter' || event.key === ' ') {
        if (focusedElementIndex > 0) {
            alert(bars[focusedElementIndex - 1].ariaLabel);
        }
    }
});

canvas.addEventListener('focus', drawFocus);
canvas.addEventListener('blur', () => {
    focusedElementIndex = -1;
    drawFocus();
});

function drawFocus() {
    // Clear previous focus rectangles
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw title, axes, labels, and bars
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(titleText, canvas.width / 2, 30);

    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(550, 350);
    ctx.lineTo(550, 50);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    for (let i = 0; i <= 15000; i += 5000) {
        const y = 350 - (i / 100);
        ctx.fillText(i, 30, y + 5);
        ctx.moveTo(45, y);
        ctx.lineTo(50, y);
    }
    ctx.stroke();

    bars.forEach((bar, index) => {
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(bar.x, bar.y, bar.width, bar.height);

        ctx.fillStyle = '#000';
        ctx.fillText(bar.data.month, bar.x + 50, 370);

        if (focusedElementIndex === index + 1) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 4;
            ctx.strokeRect(bar.x, bar.y, bar.width, bar.height);
        }
    });

    if (focusedElementIndex === 0) {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - ctx.measureText(titleText).width / 2 - 5, 5, ctx.measureText(titleText).width + 10, 30);
    }
}

// Announce the currently focused element for screen readers
function announceFocus() {
    if (focusedElementIndex === 0) {
        canvas.setAttribute('aria-label', titleText);
    } else if (focusedElementIndex > 0) {
        canvas.setAttribute('aria-label', bars[focusedElementIndex - 1].ariaLabel);
    } else {
        canvas.setAttribute('aria-label', 'Sales Data for Q1 2024. Use arrow keys to navigate the bars and press Enter to get details.');
    }
}

canvas.addEventListener('focus', announceFocus);
canvas.addEventListener('keydown', announceFocus);
