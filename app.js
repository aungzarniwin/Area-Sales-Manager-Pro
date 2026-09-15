```javascript
/* =========================================================
   AUNG SALES MANAGER PRO
   app.js
   Professional Sales Management & Leadership
   ========================================================= */

"use strict";

/* =========================================================
   APP STATE
========================================================= */

const STORAGE_KEY = "aung_sales_manager_pro_v1";

const defaultState = {
  target: 300000000,
  achievement: 218500000,
  previousMonth: 205000000,

  team: [
    {
      id: 1,
      name: "Mg Mg",
      role: "Sales Representative",
      target: 60000000,
      achievement: 51000000,
      attendance: 96,
      visits: 82,
      status: "On Track"
    },
    {
      id: 2,
      name: "Aye Aye",
      role: "Sales Representative",
      target: 55000000,
      achievement: 47000000,
      attendance: 94,
      visits: 76,
      status: "On Track"
    },
    {
      id: 3,
      name: "Ko Ko",
      role: "Sales Representative",
      target: 50000000,
      achievement: 31000000,
      attendance: 89,
      visits: 58,
      status: "Needs Attention"
    },
    {
      id: 4,
      name: "Su Su",
      role: "Sales Representative",
      target: 45000000,
      achievement: 36500000,
      attendance: 97,
      visits: 71,
      status: "On Track"
    },
    {
      id: 5,
      name: "Min Min",
      role: "Sales Representative",
      target: 40000000,
      achievement: 53000000,
      attendance: 98,
      visits: 91,
      status: "Excellent"
    }
  ],

  distributors: [
    {
      id: 1,
      name: "Yangon Central Distribution",
      territory: "Yangon Central",
      stock: 1250,
      sales: 840,
      ar: 18500000,
      collection: 12500000,
      status: "Healthy"
    },
    {
      id: 2,
      name: "North Yangon Distribution",
      territory: "North Yangon",
      stock: 920,
      sales: 610,
      ar: 9600000,
      collection: 7200000,
      status: "Healthy"
    },
    {
      id: 3,
      name: "East Yangon Distribution",
      territory: "East Yangon",
      stock: 760,
      sales: 420,
      ar: 14700000,
      collection: 6300000,
      status: "Watch"
    }
  ],

  daily: [],

  problems: [],

  settings: {
    managerName: "Aung Zar Ni Win",
    company: "Aung Sales Manager Pro",
    currency: "MMK"
  }
};


/* =========================================================
   STATE LOAD / SAVE
========================================================= */

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);

    return {
      ...structuredClone(defaultState),
      ...parsed,
      team: parsed.team || structuredClone(defaultState.team),
      distributors:
        parsed.distributors ||
        structuredClone(defaultState.distributors),
      daily:
        parsed.daily || [],
      problems:
        parsed.problems || [],
      settings:
        {
          ...defaultState.settings,
          ...(parsed.settings || {})
        }
    };
  } catch (error) {
    console.error("State loading error:", error);
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}


/* =========================================================
   DOM
========================================================= */

const appContent =
  document.getElementById("appContent");

const pageTitle =
  document.getElementById("pageTitle");

const pageSubtitle =
  document.getElementById("pageSubtitle");

const currentDate =
  document.getElementById("currentDate");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const menuBtn =
  document.getElementById("menuBtn");

const modal =
  document.getElementById("modal");

const modalTitle =
  document.getElementById("modalTitle");

const modalSubtitle =
  document.getElementById("modalSubtitle");

const modalBody =
  document.getElementById("modalBody");

const modalClose =
  document.getElementById("modalClose");

const modalBackdrop =
  document.getElementById("modalBackdrop");

const toast =
  document.getElementById("toast");

const toastTitle =
  document.getElementById("toastTitle");

const toastMessage =
  document.getElementById("toastMessage");

const toastIcon =
  document.getElementById("toastIcon");


/* =========================================================
   PAGE DEFINITIONS
========================================================= */

const pageInfo = {
  dashboard: {
    title: "Manager Dashboard",
    subtitle: "Sales performance at a glance"
  },

  daily: {
    title: "Daily Manager",
    subtitle: "Plan, execute and review your day"
  },

  target: {
    title: "Sales Target",
    subtitle: "Manage target, achievement and gap"
  },

  team: {
    title: "Team KPI",
    subtitle: "Track sales team performance"
  },

  distributor: {
    title: "Distributor Management",
    subtitle: "Monitor stock, sales and receivables"
  },

  territory: {
    title: "Territory Management",
    subtitle: "Manage coverage and market opportunities"
  },

  forecast: {
    title: "Sales Forecast",
    subtitle: "Project your month-end performance"
  },

  tools: {
    title: "Manager Tools",
    subtitle: "Practical tools for sales managers"
  },

  reports: {
    title: "Manager Reports",
    subtitle: "Review business performance"
  },

  problem: {
    title: "Problem Solver",
    subtitle: "Turn business problems into action plans"
  },

  coach: {
    title: "AI Sales Coach",
    subtitle: "Professional sales management guidance"
  },

  academy: {
    title: "Sales Manager Academy",
    subtitle: "Build your leadership and management capability"
  },

  settings: {
    title: "Settings",
    subtitle: "Manage your manager profile and data"
  }
};


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);

function init() {
  updateDate();
  setupNavigation();
  setupMenu();
  setupModal();
  setupNotification();

  renderPage("dashboard");
}


/* =========================================================
   DATE
========================================================= */

function updateDate() {
  const now = new Date();

  currentDate.textContent =
    now.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document
    .querySelectorAll(".nav-item")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const page =
            button.dataset.page;

          if (!page) return;

          renderPage(page);

          closeSidebar();
        }
      );
    });
}

function renderPage(page) {

  const info =
    pageInfo[page] ||
    pageInfo.dashboard;

  pageTitle.textContent =
    info.title;

  pageSubtitle.textContent =
    info.subtitle;

  document
    .querySelectorAll(".nav-item")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.page === page
      );
    });

  switch (page) {

    case "dashboard":
      renderDashboard();
      break;

    case "daily":
      renderDaily();
      break;

    case "target":
      renderTarget();
      break;

    case "team":
      renderTeam();
      break;

    case "distributor":
      renderDistributor();
      break;

    case "territory":
      renderTerritory();
      break;

    case "forecast":
      renderForecast();
      break;

    case "tools":
      renderTools();
      break;

    case "reports":
      renderReports();
      break;

    case "problem":
      renderProblemSolver();
      break;

    case "coach":
      renderCoach();
      break;

    case "academy":
      renderAcademy();
      break;

    case "settings":
      renderSettings();
      break;

    default:
      renderDashboard();
  }
}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function setupMenu() {

  menuBtn.addEventListener(
    "click",
    () => {

      sidebar.classList.toggle(
        "open"
      );

      sidebarOverlay.classList.toggle(
        "show"
      );
    }
  );

  sidebarOverlay.addEventListener(
    "click",
    closeSidebar
  );
}

function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );

  sidebarOverlay.classList.remove(
    "show"
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

  const target =
    Number(state.target) || 0;

  const achievement =
    Number(state.achievement) || 0;

  const previous =
    Number(state.previousMonth) || 0;

  const achievementPercent =
    target > 0
      ? (achievement / target) * 100
      : 0;

  const growth =
    previous > 0
      ? ((achievement - previous) / previous) * 100
      : 0;

  const remaining =
    Math.max(target - achievement, 0);

  const days =
    daysInCurrentMonth();

  const today =
    new Date().getDate();

  const remainingDays =
    Math.max(days - today, 1);

  const requiredDaily =
    remaining / remainingDays;

  const teamAverage =
    state.team.length
      ? state.team.reduce(
          (sum, person) =>
            sum +
            percentage(
              person.achievement,
              person.target
            ),
          0
        ) / state.team.length
      : 0;

  const outstandingAR =
    state.distributors.reduce(
      (sum, distributor) =>
        sum + Number(distributor.ar || 0),
      0
    );

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Good morning, ${escapeHTML(state.settings.managerName)} 👋</h2>

        <p>
          Here is your sales business overview for today.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-secondary"
          data-action="quick-daily">
          📅 Daily Review
        </button>

        <button
          class="btn btn-primary"
          data-action="quick-sale">
          ＋ Update Sales
        </button>

      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Monthly Target",
        formatMoney(target),
        "🎯",
        "Current month target",
        "neutral"
      )}

      ${kpiCard(
        "Achievement",
        formatMoney(achievement),
        "💰",
        `${achievementPercent.toFixed(1)}% achieved`,
        achievementPercent >= 80
          ? "positive"
          : "negative"
      )}

      ${kpiCard(
        "Sales Growth",
        `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`,
        "📈",
        "vs previous month",
        growth >= 0
          ? "positive"
          : "negative"
      )}

      ${kpiCard(
        "Outstanding AR",
        formatMoney(outstandingAR),
        "💳",
        "Total distributor AR",
        outstandingAR > 40000000
          ? "negative"
          : "neutral"
      )}

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Monthly Target Progress</h3>
            <p>Current sales performance</p>
          </div>

          <span class="badge ${
            achievementPercent >= 100
              ? "badge-success"
              : achievementPercent >= 80
              ? "badge-primary"
              : "badge-warning"
          }">
            ${achievementPercent.toFixed(1)}%
          </span>

        </div>

        <div class="card-body">

          <div class="progress-wrap">

            <div class="progress-track">

              <div
                class="progress-bar"
                style="width:${Math.min(
                  achievementPercent,
                  100
                )}%">
              </div>

            </div>

            <div class="progress-info">

              <span>
                ${formatMoney(achievement)}
              </span>

              <strong>
                ${formatMoney(target)}
              </strong>

            </div>

          </div>


          <div class="stat-row">
            <span class="stat-label">
              Remaining Gap
            </span>

            <strong class="stat-value">
              ${formatMoney(remaining)}
            </strong>
          </div>


          <div class="stat-row">
            <span class="stat-label">
              Required Daily Sales
            </span>

            <strong class="stat-value text-primary">
              ${formatMoney(requiredDaily)}
            </strong>
          </div>


          <div class="stat-row">
            <span class="stat-label">
              Team Average
            </span>

            <strong class="stat-value">
              ${teamAverage.toFixed(1)}%
            </strong>
          </div>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Today's Priority</h3>
            <p>Manager attention required</p>
          </div>

          <span>⚡</span>

        </div>

        <div class="card-body">

          ${priorityAlerts(
            achievementPercent,
            outstandingAR
          )}

        </div>

      </div>

    </div>


    <div class="card mb-20">

      <div class="card-header">

        <div>
          <h3>Quick Manager Actions</h3>
          <p>Common tasks for a Sales Manager</p>
        </div>

      </div>

      <div class="card-body">

        <div class="quick-grid">

          ${quickAction(
            "🎯",
            "Set Target",
            "Manage monthly target",
            "quick-target"
          )}

          ${quickAction(
            "👥",
            "Review Team",
            "Check KPI performance",
            "quick-team"
          )}

          ${quickAction(
            "🏢",
            "Distributor",
            "Check distributor health",
            "quick-distributor"
          )}

          ${quickAction(
            "🤖",
            "Get Coaching",
            "Solve a sales issue",
            "quick-coach"
          )}

        </div>

      </div>

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Team Performance</h3>
            <p>Individual sales achievement</p>
          </div>

          <button
            class="btn btn-light"
            data-action="view-team">
            View All
          </button>

        </div>

        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Sales Rep</th>
                <th>Target</th>
                <th>Achievement</th>
                <th>%</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              ${state.team
                .slice(0, 5)
                .map(person => {

                  const pct =
                    percentage(
                      person.achievement,
                      person.target
                    );

                  return `

                    <tr>

                      <td>
                        <div class="team-member">

                          <div class="team-avatar">
                            ${initials(person.name)}
                          </div>

                          <div class="team-info">
                            <strong>
                              ${escapeHTML(person.name)}
                            </strong>

                            <span>
                              ${escapeHTML(person.role)}
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        ${formatMoney(person.target)}
                      </td>

                      <td>
                        ${formatMoney(person.achievement)}
                      </td>

                      <td>
                        <strong>
                          ${pct.toFixed(1)}%
                        </strong>
                      </td>

                      <td>
                        ${statusBadge(
                          person.status
                        )}
                      </td>

                    </tr>

                  `;
                })
                .join("")}

            </tbody>

          </table>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Manager Checklist</h3>
            <p>Daily execution discipline</p>
          </div>

        </div>

        <div class="card-body">

          ${managerChecklist()}

        </div>

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   DAILY MANAGER
========================================================= */

function renderDaily() {

  const todayKey =
    new Date().toISOString().slice(0, 10);

  const todayRecords =
    state.daily.filter(
      item => item.date === todayKey
    );

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Daily Manager</h2>

        <p>
          Start the day with priorities and finish with accountability.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="add-daily">
          ＋ Add Daily Action
        </button>

      </div>

    </div>


    <div class="grid-3">

      ${dailyFocusCard(
        "🌅",
        "Morning Meeting",
        "Set priorities, targets and expectations."
      )}

      ${dailyFocusCard(
        "🚗",
        "Field Execution",
        "Visit customers and solve market issues."
      )}

      ${dailyFocusCard(
        "🌙",
        "End-of-Day Review",
        "Review achievement, gaps and next actions."
      )}

    </div>


    <div class="card mb-20">

      <div class="card-header">

        <div>
          <h3>Today's Manager Checklist</h3>
          <p>Recommended daily routine</p>
        </div>

      </div>

      <div class="card-body">

        <div id="dailyChecklist">

          ${dailyChecklistItem(
            "morning",
            "Morning Team Meeting",
            "Review target, yesterday achievement and today's priority."
          )}

          ${dailyChecklistItem(
            "target",
            "Target Allocation",
            "Allocate today's target by sales rep / territory."
          )}

          ${dailyChecklistItem(
            "field",
            "Field Visit",
            "Visit key customers, outlets or distributors."
          )}

          ${dailyChecklistItem(
            "issue",
            "Issue Follow-up",
            "Check customer, distributor, stock and collection issues."
          )}

          ${dailyChecklistItem(
            "review",
            "End-of-Day Review",
            "Record achievement and tomorrow's action plan."
          )}

        </div>

      </div>

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Today's Action Log</h3>

          <p>
            ${todayRecords.length}
            action${todayRecords.length === 1 ? "" : "s"}
            recorded
          </p>
        </div>

      </div>

      ${
        todayRecords.length
          ? `
            <div class="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Action</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  ${todayRecords
                    .map(item => `
                      <tr>

                        <td>
                          ${escapeHTML(item.time)}
                        </td>

                        <td>
                          ${escapeHTML(item.type)}
                        </td>

                        <td>
                          ${escapeHTML(item.action)}
                        </td>

                        <td>
                          ${escapeHTML(item.owner)}
                        </td>

                        <td>
                          ${statusBadge(item.status)}
                        </td>

                      </tr>
                    `)
                    .join("")}

                </tbody>

              </table>

            </div>
          `
          : `
            <div class="empty-state">

              <div class="empty-icon">📅</div>

              <h3>No actions recorded yet</h3>

              <p>
                Add your first manager action for today.
              </p>

            </div>
          `
      }

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   TARGET
========================================================= */

function renderTarget() {

  const target =
    Number(state.target) || 0;

  const achievement =
    Number(state.achievement) || 0;

  const pct =
    percentage(
      achievement,
      target
    );

  const gap =
    Math.max(
      target - achievement,
      0
    );

  const days =
    daysInCurrentMonth();

  const day =
    new Date().getDate();

  const elapsed =
    Math.max(day, 1);

  const dailyAverage =
    achievement / elapsed;

  const projected =
    dailyAverage * days;

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Sales Target Management</h2>

        <p>
          Control target, achievement, gap and required run-rate.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="edit-target">
          ✎ Update Target
        </button>

      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Target",
        formatMoney(target),
        "🎯",
        "Monthly target",
        "neutral"
      )}

      ${kpiCard(
        "Achievement",
        formatMoney(achievement),
        "💰",
        `${pct.toFixed(1)}%`,
        pct >= 80
          ? "positive"
          : "negative"
      )}

      ${kpiCard(
        "Gap",
        formatMoney(gap),
        "📉",
        "Remaining to target",
        gap > 0
          ? "negative"
          : "positive"
      )}

      ${kpiCard(
        "Projected",
        formatMoney(projected),
        "📈",
        "Month-end projection",
        projected >= target
          ? "positive"
          : "negative"
      )}

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Target Achievement</h3>
            <p>Monthly performance</p>
          </div>

        </div>

        <div class="card-body">

          <div class="progress-wrap">

            <div class="progress-track">

              <div
                class="progress-bar"
                style="width:${Math.min(
                  pct,
                  100
                )}%">
              </div>

            </div>

            <div class="progress-info">

              <span>
                ${pct.toFixed(1)}% achieved
              </span>

              <strong>
                ${formatMoney(target)}
              </strong>

            </div>

          </div>

          <div class="stat-row">
            <span class="stat-label">
              Current Achievement
            </span>
            <strong class="stat-value">
              ${formatMoney(achievement)}
            </strong>
          </div>

          <div class="stat-row">
            <span class="stat-label">
              Remaining Gap
            </span>
            <strong class="stat-value text-danger">
              ${formatMoney(gap)}
            </strong>
          </div>

          <div class="stat-row">
            <span class="stat-label">
              Average Daily Sales
            </span>
            <strong class="stat-value">
              ${formatMoney(dailyAverage)}
            </strong>
          </div>

          <div class="stat-row">
            <span class="stat-label">
              Projected Month-End
            </span>
            <strong class="stat-value text-primary">
              ${formatMoney(projected)}
            </strong>
          </div>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Manager Decision</h3>
            <p>What should you do next?</p>
          </div>

        </div>

        <div class="card-body">

          ${targetDecision(pct, projected)}

        </div>

      </div>

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Team Target Distribution</h3>
          <p>Individual target vs achievement</p>
        </div>

      </div>

      <div class="table-wrap">

        <table>

          <thead>

            <tr>
              <th>Sales Rep</th>
              <th>Target</th>
              <th>Achievement</th>
              <th>Gap</th>
              <th>Achievement %</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            ${state.team
              .map(person => {

                const achievementPct =
                  percentage(
                    person.achievement,
                    person.target
                  );

                const personGap =
                  Math.max(
                    person.target -
                    person.achievement,
                    0
                  );

                return `

                  <tr>

                    <td>
                      <strong>
                        ${escapeHTML(person.name)}
                      </strong>
                    </td>

                    <td>
                      ${formatMoney(person.target)}
                    </td>

                    <td>
                      ${formatMoney(person.achievement)}
                    </td>

                    <td>
                      ${formatMoney(personGap)}
                    </td>

                    <td>
                      <strong>
                        ${achievementPct.toFixed(1)}%
                      </strong>
                    </td>

                    <td>
                      ${statusBadge(
                        achievementPct >= 100
                          ? "Excellent"
                          : achievementPct >= 80
                          ? "On Track"
                          : "Needs Attention"
                      )}
                    </td>

                  </tr>

                `;
              })
              .join("")}

          </tbody>

        </table>

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   TEAM
========================================================= */

function renderTeam() {

  const average =
    state.team.length
      ? state.team.reduce(
          (sum, person) =>
            sum +
            percentage(
              person.achievement,
              person.target
            ),
          0
        ) / state.team.length
      : 0;

  const topPerformer =
    [...state.team].sort(
      (a, b) =>
        percentage(b.achievement, b.target) -
        percentage(a.achievement, a.target)
    )[0];

  const attentionCount =
    state.team.filter(
      person =>
        percentage(
          person.achievement,
          person.target
        ) < 80
    ).length;

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Sales Team KPI</h2>

        <p>
          Manage performance through clear expectations, coaching and accountability.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-secondary"
          data-action="coach-team">
          🎯 Coaching Plan
        </button>

        <button
          class="btn btn-primary"
          data-action="add-team">
          ＋ Add Sales Rep
        </button>

      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Team Members",
        state.team.length,
        "👥",
        "Active sales team",
        "neutral"
      )}

      ${kpiCard(
        "Team Average",
        `${average.toFixed(1)}%`,
        "📊",
        "Average achievement",
        average >= 80
          ? "positive"
          : "negative"
      )}

      ${kpiCard(
        "Top Performer",
        topPerformer
          ? escapeHTML(topPerformer.name)
          : "-",
        "🏆",
        topPerformer
          ? `${percentage(
              topPerformer.achievement,
              topPerformer.target
            ).toFixed(1)}% achievement`
          : "",
        "positive"
      )}

      ${kpiCard(
        "Needs Attention",
        attentionCount,
        "⚠️",
        "Below 80% achievement",
        attentionCount
          ? "negative"
          : "positive"
      )}

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Team Performance</h3>
          <p>Detailed KPI view</p>
        </div>

      </div>

      <div class="table-wrap">

        <table>

          <thead>

            <tr>
              <th>Sales Rep</th>
              <th>Target</th>
              <th>Achievement</th>
              <th>Achievement %</th>
              <th>Attendance</th>
              <th>Visits</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            ${state.team
              .map(person => {

                const pct =
                  percentage(
                    person.achievement,
                    person.target
                  );

                return `

                  <tr>

                    <td>

                      <div class="team-member">

                        <div class="team-avatar">
                          ${initials(person.name)}
                        </div>

                        <div class="team-info">

                          <strong>
                            ${escapeHTML(person.name)}
                          </strong>

                          <span>
                            ${escapeHTML(person.role)}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>
                      ${formatMoney(person.target)}
                    </td>

                    <td>
                      ${formatMoney(person.achievement)}
                    </td>

                    <td>
                      <strong>
                        ${pct.toFixed(1)}%
                      </strong>
                    </td>

                    <td>
                      ${person.attendance}%
                    </td>

                    <td>
                      ${person.visits}
                    </td>

                    <td>
                      ${statusBadge(
                        person.status
                      )}
                    </td>

                    <td>

                      <button
                        class="btn btn-light"
                        data-action="edit-team"
                        data-id="${person.id}">
                        Edit
                      </button>

                    </td>

                  </tr>

                `;
              })
              .join("")}

          </tbody>

        </table>

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   DISTRIBUTOR
========================================================= */

function renderDistributor() {

  const totalStock =
    state.distributors.reduce(
      (sum, d) =>
        sum + Number(d.stock || 0),
      0
    );

  const totalSales =
    state.distributors.reduce(
      (sum, d) =>
        sum + Number(d.sales || 0),
      0
    );

  const totalAR =
    state.distributors.reduce(
      (sum, d) =>
        sum + Number(d.ar || 0),
      0
    );

  const totalCollection =
    state.distributors.reduce(
      (sum, d) =>
        sum + Number(d.collection || 0),
      0
    );

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Distributor Management</h2>

        <p>
          Monitor stock, sales-out, AR and collection.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="add-distributor">
          ＋ Add Distributor
        </button>

      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Total Stock",
        numberFormat(totalStock),
        "📦",
        "Current distributor stock",
        "neutral"
      )}

      ${kpiCard(
        "Sales Out",
        numberFormat(totalSales),
        "🚚",
        "Current sales-out",
        "positive"
      )}

      ${kpiCard(
        "Outstanding AR",
        formatMoney(totalAR),
        "💳",
        "Receivables",
        totalAR > 40000000
          ? "negative"
          : "neutral"
      )}

      ${kpiCard(
        "Collection",
        formatMoney(totalCollection),
        "💰",
        "Collected amount",
        "positive"
      )}

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Distributor Performance</h3>
          <p>Business health by distributor</p>
        </div>

      </div>

      <div class="table-wrap">

        <table>

          <thead>

            <tr>
              <th>Distributor</th>
              <th>Territory</th>
              <th>Stock</th>
              <th>Sales Out</th>
              <th>AR</th>
              <th>Collection</th>
              <th>AR Collection %</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            ${state.distributors
              .map(d => {

                const collectionPct =
                  d.ar > 0
                    ? (d.collection / d.ar) * 100
                    : 0;

                return `

                  <tr>

                    <td>
                      <strong>
                        ${escapeHTML(d.name)}
                      </strong>
                    </td>

                    <td>
                      ${escapeHTML(d.territory)}
                    </td>

                    <td>
                      ${numberFormat(d.stock)}
                    </td>

                    <td>
                      ${numberFormat(d.sales)}
                    </td>

                    <td>
                      ${formatMoney(d.ar)}
                    </td>

                    <td>
                      ${formatMoney(d.collection)}
                    </td>

                    <td>
                      ${collectionPct.toFixed(1)}%
                    </td>

                    <td>
                      ${statusBadge(d.status)}
                    </td>

                  </tr>

                `;
              })
              .join("")}

          </tbody>

        </table>

      </div>

    </div>


    <div class="grid-3 mt-20">

      ${managerInsightCard(
        "Stock Risk",
        "Check slow-moving stock and inventory days before increasing sales-in.",
        "📦",
        "Review Stock"
      )}

      ${managerInsightCard(
        "AR Risk",
        "Prioritize overdue customers and create collection commitments.",
        "💳",
        "Review AR"
      )}

      ${managerInsightCard(
        "Distributor Growth",
        "Compare sales-out against territory potential and coverage.",
        "📈",
        "Find Opportunity"
      )}

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   TERRITORY
========================================================= */

function renderTerritory() {

  const territories = [
    {
      name: "Yangon Central",
      coverage: 88,
      growth: 9.4,
      newCustomers: 14,
      lostCustomers: 3,
      competitor: "Medium",
      opportunity: "High"
    },
    {
      name: "North Yangon",
      coverage: 76,
      growth: 6.2,
      newCustomers: 11,
      lostCustomers: 4,
      competitor: "Low",
      opportunity: "High"
    },
    {
      name: "East Yangon",
      coverage: 64,
      growth: -2.8,
      newCustomers: 5,
      lostCustomers: 8,
      competitor: "High",
      opportunity: "Medium"
    },
    {
      name: "South Yangon",
      coverage: 71,
      growth: 4.7,
      newCustomers: 9,
      lostCustomers: 5,
      competitor: "Medium",
      opportunity: "Medium"
    }
  ];

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Territory Management</h2>

        <p>
          Turn territory data into coverage and growth actions.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="territory-plan">
          ＋ Create Route Plan
        </button>

      </div>

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Territory Performance</h3>
            <p>Coverage, growth and customer movement</p>
          </div>

        </div>

        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Territory</th>
                <th>Coverage</th>
                <th>Growth</th>
                <th>New</th>
                <th>Lost</th>
                <th>Competition</th>
              </tr>

            </thead>

            <tbody>

              ${territories
                .map(t => `

                  <tr>

                    <td>
                      <strong>
                        ${t.name}
                      </strong>
                    </td>

                    <td>
                      ${t.coverage}%
                    </td>

                    <td class="${
                      t.growth >= 0
                        ? "positive"
                        : "negative"
                    }">
                      ${t.growth >= 0 ? "+" : ""}
                      ${t.growth}%
                    </td>

                    <td>
                      ${t.newCustomers}
                    </td>

                    <td>
                      ${t.lostCustomers}
                    </td>

                    <td>
                      ${statusBadge(
                        t.competitor === "High"
                          ? "Needs Attention"
                          : t.competitor === "Medium"
                          ? "Watch"
                          : "Healthy"
                      )}
                    </td>

                  </tr>

                `)
                .join("")}

            </tbody>

          </table>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Territory Priorities</h3>
            <p>Where should the manager focus?</p>
          </div>

        </div>

        <div class="card-body">

          ${territories
            .filter(
              t =>
                t.opportunity === "High"
            )
            .map(t => `

              <div class="alert alert-primary">

                <div class="alert-icon">
                  🗺️
                </div>

                <div>

                  <strong>
                    ${t.name}
                  </strong>

                  <p>
                    Coverage is ${t.coverage}% with
                    ${t.newCustomers} new customers.
                    Opportunity level: ${t.opportunity}.
                  </p>

                </div>

              </div>

            `)
            .join("")}

        </div>

      </div>

    </div>


    <div class="grid-3 mt-20">

      ${territoryCard(
        "Customer Coverage",
        "Plan calls by outlet potential, frequency and geography.",
        "🎯"
      )}

      ${territoryCard(
        "Route Optimization",
        "Reduce travel time while increasing productive calls.",
        "🚗"
      )}

      ${territoryCard(
        "Competitor Tracking",
        "Record price, promotion, visibility and competitor activity.",
        "🔎"
      )}

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   FORECAST
========================================================= */

function renderForecast() {

  const target =
    Number(state.target) || 0;

  const achievement =
    Number(state.achievement) || 0;

  const now =
    new Date();

  const days =
    daysInCurrentMonth();

  const currentDay =
    now.getDate();

  const elapsed =
    Math.max(currentDay, 1);

  const remaining =
    Math.max(days - currentDay, 0);

  const dailyRunRate =
    achievement / elapsed;

  const expectedForecast =
    dailyRunRate * days;

  const bestCase =
    dailyRunRate * days * 1.12;

  const worstCase =
    dailyRunRate * days * 0.88;

  const requiredDaily =
    target > achievement &&
    remaining > 0
      ? (target - achievement) / remaining
      : 0;

  const forecastPct =
    percentage(
      expectedForecast,
      target
    );

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Sales Forecast</h2>

        <p>
          Use run-rate and gap analysis to make early decisions.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="forecast-action">
          🤖 Forecast Advice
        </button>

      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Current Run Rate",
        formatMoney(dailyRunRate),
        "⚡",
        "Average daily sales",
        "neutral"
      )}

      ${kpiCard(
        "Expected Forecast",
        formatMoney(expectedForecast),
        "📈",
        `${forecastPct.toFixed(1)}% of target`,
        forecastPct >= 100
          ? "positive"
          : "negative"
      )}

      ${kpiCard(
        "Required Daily",
        formatMoney(requiredDaily),
        "🎯",
        "Needed to hit target",
        requiredDaily
          ? "warning"
          : "positive"
      )}

      ${kpiCard(
        "Days Remaining",
        remaining,
        "📅",
        "Days left in month",
        "neutral"
      )}

    </div>


    <div class="grid-3">

      ${forecastCard(
        "Worst Case",
        worstCase,
        target,
        "Conservative scenario"
      )}

      ${forecastCard(
        "Expected",
        expectedForecast,
        target,
        "Current run-rate scenario"
      )}

      ${forecastCard(
        "Best Case",
        bestCase,
        target,
        "Improved execution scenario"
      )}

    </div>


    <div class="card mt-20">

      <div class="card-header">

        <div>
          <h3>Forecast Decision Framework</h3>
          <p>How a Sales Manager should respond</p>
        </div>

      </div>

      <div class="card-body">

        ${forecastAdvice(
          forecastPct,
          requiredDaily,
          remaining
        )}

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   MANAGER TOOLS
========================================================= */

function renderTools() {

  const tools = [
    {
      id: "margin",
      icon: "💰",
      title: "Margin Calculator",
      description:
        "Calculate gross margin and profit from cost and selling price."
    },
    {
      id: "markup",
      icon: "📐",
      title: "Markup Calculator",
      description:
        "Calculate markup percentage and selling price."
    },
    {
      id: "discount",
      icon: "🏷️",
      title: "Discount Calculator",
      description:
        "Calculate final price after discount."
    },
    {
      id: "breakeven",
      icon: "⚖️",
      title: "Break-even Calculator",
      description:
        "Calculate the sales volume required to cover fixed costs."
    },
    {
      id: "growth",
      icon: "📈",
      title: "Sales Growth",
      description:
        "Measure month-on-month or year-on-year growth."
    },
    {
      id: "commission",
      icon: "💵",
      title: "Commission Calculator",
      description:
        "Calculate sales commission based on achievement."
    },
    {
      id: "collection",
      icon: "💳",
      title: "Collection Calculator",
      description:
        "Calculate collection rate and outstanding AR."
    },
    {
      id: "target",
      icon: "🎯",
      title: "Target Calculator",
      description:
        "Calculate achievement, gap and required daily sales."
    },
    {
      id: "roi",
      icon: "📊",
      title: "ROI Calculator",
      description:
        "Estimate return on investment for a sales activity."
    }
  ];

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Manager Tools</h2>

        <p>
          Practical calculators for daily commercial decisions.
        </p>
      </div>

    </div>


    <div class="tool-grid">

      ${tools
        .map(tool => `

          <div
            class="tool-card"
            data-action="open-tool"
            data-tool="${tool.id}">

            <div class="tool-icon">
              ${tool.icon}
            </div>

            <h3>
              ${tool.title}
            </h3>

            <p>
              ${tool.description}
            </p>

          </div>

        `)
        .join("")}

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   REPORTS
========================================================= */

function renderReports() {

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Manager Reports</h2>

        <p>
          Create structured management reviews from your current data.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="print-report">
          🖨️ Print Report
        </button>

      </div>

    </div>


    <div class="grid-3">

      ${reportCard(
        "Daily Sales Report",
        "Daily target, achievement, gap and key actions.",
        "📅",
        "daily-report"
      )}

      ${reportCard(
        "Weekly Review",
        "Weekly performance, team KPI and territory review.",
        "📊",
        "weekly-report"
      )}

      ${reportCard(
        "Monthly Business Review",
        "Target, achievement, growth, distribution and AR.",
        "📈",
        "mbr-report"
      )}

      ${reportCard(
        "Team Performance",
        "Individual sales rep KPI and coaching priorities.",
        "👥",
        "team-report"
      )}

      ${reportCard(
        "Distributor Report",
        "Stock, sales-out, AR and collection overview.",
        "🏢",
        "distributor-report"
      )}

      ${reportCard(
        "Action Plan",
        "Open issues, owners, deadlines and follow-up.",
        "📝",
        "action-report"
      )}

    </div>


    <div id="reportPreview" class="card mt-20">

      <div class="card-header">

        <div>
          <h3>Management Summary</h3>
          <p>Current business snapshot</p>
        </div>

      </div>

      <div class="card-body">

        ${generateManagementSummary()}

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   PROBLEM SOLVER
========================================================= */

function renderProblemSolver() {

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Sales Problem Solver</h2>

        <p>
          Define the problem → find root cause → assign action → follow up.
        </p>
      </div>

      <div class="page-actions">

        <button
          class="btn btn-primary"
          data-action="new-problem">
          ＋ New Problem
        </button>

      </div>

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Problem-Solving Framework</h3>
            <p>Professional manager approach</p>
          </div>

        </div>

        <div class="card-body">

          ${problemFramework()}

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Common Sales Problems</h3>
            <p>Select a problem to get an action plan</p>
          </div>

        </div>

        <div class="card-body">

          ${problemButtons()}

        </div>

      </div>

    </div>


    <div class="card mt-20">

      <div class="card-header">

        <div>
          <h3>My Action Plans</h3>

          <p>
            ${state.problems.length}
            recorded problem${state.problems.length === 1 ? "" : "s"}
          </p>

        </div>

      </div>

      ${
        state.problems.length
          ? `
            <div class="table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>Problem</th>
                    <th>Root Cause</th>
                    <th>Action</th>
                    <th>Owner</th>
                    <th>Deadline</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  ${state.problems
                    .map(p => `

                      <tr>

                        <td>
                          <strong>
                            ${escapeHTML(p.problem)}
                          </strong>
                        </td>

                        <td>
                          ${escapeHTML(p.rootCause)}
                        </td>

                        <td>
                          ${escapeHTML(p.action)}
                        </td>

                        <td>
                          ${escapeHTML(p.owner)}
                        </td>

                        <td>
                          ${escapeHTML(p.deadline)}
                        </td>

                        <td>
                          ${statusBadge(p.status)}
                        </td>

                      </tr>

                    `)
                    .join("")}

                </tbody>

              </table>

            </div>
          `
          : `
            <div class="empty-state">

              <div class="empty-icon">
                🧩
              </div>

              <h3>
                No action plans yet
              </h3>

              <p>
                Create an action plan when a business problem appears.
              </p>

            </div>
          `
      }

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   AI SALES COACH
========================================================= */

function renderCoach() {

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>AI Sales Coach</h2>

        <p>
          Structured sales-management coaching for common workplace situations.
        </p>
      </div>

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>What problem are you facing?</h3>

            <p>
              Select a situation and get a manager-level action plan.
            </p>

          </div>

        </div>

        <div class="card-body">

          <div class="tool-grid">

            ${coachProblem(
              "target",
              "🎯",
              "Target is not being achieved"
            )}

            ${coachProblem(
              "team",
              "👥",
              "Team performance is down"
            )}

            ${coachProblem(
              "distributor",
              "🏢",
              "Distributor sales are slow"
            )}

            ${coachProblem(
              "competition",
              "⚔️",
              "Competitor is aggressive"
            )}

            ${coachProblem(
              "collection",
              "💳",
              "Collection / AR problem"
            )}

            ${coachProblem(
              "customer",
              "😟",
              "Customer complaint"
            )}

            ${coachProblem(
              "stock",
              "📦",
              "Stock / inventory problem"
            )}

            ${coachProblem(
              "motivation",
              "🔥",
              "Sales team motivation problem"
            )}

          </div>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Coach Response</h3>

            <p>
              Your action plan will appear here.
            </p>

          </div>

          <span>
            🤖
          </span>

        </div>

        <div
          id="coachResponse"
          class="card-body">

          <div class="empty-state">

            <div class="empty-icon">
              🤖
            </div>

            <h3>
              Ready to Coach
            </h3>

            <p>
              Choose a business problem from the left.
            </p>

          </div>

        </div>

      </div>

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   ACADEMY
========================================================= */

const academyLessons = [

  {
    no: 1,
    category: "Sales Leadership",
    title: "The Role of a Professional Sales Manager",
    description:
      "Understand the difference between being a top salesperson and leading a sales organization."
  },

  {
    no: 2,
    category: "Target Management",
    title: "How to Convert Target into Field Execution",
    description:
      "Break a monthly target into people, territory, customer and daily activities."
  },

  {
    no: 3,
    category: "KPI",
    title: "Sales KPI Management",
    description:
      "Use achievement, coverage, productivity and quality KPIs correctly."
  },

  {
    no: 4,
    category: "Coaching",
    title: "Effective Sales Coaching",
    description:
      "Improve team capability through observation, feedback and follow-up."
  },

  {
    no: 5,
    category: "Forecasting",
    title: "Sales Forecasting",
    description:
      "Use run-rate, gap and opportunity data to predict month-end performance."
  },

  {
    no: 6,
    category: "Distributor",
    title: "Distributor Management",
    description:
      "Balance sales-in, sales-out, stock, AR and distributor profitability."
  },

  {
    no: 7,
    category: "Territory",
    title: "Territory Management",
    description:
      "Build coverage plans based on potential, frequency and geography."
  },

  {
    no: 8,
    category: "Negotiation",
    title: "Professional Sales Negotiation",
    description:
      "Protect value while negotiating price, terms, visibility and volume."
  },

  {
    no: 9,
    category: "Customer",
    title: "Key Customer Management",
    description:
      "Develop long-term relationships and customer-specific business plans."
  },

  {
    no: 10,
    category: "Performance",
    title: "Managing Low Performers",
    description:
      "Diagnose capability, motivation and execution problems before taking action."
  },

  {
    no: 11,
    category: "Finance",
    title: "Sales Manager Finance",
    description:
      "Understand revenue, gross profit, margin, cost and commercial decisions."
  },

  {
    no: 12,
    category: "Strategy",
    title: "Strategic Thinking for Sales Managers",
    description:
      "Move from daily firefighting to structured commercial decision making."
  }
];


function renderAcademy() {

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Sales Manager Academy</h2>

        <p>
          Practical management capability for real workplace situations.
        </p>
      </div>

    </div>


    <div class="kpi-grid">

      ${kpiCard(
        "Courses",
        "12",
        "🎓",
        "Core manager modules",
        "neutral"
      )}

      ${kpiCard(
        "Lessons",
        academyLessons.length,
        "📚",
        "Professional lessons",
        "neutral"
      )}

      ${kpiCard(
        "Completed",
        "0",
        "✅",
        "Your learning progress",
        "neutral"
      )}

      ${kpiCard(
        "Progress",
        "0%",
        "📈",
        "Academy progress",
        "neutral"
      )}

    </div>


    <div class="lesson-grid">

      ${academyLessons
        .map(lesson => `

          <div
            class="lesson-card"
            data-action="open-lesson"
            data-id="${lesson.no}">

            <div class="lesson-number">
              Lesson ${lesson.no} ·
              ${escapeHTML(lesson.category)}
            </div>

            <h3>
              ${escapeHTML(lesson.title)}
            </h3>

            <p>
              ${escapeHTML(lesson.description)}
            </p>

            <div class="lesson-meta">

              <span>
                📖 Professional Lesson
              </span>

              <span>
                →
              </span>

            </div>

          </div>

        `)
        .join("")}

    </div>

  `;

  bindPageActions();
}


