const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

console.log(ctx);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined, 
    y: undefined,
}

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    //As I click Every time it will create new 10 particle on the sreen
    for(let i = 0; i < 10; i++) { 
        particleArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    //As I move the mouse Every time it will create new 10 particle on the sreen
    for(let i = 0; i < 5; i++) { 
        particleArray.push(new Particle());
    }
    // drawCircle(); // by this we make a paint brush
})

// where i click the mouse it will create a new circle
function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2); 
    ctx.fill();
}

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = this.color  // hsl(color, saturation%, brightness%)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }
}

function handleParticle() {
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        
        for(let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }

        if(particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1)
            console.log(particleArray.length);
            i--;
        }
    }
}

function animate() {

    //clearing the previous circle and creating a new one
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // it create fire work like animation
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue += 2;

    requestAnimationFrame(animate);
}

animate();

// drawCircle();
// ctx.strokeStyle = 'blue';
// ctx.lineWidth = 5;
// ctx.stroke();   // to create a line