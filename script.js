// (The content of script.js is unchanged from the previous response)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link, .nav-cta');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (X)
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = 'auto';
            }
        });
    });

    // 2. Hide Navbar on Scroll Down, Show on Scroll Up
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            nav.style.boxShadow = "none";
        } else {
            nav.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'transform 0.3s ease-in-out';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach((el, index) => {
        // Add a slight stagger delay for grouped elements
        if(el.parentElement.classList.contains('skills-container') || el.parentElement.classList.contains('projects-grid')) {
             el.style.transitionDelay = `${index % 3 * 100}ms`;
        }
        observer.observe(el);
    });
});