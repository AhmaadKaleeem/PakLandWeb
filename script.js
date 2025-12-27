// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isActive = answer.classList.contains('active');

        // Close all other open FAQs
        document.querySelectorAll('.faq-answer.active').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
                item.previousElementSibling.classList.remove('active');
            }
        });

        // Toggle current FAQ
        answer.classList.toggle('active');
        button.classList.toggle('active');
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const notification = document.getElementById('formNotification');

        // Reset previous errors
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });

        // Validation
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim()) {
            name.parentElement.classList.add('error');
            isValid = false;
        }

        if (!emailRegex.test(email.value)) {
            email.parentElement.classList.add('error');
            isValid = false;
        }

        if (!subject.value.trim()) {
            subject.parentElement.classList.add('error');
            isValid = false;
        }

        if (message.value.trim().length < 10) {
            message.parentElement.classList.add('error');
            isValid = false;
        }

        if (! isValid) {
            showNotification('Please fill all required fields correctly', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success notification
            showNotification('✓ Message sent successfully!  We\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);

        } catch (error) {
            showNotification('Error sending message.Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// SHOW NOTIFICATION
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.getElementById('formNotification');
    const notificationMessage = document.getElementById('notificationMessage');

    if (notification && notificationMessage) {
        notification.className = `form-notification show ${type}`;
        notificationMessage.textContent = message;

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// SET ACTIVE NAVIGATION LINK ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SET ACTIVE PAGE IN NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============================================
// FORM INPUT REAL-TIME VALIDATION
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        const formGroup = input.parentElement;
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(input.value);
        } else if (input.name === 'message' && input.value.trim().length < 10) {
            isValid = false;
        }

        if (! isValid) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    });

    input.addEventListener('focus', () => {
        input.parentElement.classList.remove('error');
    });
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('PakLand website loaded successfully!');