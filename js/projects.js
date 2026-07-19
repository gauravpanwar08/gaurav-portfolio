/**
 * ============================================================
 *  projects.js  —  Gaurav Singh Panwar - Portfolio
 * ============================================================
 *
 *  To add a new project, just add a new object to the PROJECTS array below with the required fields.
 *  Don't need to change the HTML structure.
 *
 *  FIELDS:
 *  ─────────────────────────────────────────────────────────
 *  title       : "Project Name"              (required)
 *  description : "Short description..."      (required)
 *                → Short blurb shown on the card (1 line)
 *  icon        : "lucide-icon-name"          (required)
 *                → https://lucide.dev/icons/
 *                  Examples: "bot", "database", "code-2",
 *                  "server", "cpu", "video", "file-text",
 *                  "globe", "shield", "message-square"
 *
 *  theme       : color theme                 (required)
 *                → "violet" | "emerald" | "orange" | "indigo"
 *                   "sky"   | "rose"    | "amber"  | "teal"
 *                   "pink"  | "cyan"    | "zinc"   | "blue"
 *
 *  category    : filter tags (space-separated) (required)
 *                → any combo of:
 *                   "backend" "ai" "automation" "fullstack"
 *                  Example: "backend fullstack"
 *
 *  tags        : ["Tag1", "Tag2", "Tag3"]    (required)
 *                → tech stack badges on card (2–4 best)
 *
 *  github      : "https://github.com/..."   (required)
 *                → "#" if not public yet
 *
 *  demo        : "https://..."              (required)
 *                → "#" if no live demo
 *
 *  featured    : true | false               (optional)
 *                → true = shown on homepage (first 3)
 *                   false = only shown under "View All Projects"
 *                  Default: false
 *
 *  caseStudy   : { challenge, solution, features, outcome }  (optional)
 *                → Full content for the case study modal (opened via the "Case Study" button).
 *                  All fields are optional — anything left out falls back to a generic default.
 *                  challenge : "Problem statement..."           (string)
 *                  solution  : "How you solved it..."           (string)
 *                  features  : ["Feature 1", "Feature 2", ...]  (array)
 *                  outcome   : "Result/impact sentence..."      (string)
 *
 * ============================================================
 */

const PROJECTS = [

    // ── 1 ──────────────────────────────────────────────────
    {
        title: "MEDiFLOW HMS",
        description: "Hospital Management System with secure authentication, patient records, appointments, billing, and role-based access control.",
        icon: "hospital",
        theme: "blue",
        category: "backend fullstack",
        tags: ["FastAPI", "React", "PostgreSQL"],
        github: "https://github.com/gauravpanwar08/MEDiFLOW-HMS",
        demo: "#",
        featured: true,
        caseStudy: {
            challenge: "Managing patients, appointments, billing, and staff operations in separate workflows made hospital management inefficient and difficult to scale.",
            solution: "Developed a modular FastAPI backend with JWT authentication, PostgreSQL database, and React frontend following a scalable REST API architecture.",
            features: [
                "Role-Based Authentication (RBAC)",
                "Patient & Doctor Management",
                "Appointment Scheduling",
                "Billing & Payment Management",
                "REST API with PostgreSQL",
                "Dockerized Deployment"
            ],
            outcome: "Built a scalable healthcare platform with a clean architecture that can be extended into a production-ready multi-tenant SaaS."
        }
    },

    // ── 2 ──────────────────────────────────────────────────
    {
        title: "IronCore GymOS",
        description: "Gym Management System for memberships, attendance, trainers, payments, and administrative operations.",
        icon: "dumbbell",
        theme: "orange",
        category: "backend fullstack",
        tags: ["FastAPI", "React", "PostgreSQL"],
        github: "https://github.com/gauravpanwar08/IronCore-GymOS",
        demo: "#",
        featured: true,
        caseStudy: {
            challenge: "Gym owners needed a centralized system to manage memberships, attendance, trainers, and payments instead of relying on spreadsheets and manual records.",
            solution: "Built a modern FastAPI backend with secure authentication and PostgreSQL, integrated with a React dashboard for daily gym operations.",
            features: [
                "Member Management",
                "Attendance Tracking",
                "Membership Plans",
                "Trainer Management",
                "Payment Tracking",
                "Admin Dashboard"
            ],
            outcome: "Created a scalable Gym Management platform that simplifies daily operations and serves as the foundation for a future multi-tenant SaaS."
        }
    },

    // ── 3 ──────────────────────────────────────────────────
    {
        title: "Fullstack Login System",
        description: "Secure authentication system featuring user registration, login, protected routes, and session management.",
        icon: "shield-check",
        theme: "emerald",
        category: "backend fullstack",
        tags: ["FastAPI", "React", "JWT"],
        github: "https://github.com/gauravpanwar08/Fullstack-Login-System",
        demo: "#",
        featured: true,
        caseStudy: {
            challenge: "Applications require a secure authentication system to protect user accounts and restrict unauthorized access.",
            solution: "Implemented JWT-based authentication with password hashing, protected API routes, and frontend authentication flow using React.",
            features: [
                "User Registration & Login",
                "JWT Authentication",
                "Password Hashing",
                "Protected Routes",
                "Role-Based Authorization",
                "Session Management"
            ],
            outcome: "Built a reusable authentication system that can be integrated into future full-stack applications with minimal changes."
        }
    },

    // ── ADD YOUR NEW PROJECT BELOW THIS LINE ───────────────
    // {
    //     title: "",
    //     description: "",
    //     icon: "",
    //     theme: "",
    //     category: "",
    //     tags: [],
    //     github: "",
    //     demo: "",
    //     featured: false,
    //     caseStudy: {
    //         challenge: "",
    //         solution: "",
    //         features: [],
    //         outcome: ""
    //     }
    // },

];

