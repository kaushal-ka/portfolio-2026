
// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Stats Animation
const statsSection = document.getElementById('stats');
let counted = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting && !counted) {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16);

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + (target > 100 ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (target > 100 ? '+' : '');
                }
            };
            updateCounter();
        });
        counted = true;
    }
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Contact Form Validation & Mock Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic Validation
        if (name.length < 2) {
            showFeedback('Name must be at least 2 characters long.', 'error');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }
        if (message.length < 10) {
            showFeedback('Message must be at least 10 characters long.', 'error');
            return;
        }

        // Simulate API call
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showFeedback(`Thanks, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

function showFeedback(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Project Carousel Navigation
const projectCarousel = document.querySelector('.projects-carousel');
const prevProjectBtn = document.getElementById('prevProject');
const nextProjectBtn = document.getElementById('nextProject');
const indicators = document.querySelectorAll('.indicator');
let currentProject = 0;
const totalProjects = 3;

function updateCarousel() {
    const offset = currentProject * -100;
    projectCarousel.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentProject);
    });
}

if (prevProjectBtn) {
    prevProjectBtn.addEventListener('click', () => {
        currentProject = (currentProject - 1 + totalProjects) % totalProjects;
        updateCarousel();
    });
}

if (nextProjectBtn) {
    nextProjectBtn.addEventListener('click', () => {
        currentProject = (currentProject + 1) % totalProjects;
        updateCarousel();
    });
}

// Indicator Navigation
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        currentProject = parseInt(indicator.getAttribute('data-project')) - 1;
        updateCarousel();
    });
});