/* =========================================================
   SETTINGS
========================================================= */

function renderSettings() {

  appContent.innerHTML = `

    <div class="page-header">

      <div>
        <h2>Settings</h2>

        <p>
          Manage your manager profile and application data.
        </p>
      </div>

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Manager Profile</h3>
            <p>Basic profile information</p>
          </div>

        </div>

        <div class="card-body">

          <form id="settingsForm">

            <div class="form-grid">

              <div class="form-group">

                <label>
                  Manager Name
                </label>

                <input
                  class="form-control"
                  name="managerName"
                  value="${escapeAttr(
                    state.settings.managerName
                  )}"
                  required>

              </div>


              <div class="form-group">

                <label>
                  Company / Workspace
                </label>

                <input
                  class="form-control"
                  name="company"
                  value="${escapeAttr(
                    state.settings.company
                  )}"
                  required>

              </div>


              <div class="form-group">

                <label>
                  Currency
                </label>

                <select
                  class="form-control"
                  name="currency">

                  <option
                    value="MMK"
                    ${
                      state.settings.currency === "MMK"
                        ? "selected"
                        : ""
                    }>
                    MMK
                  </option>

                  <option
                    value="USD"
                    ${
                      state.settings.currency === "USD"
                        ? "selected"
                        : ""
                    }>
                    USD
                  </option>

                </select>

              </div>

            </div>


            <div class="page-actions mt-20">

              <button
                type="submit"
                class="btn btn-primary">
                Save Settings
              </button>

            </div>

          </form>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Data Management</h3>
            <p>Manage local application data</p>
          </div>

        </div>

        <div class="card-body">

          <div class="alert alert-primary">

            <div class="alert-icon">
              💾
            </div>

            <div>

              <strong>
                Local Data Storage
              </strong>

              <p>
                Your current demo data is saved in this browser using localStorage.
              </p>

            </div>

          </div>


          <button
            class="btn btn-secondary mt-10"
            data-action="export-data">
            📤 Export Data
          </button>


          <button
            class="btn btn-danger mt-10"
            data-action="reset-data">
            ♻️ Reset Demo Data
          </button>

        </div>

      </div>

    </div>

  `;

  const form =
    document.getElementById(
      "settingsForm"
    );

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const data =
        new FormData(form);

      state.settings.managerName =
        data.get("managerName");

      state.settings.company =
        data.get("company");

      state.settings.currency =
        data.get("currency");

      saveState();

      showToast(
        "Saved",
        "Settings updated successfully.",
        "✓"
      );

      renderSettings();
    }
  );

  bindPageActions();
}


