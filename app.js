/* =========================================================
   AUNG SALES MANAGER PRO
   MAIN APPLICATION
   Version 1.1
   ========================================================= */

(function () {
  "use strict";


  /* =========================================================
     PAGE CONFIGURATION
  ========================================================= */

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


  /* =========================================================
     HELPERS
  ========================================================= */

  function get(id) {
    return document.getElementById(id);
  }


  function showToast(message) {

    const toast = get("toast");
    const toastMessage = get("toastMessage");

    if (!toast || !toastMessage) {
      console.log(message);
      return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.aungToastTimer);

    window.aungToastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  function openPage(pageName) {

    if (!pageName) {
      pageName = "dashboard";
    }


    /*
      IMPORTANT:
      HTML structure uses:

      id="page-dashboard"
      id="page-professional-email"

      Therefore we directly use:

      page-${pageName}
    */

    const targetPage =
      document.getElementById(
        "page-" + pageName
      );


    if (!targetPage) {

      console.error(
        "Page not found:",
        "page-" + pageName
      );

      showToast(
        "Page not found: " + pageName
      );

      return;
    }


    /* Hide all pages */

    document
      .querySelectorAll(".page")
      .forEach(function (page) {

        page.classList.remove("active");

        page.style.display = "";

      });


    /* Show selected page */

    targetPage.classList.add("active");


    /*
      Do not force display:block here if CSS
      already controls .page / .page.active.

      The class "active" is enough.
    */


    /* Update sidebar active item */

    document
      .querySelectorAll(".nav-item")
      .forEach(function (item) {

        item.classList.remove("active");

      });


    const activeNav =
      document.querySelector(
        '.nav-item[data-page="' +
        pageName +
        '"]'
      );


    if (activeNav) {
      activeNav.classList.add("active");
    }


    /* Update breadcrumb */

    const breadcrumb =
      get("breadcrumbCurrent");


    if (breadcrumb) {

      breadcrumb.textContent =
        PAGE_NAMES[pageName] ||
        pageName;
    }


    /* Close mobile sidebar */

    closeMobileMenu();


    /* Scroll to top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    /* Page-specific refresh */

    if (
      pageName === "professional-email"
    ) {

      /*
        Professional Email JS is loaded
        separately.

        No additional action is required here.
      */

      console.log(
        "Professional Email page opened."
      );
    }


    showToast(
      (PAGE_NAMES[pageName] || pageName) +
      " opened."
    );
  }


  /* =========================================================
     NAV ITEM EVENTS
  ========================================================= */

  function bindNavigation() {

    document
      .querySelectorAll(
        ".nav-item[data-page]"
      )
      .forEach(function (item) {

        item.addEventListener(
          "click",
          function (event) {

            event.preventDefault();

            const pageName =
              item.getAttribute(
                "data-page"
              );

            openPage(pageName);

          }
        );

      });


    /*
      Buttons inside pages:

      data-page-action="dashboard"
      data-page-action="daily-manager"
      data-page-action="professional-email"
    */

    document
      .querySelectorAll(
        "[data-page-action]"
      )
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function (event) {

            event.preventDefault();

            const pageName =
              button.getAttribute(
                "data-page-action"
              );

            openPage(pageName);

          }
        );

      });
  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function openMobileMenu() {

    const sidebar =
      get("sidebar");

    const overlay =
      get("sidebarOverlay");


    if (sidebar) {
      sidebar.classList.add("open");
    }

    if (overlay) {
      overlay.classList.add("show");
    }
  }


  function closeMobileMenu() {

    const sidebar =
      get("sidebar");

    const overlay =
      get("sidebarOverlay");


    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (overlay) {
      overlay.classList.remove("show");
    }
  }


  function bindMobileMenu() {

    const menuButton =
      get("mobileMenuBtn");

    const overlay =
      get("sidebarOverlay");


    if (menuButton) {

      menuButton.addEventListener(
        "click",
        function () {

          const sidebar =
            get("sidebar");

          if (
            sidebar &&
            sidebar.classList.contains("open")
          ) {

            closeMobileMenu();

          } else {

            openMobileMenu();

          }

        }
      );
    }


    if (overlay) {

      overlay.addEventListener(
        "click",
        function () {

          closeMobileMenu();

        }
      );
    }
  }


  /* =========================================================
     DATE
  ========================================================= */

  function updateDate() {

    const dateElement =
      get("todayDate");


    if (!dateElement) {
      return;
    }


    const now =
      new Date();


    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };


    dateElement.textContent =
      now.toLocaleDateString(
        "en-US",
        options
      );
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  function updateDashboard() {

    const target =
      get("kpiTarget");

    const actual =
      get("kpiActual");

    const achievement =
      get("kpiAchievement");

    const gap =
      get("kpiGap");


    const performanceActual =
      get("performanceActual");

    const performanceTarget =
      get("performanceTarget");

    const performanceGap =
      get("performanceGap");

    const performancePercent =
      get("performancePercent");

    const progress =
      get("performanceProgress");

    const actualBar =
      get("actualBar");

    const badge =
      get("achievementBadge");


    if (target) {
      target.textContent = "500.0 L";
    }

    if (actual) {
      actual.textContent = "385.0 L";
    }

    if (achievement) {
      achievement.textContent = "77%";
    }

    if (gap) {
      gap.textContent = "115.0 L";
    }


    if (performanceActual) {
      performanceActual.textContent =
        "385.0 L";
    }

    if (performanceTarget) {
      performanceTarget.textContent =
        "500.0 L";
    }

    if (performanceGap) {
      performanceGap.textContent =
        "115.0 L";
    }

    if (performancePercent) {
      performancePercent.textContent =
        "77%";
    }


    if (progress) {
      progress.style.width = "77%";
    }

    if (actualBar) {
      actualBar.style.width = "77%";
    }

    if (badge) {
      badge.textContent = "77%";
    }
  }


  /* =========================================================
     DAILY MANAGER STORAGE
  ========================================================= */

  const DAILY_STORAGE =
    "aung_sales_manager_daily_manager";


  const DAILY_FIELDS = [

    "morningPriority",
    "morningSales",
    "morningCustomers",

    "customerName",
    "customerObjective",
    "customerNotes",

    "teamMember",
    "teamFollowType",
    "teamNotes",

    "distributorName",
    "distributorIssue",
    "distributorNotes",

    "collectionCustomer",
    "collectionAmount",
    "collectionNotes",

    "competitorName",
    "competitorType",
    "competitorNotes",

    "eodSales",
    "eodAchievement",
    "eodVisits",
    "eodWin",
    "eodImprove",

    "actionPlan",
    "actionOwner",
    "actionPriority"

  ];


  function loadDailyManager() {

    let data = {};

    try {

      const saved =
        localStorage.getItem(
          DAILY_STORAGE
        );

      if (saved) {
        data = JSON.parse(saved);
      }

    } catch (error) {

      console.error(
        "Daily data load error:",
        error
      );

    }


    DAILY_FIELDS.forEach(function (id) {

      const element =
        get(id);

      if (
        element &&
        Object.prototype.hasOwnProperty.call(
          data,
          id
        )
      ) {

        element.value =
          data[id] || "";

      }

    });


    updateDailyProgress();
  }


  function saveDailyManager() {

    const data = {};


    DAILY_FIELDS.forEach(function (id) {

      const element =
        get(id);

      if (element) {
        data[id] =
          element.value || "";
      }

    });


    try {

      localStorage.setItem(
        DAILY_STORAGE,
        JSON.stringify(data)
      );

      updateDailyProgress();

    } catch (error) {

      console.error(
        "Daily data save error:",
        error
      );
    }
  }


  function updateDailyProgress() {

    const fields =
      DAILY_FIELDS
        .map(function (id) {
          return get(id);
        })
        .filter(Boolean);


    if (!fields.length) {
      return;
    }


    let completed = 0;


    fields.forEach(function (field) {

      if (
        String(field.value || "").trim()
      ) {
        completed++;
      }

    });


    const percent =
      Math.round(
        (completed / fields.length) *
        100
      );


    const progress =
      get("dailyProgress");

    const text =
      get("dailyCompletionText");


    if (progress) {
      progress.style.width =
        percent + "%";
    }


    if (text) {
      text.textContent =
        percent +
        "% completed";
    }
  }


  function resetDailyManager() {

    const confirmed =
      window.confirm(
        "Reset today's manager plan?"
      );


    if (!confirmed) {
      return;
    }


    DAILY_FIELDS.forEach(function (id) {

      const element =
        get(id);

      if (element) {
        element.value = "";
      }

    });


    try {

      localStorage.removeItem(
        DAILY_STORAGE
      );

    } catch (error) {

      console.error(error);

    }


    updateDailyProgress();

    showToast(
      "Today's manager plan has been reset."
    );
  }


  function bindDailyManager() {

    document
      .querySelectorAll(
        "[data-save-section]"
      )
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            saveDailyManager();

            showToast(
              "Manager information saved."
            );

          }
        );

      });


    const resetButton =
      get("resetDailyBtn");


    if (resetButton) {

      resetButton.addEventListener(
        "click",
        resetDailyManager
      );

    }


    DAILY_FIELDS.forEach(function (id) {

      const element =
        get(id);

      if (!element) {
        return;
      }


      element.addEventListener(
        "input",
        updateDailyProgress
      );

    });
  }


  /* =========================================================
     SEARCH
  ========================================================= */

  function bindSearch() {

    const search =
      get("globalSearch");


    if (!search) {
      return;
    }


    search.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key !== "Enter"
        ) {
          return;
        }


        const query =
          search.value
            .trim()
            .toLowerCase();


        if (!query) {
          return;
        }


        const matches =
          Object.keys(PAGE_NAMES)
            .filter(function (key) {

              return (
                key
                  .toLowerCase()
                  .includes(query) ||

                PAGE_NAMES[key]
                  .toLowerCase()
                  .includes(query)
              );

            });


        if (matches.length) {

          openPage(
            matches[0]
          );

          search.value = "";

        } else {

          showToast(
            "No matching page found."
          );

        }

      }
    );
  }


  /* =========================================================
     NOTIFICATION
  ========================================================= */

  function bindNotification() {

    const button =
      get("notificationBtn");


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        showToast(
          "No new notifications."
        );

      }
    );
  }


  /* =========================================================
     PROFILE
  ========================================================= */

  function bindProfile() {

    const profile =
      document.querySelector(
        ".top-profile"
      );


    if (!profile) {
      return;
    }


    profile.addEventListener(
      "click",
      function () {

        openPage(
          "settings"
        );

      }
    );
  }


  /* =========================================================
     KEYBOARD SHORTCUT
  ========================================================= */

  function bindKeyboardShortcuts() {

    document.addEventListener(
      "keydown",
      function (event) {

        /*
          Alt + E
          = Professional Email
        */

        if (
          event.altKey &&
          event.key.toLowerCase() === "e"
        ) {

          event.preventDefault();

          openPage(
            "professional-email"
          );

        }


        /*
          Alt + D
          = Dashboard
        */

        if (
          event.altKey &&
          event.key.toLowerCase() === "d"
        ) {

          event.preventDefault();

          openPage(
            "dashboard"
          );

        }

      }
    );
  }


  /* =========================================================
     FIX PAGE STATE
  ========================================================= */

  function initializePages() {

    const pages =
      document.querySelectorAll(
        ".page"
      );


    pages.forEach(function (page) {

      page.classList.remove(
        "active"
      );

    });


    const dashboard =
      get("page-dashboard");


    if (dashboard) {

      dashboard.classList.add(
        "active"
      );

    }
  }


  /* =========================================================
     APP INIT
  ========================================================= */

  function init() {

    console.log(
      "Aung Sales Manager Pro initializing..."
    );


    initializePages();

    bindNavigation();

    bindMobileMenu();

    bindDailyManager();

    bindSearch();

    bindNotification();

    bindProfile();

    bindKeyboardShortcuts();

    updateDate();

    updateDashboard();

    loadDailyManager();


    console.log(
      "Aung Sales Manager Pro ready."
    );

    console.log(
      "Professional Email navigation ready."
    );
  }


  /* =========================================================
     START
  ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  /* =========================================================
     PUBLIC API
  ========================================================= */

  window.AungSalesManager = {

    openPage: openPage,

    showToast: showToast,

    updateDashboard:
      updateDashboard,

    saveDailyManager:
      saveDailyManager

  };

})();
