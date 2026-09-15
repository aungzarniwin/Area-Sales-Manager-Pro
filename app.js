(() => {
  "use strict";

  const STORAGE_KEY = "aung_sales_manager_pro_v1";

  const defaultState = {
    currentPage: "dashboard",

    dashboard: {
      target: 500,
      actual: 385,
      team: 4
    },

    dailyManager: {
      morningPriority: "",
      morningSales: "",
      morningCustomers: "",

      customerName: "",
      customerObjective: "",
      customerNotes: "",

      teamMember: "",
      teamFollowType: "",
      teamNotes: "",

      distributorName: "",
      distributorIssue: "",
      distributorNotes: "",

      collectionCustomer: "",
      collectionAmount: "",
      collectionNotes: "",

      competitorName: "",
      competitorType: "",
      competitorNotes: "",

      eodSales: "",
      eodAchievement: "",
      eodVisits: "",
      eodWin: "",
      eodImprove: "",

      actionPlan: "",
      actionOwner: "",
      actionPriority: ""
    }
  };


  /* =========================================================
     HELPERS
  ========================================================= */

  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function cloneDefaultState() {
    return JSON.parse(
      JSON.stringify(defaultState)
    );
  }

  function safeNumber(value) {
    const number = parseFloat(value);

    return Number.isFinite(number)
      ? number
      : 0;
  }

  function formatNumber(value, decimals = 1) {
    return safeNumber(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }
    );
  }


  /* =========================================================
     STORAGE
  ========================================================= */

  function loadState() {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return cloneDefaultState();
      }

      const parsed = JSON.parse(saved);

      return {
        ...cloneDefaultState(),
        ...parsed,

        dashboard: {
          ...defaultState.dashboard,
          ...(parsed.dashboard || {})
        },

        dailyManager: {
          ...defaultState.dailyManager,
          ...(parsed.dailyManager || {})
        }
      };

    } catch (error) {
      console.error(
        "Aung Sales Manager state error:",
        error
      );

      return cloneDefaultState();
    }
  }


  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.error(
        "Unable to save state:",
        error
      );
    }
  }


  let state = loadState();


  /* =========================================================
     PAGE CONFIG
  ========================================================= */

  const pageNames = {
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
    settings: "Settings"
  };


  /* =========================================================
     TOAST
  ========================================================= */

  function showToast(
    message,
    type = "success"
  ) {
    const toast = $("#toast");

    if (!toast) {
      return;
    }

    const messageElement =
      $("#toastMessage");

    if (messageElement) {
      messageElement.textContent =
        message;
    } else {
      toast.textContent = message;
    }

    toast.classList.remove(
      "toast-error",
      "toast-warning"
    );

    if (type === "error") {
      toast.classList.add(
        "toast-error"
      );
    }

    if (type === "warning") {
      toast.classList.add(
        "toast-warning"
      );
    }

    toast.classList.add("show");

    clearTimeout(
      window.__asmToastTimer
    );

    window.__asmToastTimer =
      setTimeout(() => {
        toast.classList.remove(
          "show"
        );
      }, 2500);
  }


  /* =========================================================
     SIDEBAR
  ========================================================= */

  function openSidebar() {
    document.body.classList.add(
      "sidebar-open"
    );

    const overlay =
      $("#sidebarOverlay");

    if (overlay) {
      overlay.classList.add("active");
    }
  }


  function closeSidebar() {
    document.body.classList.remove(
      "sidebar-open"
    );

    const overlay =
      $("#sidebarOverlay");

    if (overlay) {
      overlay.classList.remove("active");
    }
  }


  function toggleSidebar() {
    if (
      document.body.classList.contains(
        "sidebar-open"
      )
    ) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  function showPage(pageName) {

    if (!pageNames[pageName]) {
      pageName = "dashboard";
    }

    /* Hide all pages */

    $$(".page").forEach(page => {
      page.classList.remove(
        "active",
        "active-page"
      );
    });


    /* Show selected page */

    const selectedPage =
      document.getElementById(
        `page-${pageName}`
      );

    if (selectedPage) {

      selectedPage.classList.add(
        "active"
      );

      selectedPage.classList.add(
        "active-page"
      );

    } else {

      const dashboard =
        $("#page-dashboard");

      if (dashboard) {
        dashboard.classList.add(
          "active",
          "active-page"
        );
      }

      pageName = "dashboard";
    }


    /* Update sidebar active state */

    $$(".nav-item").forEach(item => {

      item.classList.remove(
        "active"
      );

      if (
        item.dataset.page ===
        pageName
      ) {
        item.classList.add(
          "active"
        );
      }
    });


    /* Save current page */

    state.currentPage =
      pageName;

    saveState();


    /* Breadcrumb */

    updateBreadcrumb(
      pageName
    );


    /* Close mobile sidebar */

    closeSidebar();


    /* Scroll top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    /* Refresh page */

    refreshPage(
      pageName
    );
  }


  function updateBreadcrumb(
    pageName
  ) {

    const title =
      pageNames[pageName] ||
      "Dashboard";

    const breadcrumb =
      $("#breadcrumbCurrent");

    if (breadcrumb) {
      breadcrumb.textContent =
        title;
    }
  }


  /* =========================================================
     DATE
  ========================================================= */

  function updateDate() {

    const today =
      new Date();

    const dateText =
      today.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );

    const dateElement =
      $("#todayDate");

    if (dateElement) {
      dateElement.textContent =
        dateText;
    }
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  function getDashboardData() {

    const target =
      safeNumber(
        state.dashboard.target
      );

    const actual =
      safeNumber(
        state.dashboard.actual
      );

    const team =
      safeNumber(
        state.dashboard.team
      );

    const achievement =
      target > 0
        ? (actual / target) * 100
        : 0;

    const gap =
      Math.max(
        target - actual,
        0
      );

    return {
      target,
      actual,
      team,
      achievement,
      gap
    };
  }


  function updateDashboard() {

    const data =
      getDashboardData();

    /* KPI */

    const kpiTarget =
      $("#kpiTarget");

    if (kpiTarget) {
      kpiTarget.textContent =
        `${formatNumber(data.target)} L`;
    }


    const kpiActual =
      $("#kpiActual");

    if (kpiActual) {
      kpiActual.textContent =
        `${formatNumber(data.actual)} L`;
    }


    const kpiAchievement =
      $("#kpiAchievement");

    if (kpiAchievement) {
      kpiAchievement.textContent =
        `${Math.round(data.achievement)}%`;
    }


    const kpiGap =
      $("#kpiGap");

    if (kpiGap) {
      kpiGap.textContent =
        `${formatNumber(data.gap)} L`;
    }


    const kpiTeam =
      $("#kpiTeam");

    if (kpiTeam) {
      kpiTeam.textContent =
        String(data.team);
    }


    /* Performance summary */

    const performanceActual =
      $("#performanceActual");

    if (performanceActual) {
      performanceActual.textContent =
        `${formatNumber(data.actual)} L`;
    }


    const performanceTarget =
      $("#performanceTarget");

    if (performanceTarget) {
      performanceTarget.textContent =
        `${formatNumber(data.target)} L`;
    }


    const performanceGap =
      $("#performanceGap");

    if (performanceGap) {
      performanceGap.textContent =
        `${formatNumber(data.gap)} L`;
    }


    const performancePercent =
      $("#performancePercent");

    if (performancePercent) {
      performancePercent.textContent =
        `${Math.round(data.achievement)}%`;
    }


    const achievementBadge =
      $("#achievementBadge");

    if (achievementBadge) {
      achievementBadge.textContent =
        `${Math.round(data.achievement)}% Achieved`;
    }


    /* Progress */

    const percentage =
      Math.max(
        0,
        Math.min(
          data.achievement,
          100
        )
      );


    const performanceProgress =
      $("#performanceProgress");

    if (performanceProgress) {
      performanceProgress.style.width =
        `${percentage}%`;
    }


    const actualBar =
      $("#actualBar");

    if (actualBar) {
      actualBar.style.width =
        `${percentage}%`;
    }
  }


  /* =========================================================
     DAILY MANAGER FIELDS
  ========================================================= */

  const dailyFields = [
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

    dailyFields.forEach(
      fieldName => {

        const element =
          document.getElementById(
            fieldName
          );

        if (!element) {
          return;
        }

        element.value =
          state.dailyManager[
            fieldName
          ] || "";
      }
    );

    updateDailyProgress();
  }


  function saveDailyManager() {

    dailyFields.forEach(
      fieldName => {

        const element =
          document.getElementById(
            fieldName
          );

        if (!element) {
          return;
        }

        state.dailyManager[
          fieldName
        ] = element.value;
      }
    );

    saveState();

    updateDailyProgress();

    showToast(
      "Daily Manager plan saved successfully."
    );
  }


  function updateDailyProgress() {

    let completed = 0;

    dailyFields.forEach(
      fieldName => {

        const value =
          state.dailyManager[
            fieldName
          ];

        if (
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
        ) {
          completed++;
        }
      }
    );


    const total =
      dailyFields.length;

    const percentage =
      total > 0
        ? Math.round(
            (completed / total) * 100
          )
        : 0;


    const completionText =
      $("#dailyCompletionText");

    if (completionText) {
      completionText.textContent =
        `${percentage}%`;
    }


    const progress =
      $("#dailyProgress");

    if (progress) {
      progress.style.width =
        `${percentage}%`;
    }
  }


  function resetDailyManager() {

    const confirmed =
      window.confirm(
        "Are you sure you want to reset today's Daily Manager plan?"
      );

    if (!confirmed) {
      return;
    }

    state.dailyManager =
      JSON.parse(
        JSON.stringify(
          defaultState.dailyManager
        )
      );

    saveState();

    loadDailyManager();

    showToast(
      "Today's plan has been reset.",
      "warning"
    );
  }


  /* =========================================================
     DAILY AUTO SAVE
  ========================================================= */

  function handleDailyInput(
    event
  ) {

    const element =
      event.target;

    if (!element.id) {
      return;
    }

    if (
      !dailyFields.includes(
        element.id
      )
    ) {
      return;
    }

    state.dailyManager[
      element.id
    ] = element.value;

    saveState();

    updateDailyProgress();
  }


  /* =========================================================
     BUTTON ACTIONS
  ========================================================= */

  function handlePageAction(
    action
  ) {

    if (!action) {
      return;
    }


    /* Page navigation */

    if (pageNames[action]) {

      showPage(action);

      return;
    }


    /* Special actions */

    switch (action) {

      case "save-daily":
        saveDailyManager();
        break;

      case "reset-daily":
        resetDailyManager();
        break;

      case "notifications":
        showToast(
          "No new manager alerts."
        );
        break;

      default:
        console.log(
          "Unknown page action:",
          action
        );
    }
  }


  /* =========================================================
     NAVIGATION CLICK EVENTS
  ========================================================= */

  function setupNavigation() {

    /* Sidebar navigation */

    $$(".nav-item").forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            const page =
              button.dataset.page;

            if (page) {
              showPage(page);
            }
          }
        );
      }
    );


    /* Buttons using data-page-action */

    $$("[data-page-action]").forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            const action =
              button.dataset.pageAction;

            handlePageAction(
              action
            );
          }
        );
      }
    );
  }


  /* =========================================================
     DAILY SECTION SAVE BUTTONS
  ========================================================= */

  function setupDailySaveButtons() {

    $$("[data-save-section]").forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            const section =
              button.dataset.saveSection;

            /* Save everything */

            dailyFields.forEach(
              fieldName => {

                const element =
                  document.getElementById(
                    fieldName
                  );

                if (element) {
                  state.dailyManager[
                    fieldName
                  ] = element.value;
                }
              }
            );

            saveState();

            updateDailyProgress();

            const messages = {
              morning:
                "Morning Manager Plan saved.",
              customer:
                "Customer Visit Plan saved.",
              team:
                "Team Follow-up saved.",
              distributor:
                "Distributor Issue saved.",
              collection:
                "Collection Plan saved.",
              competitor:
                "Market Intelligence saved.",
              eod:
                "End-of-Day Review saved.",
              action:
                "Manager Action Plan saved."
            };

            showToast(
              messages[section] ||
              "Information saved successfully."
            );
          }
        );
      }
    );
  }


  /* =========================================================
     DAILY INPUT EVENTS
  ========================================================= */

  function setupDailyInputs() {

    dailyFields.forEach(
      fieldName => {

        const element =
          document.getElementById(
            fieldName
          );

        if (!element) {
          return;
        }

        element.addEventListener(
          "input",
          handleDailyInput
        );

        element.addEventListener(
          "change",
          handleDailyInput
        );
      }
    );
  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function setupMobileMenu() {

    const mobileButton =
      $("#mobileMenuBtn");

    if (mobileButton) {

      mobileButton.addEventListener(
        "click",
        event => {

          event.preventDefault();

          toggleSidebar();
        }
      );
    }


    const overlay =
      $("#sidebarOverlay");

    if (overlay) {

      overlay.addEventListener(
        "click",
        event => {

          event.preventDefault();

          closeSidebar();
        }
      );
    }
  }


  /* =========================================================
     NOTIFICATION
  ========================================================= */

  function setupNotification() {

    const button =
      $("#notificationBtn");

    if (!button) {
      return;
    }

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        showToast(
          "No new manager alerts."
        );
      }
    );
  }


  /* =========================================================
     PROFILE
  ========================================================= */

  function setupProfile() {

    const profile =
      $(".top-profile");

    if (!profile) {
      return;
    }

    profile.addEventListener(
      "click",
      () => {

        showToast(
          "Aung Zar Ni Win — Sales Manager"
        );
      }
    );
  }


  /* =========================================================
     SEARCH
  ========================================================= */

  function setupSearch() {

    const search =
      $("#globalSearch");

    if (!search) {
      return;
    }

    search.addEventListener(
      "keydown",
      event => {

        if (
          event.key !== "Enter"
        ) {
          return;
        }

        event.preventDefault();

        const query =
          search.value
            .trim()
            .toLowerCase();

        if (!query) {

          showToast(
            "Please enter a page name."
          );

          return;
        }


        const found =
          Object.entries(
            pageNames
          ).find(
            ([key, title]) =>
              key
                .toLowerCase()
                .includes(query) ||
              title
                .toLowerCase()
                .includes(query)
          );


        if (found) {

          showPage(found[0]);

          showToast(
            `${found[1]} opened.`
          );

        } else {

          showToast(
            "No matching page found.",
            "warning"
          );
        }
      }
    );
  }


  /* =========================================================
     KEYBOARD SHORTCUTS
  ========================================================= */

  function setupKeyboard() {

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.ctrlKey &&
          event.key.toLowerCase() === "d"
        ) {

          event.preventDefault();

          showPage(
            "dashboard"
          );
        }


        if (
          event.ctrlKey &&
          event.key.toLowerCase() === "m"
        ) {

          event.preventDefault();

          showPage(
            "daily-manager"
          );
        }


        if (
          event.key === "Escape"
        ) {

          closeSidebar();
        }
      }
    );
  }


  /* =========================================================
     PAGE REFRESH
  ========================================================= */

  function refreshPage(
    pageName
  ) {

    switch (pageName) {

      case "dashboard":
        updateDashboard();
        break;

      case "daily-manager":
        loadDailyManager();
        break;

      default:
        break;
    }
  }


  /* =========================================================
     INITIAL PAGE
  ========================================================= */

  function initializePage() {

    let page =
      state.currentPage;

    if (!pageNames[page]) {
      page = "dashboard";
    }

    showPage(page);
  }


  /* =========================================================
     APP INITIALIZATION
  ========================================================= */

  function initialize() {

    console.log(
      "Aung Sales Manager Pro started successfully."
    );

    setupNavigation();

    setupDailySaveButtons();

    setupDailyInputs();

    setupMobileMenu();

    setupNotification();

    setupProfile();

    setupSearch();

    setupKeyboard();

    updateDate();

    updateDashboard();

    loadDailyManager();

    initializePage();


    /* Update date every minute */

    setInterval(
      updateDate,
      60000
    );
  }


  /* =========================================================
     START
  ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();
  }

})();