/* =========================================================
   PAGE ACTION BINDING
========================================================= */

function bindPageActions() {

  document
    .querySelectorAll("[data-action]")
    .forEach(element => {

      element.addEventListener(
        "click",
        () => {

          const action =
            element.dataset.action;

          handleAction(
            action,
            element
          );

        }
      );

    });


  document
    .querySelectorAll(
      "#dailyChecklist input[type='checkbox']"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          if (input.checked) {

            showToast(
              "Completed",
              "Daily manager task completed.",
              "✓"
            );

          }

        }
      );

    });
}


/* =========================================================
   ACTION HANDLER
========================================================= */

function handleAction(
  action,
  element
) {

  switch (action) {

    case "quick-daily":
      renderPage("daily");
      break;

    case "quick-sale":
      openTargetModal();
      break;

    case "quick-target":
      renderPage("target");
      break;

    case "quick-team":
    case "view-team":
      renderPage("team");
      break;

    case "quick-distributor":
      renderPage("distributor");
      break;

    case "quick-coach":
      renderPage("coach");
      break;

    case "add-daily":
      openDailyModal();
      break;

    case "edit-target":
      openTargetModal();
      break;

    case "add-team":
      openTeamModal();
      break;

    case "edit-team":
      openTeamModal(
        Number(element.dataset.id)
      );
      break;

    case "add-distributor":
      openDistributorModal();
      break;

    case "territory-plan":
      openRoutePlanModal();
      break;

    case "forecast-action":
      renderPage("coach");

      setTimeout(() => {
        showCoachResponse("target");
      }, 100);

      break;

    case "open-tool":
      openCalculator(
        element.dataset.tool
      );
      break;

    case "print-report":
      window.print();
      break;

    case "daily-report":
    case "weekly-report":
    case "mbr-report":
    case "team-report":
    case "distributor-report":
    case "action-report":
      generateReport(
        action
      );
      break;

    case "new-problem":
      openProblemModal();
      break;

    case "coach-team":
      renderPage("coach");

      setTimeout(() => {
        showCoachResponse("team");
      }, 100);

      break;

    case "open-lesson":
      openLesson(
        Number(element.dataset.id)
      );
      break;

    case "export-data":
      exportData();
      break;

    case "reset-data":
      resetData();
      break;

    default:
      console.warn(
        "Unknown action:",
        action
      );
  }
}


