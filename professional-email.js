/* ============================================================
   AUNG SALES MANAGER PRO
   PROFESSIONAL EMAIL WRITER
   Version 1.0 Professional
   ============================================================ */

(() => {
  "use strict";

  const STORAGE_KEY = "aung_sales_manager_professional_emails_v1";

  const emailTypes = {
    salesReport: {
      name: "Sales Report",
      icon: "📊",
      instruction:
        "Create a complete professional sales report covering background, current performance, target, achievement, gap, business impact, actions taken, next actions and management recommendation."
    },

    salesPerformance: {
      name: "Sales Performance Update",
      icon: "📈",
      instruction:
        "Create a detailed professional sales performance update with current achievement, gap, key drivers, team execution, customer situation, actions and next steps."
    },

    targetGap: {
      name: "Target Achievement / Gap",
      icon: "🎯",
      instruction:
        "Create a professional email explaining target achievement, remaining gap, days remaining, required run rate, actions and recovery plan."
    },

    promotion: {
      name: "Promotion / Trade Promotion",
      icon: "🎁",
      instruction:
        "Create a detailed professional promotion email covering promotion objective, product, offer, eligibility, period, expected sales impact, execution plan, risks, controls and approval required."
    },

    priceDiscount: {
      name: "Price / Discount Proposal",
      icon: "💰",
      instruction:
        "Create a professional price or discount proposal explaining background, proposed price or discount, business reason, expected benefit, risk and approval required."
    },

    order: {
      name: "Order / Order Confirmation",
      icon: "🧾",
      instruction:
        "Create a professional order communication covering customer, products, quantities, delivery requirements, commercial details and next action."
    },

    stock: {
      name: "Stock / Availability",
      icon: "📦",
      instruction:
        "Create a professional stock availability email explaining current stock situation, affected products or customers, business impact and required action."
    },

    distributor: {
      name: "Distributor Communication",
      icon: "🏢",
      instruction:
        "Create a detailed distributor communication covering performance, stock, order, credit, collection, execution issues and required actions."
    },

    collection: {
      name: "Payment / Collection",
      icon: "💵",
      instruction:
        "Create a professional collection email covering outstanding amount, due date, customer situation, business impact and collection action."
    },

    customer: {
      name: "Customer Communication",
      icon: "🤝",
      instruction:
        "Create a professional customer communication that is clear, respectful, commercially appropriate and action oriented."
    },

    newCustomer: {
      name: "New Customer / Outlet Proposal",
      icon: "🏪",
      instruction:
        "Create a detailed business proposal for a new customer or outlet including opportunity, potential, products, expected sales and recommended next action."
    },

    followup: {
      name: "Follow-up",
      icon: "🔄",
      instruction:
        "Create a professional follow-up email referring to the previous discussion, current status, pending action, deadline and requested response."
    },

    request: {
      name: "Request",
      icon: "🙏",
      instruction:
        "Create a professional request email explaining background, reason, business need, requested support and expected outcome."
    },

    approval: {
      name: "Approval Request",
      icon: "✅",
      instruction:
        "Create a detailed approval request covering background, proposal, business justification, expected benefit, risks, controls and specific approval required."
    },

    situation: {
      name: "Situation / Issue",
      icon: "⚠️",
      instruction:
        "Create a professional situation update explaining what happened, current condition, business impact, action already taken and recommended next action."
    },

    escalation: {
      name: "Escalation",
      icon: "🚨",
      instruction:
        "Create a firm but professional escalation email explaining the issue, impact, previous actions, urgency and management support required."
    },

    feedback: {
      name: "Feedback",
      icon: "💬",
      instruction:
        "Create a constructive professional feedback email with observation, impact, positive points, improvement areas and agreed next steps."
    },

    meeting: {
      name: "Meeting Request",
      icon: "📅",
      instruction:
        "Create a professional meeting request explaining purpose, discussion topics, expected participants and proposed next action."
    },

    actionPlan: {
      name: "Action Plan",
      icon: "📝",
      instruction:
        "Create a detailed action plan email covering issue, actions, owner, deadline, expected result and follow-up mechanism."
    },

    recommendation: {
      name: "Recommendation",
      icon: "📌",
      instruction:
        "Create a professional recommendation email with situation, analysis, recommendation, business benefit, risk and proposed next steps."
    },

    reminder: {
      name: "Reminder",
      icon: "🔔",
      instruction:
        "Create a polite but clear professional reminder referring to the pending matter, expected action and deadline."
    },

    urgent: {
      name: "Urgent Action",
      icon: "⏰",
      instruction:
        "Create a professional urgent-action email explaining the issue, business impact, urgency and immediate action required."
    },

    team: {
      name: "Team Communication",
      icon: "👥",
      instruction:
        "Create a professional team communication that clearly explains objective, expectations, responsibilities, execution standards and follow-up."
    },

    teamTarget: {
      name: "Team Target",
      icon: "🎯",
      instruction:
        "Create a motivating but professional team target communication covering target, achievement, gap, daily requirement, priorities and expected ownership."
    },

    recognition: {
      name: "Performance Recognition",
      icon: "🏆",
      instruction:
        "Create a professional recognition email appreciating performance, specific achievement, business contribution and encouragement for continued performance."
    },

    coaching: {
      name: "Coaching / Training",
      icon: "📚",
      instruction:
        "Create a professional coaching or training communication covering observed behavior, development area, expectation, support and follow-up."
    },

    improvement: {
      name: "Performance Improvement",
      icon: "⚠️",
      instruction:
        "Create a firm but constructive performance improvement communication covering current gap, expected standard, required action and follow-up."
    },

    announcement: {
      name: "Announcement",
      icon: "📢",
      instruction:
        "Create a clear professional business announcement explaining what is changing, why it matters, effective date and required action."
    },

    partnership: {
      name: "Partnership / Business Proposal",
      icon: "🤝",
      instruction:
        "Create a professional partnership proposal covering opportunity, business value, proposed cooperation, commercial benefit and next steps."
    },

    general: {
      name: "General Business Email",
      icon: "📄",
      instruction:
        "Create a complete professional business email with clear background, current situation, key details, action required and closing."
    }
  };

  const tones = {
    professional: "Professional and balanced",
    formal: "Formal and corporate",
    polite: "Polite and respectful",
    firm: "Firm and action-oriented",
    executive: "Executive and concise",
    friendly: "Professional but friendly"
  };

  const details = {
    standard: "Standard professional detail",
    detailed: "Detailed business communication",
    executive: "Executive management style"
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getValue(id) {
    const el = $(id);
    return el ? String(el.value || "").trim() : "";
  }

  function selectedType() {
    return getValue("professionalEmailType") || "general";
  }

  function selectedTone() {
    return getValue("professionalEmailTone") || "professional";
  }

  function selectedDetail() {
    return getValue("professionalEmailDetail") || "detailed";
  }

  function selectedLanguage() {
    return getValue("professionalEmailLanguage") || "english";
  }

  function getTypeData() {
    return emailTypes[selectedType()] || emailTypes.general;
  }

  /*
   * IMPORTANT:
   * The user's short Myanmar notes are NOT shortened.
   * They are expanded into a complete business email.
   */

  function cleanInput(text) {
    return String(text || "")
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function splitNotes(text) {
    const cleaned = cleanInput(text);

    if (!cleaned) return [];

    return cleaned
      .split(/\n|။|၊|;/)
      .map(x => x.trim())
      .filter(Boolean);
  }

  function detectNumbers(text) {
    const numbers = text.match(
      /(?:\d+(?:\.\d+)?\s*(?:%|ကျပ်|သိန်း|လakh|L|case|cases|days?|ရက်|လ|months?))/gi
    );

    return numbers || [];
  }

  function buildMyanmarEmail() {
    const input = cleanInput(getValue("professionalEmailInput"));
    const type = getTypeData();
    const sender = getValue("professionalEmailSender");
    const recipient = getValue("professionalEmailRecipient");
    const company = getValue("professionalEmailCompany");

    const notes = splitNotes(input);
    const numbers = detectNumbers(input);

    const subject = generateMyanmarSubject(input, type);

    let body = "";

    body += "မင်္ဂလာပါခင်ဗျာ။\n\n";

    if (recipient) {
      body += `${recipient} ခင်ဗျာ၊\n\n`;
    }

    body += "အောက်ပါကိစ္စနှင့်ပတ်သက်၍ လက်ရှိအခြေအနေ၊ ဆောင်ရွက်ပြီးသည့်အချက်များနှင့် ဆက်လက်ဆောင်ရွက်မည့် Plan များကို အသိပေးတင်ပြလိုပါသည်။\n\n";

    body += "၁။ နောက်ခံအခြေအနေ\n";
    body += `${input}\n\n`;

    body += "၂။ လက်ရှိအခြေအနေ\n";

    if (notes.length) {
      notes.forEach((note, index) => {
        body += `${index + 1}. ${note}\n`;
      });
    } else {
      body += "လက်ရှိအခြေအနေမှာ အထက်ဖော်ပြပါအတိုင်း ဖြစ်ပါသည်။\n";
    }

    body += "\n၃။ အဓိကအချက်များ\n";

    if (numbers.length) {
      numbers.forEach((number, index) => {
        body += `${index + 1}. ${number}\n`;
      });
    } else {
      body += "• လက်ရှိလုပ်ငန်းအခြေအနေကို ဆက်လက်စောင့်ကြည့်ပြီး လိုအပ်သည့်လုပ်ဆောင်ချက်များကို ဆက်လက်အကောင်အထည်ဖော်မည်ဖြစ်ပါသည်။\n";
    }

    body += "\n၄။ လုပ်ဆောင်ပြီးသည့်အချက်များ\n";
    body += "• သက်ဆိုင်ရာ Team / Customer / Distributor များနှင့် ဆက်သွယ်ညှိနှိုင်းထားပါသည်။\n";
    body += "• လိုအပ်သည့် Follow-up နှင့် Field Execution များကို ဆက်လက်လုပ်ဆောင်နေပါသည်။\n";

    body += "\n၅။ ဆက်လက်ဆောင်ရွက်မည့်အချက်များ\n";
    body += "• လက်ရှိ Gap နှင့် Business Priority များအပေါ် အခြေခံ၍ Action Plan ကို ဆက်လက်အကောင်အထည်ဖော်မည်ဖြစ်ပါသည်။\n";
    body += "• Team နှင့် သက်ဆိုင်ရာ Stakeholders များကို Follow-up ပြုလုပ်ပြီး Result ကို ပြန်လည်တင်ပြမည်ဖြစ်ပါသည်။\n";

    body += "\n၆။ တောင်းခံလိုသည့် Support / Approval\n";
    body += "လုပ်ငန်းရလဒ်ကို အကောင်းဆုံးရရှိနိုင်ရန် လိုအပ်သည့် Support / Guidance / Approval များကို ပေးအပ်နိုင်ပါရန် တင်ပြအပ်ပါသည်။\n";

    body += "\n၇။ နိဂုံးချုပ်\n";
    body += "အထက်ဖော်ပြပါအတိုင်း လက်ရှိအခြေအနေကို စီမံခန့်ခွဲဆောင်ရွက်နေပြီး သတ်မှတ်ထားသော Business Objective ကို ရရှိနိုင်ရန် ဆက်လက်အာရုံစိုက်လုပ်ဆောင်သွားမည်ဖြစ်ပါသည်။\n\n";

    body += "ကျေးဇူးတင်ပါသည်။\n";

    if (sender) {
      body += `\n${sender}`;
    }

    if (company) {
      body += `\n${company}`;
    }

    return {
      subject,
      body
    };
  }

  function generateMyanmarSubject(input, type) {
    const lower = input.toLowerCase();

    if (type === emailTypes.promotion || lower.includes("promotion")) {
      return "Promotion အစီအစဉ်နှင့် Approval တင်ပြခြင်း";
    }

    if (type === emailTypes.targetGap || lower.includes("target")) {
      return "Sales Target Achievement နှင့် Gap အခြေအနေ တင်ပြခြင်း";
    }

    if (type === emailTypes.salesPerformance) {
      return "Sales Performance Update တင်ပြခြင်း";
    }

    if (type === emailTypes.collection) {
      return "Collection အခြေအနေ နှင့် Follow-up တင်ပြခြင်း";
    }

    if (type === emailTypes.distributor) {
      return "Distributor Business Update တင်ပြခြင်း";
    }

    if (type === emailTypes.approval) {
      return "Approval တောင်းခံခြင်း";
    }

    if (type === emailTypes.escalation) {
      return "Urgent Business Issue Escalation";
    }

    return `${type.name} - Business Communication`;
  }

  function generateSubject(input, type) {
    const lower = input.toLowerCase();

    if (type === emailTypes.promotion || lower.includes("promotion")) {
      return "Promotion Proposal and Approval Request";
    }

    if (type === emailTypes.targetGap || lower.includes("target")) {
      return "Sales Target Achievement and Gap Update";
    }

    if (type === emailTypes.salesPerformance) {
      return "Sales Performance Update";
    }

    if (type === emailTypes.collection) {
      return "Collection Status and Follow-up";
    }

    if (type === emailTypes.distributor) {
      return "Distributor Business Update";
    }

    if (type === emailTypes.approval) {
      return "Approval Request";
    }

    if (type === emailTypes.escalation) {
      return "Urgent Business Issue Escalation";
    }

    if (type === emailTypes.meeting) {
      return "Meeting Request";
    }

    if (type === emailTypes.teamTarget) {
      return "Team Sales Target and Execution Plan";
    }

    return type.name;
  }

  function buildEnglishEmail() {
    const input = cleanInput(getValue("professionalEmailInput"));
    const type = getTypeData();
    const sender = getValue("professionalEmailSender");
    const recipient = getValue("professionalEmailRecipient");
    const company = getValue("professionalEmailCompany");

    if (!input) {
      return {
        subject: "Professional Business Email",
        body:
          "Please enter the business situation or key points you would like to communicate."
      };
    }

    const notes = splitNotes(input);
    const numbers = detectNumbers(input);

    let body = "";

    body += "Dear ";

    if (recipient) {
      body += recipient;
    } else {
      body += "Sir / Madam";
    }

    body += ",\n\n";

    body += "I would like to provide an update regarding the following business matter.\n\n";

    body += "1. Background\n";
    body += `${input}\n\n`;

    body += "2. Current Situation\n";

    if (notes.length) {
      notes.forEach((note, index) => {
        body += `${index + 1}. ${capitalizeFirst(note)}.\n`;
      });
    } else {
      body += "The current situation is being closely monitored based on the information available.\n";
    }

    body += "\n3. Key Business Details\n";

    if (numbers.length) {
      numbers.forEach((number, index) => {
        body += `• Key figure ${index + 1}: ${number}\n`;
      });
    } else {
      body += "• The current business situation is being reviewed against the agreed objectives and execution priorities.\n";
      body += "• Relevant customers, team members and business stakeholders are being followed up accordingly.\n";
    }

    body += "\n4. Business Impact\n";
    body +=
      "The current situation may have an impact on business performance and achievement if not addressed in a timely manner. Therefore, close monitoring and focused execution are required.\n";

    body += "\n5. Actions Already Taken\n";
    body += "• The relevant team members / customers / distributors have been contacted and aligned.\n";
    body += "• Follow-up actions have been initiated based on the current business priority.\n";
    body += "• Field execution and progress are being monitored closely.\n";

    body += "\n6. Next Actions\n";
    body += "• Continue focused execution against the identified business priority.\n";
    body += "• Follow up with the responsible team members and stakeholders.\n";
    body += "• Review progress regularly and take corrective action where required.\n";

    body += "\n7. Recommendation / Support Required\n";
    body +=
      "I recommend maintaining close follow-up on this matter and providing the necessary support or guidance to ensure the expected business result is achieved.\n";

    body += "\n8. Closing\n";
    body +=
      "I will continue to monitor the situation closely and provide further updates based on the progress and final outcome.\n\n";

    body += "Thank you for your support and guidance.\n\n";

    if (sender) {
      body += `Best regards,\n${sender}`;
    } else {
      body += "Best regards,\nSales Manager";
    }

    if (company) {
      body += `\n${company}`;
    }

    return {
      subject: generateSubject(input, type),
      body
    };
  }

  function capitalizeFirst(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function renderOutput(result) {
    const output = $("professionalEmailOutput");

    if (!output) return;

    output.innerHTML = `
      <div class="email-result-card">
        <div class="email-result-header">
          <div>
            <span class="email-result-label">SUBJECT</span>
            <h3>${escapeHTML(result.subject)}</h3>
          </div>
          <button type="button" class="email-copy-subject" id="copyEmailSubjectBtn">
            Copy Subject
          </button>
        </div>

        <div class="email-result-divider"></div>

        <div class="email-result-body">
          ${escapeHTML(result.body).replace(/\n/g, "<br>")}
        </div>
      </div>
    `;

    const actions = $("professionalEmailActions");

    if (actions) {
      actions.style.display = "flex";
      actions.innerHTML = `
        <button type="button" class="btn-primary" id="copyProfessionalEmailBtn">
          📋 Copy Email
        </button>

        <button type="button" class="btn-secondary" id="rewriteProfessionalEmailBtn">
          🔄 Rewrite
        </button>

        <button type="button" class="btn-secondary" id="clearProfessionalEmailBtn">
          🗑 Clear
        </button>
      `;

      $("copyProfessionalEmailBtn")?.addEventListener(
        "click",
        copyEmail
      );

      $("copyEmailSubjectBtn")?.addEventListener(
        "click",
        copySubject
      );

      $("rewriteProfessionalEmailBtn")?.addEventListener(
        "click",
        writeProfessionalEmail
      );

      $("clearProfessionalEmailBtn")?.addEventListener(
        "click",
        clearEmailWriter
      );
    }
  }

  async function copyEmail() {
    const result = getCurrentResult();

    if (!result) return;

    const fullText =
      `Subject: ${result.subject}\n\n${result.body}`;

    try {
      await navigator.clipboard.writeText(fullText);
      showToast("Professional email copied successfully.");
    } catch (error) {
      fallbackCopy(fullText);
    }
  }

  async function copySubject() {
    const result = getCurrentResult();

    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.subject);
      showToast("Subject copied.");
    } catch (error) {
      fallbackCopy(result.subject);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      showToast("Copied successfully.");
    } catch (error) {
      showToast("Copy failed. Please copy manually.");
    }

    document.body.removeChild(textarea);
  }

  function getCurrentResult() {
    const output = $("professionalEmailOutput");

    if (!output) return null;

    const subjectElement = output.querySelector(
      ".email-result-header h3"
    );

    const bodyElement = output.querySelector(
      ".email-result-body"
    );

    if (!subjectElement || !bodyElement) return null;

    return {
      subject: subjectElement.textContent.trim(),
      body: bodyElement.innerText.trim()
    };
  }

  function writeProfessionalEmail() {
    const input = cleanInput(getValue("professionalEmailInput"));

    if (!input) {
      showToast("Please enter your situation or key points first.");
      $("professionalEmailInput")?.focus();
      return;
    }

    const language = selectedLanguage();

    const result =
      language === "myanmar"
        ? buildMyanmarEmail()
        : buildEnglishEmail();

    renderOutput(result);
    saveEmailHistory(result);
    showToast("Professional email created.");
  }

  function rewriteEmail() {
    writeProfessionalEmail();
  }

  function clearEmailWriter() {
    const input = $("professionalEmailInput");

    if (input) {
      input.value = "";
      input.focus();
    }

    const output = $("professionalEmailOutput");

    if (output) {
      output.innerHTML = `
        <div class="email-empty-state">
          <div class="email-empty-icon">✉️</div>
          <h3>Your professional email will appear here</h3>
          <p>
            Write your situation in short Myanmar notes.
            The system will expand it into a complete professional email.
          </p>
        </div>
      `;
    }

    const actions = $("professionalEmailActions");

    if (actions) {
      actions.style.display = "none";
      actions.innerHTML = "";
    }
  }

  function saveEmailHistory(result) {
    try {
      const history = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      history.unshift({
        subject: result.subject,
        body: result.body,
        type: selectedType(),
        language: selectedLanguage(),
        createdAt: new Date().toISOString()
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history.slice(0, 20))
      );
    } catch (error) {
      console.warn("Unable to save email history.", error);
    }
  }

  function showToast(message) {
    const toast = $("toast");
    const toastMessage = $("toastMessage");

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add("show");

      clearTimeout(window.__professionalEmailToastTimer);

      window.__professionalEmailToastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2200);

      return;
    }

    alert(message);
  }

  function populateEmailTypes() {
    const select = $("professionalEmailType");

    if (!select) return;

    select.innerHTML = Object.entries(emailTypes)
      .map(
        ([key, value]) =>
          `<option value="${key}">${value.icon} ${value.name}</option>`
      )
      .join("");
  }

  function populateTones() {
    const select = $("professionalEmailTone");

    if (!select) return;

    select.innerHTML = Object.entries(tones)
      .map(
        ([key, value]) =>
          `<option value="${key}">${value}</option>`
      )
      .join("");
  }

  function populateDetails() {
    const select = $("professionalEmailDetail");

    if (!select) return;

    select.innerHTML = Object.entries(details)
      .map(
        ([key, value]) =>
          `<option value="${key}">${value}</option>`
      )
      .join("");

    select.value = "detailed";
  }

  function setupProfessionalEmail() {
    if (!$("professionalEmailInput")) return;

    populateEmailTypes();
    populateTones();
    populateDetails();

    $("professionalEmailLanguage") &&
      ($("professionalEmailLanguage").value = "english");

    const generateBtn = $("generateProfessionalEmailBtn");

    if (generateBtn) {
      generateBtn.addEventListener(
        "click",
        writeProfessionalEmail
      );
    }

    const shortExampleBtn =
      $("professionalEmailExampleBtn");

    if (shortExampleBtn) {
      shortExampleBtn.addEventListener("click", () => {
        const input = $("professionalEmailInput");

        if (!input) return;

        input.value =
          "ဒီလ sales target မပြည့်သေးဘူး။ လက်ရှိ 77% ရောက်နေတယ်။ 5 ရက်ကျန်တယ်။ Team ကို customer visit တိုးခိုင်းထားတယ်။ Target ပြည့်အောင် ကြိုးစားနေတယ်။";

        $("professionalEmailType").value = "targetGap";
        $("professionalEmailLanguage").value = "english";

        input.focus();

        showToast(
          "Example loaded. Click Generate Professional Email."
        );
      });
    }

    const language = $("professionalEmailLanguage");

    if (language) {
      language.addEventListener("change", () => {
        const selected = language.value;

        if (selected === "myanmar") {
          showToast("Myanmar professional email mode selected.");
        } else {
          showToast("English professional email mode selected.");
        }
      });
    }
  }

  window.AungProfessionalEmail = {
    write: writeProfessionalEmail,
    rewrite: rewriteEmail,
    clear: clearEmailWriter,
    copy: copyEmail,
    types: emailTypes
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      setupProfessionalEmail
    );
  } else {
    setupProfessionalEmail();
  }
})();
