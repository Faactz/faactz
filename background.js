// Setup the canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resize the canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables for the dots
let dots = [];
const numDots = 100;

// Create the dot objects
function createDot() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.5
    };
}

// Create multiple dots
for (let i = 0; i < numDots; i++) {
    dots.push(createDot());
}

// Function to draw dots and lines
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing new frame

    dots.forEach(dot => {
        dot.x += dot.speed;
        if (dot.x > canvas.width) dot.x = 0; // Reset if it goes off-screen

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    });

    // Draw the lines connecting dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            let distance = Math.sqrt(
                Math.pow(dots[i].x - dots[j].x, 2) + Math.pow(dots[i].y - dots[j].y, 2)
            );

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`; // Fade lines with distance
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw); // Keep animating
}

// Start drawing
draw();