/* =========================================================
   TARGET MODAL
========================================================= */

function openTargetModal() {

  openModal(
    "Update Sales Performance",
    "Enter your latest target and achievement.",
    `

      <form id="targetForm">

        <div class="form-grid">

          <div class="form-group">

            <label>
              Monthly Target
            </label>

            <input
              class="form-control"
              name="target"
              type="number"
              min="0"
              value="${state.target}"
              required>

          </div>


          <div class="form-group">

            <label>
              Current Achievement
            </label>

            <input
              class="form-control"
              name="achievement"
              type="number"
              min="0"
              value="${state.achievement}"
              required>

          </div>


          <div class="form-group">

            <label>
              Previous Month Sales
            </label>

            <input
              class="form-control"
              name="previous"
              type="number"
              min="0"
              value="${state.previousMonth}"
              required>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Save Performance
          </button>

        </div>

      </form>

    `
  );

  const form =
    document.getElementById(
      "targetForm"
    );

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const data =
        new FormData(form);

      state.target =
        Number(data.get("target"));

      state.achievement =
        Number(data.get("achievement"));

      state.previousMonth =
        Number(data.get("previous"));

      saveState();

      closeModal();

      showToast(
        "Updated",
        "Sales performance updated successfully.",
        "✓"
      );

      renderPage("dashboard");
    }
  );

  bindModalClose();
}


