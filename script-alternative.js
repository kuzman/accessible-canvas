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

// Add keyboard navigation to the sales data list
document.querySelectorAll('#salesData li').forEach((item, index) => {
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            alert(`Sales in ${salesData[index].month}: $${salesData[index].value}`);
        }
    });
});

// Make canvas focusable and add keyboard event listener
canvas.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        const description = salesData.map(data => `${data.month}: $${data.value}`).join(', ');
        alert(`Bar chart showing sales data: ${description}`);
    }
});