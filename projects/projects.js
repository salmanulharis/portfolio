document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Project filters (archive page)
    const filterBtns = document.querySelectorAll('.archive-filters .filter-btn');
    const projectRows = document.querySelectorAll('.project-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            projectRows.forEach(row => {
                const categories = row.dataset.category?.split(' ') || [];
                const show = filter === 'all' || categories.includes(filter);
                row.classList.toggle('hidden', !show);
            });
        });
    });

    // Row glow on mouse move
    projectRows.forEach(row => {
        row.addEventListener('mousemove', e => {
            const rect = row.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            row.style.setProperty('--mouse-x', `${x}%`);
            row.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Mobile nav (archive uses shared nav markup)
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
});
