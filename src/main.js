import { createIcons, icons } from 'lucide';

// Initialize Lucide icons
createIcons({
    icons,
    nameAttr: 'data-lucide',
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                menuBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            createIcons({ icons });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.background = 'rgba(7, 7, 11, 0.9)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            header.style.background = 'rgba(18, 19, 26, 0.65)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        }
    });

    // Set explicit active class based on pathname
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            item.classList.add('active');
        } else if (href !== '/' && currentPath.startsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Dashboard Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => {
                    p.classList.remove('active');
                    p.classList.add('hidden');
                });

                // Add active to current
                btn.classList.add('active');
                const targetId = `tab-${btn.dataset.tab}`;
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.remove('hidden');
                    targetPane.classList.add('active');
                }
            });
        });
    }

});
