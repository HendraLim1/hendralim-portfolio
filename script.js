/* ===================================
   HENDRA LIM — PORTFOLIO
   Minimal vanilla JS — only what's needed
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Nav scroll effect ----------
    const nav = document.getElementById('nav');
    if (nav) {
        const handleScroll = () => {
            if (window.scrollY > 24) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ---------- Mobile menu ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ---------- Counter animation (IntersectionObserver) ----------
    const statCards = document.querySelectorAll('.stat-card');

    const animateCounter = (card) => {
        const target = parseInt(card.dataset.count);
        const suffix = card.dataset.suffix || '';
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl) return;

        const duration = 1600;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            numberEl.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                numberEl.textContent = target + suffix;
            }
        };

        requestAnimationFrame(tick);
    };

    if (statCards.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        statCards.forEach(card => counterObserver.observe(card));
    }

    // ---------- Active nav link highlighting ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const setActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', setActiveLink, { passive: true });
    }

});
