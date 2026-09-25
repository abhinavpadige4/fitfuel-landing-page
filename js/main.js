document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPricingToggle();
  initFormValidation();
  initSmoothScroll();
  initScrollAnimations();
  initTestimonialSlider();
  initBackToTop();
});

function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = menu.querySelectorAll('a');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);
    document.body.classList.toggle('overflow-hidden', !isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  });
}

function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const yearlyPrices = document.querySelectorAll('[data-yearly]');
  const monthlyLabels = document.querySelectorAll('[data-monthly-label]');
  const yearlyLabels = document.querySelectorAll('[data-yearly-label]');
  const toggleLabel = document.getElementById('pricing-toggle-label');

  if (!toggle) return;

  let isYearly = false;

  toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    toggle.classList.toggle('checked');

    monthlyPrices.forEach(el => {
      el.style.opacity = isYearly ? '0' : '1';
      el.style.transform = isYearly ? 'translateY(-8px)' : 'translateY(0)';
    });

    yearlyPrices.forEach(el => {
      el.style.opacity = isYearly ? '1' : '0';
      el.style.transform = isYearly ? 'translateY(0)' : 'translateY(8px)';
    });

    monthlyLabels.forEach(el => {
      el.style.opacity = isYearly ? '0' : '1';
    });

    yearlyLabels.forEach(el => {
      el.style.opacity = isYearly ? '1' : '0';
    });

    if (toggleLabel) {
      toggleLabel.textContent = isYearly ? 'Save 20% with yearly billing' : 'Switch to yearly billing';
    }
  });
}

function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = form.querySelectorAll('input, textarea, select');
  const errorMessages = {};

  const validators = {
    name: (val) => {
      if (!val.trim()) return 'Please enter your name';
      if (val.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    },
    email: (val) => {
      if (!val.trim()) return 'Please enter your email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) return 'Please enter a valid email address';
      return '';
    },
    phone: (val) => {
      if (val.trim() && !/^\+?[\d\s\-()]{7,15}$/.test(val)) {
        return 'Please enter a valid phone number';
      }
      return '';
    },
    message: (val) => {
      if (!val.trim()) return 'Please enter a message';
      if (val.trim().length < 10) return 'Message must be at least 10 characters';
      return '';
    },
    goal: (val) => {
      if (!val) return 'Please select your fitness goal';
      return '';
    }
  };

  function validateField(field) {
    const name = field.name;
    const value = field.value;
    const validator = validators[name];

    if (!validator) return true;

    const error = validator(value);
    const errorEl = document.getElementById(`error-${name}`);

    if (error) {
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.classList.add('visible');
      }
      field.classList.add('border-red-500');
      field.classList.remove('border-emerald-500');
      return false;
    } else {
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
      field.classList.remove('border-red-500');
      field.classList.add('border-emerald-500');
      return true;
    }
  }

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('border-red-500')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70');

      setTimeout(() => {
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.classList.remove('opacity-70');
        submitBtn.classList.add('bg-emerald-600');
        form.reset();
        fields.forEach(f => {
          f.classList.remove('border-emerald-500', 'border-red-500');
        });

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-emerald-600');
        }, 3000);
      }, 1500);
    } else {
      const firstError = form.querySelector('.border-red-500');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('animate-out');
    observer.observe(el);
  });

  const nav = document.querySelector('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }
}

function initTestimonialSlider() {
  const container = document.getElementById('testimonial-slider');
  if (!container) return;

  const slides = container.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoPlayInterval;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
    resetAutoPlay();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  container.addEventListener('mouseleave', resetAutoPlay);

  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoPlayInterval);
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    resetAutoPlay();
  }, { passive: true });

  resetAutoPlay();
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
