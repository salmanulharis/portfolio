document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Navigation ---
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link, .nav-cta');
    let lastScroll = 0;
    let ticking = false;

    function updateNav() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (scrollY > lastScroll && scrollY > 120) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu
    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('open');
            navToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('[data-section]');
    const sectionNavMap = {};

    navLinkItems.forEach(link => {
        const id = link.getAttribute('data-section') || link.getAttribute('href')?.slice(1);
        if (id) sectionNavMap[id] = link;
    });

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinkItems.forEach(l => l.classList.remove('active'));
                    const activeLink = sectionNavMap[id];
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(section => sectionObserver.observe(section));

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.closest('.services-grid, .tech-grid, .projects-grid, .education-grid, .stats-grid')
                        ? (i % 6) * 80
                        : 0;
                    setTimeout(() => entry.target.classList.add('visible'), prefersReducedMotion ? 0 : delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));

    // --- Parallax orbs ---
  if (!prefersReducedMotion) {
        const orbs = document.querySelectorAll('[data-parallax]');
        let mouseX = 0.5;
        let mouseY = 0.5;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
        }, { passive: true });

        function animateOrbs() {
            orbs.forEach(orb => {
                const factor = parseFloat(orb.dataset.parallax) || 0.03;
                const x = (mouseX - 0.5) * factor * 400;
                const y = (mouseY - 0.5) * factor * 400;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
            requestAnimationFrame(animateOrbs);
        }
        animateOrbs();
    }

    // --- Hero card 3D tilt ---
    const tiltCard = document.querySelector('[data-tilt]');
    if (tiltCard && !prefersReducedMotion) {
        const card = tiltCard.querySelector('.hero-card');
        tiltCard.addEventListener('mousemove', e => {
            const rect = tiltCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
        });
        tiltCard.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }

    // Subtle tilt on tech items
    document.querySelectorAll('[data-tilt-subtle]').forEach(item => {
        if (prefersReducedMotion) return;
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            item.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // --- Project card glow follow mouse ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // --- Project filters ---
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('#projects-grid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            projectCards.forEach(card => {
                const categories = card.dataset.category?.split(' ') || [];
                const show = filter === 'all' || categories.includes(filter);
                card.classList.toggle('hidden', !show);
                if (show) {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = '';
                }
            });
        });
    });

    // --- Contact form (mailto) ---
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );
        const mailto = `mailto:salmanulharrish.sh@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailto;
    });

    // Smooth anchor offset for nav clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });
});