/* ==============================================================================================
   THEME CONFIG  —  define colours for each theme.
   To add a new theme, just add a new entry here and use that theme name in your project object.
   ============================================================================================== */
const THEME_CONFIG = {
    violet: { bg: "bg-violet-50", hover: "group-hover:bg-violet-100", icon: "text-violet-500", hoverIcon: "group-hover:text-violet-600", shadow: "hover:shadow-violet-500/10", tagBg: "bg-violet-50", tagText: "text-violet-700", tagBorder: "border-violet-100" },
    emerald: { bg: "bg-emerald-50", hover: "group-hover:bg-emerald-100", icon: "text-emerald-500", hoverIcon: "group-hover:text-emerald-600", shadow: "hover:shadow-emerald-500/10", tagBg: "bg-emerald-50", tagText: "text-emerald-700", tagBorder: "border-emerald-100" },
    orange: { bg: "bg-orange-50", hover: "group-hover:bg-orange-100", icon: "text-orange-500", hoverIcon: "group-hover:text-orange-600", shadow: "hover:shadow-orange-500/10", tagBg: "bg-orange-50", tagText: "text-orange-700", tagBorder: "border-orange-100" },
    indigo: { bg: "bg-indigo-50", hover: "group-hover:bg-indigo-100", icon: "text-indigo-500", hoverIcon: "group-hover:text-indigo-600", shadow: "hover:shadow-indigo-500/10", tagBg: "bg-indigo-50", tagText: "text-indigo-700", tagBorder: "border-indigo-100" },
    sky: { bg: "bg-sky-50", hover: "group-hover:bg-sky-100", icon: "text-sky-500", hoverIcon: "group-hover:text-sky-600", shadow: "hover:shadow-sky-500/10", tagBg: "bg-sky-50", tagText: "text-sky-700", tagBorder: "border-sky-100" },
    rose: { bg: "bg-rose-50", hover: "group-hover:bg-rose-100", icon: "text-rose-500", hoverIcon: "group-hover:text-rose-600", shadow: "hover:shadow-rose-500/10", tagBg: "bg-rose-50", tagText: "text-rose-700", tagBorder: "border-rose-100" },
    amber: { bg: "bg-amber-50", hover: "group-hover:bg-amber-100", icon: "text-amber-500", hoverIcon: "group-hover:text-amber-600", shadow: "hover:shadow-amber-500/10", tagBg: "bg-amber-50", tagText: "text-amber-700", tagBorder: "border-amber-100" },
    teal: { bg: "bg-teal-50", hover: "group-hover:bg-teal-100", icon: "text-teal-500", hoverIcon: "group-hover:text-teal-600", shadow: "hover:shadow-teal-500/10", tagBg: "bg-teal-50", tagText: "text-teal-700", tagBorder: "border-teal-100" },
    pink: { bg: "bg-pink-50", hover: "group-hover:bg-pink-100", icon: "text-pink-500", hoverIcon: "group-hover:text-pink-600", shadow: "hover:shadow-pink-500/10", tagBg: "bg-pink-50", tagText: "text-pink-700", tagBorder: "border-pink-100" },
    cyan: { bg: "bg-cyan-50", hover: "group-hover:bg-cyan-100", icon: "text-cyan-500", hoverIcon: "group-hover:text-cyan-600", shadow: "hover:shadow-cyan-500/10", tagBg: "bg-cyan-50", tagText: "text-cyan-700", tagBorder: "border-cyan-100" },
    blue: { bg: "bg-blue-50", hover: "group-hover:bg-blue-100", icon: "text-blue-500", hoverIcon: "group-hover:text-blue-600", shadow: "hover:shadow-blue-500/10", tagBg: "bg-blue-50", tagText: "text-blue-700", tagBorder: "border-blue-100" },
    zinc: { bg: "bg-zinc-50", hover: "group-hover:bg-zinc-100", icon: "text-zinc-500", hoverIcon: "group-hover:text-zinc-600", shadow: "hover:shadow-zinc-500/10", tagBg: "bg-zinc-50", tagText: "text-zinc-700", tagBorder: "border-zinc-100" },
};

