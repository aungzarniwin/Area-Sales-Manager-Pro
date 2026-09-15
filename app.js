/* =========================================================
   AUNG SALES MANAGER PRO
   Version 1.0
   Professional Sales Manager Operating App
========================================================= */

const state = {
  currentPage: "dashboard",
  target: 50000000,
  actual: 38500000,
  team: [
    {
      name: "Aung Min",
      territory: "Yangon North",
      target: 5000000,
      actual: 4600000
    },
    {
      name: "Ko Ko",
      territory: "Yangon South",
      target: 5000000,
      actual: 3100000
    },
    {
      name: "Min Thu",
      territory: "Mandalay",
      target: 5000000,
      actual: 1800000
    },
    {
      name: "Htet Aung",
      territory: "Bago",
      target: 5000000,
      actual: 4200000
    }
  ],
  customers: [
    {
      name: "ABC Trading",
      type: "Key Account",
      sales: 8500000,
      ar: 1200000,
      status: "Active"
    },
    {
      name: "Golden Distribution",
      type: "Distributor",
      sales: 7200000,
      ar: 900000,
      status: "Active"
    },
    {
      name: "City Mart Partner",
      type: "Modern Trade",
      sales: 5800000,
      ar: 2200000,
      status: "Watch"
    }
  ],
  tasks: [
    {
      title: "Review Team Performance",
      detail: "Check underperforming sales reps",
      icon: "👥",
      done: false
    },
    {
      title: "Key Customer Follow-up",
      detail: "Follow up ABC Trading order",
      icon: "🤝",
      done: false
    },
    {
      title: "Collection Follow-up",
      detail: "Review overdue accounts",
      icon: "💰",
      done: false
    },
    {
      title: "Tomorrow Territory Plan",
      detail: "Prepare tomorrow's field activities",
      icon: "🗺️",
      done: false
    }
  ]
};


/* =========================================================
   LESSON DATA
========================================================= */

