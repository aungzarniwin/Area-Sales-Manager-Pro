/* =========================================================
   AUNG SALES MANAGER PRO
   app.js
   Version 1.0 Professional
========================================================= */

(function () {
  "use strict";

  /* =======================================================
     STORAGE
  ======================================================= */

  const STORAGE = {
    target: "asm_target",
    achievement: "asm_achievement",
    remainingDays: "asm_remaining_days",
    team: "asm_team",
    distributors: "asm_distributors",
    territories: "asm_territories",
    dailyChecks: "asm_daily_checks",
    dailyNotes: "asm_daily_notes",
    profile: "asm_profile",
    reports: "asm_reports"
  };


  /* =======================================================
     HELPERS
  ======================================================= */

  function $(id) {
    return document.getElementById(id);
  }

  function $all(selector) {
    return document.querySelectorAll(selector);
  }

  function number(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function money(value) {
    return Math.round(number(value)).toLocaleString("en-US");
  }

  function percent(value) {
    return `${number(value).toFixed(1)}%`;
  }

  function getData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =======================================================
     TOAST
  ======================================================= */

  function showToast(message) {
    const toast = $("toast");
    const toastMessage = $("toastMessage");

    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(window.asmToastTimer);

    window.asmToastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }


  /* =======================================================
     PAGE NAVIGATION
  ======================================================= */

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


  function openPage(pageName) {
    const target = $("page-" + pageName);

    if (!target) {
      showToast("Page not found");
      return;
    }

    $all(".page").forEach(function (page) {
      page.classList.remove("active");
      page.classList.remove("active-page");
      page.style.display = "none";
    });

    target.classList.add("active");
    target.classList.add("active-page");
    target.style.display = "block";

    $all(".nav-item").forEach(function (item) {
      item.classList.remove("active");

      if (item.dataset.page === pageName) {
        item.classList.add("active");
      }
    });

    const breadcrumb = $("breadcrumbCurrent");

    if (breadcrumb) {
      breadcrumb.textContent =
        PAGE_NAMES[pageName] || pageName;
    }

    document.body.classList.remove("sidebar-open");

    const sidebar = $("sidebar");

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (history.replaceState) {
      history.replaceState(null, "", "#" + pageName);
    }

    refreshPage(pageName);
  }


  function setupNavigation() {

    $all("[data-page]").forEach(function (element) {

      element.addEventListener("click", function (event) {

        event.preventDefault();

        const pageName = element.dataset.page;

        if (pageName) {
          openPage(pageName);
        }

      });

    });

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function setupMobileMenu() {

    const button = $("mobileMenuBtn");
    const sidebar = $("sidebar");

    if (!button || !sidebar) return;

    button.addEventListener("click", function () {

      sidebar.classList.toggle("open");
      document.body.classList.toggle(
        "sidebar-open",
        sidebar.classList.contains("open")
      );

    });

  }


  /* =======================================================
     DATE
  ======================================================= */

  function updateDate() {

    const now = new Date();

    const formatted = now.toLocaleDateString(
      "en-GB",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    if ($("todayDate")) {
      $("todayDate").textContent = formatted;
    }

    if ($("dailyManagerDate")) {
      $("dailyManagerDate").textContent = formatted;
    }

    if ($("reportDate")) {
      $("reportDate").textContent = formatted;
    }

  }


  /* =======================================================
     SALES TARGET
  ======================================================= */

  function calculateSalesTarget() {

    const target = number(
      $("salesTargetInput")?.value
    );

    const achievement = number(
      $("salesAchievementInput")?.value
    );

    const remainingDays = number(
      $("salesRemainingDaysInput")?.value
    );

    if (target <= 0) {
      showToast("Please enter Monthly Target");
      return;
    }

    const gap = Math.max(target - achievement, 0);

    const achievementPercent =
      (achievement / target) * 100;

    const dailyRequired =
      remainingDays > 0
        ? gap / remainingDays
        : 0;

    let status = "On Track";

    if (achievementPercent >= 100) {
      status = "Achieved";
    } else if (achievementPercent >= 80) {
      status = "Strong";
    } else if (achievementPercent >= 60) {
      status = "Watch";
    } else {
      status = "Action Required";
    }

    saveData(STORAGE.target, target);
    saveData(STORAGE.achievement, achievement);
    saveData(STORAGE.remainingDays, remainingDays);

    renderTargetResults(
      target,
      achievement,
      gap,
      achievementPercent,
      dailyRequired,
      status
    );

    updateDashboard();

    showToast("Sales target updated");
  }


  function renderTargetResults(
    target,
    achievement,
    gap,
    achievementPercent,
    dailyRequired,
    status
  ) {

    if ($("targetGapResult")) {
      $("targetGapResult").textContent = money(gap);
    }

    if ($("targetAchievementPercent")) {
      $("targetAchievementPercent").textContent =
        percent(achievementPercent);
    }

    if ($("dailyRequiredResult")) {
      $("dailyRequiredResult").textContent =
        money(dailyRequired);
    }

    if ($("targetStatusResult")) {
      $("targetStatusResult").textContent = status;
    }

    if ($("bigTargetPercent")) {
      $("bigTargetPercent").textContent =
        percent(achievementPercent);
    }

    if ($("bigTargetBar")) {
      $("bigTargetBar").style.width =
        Math.min(achievementPercent, 100) + "%";
    }

    if ($("targetAchievementDisplay")) {
      $("targetAchievementDisplay").textContent =
        money(achievement);
    }

    if ($("targetDisplay")) {
      $("targetDisplay").textContent =
        money(target);
    }

  }


  function loadSalesTarget() {

    const target = getData(STORAGE.target, 0);
    const achievement = getData(STORAGE.achievement, 0);
    const remainingDays =
      getData(STORAGE.remainingDays, 0);

    if ($("salesTargetInput")) {
      $("salesTargetInput").value =
        target || "";
    }

    if ($("salesAchievementInput")) {
      $("salesAchievementInput").value =
        achievement || "";
    }

    if ($("salesRemainingDaysInput")) {
      $("salesRemainingDaysInput").value =
        remainingDays || "";
    }

    if (target > 0) {

      const gap = Math.max(
        target - achievement,
        0
      );

      const achievementPercent =
        achievement / target * 100;

      const dailyRequired =
        remainingDays > 0
          ? gap / remainingDays
          : 0;

      let status = "On Track";

      if (achievementPercent >= 100) {
        status = "Achieved";
      } else if (achievementPercent >= 80) {
        status = "Strong";
      } else if (achievementPercent >= 60) {
        status = "Watch";
      } else {
        status = "Action Required";
      }

      renderTargetResults(
        target,
        achievement,
        gap,
        achievementPercent,
        dailyRequired,
        status
      );
    }

  }


  /* =======================================================
     DASHBOARD
  ======================================================= */

  function updateDashboard() {

    const target =
      getData(STORAGE.target, 0);

    const achievement =
      getData(STORAGE.achievement, 0);

    const remainingDays =
      getData(STORAGE.remainingDays, 0);

    const team =
      getData(STORAGE.team, []);

    const gap =
      Math.max(target - achievement, 0);

    const achievementPercent =
      target > 0
        ? achievement / target * 100
        : 0;

    const dailyRequired =
      remainingDays > 0
        ? gap / remainingDays
        : 0;


    if ($("dashboardTarget")) {
      $("dashboardTarget").textContent =
        money(target);
    }

    if ($("dashboardAchievement")) {
      $("dashboardAchievement").textContent =
        money(achievement);
    }

    if ($("dashboardAchievementPercent")) {
      $("dashboardAchievementPercent").textContent =
        percent(achievementPercent);
    }

    if ($("dashboardTeamCount")) {
      $("dashboardTeamCount").textContent =
        team.length;
    }

    if ($("dashboardProgressText")) {
      $("dashboardProgressText").textContent =
        percent(achievementPercent);
    }

    if ($("dashboardProgressBar")) {
      $("dashboardProgressBar").style.width =
        Math.min(achievementPercent, 100) + "%";
    }

    if ($("dashboardProgressAchievement")) {
      $("dashboardProgressAchievement").textContent =
        money(achievement);
    }

    if ($("dashboardProgressTarget")) {
      $("dashboardProgressTarget").textContent =
        money(target);
    }

    if ($("dashboardGap")) {
      $("dashboardGap").textContent =
        money(gap);
    }

    if ($("dashboardDailyRequired")) {
      $("dashboardDailyRequired").textContent =
        money(dailyRequired);
    }

    if ($("dashboardRemainingDays")) {
      $("dashboardRemainingDays").textContent =
        remainingDays;
    }

  }


  /* =======================================================
     DAILY MANAGER
  ======================================================= */

  function setupDailyManager() {

    const checks =
      getData(STORAGE.dailyChecks, {});

    $all("[data-daily-check]").forEach(function (checkbox) {

      const key = checkbox.dataset.dailyCheck;

      checkbox.checked = !!checks[key];

      checkbox.addEventListener("change", function () {

        checks[key] = checkbox.checked;

        saveData(
          STORAGE.dailyChecks,
          checks
        );

        updateDailyCompletion();

      });

    });


    const notes =
      getData(STORAGE.dailyNotes, "");

    if ($("dailyManagerNotes")) {
      $("dailyManagerNotes").value = notes;
    }


    const saveButton =
      $("saveDailyNotes");

    if (saveButton) {

      saveButton.addEventListener(
        "click",
        function () {

          saveData(
            STORAGE.dailyNotes,
            $("dailyManagerNotes").value
          );

          showToast("Daily notes saved");

        }
      );

    }

    updateDailyCompletion();

  }


  function updateDailyCompletion() {

    const all =
      Array.from(
        $all("[data-daily-check]")
      );

    if (!all.length) return;

    const completed =
      all.filter(
        checkbox => checkbox.checked
      ).length;

    const result =
      Math.round(
        completed / all.length * 100
      );

    if ($("dailyCompletion")) {
      $("dailyCompletion").textContent =
        result + "%";
    }

  }


  /* =======================================================
     TEAM KPI
  ======================================================= */

  function setupTeamKPI() {

    const addButton =
      $("addTeamMemberBtn");

    if (addButton) {

      addButton.addEventListener(
        "click",
        addTeamMember
      );

    }

    renderTeamKPI();

  }


  function addTeamMember() {

    const name =
      prompt("Sales Representative Name:");

    if (!name || !name.trim()) {
      return;
    }

    const target =
      number(
        prompt("Individual Target (MMK):", "0")
      );

    const achievement =
      number(
        prompt("Achievement (MMK):", "0")
      );

    const team =
      getData(STORAGE.team, []);

    team.push({
      id: Date.now(),
      name: name.trim(),
      target: target,
      achievement: achievement
    });

    saveData(STORAGE.team, team);

    renderTeamKPI();
    updateDashboard();

    showToast("Sales representative added");

  }


  function renderTeamKPI() {

    const team =
      getData(STORAGE.team, []);

    const body =
      $("teamKpiTableBody");

    if (!body) return;


    if (!team.length) {

      body.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">
            No sales team data yet.
            Click "+ Add Sales Rep" to begin.
          </td>
        </tr>
      `;

    } else {

      body.innerHTML =
        team.map(function (member) {

          const achievementPercent =
            member.target > 0
              ? member.achievement /
                member.target * 100
              : 0;

          let status = "Action Required";

          if (achievementPercent >= 100) {
            status = "Achieved";
          } else if (achievementPercent >= 80) {
            status = "On Track";
          } else if (achievementPercent >= 60) {
            status = "Watch";
          }

          return `
            <tr>
              <td>
                <strong>${escapeHTML(member.name)}</strong>
              </td>

              <td>${money(member.target)}</td>

              <td>${money(member.achievement)}</td>

              <td>
                <strong>
                  ${percent(achievementPercent)}
                </strong>
              </td>

              <td>
                <span class="status-badge">
                  ${status}
                </span>
              </td>

              <td>
                <button
                  class="table-action"
                  data-team-delete="${member.id}">
                  Delete
                </button>
              </td>
            </tr>
          `;

        }).join("");

    }


    $all("[data-team-delete]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const id =
              Number(
                button.dataset.teamDelete
              );

            const updated =
              team.filter(
                member => member.id !== id
              );

            saveData(
              STORAGE.team,
              updated
            );

            renderTeamKPI();
            updateDashboard();

            showToast("Team member removed");

          }
        );

      }
    );


    const total =
      team.length;

    const average =
      total
        ? team.reduce(
            function (sum, member) {

              return sum +
                (
                  member.target > 0
                    ? member.achievement /
                      member.target * 100
                    : 0
                );

            },
            0
          ) / total
        : 0;


    let top = null;
    let under = null;

    team.forEach(function (member) {

      const p =
        member.target > 0
          ? member.achievement /
            member.target * 100
          : 0;

      if (!top || p > top.percent) {
        top = {
          name: member.name,
          percent: p
        };
      }

      if (!under || p < under.percent) {
        under = {
          name: member.name,
          percent: p
        };
      }

    });


    if ($("teamTotalCount")) {
      $("teamTotalCount").textContent =
        total;
    }

    if ($("teamAverageAchievement")) {
      $("teamAverageAchievement").textContent =
        percent(average);
    }

    if ($("teamTopPerformer")) {
      $("teamTopPerformer").textContent =
        top ? top.name : "-";
    }

    if ($("teamUnderPerformer")) {
      $("teamUnderPerformer").textContent =
        under ? under.name : "-";
    }

  }


  /* =======================================================
     DISTRIBUTOR
  ======================================================= */

  function setupDistributor() {

    const button =
      $("addDistributorBtn");

    if (button) {
      button.addEventListener(
        "click",
        addDistributor
      );
    }

    renderDistributors();

  }


  function addDistributor() {

    const name =
      prompt("Distributor Name:");

    if (!name || !name.trim()) {
      return;
    }

    const openingStock =
      number(
        prompt("Opening Stock:", "0")
      );

    const sales =
      number(
        prompt("Sales:", "0")
      );

    const outstanding =
      number(
        prompt("Outstanding (MMK):", "0")
      );

    const creditLimit =
      number(
        prompt("Credit Limit (MMK):", "0")
      );

    const distributors =
      getData(
        STORAGE.distributors,
        []
      );

    const closingStock =
      Math.max(
        openingStock - sales,
        0
      );

    distributors.push({
      id: Date.now(),
      name: name.trim(),
      openingStock,
      sales,
      closingStock,
      outstanding,
      creditLimit
    });

    saveData(
      STORAGE.distributors,
      distributors
    );

    renderDistributors();

    showToast("Distributor added");

  }


  function renderDistributors() {

    const distributors =
      getData(
        STORAGE.distributors,
        []
      );

    const body =
      $("distributorTableBody");

    if (!body) return;


    if (!distributors.length) {

      body.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            No distributor data yet.
            Click "+ Add Distributor" to begin.
          </td>
        </tr>
      `;

    } else {

      body.innerHTML =
        distributors.map(function (d) {

          let health = "Healthy";

          if (
            d.creditLimit > 0 &&
            d.outstanding >= d.creditLimit
          ) {
            health = "Credit Risk";
          } else if (
            d.outstanding >
            d.creditLimit * 0.8
          ) {
            health = "Watch";
          } else if (
            d.closingStock <= 0
          ) {
            health = "Stock Risk";
          }

          return `
            <tr>

              <td>
                <strong>
                  ${escapeHTML(d.name)}
                </strong>
              </td>

              <td>${money(d.openingStock)}</td>

              <td>${money(d.sales)}</td>

              <td>${money(d.closingStock)}</td>

              <td>${money(d.outstanding)}</td>

              <td>${money(d.creditLimit)}</td>

              <td>
                <span class="status-badge">
                  ${health}
                </span>
              </td>

            </tr>
          `;

        }).join("");

    }


    const totalStock =
      distributors.reduce(
        (sum, d) =>
          sum + d.closingStock,
        0
      );

    const totalOutstanding =
      distributors.reduce(
        (sum, d) =>
          sum + d.outstanding,
        0
      );

    const risk =
      distributors.filter(function (d) {

        return (
          d.closingStock <= 0 ||
          (
            d.creditLimit > 0 &&
            d.outstanding >= d.creditLimit
          )
        );

      }).length;


    if ($("distributorTotal")) {
      $("distributorTotal").textContent =
        distributors.length;
    }

    if ($("distributorStock")) {
      $("distributorStock").textContent =
        money(totalStock);
    }

    if ($("distributorOutstanding")) {
      $("distributorOutstanding").textContent =
        money(totalOutstanding);
    }

    if ($("distributorRisk")) {
      $("distributorRisk").textContent =
        risk;
    }

  }


  /* =======================================================
     TERRITORY
  ======================================================= */

  function setupTerritory() {

    const button =
      $("addTerritoryBtn");

    if (button) {
      button.addEventListener(
        "click",
        addTerritory
      );
    }

    renderTerritories();

  }


  function addTerritory() {

    const name =
      prompt("Territory / Township:");

    if (!name || !name.trim()) {
      return;
    }

    const outlets =
      number(
        prompt("Total Outlets:", "0")
      );

    const active =
      number(
        prompt("Active Outlets:", "0")
      );

    const sales =
      number(
        prompt("Sales (MMK):", "0")
      );

    const target =
      number(
        prompt("Target (MMK):", "0")
      );

    const growth =
      number(
        prompt("Growth %:", "0")
      );

    const territories =
      getData(
        STORAGE.territories,
        []
      );

    territories.push({
      id: Date.now(),
      name: name.trim(),
      outlets,
      active,
      sales,
      target,
      growth
    });

    saveData(
      STORAGE.territories,
      territories
    );

    renderTerritories();

    showToast("Territory added");

  }


  function renderTerritories() {

    const territories =
      getData(
        STORAGE.territories,
        []
      );

    const body =
      $("territoryTableBody");

    if (!body) return;


    if (!territories.length) {

      body.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            No territory data yet.
            Click "+ Add Territory" to begin.
          </td>
        </tr>
      `;

    } else {

      body.innerHTML =
        territories.map(function (t) {

          const coverage =
            t.outlets > 0
              ? t.active /
                t.outlets * 100
              : 0;

          return `
            <tr>

              <td>
                <strong>
                  ${escapeHTML(t.name)}
                </strong>
              </td>

              <td>${money(t.outlets)}</td>

              <td>${money(t.active)}</td>

              <td>${money(t.sales)}</td>

              <td>${money(t.target)}</td>

              <td>${percent(coverage)}</td>

              <td>${percent(t.growth)}</td>

            </tr>
          `;

        }).join("");

    }


    const totalOutlets =
      territories.reduce(
        (sum, t) =>
          sum + t.outlets,
        0
      );

    const activeOutlets =
      territories.reduce(
        (sum, t) =>
          sum + t.active,
        0
      );

    const coverage =
      totalOutlets > 0
        ? activeOutlets /
          totalOutlets * 100
        : 0;


    if ($("territoryTotal")) {
      $("territoryTotal").textContent =
        territories.length;
    }

    if ($("territoryOutlets")) {
      $("territoryOutlets").textContent =
        money(totalOutlets);
    }

    if ($("territoryActiveOutlets")) {
      $("territoryActiveOutlets").textContent =
        money(activeOutlets);
    }

    if ($("territoryCoverage")) {
      $("territoryCoverage").textContent =
        percent(coverage);
    }

  }


  /* =======================================================
     SALES FORECAST
  ======================================================= */

  function setupForecast() {

    const button =
      $("calculateForecast");

    if (button) {

      button.addEventListener(
        "click",
        calculateForecast
      );

    }

  }


  function calculateForecast() {

    const target =
      number(
        $("forecastTarget")?.value
      );

    const achievement =
      number(
        $("forecastAchievement")?.value
      );

    const daysPassed =
      number(
        $("forecastDaysPassed")?.value
      );

    const totalDays =
      number(
        $("forecastTotalDays")?.value
      );

    if (
      achievement <= 0 ||
      daysPassed <= 0 ||
      totalDays <= 0
    ) {

      showToast(
        "Please enter valid forecast data"
      );

      return;
    }


    const runRate =
      achievement / daysPassed;

    const forecast =
      runRate * totalDays;

    const gap =
      target > forecast
        ? target - forecast
        : 0;

    const forecastPercent =
      target > 0
        ? forecast / target * 100
        : 0;


    if ($("forecastRunRate")) {
      $("forecastRunRate").textContent =
        money(runRate);
    }

    if ($("forecastResult")) {
      $("forecastResult").textContent =
        money(forecast);
    }

    if ($("forecastGap")) {
      $("forecastGap").textContent =
        money(gap);
    }

    if ($("forecastPercent")) {
      $("forecastPercent").textContent =
        percent(forecastPercent);
    }


    let message = "";

    if (forecastPercent >= 100) {

      message =
        "Current run rate indicates that the team is on track to achieve or exceed the monthly target.";

    } else if (forecastPercent >= 80) {

      message =
        "The forecast is close to target. Increase daily execution and focus on high-value opportunities.";

    } else {

      message =
        "The forecast indicates a significant gap. Immediate corrective action is required on people, customers, territories and execution.";

    }


    if ($("forecastInsight")) {

      $("forecastInsight").innerHTML = `
        <div class="focus-icon">📈</div>
        <div>
          <h3>Forecast Insight</h3>
          <p>${message}</p>
        </div>
      `;

    }

    showToast("Forecast calculated");

  }


  /* =======================================================
     MANAGER TOOLS
  ======================================================= */

  function setupManagerTools() {

    $all("[data-tool]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const type =
              button.dataset.tool;

            generateManagerTool(type);

          }
        );

      }
    );

  }


  function generateManagerTool(type) {

    const title =
      $("managerToolTitle");

    const subtitle =
      $("managerToolSubtitle");

    const output =
      $("managerToolOutput");

    if (!output) return;


    const tools = {

      target: {
        title: "Target Planner",
        subtitle: "Break monthly target into execution levels.",
        content: `
          <div class="tool-plan">
            <h4>Target Planning Framework</h4>
            <ol>
              <li>Set monthly target.</li>
              <li>Break target into weekly targets.</li>
              <li>Convert weekly target into daily required sales.</li>
              <li>Assign targets by territory and sales representative.</li>
              <li>Review achievement every day.</li>
              <li>Take corrective action before the gap becomes too large.</li>
            </ol>
          </div>
        `
      },

      coaching: {
        title: "Coaching Planner",
        subtitle: "Structured sales representative coaching.",
        content: `
          <div class="tool-plan">
            <h4>5-Step Coaching Conversation</h4>
            <ol>
              <li>Review actual performance.</li>
              <li>Ask the representative what is happening.</li>
              <li>Identify the real performance barrier.</li>
              <li>Agree on one or two specific actions.</li>
              <li>Set a follow-up date and measurable KPI.</li>
            </ol>
          </div>
        `
      },

      field: {
        title: "Field Visit Planner",
        subtitle: "Prioritize field activities.",
        content: `
          <div class="tool-plan">
            <h4>Field Visit Priority</h4>
            <ul>
              <li>High-value customers</li>
              <li>Declining customers</li>
              <li>Low-performing territories</li>
              <li>Stock-risk distributors</li>
              <li>New business opportunities</li>
              <li>Competitor activity hotspots</li>
            </ul>
          </div>
        `
      },

      meeting: {
        title: "Meeting Planner",
        subtitle: "Prepare a productive sales meeting.",
        content: `
          <div class="tool-plan">
            <h4>Sales Meeting Agenda</h4>
            <ol>
              <li>Business performance</li>
              <li>Target vs achievement</li>
              <li>Key market issues</li>
              <li>Team performance</li>
              <li>Distributor situation</li>
              <li>Corrective actions</li>
              <li>Owner and deadline</li>
            </ol>
          </div>
        `
      },

      review: {
        title: "Performance Review",
        subtitle: "Monthly performance review structure.",
        content: `
          <div class="tool-plan">
            <h4>Performance Review</h4>
            <ol>
              <li>What was the target?</li>
              <li>What was achieved?</li>
              <li>Where is the gap?</li>
              <li>Why did the gap happen?</li>
              <li>What worked well?</li>
              <li>What needs to change?</li>
              <li>What is the next-month action plan?</li>
            </ol>
          </div>
        `
      },

      action: {
        title: "Action Plan",
        subtitle: "Convert problems into accountable actions.",
        content: `
          <div class="tool-plan">
            <h4>Action Plan Framework</h4>
            <div class="action-row">
              <strong>Problem</strong>
              <span>Define the measurable issue.</span>
            </div>
            <div class="action-row">
              <strong>Root Cause</strong>
              <span>Find the reason behind the problem.</span>
            </div>
            <div class="action-row">
              <strong>Action</strong>
              <span>Define the exact corrective action.</span>
            </div>
            <div class="action-row">
              <strong>Owner</strong>
              <span>Assign one accountable person.</span>
            </div>
            <div class="action-row">
              <strong>Deadline</strong>
              <span>Set a clear follow-up date.</span>
            </div>
          </div>
        `
      }

    };


    const tool =
      tools[type] ||
      tools.target;


    if (title) {
      title.textContent =
        tool.title;
    }

    if (subtitle) {
      subtitle.textContent =
        tool.subtitle;
    }

    output.innerHTML =
      tool.content;

  }


  /* =======================================================
     REPORTS
  ======================================================= */

  function setupReports() {

    $all("[data-report]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            $all(".report-tab").forEach(
              tab =>
                tab.classList.remove("active")
            );

            button.classList.add("active");

            renderReport(
              button.dataset.report
            );

          }
        );

      }
    );


    const exportButton =
      $("exportReportBtn");

    if (exportButton) {

      exportButton.addEventListener(
        "click",
        exportReport
      );

    }

    renderReport("daily");

  }


  function renderReport(type) {

    const titles = {

      daily: [
        "Daily Sales Report",
        "Daily sales management summary."
      ],

      weekly: [
        "Weekly Sales Report",
        "Weekly sales performance summary."
      ],

      monthly: [
        "Monthly Sales Report",
        "Monthly business performance."
      ],

      team: [
        "Team Performance Report",
        "Sales representative KPI summary."
      ],

      distributor: [
        "Distributor Report",
        "Distributor stock and credit summary."
      ],

      territory: [
        "Territory Report",
        "Territory sales and coverage summary."
      ]

    };


    const selected =
      titles[type] ||
      titles.daily;


    if ($("reportTitle")) {
      $("reportTitle").textContent =
        selected[0];
    }

    if ($("reportDescription")) {
      $("reportDescription").textContent =
        selected[1];
    }


    const target =
      getData(STORAGE.target, 0);

    const achievement =
      getData(STORAGE.achievement, 0);

    const gap =
      Math.max(
        target - achievement,
        0
      );

    const achievementPercent =
      target > 0
        ? achievement / target * 100
        : 0;


    if ($("reportTotalSales")) {
      $("reportTotalSales").textContent =
        money(achievement);
    }

    if ($("reportTarget")) {
      $("reportTarget").textContent =
        money(target);
    }

    if ($("reportAchievement")) {
      $("reportAchievement").textContent =
        percent(achievementPercent);
    }

    if ($("reportGap")) {
      $("reportGap").textContent =
        money(gap);
    }

  }


  function exportReport() {

    const target =
      getData(STORAGE.target, 0);

    const achievement =
      getData(STORAGE.achievement, 0);

    const gap =
      Math.max(target - achievement, 0);

    const achievementPercent =
      target > 0
        ? achievement / target * 100
        : 0;


    const text = [
      "AUNG SALES MANAGER PRO",
      "SALES PERFORMANCE REPORT",
      "--------------------------------",
      `Date: ${new Date().toLocaleDateString()}`,
      `Monthly Target: ${money(target)} MMK`,
      `Achievement: ${money(achievement)} MMK`,
      `Achievement %: ${percent(achievementPercent)}`,
      `Target Gap: ${money(gap)} MMK`,
      "--------------------------------",
      "Generated by Aung Sales Manager Pro"
    ].join("\n");


    const blob =
      new Blob(
        [text],
        { type: "text/plain;charset=utf-8" }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Aung-Sales-Manager-Report.txt";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast("Report exported");

  }


  /* =======================================================
     PROBLEM SOLVER
  ======================================================= */

  let currentProblem =
    "target-gap";


  function setupProblemSolver() {

    $all("[data-problem]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            $all(".problem-type").forEach(
              item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            currentProblem =
              button.dataset.problem;

            updateProblemPlaceholder();

          }
        );

      }
    );


    const solveButton =
      $("solveProblemBtn");

    if (solveButton) {

      solveButton.addEventListener(
        "click",
        solveProblem
      );

    }

  }


  function updateProblemPlaceholder() {

    const input =
      $("problemInput");

    if (!input) return;


    const placeholders = {

      "target-gap":
        "Example: Monthly sales achievement is only 65% of target...",

      "low-sales":
        "Example: Sales in one territory have declined for three consecutive weeks...",

      distributor:
        "Example: Distributor order volume is falling and outstanding is increasing...",

      stock:
        "Example: Several key outlets are facing stock-out...",

      team:
        "Example: One sales representative is consistently below KPI...",

      collection:
        "Example: Distributor outstanding is above credit limit..."

    };


    input.placeholder =
      placeholders[currentProblem] ||
      placeholders["target-gap"];

  }


  function solveProblem() {

    const problem =
      $("problemInput")?.value.trim();

    const evidence =
      $("problemEvidence")?.value.trim();


    if (!problem) {

      showToast(
        "Please describe the problem first"
      );

      return;
    }


    const solutions = {

      "target-gap": {
        root:
          "The target gap should be investigated through three areas: people capability, customer/territory opportunity and execution quality.",
        action:
          "Break the gap into territory and sales-rep level. Identify the biggest gap contributor, create a 7-day recovery plan and review progress daily.",
        owner:
          "Sales Manager + responsible Sales Representatives",
        follow:
          "Review achievement, daily run rate and recovery actions every day."
      },

      "low-sales": {
        root:
          "Low sales may be caused by weak outlet coverage, low customer productivity, stock availability, competitor pressure or poor execution.",
        action:
          "Compare sales by territory/customer, identify the biggest decline and conduct focused field visits with specific recovery actions.",
        owner:
          "Sales Manager + Territory Owner",
        follow:
          "Measure sales recovery and active outlet productivity within 7 days."
      },

      distributor: {
        root:
          "Distributor performance should be assessed through order volume, stock, outstanding, credit position and market execution.",
        action:
          "Review distributor financial and stock position, agree an order/collection plan and define a clear weekly recovery target.",
        owner:
          "Sales Manager + Distributor",
        follow:
          "Review orders, stock and outstanding every week."
      },

      stock: {
        root:
          "Stock problems usually come from inaccurate demand planning, delayed ordering, poor distributor stock management or supply constraints.",
        action:
          "Identify affected SKUs and outlets, calculate required stock and create an immediate replenishment plan.",
        owner:
          "Sales Manager + Distributor / Supply Team",
        follow:
          "Check stock availability daily until the risk is removed."
      },

      team: {
        root:
          "Underperformance should be diagnosed before assuming lack of effort. Check capability, activity, territory opportunity and execution discipline.",
        action:
          "Conduct a one-to-one coaching conversation, agree on measurable actions and provide field coaching where needed.",
        owner:
          "Sales Manager + Sales Representative",
        follow:
          "Review agreed KPI within 3–7 days."
      },

      collection: {
        root:
          "Collection risk can come from weak credit discipline, delayed customer payment, slow stock movement or unclear payment follow-up.",
        action:
          "Prioritize overdue accounts, confirm payment commitments and create a collection schedule linked to responsible owners.",
        owner:
          "Sales Manager + Distributor / Finance",
        follow:
          "Review outstanding and payment commitments weekly."
      }

    };


    const solution =
      solutions[currentProblem] ||
      solutions["target-gap"];


    if ($("rootCauseResult")) {
      $("rootCauseResult").textContent =
        solution.root;
    }

    if ($("immediateActionResult")) {
      $("immediateActionResult").textContent =
        solution.action;
    }

    if ($("ownerResult")) {
      $("ownerResult").textContent =
        solution.owner;
    }

    if ($("followUpResult")) {
      $("followUpResult").textContent =
        solution.follow;
    }


    if (evidence) {

      const current =
        $("rootCauseResult");

      if (current) {

        current.textContent +=
          " Evidence to validate: " +
          evidence;

      }

    }


    showToast(
      "Problem analysis completed"
    );

  }


  /* =======================================================
     AI SALES COACH
  ======================================================= */

  function setupAICoach() {

    const send =
      $("aiCoachSendBtn");

    if (send) {

      send.addEventListener(
        "click",
        sendAIQuestion
      );

    }


    const input =
      $("aiCoachInput");

    if (input) {

      input.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Enter" &&
            !event.shiftKey
          ) {

            event.preventDefault();

            sendAIQuestion();

          }

        }
      );

    }


    $all("[data-ai-question]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const question =
              button.dataset.aiQuestion;

            if ($("aiCoachInput")) {
              $("aiCoachInput").value =
                question;
            }

            sendAIQuestion();

          }
        );

      }
    );

  }


  function sendAIQuestion() {

    const input =
      $("aiCoachInput");

    if (!input) return;

    const question =
      input.value.trim();

    if (!question) {

      showToast(
        "Please enter a question"
      );

      return;
    }


    addAIMessage(
      question,
      "user"
    );

    input.value = "";


    setTimeout(
      function () {

        const answer =
          generateCoachAnswer(question);

        addAIMessage(
          answer,
          "ai"
        );

      },
      400
    );

  }


  function addAIMessage(text, type) {

    const chat =
      $("aiChat");

    if (!chat) return;


    if (type === "user") {

      const div =
        document.createElement("div");

      div.className =
        "user-message";

      div.innerHTML = `
        <div class="user-message-content">
          ${escapeHTML(text)}
        </div>
      `;

      chat.appendChild(div);

    } else {

      const div =
        document.createElement("div");

      div.className =
        "ai-message";

      div.innerHTML = `
        <div class="ai-message-avatar">🤖</div>

        <div class="ai-message-content">
          <strong>AI Sales Coach</strong>
          <p>${escapeHTML(text)}</p>
        </div>
      `;

      chat.appendChild(div);

    }


    chat.scrollTop =
      chat.scrollHeight;

  }


  function generateCoachAnswer(question) {

    const q =
      question.toLowerCase();


    if (
      q.includes("target") ||
      q.includes("gap") ||
      q.includes("achievement")
    ) {

      return (
        "Start with diagnosis rather than immediately pushing the team. " +
        "Break the target gap by territory, customer and Sales Rep. " +
        "Identify the biggest contributor, create a 7-day recovery plan, " +
        "assign owners and review daily achievement."
      );

    }


    if (
      q.includes("underperform") ||
      q.includes("team") ||
      q.includes("sales representative")
    ) {

      return (
        "Use coaching before pressure. Review the person's KPI, activity, " +
        "territory opportunity and capability. Ask what is blocking performance, " +
        "agree on specific actions and set a short follow-up period. " +
        "The goal is accountability with support, not micromanagement."
      );

    }


    if (
      q.includes("distributor") ||
      q.includes("outstanding")
    ) {

      return (
        "Review four areas: order volume, stock, outstanding and credit limit. " +
        "Separate the problem into commercial and financial causes. " +
        "Agree a concrete order and collection plan with the distributor, " +
        "assign an owner and review it weekly."
      );

    }


    if (
      q.includes("territory") ||
      q.includes("market")
    ) {

      return (
        "Compare territory sales, target, active outlets and productivity. " +
        "Find where sales are declining and why. Focus field time on the " +
        "highest-value recovery opportunities and set measurable outlet or sales targets."
      );

    }


    if (
      q.includes("forecast") ||
      q.includes("run rate")
    ) {

      return (
        "Calculate current run rate from achievement divided by days passed, " +
        "then project it across the full month. If the forecast is below target, " +
        "calculate the required daily recovery and identify exactly where the recovery will come from."
      );

    }


    return (
      "As a Sales Manager, structure the issue around three questions: " +
      "What is the actual number? Why is the gap happening? What specific action " +
      "will change the number? Then assign an owner, deadline and KPI for follow-up."
    );

  }


  /* =======================================================
     SALES ACADEMY
  ======================================================= */

  function setupAcademy() {

    const lessons = {

      target: {
        title: "Sales Target Management",
        subtitle: "From target to field execution",
        content: `
          <h3>Convert Business Target into Field Execution</h3>

          <p>
            A Sales Manager should not simply communicate the monthly target.
            The target must be converted into clear weekly, daily, territory
            and individual actions.
          </p>

          <div class="lesson-points">

            <div>
              <strong>1. Understand the Target</strong>
              <span>Know exactly what the business needs to achieve.</span>
            </div>

            <div>
              <strong>2. Break the Target</strong>
              <span>Break the number by territory, customer and Sales Rep.</span>
            </div>

            <div>
              <strong>3. Track Daily</strong>
              <span>Use daily achievement and run rate to identify gaps early.</span>
            </div>

            <div>
              <strong>4. Correct Quickly</strong>
              <span>Take action before the monthly gap becomes difficult to recover.</span>
            </div>

          </div>
        `
      },

      leadership: {
        title: "Team Leadership",
        subtitle: "Coach and empower your sales team",
        content: `
          <h3>Lead Through Coaching and Accountability</h3>

          <p>
            Effective sales leadership combines clear expectations,
            coaching, regular review and ownership.
          </p>

          <div class="lesson-points">

            <div>
              <strong>Clear Expectations</strong>
              <span>Every team member should understand the expected result.</span>
            </div>

            <div>
              <strong>Regular Coaching</strong>
              <span>Use performance data to guide development.</span>
            </div>

            <div>
              <strong>Empowerment</strong>
              <span>Allow team members to own their territory and actions.</span>
            </div>

            <div>
              <strong>Accountability</strong>
              <span>Follow up consistently on agreed actions and KPIs.</span>
            </div>

          </div>
        `
      },

      distributor: {
        title: "Distributor Management",
        subtitle: "Manage stock, sales and credit",
        content: `
          <h3>Manage Distributor Health</h3>

          <p>
            Distributor management requires balancing sales growth,
            stock availability, financial discipline and relationship quality.
          </p>

          <div class="lesson-points">

            <div>
              <strong>Stock</strong>
              <span>Prevent stock-out and excessive inventory.</span>
            </div>

            <div>
              <strong>Sales</strong>
              <span>Track order volume and market movement.</span>
            </div>

            <div>
              <strong>Outstanding</strong>
              <span>Monitor overdue payments and credit exposure.</span>
            </div>

            <div>
              <strong>Relationship</strong>
              <span>Build a partnership based on clear commercial expectations.</span>
            </div>

          </div>
        `
      },

      territory: {
        title: "Territory Management",
        subtitle: "Maximize market potential",
        content: `
          <h3>Build Territory Growth</h3>

          <p>
            Territory management is about understanding the market potential,
            outlet universe, active outlets, sales productivity and competition.
          </p>

          <div class="lesson-points">

            <div>
              <strong>Outlet Universe</strong>
              <span>Know the total potential market.</span>
            </div>

            <div>
              <strong>Coverage</strong>
              <span>Increase the number of productive active outlets.</span>
            </div>

            <div>
              <strong>Productivity</strong>
              <span>Improve sales per active outlet.</span>
            </div>

            <div>
              <strong>Growth</strong>
              <span>Focus on sustainable territory growth.</span>
            </div>

          </div>
        `
      },

      forecast: {
        title: "Sales Forecasting",
        subtitle: "Predict month-end performance",
        content: `
          <h3>Use Run Rate to Forecast</h3>

          <p>
            A Sales Manager should identify the likely month-end result
            before the month finishes.
          </p>

          <div class="lesson-points">

            <div>
              <strong>Achievement</strong>
              <span>Know the current sales result.</span>
            </div>

            <div>
              <strong>Days Passed</strong>
              <span>Measure how much of the month has elapsed.</span>
            </div>

            <div>
              <strong>Run Rate</strong>
              <span>Achievement divided by days passed.</span>
            </div>

            <div>
              <strong>Forecast</strong>
              <span>Run rate multiplied by total month days.</span>
            </div>

          </div>
        `
      },

      problem: {
        title: "Problem Solving",
        subtitle: "Root cause and action planning",
        content: `
          <h3>Move from Problem to Action</h3>

          <p>
            Professional managers do not stop at identifying the problem.
            They identify the root cause and create measurable corrective actions.
          </p>

          <div class="lesson-points">

            <div>
              <strong>Problem</strong>
              <span>Define exactly what is happening.</span>
            </div>

            <div>
              <strong>Root Cause</strong>
              <span>Find the underlying reason.</span>
            </div>

            <div>
              <strong>Action</strong>
              <span>Define what will change.</span>
            </div>

            <div>
              <strong>Follow-up</strong>
              <span>Measure whether the action solved the issue.</span>
            </div>

          </div>
        `
      }

    };


    $all("[data-academy]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const lesson =
              lessons[
                button.dataset.academy
              ];

            if (!lesson) return;

            if ($("academyLessonTitle")) {
              $("academyLessonTitle").textContent =
                lesson.title;
            }

            if ($("academyLessonSubtitle")) {
              $("academyLessonSubtitle").textContent =
                lesson.subtitle;
            }

            if ($("academyLessonContent")) {
              $("academyLessonContent").innerHTML =
                lesson.content;
            }

          }
        );

      }
    );

  }


  /* =======================================================
     SETTINGS
  ======================================================= */

  function setupSettings() {

    const profile =
      getData(
        STORAGE.profile,
        {
          name: "Aung Zar Ni Win",
          position: "Sales Manager",
          company: ""
        }
      );


    if ($("settingsName")) {
      $("settingsName").value =
        profile.name || "";
    }

    if ($("settingsPosition")) {
      $("settingsPosition").value =
        profile.position || "";
    }

    if ($("settingsCompany")) {
      $("settingsCompany").value =
        profile.company || "";
    }


    const save =
      $("saveSettingsBtn");

    if (save) {

      save.addEventListener(
        "click",
        function () {

          const updated = {

            name:
              $("settingsName")?.value ||
              "Aung Zar Ni Win",

            position:
              $("settingsPosition")?.value ||
              "Sales Manager",

            company:
              $("settingsCompany")?.value ||
              ""

          };


          saveData(
            STORAGE.profile,
            updated
          );

          updateProfileDisplay();

          showToast(
            "Profile settings saved"
          );

        }
      );

    }


    const reset =
      $("resetDataBtn");

    if (reset) {

      reset.addEventListener(
        "click",
        resetApplicationData
      );

    }

  }


  function updateProfileDisplay() {

    const profile =
      getData(
        STORAGE.profile,
        {
          name: "Aung Zar Ni Win",
          position: "Sales Manager"
        }
      );


    const name =
      profile.name ||
      "Aung Zar Ni Win";

    const position =
      profile.position ||
      "Sales Manager";


    $all(".profile-info strong").forEach(
      el => {
        el.textContent = name;
      }
    );

    $all(".profile-info span").forEach(
      el => {
        el.textContent = position;
      }
    );

    $all(".top-profile-text strong").forEach(
      el => {
        el.textContent = name;
      }
    );

    $all(".top-profile-text span").forEach(
      el => {
        el.textContent = position;
      }
    );

  }


  function resetApplicationData() {

    const confirmed =
      confirm(
        "Reset all Aung Sales Manager data?"
      );

    if (!confirmed) return;


    Object.values(STORAGE).forEach(
      key =>
        localStorage.removeItem(key)
    );


    location.reload();

  }


  /* =======================================================
     PROFILE BUTTON
  ======================================================= */

  function setupProfileButton() {

    const button =
      $("profileBtn");

    if (!button) return;

    button.addEventListener(
      "click",
      function () {

        openPage("settings");

      }
    );

  }


  /* =======================================================
     NOTIFICATION
  ======================================================= */

  function setupNotification() {

    const button =
      $("notificationBtn");

    if (!button) return;

    button.addEventListener(
      "click",
      function () {

        const target =
          getData(STORAGE.target, 0);

        const achievement =
          getData(
            STORAGE.achievement,
            0
          );

        if (!target) {

          showToast(
            "Set your monthly sales target first."
          );

          return;

        }


        const achievementPercent =
          achievement / target * 100;


        if (achievementPercent < 60) {

          showToast(
            "⚠️ Sales achievement needs immediate attention."
          );

        } else if (
          achievementPercent < 80
        ) {

          showToast(
            "📊 Monitor the target gap closely."
          );

        } else {

          showToast(
            "✅ Sales performance is on track."
          );

        }

      }
    );

  }


  /* =======================================================
     GLOBAL SEARCH
  ======================================================= */

  function setupSearch() {

    const input =
      $("globalSearch");

    if (!input) return;


    input.addEventListener(
      "keydown",
      function (event) {

        if (event.key !== "Enter") {
          return;
        }

        const query =
          input.value.trim().toLowerCase();

        if (!query) return;


        const matches =
          Object.entries(PAGE_NAMES)
            .filter(
              ([key, name]) =>
                name.toLowerCase()
                  .includes(query)
            );


        if (matches.length) {

          openPage(
            matches[0][0]
          );

          input.value = "";

          showToast(
            "Opened " +
            matches[0][1]
          );

        } else {

          showToast(
            "No matching module found"
          );

        }

      }
    );

  }


  /* =======================================================
     KEYBOARD SHORTCUTS
  ======================================================= */

  function setupKeyboardShortcuts() {

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.ctrlKey &&
          event.key.toLowerCase() === "k"
        ) {

          event.preventDefault();

          const search =
            $("globalSearch");

          if (search) {
            search.focus();
          }

        }

      }
    );

  }


  /* =======================================================
     PAGE REFRESH
  ======================================================= */

  function refreshPage(pageName) {

    switch (pageName) {

      case "dashboard":
        updateDashboard();
        break;

      case "sales-target":
        loadSalesTarget();
        break;

      case "team-kpi":
        renderTeamKPI();
        break;

      case "distributor":
        renderDistributors();
        break;

      case "territory":
        renderTerritories();
        break;

      case "reports":
        renderReport("daily");
        break;

      case "daily-manager":
        updateDailyCompletion();
        break;

      default:
        break;

    }

  }


  /* =======================================================
     HASH ROUTING
  ======================================================= */

  function loadHashPage() {

    const hash =
      location.hash.replace("#", "");

    if (
      hash &&
      PAGE_NAMES[hash]
    ) {

      openPage(hash);

    } else {

      openPage("dashboard");

    }

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  function init() {

    setupNavigation();

    setupMobileMenu();

    updateDate();

    setupDailyManager();

    setupTeamKPI();

    setupDistributor();

    setupTerritory();

    setupForecast();

    setupManagerTools();

    setupReports();

    setupProblemSolver();

    setupAICoach();

    setupAcademy();

    setupSettings();

    setupProfileButton();

    setupNotification();

    setupSearch();

    setupKeyboardShortcuts();

    updateProfileDisplay();

    loadSalesTarget();

    updateDashboard();

    loadHashPage();

  }


  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.AungSalesManager = {

    openPage,

    updateDashboard,

    calculateSalesTarget,

    calculateForecast,

    showToast,

    resetApplicationData

  };


  /* =======================================================
     START
  ======================================================= */

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

})();