const GITHUB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform"><path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'/><path d='M9 18c-4.51 2-5-2-7-2'/></svg>`;

/* ========================================================================================================
   CARD RENDERER  —  By using a project object create full HTML card with correct theme colors and icons.
   ======================================================================================================== */
function createProjectCard(project, projectIndex) {
    const t = THEME_CONFIG[project.theme] || THEME_CONFIG.violet;

    const tagsHTML = project.tags
        .map(tag => `<span class="px-3 py-1 ${t.tagBg} ${t.tagText} text-xs font-semibold rounded-full border ${t.tagBorder}">${tag}</span>`)
        .join('\n');

    const card = document.createElement('div');
    card.className = `project-card bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200 shadow-sm hover:shadow-xl ${t.shadow} transition-all duration-300 flex flex-col group`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-project-index', projectIndex);

    card.innerHTML = `
        <!-- Icon Area -->
        <div class="w-full h-48 ${t.bg} ${t.hover} rounded-2xl flex items-center justify-center mb-8 transition-colors relative overflow-hidden">
            <i data-lucide="${project.icon}"
               class="project-icon w-16 h-16 ${t.icon} ${t.hoverIcon} transition-all duration-300 group-hover:scale-110"></i>
        </div>

        <!-- Title -->
        <h3 class="project-title text-2xl font-bold text-zinc-900 mb-3 text-center">${project.title}</h3>

        <!-- Description -->
        <p class="project-desc text-zinc-600 mb-8 text-center leading-relaxed text-sm">${project.description}</p>

        <!-- Tags -->
        <div class="project-tags flex flex-wrap justify-center gap-2 mb-8 mt-auto">
            ${tagsHTML}
        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-3 gap-1.5 sm:gap-2 w-full mt-auto">
            <a href="${project.github}" target="_blank"
               class="group flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-800 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 text-[10px] sm:text-xs">
                ${GITHUB_SVG}
                <span class="whitespace-nowrap">View Code</span>
            </a>
            <a href="${project.demo}"
               class="project-demo-link group flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-sm hover:shadow-md hover:shadow-brand-500/30 transition-all duration-300 text-[10px] sm:text-xs">
                <i data-lucide="external-link" class="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform"></i>
                <span class="whitespace-nowrap">Live Demo</span>
            </a>
            <button onclick="openModal(this)"
               class="group flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl border-2 border-purple-300 text-purple-600 font-semibold hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 text-[10px] sm:text-xs">
                <i data-lucide="file-text" class="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform"></i>
                <span class="whitespace-nowrap">Case Study</span>
            </button>
        </div>
    `;

    return card;
}

/* ============================================================
   INIT  —   Render grid after page load and lucide icons ready
   ============================================================ */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Clear the grid before rendering
    grid.innerHTML = '';

    PROJECTS.forEach((project, index) => {
        const card = createProjectCard(project, index);

        // featured:false cards stay hidden on the homepage
        // (they only show up inside the "View All Projects" overlay)
        if (!project.featured) {
            card.classList.add('hidden-project');
        }

        grid.appendChild(card);
    });

    // Re-init lucide icons for the new cards
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// renderProjects() is called from index.html after lucide loads
// Do NOT call it here — lucide must be available first
