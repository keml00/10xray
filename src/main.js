import { createIcons, icons } from 'lucide';

// Theme Toggle Logic
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme');

    // Default to dark mode unless explicitly set to light
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        updateThemeIcon('light');
    } else {
        document.documentElement.classList.remove('light-mode');
        updateThemeIcon('dark');
    }

    themeBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight ? 'light' : 'dark');
    });

    function updateThemeIcon(mode) {
        const moon = document.getElementById('theme-icon-moon');
        const sun = document.getElementById('theme-icon-sun');
        if (!moon || !sun) return;

        if (mode === 'light') {
            moon.style.display = 'none';
            sun.style.display = 'block';
        } else {
            moon.style.display = 'block';
            sun.style.display = 'none';
        }
    }
}

// Initialize Lucide icons
createIcons({
    icons,
    nameAttr: 'data-lucide',
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
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
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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

    initROICalculator();
    initFAQ();
    initAnimations();
});

// Scroll Animations Logic
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// FAQ Accordion Logic
function initFAQ() {
    const faqBtns = document.querySelectorAll('.faq-btn');
    if (!faqBtns.length) return;

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');

            // Close all others
            document.querySelectorAll('.faq-content').forEach(other => {
                if (other !== content) {
                    other.style.maxHeight = null;
                    const otherIcon = other.previousElementSibling.querySelector('i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}


// ROI Calculator Logic
function initROICalculator() {
    const employeesSlider = document.getElementById('roi-employees');
    const salarySlider = document.getElementById('roi-salary');
    const routineSlider = document.getElementById('roi-routine');

    if (!employeesSlider || !salarySlider || !routineSlider) return;

    const employeesVal = document.getElementById('roi-employees-val');
    const salaryVal = document.getElementById('roi-salary-val');
    const routineVal = document.getElementById('roi-routine-val');
    const savingsMonth = document.getElementById('roi-savings-month');
    const savingsYear = document.getElementById('roi-savings-year');

    function calculateROI() {
        const emp = parseInt(employeesSlider.value);
        const sal = parseInt(salarySlider.value);
        const rout = parseInt(routineSlider.value) / 100;

        // Update display values
        employeesVal.textContent = emp;
        salaryVal.textContent = sal.toLocaleString('ru-RU');
        routineVal.textContent = routineSlider.value + '%';

        // The formula: Employees * Salary * Routine% = monthly savings
        const monthly = Math.round(emp * sal * rout);
        const yearly = monthly * 12;

        savingsMonth.textContent = monthly.toLocaleString('ru-RU') + ' ₽';
        savingsYear.textContent = yearly.toLocaleString('ru-RU') + ' ₽';
    }

    employeesSlider.addEventListener('input', calculateROI);
    salarySlider.addEventListener('input', calculateROI);
    routineSlider.addEventListener('input', calculateROI);

    // Initial calc
    calculateROI();
}
