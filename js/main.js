document.addEventListener('DOMContentLoaded', function() {
  // Mobile Nav Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileNavToggle.addEventListener('click', function() {
    navMenu.classList.toggle('hidden');
  });

  // Form Validation
  const form = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('form-alert');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    if (!validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.classList.add('border-red-500');
    } else {
      emailInput.classList.remove('border-red-500');
    }

    if (messageInput.value.trim() === '') {
      isValid = false;
      messageInput.classList.add('border-red-500');
    } else {
      messageInput.classList.remove('border-red-500');
    }

    if (isValid) {
      formAlert.textContent = 'Thank you for your message!';
      formAlert.classList.remove('hidden');
      formAlert.classList.add('bg-green-500', 'text-white');
      form.reset();
    } else {
      formAlert.textContent = 'Please fill out all fields correctly.';
      formAlert.classList.remove('hidden');
      formAlert.classList.add('bg-red-500', 'text-white');
    }
  });

  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});