/* =========================================================
   TEAM MODAL
========================================================= */

function openTeamModal(id = null) {

  const existing =
    id
      ? state.team.find(
          person => person.id === id
        )
      : null;

  openModal(
    existing
      ? "Edit Sales Representative"
      : "Add Sales Representative",
    "Manage team KPI information.",
    `

      <form id="teamForm">

        <div class="form-grid">

          <div class="form-group">

            <label>
              Name
            </label>

            <input
              class="form-control"
              name="name"
              value="${escapeAttr(
                existing?.name || ""
              )}"
              required>

          </div>


          <div class="form-group">

            <label>
              Role
            </label>

            <input
              class="form-control"
              name="role"
              value="${escapeAttr(
                existing?.role ||
                "Sales Representative"
              )}"
              required>

          </div>


          <div class="form-group">

            <label>
              Target
            </label>

            <input
              class="form-control"
              name="target"
              type="number"
              value="${existing?.target || 0}"
              required>

          </div>


          <div class="form-group">

            <label>
              Achievement
            </label>

            <input
              class="form-control"
              name="achievement"
              type="number"
              value="${existing?.achievement || 0}"
              required>

          </div>


          <div class="form-group">

            <label>
              Attendance %
            </label>

            <input
              class="form-control"
              name="attendance"
              type="number"
              min="0"
              max="100"
              value="${existing?.attendance || 0}"
              required>

          </div>


          <div class="form-group">

            <label>
              Productive Visits
            </label>

            <input
              class="form-control"
              name="visits"
              type="number"
              min="0"
              value="${existing?.visits || 0}"
              required>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Save Sales Rep
          </button>

        </div>

      </form>

    `
  );

  document
    .getElementById("teamForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const data =
          new FormData(
            event.target
          );

        const person = {
          id:
            existing?.id ||
            Date.now(),

          name:
            data.get("name"),

          role:
            data.get("role"),

          target:
            Number(
              data.get("target")
            ),

          achievement:
            Number(
              data.get("achievement")
            ),

          attendance:
            Number(
              data.get("attendance")
            ),

          visits:
            Number(
              data.get("visits")
            ),

          status:
            Number(
              data.get("achievement")
            ) >=
            Number(
              data.get("target")
            )
              ? "Excellent"
              : percentage(
                  Number(
                    data.get("achievement")
                  ),
                  Number(
                    data.get("target")
                  )
                ) >= 80
              ? "On Track"
              : "Needs Attention"
        };

        if (existing) {

          const index =
            state.team.findIndex(
              p => p.id === existing.id
            );

          state.team[index] =
            person;

        } else {

          state.team.push(
            person
          );

        }

        saveState();

        closeModal();

        showToast(
          "Saved",
          "Sales team information saved.",
          "✓"
        );

        renderPage("team");
      }
    );

  bindModalClose();
}


/* =========================================================
   DISTRIBUTOR MODAL
========================================================= */

function openDistributorModal() {

  openModal(
    "Add Distributor",
    "Enter distributor performance information.",
    `

      <form id="distributorForm">

        <div class="form-grid">

          <div class="form-group">

            <label>
              Distributor Name
            </label>

            <input
              class="form-control"
              name="name"
              required>

          </div>


          <div class="form-group">

            <label>
              Territory
            </label>

            <input
              class="form-control"
              name="territory"
              required>

          </div>


          <div class="form-group">

            <label>
              Stock
            </label>

            <input
              class="form-control"
              name="stock"
              type="number"
              min="0"
              required>

          </div>


          <div class="form-group">

            <label>
              Sales Out
            </label>

            <input
              class="form-control"
              name="sales"
              type="number"
              min="0"
              required>

          </div>


          <div class="form-group">

            <label>
              Outstanding AR
            </label>

            <input
              class="form-control"
              name="ar"
              type="number"
              min="0"
              required>

          </div>


          <div class="form-group">

            <label>
              Collection
            </label>

            <input
              class="form-control"
              name="collection"
              type="number"
              min="0"
              required>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Save Distributor
          </button>

        </div>

      </form>

    `
  );

  document
    .getElementById(
      "distributorForm"
    )
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const data =
          new FormData(
            event.target
          );

        const ar =
          Number(data.get("ar"));

        const collection =
          Number(
            data.get("collection")
          );

        state.distributors.push({
          id: Date.now(),

          name:
            data.get("name"),

          territory:
            data.get("territory"),

          stock:
            Number(data.get("stock")),

          sales:
            Number(data.get("sales")),

          ar,

          collection,

          status:
            collection >= ar * 0.7
              ? "Healthy"
              : "Watch"
        });

        saveState();

        closeModal();

        showToast(
          "Saved",
          "Distributor added successfully.",
          "✓"
        );

        renderPage(
          "distributor"
        );
      }
    );

  bindModalClose();
}


/* =========================================================
   DAILY MODAL
========================================================= */

function openDailyModal() {

  openModal(
    "Add Daily Manager Action",
    "Record an action, issue or follow-up.",
    `

      <form id="dailyForm">

        <div class="form-grid">

          <div class="form-group">

            <label>
              Type
            </label>

            <select
              class="form-control"
              name="type">

              <option>
                Team
              </option>

              <option>
                Customer
              </option>

              <option>
                Distributor
              </option>

              <option>
                Collection
              </option>

              <option>
                Competitor
              </option>

              <option>
                Other
              </option>

            </select>

          </div>


          <div class="form-group">

            <label>
              Owner
            </label>

            <input
              class="form-control"
              name="owner"
              value="${escapeAttr(
                state.settings.managerName
              )}"
              required>

          </div>


          <div class="form-group full">

            <label>
              Action / Issue
            </label>

            <textarea
              class="form-control"
              name="action"
              required
              placeholder="Describe the action or issue..."></textarea>

          </div>


          <div class="form-group">

            <label>
              Status
            </label>

            <select
              class="form-control"
              name="status">

              <option>
                Open
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

            </select>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Save Action
          </button>

        </div>

      </form>

    `
  );

  document
    .getElementById("dailyForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const data =
          new FormData(
            event.target
          );

        const now =
          new Date();

        state.daily.push({
          id: Date.now(),

          date:
            now.toISOString()
              .slice(0, 10),

          time:
            now.toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit"
              }
            ),

          type:
            data.get("type"),

          owner:
            data.get("owner"),

          action:
            data.get("action"),

          status:
            data.get("status")
        });

        saveState();

        closeModal();

        showToast(
          "Saved",
          "Daily manager action recorded.",
          "✓"
        );

        renderPage("daily");
      }
    );

  bindModalClose();
}


/* =========================================================
   ROUTE PLAN
========================================================= */

function openRoutePlanModal() {

  openModal(
    "Create Route Plan",
    "Build a simple territory visit plan.",
    `

      <form id="routeForm">

        <div class="form-grid">

          <div class="form-group">

            <label>
              Territory
            </label>

            <select
              class="form-control"
              name="territory">

              <option>
                Yangon Central
              </option>

              <option>
                North Yangon
              </option>

              <option>
                East Yangon
              </option>

              <option>
                South Yangon
              </option>

            </select>

          </div>


          <div class="form-group">

            <label>
              Visit Date
            </label>

            <input
              class="form-control"
              type="date"
              name="date"
              value="${new Date()
                .toISOString()
                .slice(0, 10)}"
              required>

          </div>


          <div class="form-group full">

            <label>
              Priority Customers / Areas
            </label>

            <textarea
              class="form-control"
              name="customers"
              placeholder="Example: Key Account A, Distributor B, 20 new outlets..."
              required></textarea>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Create Plan
          </button>

        </div>

      </form>

    `
  );

  document
    .getElementById("routeForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        closeModal();

        showToast(
          "Route Plan Created",
          "Territory route plan has been prepared.",
          "✓"
        );
      }
    );

  bindModalClose();
}


/* =========================================================
   PROBLEM MODAL
========================================================= */

function openProblemModal(
  preset = ""
) {

  openModal(
    "Create Problem Action Plan",
    "Use Problem → Root Cause → Action → Owner → Deadline.",
    `

      <form id="problemForm">

        <div class="form-grid">

          <div class="form-group full">

            <label>
              Problem
            </label>

            <textarea
              class="form-control"
              name="problem"
              required
              placeholder="Example: Monthly target achievement is below plan."
            >${escapeHTML(
              preset
            )}</textarea>

          </div>


          <div class="form-group full">

            <label>
              Root Cause
            </label>

            <textarea
              class="form-control"
              name="rootCause"
              required
              placeholder="Why is this happening?"
            ></textarea>

          </div>


          <div class="form-group full">

            <label>
              Action
            </label>

            <textarea
              class="form-control"
              name="action"
              required
              placeholder="What specific action will solve it?"
            ></textarea>

          </div>


          <div class="form-group">

            <label>
              Owner
            </label>

            <input
              class="form-control"
              name="owner"
              value="${escapeAttr(
                state.settings.managerName
              )}"
              required>

          </div>


          <div class="form-group">

            <label>
              Deadline
            </label>

            <input
              class="form-control"
              name="deadline"
              type="date"
              required>

          </div>

        </div>


        <div class="page-actions mt-20">

          <button
            type="button"
            class="btn btn-secondary"
            data-modal-close>
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary">
            Save Action Plan
          </button>

        </div>

      </form>

    `
  );

  document
    .getElementById(
      "problemForm"
    )
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const data =
          new FormData(
            event.target
          );

        state.problems.push({
          id: Date.now(),

          problem:
            data.get("problem"),

          rootCause:
            data.get("rootCause"),

          action:
            data.get("action"),

          owner:
            data.get("owner"),

          deadline:
            data.get("deadline"),

          status:
            "Open"
        });

        saveState();

        closeModal();

        showToast(
          "Action Plan Saved",
          "Problem-solving plan recorded.",
          "✓"
        );

        renderPage(
          "problem"
        );
      }
    );

  bindModalClose();
}


/* =========================================================
   CALCULATORS
========================================================= */

