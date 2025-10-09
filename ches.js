'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // === FADE-IN ANIMATION ===
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('glow-appear'); // glow animation
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // === TYPING EFFECT ===
  const typingElements = document.querySelectorAll('.typing');
  typingElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  });

  // === HOVER GLOW EFFECTS ===
  document.querySelectorAll('.theme-btn, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = '0 0 15px 5px rgba(255, 150, 200, 0.6)';
      el.style.transform = 'scale(1.1)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = 'none';
      el.style.transform = 'scale(1)';
    });
  });

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // === PARALLAX SCROLL ===
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = 0.3;
      const offset = window.scrollY * speed;
      el.style.backgroundPositionY = `${offset}px`;
    });

    // Navbar glow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 0 25px rgba(138,43,226,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // === FLOATING CARDS ANIMATION ===
  const floatingItems = document.querySelectorAll('.service-card, .work-card, .content-card');
  floatingItems.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.transform = `translateY(-5px) rotateX(${(y - rect.height / 2) / 25}deg) rotateY(${(x - rect.width / 2) / 25}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });

  // === SOCIAL ICON PULSE ANIMATION ===
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.classList.add('pulse');
    });
    icon.addEventListener('animationend', () => {
      icon.classList.remove('pulse');
    });
  });
});

// === EMAILJS INTEGRATION ===
(function(){
  if (typeof emailjs === 'undefined' && !window.emailjsLoaded) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js';
    s.onload = () => { emailjs.init('rbIdumcp4Iz4F9wYY'); window.emailjsLoaded = true; };
    document.head.appendChild(s);
  } else if (typeof emailjs !== 'undefined') {
    try { emailjs.init('rbIdumcp4Iz4F9wYY'); } catch(e){}
  }
})();

function sendContactForm(e){
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const SERVICE_ID = '272727';
  const TEMPLATE_ID = 'template_pw15i5j';

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#contactForm')
    .then(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Message sent successfully!');
      form.reset();
    }, (err) => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      console.error('EmailJS error:', err);
      alert('There was an error sending your message.');
    });
}
