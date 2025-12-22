document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Animate hamburger to X
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (nav.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');

            // Reset hamburger
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ========================================
    // MODERN SCROLL ANIMATIONS
    // ========================================

    const header = document.querySelector('.header');
    let lastScroll = 0;

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Parallax effect removed to prevent "Chi siamo" from appearing above hero

    // Enhanced Scroll Reveal Animation with stagger
    const revealElements = document.querySelectorAll('.service-card, .about-text, .section-title, .contact-item');
    const sections = document.querySelectorAll('.section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        // Reveal sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - elementVisible) {
                section.classList.add('visible');
            }
        });

        // Reveal elements with stagger
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 30); // Stagger delay
            }
        });
    };

    // Initial setup for reveal elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Trigger once on load
    revealOnScroll();

    // ========================================
    // INTERACTIVE HOVER EFFECTS
    // ========================================

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn-cta, .footer-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Add tilt effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add ripple effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Cookie Modal
    const cookieModal = document.getElementById('cookie-modal');
    const cookieOverlay = cookieModal.querySelector('.cookie-modal-overlay');
    const closeButton = cookieModal.querySelector('.cookie-close');
    const acceptAllButton = document.getElementById('accept-all-cookies');
    const rejectAllButton = document.getElementById('reject-all-cookies');
    const savePreferencesButton = document.getElementById('save-cookie-preferences');

    // Check if user has already made a choice about cookies
    if (!localStorage.getItem('cookieConsent')) {
        // Show modal after a short delay
        setTimeout(() => {
            cookieModal.classList.add('show');
        }, 1000);
    }

    // Close modal function
    function closeModal() {
        cookieModal.classList.remove('show');
    }

    // Close button
    closeButton.addEventListener('click', closeModal);

    // Close when clicking overlay
    cookieOverlay.addEventListener('click', closeModal);

    // Load saved preferences to checkboxes
    function loadPreferences() {
        const saved = localStorage.getItem('cookieConsent');
        if (saved) {
            const preferences = JSON.parse(saved);
            document.getElementById('cookie-functional').checked = preferences.functional;
            document.getElementById('cookie-analytics').checked = preferences.analytics;
            document.getElementById('cookie-performance').checked = preferences.performance;
            document.getElementById('cookie-advertising').checked = preferences.advertising;
        }
    }

    // Update checkboxes in UI
    function updateCheckboxes(checked) {
        document.getElementById('cookie-functional').checked = checked;
        document.getElementById('cookie-analytics').checked = checked;
        document.getElementById('cookie-performance').checked = checked;
        document.getElementById('cookie-advertising').checked = checked;
    }

    // Accept all cookies
    acceptAllButton.addEventListener('click', () => {
        const preferences = {
            necessary: true,
            functional: true,
            analytics: true,
            performance: true,
            advertising: true
        };
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        updateCheckboxes(true);
        closeModal();
    });

    // Reject all cookies (except necessary)
    rejectAllButton.addEventListener('click', () => {
        const preferences = {
            necessary: true,
            functional: false,
            analytics: false,
            performance: false,
            advertising: false
        };
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        updateCheckboxes(false);
        closeModal();
    });

    // Save custom preferences
    savePreferencesButton.addEventListener('click', () => {
        const preferences = {
            necessary: true, // Always true
            functional: document.getElementById('cookie-functional').checked,
            analytics: document.getElementById('cookie-analytics').checked,
            performance: document.getElementById('cookie-performance').checked,
            advertising: document.getElementById('cookie-advertising').checked
        };
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        closeModal();
    });

    // Toggle category details
    const categoryHeaders = document.querySelectorAll('.cookie-category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking on checkbox
            if (e.target.type === 'checkbox') return;

            const category = header.closest('.cookie-category');
            category.classList.toggle('expanded');
        });
    });

    // Cookie Preferences Button (to reopen modal)
    const cookiePreferencesBtn = document.getElementById('cookie-preferences-btn');
    if (cookiePreferencesBtn) {
        cookiePreferencesBtn.addEventListener('click', () => {
            loadPreferences();
            cookieModal.classList.add('show');
        });
    }
});