function openCalculator(
  type
) {

  const calculators = {

    margin: {
      title: "Margin Calculator",
      subtitle: "Calculate gross profit and margin.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "cost",
            "Cost Price",
            0
          )}

          ${moneyInput(
            "selling",
            "Selling Price",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const cost =
          Number(data.cost);

        const selling =
          Number(data.selling);

        const profit =
          selling - cost;

        const margin =
          selling > 0
            ? (profit / selling) * 100
            : 0;

        return `
          <strong>
            Gross Profit: ${formatMoney(profit)}
          </strong>
          <p>
            Gross Margin: ${margin.toFixed(2)}%
          </p>
        `;
      }
    },


    markup: {
      title: "Markup Calculator",
      subtitle: "Calculate markup from cost to selling price.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "cost",
            "Cost Price",
            0
          )}

          ${moneyInput(
            "selling",
            "Selling Price",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const cost =
          Number(data.cost);

        const selling =
          Number(data.selling);

        const markup =
          cost > 0
            ? ((selling - cost) / cost) * 100
            : 0;

        return `
          <strong>
            Markup: ${markup.toFixed(2)}%
          </strong>
        `;
      }
    },


    discount: {
      title: "Discount Calculator",
      subtitle: "Calculate final selling price after discount.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "price",
            "Original Price",
            0
          )}

          ${numberInput(
            "discount",
            "Discount %",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const price =
          Number(data.price);

        const discount =
          Number(data.discount);

        const finalPrice =
          price -
          price * discount / 100;

        return `
          <strong>
            Final Price: ${formatMoney(finalPrice)}
          </strong>
          <p>
            Discount Amount:
            ${formatMoney(
              price - finalPrice
            )}
          </p>
        `;
      }
    },


    breakeven: {
      title: "Break-even Calculator",
      subtitle: "Calculate break-even sales volume.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "fixed",
            "Fixed Cost",
            0
          )}

          ${moneyInput(
            "price",
            "Selling Price / Unit",
            0
          )}

          ${moneyInput(
            "variable",
            "Variable Cost / Unit",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const fixed =
          Number(data.fixed);

        const price =
          Number(data.price);

        const variable =
          Number(data.variable);

        const contribution =
          price - variable;

        const units =
          contribution > 0
            ? fixed / contribution
            : 0;

        return `
          <strong>
            Break-even Units:
            ${numberFormat(
              Math.ceil(units)
            )}
          </strong>

          <p>
            Contribution / Unit:
            ${formatMoney(contribution)}
          </p>
        `;
      }
    },


    growth: {
      title: "Sales Growth Calculator",
      subtitle: "Compare current sales against previous sales.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "current",
            "Current Sales",
            0
          )}

          ${moneyInput(
            "previous",
            "Previous Sales",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const current =
          Number(data.current);

        const previous =
          Number(data.previous);

        const growth =
          previous > 0
            ? ((current - previous) /
              previous) * 100
            : 0;

        return `
          <strong>
            Sales Growth:
            ${growth >= 0 ? "+" : ""}
            ${growth.toFixed(2)}%
          </strong>
        `;
      }
    },


    commission: {
      title: "Commission Calculator",
      subtitle: "Calculate commission from sales.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "sales",
            "Sales",
            0
          )}

          ${numberInput(
            "rate",
            "Commission Rate %",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const sales =
          Number(data.sales);

        const rate =
          Number(data.rate);

        const commission =
          sales * rate / 100;

        return `
          <strong>
            Commission:
            ${formatMoney(
              commission
            )}
          </strong>
        `;
      }
    },


    collection: {
      title: "Collection Calculator",
      subtitle: "Calculate collection rate and outstanding AR.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "ar",
            "Outstanding AR",
            0
          )}

          ${moneyInput(
            "collection",
            "Collection",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const ar =
          Number(data.ar);

        const collection =
          Number(data.collection);

        const rate =
          ar > 0
            ? collection / ar * 100
            : 0;

        const outstanding =
          Math.max(
            ar - collection,
            0
          );

        return `
          <strong>
            Collection Rate:
            ${rate.toFixed(2)}%
          </strong>

          <p>
            Outstanding:
            ${formatMoney(
              outstanding
            )}
          </p>
        `;
      }
    },


    target: {
      title: "Target Calculator",
      subtitle: "Calculate achievement, gap and required daily sales.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "target",
            "Target",
            0
          )}

          ${moneyInput(
            "achievement",
            "Achievement",
            0
          )}

          ${numberInput(
            "days",
            "Remaining Days",
            1
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const target =
          Number(data.target);

        const achievement =
          Number(data.achievement);

        const days =
          Number(data.days);

        const pct =
          percentage(
            achievement,
            target
          );

        const gap =
          Math.max(
            target - achievement,
            0
          );

        const required =
          days > 0
            ? gap / days
            : 0;

        return `
          <strong>
            Achievement:
            ${pct.toFixed(2)}%
          </strong>

          <p>
            Gap:
            ${formatMoney(gap)}
          </p>

          <p>
            Required Daily:
            ${formatMoney(required)}
          </p>
        `;
      }
    },


    roi: {
      title: "ROI Calculator",
      subtitle: "Calculate return on investment.",
      body: `
        <form id="calcForm">

          ${moneyInput(
            "return",
            "Return / Profit",
            0
          )}

          ${moneyInput(
            "investment",
            "Investment",
            0
          )}

          <div
            id="calcResult"
            class="alert alert-primary mt-20">
            Enter values and calculate.
          </div>

          ${calculateButton()}

        </form>
      `,
      calculate: data => {

        const ret =
          Number(data.return);

        const investment =
          Number(data.investment);

        const roi =
          investment > 0
            ? ret / investment * 100
            : 0;

        return `
          <strong>
            ROI:
            ${roi.toFixed(2)}%
          </strong>
        `;
      }
    }

  };

  const calculator =
    calculators[type];

  if (!calculator) return;

  openModal(
    calculator.title,
    calculator.subtitle,
    calculator.body
  );

  const form =
    document.getElementById(
      "calcForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const formData =
        new FormData(form);

      const data = {};

      for (
        const [key, value]
        of formData.entries()
      ) {
        data[key] = value;
      }

      document.getElementById(
        "calcResult"
      ).innerHTML =
        calculator.calculate(data);
    }
  );

  bindModalClose();
}


/* =========================================================
   LESSON
========================================================= */

function openLesson(
  lessonNo
) {

  const lesson =
    academyLessons.find(
      item => item.no === lessonNo
    );

  if (!lesson) return;

  const detail = lessonDetails[
    lessonNo
  ] || defaultLessonDetail(
    lesson
  );

  openModal(
    `Lesson ${lesson.no}: ${lesson.title}`,
    lesson.category,
    `

      <div>

        <div class="alert alert-primary">

          <div class="alert-icon">
            🎓
          </div>

          <div>

            <strong>
              Learning Objective
            </strong>

            <p>
              ${escapeHTML(
                detail.objective
              )}
            </p>

          </div>

        </div>


        <div class="card">

          <div class="card-body">

            <h3 style="font-size:14px;">
              Core Concept
            </h3>

            <p
              style="
                color:#6b7485;
                font-size:11px;
                line-height:1.7;
                margin-top:8px;
              ">
              ${escapeHTML(
                detail.concept
              )}
            </p>


            <h3
              style="
                font-size:14px;
                margin-top:20px;
              ">
              Workplace Application
            </h3>

            <p
              style="
                color:#6b7485;
                font-size:11px;
                line-height:1.7;
                margin-top:8px;
              ">
              ${escapeHTML(
                detail.application
              )}
            </p>


            <h3
              style="
                font-size:14px;
                margin-top:20px;
              ">
              Manager Action
            </h3>

            <ol
              style="
                padding-left:20px;
                color:#6b7485;
                font-size:11px;
                line-height:1.8;
                margin-top:8px;
              ">

              ${detail.actions
                .map(
                  action =>
                    `<li>${escapeHTML(
                      action
                    )}</li>`
                )
                .join("")}

            </ol>

          </div>

        </div>

      </div>

    `
  );

  bindModalClose();
}


/* =========================================================
   LESSON DETAILS
========================================================= */

const lessonDetails = {

  1: {
    objective:
      "Understand the real responsibility of a Sales Manager and move from individual selling to team leadership.",

    concept:
      "A Sales Manager is responsible for business results through people, numbers and execution. The manager should create clarity, coach the team, remove obstacles and make timely commercial decisions.",

    application:
      "Instead of personally fixing every customer problem, the manager builds a system where sales representatives understand the target, know their territory, execute the right activities and are reviewed regularly.",

    actions: [
      "Set clear expectations for every team member.",
      "Translate business targets into field activities.",
      "Review performance using facts and KPI.",
      "Coach before blaming.",
      "Create ownership and accountability."
    ]
  },


  2: {
    objective:
      "Learn how to convert a monthly sales target into practical daily field execution.",

    concept:
      "A target becomes manageable when it is broken down by sales representative, territory, channel, customer and day.",

    application:
      "For example, a 300 million MMK monthly target can be divided among sales representatives and territories, then converted into required daily sales, customer calls, distribution and productive outlets.",

    actions: [
      "Confirm the total monthly target.",
      "Allocate target by person and territory.",
      "Calculate required daily run-rate.",
      "Identify high-potential customers.",
      "Review progress every day."
    ]
  },


  3: {
    objective:
      "Use KPI as a management system rather than simply a reporting requirement.",

    concept:
      "Good KPI combines result indicators and activity indicators. Sales achievement alone does not explain why performance is good or bad.",

    application:
      "A representative with low achievement may have poor coverage, insufficient productive calls, weak conversion or stock availability issues. The manager should identify the real driver.",

    actions: [
      "Track achievement percentage.",
      "Track productive calls and coverage.",
      "Compare actual activity against expectation.",
      "Identify KPI gaps.",
      "Create specific coaching actions."
    ]
  },


  4: {
    objective:
      "Develop a practical coaching habit that improves sales capability.",

    concept:
      "Coaching is not criticism. It is the process of observing performance, identifying gaps, discussing alternatives and agreeing on the next action.",

    application:
      "During a field visit, observe how the sales representative opens the customer conversation, presents the product, handles objections and closes the order.",

    actions: [
      "Observe before giving feedback.",
      "Ask the salesperson what they noticed.",
      "Identify one or two priority gaps.",
      "Demonstrate the better approach.",
      "Follow up on the agreed action."
    ]
  },


  5: {
    objective:
      "Build a forecast that helps the manager take action before the month ends.",

    concept:
      "Forecasting uses current achievement, elapsed days, run-rate, remaining days and known opportunities or risks.",

    application:
      "If current run-rate indicates that the business will finish below target, the manager should not wait until the final week. The gap must be converted into specific actions.",

    actions: [
      "Calculate current daily run-rate.",
      "Project month-end achievement.",
      "Calculate remaining target gap.",
      "Calculate required daily sales.",
      "Create a recovery action plan."
    ]
  },


  6: {
    objective:
      "Manage distributor health across sales, stock, AR and collection.",

    concept:
      "Distributor management is a balance between availability and financial health. Pushing sales-in without sales-out can create unhealthy inventory and cash pressure.",

    application:
      "A distributor with high stock and weak sales-out should receive a sell-out and market activation plan rather than simply another sales-in target.",

    actions: [
      "Review stock level.",
      "Review sales-out.",
      "Check inventory risk.",
      "Review AR and collection.",
      "Agree on a distributor action plan."
    ]
  },


  7: {
    objective:
      "Improve territory productivity through planned coverage.",

    concept:
      "Territory management is about putting the right amount of selling effort into the right locations and customers.",

    application:
      "High-potential customers should receive appropriate visit frequency while low-potential areas should be served efficiently.",

    actions: [
      "Segment customers by potential.",
      "Build route plans.",
      "Set coverage standards.",
      "Track new and lost customers.",
      "Review competitor activity."
    ]
  },


  8: {
    objective:
      "Negotiate commercially without destroying value through unnecessary discounting.",

    concept:
      "Professional negotiation focuses on value, volume, terms, visibility, payment and mutual business benefit—not only price.",

    application:
      "When a customer asks for a discount, first understand the reason and explore alternatives such as volume commitment, payment terms or promotional support.",

    actions: [
      "Understand the customer's real need.",
      "Protect the value proposition.",
      "Trade concessions rather than giving them freely.",
      "Confirm mutual commitments.",
      "Document the agreement."
    ]
  },


  9: {
    objective:
      "Build strategic relationships with important customers.",

    concept:
      "Key Account Management requires understanding the customer's business, objectives, opportunities and decision-making structure.",

    application:
      "Instead of visiting a key customer only to take an order, create a joint business plan covering sales growth, distribution, visibility and commercial opportunities.",

    actions: [
      "Identify strategic customers.",
      "Understand customer objectives.",
      "Build customer-specific plans.",
      "Review performance jointly.",
      "Develop long-term opportunities."
    ]
  },


  10: {
    objective:
      "Manage low performers objectively and professionally.",

    concept:
      "Low performance may come from skill, will, resources, territory, clarity or execution problems. The manager must diagnose the cause before deciding the solution.",

    application:
      "Compare the salesperson's target, activity, capability and market conditions. Then create a measurable improvement plan.",

    actions: [
      "Define the performance gap.",
      "Identify the root cause.",
      "Agree on improvement actions.",
      "Set a review date.",
      "Recognize improvement and enforce accountability."
    ]
  },


  11: {
    objective:
      "Understand the financial impact of sales decisions.",

    concept:
      "Revenue is not the same as profit. Sales managers should understand margin, discount, trade spend, collection and cost-to-serve.",

    application:
      "A high-volume customer may not be attractive if excessive discount, slow collection or high service cost destroys profitability.",

    actions: [
      "Review sales value.",
      "Understand gross margin.",
      "Evaluate discount impact.",
      "Monitor collection.",
      "Consider profitable growth."
    ]
  },


  12: {
    objective:
      "Develop strategic thinking instead of operating only in reactive mode.",

    concept:
      "Strategic thinking connects market trends, customer behavior, competitor activity, company capability and financial outcomes.",

    application:
      "A strong manager asks not only 'What happened?' but also 'Why did it happen?', 'What will happen next?' and 'What should we do now?'.",

    actions: [
      "Review business trends.",
      "Identify major drivers.",
      "Separate symptoms from root causes.",
      "Prioritize high-impact actions.",
      "Review results and adapt strategy."
    ]
  }

};


