// 網站互動邏輯

// ================================
// 平滑滾動
// ================================// ================================
// 滾動顯示動畫
// ================================
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    reveals.forEach(el => observer.observe(el));
}

// ================================
// 導覽列目前區塊高亮
// ================================
function setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        {
            threshold: 0.32
        }
    );

    sections.forEach(section => observer.observe(section));
}

// ================================
// 學習筆記搜尋與分類
// ================================
function setupKnowledgeFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.knowledge-card'));
    const searchInput = document.getElementById('searchInput');

    let currentFilter = 'all';

    function applyFilter() {
        const query = (searchInput?.value || '').trim().toLowerCase();

        cards.forEach(card => {
            const category = card.dataset.category;
            const text = (
                card.innerText + ' ' + (card.dataset.keywords || '')
            ).toLowerCase();

            const matchFilter =
                currentFilter === 'all' || category === currentFilter;

            const matchSearch =
                !query || text.includes(query);

            card.classList.toggle(
                'hidden-card',
                !(matchFilter && matchSearch)
            );
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            applyFilter();
        });
    });

    searchInput?.addEventListener('input', applyFilter);
}

// ================================
// 詳細筆記展開後微調定位
// ================================
function setupDetailsEnhancement() {
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                detail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    });
}

// ================================
// 自訂游標
// ================================
function setupCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline || window.innerWidth <= 820) return;

    window.addEventListener('mousemove', e => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;

        outline.animate(
            {
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            },
            {
                duration: 150,
                fill: 'forwards'
            }
        );
    });

    const hoverTargets = document.querySelectorAll(
        'a, button, summary, .knowledge-card, .media-frame, .project-card, .btn'
    );

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            outline.classList.remove('hovering');
        });
    });
}

// ================================
// 回到頂部按鈕
// ================================
function setupBackToTop() {
    const btn = document.getElementById('backToTop');

    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 700);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// 圖片 / GIF 找不到時顯示提示框
// ================================
function imageFallback(img) {
    img.style.display = 'none';

    const fallback = img.nextElementSibling;

    if (fallback) {
        fallback.style.display = 'grid';
    }
}

window.imageFallback = imageFallback;

// ================================
// 初始化
// ================================
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupMobileMenu();
    setupScrollReveal();
    setupActiveNavLink();
    setupKnowledgeFilter();
    setupDetailsEnhancement();
    setupCustomCursor();
    setupBackToTop();
});
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                closeMobileMenu();
            }
        });
    });
}

// ================================
// 手機版選單
// ================================
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');

        const icon = hamburger.querySelector('i');

        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    navMenu.classList.remove('open');

    const icon = hamburger.querySelector('i');

    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
}

