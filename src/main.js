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

    // Form Submission Logic (Telegram + Email)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('form-name');
            const contactInput = document.getElementById('form-contact');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const name = nameInput.value.trim();
            const contact = contactInput.value.trim();

            if (!name || !contact) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> Отправка...';
            submitBtn.disabled = true;
            createIcons({ icons });

            // Telegram API Config
            const botToken = '8608712838:AAH4eFJe1r0YVM66ol0QrfJVh5inQGys4PE';
            const chatId = '232400016';
            const message = `🔥 Новая заявка с сайта AI System!\n\n👤 Имя: ${name}\n📞 Контакт: ${contact}`;

            try {
                // 1. Send to Telegram
                const tgResponse = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    })
                });

                // 2. Send to Email via Formsubmit.co
                const emailResponse = fetch('https://formsubmit.co/ajax/keml00@icloud.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "Имя": name,
                        "Контакт": contact,
                        _subject: "🚀 Новая заявка с сайта внедрения ИИ!"
                    })
                });

                // Wait for both to complete
                await Promise.all([tgResponse, emailResponse]);

                alert('✅ Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.');
                contactForm.reset();
            } catch (error) {
                console.error('Ошибка отправки:', error);
                alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте написать напрямую в Telegram.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
