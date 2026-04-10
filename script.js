window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loader-bar');
  const counter = document.getElementById('loader-counter');
  const name = document.getElementById('loader-name');

  gsap.to(name, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => { loader.style.display = 'none'; initAnimations(); }
        });
      }, 300);
    }
    bar.style.width = progress + '%';
    counter.textContent = String(Math.floor(progress)).padStart(3, '0');
  }, 60);
});

const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
const isMobile = () => window.innerWidth <= 768;

document.addEventListener('mousemove', (e) => {
  if (isMobile()) return;
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

document.querySelectorAll('a, button, .project-item, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.title-line', {
    yPercent: 110,
    stagger: 0.12,
    duration: 1,
    ease: 'power4.out',
  });

  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val) + '+'; }
        });
      }
    });
  });

  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      const nav = document.getElementById('navbar');
      nav.style.boxShadow = self.progress > 0 ? '0 4px 40px rgba(0,0,0,0.06)' : 'none';
    }
  });
}

const hoverImg = document.getElementById('proj-hover-img');
const hoverSrc = document.getElementById('proj-hover-src');

document.querySelectorAll('.project-item[data-img]').forEach(item => {
  item.addEventListener('mouseenter', () => {
    hoverSrc.src = item.dataset.img;
    hoverImg.classList.add('visible');
  });
  item.addEventListener('mouseleave', () => {
    hoverImg.classList.remove('visible');
  });
  item.addEventListener('mousemove', (e) => {
    const x = e.clientX + 24;
    const y = e.clientY - 90;
    hoverImg.style.left = x + 'px';
    hoverImg.style.top = y + 'px';
  });
});

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.innerHTML = '<span>Processing...</span>';
  setTimeout(() => {
    btn.innerHTML = '<span>Transmitted ✓</span>';
    document.getElementById('form-success').style.display = 'block';
    e.target.reset();
    setTimeout(() => { btn.innerHTML = '<span>Execute Request →</span>'; }, 3000);
  }, 1200);
}

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});