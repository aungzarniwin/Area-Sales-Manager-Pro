/* =========================================================
   AUNG SALES MANAGER PRO
   app.js
   Version 1.0 Professional
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       GLOBAL CONFIG
       ===================================================== */

    const APP_NAME = "Aung Sales Manager Pro";

    const PAGE_NAMES = {
        dashboard: "Dashboard",
        "daily-manager": "Daily Manager",
        "sales-target": "Sales Target",
        "team-kpi": "Team KPI",
        distributor: "Distributor",
        territory: "Territory",
        "sales-forecast": "Sales Forecast",
        "manager-tools": "Manager Tools",
        reports: "Reports",
        "problem-solver": "Problem Solver",
        "ai-coach": "AI Sales Coach",
        academy: "Sales Academy",
        "professional-email": "Professional Email",
        settings: "Settings"
    };

    const STORAGE_KEYS = {
        dailyManager: "asm_daily_manager",
        salesTarget: "asm_sales_target",
        teamKpi: "asm_team_kpi",
        distributor: "asm_distributor",
        territory: "asm_territory",
        settings: "asm_settings",
        emailHistory: "asm_email_history"
    };

    /* =====================================================
       DOM HELPERS
       ===================================================== */

    function $(selector, parent) {
        return (parent || document).querySelector(selector);
    }

    function $$(selector, parent) {
        return Array.from(
            (parent || document).querySelectorAll(selector)
        );
    }

    function byId(id) {
        return document.getElementById(id);
    }

    function safeText(value) {
        return value == null ? "" : String(value);
    }

    /* =====================================================
       STORAGE
       ===================================================== */

    function getStorage(key, fallback) {
        try {
            const value = localStorage.getItem(key);

            if (!value) {
                return fallback;
            }

            return JSON.parse(value);
        } catch (error) {
            console.warn("Storage read error:", key, error);
            return fallback;
        }
    }

    function setStorage(key, value) {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;
        } catch (error) {
            console.warn("Storage write error:", key, error);
            return false;
        }
    }

    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message, type) {
        const toast = byId("toast");

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.remove(
            "success",
            "error",
            "warning",
            "show"
        );

        if (type) {
            toast.classList.add(type);
        }

        void toast.offsetWidth;

        toast.classList.add("show");

        clearTimeout(window.__asmToastTimer);

        window.__asmToastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2800);
    }

    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    function getPageElement(pageName) {
        return byId("page-" + pageName);
    }

    function updateBreadcrumb(pageName) {
        const breadcrumb = byId("breadcrumbCurrent");

        if (!breadcrumb) {
            return;
        }

        breadcrumb.textContent =
            PAGE_NAMES[pageName] || pageName;
    }

    function updateActiveNav(pageName) {
        $$(".nav-item[data-page]").forEach(function (item) {
            const itemPage = item.getAttribute("data-page");

            item.classList.toggle(
                "active",
                itemPage === pageName
            );
        });
    }

    function closeMobileSidebar() {
        const sidebar = $(".sidebar");
        const overlay = $(".sidebar-overlay");

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }
    }

    function openPage(pageName, options) {
        options = options || {};

        if (!PAGE_NAMES[pageName]) {
            console.warn(
                "Unknown page:",
                pageName
            );

            pageName = "dashboard";
        }

        const target = getPageElement(pageName);

        if (!target) {
            console.warn(
                "Page element not found:",
                "page-" + pageName
            );

            return false;
        }

        /*
         * Hide every page directly with style.display.
         * This makes navigation work even if CSS has issues.
         */

        $$(".page").forEach(function (page) {
            page.classList.remove("active");
            page.classList.remove("active-page");

            page.style.display = "none";
        });

        /*
         * Show selected page.
         */

        target.classList.add("active");
        target.style.display = "block";

        updateActiveNav(pageName);
        updateBreadcrumb(pageName);

        closeMobileSidebar();

        try {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } catch (error) {
            window.scrollTo(0, 0);
        }

        if (!options.silent) {
            window.history.replaceState(
                {
                    page: pageName
                },
                "",
                "#" + pageName
            );
        }

        /*
         * Module-specific refresh.
         */

        if (pageName === "dashboard") {
            updateDashboard();
        }

        if (pageName === "daily-manager") {
            loadDailyManager();
        }

        if (pageName === "sales-target") {
            loadSalesTarget();
        }

        if (pageName === "team-kpi") {
            loadTeamKPI();
        }

        return true;
    }

    /* =====================================================
       NAVIGATION EVENTS
       ===================================================== */

    function bindNavigation() {
        $$(".nav-item[data-page]").forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.preventDefault();

                const pageName =
                    item.getAttribute("data-page");

                openPage(pageName);
            });
        });

        $$("[data-page-action]").forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.preventDefault();

                const pageName =
                    item.getAttribute("data-page-action");

                openPage(pageName);
            });
        });
    }

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function bindMobileMenu() {
        const menuButton = $(".mobile-menu-btn");
        const sidebar = $(".sidebar");
        const overlay = $(".sidebar-overlay");

        if (menuButton && sidebar) {
            menuButton.addEventListener(
                "click",
                function () {
                    sidebar.classList.toggle("open");

                    if (overlay) {
                        overlay.classList.toggle(
                            "active"
                        );
                    }
                }
            );
        }

        if (overlay) {
            overlay.addEventListener(
                "click",
                closeMobileSidebar
            );
        }
    }

    /* =====================================================
       DATE
       ===================================================== */

    function formatDate(date) {
        return new Intl.DateTimeFormat(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(date);
    }

    function formatLongDate(date) {
        return new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);
    }

    function updateDateDisplays() {
        const now = new Date();

        $$(".date-line").forEach(function (element) {
            if (
                element.dataset &&
                element.dataset.dateFormat === "long"
            ) {
                element.textContent =
                    formatLongDate(now);
            } else {
                element.textContent =
                    formatDate(now);
            }
        });

        const todayDate = byId("todayDate");

        if (todayDate) {
            todayDate.textContent =
                formatLongDate(now);
        }
    }

    /* =====================================================
       DASHBOARD
       ===================================================== */

    function updateDashboard() {
        const targetData = getStorage(
            STORAGE_KEYS.salesTarget,
            {}
        );

        const kpiData = getStorage(
            STORAGE_KEYS.teamKpi,
            {}
        );

        const dailyData = getStorage(
            STORAGE_KEYS.dailyManager,
            {}
        );

        /*
         * Sales target
         */

        const target =
            Number(targetData.target) || 0;

        const achieved =
            Number(targetData.achieved) || 0;

        const achievement =
            target > 0
                ? Math.min(
                    100,
                    Math.round(
                        (achieved / target) * 100
                    )
                )
                : 0;

        setText(
            [
                "#dashboardTarget",
                "#salesTargetValue"
            ],
            formatNumber(target)
        );

        setText(
            [
                "#dashboardAchievement",
                "#achievementValue"
            ],
            achievement + "%"
        );

        /*
         * Team KPI
         */

        const teamMembers =
            Number(kpiData.teamMembers) || 0;

        const completed =
            Number(kpiData.completed) || 0;

        setText(
            [
                "#teamMemberCount",
                "#dashboardTeam"
            ],
            String(teamMembers)
        );

        setText(
            [
                "#kpiCompleted",
                "#dashboardKPI"
            ],
            String(completed)
        );

        /*
         * Daily manager
         */

        const tasks =
            Array.isArray(dailyData.tasks)
                ? dailyData.tasks
                : [];

        const completedTasks =
            tasks.filter(function (task) {
                return task.completed;
            }).length;

        setText(
            [
                "#dailyTaskCount",
                "#dashboardTasks"
            ],
            completedTasks + "/" + tasks.length
        );

        /*
         * Progress bars
         */

        setProgress(
            "#dashboardProgress",
            achievement
        );

        setProgress(
            "#targetProgress",
            achievement
        );
    }

    function setText(selectors, value) {
        if (!Array.isArray(selectors)) {
            selectors = [selectors];
        }

        selectors.forEach(function (selector) {
            const element = $(selector);

            if (element) {
                element.textContent = safeText(value);
            }
        });
    }

    function setProgress(selector, percent) {
        const element = $(selector);

        if (!element) {
            return;
        }

        const safePercent = Math.max(
            0,
            Math.min(100, Number(percent) || 0)
        );

        element.style.width =
            safePercent + "%";
    }

    function formatNumber(value) {
        const number = Number(value) || 0;

        return new Intl.NumberFormat(
            "en-US"
        ).format(number);
    }

    /* =====================================================
       DAILY MANAGER
       ===================================================== */

    const defaultDailyTasks = [
        {
            id: 1,
            title: "Review yesterday's sales",
            category: "Numbers",
            completed: false
        },
        {
            id: 2,
            title: "Check today's sales target",
            category: "Target",
            completed: false
        },
        {
            id: 3,
            title: "Review team performance",
            category: "People",
            completed: false
        },
        {
            id: 4,
            title: "Check distributor stock",
            category: "Distributor",
            completed: false
        },
        {
            id: 5,
            title: "Review market issues",
            category: "Market",
            completed: false
        },
        {
            id: 6,
            title: "Set field priorities",
            category: "Execution",
            completed: false
        }
    ];

    function loadDailyManager() {
        const data = getStorage(
            STORAGE_KEYS.dailyManager,
            {
                tasks: defaultDailyTasks
            }
        );

        if (
            !Array.isArray(data.tasks) ||
            data.tasks.length === 0
        ) {
            data.tasks = defaultDailyTasks;
        }

        const container =
            byId("dailyManagerTasks");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        data.tasks.forEach(function (task) {
            const row =
                document.createElement("div");

            row.className =
                "daily-task-row";

            row.style.cssText = `
                display:flex;
                align-items:center;
                gap:12px;
                padding:13px 0;
                border-bottom:1px solid #f1f5f9;
            `;

            row.innerHTML = `
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    data-task-id="${task.id}"
                    style="width:18px;height:18px;"
                >

                <div style="flex:1;">
                    <div style="
                        font-size:13px;
                        font-weight:700;
                        color:#0f172a;
                        ${
                            task.completed
                                ? "text-decoration:line-through;color:#94a3b8;"
                                : ""
                        }
                    ">
                        ${escapeHtml(task.title)}
                    </div>

                    <div style="
                        font-size:10px;
                        color:#94a3b8;
                        margin-top:3px;
                    ">
                        ${escapeHtml(task.category)}
                    </div>
                </div>
            `;

            container.appendChild(row);
        });

        $$("#dailyManagerTasks input[type='checkbox']")
            .forEach(function (checkbox) {

                checkbox.addEventListener(
                    "change",
                    function () {
                        toggleDailyTask(
                            Number(
                                checkbox.getAttribute(
                                    "data-task-id"
                                )
                            )
                        );
                    }
                );
            });

        updateDailyProgress(data.tasks);
    }

    function toggleDailyTask(id) {
        const data = getStorage(
            STORAGE_KEYS.dailyManager,
            {
                tasks: defaultDailyTasks
            }
        );

        data.tasks =
            Array.isArray(data.tasks)
                ? data.tasks
                : defaultDailyTasks;

        const task =
            data.tasks.find(function (item) {
                return item.id === id;
            });

        if (task) {
            task.completed =
                !task.completed;
        }

        setStorage(
            STORAGE_KEYS.dailyManager,
            data
        );

        loadDailyManager();
        updateDashboard();
    }

    function updateDailyProgress(tasks) {
        const total = tasks.length;

        const completed =
            tasks.filter(function (task) {
                return task.completed;
            }).length;

        const percent =
            total > 0
                ? Math.round(
                    (completed / total) * 100
                )
                : 0;

        setText(
            "#dailyManagerProgressText",
            completed +
            "/" +
            total +
            " completed"
        );

        setProgress(
            "#dailyManagerProgress",
            percent
        );
    }

    function resetDailyTasks() {
        setStorage(
            STORAGE_KEYS.dailyManager,
            {
                tasks:
                    defaultDailyTasks.map(
                        function (task) {
                            return {
                                ...task,
                                completed: false
                            };
                        }
                    )
            }
        );

        loadDailyManager();

        showToast(
            "Daily manager checklist reset.",
            "success"
        );
    }

    /* =====================================================
       SALES TARGET
       ===================================================== */

    function loadSalesTarget() {
        const data = getStorage(
            STORAGE_KEYS.salesTarget,
            {}
        );

        const targetInput =
            byId("salesTargetInput");

        const achievedInput =
            byId("salesAchievedInput");

        if (targetInput) {
            targetInput.value =
                data.target || "";
        }

        if (achievedInput) {
            achievedInput.value =
                data.achieved || "";
        }

        calculateSalesTarget();
    }

    function calculateSalesTarget() {
        const targetInput =
            byId("salesTargetInput");

        const achievedInput =
            byId("salesAchievedInput");

        if (!targetInput || !achievedInput) {
            return;
        }

        const target =
            Number(targetInput.value) || 0;

        const achieved =
            Number(achievedInput.value) || 0;

        const remaining =
            Math.max(
                0,
                target - achieved
            );

        const achievement =
            target > 0
                ? Math.round(
                    (achieved / target) * 100
                )
                : 0;

        setText(
            "#salesRemaining",
            formatNumber(remaining)
        );

        setText(
            "#salesAchievement",
            achievement + "%"
        );

        setProgress(
            "#salesTargetProgress",
            achievement
        );

        setStorage(
            STORAGE_KEYS.salesTarget,
            {
                target: target,
                achieved: achieved
            }
        );

        updateDashboard();
    }

    /* =====================================================
       TEAM KPI
       ===================================================== */

    function loadTeamKPI() {
        const data = getStorage(
            STORAGE_KEYS.teamKpi,
            {}
        );

        const teamInput =
            byId("teamMembersInput");

        const completedInput =
            byId("kpiCompletedInput");

        if (teamInput) {
            teamInput.value =
                data.teamMembers || "";
        }

        if (completedInput) {
            completedInput.value =
                data.completed || "";
        }
    }

    function saveTeamKPI() {
        const teamInput =
            byId("teamMembersInput");

        const completedInput =
            byId("kpiCompletedInput");

        const data = {
            teamMembers:
                Number(
                    teamInput
                        ? teamInput.value
                        : 0
                ) || 0,

            completed:
                Number(
                    completedInput
                        ? completedInput.value
                        : 0
                ) || 0
        };

        setStorage(
            STORAGE_KEYS.teamKpi,
            data
        );

        updateDashboard();

        showToast(
            "Team KPI saved successfully.",
            "success"
        );
    }

    /* =====================================================
       SEARCH
       ===================================================== */

    function bindGlobalSearch() {
        const searchInput =
            byId("globalSearch");

        if (!searchInput) {
            return;
        }

        searchInput.addEventListener(
            "input",
            function () {
                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                if (!query) {
                    return;
                }

                const match =
                    Object.entries(
                        PAGE_NAMES
                    ).find(function (entry) {
                        return entry[1]
                            .toLowerCase()
                            .includes(query);
                    });

                if (match) {
                    openPage(
                        match[0]
                    );
                }
            }
        );
    }

    /* =====================================================
       NOTIFICATION
       ===================================================== */

    function bindNotifications() {
        const button =
            $(
                ".icon-btn[data-action='notifications'], " +
                ".top-icon-btn[data-action='notifications']"
            );

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            function () {
                showToast(
                    "No new notifications.",
                    "info"
                );
            }
        );
    }

    /* =====================================================
       PROFILE
       ===================================================== */

    function bindProfile() {
        const profile =
            $(".top-profile");

        if (!profile) {
            return;
        }

        profile.addEventListener(
            "click",
            function () {
                openPage("settings");
            }
        );

        profile.style.cursor = "pointer";
    }

    /* =====================================================
       RESET DATA
       ===================================================== */

    function resetAllData() {
        const confirmed =
            window.confirm(
                "Reset all Aung Sales Manager data?"
            );

        if (!confirmed) {
            return;
        }

        Object.values(
            STORAGE_KEYS
        ).forEach(function (key) {
            localStorage.removeItem(key);
        });

        showToast(
            "All app data has been reset.",
            "success"
        );

        setTimeout(
            function () {
                location.reload();
            },
            500
        );
    }

    /* =====================================================
       BUTTON ACTIONS
       ===================================================== */

    function bindButtons() {

        $$("[data-action]").forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const action =
                            button.getAttribute(
                                "data-action"
                            );

                        if (
                            action ===
                            "reset-daily"
                        ) {
                            resetDailyTasks();
                        }

                        if (
                            action ===
                            "calculate-target"
                        ) {
                            calculateSalesTarget();
                        }

                        if (
                            action ===
                            "save-kpi"
                        ) {
                            saveTeamKPI();
                        }

                        if (
                            action ===
                            "reset-data"
                        ) {
                            resetAllData();
                        }

                        if (
                            action ===
                            "today"
                        ) {
                            updateDateDisplays();

                            showToast(
                                "Today's information updated.",
                                "success"
                            );
                        }
                    }
                );
            }
        );

        /*
         * Direct button IDs
         */

        const targetInputs = [
            byId("salesTargetInput"),
            byId("salesAchievedInput")
        ];

        targetInputs.forEach(
            function (input) {
                if (!input) {
                    return;
                }

                input.addEventListener(
                    "input",
                    calculateSalesTarget
                );
            }
        );

        const saveKpiButton =
            byId("saveTeamKPI");

        if (saveKpiButton) {
            saveKpiButton.addEventListener(
                "click",
                saveTeamKPI
            );
        }
    }

    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHtml(value) {
        return safeText(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    function bindKeyboardShortcuts() {
        document.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Ctrl + K
                 * Focus search
                 */

                if (
                    event.ctrlKey &&
                    event.key.toLowerCase() === "k"
                ) {
                    event.preventDefault();

                    const search =
                        byId("globalSearch");

                    if (search) {
                        search.focus();
                    }
                }

                /*
                 * Escape
                 */

                if (event.key === "Escape") {
                    closeMobileSidebar();
                }
            }
        );
    }

    /* =====================================================
       HASH ROUTING
       ===================================================== */

    function loadInitialPage() {
        const hash =
            window.location.hash
                .replace("#", "")
                .trim();

        if (
            hash &&
            PAGE_NAMES[hash]
        ) {
            openPage(
                hash,
                {
                    silent: true
                }
            );

            return;
        }

        openPage(
            "dashboard",
            {
                silent: true
            }
        );
    }

    window.addEventListener(
        "hashchange",
        function () {
            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim();

            if (
                hash &&
                PAGE_NAMES[hash]
            ) {
                openPage(
                    hash,
                    {
                        silent: true
                    }
                );
            }
        }
    );

    /* =====================================================
       DEMO DATA INITIALIZATION
       ===================================================== */

    function initializeDefaultData() {

        if (
            localStorage.getItem(
                STORAGE_KEYS.dailyManager
            ) === null
        ) {
            setStorage(
                STORAGE_KEYS.dailyManager,
                {
                    tasks:
                        defaultDailyTasks
                            .map(function (task) {
                                return {
                                    ...task
                                };
                            })
                }
            );
        }

        if (
            localStorage.getItem(
                STORAGE_KEYS.salesTarget
            ) === null
        ) {
            setStorage(
                STORAGE_KEYS.salesTarget,
                {
                    target: 0,
                    achieved: 0
                }
            );
        }

        if (
            localStorage.getItem(
                STORAGE_KEYS.teamKpi
            ) === null
        ) {
            setStorage(
                STORAGE_KEYS.teamKpi,
                {
                    teamMembers: 0,
                    completed: 0
                }
            );
        }
    }

    /* =====================================================
       APP START
       ===================================================== */

    function initApp() {

        initializeDefaultData();

        bindNavigation();

        bindMobileMenu();

        bindGlobalSearch();

        bindNotifications();

        bindProfile();

        bindButtons();

        bindKeyboardShortcuts();

        updateDateDisplays();

        loadDailyManager();

        loadSalesTarget();

        loadTeamKPI();

        updateDashboard();

        loadInitialPage();

        /*
         * Application ready event
         */

        document.body.classList.add(
            "asm-ready"
        );

        console.log(
            APP_NAME +
            " initialized successfully."
        );
    }

    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.AungSalesManager = {
        openPage: openPage,
        showToast: showToast,
        updateDashboard: updateDashboard,
        resetDailyTasks: resetDailyTasks,
        calculateSalesTarget:
            calculateSalesTarget,
        saveTeamKPI: saveTeamKPI,
        resetAllData: resetAllData,
        formatNumber: formatNumber
    };

    /* =====================================================
       START AFTER DOM
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initApp
        );
    } else {
        initApp();
    }

})();
