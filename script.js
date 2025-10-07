// Initialize animations and functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar background on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Animate hero elements with staggered delays
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const contactItems = document.querySelectorAll('.contact-item');
        const heroScroll = document.querySelector('.hero-scroll');
        
        if (heroTitle) heroTitle.classList.add('active');
        if (heroSubtitle) heroSubtitle.classList.add('active');
        
        contactItems.forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), 100 * (i + 1));
        });
        
        if (heroScroll) {
            setTimeout(() => heroScroll.classList.add('active'), 600);
        }
    }, 300);

    // Set up intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add delay for staggered animations in grids
                if (entry.target.classList.contains('about-card') || 
                    entry.target.classList.contains('skill-category') ||
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('education-card') ||
                    entry.target.classList.contains('additional-card')) {
                    
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animate elements
    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for background elements
    function handleParallax() {
        const scrollPosition = window.scrollY;
        const circle1 = document.querySelector('.circle-1');
        const circle2 = document.querySelector('.circle-2');
        
        if (circle1 && circle2) {
            // Reduced parallax effect on mobile for performance
            const parallaxFactor = window.innerWidth < 768 ? 0.05 : 0.2;
            const parallaxFactor2 = window.innerWidth < 768 ? 0.025 : 0.1;
            
            circle1.style.transform = `translateY(${scrollPosition * parallaxFactor}px)`;
            circle2.style.transform = `translateY(${scrollPosition * parallaxFactor2}px)`;
        }
    }

    window.addEventListener('scroll', handleParallax);

    // Smooth scrolling for navigation links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset mobile menu on resize to larger screens
            if (window.innerWidth > 768) {
                if (navLinks) {
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
                if (navToggle) navToggle.classList.remove('active');
            }
            
            // Re-trigger animations for elements in view
            document.querySelectorAll('.animate').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('active');
                }
            });
        }, 250);
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }

    // Add hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click to copy email functionality
    const emailElement = document.querySelector('.contact-item:nth-child(1)');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', () => {
            const email = 'salmanulharrish.sh@gmail.com';
            
            // Create a temporary textarea to copy text
            const textarea = document.createElement('textarea');
            textarea.value = email;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                
                if (successful) {
                    // Show temporary feedback
                    const originalText = emailElement.innerHTML;
                    const originalColor = emailElement.style.color;
                    
                    emailElement.innerHTML = '✓ Email copied!';
                    emailElement.style.color = 'var(--accent-color)';
                    
                    setTimeout(() => {
                        emailElement.innerHTML = originalText;
                        emailElement.style.color = originalColor;
                    }, 2000);
                }
            } catch (err) {
                document.body.removeChild(textarea);
                console.log('Failed to copy email: ', err);
            }
        });
    }

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-color);
            z-index: 1001;
            transition: width 0.1s ease;
            pointer-events: none;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight - winHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    // Initialize scroll progress bar
    createScrollProgress();

    // Add active section highlighting in navigation
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Tab key navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add loading state management
    function manageLoadingState() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        loader.innerHTML = `
            <div class="loader-spinner" style="
                width: 40px;
                height: 40px;
                border: 4px solid var(--card-bg);
                border-top: 4px solid var(--accent-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        `;
        
        document.body.appendChild(loader);
        
        // Remove loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }, 500);
        });
    }

    // Initialize loading state
    manageLoadingState();
});

// Add CSS animations for loader
const additionalCSS = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.keyboard-navigation *:focus {
    outline: 2px solid var(--accent-color) !important;
    outline-offset: 2px !important;
}

.nav-link.active {
    color: var(--accent-color) !important;
}

.nav-link.active::after {
    width: 100% !important;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Scroll handlers will be called here
}, 10);

// Re-attach scroll events with debouncing
window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support Intersection Observer
    document.querySelectorAll('.animate').forEach(el => {
        el.classList.add('active');
    });
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}