const lessons = [

  {
    category: "Sales Leadership",
    title: "Sales Manager ရဲ့ အဓိကတာဝန်",
    description: "Sales Manager တစ်ယောက်အနေနဲ့ ဘာတွေကို အဓိကတာဝန်ယူရမလဲ။",
    content: `
      <h2>Sales Manager ရဲ့ အဓိကတာဝန်</h2>

      <p>
      Sales Manager ဆိုတာ Target ရောင်းပေးရုံသာမက
      လူ၊ နံပါတ်၊ Customer နဲ့ Execution အားလုံးကို
      စီမံခန့်ခွဲရတဲ့ Commercial Leader ဖြစ်ပါတယ်။
      </p>

      <h3>၁။ People</h3>
      <p>
      Sales Team ကို လမ်းညွှန်ခြင်း၊ Coaching ပေးခြင်း၊
      Performance Review ပြုလုပ်ခြင်းနဲ့ Accountability တည်ဆောက်ခြင်းတို့ကို
      Manager က တာဝန်ယူရပါတယ်။
      </p>

      <h3>၂။ Numbers</h3>
      <p>
      Target, Achievement, Growth, Distribution, AR,
      Margin စတဲ့ KPI တွေကို နေ့စဉ်နားလည်ရပါမယ်။
      </p>

      <h3>၃။ Execution</h3>
      <p>
      Strategy ကို Field Execution အဖြစ် ပြောင်းလဲနိုင်ရပါမယ်။
      Plan ရှိရုံနဲ့မပြီးဘဲ Team က အမှန်တကယ်လုပ်နေသလား
      ဆိုတာ Follow-up လုပ်ရပါတယ်။
      </p>

      <h3>လုပ်ငန်းခွင် Example</h3>
      <p>
      ဒီလ Target က 500 Lakh ဖြစ်ပြီး လက်ရှိ Sales က 385 Lakh ဆိုရင်
      Gap 115 Lakh ရှိပါတယ်။ Manager ရဲ့အလုပ်က
      “Sales မရဘူး” လို့ပြောတာမဟုတ်ဘဲ
      Gap ဘာကြောင့်ဖြစ်လာတယ်ဆိုတာ Diagnose လုပ်ပြီး
      Action Plan ချမှတ်တာဖြစ်ပါတယ်။
      </p>

      <h3>Manager Action</h3>
      <ul>
        <li>Daily Sales Review လုပ်ပါ။</li>
        <li>Underperformer တွေကို Diagnose လုပ်ပါ။</li>
        <li>Key Customer တွေကို ကိုယ်တိုင် Follow-up လုပ်ပါ။</li>
        <li>Target Gap အတွက် Recovery Plan ချပါ။</li>
      </ul>
    `
  },

  {
    category: "Target Management",
    title: "Target Gap ကို ပြန်ယူနည်း",
    description: "Target မပြည့်တဲ့အချိန် Recovery Plan ဘယ်လိုချမလဲ။",
    content: `
      <h2>Target Gap Recovery</h2>

      <p>
      Target မပြည့်တဲ့အခါ Team ကို ဖိအားပေးရုံနဲ့
      Sustainable Result မရနိုင်ပါဘူး။
      ပထမဆုံး Gap ကို Number အဖြစ် ရှင်းလင်းရပါမယ်။
      </p>

      <h3>Step 1 — Gap တွက်ပါ</h3>
      <p>
      Target - Actual = Gap
      </p>

      <h3>Step 2 — Gap ကို ခွဲပါ</h3>
      <p>
      Customer, Product, Territory, Sales Rep,
      Distribution နဲ့ Stock အလိုက် ခွဲကြည့်ပါ။
      </p>

      <h3>Step 3 — Recovery Opportunity ရှာပါ</h3>
      <ul>
        <li>Existing Key Customers</li>
        <li>Pending Orders</li>
        <li>New Customers</li>
        <li>Underdeveloped Territories</li>
        <li>High Potential Accounts</li>
      </ul>

      <h3>Step 4 — Daily Action</h3>
      <p>
      ကျန်တဲ့ရက်အရေအတွက်နဲ့ Gap ကို ခွဲပြီး
      Daily Recovery Target သတ်မှတ်ပါ။
      </p>
    `
  },

  {
    category: "People Management",
    title: "Underperforming Sales Rep ကို Manage လုပ်နည်း",
    description: "Performance ကျနေတဲ့ Sales Rep ကို အပြစ်မတင်ဘဲ ဖြေရှင်းနည်း။",
    content: `
      <h2>Underperformer Management</h2>

      <p>
      Performance ကျနေတဲ့ Sales Rep ကို ချက်ချင်းအပြစ်တင်မယ့်အစား
      Problem ရဲ့ Root Cause ကို ရှာရပါမယ်။
      </p>

      <h3>Diagnose Framework</h3>

      <p><strong>Skill Problem</strong> — မတတ်သေးတာလား?</p>
      <p><strong>Will Problem</strong> — Motivation မရှိတာလား?</p>
      <p><strong>Territory Problem</strong> — နယ်မြေ Potential နည်းတာလား?</p>
      <p><strong>Customer Problem</strong> — Customer Base မကောင်းတာလား?</p>
      <p><strong>Execution Problem</strong> — Activity မလုံလောက်တာလား?</p>

      <h3>Coaching Conversation</h3>
      <p>
      “ဘာကြောင့် Target မရတာလဲ” လို့ စတင်မေးမယ့်အစား
      “လက်ရှိ Result ကိုကြည့်ရင် ဘယ်နေရာမှာ အခက်အခဲရှိနေတယ်လို့ထင်လဲ”
      လို့ မေးပြီး Sales Rep ကို ကိုယ်တိုင် Problem ဖော်ထုတ်စေပါ။
      </p>
    `
  },

  {
    category: "Forecasting",
    title: "Sales Forecast မှန်ကန်အောင်လုပ်နည်း",
    description: "Month-end Result ကို ကြိုတင်ခန့်မှန်းပြီး အချိန်မီ Action ယူနည်း။",
    content: `
      <h2>Sales Forecasting</h2>

      <p>
      Forecast က Management ကို နောက်ဆုံး Result ကို
      ကြိုတင်သိစေတဲ့ Management Tool ဖြစ်ပါတယ်။
      </p>

      <h3>အဓိက Data</h3>
      <ul>
        <li>Current Actual</li>
        <li>Daily Run Rate</li>
        <li>Remaining Days</li>
        <li>Pending Orders</li>
        <li>Historical Sales</li>
      </ul>

      <h3>Manager Rule</h3>
      <p>
      Forecast က Target ပြည့်မပြည့်ကို ခန့်မှန်းဖို့သာမက
      Result မကောင်းနိုင်တဲ့အချိန်ကို ကြိုတင်သိပြီး
      Action ပြောင်းနိုင်ဖို့ အသုံးပြုရပါတယ်။
      </p>
    `
  },

  {
    category: "Negotiation",
    title: "Customer Price Negotiation",
    description: "Customer က Discount တောင်းတဲ့အခါ Margin မပျက်အောင် ညှိနှိုင်းနည်း။",
    content: `
      <h2>Price Negotiation</h2>

      <p>
      Customer က Price လျှော့ခိုင်းတိုင်း Price ကို လျှော့ပေးတာဟာ
      Professional Negotiation မဟုတ်ပါဘူး။
      </p>

      <h3>Give & Get Principle</h3>
      <p>
      Discount ပေးမယ်ဆိုရင် တစ်ဖက်မှာ Order Volume,
      Payment Term, Product Mix သို့မဟုတ် Commitment တစ်ခုကို
      ပြန်ရယူပါ။
      </p>

      <h3>မေးသင့်တဲ့မေးခွန်း</h3>
      <p>
      “Price ပိုင်းက အဓိက Concern ဖြစ်တာလား၊
      ဒါမှမဟုတ် Total Value ပိုင်းမှာ ဘာလိုအပ်ချက်ရှိလဲ?”
      </p>

      <p>
      ဒီလိုမေးခြင်းအားဖြင့် Customer ရဲ့ True Need ကို
      သိနိုင်ပြီး Discount ပေးခြင်းတစ်ခုတည်းနဲ့
      Problem ဖြေရှင်းရတဲ့အခြေအနေကို ရှောင်နိုင်ပါတယ်။
      </p>
    `
  },

  {
    category: "Key Account",
    title: "Key Account Management",
    description: "အရေးကြီး Customer တွေကို ရေရှည်တိုးတက်အောင် Manage လုပ်နည်း။",
    content: `
      <h2>Key Account Management</h2>

      <p>
      Key Account ဆိုတာ Sales ပမာဏကြီးတဲ့ Customer တစ်ခုတည်းမဟုတ်ပါဘူး။
      Future Potential, Strategic Importance နဲ့ Relationship Value
      ပါ ထည့်သွင်းစဉ်းစားရပါတယ်။
      </p>

      <h3>Account Plan</h3>
      <ul>
        <li>Current Sales</li>
        <li>Growth Potential</li>
        <li>Customer Objective</li>
        <li>Competitor Position</li>
        <li>Decision Makers</li>
        <li>Next Business Opportunity</li>
      </ul>
    `
  },

  {
    category: "Distributor Management",
    title: "Distributor Health Check",
    description: "Distributor က ကျန်းမာတဲ့ Business Partner ဟုတ်မဟုတ် စစ်ဆေးနည်း။",
    content: `
      <h2>Distributor Management</h2>

      <p>
      Distributor Sales တက်နေတာတစ်ခုတည်းနဲ့ Distributor
      Healthy ဖြစ်တယ်လို့ မဆိုနိုင်ပါဘူး။
      </p>

      <h3>စစ်ဆေးရမယ့်အချက်များ</h3>
      <ul>
        <li>Stock Level</li>
        <li>Secondary Sales</li>
        <li>Coverage</li>
        <li>AR</li>
        <li>Collection</li>
        <li>Sales Team Productivity</li>
        <li>Outlet Growth</li>
      </ul>
    `
  },

  {
    category: "AR Management",
    title: "Outstanding & Collection Management",
    description: "AR တက်မလာအောင် Collection ကို စနစ်တကျ Manage လုပ်နည်း။",
    content: `
      <h2>AR & Collection</h2>

      <p>
      Sales Manager ရဲ့ Result ကို Sales ပမာဏတစ်ခုတည်းနဲ့
      မတိုင်းတာသင့်ပါဘူး။ Cash Collection ကလည်း
      Business Health အတွက် အရေးကြီးပါတယ်။
      </p>

      <h3>Aging Review</h3>
      <ul>
        <li>Current</li>
        <li>1–30 Days</li>
        <li>31–60 Days</li>
        <li>61–90 Days</li>
        <li>90+ Days</li>
      </ul>

      <p>
      90+ Days Outstanding ဖြစ်လာတဲ့ Account တွေကို
      Priority Action အဖြစ် သတ်မှတ်ပြီး
      Customer Commitment နဲ့ Collection Date ကို
      ရှင်းလင်းစွာ သတ်မှတ်သင့်ပါတယ်။
      </p>
    `
  },

  {
    category: "Leadership",
    title: "Manager တစ်ယောက်လို Lead လုပ်နည်း",
    description: "Micromanagement မလုပ်ဘဲ Team ကို Result ရအောင် ဦးဆောင်နည်း။",
    content: `
      <h2>Sales Leadership</h2>

      <p>
      Professional Manager က Team Member တစ်ယောက်ချင်းစီရဲ့
      အလုပ်ကို အချိန်တိုင်း လိုက်ကြည့်နေသူမဟုတ်ပါဘူး။
      Clear Expectation, Accountability နဲ့ Coaching System
      တည်ဆောက်သူဖြစ်ပါတယ်။
      </p>

      <h3>Manager Formula</h3>

      <p>
      Clear Direction → Resources → Coaching → Review → Accountability
      </p>

      <p>
      Team ကို ဘာလုပ်ရမလဲသာ မပြောဘဲ
      ဘာကြောင့်လုပ်ရမလဲ၊ ဘယ်လို Result ကိုမျှော်လင့်လဲ
      ဆိုတာပါ ရှင်းပြရပါမယ်။
      </p>
    `
  },

  {
    category: "Business Review",
    title: "Monthly Business Review",
    description: "တစ်လစာ Business Result ကို Professional ပြန်လည်သုံးသပ်နည်း။",
    content: `
      <h2>Monthly Business Review</h2>

      <h3>Review Structure</h3>

      <ol>
        <li>Target vs Actual</li>
        <li>Growth vs Previous Period</li>
        <li>Top Customers</li>
        <li>Underperforming Areas</li>
        <li>Team Performance</li>
        <li>AR & Collection</li>
        <li>Market & Competition</li>
        <li>Next Month Action Plan</li>
      </ol>

      <p>
      Review ရဲ့ ရည်ရွယ်ချက်က အတိတ်ကို အပြစ်တင်ဖို့မဟုတ်ဘဲ
      နောက်လ Result ကို ပိုကောင်းအောင် Decision ချဖို့ဖြစ်ပါတယ်။
      </p>
    `
  }

];


