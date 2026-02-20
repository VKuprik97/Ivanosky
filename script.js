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


    // Add ripple and tilt effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Ripple effect position
            item.style.setProperty('--x', `${x}px`);
            item.style.setProperty('--y', `${y}px`);

            // Tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.removeProperty('--x');
            item.style.removeProperty('--y');
            item.style.transform = '';
        });

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

    // Cookie Banner (Technical only)
    const cookieBanner = document.getElementById('cookie-banner');
    const bannerAcceptBtn = document.getElementById('banner-accept-all');

    // Check if user has already confirmed the banner
    function shouldShowCookieBanner() {
        const saved = localStorage.getItem('cookieTechnicalConfirmed');
        if (!saved) return true;

        try {
            const confirmation = JSON.parse(saved);
            if (confirmation.expiryDate) {
                const expiryDate = new Date(confirmation.expiryDate);
                const now = new Date();
                if (now > expiryDate) {
                    localStorage.removeItem('cookieTechnicalConfirmed');
                    return true;
                }
            }
            return false;
        } catch (e) {
            localStorage.removeItem('cookieTechnicalConfirmed');
            return true;
        }
    }

    if (shouldShowCookieBanner()) {
        // Show banner after a short delay
        setTimeout(() => {
            if (cookieBanner) cookieBanner.classList.add('show');
        }, 1000);
    }

    // Close banner function
    function closeBanner() {
        if (cookieBanner) cookieBanner.classList.remove('show');
    }

    // Event Listener for OK button
    if (bannerAcceptBtn) {
        bannerAcceptBtn.addEventListener('click', () => {
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 12);
            const confirmation = {
                confirmed: true,
                expiryDate: expiryDate.toISOString()
            };
            localStorage.setItem('cookieTechnicalConfirmed', JSON.stringify(confirmation));
            closeBanner();
        });
    }

    // Manual re-open (footer or in-page)
    const showBannerBtns = document.querySelectorAll('.show-cookie-banner-btn, #show-cookie-banner-btn');
    showBannerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (cookieBanner) cookieBanner.classList.add('show');
        });
    });

    // ========================================
    // TYPEWRITER ANIMATION
    // ========================================

    class Typewriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];

            // Check if deleting
            if (this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Insert txt into element
            this.element.innerHTML = this.txt;

            // Initial Type Speed
            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            // If word is complete
            if (!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Init Typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        new Typewriter(typewriterElement, JSON.parse(typewriterElement.getAttribute('data-words') || '["Spazi", "Ambienti", "Idee"]'));
    }
    // ========================================
    // NAVBAR LIMELIGHT ANIMATION
    // ========================================

    const navLight = document.querySelector('.nav-light');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const navContainer = document.querySelector('.nav');
    let activeLink = document.querySelector('.nav-link[href="index.html"]'); // Default to home

    // Find current active link based on URL
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === window.location.hash ||
            (window.location.hash === '' && link.getAttribute('href') === 'index.html')) {
            activeLink = link;
        }
    });

    function moveLight(target) {
        if (!navLight || !target) return;

        // Make light visible
        navLight.style.opacity = '1';

        // Calculate position
        const navRect = navContainer.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Calculate width based on target (text content)
        // We want the light to be roughly the size of the text
        const width = targetRect.width;
        navLight.style.width = `${width}px`;

        // Calculate left position relative to nav container
        // Center the light over the target: targetLeft - navLeft
        const left = targetRect.left - navRect.left;

        navLight.style.left = `${left}px`;
    }

    if (navLight && navLinksItems.length > 0) {
        // Initial position
        if (activeLink) {
            // small delay to ensure rendering
            setTimeout(() => moveLight(activeLink), 100);
        }

        navLinksItems.forEach(link => {
            link.addEventListener('mouseenter', () => {
                moveLight(link);
            });

            link.addEventListener('click', () => {
                activeLink = link;
                moveLight(link);
            });
        });

        navContainer.addEventListener('mouseleave', () => {
            if (activeLink) {
                moveLight(activeLink);
            } else {
                navLight.style.opacity = '0';
            }
        });

        // Update on resize
        window.addEventListener('resize', () => {
            if (activeLink) moveLight(activeLink);
        });

        // Update on hash change
        window.addEventListener('hashchange', () => {
            activeLink = document.querySelector(`.nav-link[href="${location.hash}"]`) || activeLink;
            moveLight(activeLink);
        });

        // Scroll Spy
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                const newActiveLink = document.querySelector(`.nav-link[href="#${current}"]`);
                if (newActiveLink && newActiveLink !== activeLink) {
                    activeLink = newActiveLink;
                    moveLight(activeLink);
                }
            } else if (window.scrollY < 100) {
                // Back to top/home
                const homeLink = document.querySelector(`.nav-link[href="index.html"]`) || document.querySelector(`.nav-link[href="#home"]`);
                if (homeLink && homeLink !== activeLink) {
                    activeLink = homeLink;
                    moveLight(activeLink);
                }
            }
        });
    }
});
