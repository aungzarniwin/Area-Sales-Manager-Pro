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

  let state = loadState();

  /* =========================================================
     BASIC HELPERS
  ========================================================= */

  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function safeNumber(value) {
    const number = parseFloat(value);
    return Number.isFinite(number) ? number : 0;
  }

  function formatNumber(value, decimals = 1) {
    return safeNumber(value).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return structuredClone
          ? structuredClone(defaultState)
          : JSON.parse(JSON.stringify(defaultState));
      }

      const parsed = JSON.parse(saved);

      return {
        ...defaultState,
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
      console.error("State loading error:", error);
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("State saving error:", error);
    }
  }

  /* =========================================================
     DATE / TIME
  ========================================================= */

  function updateDate() {
    const now = new Date();

    const dateText = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const elements = [
      "#todayDate",
      "#currentDate",
      ".today-date",
      "[data-current-date]"
    ];

    elements.forEach(selector => {
      $$(selector).forEach(element => {
        element.textContent = dateText;
      });
    });
  }

  /* =========================================================
     TOAST
  ========================================================= */

  function showToast(message, type = "success") {
    let toast = $("#toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.className = "toast show";

    if (type === "error") {
      toast.classList.add("toast-error");
    }

    if (type === "warning") {
      toast.classList.add("toast-warning");
    }

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* =========================================================
     SIDEBAR
  ========================================================= */

  function openSidebar() {
    document.body.classList.add("sidebar-open");

    const overlay = $("#sidebarOverlay");

    if (overlay) {
      overlay.classList.add("active");
    }
  }

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");

    const overlay = $("#sidebarOverlay");

    if (overlay) {
      overlay.classList.remove("active");
    }
  }

  function toggleSidebar() {
    if (document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  /* =========================================================
     PAGE CONFIG
  ========================================================= */

  const pageNames = {
    dashboard: "Dashboard",
    daily: "Daily Manager",
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

  function getPageTitle(page) {
    return pageNames[page] || "Dashboard";
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function showPage(pageName) {
    if (!pageName) {
      pageName = "dashboard";
    }

    const pages = $$(".page");

    pages.forEach(page => {
      page.classList.remove("active");

      const pageId = page.dataset.page;

      if (pageId === pageName) {
        page.classList.add("active");
      }
    });

    const navItems = $$("[data-page]");

    navItems.forEach(item => {
      item.classList.remove("active");

      if (item.dataset.page === pageName) {
        item.classList.add("active");
      }
    });

    state.currentPage = pageName;
    saveState();

    updateBreadcrumb(pageName);

    closeSidebar();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    refreshPageData(pageName);
  }

  function updateBreadcrumb(pageName) {
    const title = getPageTitle(pageName);

    const breadcrumb = $("[data-breadcrumb]");

    if (breadcrumb) {
      breadcrumb.textContent = title;
    }

    const breadcrumbElements = [
      "#breadcrumb",
      "#pageTitle",
      ".breadcrumb-current"
    ];

    breadcrumbElements.forEach(selector => {
      $$(selector).forEach(element => {
        if (
          element.id === "pageTitle" &&
          pageName === "dashboard"
        ) {
          return;
        }

        element.textContent = title;
      });
    });

    const titleElement = $("#topbarPageTitle");

    if (titleElement) {
      titleElement.textContent = title;
    }
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  function calculateDashboard() {
    const target = safeNumber(state.dashboard.target);
    const actual = safeNumber(state.dashboard.actual);
    const team = safeNumber(state.dashboard.team);

    const achievement = target > 0
      ? (actual / target) * 100
      : 0;

    const gap = Math.max(target - actual, 0);

    return {
      target,
      actual,
      team,
      achievement,
      gap
    };
  }

  function updateDashboard() {
    const data = calculateDashboard();

    const values = {
      target: formatNumber(data.target),
      actual: formatNumber(data.actual),
      achievement: `${Math.round(data.achievement)}%`,
      gap: formatNumber(data.gap),
      team: String(data.team)
    };

    const mapping = {
      target: [
        "#monthlyTarget",
        "[data-kpi='target']",
        "[data-value='target']"
      ],

      actual: [
        "#actualSales",
        "[data-kpi='actual']",
        "[data-value='actual']"
      ],

      achievement: [
        "#achievement",
        "[data-kpi='achievement']",
        "[data-value='achievement']"
      ],

      gap: [
        "#targetGap",
        "[data-kpi='gap']",
        "[data-value='gap']"
      ],

      team: [
        "#teamMembers",
        "[data-kpi='team']",
        "[data-value='team']"
      ]
    };

    Object.keys(mapping).forEach(key => {
      mapping[key].forEach(selector => {
        $$(selector).forEach(element => {
          element.textContent = values[key];
        });
      });
    });

    updateProgressBars(data.achievement);
  }

  function updateProgressBars(achievement) {
    const percentage = Math.max(
      0,
      Math.min(achievement, 100)
    );

    $$("[data-progress]").forEach(bar => {
      bar.style.width = `${percentage}%`;
    });

    $$(".progress-fill").forEach(bar => {
      const currentWidth = bar.dataset.width;

      if (currentWidth) {
        bar.style.width = currentWidth;
      }
    });

    const dashboardProgress = $(
      "#monthlyProgress"
    );

    if (dashboardProgress) {
      dashboardProgress.style.width =
        `${percentage}%`;
    }
  }

  /* =========================================================
     DAILY MANAGER
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

  function getFieldValue(fieldName) {
    const element = $(`#${fieldName}`);

    if (!element) {
      return "";
    }

    return element.value ?? "";
  }

  function setFieldValue(fieldName, value) {
    const element = $(`#${fieldName}`);

    if (!element) {
      return;
    }

    element.value = value ?? "";
  }

  function saveDailyManager() {
    dailyFields.forEach(field => {
      state.dailyManager[field] =
        getFieldValue(field);
    });

    saveState();

    updateDailyProgress();

    showToast(
      "Daily Manager plan saved successfully."
    );
  }

  function loadDailyManager() {
    dailyFields.forEach(field => {
      setFieldValue(
        field,
        state.dailyManager[field]
      );
    });

    updateDailyProgress();
  }

  function updateDailyProgress() {
    const total = dailyFields.length;

    let completed = 0;

    dailyFields.forEach(field => {
      const value =
        state.dailyManager[field];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        completed++;
      }
    });

    const percentage = total > 0
      ? Math.round((completed / total) * 100)
      : 0;

    const progressText =
      `${completed}/${total} completed`;

    $$("[data-daily-progress]").forEach(element => {
      element.textContent =
        `${percentage}%`;
    });

    $$("[data-daily-completed]").forEach(element => {
      element.textContent =
        progressText;
    });

    $$("[data-daily-bar]").forEach(element => {
      element.style.width =
        `${percentage}%`;
    });
  }

  function resetDailyManager() {
    const confirmed = window.confirm(
      "Reset today's Daily Manager plan?"
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
     DAILY FORM AUTO SAVE
  ========================================================= */

  function handleDailyInput(event) {
    const target = event.target;

    if (!target.id) {
      return;
    }

    if (!dailyFields.includes(target.id)) {
      return;
    }

    state.dailyManager[target.id] =
      target.value;

    saveState();

    updateDailyProgress();
  }

  /* =========================================================
     SALES TARGET QUICK UPDATE
  ========================================================= */

  function updateSalesTarget() {
    const targetInput = $(
      "#salesTargetInput"
    );

    const actualInput = $(
      "#salesActualInput"
    );

    if (!targetInput || !actualInput) {
      return;
    }

    const target =
      safeNumber(targetInput.value);

    const actual =
      safeNumber(actualInput.value);

    state.dashboard.target = target;
    state.dashboard.actual = actual;

    saveState();

    updateDashboard();

    showToast(
      "Sales Target updated."
    );
  }

  /* =========================================================
     GENERIC BUTTON ACTIONS
  ========================================================= */

  function handleAction(action) {
    switch (action) {

      case "start-daily":
        showPage("daily");
        showToast(
          "Daily Manager opened."
        );
        break;

      case "save-daily":
        saveDailyManager();
        break;

      case "reset-daily":
        resetDailyManager();
        break;

      case "update-target":
        updateSalesTarget();
        break;

      case "notifications":
        showToast(
          "No new manager alerts."
        );
        break;

      case "profile":
        showToast(
          "Aung Zar Ni Win — Sales Manager"
        );
        break;

      case "search":
        focusSearch();
        break;

      default:
        console.log(
          "Unknown action:",
          action
        );
    }
  }

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  function setupQuickActions() {
    $$("[data-quick-page]").forEach(button => {
      button.addEventListener("click", () => {
        const page =
          button.dataset.quickPage;

        if (page) {
          showPage(page);
        }
      });
    });
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  function focusSearch() {
    const search =
      $("#globalSearch") ||
      $("input[type='search']") ||
      $(".search-input");

    if (search) {
      search.focus();
    }
  }

  function setupSearch() {
    const search =
      $("#globalSearch") ||
      $("input[type='search']") ||
      $(".search-input");

    if (!search) {
      return;
    }

    search.addEventListener(
      "keydown",
      event => {
        if (event.key !== "Enter") {
          return;
        }

        const query =
          search.value
            .trim()
            .toLowerCase();

        if (!query) {
          showToast(
            "Type something to search."
          );
          return;
        }

        const match =
          Object.entries(pageNames)
            .find(([key, title]) =>
              title
                .toLowerCase()
                .includes(query) ||
              key.includes(query)
            );

        if (match) {
          showPage(match[0]);

          showToast(
            `${match[1]} opened.`
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

  function setupKeyboardShortcuts() {
    document.addEventListener(
      "keydown",
      event => {

        if (
          event.ctrlKey &&
          event.key.toLowerCase() === "d"
        ) {
          event.preventDefault();
          showPage("dashboard");
        }

        if (
          event.ctrlKey &&
          event.key.toLowerCase() === "m"
        ) {
          event.preventDefault();
          showPage("daily");
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
     GLOBAL CLICK HANDLER
  ========================================================= */

  function setupClicks() {
    document.addEventListener(
      "click",
      event => {

        const navButton =
          event.target.closest(
            "[data-page]"
          );

        if (
          navButton &&
          navButton.dataset.page
        ) {
          event.preventDefault();

          showPage(
            navButton.dataset.page
          );

          return;
        }

        const actionButton =
          event.target.closest(
            "[data-page-action]"
          );

        if (
          actionButton &&
          actionButton.dataset.pageAction
        ) {
          event.preventDefault();

          handleAction(
            actionButton.dataset.pageAction
          );

          return;
        }

        const quickButton =
          event.target.closest(
            "[data-quick-page]"
          );

        if (
          quickButton &&
          quickButton.dataset.quickPage
        ) {
          event.preventDefault();

          showPage(
            quickButton.dataset.quickPage
          );

          return;
        }

        const menuButton =
          event.target.closest(
            "[data-menu-toggle]"
          );

        if (menuButton) {
          event.preventDefault();
          toggleSidebar();
          return;
        }

        const closeButton =
          event.target.closest(
            "[data-sidebar-close]"
          );

        if (closeButton) {
          event.preventDefault();
          closeSidebar();
          return;
        }

        const overlay =
          event.target.closest(
            "#sidebarOverlay"
          );

        if (overlay) {
          closeSidebar();
        }
      }
    );
  }

  /* =========================================================
     FORMS
  ========================================================= */

  function setupForms() {
    document.addEventListener(
      "input",
      handleDailyInput
    );

    document.addEventListener(
      "change",
      handleDailyInput
    );

    const forms = $$("form");

    forms.forEach(form => {
      form.addEventListener(
        "submit",
        event => {
          event.preventDefault();

          const saveButton =
            form.querySelector(
              "[data-page-action='save-daily']"
            );

          if (saveButton) {
            saveDailyManager();
          }
        }
      );
    });
  }

  /* =========================================================
     PAGE DATA REFRESH
  ========================================================= */

  function refreshPageData(pageName) {

    switch (pageName) {

      case "dashboard":
        updateDashboard();
        break;

      case "daily":
        loadDailyManager();
        break;

      case "sales-target":
        updateTargetPage();
        break;

      case "sales-forecast":
        updateForecastPage();
        break;

      default:
        break;
    }
  }

  /* =========================================================
     SALES TARGET PAGE
  ========================================================= */

  function updateTargetPage() {

    const target =
      safeNumber(
        state.dashboard.target
      );

    const actual =
      safeNumber(
        state.dashboard.actual
      );

    const achievement =
      target > 0
        ? (actual / target) * 100
        : 0;

    const gap =
      Math.max(target - actual, 0);

    $$("[data-target-result]").forEach(
      element => {
        const type =
          element.dataset.targetResult;

        if (type === "target") {
          element.textContent =
            formatNumber(target);
        }

        if (type === "actual") {
          element.textContent =
            formatNumber(actual);
        }

        if (type === "achievement") {
          element.textContent =
            `${Math.round(achievement)}%`;
        }

        if (type === "gap") {
          element.textContent =
            formatNumber(gap);
        }
      }
    );
  }

  /* =========================================================
     FORECAST
  ========================================================= */

  function updateForecastPage() {

    const target =
      safeNumber(
        state.dashboard.target
      );

    const actual =
      safeNumber(
        state.dashboard.actual
      );

    const now =
      new Date();

    const currentDay =
      now.getDate();

    const daysInMonth =
      new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();

    const elapsed =
      Math.max(currentDay, 1);

    const dailyRunRate =
      actual / elapsed;

    const forecast =
      dailyRunRate * daysInMonth;

    const remaining =
      Math.max(
        target - actual,
        0
      );

    const requiredDaily =
      daysInMonth > elapsed
        ? remaining /
          (daysInMonth - elapsed)
        : remaining;

    $$("[data-forecast]").forEach(
      element => {

        const type =
          element.dataset.forecast;

        if (type === "forecast") {
          element.textContent =
            formatNumber(forecast);
        }

        if (type === "run-rate") {
          element.textContent =
            formatNumber(dailyRunRate);
        }

        if (type === "required") {
          element.textContent =
            formatNumber(requiredDaily);
        }

        if (type === "target") {
          element.textContent =
            formatNumber(target);
        }
      }
    );
  }

  /* =========================================================
     MOBILE RESPONSIVE
  ========================================================= */

  function setupMobile() {

    const menuButtons = $$(
      "[data-menu-toggle]"
    );

    menuButtons.forEach(button => {
      button.addEventListener(
        "click",
        event => {
          event.preventDefault();
          toggleSidebar();
        }
      );
    });

    const overlay =
      $("#sidebarOverlay");

    if (overlay) {
      overlay.addEventListener(
        "click",
        closeSidebar
      );
    }
  }

  /* =========================================================
     INITIALIZATION
  ========================================================= */

  function initialize() {

    console.log(
      "Aung Sales Manager Pro initialized."
    );

    setupClicks();
    setupForms();
    setupQuickActions();
    setupSearch();
    setupKeyboardShortcuts();
    setupMobile();

    updateDate();
    updateDashboard();
    loadDailyManager();

    const initialPage =
      pageNames[state.currentPage]
        ? state.currentPage
        : "dashboard";

    showPage(initialPage);

    setInterval(
      updateDate,
      60000
    );
  }

  /* =========================================================
     START APP
  ========================================================= */

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );
  } else {
    initialize();
  }

})();
