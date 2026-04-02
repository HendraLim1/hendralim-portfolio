/* ===================================
   HENDRA LIM — PORTFOLIO SCRIPTS
   Vanilla JS — no frameworks
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Theme Toggle ----------
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ---------- Navigation Scroll Effect ----------
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ---------- Mobile Menu ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ---------- Role Carousel ----------
    const roles = document.querySelectorAll('.role');
    if (roles.length > 0) {
        let currentRole = 0;

        setInterval(() => {
            roles[currentRole].classList.remove('active');
            currentRole = (currentRole + 1) % roles.length;
            roles[currentRole].classList.add('active');
        }, 3000);
    }

    // ---------- Animated Counters ----------
    const statCards = document.querySelectorAll('.stat-card');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statCards.forEach(card => {
            const target = parseInt(card.dataset.count);
            const suffix = card.dataset.suffix || '';
            const numberEl = card.querySelector('.stat-number');
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                numberEl.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    numberEl.textContent = target + suffix;
                }
            }

            requestAnimationFrame(update);
        });

        countersAnimated = true;
    }

    // ---------- Scroll-triggered Animations ----------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation when impact section is visible
                if (entry.target.closest('.impact') || entry.target.classList.contains('impact')) {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animElements = document.querySelectorAll(
        '.stat-card, .exp-card, .skill-category, .cert-card, .learning-card, .contact-card, .about-text, .about-timeline, .personal-quote, .lang-card'
    );

    animElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        observer.observe(el);
    });

    // Also observe the impact section for counter triggering
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        observer.observe(impactSection);
    }

    // ---------- Active Nav Link Highlighting ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
