```javascript
/* =========================================================
   AUNG SALES MANAGER PRO
   APP.JS — PROFESSIONAL UI V2
   ========================================================= */

"use strict";

/* =========================================================
   APP STATE
   ========================================================= */

const STORAGE_KEY = "aung_sales_manager_pro_v2";

const defaultData = {
  currentPage: "dashboard",

  daily: {
    morning: false,
    customer: false,
    team: false,
    distributor: false,
    collection: false,
    competitor: false,
    eod: false,
    action: false
  },

  forms: {},

  dashboard: {
    target: 500,
    actual: 385,
    team: 4
  }
};

let appData = loadData();

let toastTimer = null;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initializeNavigation();
  initializeDailyManager();
  initializeMobileSidebar();
  initializeDashboardActions();
  initializeSearch();
  initializeNotifications();

  loadFormValues();
  updateDailyProgress();
  updateDashboard();

  showPage(appData.currentPage);

});


/* =========================================================
   STORAGE
   ========================================================= */

function loadData() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredClone(defaultData);
    }

    const parsed = JSON.parse(saved);

    return {
      ...structuredClone(defaultData),
      ...parsed,
      daily: {
        ...structuredClone(defaultData.daily),
        ...(parsed.daily || {})
      },
      forms: parsed.forms || {},
      dashboard: {
        ...structuredClone(defaultData.dashboard),
        ...(parsed.dashboard || {})
      }
    };

  } catch (error) {

    console.error("Unable to load application data:", error);

    return structuredClone(defaultData);
  }
}


function saveData() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appData)
    );

  } catch (error) {

    console.error("Unable to save application data:", error);

    showToast(
      "Storage Error",
      "Unable to save data on this device.",
      "error"
    );
  }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

  document.querySelectorAll(".nav-item[data-page]").forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.page;

      if (!page) return;

      showPage(page);

      closeMobileSidebar();

    });

  });


  document.querySelectorAll("[data-page-action]").forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.pageAction;

      if (!page) return;

      showPage(page);

      closeMobileSidebar();

    });

  });

}


function showPage(pageName) {

  const page = document.getElementById(`page-${pageName}`);

  if (!page) {

    console.warn(`Page not found: ${pageName}`);

    return;
  }


  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });


  page.classList.add("active");


  document.querySelectorAll(".nav-item[data-page]").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );

  });


  const pageTitle = getPageTitle(pageName);

  const breadcrumb = document.getElementById("breadcrumbPage");

  if (breadcrumb) {
    breadcrumb.textContent = pageTitle;
  }


  appData.currentPage = pageName;

  saveData();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function getPageTitle(pageName) {

  const titles = {

    dashboard: "Dashboard",

    "daily-manager": "Daily Manager",

    "sales-target": "Sales Target",

    "team-kpi": "Team KPI",

    distributor: "Distributor",

    territory: "Territory",

    forecast: "Sales Forecast",

    tools: "Manager Tools",

    reports: "Reports",

    "problem-solver": "Problem Solver",

    "ai-coach": "AI Sales Coach",

    academy: "Sales Academy",

    settings: "Settings"

  };

  return titles[pageName] || "Dashboard";
}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function initializeMobileSidebar() {

  const menuButton =
    document.getElementById("mobileMenuBtn");

  const closeButton =
    document.getElementById("sidebarClose");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (menuButton) {

    menuButton.addEventListener("click", () => {

      openMobileSidebar();

    });

  }


  if (closeButton) {

    closeButton.addEventListener("click", () => {

      closeMobileSidebar();

    });

  }


  if (overlay) {

    overlay.addEventListener("click", () => {

      closeMobileSidebar();

    });

  }

}


function openMobileSidebar() {

  const sidebar =
    document.getElementById("sidebar");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (sidebar) {
    sidebar.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

  document.body.style.overflow = "hidden";
}


function closeMobileSidebar() {

  const sidebar =
    document.getElementById("sidebar");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

  document.body.style.overflow = "";
}


/* =========================================================
   DAILY MANAGER
   ========================================================= */

function initializeDailyManager() {

  document.querySelectorAll("[data-save]").forEach(button => {

    button.addEventListener("click", () => {

      const section = button.dataset.save;

      saveDailySection(section);

    });

  });


  const resetButton =
    document.getElementById("resetDailyBtn");

  if (resetButton) {

    resetButton.addEventListener("click", () => {

      resetDailyPlan();

    });

  }

}


/* =========================================================
   DAILY SAVE ROUTER
   ========================================================= */

function saveDailySection(section) {

  const values = getSectionValues(section);

  if (!values) {

    showToast(
      "Unable to Save",
      "This section could not be processed.",
      "error"
    );

    return;
  }


  if (!hasMeaningfulValue(values)) {

    showToast(
      "Information Required",
      "Please enter some information before saving.",
      "warning"
    );

    return;
  }


  appData.forms[section] = values;

  appData.daily[section] = true;

  saveData();

  updateDailyProgress();

  loadFormValues();

  showToast(
    "Saved Successfully",
    `${getSectionName(section)} has been updated.`,
    "success"
  );

}


/* =========================================================
   GET DAILY SECTION VALUES
   ========================================================= */

function getSectionValues(section) {

  const map = {

    morning: {
      priority: getValue("morningPriority"),
      sales: getValue("morningSales"),
      customers: getValue("morningCustomers")
    },

    customer: {
      name: getValue("customerName"),
      objective: getValue("customerObjective"),
      notes: getValue("customerNotes")
    },

    team: {
      member: getValue("teamMember"),
      followType: getValue("teamFollowType"),
      notes: getValue("teamNotes")
    },

    distributor: {
      name: getValue("distributorName"),
      issue: getValue("distributorIssue"),
      notes: getValue("distributorNotes")
    },

    collection: {
      customer: getValue("collectionCustomer"),
      amount: getValue("collectionAmount"),
      notes: getValue("collectionNotes")
    },

    competitor: {
      name: getValue("competitorName"),
      type: getValue("competitorType"),
      notes: getValue("competitorNotes")
    },

    eod: {
      sales: getValue("eodSales"),
      achievement: getValue("eodAchievement"),
      visits: getValue("eodVisits"),
      win: getValue("eodWin"),
      improve: getValue("eodImprove")
    },

    action: {
      plan: getValue("actionPlan"),
      owner: getValue("actionOwner"),
      priority: getValue("actionPriority")
    }

  };

  return map[section] || null;
}


/* =========================================================
   DAILY SECTION NAMES
   ========================================================= */

function getSectionName(section) {

  const names = {

    morning: "Morning Manager Plan",

    customer: "Customer Visit Plan",

    team: "Team Follow-up",

    distributor: "Distributor Action",

    collection: "Collection Action",

    competitor: "Market Intelligence",

    eod: "End-of-Day Review",

    action: "Tomorrow's Action Plan"

  };

  return names[section] || "Manager Plan";
}


/* =========================================================
   VALUE HELPERS
   ========================================================= */

function getValue(id) {

  const element = document.getElementById(id);

  if (!element) return "";

  return element.value.trim();
}


function hasMeaningfulValue(object) {

  return Object.values(object).some(value => {

    return String(value).trim() !== "";

  });

}


/* =========================================================
   LOAD SAVED FORM VALUES
   ========================================================= */

function loadFormValues() {

  Object.entries(appData.forms).forEach(([section, values]) => {

    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {

      const id = getFieldId(section, key);

      if (!id) return;

      const element =
        document.getElementById(id);

      if (!element) return;

      element.value = value ?? "";

    });

  });

}


/* =========================================================
   FIELD MAPPING
   ========================================================= */

function getFieldId(section, key) {

  const map = {

    morning: {
      priority: "morningPriority",
      sales: "morningSales",
      customers: "morningCustomers"
    },

    customer: {
      name: "customerName",
      objective: "customerObjective",
      notes: "customerNotes"
    },

    team: {
      member: "teamMember",
      followType: "teamFollowType",
      notes: "teamNotes"
    },

    distributor: {
      name: "distributorName",
      issue: "distributorIssue",
      notes: "distributorNotes"
    },

    collection: {
      customer: "collectionCustomer",
      amount: "collectionAmount",
      notes: "collectionNotes"
    },

    competitor: {
      name: "competitorName",
      type: "competitorType",
      notes: "competitorNotes"
    },

    eod: {
      sales: "eodSales",
      achievement: "eodAchievement",
      visits: "eodVisits",
      win: "eodWin",
      improve: "eodImprove"
    },

    action: {
      plan: "actionPlan",
      owner: "actionOwner",
      priority: "actionPriority"
    }

  };

  return map[section]?.[key] || null;
}


/* =========================================================
   DAILY PROGRESS
   ========================================================= */

function updateDailyProgress() {

  const sections = Object.keys(appData.daily);

  const completed =
    sections.filter(section => appData.daily[section]).length;

  const total = sections.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);


  const dailyText =
    document.getElementById("dailyCompletionText");

  const dailyBar =
    document.getElementById("dailyCompletionBar");

  const dashboardStatus =
    document.getElementById("dashboardDailyStatus");

  const focusText =
    document.getElementById("focusProgressText");

  const focusBar =
    document.getElementById("focusProgressBar");


  if (dailyText) {
    dailyText.textContent = `${percentage}%`;
  }

  if (dailyBar) {
    dailyBar.style.width = `${percentage}%`;
  }

  if (dashboardStatus) {
    dashboardStatus.textContent =
      `${percentage}% Complete`;
  }

  if (focusText) {
    focusText.textContent =
      `${percentage}%`;
  }

  if (focusBar) {
    focusBar.style.width =
      `${percentage}%`;
  }


  sections.forEach(section => {

    const status =
      document.getElementById(`status-${section}`);

    if (!status) return;

    if (appData.daily[section]) {

      status.textContent = "Completed";

      status.classList.add("completed");

    } else {

      status.textContent = "Pending";

      status.classList.remove("completed");

    }

  });

}


/* =========================================================
   RESET DAILY PLAN
   ========================================================= */

function resetDailyPlan() {

  const confirmed =
    window.confirm(
      "Reset today's manager plan?\n\nSaved daily form information will also be cleared."
    );

  if (!confirmed) return;


  Object.keys(appData.daily).forEach(section => {

    appData.daily[section] = false;

  });


  appData.forms = {};

  saveData();

  clearAllDailyFields();

  updateDailyProgress();

  showToast(
    "Daily Plan Reset",
    "Today's management plan has been cleared.",
    "success"
  );

}


function clearAllDailyFields() {

  const ids = [

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


  ids.forEach(id => {

    const element =
      document.getElementById(id);

    if (!element) return;

    element.value = "";

  });

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

  const target =
    Number(appData.dashboard.target) || 0;

  const actual =
    Number(appData.dashboard.actual) || 0;

  const team =
    Number(appData.dashboard.team) || 0;


  const achievement =
    target > 0
      ? Math.round((actual / target) * 100)
      : 0;

  const gap =
    Math.max(target - actual, 0);


  setText(
    "kpiTarget",
    `${formatNumber(target)} L`
  );

  setText(
    "kpiActual",
    `${formatNumber(actual)} L`
  );

  setText(
    "kpiAchievement",
    `${achievement}%`
  );

  setText(
    "kpiGap",
    `${formatNumber(gap)} L`
  );

  setText(
    "kpiTeam",
    String(team)
  );


  const achievementBar =
    document.getElementById("achievementBar");

  if (achievementBar) {

    achievementBar.style.width =
      `${Math.min(achievement, 100)}%`;

  }


  updateDateDisplays();

}


/* =========================================================
   DATE DISPLAY
   ========================================================= */

function updateDateDisplays() {

  const now = new Date();

  const dashboardDate =
    document.getElementById("dashboardDate");

  const dailyDateText =
    document.getElementById("dailyDateText");


  if (dashboardDate) {

    dashboardDate.textContent =
      formatDate(now, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });

  }


  if (dailyDateText) {

    dailyDateText.textContent =
      formatDate(now, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });

  }


  const calendarIcon =
    document.querySelector(".calendar-icon");

  if (calendarIcon) {

    calendarIcon.textContent =
      now.getDate();

  }

}


/* =========================================================
   SEARCH
   ========================================================= */

function initializeSearch() {

  const search =
    document.getElementById("globalSearch");

  if (!search) return;


  search.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;

    const query =
      search.value.trim().toLowerCase();

    if (!query) return;


    const pages = {

      dashboard: ["dashboard", "home", "command center"],

      "daily-manager": [
        "daily",
        "plan",
        "today",
        "daily manager"
      ],

      "sales-target": [
        "target",
        "sales target"
      ],

      "team-kpi": [
        "team",
        "kpi",
        "performance"
      ],

      distributor: [
        "distributor",
        "channel"
      ],

      territory: [
        "territory",
        "area",
        "market"
      ],

      forecast: [
        "forecast",
        "projection"
      ],

      tools: [
        "tools",
        "calculator"
      ],

      reports: [
        "report",
        "reports"
      ],

      "problem-solver": [
        "problem",
        "issue",
        "solver"
      ],

      "ai-coach": [
        "ai",
        "coach"
      ],

      academy: [
        "academy",
        "training",
        "learning"
      ],

      settings: [
        "setting"
      ]

    };


    for (const [page, keywords] of Object.entries(pages)) {

      if (
        keywords.some(keyword =>
          keyword.includes(query) ||
          query.includes(keyword)
        )
      ) {

        showPage(page);

        search.value = "";

        showToast(
          "Search",
          `Opened ${getPageTitle(page)}.`,
          "success"
        );

        return;
      }

    }


    showToast(
      "No Result",
      `No manager module found for "${search.value}".`,
      "warning"
    );

  });

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function initializeNotifications() {

  const button =
    document.getElementById("notificationBtn");

  if (!button) return;


  button.addEventListener("click", () => {

    const target =
      Number(appData.dashboard.target) || 0;

    const actual =
      Number(appData.dashboard.actual) || 0;

    const gap =
      Math.max(target - actual, 0);


    showToast(
      "Manager Alerts",
      `${formatNumber(gap)} L target gap requires attention.`,
      "warning"
    );

  });

}


/* =========================================================
   UTILITY BUTTONS
   ========================================================= */

function initializeDashboardActions() {

  const period =
    document.getElementById("performancePeriod");

  if (period) {

    period.addEventListener("change", () => {

      showToast(
        "Performance View",
        `${period.value} selected.`,
        "success"
      );

    });

  }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  title,
  message,
  type = "success"
) {

  const toast =
    document.getElementById("toast");

  const toastTitle =
    document.getElementById("toastTitle");

  const toastMessage =
    document.getElementById("toastMessage");

  const toastIcon =
    toast?.querySelector(".toast-icon");


  if (!toast) return;


  if (toastTitle) {
    toastTitle.textContent = title;
  }

  if (toastMessage) {
    toastMessage.textContent = message;
  }


  if (toastIcon) {

    if (type === "error") {
      toastIcon.textContent = "!";
    } else if (type === "warning") {
      toastIcon.textContent = "!";
    } else {
      toastIcon.textContent = "✓";
    }

  }


  toast.classList.add("show");


  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================================================
   TEXT HELPER
   ========================================================= */

function setText(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


/* =========================================================
   NUMBER FORMAT
   ========================================================= */

function formatNumber(number) {

  return Number(number).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }
  );

}


/* =========================================================
   DATE FORMAT
   ========================================================= */

function formatDate(date, options) {

  return new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

}


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener("keydown", event => {

  /* Escape closes mobile menu */

  if (event.key === "Escape") {

    closeMobileSidebar();

  }


  /* Ctrl/Cmd + K focuses search */

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    const search =
      document.getElementById("globalSearch");

    if (search) {

      search.focus();

    }

  }

});


/* =========================================================
   PREVENT ACCIDENTAL FORM SUBMISSION
   ========================================================= */

document.addEventListener("submit", event => {

  event.preventDefault();

});


/* =========================================================
   APP READY
   ========================================================= */

console.log(
  "Aung Sales Manager Pro v1.0 Professional loaded successfully."
);
```
