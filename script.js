// Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Professional Scroll Reveal (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// Subtle 3D Tilt for Premium Feel (Desktop Only)
const tiltCards = document.querySelectorAll('.tilt-card');

if (window.matchMedia("(pointer: fine)").matches) {
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced rotation limits for a more subtle, corporate feel (Max 4deg instead of 10deg)
            const rotateX = ((y - centerY) / centerY) * -4; 
            const rotateY = ((x - centerX) / centerX) * 4;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });
}

// Form Submission Simulation
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Transmitting Data...';
    setTimeout(() => {
        btn.textContent = 'Request Received';
        btn.style.background = '#d4af37'; // Switches to Gold accent on success
        btn.style.color = '#0f1115';
        e.target.reset();
        setTimeout(() => {
            btn.textContent = 'Transmit Request';
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }, 1200);
});