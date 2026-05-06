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

  try {
    await fetch(WORKER_URL, { method: 'POST' });

    status.textContent = '✓ Message sent!';
    e.target.reset();

  } catch {
    status.textContent = '✗ Error sending message';
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
});

function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
