/* =========================================================
   AUNG SALES MANAGER PRO
   app.js
   Version 1.2 Stable
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       PAGE NAMES
    --------------------------------------------------------- */

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


    /* ---------------------------------------------------------
       BASIC HELPERS
    --------------------------------------------------------- */

    function $(selector) {
        return document.querySelector(selector);
    }

    function $all(selector) {
        return document.querySelectorAll(selector);
    }

    function showToast(message) {
        const toast = $("#toast");
        const toastMessage = $("#toastMessage");

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }


    /* ---------------------------------------------------------
       PAGE NAVIGATION
    --------------------------------------------------------- */

    function openPage(pageName) {

        const target = document.getElementById("page-" + pageName);

        if (!target) {
            console.error("Page not found:", "page-" + pageName);
            showToast("Page မတွေ့ပါ: " + pageName);
            return;
        }

        /* Hide every page */
        $all(".page").forEach(function (page) {
            page.classList.remove("active");
            page.style.display = "none";
        });

        /* Show selected page */
        target.classList.add("active");
        target.style.display = "block";

        /* Update navigation active state */
        $all(".nav-item[data-page]").forEach(function (item) {
            item.classList.remove("active");

            if (item.getAttribute("data-page") === pageName) {
                item.classList.add("active");
            }
        });

        /* Breadcrumb */
        const breadcrumb = $("#breadcrumbCurrent");

        if (breadcrumb) {
            breadcrumb.textContent =
                PAGE_NAMES[pageName] || pageName;
        }

        /* Close mobile sidebar */
        closeSidebar();

        /* Scroll to top */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /* Page-specific initialization */
        if (pageName === "dashboard") {
            updateDashboard();
        }

        if (pageName === "daily-manager") {
            updateDailyProgress();
        }

        console.log("Opened page:", pageName);
    }


    /* ---------------------------------------------------------
       NAVIGATION CLICK
    --------------------------------------------------------- */

    function setupNavigation() {

        /* Sidebar navigation */
        $all(".nav-item[data-page]").forEach(function (item) {

            item.addEventListener("click", function (event) {

                event.preventDefault();

                const pageName =
                    item.getAttribute("data-page");

                if (pageName) {
                    openPage(pageName);
                }
            });
        });


        /* Buttons / cards using data-page-action */
        $all("[data-page-action]").forEach(function (element) {

            element.addEventListener("click", function (event) {

                event.preventDefault();

                const pageName =
                    element.getAttribute("data-page-action");

                if (pageName) {
                    openPage(pageName);
                }
            });
        });
    }


    /* ---------------------------------------------------------
       MOBILE SIDEBAR
    --------------------------------------------------------- */

    function openSidebar() {

        const sidebar = $(".sidebar");
        const overlay = $("#sidebarOverlay");

        if (sidebar) {
            sidebar.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("show");
        }
    }


    function closeSidebar() {

        const sidebar = $(".sidebar");
        const overlay = $("#sidebarOverlay");

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("show");
        }
    }


    function setupMobileMenu() {

        const menuButton = $("#mobileMenuBtn");
        const overlay = $("#sidebarOverlay");

        if (menuButton) {

            menuButton.addEventListener("click", function () {

                const sidebar = $(".sidebar");

                if (!sidebar) return;

                if (sidebar.classList.contains("open")) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });
        }

        if (overlay) {
            overlay.addEventListener("click", function () {
                closeSidebar();
            });
        }
    }


    /* ---------------------------------------------------------
       TODAY DATE
    --------------------------------------------------------- */

    function updateTodayDate() {

        const dateElement = $("#todayDate");

        if (!dateElement) return;

        const now = new Date();

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        dateElement.textContent =
            now.toLocaleDateString("en-US", options);
    }


    /* ---------------------------------------------------------
       DASHBOARD
    --------------------------------------------------------- */

    function updateDashboard() {

        const target = 500;
        const actual = 385;

        const achievement =
            target > 0
                ? (actual / target) * 100
                : 0;

        const gap =
            Math.max(target - actual, 0);


        const targetElement = $("#kpiTarget");
        const actualElement = $("#kpiActual");
        const achievementElement = $("#kpiAchievement");
        const gapElement = $("#kpiGap");


        if (targetElement) {
            targetElement.textContent =
                target.toFixed(1) + " L";
        }

        if (actualElement) {
            actualElement.textContent =
                actual.toFixed(1) + " L";
        }

        if (achievementElement) {
            achievementElement.textContent =
                Math.round(achievement) + "%";
        }

        if (gapElement) {
            gapElement.textContent =
                gap.toFixed(1) + " L";
        }


        /* Performance section */

        const performanceActual =
            $("#performanceActual");

        const performanceTarget =
            $("#performanceTarget");

        const performanceGap =
            $("#performanceGap");

        const performancePercent =
            $("#performancePercent");

        const performanceProgress =
            $("#performanceProgress");

        const actualBar =
            $("#actualBar");

        const achievementBadge =
            $("#achievementBadge");


        if (performanceActual) {
            performanceActual.textContent =
                actual.toFixed(1) + " L";
        }

        if (performanceTarget) {
            performanceTarget.textContent =
                target.toFixed(1) + " L";
        }

        if (performanceGap) {
            performanceGap.textContent =
                gap.toFixed(1) + " L";
        }

        if (performancePercent) {
            performancePercent.textContent =
                Math.round(achievement) + "%";
        }

        if (performanceProgress) {
            performanceProgress.style.width =
                Math.min(achievement, 100) + "%";
        }

        if (actualBar) {
            actualBar.style.width =
                Math.min(achievement, 100) + "%";
        }

        if (achievementBadge) {
            achievementBadge.textContent =
                Math.round(achievement) + "% Achievement";
        }
    }


    /* ---------------------------------------------------------
       DAILY MANAGER
    --------------------------------------------------------- */

    const DAILY_KEY =
        "aung_sales_manager_daily";


    function getDailyData() {

        try {

            const data =
                localStorage.getItem(DAILY_KEY);

            return data
                ? JSON.parse(data)
                : {};

        } catch (error) {

            console.error(
                "Daily data error:",
                error
            );

            return {};
        }
    }


    function saveDailySection(section) {

        const data = getDailyData();

        data[section] = {
            saved: true,
            time: new Date().toISOString()
        };

        try {

            localStorage.setItem(
                DAILY_KEY,
                JSON.stringify(data)
            );

            showToast(
                "Daily Manager data saved successfully."
            );

            updateDailyProgress();

        } catch (error) {

            console.error(
                "Save error:",
                error
            );

            showToast(
                "Data သိမ်းရာတွင် ပြဿနာရှိပါသည်။"
            );
        }
    }


    function updateDailyProgress() {

        const sections = [
            "morning",
            "customer",
            "team",
            "distributor",
            "collection",
            "competitor",
            "eod",
            "action"
        ];

        const data = getDailyData();

        let completed = 0;

        sections.forEach(function (section) {

            if (
                data[section] &&
                data[section].saved
            ) {
                completed++;
            }
        });

        const percent =
            Math.round(
                (completed / sections.length) * 100
            );


        const progress =
            $("#dailyProgress");

        const text =
            $("#dailyCompletionText");


        if (progress) {
            progress.style.width =
                percent + "%";
        }

        if (text) {
            text.textContent =
                completed +
                " / " +
                sections.length +
                " completed";
        }
    }


    function resetDailyManager() {

        try {

            localStorage.removeItem(
                DAILY_KEY
            );

            updateDailyProgress();

            showToast(
                "Today's plan has been reset."
            );

        } catch (error) {

            console.error(error);
        }
    }


    function setupDailyManager() {

        $all("[data-save-section]").forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        const section =
                            button.getAttribute(
                                "data-save-section"
                            );

                        if (section) {
                            saveDailySection(section);
                        }
                    }
                );
            }
        );


        const resetButton =
            $("#resetDailyBtn");

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    resetDailyManager();
                }
            );
        }
    }


    /* ---------------------------------------------------------
       SEARCH
    --------------------------------------------------------- */

    function setupSearch() {

        const search =
            $("#globalSearch");

        if (!search) return;

        search.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                const query =
                    search.value
                        .trim()
                        .toLowerCase();

                if (!query) return;


                let foundPage = null;


                Object.keys(PAGE_NAMES).forEach(
                    function (page) {

                        const name =
                            PAGE_NAMES[page]
                                .toLowerCase();

                        if (
                            !foundPage &&
                            name.includes(query)
                        ) {
                            foundPage = page;
                        }
                    }
                );


                if (foundPage) {

                    openPage(foundPage);

                    showToast(
                        "Opened: " +
                        PAGE_NAMES[foundPage]
                    );

                } else {

                    showToast(
                        "No matching page found."
                    );
                }
            }
        );
    }


    /* ---------------------------------------------------------
       NOTIFICATION
    --------------------------------------------------------- */

    function setupNotification() {

        const button =
            $("#notificationBtn");

        if (!button) return;

        button.addEventListener(
            "click",
            function () {

                showToast(
                    "No new notifications."
                );
            }
        );
    }


    /* ---------------------------------------------------------
       PROFILE
    --------------------------------------------------------- */

    function setupProfile() {

        const profile =
            $(".top-profile");

        if (!profile) return;

        profile.addEventListener(
            "click",
            function () {

                showToast(
                    "Aung Zar Ni Win • Sales Manager"
                );
            }
        );
    }


    /* ---------------------------------------------------------
       KEYBOARD SHORTCUTS
    --------------------------------------------------------- */

    function setupKeyboardShortcuts() {

        document.addEventListener(
            "keydown",
            function (event) {

                /* Alt + D = Dashboard */
                if (
                    event.altKey &&
                    event.key.toLowerCase() === "d"
                ) {

                    event.preventDefault();

                    openPage("dashboard");
                }


                /* Alt + E = Professional Email */
                if (
                    event.altKey &&
                    event.key.toLowerCase() === "e"
                ) {

                    event.preventDefault();

                    openPage(
                        "professional-email"
                    );
                }
            }
        );
    }


    /* ---------------------------------------------------------
       PROFESSIONAL EMAIL SAFETY CHECK
    --------------------------------------------------------- */

    function checkProfessionalEmailPage() {

        const page =
            document.getElementById(
                "page-professional-email"
            );

        if (!page) {

            console.warn(
                "Professional Email page not found."
            );

            return false;
        }

        return true;
    }


    /* ---------------------------------------------------------
       INITIAL PAGE
    --------------------------------------------------------- */

    function initializePages() {

        const pages =
            $all(".page");

        if (!pages.length) {

            console.error(
                "No .page elements found."
            );

            return;
        }


        /* Hide all first */

        pages.forEach(
            function (page) {

                page.classList.remove(
                    "active"
                );

                page.style.display =
                    "none";
            }
        );


        /* Dashboard first */

        const dashboard =
            document.getElementById(
                "page-dashboard"
            );

        if (dashboard) {

            dashboard.classList.add(
                "active"
            );

            dashboard.style.display =
                "block";
        }


        /* Dashboard nav active */

        $all(
            ".nav-item[data-page]"
        ).forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

                if (
                    item.getAttribute(
                        "data-page"
                    ) === "dashboard"
                ) {

                    item.classList.add(
                        "active"
                    );
                }
            }
        );


        const breadcrumb =
            $("#breadcrumbCurrent");

        if (breadcrumb) {

            breadcrumb.textContent =
                "Dashboard";
        }
    }


    /* ---------------------------------------------------------
       MAIN INITIALIZATION
    --------------------------------------------------------- */

    function init() {

        console.log(
            "Aung Sales Manager Pro starting..."
        );


        initializePages();

        setupNavigation();

        setupMobileMenu();

        setupDailyManager();

        setupSearch();

        setupNotification();

        setupProfile();

        setupKeyboardShortcuts();

        updateTodayDate();

        updateDashboard();

        updateDailyProgress();

        checkProfessionalEmailPage();


        console.log(
            "Aung Sales Manager Pro ready."
        );
    }


    /* ---------------------------------------------------------
       START
    --------------------------------------------------------- */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();
    }


    /* ---------------------------------------------------------
       GLOBAL ACCESS
    --------------------------------------------------------- */

    window.AungSalesManager = {

        openPage: openPage,

        updateDashboard:
            updateDashboard,

        updateDailyProgress:
            updateDailyProgress,

        showToast:
            showToast
    };

})();
