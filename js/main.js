document.documentElement.classList.remove('dark');
        localStorage.removeItem('theme');

/**
 * =============================================================
 *  main.js — Gaurav Singh Panwar - Portfolio
 * =============================================================
 *  Handles:
 *  - DOMContentLoaded init (project render, lucide icons, particles)
 *  - Typewriter animation
 *  - Mobile drawer open/close
 *  - Browser back-button / popstate support
 *  - Navbar scroll shadow effect
 *  - Smart navigation + smooth scroll
 *  - Active link highlighting (ScrollSpy)
 *  - Project filter buttons (homepage grid)
 *  - Projects overlay view + filter (all-projects view)
 *  - Case Study modal open/close
 *  - API Playground demo
 *  - Contact form submission (Web3Forms)
 *  - Toast notifications
 *  - Dark mode toggle + localStorage persistence
 * =============================================================
 *
 *  NOTE: This script must load AFTER lucide.min.js and projects.js.
 *  See index.html for correct load order.
 * =============================================================
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Render project cards from projects.js data
    if (typeof renderProjects === "function") {
        renderProjects();
    }

    // 2. Init all lucide icons (including newly rendered project cards)
    lucide.createIcons();
});
// --- Typewriter ---
(function initTypewriter() {
    const words = [
        "Scalable APIs",
        "Robust Backends",
        "Cloud Systems",
        "Microservices",
        "High-Performance Systems",
        "AI-Driven Architecture",
        "Smart Automation & Integrations",
    ];
    let i = 0,
        j = 0,
        isDeleting = false;

    function typeWriter() {
        const el = document.getElementById("typewriter");
        if (!el) return;
        const word = words[i];
        el.textContent = isDeleting
            ? word.substring(0, j)
            : word.substring(0, j + 1);
        isDeleting ? j-- : j++;

        if (!isDeleting && j === word.length) {
            isDeleting = true;
            return setTimeout(typeWriter, 1000);
        }
        if (isDeleting && j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            j = 0;
            return setTimeout(typeWriter, 500);
        }
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    typeWriter();
})();

// --- Drawer ---
const drawerOpenBtn = document.getElementById("mobile-menu-btn");
const drawerCloseBtn = document.getElementById("drawer-close-btn");
const drawer = document.getElementById("mobile-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");

function openDrawer() {
    drawer.classList.remove("translate-x-full");
    drawer.classList.add("translate-x-0");
    drawerOverlay.classList.remove("opacity-0", "pointer-events-none");
    drawerOverlay.classList.add("opacity-100");
    // Simple scroll lock - no position change, no jump
    document.documentElement.style.overflow = "hidden";
    // Update hamburger to X
    drawerOpenBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    lucide.createIcons();
}

function closeDrawer() {
    drawer.classList.remove("translate-x-0");
    drawer.classList.add("translate-x-full");
    drawerOverlay.classList.add("opacity-0", "pointer-events-none");
    drawerOverlay.classList.remove("opacity-100");
    // Remove scroll lock - no position change, no jump
    document.documentElement.style.overflow = "";
    // Restore hamburger icon
    drawerOpenBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    lucide.createIcons();
}

drawerOpenBtn.addEventListener("click", () => {
    const isOpen = !drawer.classList.contains("translate-x-full");
    isOpen ? closeDrawer() : openDrawer();
});

drawerCloseBtn.addEventListener("click", closeDrawer);
drawerOverlay.addEventListener("click", closeDrawer);

// Close on any drawer nav link click
document.querySelectorAll(".drawer-nav-link").forEach((link) => {
    link.addEventListener("click", () => setTimeout(closeDrawer, 100));
});

// Android back button support
window.addEventListener("popstate", (event) => {
    const view = document.getElementById("projects-view");
    const modal = document.getElementById("caseStudyModal");

    if (!modal.classList.contains("hidden")) {
        closeModal();
        return;
    }

    if (event.state && event.state.page === "projects") {
        renderProjectsView();
    } else {
        view.classList.add("hidden");
        document.documentElement.style.overflow = "";
        if (!drawer.classList.contains("translate-x-full")) {
            closeDrawer();
        }
        observerCallback([], observer);
    }
});

// Close drawer/modal on Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        if (!drawer.classList.contains("translate-x-full")) {
            closeDrawer();
        }
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("shadow-sm");
    } else {
        navbar.classList.remove("shadow-sm");
    }
});

// Smart Navigation Handler
function handleNavClick(event, targetId) {
    if (event) event.preventDefault();

    const projectsView = document.getElementById("projects-view");
    const isProjectsOpen = !projectsView.classList.contains("hidden");
    const drawerIsOpen = drawer && !drawer.classList.contains("translate-x-full");

    if (drawerIsOpen) {
        closeDrawer();
    }

    if (isProjectsOpen) {
        closeProjectsView();
    }

    function doScroll() {
        if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                const navbarHeight = window.innerWidth < 768 ? 64 : 80;
                const elementPosition =
                    element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: "smooth",
                });
            }
        }
        updateActiveLink(targetId);
    }

    if (drawerIsOpen) {
        setTimeout(doScroll, 300);
    } else {
        doScroll();
    }
}

// Active Link Highlighter
function updateActiveLink(activeId) {
    const links = document.querySelectorAll(".nav-link, .nav-link-mobile");

    links.forEach((link) => {
        const target = link.getAttribute("data-target");
        if (target === activeId) {
            link.classList.add("text-brand-600", "font-bold");
            link.classList.remove("text-slate-600");
        } else {
            link.classList.remove("text-brand-600", "font-bold");
            link.classList.add("text-slate-600");
        }
    });
}

// ScrollSpy for Main Page
const observerOptions = {
    root: null,
    rootMargin: "-100px 0px -50% 0px",
    threshold: 0.1,
};

const observerCallback = (entries) => {
    const projectsView = document.getElementById("projects-view");
    // Only update active links if we are NOT on the projects overlay
    if (!projectsView.classList.contains("hidden")) return;

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            updateActiveLink(entry.target.id);
        }
    });

    // Handle Home separately since it's top of page
    if (window.scrollY < 100 && projectsView.classList.contains("hidden")) {
        updateActiveLink("home");
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
});

// Project filter setup (runs immediately, DOM already loaded at script exec)
(function setupProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 1. Visual Update: Reset all buttons to INACTIVE state
            filterBtns.forEach((b) => {
                b.classList.remove(
                    "bg-brand-600",
                    "text-white",
                    "shadow-md",
                    "hover:bg-brand-700",
                );
                b.classList.add(
                    "bg-white",
                    "text-slate-600",
                    "border",
                    "border-slate-200",
                    "hover:border-brand-300",
                    "hover:text-brand-600",
                );
            });

            // 2. Visual Update: Set clicked button to ACTIVE state
            btn.classList.remove(
                "bg-white",
                "text-slate-600",
                "border",
                "border-slate-200",
                "hover:border-brand-300",
                "hover:text-brand-600",
            );
            btn.classList.add(
                "bg-brand-600",
                "text-white",
                "shadow-md",
                "hover:bg-brand-700",
            );

            const filterValue = btn.getAttribute("data-filter");

            // 3. Filter Logic
            projectCards.forEach((card) => {
                if (card.classList.contains("hidden-project")) return;

                const categories = card.getAttribute("data-category").split(" ");

                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.classList.remove("hidden");
                    card.classList.add("flex"); // Restore flex layout
                    card.classList.remove("opacity-0", "scale-95");
                    card.classList.add("opacity-100", "scale-100");
                } else {
                    card.classList.add("hidden");
                    card.classList.remove("flex"); // Remove flex so it hides properly
                    card.classList.remove("opacity-100", "scale-100");
                    card.classList.add("opacity-0", "scale-95");
                }
            });
        });
    });
})();

// NEW: Client-Side Routing & Projects View Logic
function renderProjectsView() {
    const view = document.getElementById("projects-view");
    const container = document.getElementById("all-projects-container");
    const sourceGrid = document.getElementById("projects-grid");

    // Populate if empty (Lazy Load)
    if (container.children.length === 0) {
        // Clone the main grid
        const clone = sourceGrid.cloneNode(true);
        clone.id = "projects-grid-full";

        // Reveal ALL hidden projects in the clone
        const hiddenItems = clone.querySelectorAll(".hidden-project");
        hiddenItems.forEach((item) => {
            item.classList.remove("hidden-project");
            item.classList.add("flex"); // Restore flex display
        });

        // Append to view
        container.appendChild(clone);

        // Setup Filters for Overlay
        setupOverlayFilters();

        // Re-initialize icons for the new content
        lucide.createIcons();
    }

    // Show View
    view.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable background scroll
    view.scrollTop = 0; // Scroll to top

    // Force highlighting "Projects"
    updateActiveLink("projects");

    // Reset filter to 'All' every time the view is opened
    const allFilterBtn = document.querySelector(
        '#overlay-filters .overlay-filter-btn[data-filter="all"]',
    );
    if (allFilterBtn) {
        allFilterBtn.click();
    }
}

function setupOverlayFilters() {
    const filterBtns = document.querySelectorAll(".overlay-filter-btn");
    const projectsGrid = document.getElementById("projects-grid-full");

    if (!projectsGrid) return;

    const projectCards = projectsGrid.querySelectorAll(".project-card");

    // Define styles for Active and Inactive states
    const activeClasses = ["bg-brand-600", "text-white", "shadow-sm"];
    const inactiveClasses = [
        "bg-white",
        "text-slate-600",
        "border",
        "border-slate-200",
        "hover:border-brand-300",
        "hover:text-brand-600",
    ];

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 1. Reset ALL buttons to Inactive state
            filterBtns.forEach((b) => {
                b.classList.remove(...activeClasses);
                b.classList.add(...inactiveClasses);
            });

            // 2. Set CLICKED button to Active state
            // Importantly: Remove the hover text color class so active button text stays white
            btn.classList.remove(...inactiveClasses);
            btn.classList.add(...activeClasses);

            const filterValue = btn.getAttribute("data-filter");

            // Filter Logic
            projectCards.forEach((card) => {
                const categories = card.getAttribute("data-category").split(" ");

                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.classList.remove("hidden");
                    card.classList.add("flex");

                    // Reset Animation
                    card.classList.remove("opacity-0", "scale-95");
                    card.classList.add("opacity-100", "scale-100");
                } else {
                    card.classList.add("hidden");
                    card.classList.remove("flex");

                    card.classList.remove("opacity-100", "scale-100");
                    card.classList.add("opacity-0", "scale-95");
                }
            });
        });
    });
}

function navigateToProjects() {
    renderProjectsView();
    // Update URL (Client-side routing)
    window.history.pushState({ page: "projects" }, "Projects", "#projects");
}

function closeProjectsView() {
    // Trigger browser back to handle history state
    window.history.back();
}

// Modal Logic
const modal = document.getElementById("caseStudyModal");
const modalTitle = document.getElementById("modal-project-title");
const modalIconContainer = document.getElementById("modal-icon-container");
const modalTags = document.getElementById("modal-tags");
const modalChallenge = document.getElementById("modal-desc");
const modalSolution = document.getElementById("modal-solution");
const modalFeatures = document.getElementById("modal-features");
const modalOutcome = document.getElementById("modal-outcome");
const modalDemoBtn = document.getElementById("modal-demo-btn");

// Fallback content used only if a project doesn't define its own caseStudy fields
const DEFAULT_CASE_STUDY = {
    solution: "Designed and built a clean, modular solution focused on solving the core problem directly.",
    features: [
        "Clean, modular codebase built for maintainability",
        "Well-tested core logic with clear error handling",
        "Documented setup for easy local development",
        "Deployed with a straightforward CI/CD flow"
    ],
    outcome: "Delivered a reliable, working solution that met the project's core requirements."
};

function openModal(buttonElement) {
    // Find the parent card
    const card = buttonElement.closest(".project-card");

    // Extract Data from Card
    const title = card.querySelector(".project-title").innerText;
    const desc = card.querySelector(".project-desc").innerText;
    const iconHtml = card.querySelector(".project-icon").outerHTML;
    const tagsHtml = card.querySelector(".project-tags").innerHTML;

    // Extract Demo Link (Robust check)
    const demoLinkEl = card.querySelector(".project-demo-link");
    const demoUrl = demoLinkEl ? demoLinkEl.href : "#";

    // Look up this project's own caseStudy data from PROJECTS via its index
    const projectIndex = card.getAttribute("data-project-index");
    const project = (typeof PROJECTS !== "undefined" && projectIndex !== null)
        ? PROJECTS[parseInt(projectIndex, 10)]
        : null;
    const cs = (project && project.caseStudy) ? project.caseStudy : {};
    const challengeText = cs.challenge || desc; // fall back to card description if no challenge given
    const solutionText = cs.solution || DEFAULT_CASE_STUDY.solution;
    const featuresList = (cs.features && cs.features.length) ? cs.features : DEFAULT_CASE_STUDY.features;
    const outcomeText = cs.outcome || DEFAULT_CASE_STUDY.outcome;

    // Populate Modal
    modalTitle.innerText = title;
    modalIconContainer.innerHTML = iconHtml;
    modalTags.innerHTML = tagsHtml; // Clone tags
    modalChallenge.innerText = challengeText;
    modalSolution.innerText = solutionText;
    modalFeatures.innerHTML = featuresList.map(f => `<li>${f}</li>`).join("");
    modalOutcome.innerText = outcomeText;

    // Set Modal Demo Button Link
    modalDemoBtn.href = demoUrl;

    // Show Modal & Disable Background Scroll
    modal.classList.remove("hidden");
    document.documentElement.style.overflow = "hidden";

    // Re-render icons in modal
    lucide.createIcons();

    // Push history state for mobile back button support
    window.history.pushState({ modal: true }, "");
}

function closeModal() {
    modal.classList.add("hidden");
    document.documentElement.style.overflow = "";
}

// Close modal on Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// API Playground Demo
function runDemo() {
    const selector = document.getElementById("endpoint-selector");
    const output = document.getElementById("json-output");
    const loader = document.getElementById("loader");
    const status = document.getElementById("response-status");

    const endpoint = selector.value;

    // Show Loader
    loader.classList.remove("hidden");
    output.innerText = "";
    status.innerText = "";

    // Simulate Network Delay
    setTimeout(() => {
        loader.classList.add("hidden");
        status.innerText = "Status: 200 OK • Time: 45ms";

        let data = {};

        if (endpoint === "users") {
            data = {
                id: "usr_82910",
                username: "hiring_manager",
                role: "admin",
                permissions: ["read", "write", "deploy"],
                last_login: new Date().toISOString(),
            };
        } else if (endpoint === "analytics") {
            data = {
                total_requests: 14502,
                cache_hit_rate: "94.5%",
                avg_latency: "32ms",
                active_nodes: 5,
            };
        } else {
            data = {
                status: "operational",
                database: "connected",
                redis: "connected",
                version: "v2.4.1",
            };
        }

        output.innerText = JSON.stringify(data, null, 2);
    }, 800);
}

// Contact Form Integration
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById("submitBtn");
    const originalBtnContent = btn.innerHTML;

    // Basic Validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        showToast("Please fill in all required fields.", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
    }

    // Disable Button & Show Loading State
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...`;
    lucide.createIcons(); // Re-init icons for the loader

    // Prepare Data for Web3Forms
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                showToast("Message sent successfully!", "success");
                form.reset();
            } else {
                showToast(json.message || "Something went wrong.", "error");
            }
        })
        .catch((error) => {
            showToast("Failed to send message. Please try again.", "error");
        })
        .finally(() => {
            // Reset Button
            btn.disabled = false;
            btn.innerHTML = originalBtnContent;
            lucide.createIcons(); // Re-init icons
        });
});

// Toast Notification System
function showToast(message, type = "success") {
    const toast = document.createElement("div");

    // Tailwind classes for the toast
    const baseClasses =
        "fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 translate-y-10 opacity-0 z-[60] flex items-center gap-3 font-medium min-w-[300px]";
    const isDarkMode = document.documentElement.classList.contains("dark");
    const typeClasses =
        type === "success"
            ? isDarkMode
                ? "bg-slate-800 border-l-4 border-emerald-500 text-slate-100"
                : "bg-white border-l-4 border-emerald-500 text-slate-800"
            : isDarkMode
                ? "bg-slate-800 border-l-4 border-red-500 text-slate-100"
                : "bg-white border-l-4 border-red-500 text-slate-800";

    const icon =
        type === "success"
            ? `<i data-lucide="check-circle" class="w-5 h-5 text-emerald-500"></i>`
            : `<i data-lucide="alert-circle" class="w-5 h-5 text-red-500"></i>`;

    toast.className = `${baseClasses} ${typeClasses}`;
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    document.body.appendChild(toast);
    lucide.createIcons();

    // Animate In
    requestAnimationFrame(() => {
        toast.classList.remove("translate-y-10", "opacity-0");
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add("translate-y-10", "opacity-0");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ===== DARK MODE LOGIC =====
// Always start in light mode — no persistence across sessions
localStorage.removeItem('theme');

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    // Session-only: no localStorage save, resets on next load
}

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    const btnMobile = document.getElementById("theme-toggle-mobile");
    if (btn) btn.addEventListener("click", toggleDarkMode);
    if (btnMobile) btnMobile.addEventListener("click", toggleDarkMode);
});


    (function () {
        const cubeScene = document.getElementById('cubeScene');
        if (!cubeScene) return; // hero cube not present on this viewport/build

        const CUBE_ITEMS = [
            { tag: 'API Development', color: '#199fd7', angle: 0, r: 155 },
            { tag: 'Database Design', color: '#99bd3c', angle: 60, r: 155 },
            { tag: 'Authentication', color: '#fc7942', angle: 120, r: 155 },
            { tag: 'Real-Time Systems', color: '#ee5091', angle: 180, r: 155 },
            { tag: 'Cloud Deployment', color: '#8a50d8', angle: 240, r: 155 },
            { tag: 'System Security', color: '#99bd3c', angle: 300, r: 155 },
        ];

        const cubeCardsLayer = document.getElementById('cubeCardsLayer');
        const cubeTracesSvg = document.getElementById('cubeTracesSvg');

        const cubeOrbitItems = CUBE_ITEMS.map((item, i) => {
            const wrap = document.createElement('div');
            wrap.className = 'cube-card3d';
            wrap.innerHTML = `<div class="cube-card-face" style="border-color:${item.color}70;box-shadow:0 0 14px ${item.color}40, inset 0 1px 0 ${item.color}20">
                <span class="cube-card-dot" style="background:${item.color};box-shadow:0 0 8px ${item.color}"></span>
                <span class="cube-card-label" style="color:${item.color}">${item.tag}</span>
              </div>`;
            wrap.style.opacity = '0';
            wrap.style.transition = 'opacity .5s';
            setTimeout(() => wrap.style.opacity = '1', 120 + i * 90);
            cubeCardsLayer.appendChild(wrap);

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'cube-trace-path');
            path.setAttribute('stroke', item.color);
            path.style.animationDelay = (i * 0.15) + 's';
            cubeTracesSvg.appendChild(path);

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('r', '2.8');
            dot.setAttribute('class', 'cube-trace-dot');
            dot.style.fill = item.color;
            cubeTracesSvg.appendChild(dot);

            return { ...item, el: wrap, pathEl: path, dotEl: dot };
        });

        let cubeOrbitDeg = 0, cubeLastTs = null;
        const CUBE_TILT_Y = 0.42;
        let cubeDotProgress = cubeOrbitItems.map((_, i) => i * 0.13);
        const CUBE_ENTRANCE_MS = 900;
        const cubeStartTime = performance.now();

        function animateCubeOrbit(ts) {
            if (cubeLastTs !== null) {
                const dt = ts - cubeLastTs;
                cubeOrbitDeg = (cubeOrbitDeg + dt * 0.018) % 360;
            }
            cubeLastTs = ts;

            cubeOrbitItems.forEach((it, i) => {
                const a = ((it.angle + cubeOrbitDeg) * Math.PI) / 180;
                const x = Math.cos(a) * it.r;
                const y = Math.sin(a) * it.r * CUBE_TILT_Y;
                const depth = Math.sin(a);
                const sc = 0.82 + (depth + 1) * 0.12;

                const entrance = Math.min((ts - cubeStartTime) / CUBE_ENTRANCE_MS, 1);

                it.el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${sc * (0.5 + entrance * 0.5)})`;
                it.el.style.opacity = `${0.92 * entrance}`;
                it.el.style.zIndex = Math.round(depth * 10 + 30);

                const midX = x * 0.5, midY = y * 0.5 - 12;
                const d = `M0,0 Q${midX},${midY} ${x},${y}`;
                it.pathEl.setAttribute('d', d);
                it.pathEl.style.opacity = (0.32 + (depth + 1) * 0.16) * entrance;

                const len = it.pathEl.getTotalLength ? it.pathEl.getTotalLength() : 0;
                if (len) {
                    cubeDotProgress[i] = (cubeDotProgress[i] + 0.0032) % 1;
                    const pt = it.pathEl.getPointAtLength(cubeDotProgress[i] * len);
                    it.dotEl.setAttribute('cx', pt.x);
                    it.dotEl.setAttribute('cy', pt.y);
                    it.dotEl.style.opacity = (0.7 + (depth + 1) * 0.15) * entrance;
                }
            });

            requestAnimationFrame(animateCubeOrbit);
        }
        requestAnimationFrame(animateCubeOrbit);
    })();