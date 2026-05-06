const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .skill-category, .timeline-item, .project-card').forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.padding = window.scrollY > 60 ? '12px 48px' : '20px 48px';
});

const WORKER_URL = 'https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev/contact';

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  const payload = {
    name: document.getElementById('cf-name').value,
    email: document.getElementById('cf-email').value,
    subject: document.getElementById('cf-subject').value,
    message: document.getElementById('cf-message').value,
  };

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      status.textContent = "✓ Message sent! I'll get back to you soon.";
      e.target.reset();
    } else {
      throw new Error();
    }

  } catch {
    status.textContent = "✗ Something went wrong.";
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
});

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.12) + 's';
});

function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
