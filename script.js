// Basic client-side handling: validate and open mail client via mailto (user sends manually).
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');
  const errEl = document.getElementById('formError');
  const okEl = document.getElementById('formSuccess');
  const sendBtn = form.querySelector('.send-btn');

  function showError(text) {
    errEl.textContent = text;
    errEl.style.display = 'block';
    okEl.style.display = 'none';
  }
  function showSuccess(text) {
    okEl.textContent = text;
    okEl.style.display = 'block';
    errEl.style.display = 'none';
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    errEl.style.display = 'none';
    okEl.style.display = 'none';

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      showError('Please complete all fields.');
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showError('Enter a valid email address.');
      return;
    }

    // Visual feedback
    sendBtn.classList.add('sending');
    showSuccess('Opening your email client...');

    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    // open mail client
    window.location.href = `mailto:lailasulaiman008@gmail.com?subject=${subject}&body=${body}`;

    // remove sending state after a short delay (in case mail client blocked)
    setTimeout(() => sendBtn.classList.remove('sending'), 1500);
  });
});