// =========================================
// PARTICLE NETWORK ANIMATION (LUXURY)
// =========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Utility to get current theme's gold accent for particles
function getThemeRGB() {
    return document.body.classList.contains('light-theme') ? '155, 123, 62' : '197, 160, 89';
}

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${getThemeRGB()}, 0.6)`;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    // Adjust density based on screen size. Keeping it low for elegance.
    let numberOfParticles = (canvas.height * canvas.width) / 18000; 
    if(numberOfParticles > 80) numberOfParticles = 80; 

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2; // Slow movement
        let directionY = (Math.random() * 0.4) - 0.2;
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connectParticles() {
    let opacityValue = 1;
    let rgb = getThemeRGB();
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // Connect if close enough
            if (distance < (canvas.width/8) * (canvas.height/8)) {
                opacityValue = 1 - (distance / 15000);
                ctx.strokeStyle = `rgba(${rgb}, ${opacityValue * 0.25})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// =========================================
// THEME TOGGLE LOGIC
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme'); 
} else {
    body.classList.remove('light-theme'); 
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// =========================================
// MOBILE MENU LOGIC
// =========================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    
    if (isActive) {
        line1.style.transform = 'translateY(3.5px) rotate(45deg)';
        line2.style.transform = 'translateY(-3.5px) rotate(-45deg)';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        line1.style.transform = 'none';
        line2.style.transform = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link, .mt-custom').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

// =========================================
// SCROLL REVEAL OBSERVER
// =========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" };

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// =========================================
// 3D TILT EFFECT (Subtle Luxury)
// =========================================
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -1.5; 
            const rotateY = ((x - centerX) / centerX) * 1.5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });
}

// =========================================
// FORM SUBMIT
// =========================================
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Transmitting...';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = 'Inquiry Received';
        btn.style.background = 'var(--gold-accent)'; 
        btn.style.color = '#fff';
        btn.style.borderColor = 'var(--gold-accent)';
        btn.style.opacity = '1';
        e.target.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 4000);
    }, 1500);
});