function defaultLessonDetail(
  lesson
) {

  return {
    objective:
      `Build practical capability in ${lesson.title}.`,

    concept:
      `This lesson focuses on the professional principles behind ${lesson.title} and how they affect sales performance and management effectiveness.`,

    application:
      "Apply the concept to a real workplace situation, using your own team, territory and business data.",

    actions: [
      "Understand the current situation.",
      "Identify the performance gap.",
      "Define the root cause.",
      "Create a specific action.",
      "Review the result."
    ]
  };
}


/* =========================================================
   COACHING LOGIC
========================================================= */

const coachResponses = {

  target: {
    title:
      "Target Achievement Problem",

    diagnosis:
      "Do not immediately pressure the team for more sales. First identify where the gap comes from: people, territory, customer coverage, conversion, stock, pricing or execution.",

    actions: [
      "Calculate the exact target gap.",
      "Break the gap by sales representative and territory.",
      "Identify the top 20 customers or opportunities that can close the gap.",
      "Calculate the required daily sales for the remaining days.",
      "Run a short daily review until the gap is controlled."
    ],

    managerQuestion:
      "What specific activity will generate the missing sales—not simply 'try harder'?"
  },


  team: {
    title:
      "Team Performance Problem",

    diagnosis:
      "Separate performance problems into capability, motivation, clarity, resources and execution. One solution should not be applied to everyone.",

    actions: [
      "Rank the team by achievement percentage.",
      "Identify low performers and compare activity KPI.",
      "Conduct one-to-one coaching.",
      "Agree on measurable improvement actions.",
      "Review progress weekly."
    ],

    managerQuestion:
      "What is the real reason this person is underperforming?"
  },


  distributor: {
    title:
      "Distributor Sales Problem",

    diagnosis:
      "Check sales-out before pushing additional stock. Slow movement may come from weak coverage, low demand, pricing, competitor pressure or inventory imbalance.",

    actions: [
      "Review current stock and inventory risk.",
      "Compare sales-in with sales-out.",
      "Identify slow-moving SKUs.",
      "Create a sell-out activation plan.",
      "Review distributor cash and AR position."
    ],

    managerQuestion:
      "Are we solving a sales problem or creating a stock problem?"
  },


  competition: {
    title:
      "Competitive Pressure",

    diagnosis:
      "Do not automatically respond with price cuts. First understand competitor price, promotion, visibility, availability and customer proposition.",

    actions: [
      "Collect reliable competitor information.",
      "Identify the exact competitive threat.",
      "Protect key customer relationships.",
      "Improve execution and value proposition.",
      "Use targeted commercial action where justified."
    ],

    managerQuestion:
      "What exactly is the competitor doing better?"
  },


  collection: {
    title:
      "Collection / AR Problem",

    diagnosis:
      "AR should be managed as a business process. Segment overdue accounts and assign clear collection commitments.",

    actions: [
      "List overdue customers.",
      "Prioritize by amount and risk.",
      "Assign owner for every account.",
      "Set collection commitment dates.",
      "Review actual collection versus commitment."
    ],

    managerQuestion:
      "Which overdue account has the highest financial risk?"
  },


  customer: {
    title:
      "Customer Complaint",

    diagnosis:
      "Listen first, establish the facts and separate the customer's emotion from the actual operational issue.",

    actions: [
      "Acknowledge the concern professionally.",
      "Confirm facts and evidence.",
      "Identify the root cause.",
      "Agree on corrective action.",
      "Follow up after resolution."
    ],

    managerQuestion:
      "What action will prevent the same complaint from happening again?"
  },


  stock: {
    title:
      "Stock / Inventory Problem",

    diagnosis:
      "Stock problems can be caused by inaccurate forecasting, poor allocation, weak sales-out or SKU mix.",

    actions: [
      "Review stock by SKU and location.",
      "Identify fast and slow movers.",
      "Compare stock against demand.",
      "Reallocate where appropriate.",
      "Update forecast and replenishment."
    ],

    managerQuestion:
      "Do we have the wrong amount of stock or the wrong stock mix?"
  },


  motivation: {
    title:
      "Sales Team Motivation",

    diagnosis:
      "Motivation is stronger when people have clear expectations, capability, recognition and ownership. Motivation alone cannot fix a broken sales process.",

    actions: [
      "Clarify expectations.",
      "Recognize good performance.",
      "Coach skill gaps.",
      "Remove execution obstacles.",
      "Give ownership with accountability."
    ],

    managerQuestion:
      "Is this really a motivation problem—or a clarity, capability or resource problem?"
  }

};


function showCoachResponse(
  type
) {

  const response =
    coachResponses[type];

  const container =
    document.getElementById(
      "coachResponse"
    );

  if (!response || !container) {
    return;
  }

  container.innerHTML = `

    <div class="alert alert-primary">

      <div class="alert-icon">
        🤖
      </div>

      <div>

        <strong>
          ${escapeHTML(
            response.title
          )}
        </strong>

        <p>
          ${escapeHTML(
            response.diagnosis
          )}
        </p>

      </div>

    </div>


    <div>

      <h3
        style="
          font-size:13px;
          margin:18px 0 8px;
        ">
        Recommended Actions
      </h3>

      <ol
        style="
          padding-left:20px;
          color:#6b7485;
          font-size:11px;
          line-height:1.8;
        ">

        ${response.actions
          .map(
            action =>
              `<li>${escapeHTML(
                action
              )}</li>`
          )
          .join("")}

      </ol>

    </div>


    <div class="alert alert-warning mt-20">

      <div class="alert-icon">
        💡
      </div>

      <div>

        <strong>
          Manager Question
        </strong>

        <p>
          ${escapeHTML(
            response.managerQuestion
          )}
        </p>

      </div>

    </div>

  `;
}


/* =========================================================
   MODAL / COACH / PROBLEM BUTTONS
========================================================= */

function problemButtons() {

  const problems = [
    [
      "🎯",
      "Target not achieved",
      "Target is below plan"
    ],
    [
      "👥",
      "Team performance",
      "Sales reps are underperforming"
    ],
    [
      "🏢",
      "Distributor slow",
      "Distributor sales-out is weak"
    ],
    [
      "💳",
      "Collection issue",
      "AR is increasing"
    ],
    [
      "⚔️",
      "Competitor pressure",
      "Competitor is taking share"
    ]
  ];

  return problems
    .map(item => `

      <button
        class="quick-action"
        data-action="problem-preset"
        data-problem="${escapeAttr(item[2])}">

        <div class="quick-icon">
          ${item[0]}
        </div>

        <strong>
          ${escapeHTML(item[1])}
        </strong>

        <span>
          ${escapeHTML(item[2])}
        </span>

      </button>

    `)
    .join("");
}


/* =========================================================
   OVERRIDE ACTION FOR PROBLEM PRESETS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const element =
      event.target.closest(
        '[data-action="problem-preset"]'
      );

    if (!element) return;

    openProblemModal(
      element.dataset.problem
    );

  }
);


function coachProblem(
  type,
  icon,
  title
) {

  return `

    <button
      class="tool-card"
      data-action="coach-problem"
      data-type="${type}">

      <div class="tool-icon">
        ${icon}
      </div>

      <h3>
        ${escapeHTML(title)}
      </h3>

      <p>
        Get a structured manager action plan.
      </p>

    </button>

  `;
}


/* =========================================================
   COACH ACTION EVENT
========================================================= */

document.addEventListener(
  "click",
  event => {

    const element =
      event.target.closest(
        '[data-action="coach-problem"]'
      );

    if (!element) return;

    showCoachResponse(
      element.dataset.type
    );

  }
);


/* =========================================================
   MODAL
========================================================= */

function setupModal() {

  modalClose.addEventListener(
    "click",
    closeModal
  );

  modalBackdrop.addEventListener(
    "click",
    closeModal
  );

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("show")
      ) {
        closeModal();
      }

    }
  );
}

function openModal(
  title,
  subtitle,
  body
) {

  modalTitle.textContent =
    title;

  modalSubtitle.textContent =
    subtitle;

  modalBody.innerHTML =
    body;

  modal.classList.add(
    "show"
  );
}

function closeModal() {

  modal.classList.remove(
    "show"
  );

  modalBody.innerHTML = "";
}

function bindModalClose() {

  document
    .querySelectorAll(
      "[data-modal-close]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closeModal
      );

    });
}


/* =========================================================
   NOTIFICATION
========================================================= */

function setupNotification() {

  const notificationBtn =
    document.getElementById(
      "notificationBtn"
    );

  notificationBtn.addEventListener(
    "click",
    () => {

      showToast(
        "Manager Alert",
        "Review target gap, team KPI and distributor AR today.",
        "!"
      );

    }
  );
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(
  title,
  message,
  icon = "✓"
) {

  toastTitle.textContent =
    title;

  toastMessage.textContent =
    message;

  toastIcon.textContent =
    icon;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      3200
    );
}


/* =========================================================
   EXPORT / RESET
========================================================= */

function exportData() {

  const data =
    JSON.stringify(
      state,
      null,
      2
    );

  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "aung-sales-manager-data.json";

  link.click();

  URL.revokeObjectURL(
    url
  );

  showToast(
    "Export Complete",
    "Your sales manager data has been exported.",
    "✓"
  );
}


function resetData() {

  const confirmed =
    window.confirm(
      "Reset all Aung Sales Manager Pro demo data?"
    );

  if (!confirmed) {
    return;
  }

  state =
    structuredClone(
      defaultState
    );

  saveState();

  showToast(
    "Data Reset",
    "Demo data has been restored.",
    "✓"
  );

  renderPage(
    "dashboard"
  );
}


/* =========================================================
   REPORT GENERATOR
========================================================= */

function generateReport(
  type
) {

  const reportNames = {
    "daily-report":
      "Daily Sales Report",

    "weekly-report":
      "Weekly Sales Review",

    "mbr-report":
      "Monthly Business Review",

    "team-report":
      "Team Performance Report",

    "distributor-report":
      "Distributor Performance Report",

    "action-report":
      "Manager Action Plan"
  };

  const name =
    reportNames[type] ||
    "Management Report";

  const preview =
    document.getElementById(
      "reportPreview"
    );

  if (!preview) return;

  preview.innerHTML = `

    <div class="card-header">

      <div>

        <h3>
          ${name}
        </h3>

        <p>
          Generated ${new Date()
            .toLocaleDateString(
              "en-GB"
            )}
        </p>

      </div>

    </div>

    <div class="card-body">

      ${generateManagementSummary()}

      <div class="alert alert-success mt-20">

        <div class="alert-icon">
          ✓
        </div>

        <div>

          <strong>
            Report Ready
          </strong>

          <p>
            Use your browser's Print function to save this report as PDF.
          </p>

        </div>

      </div>

    </div>

  `;

  showToast(
    "Report Generated",
    `${name} is ready for review.`,
    "✓"
  );
}


/* =========================================================
   MANAGEMENT SUMMARY
========================================================= */

