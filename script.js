// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero elements
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('active');
        document.querySelector('.hero-subtitle').classList.add('active');
        document.querySelectorAll('.contact-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), 100 * i);
        });
        document.querySelector('.hero-scroll').classList.add('active');
    }, 300);

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animate elements
    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const circle1 = document.querySelector('.circle-1');
        const circle2 = document.querySelector('.circle-2');
        
        if (circle1 && circle2) {
            circle1.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            circle2.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});