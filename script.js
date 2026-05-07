// 網站資料：完全聚焦於機器視覺與專題內容
const skillsData = [
    {
        category: "光學取像系統 (Optical Hardware)",
        icon: "fas fa-camera",
        skills: ["遠心鏡頭 (Telecentric Lens)", "照明設計 (明/暗視野/穿透光)", "相機評估 (Sensor Size/FOV/WD)", "全局快門 (Global Shutter)"]
    },
    {
        category: "數位影像處理 (DIP)",
        icon: "fas fa-image",
        skills: ["OpenCV / Python", "空間濾波 (Sobel/Laplacian)", "頻率濾波 (高/低通)", "形態學 (侵蝕/膨脹/斷開/閉合)", "Otsu 二值化與直方圖等化"]
    },
    {
        category: "深度學習檢測 (Deep Learning)",
        icon: "fas fa-microchip",
        skills: ["YOLOv8 模型訓練", "特徵學習與融合", "Recall (召回率) 優化", "資料擴增 (Data Augmentation)"]
    }
];

const projectsData = [
    {
        title: "PCB 缺孔 (Missing Hole) 瑕疵檢測系統",
        description: "結合遠心鏡頭消除透視誤差，利用 CLAHE 與 Laplacian 算子克服 PCB 高反光與背景干擾。後端導入 YOLOv8 深度學習模型，針對致命性缺孔瑕疵優化 Recall 率，實現高精度端到端 AOI 檢測。",
        tech: ["YOLOv8", "OpenCV", "CLAHE", "AOI"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // 示意圖，之後可換成你的專題截圖
        github: "#",
        demo: "#"
    },
    {
        title: "自動化光學照明與取像設計",
        description: "基於機器視覺理論，針對不同工業待測物設計最佳照明方式（如暗視野檢測玻璃刮痕、背光檢測輪廓）。精確計算放大倍率、FOV 與工作距離 (WD)，確保影像無失真並具備足夠景深。",
        tech: ["光學設計", "F# 光圈控制", "動態範圍 (DR)"],
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        github: "#",
        demo: "#"
    },
    {
        title: "生醫訊號與基礎控制系統",
        description: "除了工業視覺，亦具備將影像技術應用於生醫領域的經驗（如利用臉部影片提取 rPPG 訊號分析血脈波），並熟悉機電系統之數學建模與回授控制基礎。",
        tech: ["rPPG", "MediaPipe", "Control Systems"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        github: "#",
        demo: "#"
    }
];

// 動態渲染 Skills 區塊
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    skillsData.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        const tagsHtml = category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        
        categoryDiv.innerHTML = `
            <h3><i class="${category.icon}"></i> ${category.category}</h3>
            <div class="skill-tags">
                ${tagsHtml}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

// 動態渲染 Projects 區塊
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const techHtml = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        
        card.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${techHtml}
                </div>
                <p class="project-desc">${project.description}</p>
                <div class="project-links">
                    <a href="${project.github}" class="project-link"><i class="fab fa-github"></i> 查看原始碼</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 平滑滾動效果
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 滾動顯示動畫
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// 自訂游標效果
function setupCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline || window.innerWidth <= 768) return;

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .btn, .social-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
    });
}

// 卡片 3D 傾斜效果
function setupTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    if (window.innerWidth <= 768) return; 
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    setupSmoothScrolling();
    setupScrollReveal();
    setupCustomCursor();
    // 延遲綁定 3D 效果確保 DOM 渲染完成
    setTimeout(setupTiltEffect, 500);
});