/* =========================================================
   PAGE TITLES
========================================================= */

const pageTitles = {
  dashboard: "Command Center",
  daily: "Daily Manager",
  targets: "Target & Forecast",
  team: "Team Performance",
  kpi: "KPI Center",
  territory: "Territory Management",
  customers: "Customer Management",
  distributor: "Distributor Management",
  ar: "AR & Collection",
  problems: "Sales Problem Solver",
  coach: "AI Sales Coach",
  tools: "Sales Tools",
  academy: "Manager Academy",
  reports: "Business Reports",
  settings: "Settings"
};


/* =========================================================
   HELPERS
========================================================= */

function money(value) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function lakh(value) {
  return (value / 100000).toFixed(1) + " L";
}

function percent(actual, target) {
  if (!target) return 0;
  return ((actual / target) * 100).toFixed(1);
}

function getAchievementClass(value) {
  if (value >= 90) return "badge-green";
  if (value >= 70) return "badge-orange";
  return "badge-red";
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function openModal(html) {
  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("modalOverlay").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

  const achievement = Number(percent(state.actual, state.target));
  const gap = state.target - state.actual;

  return `

    <div class="hero">

      <div>
        <h3>Sales Manager Command Center</h3>

        <p>
          Your everyday management system for
          Target, Team, Customer, KPI, Collection and
          Sales Execution.
        </p>
      </div>

      <button class="hero-action" onclick="navigate('daily')">
        Start Today's Plan →
      </button>

    </div>


    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-top">
          <span class="stat-label">Monthly Target</span>
          <span class="stat-icon">🎯</span>
        </div>

        <div class="stat-value">${lakh(state.target)}</div>

        <div class="stat-change">
          Current month target
        </div>
      </div>


      <div class="stat-card">
        <div class="stat-top">
          <span class="stat-label">Actual Sales</span>
          <span class="stat-icon">💰</span>
        </div>

        <div class="stat-value">${lakh(state.actual)}</div>

        <div class="stat-change up">
          ${achievement}% achievement
        </div>
      </div>


      <div class="stat-card">
        <div class="stat-top">
          <span class="stat-label">Target Gap</span>
          <span class="stat-icon">⚠️</span>
        </div>

        <div class="stat-value">${lakh(gap)}</div>

        <div class="stat-change warning">
          Recovery required
        </div>
      </div>


      <div class="stat-card">
        <div class="stat-top">
          <span class="stat-label">Team Members</span>
          <span class="stat-icon">👥</span>
        </div>

        <div class="stat-value">${state.team.length}</div>

        <div class="stat-change">
          Active sales team
        </div>
      </div>

    </div>


    <div class="two-column">

      <div>

        <div class="card">

          <div class="card-header">
            <h3>🎯 Monthly Target Progress</h3>
            <span>${achievement}%</span>
          </div>

          <div class="progress-wrap">

            <div class="progress-info">
              <span>${lakh(state.actual)} Actual</span>
              <strong>${lakh(state.target)} Target</strong>
            </div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width:${Math.min(achievement,100)}%">
              </div>
            </div>

          </div>

        </div>


        <div class="card">

          <div class="card-header">
            <h3>👥 Team Performance</h3>
            <button class="btn btn-light"
              onclick="navigate('team')">
              View All
            </button>
          </div>

          <div class="table-wrap">

            <table>

              <thead>
                <tr>
                  <th>Sales Rep</th>
                  <th>Territory</th>
                  <th>Achievement</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                ${state.team.map(member => {

                  const ach = Number(percent(member.actual, member.target));

                  return `
                    <tr>
                      <td><strong>${member.name}</strong></td>
                      <td>${member.territory}</td>
                      <td>${ach}%</td>
                      <td>
                        <span class="badge ${getAchievementClass(ach)}">
                          ${ach >= 90 ? "On Track" : ach >= 70 ? "Watch" : "Critical"}
                        </span>
                      </td>
                    </tr>
                  `;

                }).join("")}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      <div>

        <div class="card">

          <div class="card-header">
            <h3>🚨 Manager Action Center</h3>
            <span>Today</span>
          </div>

          <div class="action-list">

            ${state.tasks.map((task, index) => `

              <div class="action-item">

                <div class="action-icon">${task.icon}</div>

                <div style="flex:1">

                  <strong>${task.title}</strong>

                  <small>${task.detail}</small>

                </div>

                <button
                  class="btn btn-light"
                  onclick="completeTask(${index})">
                  ${task.done ? "✓ Done" : "Open"}
                </button>

              </div>

            `).join("")}

          </div>

        </div>


        <div class="coach-box">

          <h2>🤖 AI Sales Coach</h2>

          <p>
            Sales မရတာ၊ Team Performance ကျတာ၊
            Customer Problem, Target Gap စတဲ့
            လုပ်ငန်းခွင်ပြဿနာတွေကို Manager Framework နဲ့
            ဖြေရှင်းပါ။
          </p>

          <button
            class="hero-action"
            onclick="navigate('coach')">
            Ask Sales Coach →
          </button>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   DAILY MANAGER
========================================================= */

function renderDaily() {

  return `

    <div class="page-heading">
      <h1>📅 Daily Manager</h1>
      <p>
        Sales Manager တစ်ယောက်ရဲ့ မနက်ပိုင်း Plan ကနေ
        ညပိုင်း Review အထိ တစ်နေ့တာကို စနစ်တကျ စီမံပါ။
      </p>
    </div>


    <div class="two-column">

      <div class="card">

        <div class="card-header">
          <h3>🌅 Morning Plan</h3>
          <span>Start your day</span>
        </div>

        <div class="action-list">

          <div class="action-item">
            <div class="action-icon">🎯</div>
            <div style="flex:1">
              <strong>Today's Sales Target</strong>
              <small>Daily target သတ်မှတ်ပါ</small>
            </div>
            <button class="btn btn-primary"
              onclick="showToast('Daily target planning opened')">
              Plan
            </button>
          </div>

          <div class="action-item">
            <div class="action-icon">👥</div>
            <div style="flex:1">
              <strong>Team Briefing</strong>
              <small>Team ကို Priority တွေရှင်းပြပါ</small>
            </div>
            <button class="btn btn-primary"
              onclick="showToast('Team briefing checklist opened')">
              Open
            </button>
          </div>

          <div class="action-item">
            <div class="action-icon">🤝</div>
            <div style="flex:1">
              <strong>Customer Visit Plan</strong>
              <small>Priority customer visits</small>
            </div>
            <button class="btn btn-primary"
              onclick="showToast('Customer visit planner opened')">
              Plan
            </button>
          </div>

          <div class="action-item">
            <div class="action-icon">💰</div>
            <div style="flex:1">
              <strong>Collection Follow-up</strong>
              <small>Overdue accounts review</small>
            </div>
            <button class="btn btn-primary"
              onclick="navigate('ar')">
              Review
            </button>
          </div>

        </div>

      </div>


      <div class="card">

        <div class="card-header">
          <h3>🌙 Evening Review</h3>
          <span>Close your day</span>
        </div>

        <div class="form-group">
          <label>Today's Sales</label>
          <input id="dailySalesInput" type="number" placeholder="Enter sales amount">
        </div>

        <div class="form-group">
          <label>Visits Completed</label>
          <input id="visitsInput" type="number" placeholder="Number of visits">
        </div>

        <div class="form-group">
          <label>Today's Key Issue</label>
          <textarea id="dailyIssueInput"
            placeholder="What was the biggest issue today?"></textarea>
        </div>

        <button class="btn btn-primary"
          onclick="saveDailyReview()">
          Save Daily Review
        </button>

      </div>

    </div>

  `;
}


/* =========================================================
   TARGET
========================================================= */

function renderTargets() {

  const achievement = Number(percent(state.actual, state.target));
  const gap = state.target - state.actual;

  return `

    <div class="page-heading">
      <h1>🎯 Target & Forecast</h1>
      <p>
        Target ကို Number တစ်ခုအဖြစ်မထားဘဲ
        Daily Execution အဖြစ်ပြောင်းလဲပါ။
      </p>
    </div>


    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-label">Target</div>
        <div class="stat-value">${lakh(state.target)}</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Actual</div>
        <div class="stat-value">${lakh(state.actual)}</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Achievement</div>
        <div class="stat-value">${achievement}%</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Gap</div>
        <div class="stat-value">${lakh(gap)}</div>
      </div>

    </div>


    <div class="two-column">

      <div class="card">

        <div class="card-header">
          <h3>Target Calculator</h3>
        </div>

        <div class="form-group">
          <label>Monthly Target</label>
          <input id="targetInput" type="number"
            value="${state.target}">
        </div>

        <div class="form-group">
          <label>Current Actual</label>
          <input id="actualInput" type="number"
            value="${state.actual}">
        </div>

        <button class="btn btn-primary"
          onclick="calculateTarget()">
          Calculate
        </button>

        <div id="targetResult"></div>

      </div>


      <div class="card">

        <div class="card-header">
          <h3>Forecast</h3>
        </div>

        <div class="form-group">
          <label>Current Sales</label>
          <input id="forecastSales" type="number"
            value="${state.actual}">
        </div>

        <div class="form-group">
          <label>Days Completed</label>
          <input id="daysCompleted" type="number" value="15">
        </div>

        <div class="form-group">
          <label>Total Days</label>
          <input id="totalDays" type="number" value="30">
        </div>

        <button class="btn btn-primary"
          onclick="calculateForecast()">
          Forecast Result
        </button>

        <div id="forecastResult"></div>

      </div>

    </div>

  `;
}


/* =========================================================
   TEAM
========================================================= */

function renderTeam() {

  return `

    <div class="page-heading">
      <h1>👥 Team Performance</h1>
      <p>
        People → Performance → Coaching → Accountability
      </p>
    </div>


    <div class="card">

      <div class="card-header">
        <h3>Sales Team</h3>

        <button class="btn btn-primary"
          onclick="showToast('Add team member feature ready')">
          + Add Member
        </button>
      </div>

      <div class="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Sales Rep</th>
              <th>Territory</th>
              <th>Target</th>
              <th>Actual</th>
              <th>Achievement</th>
              <th>Manager Action</th>
            </tr>
          </thead>

          <tbody>

            ${state.team.map((member, index) => {

              const ach = Number(percent(member.actual, member.target));

              return `
                <tr>

                  <td><strong>${member.name}</strong></td>

                  <td>${member.territory}</td>

                  <td>${lakh(member.target)}</td>

                  <td>${lakh(member.actual)}</td>

                  <td>
                    <span class="badge ${getAchievementClass(ach)}">
                      ${ach}%
                    </span>
                  </td>

                  <td>
                    <button
                      class="btn btn-light"
                      onclick="coachMember(${index})">
                      Coach
                    </button>
                  </td>

                </tr>
              `;

            }).join("")}

          </tbody>

        </table>

      </div>

    </div>

  `;
}


/* =========================================================
   KPI
========================================================= */

function renderKPI() {

  const achievement = Number(percent(state.actual, state.target));

  return `

    <div class="page-heading">
      <h1>📊 KPI Center</h1>
      <p>
        Sales Manager တစ်ယောက်အတွက် အရေးကြီးတဲ့
        Commercial KPI တွေကို တစ်နေရာတည်းမှာ ကြည့်ပါ။
      </p>
    </div>


    <div class="tool-grid">

      ${[
        ["🎯", "Sales Achievement", achievement + "%"],
        ["📈", "Growth", "12.5%"],
        ["📦", "Distribution", "78%"],
        ["☎️", "Strike Rate", "64%"],
        ["👥", "Call Productivity", "8.4"],
        ["🤝", "New Customers", "24"],
        ["💰", "Collection", "91%"],
        ["💵", "AR Days", "32 Days"]
      ].map(kpi => `

        <div class="tool-card">

          <div class="tool-icon">${kpi[0]}</div>

          <h3>${kpi[1]}</h3>

          <div class="stat-value">${kpi[2]}</div>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================================================
   TERRITORY
========================================================= */

function renderTerritory() {

  const territories = [
    ["Yangon North", "120", "85", "92%", "Strong"],
    ["Yangon South", "98", "64", "71%", "Watch"],
    ["Mandalay", "85", "58", "66%", "Critical"],
    ["Bago", "72", "61", "84%", "Strong"]
  ];

  return `

    <div class="page-heading">
      <h1>🗺️ Territory Management</h1>
      <p>
        ဘယ် Territory က Growth Potential ရှိလဲ၊
        ဘယ်နေရာမှာ Execution Problem ရှိလဲ သိနိုင်အောင် စီမံပါ။
      </p>
    </div>


    <div class="card">

      <div class="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Territory</th>
              <th>Customers</th>
              <th>Active</th>
              <th>Achievement</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            ${territories.map(t => `

              <tr>
                <td><strong>${t[0]}</strong></td>
                <td>${t[1]}</td>
                <td>${t[2]}</td>
                <td>${t[3]}</td>
                <td>
                  <span class="badge ${
                    t[4] === "Strong"
                      ? "badge-green"
                      : t[4] === "Watch"
                      ? "badge-orange"
                      : "badge-red"
                  }">
                    ${t[4]}
                  </span>
                </td>
              </tr>

            `).join("")}

          </tbody>

        </table>

      </div>

    </div>

  `;
}


/* =========================================================
   CUSTOMERS
========================================================= */

function renderCustomers() {

  return `

    <div class="page-heading">
      <h1>🤝 Customer Management</h1>
      <p>
        Customer တစ်ယောက်ချင်းစီရဲ့ Sales, AR,
        Opportunity နဲ့ Next Action ကို Manage လုပ်ပါ။
      </p>
    </div>


    <div class="card">

      <div class="card-header">

        <h3>Customer Portfolio</h3>

        <button class="btn btn-primary"
          onclick="showToast('Customer form opened')">
          + Add Customer
        </button>

      </div>


      <div class="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Sales</th>
              <th>AR</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            ${state.customers.map((customer, index) => `

              <tr>

                <td><strong>${customer.name}</strong></td>

                <td>${customer.type}</td>

                <td>${lakh(customer.sales)}</td>

                <td>${lakh(customer.ar)}</td>

                <td>
                  <span class="badge ${
                    customer.status === "Active"
                    ? "badge-green"
                    : "badge-orange"
                  }">
                    ${customer.status}
                  </span>
                </td>

                <td>
                  <button class="btn btn-light"
                    onclick="customerPlan(${index})">
                    Account Plan
                  </button>
                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      </div>

    </div>

  `;
}


/* =========================================================
   DISTRIBUTOR
========================================================= */

function renderDistributor() {

  return `

    <div class="page-heading">
      <h1>🏢 Distributor Management</h1>
      <p>
        Distributor ရဲ့ Sales, Stock, Coverage,
        AR နဲ့ Team Productivity ကို Manage လုပ်ပါ။
      </p>
    </div>


    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-label">Primary Sales</div>
        <div class="stat-value">185 L</div>
        <div class="stat-change up">+8.2%</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Secondary Sales</div>
        <div class="stat-value">171 L</div>
        <div class="stat-change up">+6.4%</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Stock</div>
        <div class="stat-value">42 L</div>
        <div class="stat-change">Healthy</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Coverage</div>
        <div class="stat-value">78%</div>
        <div class="stat-change warning">Improve</div>
      </div>

    </div>


    <div class="card">

      <div class="card-header">
        <h3>Distributor Health Check</h3>
      </div>

      <div class="action-list">

        <div class="action-item">
          <div class="action-icon">📦</div>
          <div style="flex:1">
            <strong>Inventory</strong>
            <small>Stock days and slow-moving items</small>
          </div>
          <span class="badge badge-green">Healthy</span>
        </div>

        <div class="action-item">
          <div class="action-icon">💰</div>
          <div style="flex:1">
            <strong>AR</strong>
            <small>Outstanding and aging</small>
          </div>
          <span class="badge badge-orange">Watch</span>
        </div>

        <div class="action-item">
          <div class="action-icon">👥</div>
          <div style="flex:1">
            <strong>Sales Team</strong>
            <small>Productivity and coverage</small>
          </div>
          <span class="badge badge-green">Healthy</span>
        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   AR
========================================================= */

function renderAR() {

  return `

    <div class="page-heading">
      <h1>💰 AR & Collection</h1>
      <p>
        Sales တက်တာနဲ့အတူ Cash Flow ကိုပါ ထိန်းချုပ်ပါ။
      </p>
    </div>


    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-label">Total AR</div>
        <div class="stat-value">43 L</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Current</div>
        <div class="stat-value">25 L</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Overdue</div>
        <div class="stat-value">18 L</div>
        <div class="stat-change danger">Action required</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Collection</div>
        <div class="stat-value">91%</div>
      </div>

    </div>


    <div class="card">

      <div class="card-header">
        <h3>Collection Priority</h3>
      </div>

      <div class="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Customer</th>
              <th>Outstanding</th>
              <th>Age</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td><strong>City Mart Partner</strong></td>
              <td>22 L</td>
              <td>61 Days</td>
              <td><span class="badge badge-red">Critical</span></td>
              <td>
                <button class="btn btn-light"
                  onclick="showToast('Collection action started')">
                  Follow-up
                </button>
              </td>
            </tr>

            <tr>
              <td><strong>ABC Trading</strong></td>
              <td>12 L</td>
              <td>32 Days</td>
              <td><span class="badge badge-orange">Watch</span></td>
              <td>
                <button class="btn btn-light"
                  onclick="showToast('Collection action started')">
                  Follow-up
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  `;
}


/* =========================================================
   PROBLEM SOLVER
========================================================= */

function renderProblems() {

  return `

    <div class="page-heading">
      <h1>🧠 Sales Problem Solver</h1>
      <p>
        Problem ကို Complaint အဖြစ်မထားဘဲ
        Root Cause → Action Plan အဖြစ် ပြောင်းပါ။
      </p>
    </div>


    <div class="tool-grid">

      ${[
        ["📉", "Sales Target မရ", "Target Gap Recovery Plan"],
        ["👥", "Team Performance ကျ", "Performance Diagnosis"],
        ["🏢", "Distributor Problem", "Distributor Health Check"],
        ["💰", "AR တက်လာ", "Collection Recovery"],
        ["📦", "Stock Problem", "Inventory Action"],
        ["🤝", "Customer Complaint", "Customer Recovery"],
        ["⚔️", "Competition တက်", "Competitive Response"],
        ["🎯", "Territory Weak", "Territory Recovery"]
      ].map(item => `

        <div class="tool-card">

          <div class="tool-icon">${item[0]}</div>

          <h3>${item[1]}</h3>

          <p>${item[2]}</p>

          <br>

          <button class="btn btn-primary"
            onclick="solveProblem('${item[1]}')">
            Solve →
          </button>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================================================
   AI COACH
========================================================= */

function renderCoach() {

  return `

    <div class="page-heading">
      <h1>🤖 AI Sales Coach</h1>
      <p>
        Manager တစ်ယောက်ရဲ့ လုပ်ငန်းခွင် Problem ကို
        Sales Management Framework နဲ့ စဉ်းစားပါ။
      </p>
    </div>


    <div class="coach-box">

      <h2>Ask Your Sales Coach</h2>

      <p>
        ဥပမာ — “ဒီလ Target 70% ပဲရသေးတယ်။
        ကျန်တဲ့ 10 ရက်မှာ ဘယ်လိုပြန်ယူရမလဲ?”
      </p>

      <div class="coach-input">

        <input
          id="coachQuestion"
          placeholder="သင့် Sales Problem ကို ရေးပါ...">

        <button onclick="askCoach()">
          Ask
        </button>

      </div>

    </div>


    <div id="coachResponse" class="card" style="margin-top:18px;display:none">
    </div>

  `;
}


/* =========================================================
   SALES TOOLS
========================================================= */

function renderTools() {

  const tools = [
    ["💰", "Profit Calculator", "Revenue - Cost = Profit"],
    ["📊", "Margin Calculator", "Gross Margin %"],
    ["🎯", "Achievement Calculator", "Actual vs Target"],
    ["📈", "Growth Calculator", "Growth %"],
    ["🔄", "Break-even", "Break-even Point"],
    ["💵", "ROI Calculator", "Return on Investment"],
    ["🏷️", "Discount Calculator", "Discount impact"],
    ["🏆", "Commission", "Sales commission"]
  ];

  return `

    <div class="page-heading">
      <h1>🧮 Sales Tools</h1>
      <p>
        Sales Manager တစ်ယောက် နေ့စဉ်သုံးနိုင်တဲ့
        Commercial Calculators။
      </p>
    </div>


    <div class="tool-grid">

      ${tools.map((tool, index) => `

        <div class="tool-card">

          <div class="tool-icon">${tool[0]}</div>

          <h3>${tool[1]}</h3>

          <p>${tool[2]}</p>

          <br>

          <button
            class="btn btn-primary"
            onclick="openCalculator(${index})">
            Open Tool →
          </button>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================================================
   CALCULATORS
========================================================= */

function openCalculator(index) {

  const calculators = [

    {
      title: "Profit Calculator",
      fields: `
        <div class="form-group">
          <label>Revenue</label>
          <input id="calcRevenue" type="number">
        </div>

        <div class="form-group">
          <label>Total Cost</label>
          <input id="calcCost" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcProfit()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Margin Calculator",
      fields: `
        <div class="form-group">
          <label>Sales Revenue</label>
          <input id="marginRevenue" type="number">
        </div>

        <div class="form-group">
          <label>Cost</label>
          <input id="marginCost" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcMargin()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Achievement Calculator",
      fields: `
        <div class="form-group">
          <label>Target</label>
          <input id="achTarget" type="number">
        </div>

        <div class="form-group">
          <label>Actual</label>
          <input id="achActual" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcAchievement()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Growth Calculator",
      fields: `
        <div class="form-group">
          <label>Previous Sales</label>
          <input id="growthPrevious" type="number">
        </div>

        <div class="form-group">
          <label>Current Sales</label>
          <input id="growthCurrent" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcGrowth()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Break-even Calculator",
      fields: `
        <div class="form-group">
          <label>Fixed Cost</label>
          <input id="fixedCost" type="number">
        </div>

        <div class="form-group">
          <label>Price per Unit</label>
          <input id="unitPrice" type="number">
        </div>

        <div class="form-group">
          <label>Variable Cost per Unit</label>
          <input id="variableCost" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcBreakEven()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "ROI Calculator",
      fields: `
        <div class="form-group">
          <label>Investment</label>
          <input id="investment" type="number">
        </div>

        <div class="form-group">
          <label>Return</label>
          <input id="returnValue" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcROI()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Discount Calculator",
      fields: `
        <div class="form-group">
          <label>Original Price</label>
          <input id="originalPrice" type="number">
        </div>

        <div class="form-group">
          <label>Discount %</label>
          <input id="discountPercent" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcDiscount()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    },

    {
      title: "Commission Calculator",
      fields: `
        <div class="form-group">
          <label>Sales</label>
          <input id="commissionSales" type="number">
        </div>

        <div class="form-group">
          <label>Commission %</label>
          <input id="commissionPercent" type="number">
        </div>

        <button class="btn btn-primary"
          onclick="calcCommission()">
          Calculate
        </button>

        <div id="calcResult"></div>
      `
    }

  ];

  const calc = calculators[index];

  openModal(`
    <h2>${calc.title}</h2>
    <br>
    ${calc.fields}
  `);
}


function result(value, label) {

  return `
    <div class="result-box">
      <div class="result-label">${label}</div>
      <div class="result-value">${value}</div>
    </div>
  `;

}


function calcProfit() {

  const revenue = Number(document.getElementById("calcRevenue").value);
  const cost = Number(document.getElementById("calcCost").value);

  document.getElementById("calcResult").innerHTML =
    result(money(revenue - cost), "Profit");

}


function calcMargin() {

  const revenue = Number(document.getElementById("marginRevenue").value);
  const cost = Number(document.getElementById("marginCost").value);

  if (!revenue) return;

  const margin = ((revenue - cost) / revenue) * 100;

  document.getElementById("calcResult").innerHTML =
    result(margin.toFixed(2) + "%", "Gross Margin");

}


function calcAchievement() {

  const target = Number(document.getElementById("achTarget").value);
  const actual = Number(document.getElementById("achActual").value);

  if (!target) return;

  const ach = (actual / target) * 100;

  document.getElementById("calcResult").innerHTML =
    result(ach.toFixed(2) + "%", "Achievement");

}


function calcGrowth() {

  const previous = Number(document.getElementById("growthPrevious").value);
  const current = Number(document.getElementById("growthCurrent").value);

  if (!previous) return;

  const growth = ((current - previous) / previous) * 100;

  document.getElementById("calcResult").innerHTML =
    result(growth.toFixed(2) + "%", "Growth");

}


function calcBreakEven() {

  const fixed = Number(document.getElementById("fixedCost").value);
  const price = Number(document.getElementById("unitPrice").value);
  const variable = Number(document.getElementById("variableCost").value);

  const contribution = price - variable;

  if (contribution <= 0) {
    document.getElementById("calcResult").innerHTML =
      result("Invalid", "Contribution Margin");
    return;
  }

  const units = fixed / contribution;

  document.getElementById("calcResult").innerHTML =
    result(units.toFixed(1) + " units", "Break-even Quantity");

}


function calcROI() {

  const investment = Number(document.getElementById("investment").value);
  const returns = Number(document.getElementById("returnValue").value);

  if (!investment) return;

  const roi = ((returns - investment) / investment) * 100;

  document.getElementById("calcResult").innerHTML =
    result(roi.toFixed(2) + "%", "ROI");

}


function calcDiscount() {

  const price = Number(document.getElementById("originalPrice").value);
  const discount = Number(document.getElementById("discountPercent").value);

  const saving = price * discount / 100;
  const finalPrice = price - saving;

  document.getElementById("calcResult").innerHTML =
    result(money(finalPrice), "Final Price");

}


function calcCommission() {

  const sales = Number(document.getElementById("commissionSales").value);
  const rate = Number(document.getElementById("commissionPercent").value);

  const commission = sales * rate / 100;

  document.getElementById("calcResult").innerHTML =
    result(money(commission), "Commission");

}


/* =========================================================
   ACADEMY
========================================================= */

function renderAcademy() {

  return `

    <div class="page-heading">
      <h1>📚 Manager Academy</h1>
      <p>
        Sales Manager တစ်ယောက်အနေနဲ့
        လုပ်ငန်းခွင်မှာ တကယ်အသုံးချနိုင်မယ့် Management Skills။
      </p>
    </div>


    <div class="lesson-grid">

      ${lessons.map((lesson, index) => `

        <div class="lesson-card">

          <div class="lesson-number">
            LESSON ${String(index + 1).padStart(2, "0")}
            · ${lesson.category}
          </div>

          <h3>${lesson.title}</h3>

          <p>${lesson.description}</p>

          <button
            class="btn btn-primary"
            onclick="openLesson(${index})">
            Learn Lesson →
          </button>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================================================
   REPORTS
========================================================= */

function renderReports() {

  return `

    <div class="page-heading">
      <h1>📑 Business Reports</h1>
      <p>
        Management ကို တင်ပြဖို့လိုတဲ့
        Sales Report နဲ့ Business Review Structure။
      </p>
    </div>


    <div class="tool-grid">

      <div class="tool-card">
        <div class="tool-icon">📅</div>
        <h3>Daily Sales Report</h3>
        <p>Today's Target, Actual, Gap and Issues</p>
        <br>
        <button class="btn btn-primary"
          onclick="generateReport('Daily Sales Report')">
          Generate
        </button>
      </div>

      <div class="tool-card">
        <div class="tool-icon">📊</div>
        <h3>Weekly Sales Review</h3>
        <p>Weekly performance and action plan</p>
        <br>
        <button class="btn btn-primary"
          onclick="generateReport('Weekly Sales Review')">
          Generate
        </button>
      </div>

      <div class="tool-card">
        <div class="tool-icon">📈</div>
        <h3>Monthly Business Review</h3>
        <p>Commercial performance and next steps</p>
        <br>
        <button class="btn btn-primary"
          onclick="generateReport('Monthly Business Review')">
          Generate
        </button>
      </div>

      <div class="tool-card">
        <div class="tool-icon">🎯</div>
        <h3>Action Plan</h3>
        <p>Problem, owner, deadline and action</p>
        <br>
        <button class="btn btn-primary"
          onclick="generateReport('Action Plan')">
          Generate
        </button>
      </div>

    </div>


    <div class="card">

      <div class="card-header">
        <h3>Sample Management Summary</h3>
      </div>

      <p style="font-size:12px;line-height:1.9">

        <strong>Current Sales:</strong>
        ${lakh(state.actual)}
        <br>

        <strong>Target:</strong>
        ${lakh(state.target)}
        <br>

        <strong>Achievement:</strong>
        ${percent(state.actual,state.target)}%
        <br>

        <strong>Key Issue:</strong>
        Target Gap Recovery Required
        <br>

        <strong>Management Action:</strong>
        Focus on Key Accounts, Underperforming Territories,
        Pending Orders and Collection.

      </p>

    </div>

  `;
}


/* =========================================================
   SETTINGS
========================================================= */

function renderSettings() {

  return `

    <div class="page-heading">
      <h1>⚙️ Settings</h1>
      <p>App configuration and manager profile.</p>
    </div>


    <div class="two-column">

      <div class="card">

        <div class="card-header">
          <h3>Manager Profile</h3>
        </div>

        <div class="form-group">
          <label>Name</label>
          <input value="Aung Zar Ni Win">
        </div>

        <div class="form-group">
          <label>Position</label>
          <input value="Sales Manager">
        </div>

        <div class="form-group">
          <label>Company</label>
          <input placeholder="Your Company">
        </div>

        <button class="btn btn-primary"
          onclick="showToast('Profile saved successfully')">
          Save Profile
        </button>

      </div>


      <div class="card">

        <div class="card-header">
          <h3>App Information</h3>
        </div>

        <p style="font-size:11px;line-height:2;color:#64748b">

          <strong>Aung Sales Manager Pro</strong><br>
          Version 1.0<br>
          Professional Sales Management System<br>
          Target • Team • KPI • Customer • AR • AI Coach

        </p>

      </div>

    </div>

  `;
}


/* =========================================================
   ROUTER
========================================================= */

function renderPage(page) {

  const content = document.getElementById("appContent");

  state.currentPage = page;

  document.getElementById("pageTitle").textContent =
    pageTitles[page] || "Command Center";

  const renderers = {
    dashboard: renderDashboard,
    daily: renderDaily,
    targets: renderTargets,
    team: renderTeam,
    kpi: renderKPI,
    territory: renderTerritory,
    customers: renderCustomers,
    distributor: renderDistributor,
    ar: renderAR,
    problems: renderProblems,
    coach: renderCoach,
    tools: renderTools,
    academy: renderAcademy,
    reports: renderReports,
    settings: renderSettings
  };

  content.innerHTML =
    renderers[page]
      ? renderers[page]()
      : renderDashboard();

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.page === page
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

  renderPage(page);

  document.getElementById("sidebar")
    .classList.remove("open");

}


/* =========================================================
   TASK
========================================================= */

function completeTask(index) {

  state.tasks[index].done = !state.tasks[index].done;

  renderPage(state.currentPage);

  showToast(
    state.tasks[index].done
      ? "Task completed"
      : "Task reopened"
  );

}


/* =========================================================
   DAILY REVIEW
========================================================= */

function saveDailyReview() {

  const sales =
    document.getElementById("dailySalesInput").value;

  const visits =
    document.getElementById("visitsInput").value;

  if (!sales) {

    showToast("Please enter today's sales");

    return;

  }

  localStorage.setItem(
    "asm_daily_review",
    JSON.stringify({
      date: new Date().toISOString(),
      sales,
      visits,
      issue:
        document.getElementById("dailyIssueInput").value
    })
  );

  showToast("Daily review saved successfully");

}


/* =========================================================
   TARGET
========================================================= */

function calculateTarget() {

  const target =
    Number(document.getElementById("targetInput").value);

  const actual =
    Number(document.getElementById("actualInput").value);

  if (!target) return;

  state.target = target;
  state.actual = actual;

  const achievement = actual / target * 100;
  const gap = target - actual;

  document.getElementById("targetResult").innerHTML = `

    <div class="result-box">

      <div class="result-label">Achievement</div>

      <div class="result-value">
        ${achievement.toFixed(1)}%
      </div>

      <p style="font-size:10px;margin-top:8px">
        Target Gap: ${money(gap)}
      </p>

    </div>

  `;

}


function calculateForecast() {

  const sales =
    Number(document.getElementById("forecastSales").value);

  const completed =
    Number(document.getElementById("daysCompleted").value);

  const total =
    Number(document.getElementById("totalDays").value);

  if (!completed || !total) return;

  const runRate = sales / completed;

  const forecast = runRate * total;

  const achievement =
    forecast / state.target * 100;

  document.getElementById("forecastResult").innerHTML = `

    <div class="result-box">

      <div class="result-label">Forecast Sales</div>

      <div class="result-value">
        ${lakh(forecast)}
      </div>

      <p style="font-size:10px;margin-top:8px">
        Expected Achievement:
        ${achievement.toFixed(1)}%
      </p>

    </div>

  `;

}


/* =========================================================
   TEAM COACHING
========================================================= */

function coachMember(index) {

  const member = state.team[index];

  const ach =
    Number(percent(member.actual, member.target));

  openModal(`

    <h2>👥 Coaching Plan</h2>

    <br>

    <h3>${member.name}</h3>

    <p style="font-size:11px;color:#64748b;margin-top:5px">
      ${member.territory}
    </p>

    <br>

    <div class="result-box">

      <div class="result-label">
        Current Achievement
      </div>

      <div class="result-value">
        ${ach}%
      </div>

    </div>

    <br>

    <h3>Manager Coaching Steps</h3>

    <ol style="font-size:11px;line-height:2;margin-top:10px;padding-left:20px">

      <li>Review Activity Level</li>
      <li>Check Customer Coverage</li>
      <li>Identify Skill / Will Problem</li>
      <li>Agree Recovery Action</li>
      <li>Set Follow-up Date</li>

    </ol>

  `);

}


/* =========================================================
   CUSTOMER PLAN
========================================================= */

function customerPlan(index) {

  const customer = state.customers[index];

  openModal(`

    <h2>🤝 Account Plan</h2>

    <br>

    <h3>${customer.name}</h3>

    <p style="font-size:11px;color:#64748b">
      ${customer.type}
    </p>

    <br>

    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-label">Sales</div>
        <div class="stat-value">
          ${lakh(customer.sales)}
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">AR</div>
        <div class="stat-value">
          ${lakh(customer.ar)}
        </div>
      </div>

    </div>

    <div class="form-group">
      <label>Customer Objective</label>
      <textarea placeholder="What does this customer need?"></textarea>
    </div>

    <div class="form-group">
      <label>Next Action</label>
      <textarea placeholder="Next action and deadline"></textarea>
    </div>

    <button class="btn btn-primary"
      onclick="showToast('Account plan saved');closeModal()">
      Save Account Plan
    </button>

  `);

}


/* =========================================================
   PROBLEM SOLVER
========================================================= */

function solveProblem(problem) {

  let response = "";

  if (problem.includes("Target")) {

    response = `
      <h2>🎯 Target Recovery Plan</h2>

      <p style="font-size:11px;line-height:1.8">
        Target Gap ကို အရင်တွက်ပြီး
        ကျန်တဲ့ရက်အလိုက် Daily Recovery Target သတ်မှတ်ပါ။
      </p>

      <br>

      <strong>Priority 1:</strong>
      Pending Orders

      <br><br>

      <strong>Priority 2:</strong>
      Key Customers

      <br><br>

      <strong>Priority 3:</strong>
      High Potential Territories

      <br><br>

      <strong>Priority 4:</strong>
      Underperforming Sales Reps

    `;

  } else if (problem.includes("Team")) {

    response = `
      <h2>👥 Team Performance Diagnosis</h2>

      <p style="font-size:11px;line-height:1.8">
        Performance ကျရင် Skill, Will, Territory,
        Customer နဲ့ Execution ကို အရင်စစ်ပါ။
      </p>

      <br>

      <strong>Don't Blame → Diagnose → Coach → Follow-up</strong>
    `;

  } else {

    response = `
      <h2>🧠 Manager Problem Solving Framework</h2>

      <p style="font-size:11px;line-height:1.8">
        Problem ကို Define လုပ်ပါ။
        Root Cause ရှာပါ။
        Options ထုတ်ပါ။
        Action သတ်မှတ်ပါ။
        Owner နဲ့ Deadline ထားပါ။
        နောက်ဆုံး Follow-up လုပ်ပါ။
      </p>
    `;

  }

  openModal(response);

}


/* =========================================================
   AI COACH
========================================================= */

function askCoach() {

  const input =
    document.getElementById("coachQuestion");

  const question =
    input.value.trim();

  if (!question) {

    showToast("Please enter your sales problem");

    return;

  }

  let response = "";

  if (
    question.includes("Target") ||
    question.includes("target") ||
    question.includes("Sales") ||
    question.includes("sales")
  ) {

    response = `

      <h2>🎯 Sales Recovery Recommendation</h2>

      <p style="font-size:11px;line-height:1.9">

        <strong>1. Diagnose</strong><br>
        လက်ရှိ Actual နဲ့ Target Gap ကို အရင်တွက်ပါ။

        <br><br>

        <strong>2. Break Down</strong><br>
        Gap ကို Customer, Territory, Product နဲ့
        Sales Rep အလိုက် ခွဲပါ။

        <br><br>

        <strong>3. Prioritize</strong><br>
        အမြန်ဆုံး Order ပြန်ရနိုင်မယ့်
        Key Customers နဲ့ Pending Orders ကို
        ပထမဦးဆုံး Focus လုပ်ပါ။

        <br><br>

        <strong>4. Daily Execution</strong><br>
        Gap ကို ကျန်တဲ့ရက်အလိုက် Daily Recovery Target
        အဖြစ် ပြောင်းပါ။

        <br><br>

        <strong>5. Review</strong><br>
        ညတိုင်း Target vs Actual ပြန်စစ်ပြီး
        မရတဲ့နေရာကို နောက်နေ့ Plan ပြောင်းပါ။

      </p>

    `;

  } else if (
    question.includes("Team") ||
    question.includes("team")
  ) {

    response = `

      <h2>👥 Team Performance Coaching</h2>

      <p style="font-size:11px;line-height:1.9">

        Team Performance ကျနေရင်
        လူကို အပြစ်တင်မယ့်အစား Root Cause ရှာပါ။

        <br><br>

        <strong>Skill?</strong>
        Sales Skill မလုံလောက်တာလား?

        <br><br>

        <strong>Will?</strong>
        Motivation နဲ့ Ownership ပြဿနာလား?

        <br><br>

        <strong>Territory?</strong>
        Territory Potential ပြဿနာလား?

        <br><br>

        <strong>Execution?</strong>
        Visit, Coverage, Follow-up မလုံလောက်တာလား?

        <br><br>

        ပြီးရင် Coaching Action တစ်ခု၊
        Deadline တစ်ခုနဲ့ Follow-up Date တစ်ခု
        သတ်မှတ်ပါ။

      </p>

    `;

  } else {

    response = `

      <h2>🧠 Manager Framework</h2>

      <p style="font-size:11px;line-height:1.9">

        သင့် Problem ကို

        <br><br>

        <strong>Problem → Root Cause → Options → Decision → Action → Review</strong>

        <br><br>

        ဆိုတဲ့ Framework နဲ့ ဖြေရှင်းကြည့်ပါ။

        <br><br>

        Professional Manager တစ်ယောက်ရဲ့
        အဓိကအလုပ်က Problem မရှိအောင်လုပ်တာမဟုတ်ဘဲ
        Problem ဖြစ်လာတဲ့အခါ မြန်မြန် Diagnose လုပ်ပြီး
        Result ရအောင် ဖြေရှင်းနိုင်တာဖြစ်ပါတယ်။

      </p>

    `;

  }

  const box =
    document.getElementById("coachResponse");

  box.style.display = "block";

  box.innerHTML = response;

}


/* =========================================================
   LESSON
========================================================= */

function openLesson(index) {

  const lesson = lessons[index];

  openModal(`

    <div class="lesson-number">
      ${lesson.category}
    </div>

    ${lesson.content}

    <br>

    <div class="result-box">

      <div class="result-label">
        Manager Action
      </div>

      <p style="font-size:11px;line-height:1.8;margin-top:7px">

        ဒီ Lesson ကို ဖတ်ပြီးနောက်
        လုပ်ငန်းခွင်မှာ တစ်ခုခုကို
        လက်တွေ့အသုံးချပါ။

      </p>

    </div>

  `);

}


/* =========================================================
   REPORT
========================================================= */

function generateReport(type) {

  openModal(`

    <h2>📑 ${type}</h2>

    <br>

    <div class="form-group">
      <label>Report Period</label>
      <input value="${new Date().toLocaleDateString()}">
    </div>

    <div class="form-group">
      <label>Key Result</label>
      <textarea placeholder="Enter key result"></textarea>
    </div>

    <div class="form-group">
      <label>Key Issues</label>
      <textarea placeholder="Enter key issues"></textarea>
    </div>

    <div class="form-group">
      <label>Next Action</label>
      <textarea placeholder="Enter next actions"></textarea>
    </div>

    <button class="btn btn-primary"
      onclick="showToast('Report prepared');closeModal()">
      Prepare Report
    </button>

  `);

}


/* =========================================================
   DATE
========================================================= */

function updateDate() {

  const now = new Date();

  document.getElementById("currentDate").textContent =
    now.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });

}


/* =========================================================
   EVENTS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  updateDate();

  renderPage("dashboard");


  document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

      navigate(button.dataset.page);

    });

  });


  document.getElementById("mobileMenu")
    .addEventListener("click", () => {

      document.getElementById("sidebar")
        .classList.toggle("open");

    });


  document.getElementById("modalClose")
    .addEventListener("click", closeModal);


  document.getElementById("modalOverlay")
    .addEventListener("click", event => {

      if (event.target.id === "modalOverlay") {
        closeModal();
      }

    });


  document.getElementById("notificationBtn")
    .addEventListener("click", () => {

      showToast(
        "You have 3 manager actions pending today."
      );

    });

});


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.navigate = navigate;
window.completeTask = completeTask;
window.calculateTarget = calculateTarget;
window.calculateForecast = calculateForecast;
window.coachMember = coachMember;
window.customerPlan = customerPlan;
window.solveProblem = solveProblem;
window.askCoach = askCoach;
window.openCalculator = openCalculator;
window.calcProfit = calcProfit;
window.calcMargin = calcMargin;
window.calcAchievement = calcAchievement;
window.calcGrowth = calcGrowth;
window.calcBreakEven = calcBreakEven;
window.calcROI = calcROI;
window.calcDiscount = calcDiscount;
window.calcCommission = calcCommission;
window.openLesson = openLesson;
window.generateReport = generateReport;
window.saveDailyReview = saveDailyReview;
window.closeModal = closeModal;
window.showToast = showToast;
