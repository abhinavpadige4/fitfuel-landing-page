document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(error => error.remove());

        if (name === '') {
            isValid = false;
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'Name is required.';
            document.getElementById('name').insertAdjacentElement('afterend', error);
        }

        if (email === '' || !email.includes('@')) {
            isValid = false;
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'Valid email is required.';
            document.getElementById('email').insertAdjacentElement('afterend', error);
        }

        if (message === '') {
            isValid = false;
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'Message is required.';
            document.getElementById('message').insertAdjacentElement('afterend', error);
        }

        if (isValid) {
            alert('Thank you for contacting us, ' + name + '!');
            contactForm.reset();
        }
    });
});