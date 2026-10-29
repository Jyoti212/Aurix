const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

if (!document.body.classList.contains('home-page') && !document.body.classList.contains('projects-page') && !document.body.classList.contains('about-page')) {
  document.querySelectorAll('.legacy-heading, .landmarks-head, .philosophy-inner, .trust-inner, .contact-inner, .project-card')
    .forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const skyline = document.getElementById('skylineSvg');
  if (skyline) {
    const skylineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skyline.classList.add('in-view');
          skylineObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    skylineObserver.observe(skyline);
  }
}

const carousel = document.getElementById('carousel');
const carPrev = document.getElementById('carPrev');
const carNext = document.getElementById('carNext');
if (carousel && carPrev && carNext) {
  const scrollByCard = (direction) => {
    const card = carousel.querySelector('.project-card');
    const gap = 26;
    const distance = (card.offsetWidth + gap) * direction;
    carousel.scrollBy({ left: distance, behavior: 'smooth' });
  };
  carPrev.addEventListener('click', () => scrollByCard(-1));
  carNext.addEventListener('click', () => scrollByCard(1));
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.classList.add('is-hidden');
    document.getElementById('formSuccess').classList.add('is-visible');
  });
}

document.querySelectorAll('.git-form').forEach((gitForm) => {
  const fields = [...gitForm.querySelectorAll('input[required]:not([type="checkbox"]), select[required], textarea[required]')];
  const validateField = (field) => {
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) {
      field.setCustomValidity('Please complete this field.');
    } else if (field.type === 'tel' && !/^\d{10}$/.test(field.value.trim())) {
      field.setCustomValidity('Enter a 10-digit mobile number.');
    }
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('change', () => validateField(field));
  });

  gitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fields.forEach(validateField);
    if (!gitForm.reportValidity()) return;

    const btn = gitForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Thank you — we\u2019ll call you shortly';
    btn.disabled = true;
    gitForm.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 3200);
  });
});

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Subscribed';
    newsletterForm.reset();
    setTimeout(() => { btn.textContent = original; }, 2600);
  });
}