function generateManagementSummary() {

  const target =
    Number(state.target);

  const achievement =
    Number(state.achievement);

  const pct =
    percentage(
      achievement,
      target
    );

  const growth =
    state.previousMonth > 0
      ? (
          (achievement -
            state.previousMonth) /
          state.previousMonth
        ) * 100
      : 0;

  const best =
    [...state.team].sort(
      (a, b) =>
        percentage(
          b.achievement,
          b.target
        ) -
        percentage(
          a.achievement,
          a.target
        )
    )[0];

  return `

    <div class="stat-row">

      <span class="stat-label">
        Monthly Target
      </span>

      <strong class="stat-value">
        ${formatMoney(target)}
      </strong>

    </div>


    <div class="stat-row">

      <span class="stat-label">
        Achievement
      </span>

      <strong class="stat-value">
        ${formatMoney(achievement)}
        (${pct.toFixed(1)}%)
      </strong>

    </div>


    <div class="stat-row">

      <span class="stat-label">
        Sales Growth
      </span>

      <strong
        class="stat-value ${
          growth >= 0
            ? "text-success"
            : "text-danger"
        }">

        ${growth >= 0 ? "+" : ""}
        ${growth.toFixed(1)}%

      </strong>

    </div>


    <div class="stat-row">

      <span class="stat-label">
        Top Sales Performer
      </span>

      <strong class="stat-value">
        ${
          best
            ? escapeHTML(best.name)
            : "-"
        }
      </strong>

    </div>


    <div class="stat-row">

      <span class="stat-label">
        Distributor Count
      </span>

      <strong class="stat-value">
        ${state.distributors.length}
      </strong>

    </div>

  `;
}


/* =========================================================
   UI HELPERS
========================================================= */

function kpiCard(
  label,
  value,
  icon,
  note,
  tone
) {

  return `

    <div class="kpi-card">

      <div class="kpi-top">

        <span class="kpi-label">
          ${label}
        </span>

        <div class="kpi-icon">
          ${icon}
        </div>

      </div>

      <div class="kpi-value">
        ${value}
      </div>

      <div class="kpi-bottom">

        <span class="${tone}">
          ${note}
        </span>

      </div>

    </div>

  `;
}


function quickAction(
  icon,
  title,
  description,
  action
) {

  return `

    <button
      class="quick-action"
      data-action="${action}">

      <div class="quick-icon">
        ${icon}
      </div>

      <strong>
        ${title}
      </strong>

      <span>
        ${description}
      </span>

    </button>

  `;
}


function statusBadge(
  status
) {

  const normalized =
    String(status)
      .toLowerCase();

  let cls =
    "badge-primary";

  if (
    normalized.includes(
      "excellent"
    ) ||
    normalized.includes(
      "healthy"
    ) ||
    normalized.includes(
      "completed"
    )
  ) {

    cls =
      "badge-success";

  } else if (
    normalized.includes(
      "attention"
    ) ||
    normalized.includes(
      "danger"
    )
  ) {

    cls =
      "badge-danger";

  } else if (
    normalized.includes(
      "watch"
    ) ||
    normalized.includes(
      "progress"
    )
  ) {

    cls =
      "badge-warning";
  }

  return `

    <span class="badge ${cls}">
      ${escapeHTML(status)}
    </span>

  `;
}


function priorityAlerts(
  achievementPercent,
  outstandingAR
) {

  const alerts = [];

  if (
    achievementPercent < 80
  ) {

    alerts.push(`
      <div class="alert alert-warning">

        <div class="alert-icon">
          🎯
        </div>

        <div>

          <strong>
            Target Gap
          </strong>

          <p>
            Achievement is below 80%.
            Review the gap by team and territory.
          </p>

        </div>

      </div>
    `);

  }

  if (
    state.team.some(
      person =>
        percentage(
          person.achievement,
          person.target
        ) < 70
    )
  ) {

    alerts.push(`
      <div class="alert alert-danger">

        <div class="alert-icon">
          👥
        </div>

        <div>

          <strong>
            Team Attention
          </strong>

          <p>
            At least one sales representative is below 70%.
          </p>

        </div>

      </div>
    `);

  }

  if (
    outstandingAR > 40000000
  ) {

    alerts.push(`
      <div class="alert alert-danger">

        <div class="alert-icon">
          💳
        </div>

        <div>

          <strong>
            AR Risk
          </strong>

          <p>
            Outstanding AR is high. Review collection commitments.
          </p>

        </div>

      </div>
    `);

  }

  if (!alerts.length) {

    alerts.push(`
      <div class="alert alert-success">

        <div class="alert-icon">
          ✓
        </div>

        <div>

          <strong>
            Business On Track
          </strong>

          <p>
            No major priority alert from the current dashboard data.
          </p>

        </div>

      </div>
    `);

  }

  return alerts.join("");
}


function managerChecklist() {

  const items = [
    "Review yesterday achievement",
    "Set today's target",
    "Check low-performing reps",
    "Review key customer opportunities",
    "Check distributor stock and AR",
    "Confirm field visit priorities",
    "Review end-of-day result"
  ];

  return items
    .map(
      (item, index) => `

        <div
          style="
            display:flex;
            gap:9px;
            align-items:center;
            padding:9px 0;
            border-bottom:1px solid #eef1f5;
          ">

          <span
            style="
              width:22px;
              height:22px;
              border-radius:50%;
              background:#eaf1ff;
              color:#155eef;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:9px;
              font-weight:800;
            ">
            ${index + 1}
          </span>

          <span
            style="
              font-size:11px;
              color:#475467;
            ">
            ${escapeHTML(item)}
          </span>

        </div>

      `
    )
    .join("");
}


function dailyFocusCard(
  icon,
  title,
  description
) {

  return `

    <div class="card">

      <div class="card-body">

        <div class="tool-icon">
          ${icon}
        </div>

        <h3
          style="
            font-size:14px;
          ">
          ${title}
        </h3>

        <p
          style="
            color:#6b7485;
            font-size:10px;
            line-height:1.6;
            margin-top:5px;
          ">
          ${description}
        </p>

      </div>

    </div>

  `;
}


function dailyChecklistItem(
  id,
  title,
  description
) {

  return `

    <label
      style="
        display:flex;
        gap:12px;
        padding:13px 0;
        border-bottom:1px solid #eef1f5;
        cursor:pointer;
      ">

      <input
        type="checkbox"
        id="${id}"
        style="
          width:16px;
          height:16px;
          margin-top:2px;
        ">

      <span>

        <strong
          style="
            display:block;
            font-size:11px;
          ">
          ${title}
        </strong>

        <span
          style="
            display:block;
            color:#6b7485;
            font-size:10px;
            line-height:1.5;
            margin-top:3px;
          ">
          ${description}
        </span>

      </span>

    </label>

  `;
}


function targetDecision(
  pct,
  projected
) {

  if (pct >= 100) {

    return `
      <div class="alert alert-success">

        <div class="alert-icon">
          🏆
        </div>

        <div>

          <strong>
            Target Achieved
          </strong>

          <p>
            Protect momentum and focus on profitable incremental growth.
          </p>

        </div>

      </div>
    `;

  }

  if (projected >= state.target) {

    return `
      <div class="alert alert-success">

        <div class="alert-icon">
          📈
        </div>

        <div>

          <strong>
            Projection is Healthy
          </strong>

          <p>
            Current run-rate indicates the target can be achieved.
            Focus on execution consistency.
          </p>

        </div>

      </div>
    `;

  }

  return `
    <div class="alert alert-warning">

      <div class="alert-icon">
        ⚠️
      </div>

      <div>

        <strong>
          Recovery Action Required
        </strong>

        <p>
          Current projection is below target.
          Identify the largest gaps and create a recovery plan now.
        </p>

      </div>

    </div>
  `;
}


function managerInsightCard(
  title,
  description,
  icon,
  button
) {

  return `

    <div class="tool-card">

      <div class="tool-icon">
        ${icon}
      </div>

      <h3>
        ${title}
      </h3>

      <p>
        ${description}
      </p>

      <button
        class="btn btn-light mt-15"
        data-action="quick-coach">
        ${button}
      </button>

    </div>

  `;
}


function territoryCard(
  title,
  description,
  icon
) {

  return `

    <div class="tool-card">

      <div class="tool-icon">
        ${icon}
      </div>

      <h3>
        ${title}
      </h3>

      <p>
        ${description}
      </p>

    </div>

  `;
}


function forecastCard(
  title,
  value,
  target,
  description
) {

  const pct =
    percentage(
      value,
      target
    );

  return `

    <div class="card">

      <div class="card-header">

        <div>

          <h3>
            ${title}
          </h3>

          <p>
            ${description}
          </p>

        </div>

      </div>

      <div class="card-body">

        <div
          style="
            font-size:22px;
            font-weight:800;
          ">
          ${formatMoney(value)}
        </div>

        <div class="progress-wrap">

          <div class="progress-track">

            <div
              class="progress-bar"
              style="
                width:${Math.min(
                  pct,
                  100
                )}%;
              ">
            </div>

          </div>

          <div class="progress-info">

            <span>
              ${pct.toFixed(1)}% of target
            </span>

            <strong>
              ${formatMoney(target)}
            </strong>

          </div>

        </div>

      </div>

    </div>

  `;
}


function forecastAdvice(
  forecastPct,
  requiredDaily,
  remaining
) {

  if (
    forecastPct >= 100
  ) {

    return `
      <div class="alert alert-success">

        <div class="alert-icon">
          ✓
        </div>

        <div>

          <strong>
            Current Forecast is On Track
          </strong>

          <p>
            Maintain execution discipline and protect key customer opportunities.
          </p>

        </div>

      </div>
    `;

  }

  return `
    <div class="alert alert-warning">

      <div class="alert-icon">
        ⚡
      </div>

      <div>

        <strong>
          Recovery Plan Required
        </strong>

        <p>
          You have ${remaining} days remaining and need approximately
          ${formatMoney(requiredDaily)} per day to close the target gap.
        </p>

      </div>

    </div>
  `;
}


function reportCard(
  title,
  description,
  icon,
  action
) {

  return `

    <div class="tool-card">

      <div class="tool-icon">
        ${icon}
      </div>

      <h3>
        ${title}
      </h3>

      <p>
        ${description}
      </p>

      <button
        class="btn btn-primary mt-15"
        data-action="${action}">
        Generate
      </button>

    </div>

  `;
}


/* =========================================================
   CALCULATOR FORM HELPERS
========================================================= */

function moneyInput(
  name,
  label,
  value
) {

  return `

    <div class="form-group mt-10">

      <label>
        ${label}
      </label>

      <input
        class="form-control"
        name="${name}"
        type="number"
        min="0"
        value="${value}"
        required>

    </div>

  `;
}


function numberInput(
  name,
  label,
  value
) {

  return `

    <div class="form-group mt-10">

      <label>
        ${label}
      </label>

      <input
        class="form-control"
        name="${name}"
        type="number"
        min="0"
        value="${value}"
        required>

    </div>

  `;
}


function calculateButton() {

  return `

    <div class="page-actions mt-20">

      <button
        type="button"
        class="btn btn-secondary"
        data-modal-close>
        Close
      </button>

      <button
        type="submit"
        class="btn btn-primary">
        Calculate
      </button>

    </div>

  `;
}


/* =========================================================
   UTILITIES
========================================================= */

function percentage(
  value,
  total
) {

  value =
    Number(value) || 0;

  total =
    Number(total) || 0;

  if (total <= 0) {
    return 0;
  }

  return (
    value / total
  ) * 100;
}


function formatMoney(
  value
) {

  const amount =
    Number(value) || 0;

  return amount.toLocaleString(
    "en-US"
  ) + " MMK";
}


function numberFormat(
  value
) {

  return (
    Number(value) || 0
  ).toLocaleString(
    "en-US"
  );
}


function daysInCurrentMonth() {

  const now =
    new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
}


function initials(
  name
) {

  return String(name)
    .split(" ")
    .map(
      part =>
        part.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}


function escapeAttr(
  value
) {

  return escapeHTML(
    value
  );
}


/* =========================================================
   END
========================================================= */
```
