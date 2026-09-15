
/* =========================================================
   AUNG SALES MANAGER PRO
   app.js
   Clean JavaScript Version 1.0
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     STORAGE
     ======================================================= */

  const STORAGE_KEY = "aung_sales_manager_pro_v1";

  const defaultData = {
    target: 500,
    actual: 385,
    team: 4,
    daily: {
      morning: {},
      customer: {},
      team: {},
      distributor: {},
      collection: {},
      competitor: {},
      eod: {},
      action: {}
    }
  };

  let appData = loadData();


  /* =======================================================
     START APP
     ======================================================= */

  document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();

    initializeMobileMenu();

    initializeDailyManager();

    initializeDashboardActions();

    initializeSearch();

    initializeNotification();

    initializeDate();

    updateDashboard();

    loadDailyForms();

    updateDailyProgress();

  });


  /* =======================================================
     LOCAL STORAGE
     ======================================================= */

  function loadData() {

    try {

      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return JSON.parse(JSON.stringify(defaultData));
      }

      const parsed = JSON.parse(saved);

      return {
        ...JSON.parse(JSON.stringify(defaultData)),
        ...parsed,
        daily: {
          ...JSON.parse(JSON.stringify(defaultData.daily)),
          ...(parsed.daily || {})
        }
      };

    } catch (error) {

      console.error("Storage load error:", error);

      return JSON.parse(JSON.stringify(defaultData));

    }

  }


  function saveData() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
      );

    } catch (error) {

      console.error("Storage save error:", error);

    }

  }


  /* =======================================================
     NAVIGATION
     ======================================================= */

  function initializeNavigation() {

    const navItems = document.querySelectorAll("[data-page]");

    navItems.forEach(function (button) {

      button.addEventListener("click", function () {

        const pageName = button.getAttribute("data-page");

        if (!pageName) {
          return;
        }

        showPage(pageName);

        closeMobileSidebar();

      });

    });


    const pageActions = document.querySelectorAll(
      "[data-page-action]"
    );

    pageActions.forEach(function (button) {

      button.addEventListener("click", function () {

        const pageName =
          button.getAttribute("data-page-action");

        if (!pageName) {
          return;
        }

        showPage(pageName);

        closeMobileSidebar();

      });

    });

  }


  function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {

      page.classList.remove("active-page");

    });


    const targetPage =
      document.getElementById("page-" + pageName);

    if (!targetPage) {

      console.warn(
        "Page not found:",
        pageName
      );

      return;

    }

    targetPage.classList.add("active-page");


    const navItems =
      document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

      item.classList.remove("active");

      if (
        item.getAttribute("data-page") === pageName
      ) {

        item.classList.add("active");

      }

    });


    updateBreadcrumb(pageName);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     BREADCRUMB
     ======================================================= */

  function updateBreadcrumb(pageName) {

    const breadcrumb =
      document.getElementById("breadcrumbCurrent");

    if (!breadcrumb) {
      return;
    }

    const names = {

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

    breadcrumb.textContent =
      names[pageName] || "Dashboard";

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function initializeMobileMenu() {

    const menuButton =
      document.getElementById("mobileMenuBtn");

    const sidebar =
      document.getElementById("sidebar");

    const overlay =
      document.getElementById("sidebarOverlay");


    if (menuButton) {

      menuButton.addEventListener(
        "click",
        function () {

          if (!sidebar) {
            return;
          }

          sidebar.classList.toggle("mobile-open");

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
        function () {

          closeMobileSidebar();

        }
      );

    }

  }


  function closeMobileSidebar() {

    const sidebar =
      document.getElementById("sidebar");

    const overlay =
      document.getElementById("sidebarOverlay");


    if (sidebar) {
      sidebar.classList.remove(
        "mobile-open"
      );
    }

    if (overlay) {
      overlay.classList.remove(
        "active"
      );
    }

  }


  /* =======================================================
     DAILY MANAGER
     ======================================================= */

  function initializeDailyManager() {

    const saveButtons =
      document.querySelectorAll(
        "[data-save-section]"
      );


    saveButtons.forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const section =
            button.getAttribute(
              "data-save-section"
            );

          saveDailySection(section);

        }
      );

    });


    const resetButton =
      document.getElementById(
        "resetDailyBtn"
      );


    if (resetButton) {

      resetButton.addEventListener(
        "click",
        function () {

          resetDailyPlan();

        }
      );

    }

  }


  function saveDailySection(section) {

    if (!appData.daily[section]) {

      appData.daily[section] = {};

    }


    let values = {};


    if (section === "morning") {

      values = {

        priority:
          getValue("morningPriority"),

        sales:
          getValue("morningSales"),

        customers:
          getValue("morningCustomers")

      };

    }


    if (section === "customer") {

      values = {

        customer:
          getValue("customerName"),

        objective:
          getValue("customerObjective"),

        notes:
          getValue("customerNotes")

      };

    }


    if (section === "team") {

      values = {

        member:
          getValue("teamMember"),

        followType:
          getValue("teamFollowType"),

        notes:
          getValue("teamNotes")

      };

    }


    if (section === "distributor") {

      values = {

        distributor:
          getValue("distributorName"),

        issue:
          getValue("distributorIssue"),

        notes:
          getValue("distributorNotes")

      };

    }


    if (section === "collection") {

      values = {

        customer:
          getValue("collectionCustomer"),

        amount:
          getValue("collectionAmount"),

        notes:
          getValue("collectionNotes")

      };

    }


    if (section === "competitor") {

      values = {

        competitor:
          getValue("competitorName"),

        type:
          getValue("competitorType"),

        notes:
          getValue("competitorNotes")

      };

    }


    if (section === "eod") {

      values = {

        sales:
          getValue("eodSales"),

        achievement:
          getValue("eodAchievement"),

        visits:
          getValue("eodVisits"),

        win:
          getValue("eodWin"),

        improve:
          getValue("eodImprove")

      };

    }


    if (section === "action") {

      values = {

        action:
          getValue("actionPlan"),

        owner:
          getValue("actionOwner"),

        priority:
          getValue("actionPriority")

      };

    }


    appData.daily[section] = values;

    saveData();

    updateDailyProgress();

    showToast(
      getSectionName(section) +
      " saved successfully."
    );

  }


  function getSectionName(section) {

    const names = {

      morning: "Morning Plan",

      customer: "Customer Visit Plan",

      team: "Team Follow-up",

      distributor: "Distributor Issue",

      collection: "Collection Plan",

      competitor: "Market Intelligence",

      eod: "End-of-Day Review",

      action: "Manager Action Plan"

    };

    return names[section] || "Plan";

  }


  function getValue(id) {

    const element =
      document.getElementById(id);

    if (!element) {
      return "";
    }

    return element.value.trim();

  }


  /* =======================================================
     LOAD DAILY FORMS
     ======================================================= */

  function loadDailyForms() {

    const d = appData.daily;


    setValue(
      "morningPriority",
      d.morning.priority
    );

    setValue(
      "morningSales",
      d.morning.sales
    );

    setValue(
      "morningCustomers",
      d.morning.customers
    );


    setValue(
      "customerName",
      d.customer.customer
    );

    setValue(
      "customerObjective",
      d.customer.objective
    );

    setValue(
      "customerNotes",
      d.customer.notes
    );


    setValue(
      "teamMember",
      d.team.member
    );

    setValue(
      "teamFollowType",
      d.team.followType
    );

    setValue(
      "teamNotes",
      d.team.notes
    );


    setValue(
      "distributorName",
      d.distributor.distributor
    );

    setValue(
      "distributorIssue",
      d.distributor.issue
    );

    setValue(
      "distributorNotes",
      d.distributor.notes
    );


    setValue(
      "collectionCustomer",
      d.collection.customer
    );

    setValue(
      "collectionAmount",
      d.collection.amount
    );

    setValue(
      "collectionNotes",
      d.collection.notes
    );


    setValue(
      "competitorName",
      d.competitor.competitor
    );

    setValue(
      "competitorType",
      d.competitor.type
    );

    setValue(
      "competitorNotes",
      d.competitor.notes
    );


    setValue(
      "eodSales",
      d.eod.sales
    );

    setValue(
      "eodAchievement",
      d.eod.achievement
    );

    setValue(
      "eodVisits",
      d.eod.visits
    );

    setValue(
      "eodWin",
      d.eod.win
    );

    setValue(
      "eodImprove",
      d.eod.improve
    );


    setValue(
      "actionPlan",
      d.action.action
    );

    setValue(
      "actionOwner",
      d.action.owner
    );

    setValue(
      "actionPriority",
      d.action.priority
    );

  }


  function setValue(id, value) {

    const element =
      document.getElementById(id);

    if (
      element &&
      value !== undefined &&
      value !== null
    ) {

      element.value = value;

    }

  }


  /* =======================================================
     DAILY PROGRESS
     ======================================================= */

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


    let completed = 0;


    sections.forEach(function (section) {

      const data =
        appData.daily[section];

      if (
        data &&
        Object.keys(data).length > 0
      ) {

        const hasValue =
          Object.values(data).some(
            function (value) {
              return String(value).trim() !== "";
            }
          );

        if (hasValue) {
          completed++;
        }

      }

    });


    const percentage =
      Math.round(
        (completed / sections.length) * 100
      );


    const progress =
      document.getElementById(
        "dailyProgress"
      );

    const text =
      document.getElementById(
        "dailyCompletionText"
      );


    if (progress) {

      progress.style.width =
        percentage + "%";

    }


    if (text) {

      text.textContent =
        percentage + "%";

    }

  }


  function resetDailyPlan() {

    const confirmed =
      window.confirm(
        "Reset today's entire manager plan?"
      );


    if (!confirmed) {
      return;
    }


    appData.daily = {

      morning: {},
      customer: {},
      team: {},
      distributor: {},
      collection: {},
      competitor: {},
      eod: {},
      action: {}

    };


    saveData();


    const inputs =
      document.querySelectorAll(
        "#page-daily-manager input, " +
        "#page-daily-manager textarea, " +
        "#page-daily-manager select"
      );


    inputs.forEach(function (input) {

      input.value = "";

    });


    updateDailyProgress();

    showToast(
      "Today's plan has been reset."
    );

  }


  /* =======================================================
     DASHBOARD
     ======================================================= */

  function initializeDashboardActions() {

    /*
      Dashboard action buttons are handled
      by the common data-page-action system.
    */

  }


  function updateDashboard() {

    const target =
      Number(appData.target) || 0;

    const actual =
      Number(appData.actual) || 0;

    const team =
      Number(appData.team) || 0;


    let achievement = 0;

    if (target > 0) {

      achievement =
        Math.round(
          (actual / target) * 100
        );

    }


    const gap =
      Math.max(
        target - actual,
        0
      );


    setText(
      "kpiTarget",
      formatNumber(target) + " L"
    );

    setText(
      "kpiActual",
      formatNumber(actual) + " L"
    );

    setText(
      "kpiAchievement",
      achievement + "%"
    );

    setText(
      "kpiGap",
      formatNumber(gap) + " L"
    );

    setText(
      "kpiTeam",
      String(team)
    );


    setText(
      "performanceActual",
      formatNumber(actual) + " L"
    );

    setText(
      "performanceTarget",
      formatNumber(target) + " L"
    );

    setText(
      "performanceGap",
      formatNumber(gap) + " L"
    );

    setText(
      "performancePercent",
      achievement + "%"
    );


    setText(
      "achievementBadge",
      achievement + "% Achieved"
    );


    const progress =
      document.getElementById(
        "performanceProgress"
      );

    if (progress) {

      progress.style.width =
        Math.min(achievement, 100) + "%";

    }


    const actualBar =
      document.getElementById(
        "actualBar"
      );

    if (actualBar) {

      actualBar.style.width =
        Math.min(achievement, 100) + "%";

    }

  }


  function setText(id, value) {

    const element =
      document.getElementById(id);

    if (element) {

      element.textContent =
        value;

    }

  }


  function formatNumber(number) {

    return Number(number).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }
    );

  }


  /* =======================================================
     DATE
     ======================================================= */

  function initializeDate() {

    const dateElement =
      document.getElementById(
        "todayDate"
      );


    if (!dateElement) {
      return;
    }


    const now = new Date();


    const formatted =
      now.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        }
      );


    dateElement.textContent =
      formatted;

  }


  /* =======================================================
     SEARCH
     ======================================================= */

  function initializeSearch() {

    const search =
      document.getElementById(
        "globalSearch"
      );


    if (!search) {
      return;
    }


    search.addEventListener(
      "input",
      function () {

        const keyword =
          search.value
            .trim()
            .toLowerCase();


        if (!keyword) {
          return;
        }


        const navItems =
          document.querySelectorAll(
            ".nav-item"
          );


        let found = null;


        navItems.forEach(
          function (item) {

            const text =
              item.textContent
                .toLowerCase();


            if (
              !found &&
              text.includes(keyword)
            ) {

              found = item;

            }

          }
        );


        if (found) {

          const page =
            found.getAttribute(
              "data-page"
            );

          if (page) {

            showPage(page);

          }

        }

      }
    );

  }


  /* =======================================================
     NOTIFICATION
     ======================================================= */

  function initializeNotification() {

    const button =
      document.getElementById(
        "notificationBtn"
      );


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        showToast(
          "You have 3 manager alerts."
        );

      }
    );

  }


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(message) {

    const toast =
      document.getElementById(
        "toast"
      );

    const toastMessage =
      document.getElementById(
        "toastMessage"
      );


    if (!toast) {
      return;
    }


    if (toastMessage) {

      toastMessage.textContent =
        message;

    }


    toast.classList.add("show");


    window.clearTimeout(
      showToast.timer
    );


    showToast.timer =
      window.setTimeout(
        function () {

          toast.classList.remove(
            "show"
          );

        },
        2500
      );

  }


  /* =======================================================
     KEYBOARD SHORTCUTS
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      /*
        Ctrl + D = Dashboard
        Ctrl + M = Daily Manager
      */

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

        showPage("daily-manager");

      }

    }
  );


})();
```
