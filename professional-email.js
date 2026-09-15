```javascript
/* ============================================================
   AUNG SALES MANAGER PRO
   PROFESSIONAL EMAIL WRITER
   Version 2.0 Professional
   ============================================================ */

(() => {
  "use strict";

  const STORAGE_KEY = "aung_sales_manager_professional_emails_v2";

  /* ============================================================
     EMAIL TYPES
     ============================================================ */

  const EMAIL_TYPES = {

    sales_report: {
      name: "Sales Report",
      icon: "📊",
      subject: "Sales Performance Report"
    },

    target_gap: {
      name: "Target Achievement / Gap",
      icon: "🎯",
      subject: "Sales Target Achievement Update"
    },

    promotion: {
      name: "Promotion / Trade Promotion",
      icon: "🎁",
      subject: "Promotion Proposal for Approval"
    },

    price_discount: {
      name: "Price / Discount Proposal",
      icon: "💰",
      subject: "Price / Discount Proposal"
    },

    order: {
      name: "Order / Order Confirmation",
      icon: "🧾",
      subject: "Order Confirmation / Update"
    },

    stock: {
      name: "Stock / Availability",
      icon: "📦",
      subject: "Stock Availability Update"
    },

    distributor: {
      name: "Distributor Communication",
      icon: "🏢",
      subject: "Distributor Business Update"
    },

    collection: {
      name: "Payment / Collection",
      icon: "💵",
      subject: "Collection Follow-up"
    },

    customer: {
      name: "Customer Communication",
      icon: "🤝",
      subject: "Customer Business Update"
    },

    new_customer: {
      name: "New Customer / Outlet Proposal",
      icon: "🏪",
      subject: "New Customer / Outlet Proposal"
    },

    followup: {
      name: "Follow-up",
      icon: "🔄",
      subject: "Follow-up on Previous Discussion"
    },

    request: {
      name: "Request",
      icon: "🙏",
      subject: "Business Request"
    },

    approval: {
      name: "Approval Request",
      icon: "✅",
      subject: "Approval Request"
    },

    situation: {
      name: "Situation / Issue",
      icon: "⚠️",
      subject: "Business Situation / Issue Update"
    },

    escalation: {
      name: "Escalation",
      icon: "🚨",
      subject: "Business Issue Escalation"
    },

    feedback: {
      name: "Feedback",
      icon: "💬",
      subject: "Business Feedback"
    },

    meeting: {
      name: "Meeting Request",
      icon: "📅",
      subject: "Meeting Request"
    },

    action_plan: {
      name: "Action Plan",
      icon: "📝",
      subject: "Action Plan Update"
    },

    recommendation: {
      name: "Recommendation",
      icon: "📌",
      subject: "Business Recommendation"
    },

    reminder: {
      name: "Reminder",
      icon: "🔔",
      subject: "Business Reminder"
    },

    urgent: {
      name: "Urgent Action",
      icon: "⏰",
      subject: "Urgent Action Required"
    },

    team: {
      name: "Team Communication",
      icon: "👥",
      subject: "Team Communication"
    },

    team_target: {
      name: "Team Target",
      icon: "🎯",
      subject: "Team Target & Execution Plan"
    },

    recognition: {
      name: "Performance Recognition",
      icon: "🏆",
      subject: "Team Performance Recognition"
    },

    coaching: {
      name: "Coaching / Training",
      icon: "📚",
      subject: "Coaching / Training Update"
    },

    performance_improvement: {
      name: "Performance Improvement",
      icon: "⚠️",
      subject: "Performance Improvement Discussion"
    },

    announcement: {
      name: "Announcement",
      icon: "📢",
      subject: "Business Announcement"
    },

    partnership: {
      name: "Partnership / Business Proposal",
      icon: "🤝",
      subject: "Business Partnership Proposal"
    },

    general: {
      name: "General Business Email",
      icon: "📄",
      subject: "Business Update"
    }
  };

  /* ============================================================
     DOM HELPERS
     ============================================================ */

  function $(selector) {
    return document.querySelector(selector);
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function showToast(message) {
    const toast = $("#toast");
    const toastMessage = $("#toastMessage");

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
    } else {
      alert(message);
    }
  }

  /* ============================================================
     TEXT HELPERS
     ============================================================ */

  function cleanText(text) {
    return String(text || "")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function capitalizeFirst(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function todayText() {
    const date = new Date();

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function getRecipient() {
    return getValue("professionalEmailRecipient") || "Dear Sir/Madam";
  }

  function getSender() {
    return getValue("professionalEmailSender") || "Aung Zar Ni Win";
  }

  function getCompany() {
    return getValue("professionalEmailCompany") || "";
  }

  function getType() {
    return getValue("professionalEmailType") || "general";
  }

  function getTone() {
    return getValue("professionalEmailTone") || "professional";
  }

  function getLanguage() {
    return getValue("professionalEmailLanguage") || "english";
  }

  /* ============================================================
     INFORMATION EXTRACTION
     ============================================================ */

  function extractNumbers(text) {
    return text.match(
      /(?:\d+(?:\.\d+)?\s*%|\d+(?:\.\d+)?\s*(?:lakh|သိန်း|case|cases|days?|ရက်|ကျပ်|MMK))/gi
    ) || [];
  }

  function detectSalesInfo(text) {
    const lower = text.toLowerCase();

    return {
      hasTarget: lower.includes("target") || text.includes("ရည်မှန်း"),
      hasAchievement:
        lower.includes("achievement") ||
        lower.includes("%") ||
        text.includes("ရောက်"),
      hasCustomer:
        lower.includes("customer") ||
        text.includes("customer") ||
        text.includes("ဖောက်သည်"),
      hasTeam:
        lower.includes("team") ||
        text.includes("team") ||
        text.includes("အဖွဲ့"),
      hasPromotion:
        lower.includes("promotion") ||
        text.includes("promo") ||
        text.includes("free") ||
        text.includes("ပရိုမိုးရှင်း"),
      hasApproval:
        lower.includes("approval") ||
        lower.includes("approve") ||
        text.includes("ခွင့်ပြု") ||
        text.includes("အတည်ပြု"),
      hasCollection:
        lower.includes("collection") ||
        lower.includes("payment") ||
        text.includes("ငွေကောက်") ||
        text.includes("ငွေပေး"),
      hasDistributor:
        lower.includes("distributor") ||
        text.includes("distributor") ||
        text.includes("ဖြန့်ချိရေး"),
      numbers: extractNumbers(text)
    };
  }

  /* ============================================================
     SUBJECT GENERATOR
     ============================================================ */

  function generateSubject(input, type, language) {

    const info = detectSalesInfo(input);
    const data = EMAIL_TYPES[type] || EMAIL_TYPES.general;

    if (language === "myanmar") {

      const subjects = {
        sales_report: "Sales Performance Report တင်ပြခြင်း",
        target_gap: "Sales Target Achievement နှင့် Gap Update",
        promotion: "Promotion Proposal အတည်ပြုချက် တောင်းခံခြင်း",
        price_discount: "Price / Discount Proposal တင်ပြခြင်း",
        order: "Order Confirmation / Update",
        stock: "Stock Availability Update",
        distributor: "Distributor Business Update",
        collection: "Collection Follow-up",
        customer: "Customer Business Update",
        new_customer: "New Customer / Outlet Proposal",
        followup: "ယခင်ဆွေးနွေးမှုအပေါ် Follow-up ပြုလုပ်ခြင်း",
        request: "Business Request တင်ပြခြင်း",
        approval: "Approval Request တင်ပြခြင်း",
        situation: "Business Situation / Issue Update",
        escalation: "Business Issue Escalation",
        feedback: "Business Feedback တင်ပြခြင်း",
        meeting: "Meeting Request",
        action_plan: "Action Plan Update",
        recommendation: "Business Recommendation",
        reminder: "Business Reminder",
        urgent: "Urgent Action Required",
        team: "Team Communication",
        team_target: "Team Target & Execution Plan",
        recognition: "Team Performance Recognition",
        coaching: "Coaching / Training Update",
        performance_improvement: "Performance Improvement Discussion",
        announcement: "Business Announcement",
        partnership: "Business Partnership Proposal",
        general: "Business Update"
      };

      return subjects[type] || "Business Update";
    }

    if (language === "bilingual") {
      return `${data.subject} / လုပ်ငန်းဆိုင်ရာ Update`;
    }

    /* Dynamic subject improvement */
    if (type === "target_gap" && info.numbers.length) {
      return "Sales Target Achievement & Gap Update";
    }

    if (type === "promotion") {
      return "Promotion Proposal for Approval";
    }

    return data.subject;
  }

  /* ============================================================
     ENGLISH EMAIL BUILDER
     ============================================================ */

  function buildEnglishEmail(input, type, tone, detail) {

    const sender = getSender();
    const recipient = getRecipient();
    const company = getCompany();
    const info = detectSalesInfo(input);

    const greeting =
      tone === "formal"
        ? `Dear ${recipient},`
        : tone === "friendly"
          ? `Hi ${recipient},`
          : `Dear ${recipient},`;

    let body = "";

    /* ------------------------------------------------------------
       OPENING
       ------------------------------------------------------------ */

    body += `I would like to provide an update regarding ${getTopic(type)}.\n\n`;

    /* ------------------------------------------------------------
       BACKGROUND
       ------------------------------------------------------------ */

    body += `Background\n`;
    body += `Based on the current business situation, I would like to share the following information for your review and consideration. The purpose of this email is to provide a clear update on the current situation, actions taken, and the proposed next steps.\n\n`;

    /* ------------------------------------------------------------
       CURRENT SITUATION
       ------------------------------------------------------------ */

    body += `Current Situation\n`;
    body += `${capitalizeFirst(input)}\n\n`;

    /* ------------------------------------------------------------
       KEY DETAILS
       ------------------------------------------------------------ */

    body += `Key Details\n`;

    if (info.numbers.length) {
      body += `• The key figures currently available are: ${info.numbers.join(", ")}.\n`;
    }

    body += `• The situation is currently being monitored closely.\n`;
    body += `• Relevant team members and business stakeholders are being aligned accordingly.\n`;

    if (info.hasCustomer) {
      body += `• Customer visits and customer-level execution are being strengthened to improve business results.\n`;
    }

    if (info.hasTeam) {
      body += `• The sales team has been informed and is being guided on the required actions and priorities.\n`;
    }

    if (info.hasDistributor) {
      body += `• Distributor execution and market availability are being reviewed to ensure proper implementation.\n`;
    }

    if (info.hasCollection) {
      body += `• Collection and outstanding payment follow-up are being monitored to minimize financial risk.\n`;
    }

    body += `\n`;

    /* ------------------------------------------------------------
       BUSINESS IMPACT
       ------------------------------------------------------------ */

    body += `Business Impact\n`;
    body += `The current situation may have an impact on sales performance, target achievement, customer execution, and overall business results if it is not addressed in a timely manner. Therefore, focused execution and close follow-up are important during the remaining period.\n\n`;

    /* ------------------------------------------------------------
       ACTION TAKEN
       ------------------------------------------------------------ */

    body += `Action Taken\n`;
    body += `• The current situation has been reviewed.\n`;
    body += `• Priorities have been communicated to the relevant team members.\n`;
    body += `• Customer and market activities are being followed up closely.\n`;

    if (info.hasTeam) {
      body += `• The team has been instructed to increase execution and maintain close daily follow-up.\n`;
    }

    if (info.hasPromotion) {
      body += `• The proposed promotion mechanics and expected business impact are being considered for execution.\n`;
    }

    body += `\n`;

    /* ------------------------------------------------------------
       NEXT ACTION
       ------------------------------------------------------------ */

    body += `Next Action\n`;
    body += `Moving forward, we will continue to monitor the situation closely and take the necessary actions to improve execution and achieve the required business objective. Progress will be reviewed regularly, and further updates will be shared when necessary.\n\n`;

    /* ------------------------------------------------------------
       REQUEST / RECOMMENDATION
       ------------------------------------------------------------ */

    body += `Request / Recommendation\n`;

    if (info.hasApproval || type === "approval" || type === "promotion") {
      body += `Your review and approval of the above proposal/action would be highly appreciated so that the team can proceed with the implementation accordingly.\n\n`;
    } else if (type === "escalation" || type === "urgent") {
      body += `Your guidance and support on the above matter would be appreciated so that we can take the necessary action without further delay.\n\n`;
    } else {
      body += `Your feedback, guidance, and support would be appreciated. Please let me know if any additional information or action is required from my side.\n\n`;
    }

    /* ------------------------------------------------------------
       CLOSING
       ------------------------------------------------------------ */

    body += `Thank you for your support and consideration.\n\n`;
    body += `Best regards,\n${sender}`;

    if (company) {
      body += `\n${company}`;
    }

    return `${greeting}\n\n${body}`;
  }

  /* ============================================================
     SPECIAL PROMOTION EMAIL
     ============================================================ */

  function buildPromotionEmail(input) {

    const sender = getSender();
    const recipient = getRecipient();
    const company = getCompany();

    return `Dear ${recipient},

Subject: Promotion Proposal for Approval

Background

I would like to propose a sales promotion initiative to support sales growth, improve customer engagement, and strengthen product movement during the proposed promotion period.

Promotion Proposal

Based on the current business requirement, the proposed promotion is as follows:

• Promotion Mechanic: ${input}
• Objective: To increase sales volume, improve customer participation, and support achievement of the monthly sales target.
• Target Customers: Relevant distributors, customers, and outlets based on the agreed eligibility criteria.
• Promotion Period: As proposed in the above details.

Expected Business Impact

The proposed promotion is expected to improve product movement and customer purchase frequency while supporting the sales team in achieving the required monthly target. It may also help strengthen customer relationships and improve market execution during the promotion period.

Execution Plan

If approved, the sales team will communicate the promotion clearly to the relevant customers and ensure that the agreed promotion mechanics are implemented consistently. Sales performance and customer participation will be monitored throughout the promotion period.

Risk & Control

To ensure proper control, promotion eligibility, quantity requirements, free-goods entitlement, and implementation conditions should be clearly communicated and monitored. Any exceptions should be reviewed and approved before execution.

Approval Required

I would appreciate your review and approval of this promotion proposal so that we can proceed with the required execution plan.

Please let me know if any further information or adjustment is required.

Thank you for your support.

Best regards,
${sender}${company ? `\n${company}` : ""}`;
  }

  /* ============================================================
     MYANMAR EMAIL BUILDER
     ============================================================ */

  function buildMyanmarEmail(input, type, tone, detail) {

    const sender = getSender();
    const recipient = getRecipient();
    const company = getCompany();

    let body = "";

    body += `လေးစားအပ်ပါသော ${recipient} ခင်ဗျာ/ရှင်၊\n\n`;

    body += `${getMyanmarTopic(type)} နှင့်ပတ်သက်၍ လက်ရှိအခြေအနေ၊ ဆောင်ရွက်ထားရှိမှုနှင့် ဆက်လက်ဆောင်ရွက်မည့် အစီအစဉ်များကို အောက်ပါအတိုင်း တင်ပြအပ်ပါသည်။\n\n`;

    body += `လက်ရှိအခြေအနေ\n`;
    body += `${input}\n\n`;

    body += `အဓိကအချက်များ\n`;
    body += `• လက်ရှိအခြေအနေကို သက်ဆိုင်ရာအဖွဲ့နှင့်အတူ စောင့်ကြည့်သုံးသပ်လျက်ရှိပါသည်။\n`;
    body += `• လိုအပ်သော လုပ်ဆောင်ချက်များကို သက်ဆိုင်ရာ Team Member များအား အသိပေးထားပါသည်။\n`;
    body += `• Sales Execution နှင့် Customer Follow-up များကို ပိုမိုအာရုံစိုက် ဆောင်ရွက်လျက်ရှိပါသည်။\n\n`;

    body += `လုပ်ငန်းအပေါ် သက်ရောက်မှု\n`;
    body += `လက်ရှိအခြေအနေသည် Sales Performance၊ Target Achievement နှင့် Customer Execution အပေါ် သက်ရောက်မှုရှိနိုင်သဖြင့် အချိန်မီ Follow-up ပြုလုပ်ပြီး လိုအပ်သည့် Action များကို ဆက်လက်ဆောင်ရွက်ရန် လိုအပ်ပါသည်။\n\n`;

    body += `ဆောင်ရွက်ထားရှိမှု\n`;
    body += `• လက်ရှိအခြေအနေကို ပြန်လည်သုံးသပ်ထားပါသည်။\n`;
    body += `• သက်ဆိုင်ရာ Team Member များအား လိုအပ်သည့် Priority များကို အသိပေးထားပါသည်။\n`;
    body += `• Customer နှင့် Market Execution များကို အနီးကပ် Follow-up ပြုလုပ်လျက်ရှိပါသည်။\n\n`;

    body += `ဆက်လက်ဆောင်ရွက်မည့် အစီအစဉ်\n`;
    body += `လာမည့်ကာလအတွင်း လက်ရှိအခြေအနေကို ဆက်လက်စောင့်ကြည့်ပြီး သတ်မှတ်ထားသော Business Objective နှင့် Sales Target များ ရရှိစေရန် လိုအပ်သည့် Action များကို ဆက်လက်ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။\n\n`;

    body += `အကြံပြုချက် / လိုအပ်ချက်\n`;
    body += `အထက်ပါအခြေအနေအပေါ် သုံးသပ်ပေးခြင်း၊ လမ်းညွှန်ပေးခြင်းနှင့် လိုအပ်ပါက Approval / Support ပေးခြင်းတို့ကို မေတ္တာရပ်ခံအပ်ပါသည်။\n\n`;

    body += `ကျေးဇူးတင်ရှိပါသည်။\n\n`;
    body += `လေးစားစွာဖြင့်\n${sender}`;

    if (company) {
      body += `\n${company}`;
    }

    return body;
  }

  /* ============================================================
     BILINGUAL
     ============================================================ */

  function buildBilingualEmail(input, type, tone, detail) {

    const english = buildEnglishEmail(input, type, tone, detail);

    const myanmar = buildMyanmarEmail(input, type, tone, detail);

    return `${english}\n\n────────────────────────────\n\n${myanmar}`;
  }

  /* ============================================================
     TOPIC HELPERS
     ============================================================ */

  function getTopic(type) {

    const topics = {
      sales_report: "the latest sales performance",
      target_gap: "the current sales target achievement and gap",
      promotion: "the proposed sales promotion",
      price_discount: "the proposed price or discount arrangement",
      order: "the order status",
      stock: "stock availability",
      distributor: "the distributor business situation",
      collection: "customer payment and collection",
      customer: "customer business development",
      new_customer: "a new customer or outlet opportunity",
      followup: "our previous discussion",
      request: "a business request",
      approval: "an approval request",
      situation: "a current business situation",
      escalation: "an important business issue",
      feedback: "business feedback",
      meeting: "a meeting request",
      action_plan: "the proposed action plan",
      recommendation: "a business recommendation",
      reminder: "an important business reminder",
      urgent: "an urgent business matter",
      team: "team communication",
      team_target: "team target and execution",
      recognition: "team performance recognition",
      coaching: "team coaching and training",
      performance_improvement: "performance improvement",
      announcement: "a business announcement",
      partnership: "a business partnership proposal",
      general: "a business update"
    };

    return topics[type] || "the current business matter";
  }

  function getMyanmarTopic(type) {

    const topics = {
      sales_report: "Sales Performance Report",
      target_gap: "Sales Target Achievement နှင့် Gap",
      promotion: "Promotion Proposal",
      price_discount: "Price / Discount Proposal",
      order: "Order Update",
      stock: "Stock Availability",
      distributor: "Distributor Business Update",
      collection: "Payment / Collection",
      customer: "Customer Business",
      new_customer: "New Customer / Outlet",
      followup: "ယခင်ဆွေးနွေးထားသော Business Matter",
      request: "Business Request",
      approval: "Approval Request",
      situation: "Business Situation / Issue",
      escalation: "Business Issue Escalation",
      feedback: "Business Feedback",
      meeting: "Meeting Request",
      action_plan: "Action Plan",
      recommendation: "Business Recommendation",
      reminder: "Business Reminder",
      urgent: "Urgent Action",
      team: "Team Communication",
      team_target: "Team Target",
      recognition: "Team Performance",
      coaching: "Coaching / Training",
      performance_improvement: "Performance Improvement",
      announcement: "Business Announcement",
      partnership: "Business Partnership",
      general: "Business Update"
    };

    return topics[type] || "Business Matter";
  }

  /* ============================================================
     RENDER OUTPUT
     ============================================================ */

  function renderOutput(subject, body) {

    const subjectEl = document.getElementById("professionalEmailSubject");
    const outputEl = document.getElementById("professionalEmailOutput");
    const actionsEl = document.getElementById("professionalEmailActions");

    if (subjectEl) {
      subjectEl.value = subject;
    }

    if (outputEl) {
      outputEl.value = body;
    }

    if (actionsEl) {
      actionsEl.style.display = "flex";
    }
  }

  /* ============================================================
     GENERATE EMAIL
     ============================================================ */

  function writeProfessionalEmail() {

    const input = getValue("professionalEmailInput");

    if (!input) {
      showToast("Please enter your situation or notes first.");
      return;
    }

    const type = getType();
    const tone = getTone();
    const language = getLanguage();
    const detail = getValue("professionalEmailDetail") || "detailed";

    let body = "";

    if (type === "promotion" && language === "english") {
      body = buildPromotionEmail(input);
    } else if (language === "myanmar") {
      body = buildMyanmarEmail(input, type, tone, detail);
    } else if (language === "bilingual") {
      body = buildBilingualEmail(input, type, tone, detail);
    } else {
      body = buildEnglishEmail(input, type, tone, detail);
    }

    const subject = generateSubject(input, type, language);

    renderOutput(subject, body);

    saveEmailHistory(subject, body, input, type);

    showToast("Professional email created successfully.");
  }

  /* ============================================================
     REWRITE
     ============================================================ */

  function rewriteEmail() {

    const input = getValue("professionalEmailInput");

    if (!input) {
      showToast("Please enter your notes first.");
      return;
    }

    const type = getType();
    const tone = getTone();
    const language = getLanguage();
    const detail = "detailed";

    let improvedInput =
      `${input}\n\nPlease make the email more structured, professional, detailed and business-focused while keeping the original meaning unchanged.`;

    let body;

    if (type === "promotion" && language === "english") {
      body = buildPromotionEmail(improvedInput);
    } else if (language === "myanmar") {
      body = buildMyanmarEmail(improvedInput, type, tone, detail);
    } else if (language === "bilingual") {
      body = buildBilingualEmail(improvedInput, type, tone, detail);
    } else {
      body = buildEnglishEmail(improvedInput, type, tone, detail);
    }

    const subject = generateSubject(input, type, language);

    renderOutput(subject, body);

    showToast("Email rewritten with more professional detail.");
  }

  /* ============================================================
     COPY EMAIL
     ============================================================ */

  async function copyEmail() {

    const subject = getValue("professionalEmailSubject");
    const body = getValue("professionalEmailOutput");

    if (!body) {
      showToast("Please create an email first.");
      return;
    }

    const fullText = `Subject: ${subject}\n\n${body}`;

    try {

      await navigator.clipboard.writeText(fullText);

      showToast("Email copied to clipboard.");

    } catch (error) {

      const textarea = document.createElement("textarea");
      textarea.value = fullText;

      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        showToast("Email copied to clipboard.");
      } catch (e) {
        showToast("Copy failed. Please copy manually.");
      }

      textarea.remove();
    }
  }

  /* ============================================================
     CLEAR
     ============================================================ */

  function clearEmailWriter() {

    setValue("professionalEmailInput", "");
    setValue("professionalEmailSubject", "");
    setValue("professionalEmailOutput", "");

    const actionsEl = document.getElementById("professionalEmailActions");

    if (actionsEl) {
      actionsEl.style.display = "none";
    }

    showToast("Email writer cleared.");
  }

  /* ============================================================
     SAVE HISTORY
     ============================================================ */

  function saveEmailHistory(subject, body, input, type) {

    try {

      const existing =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      existing.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        subject,
        body,
        input,
        type
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(existing.slice(0, 30))
      );

    } catch (error) {
      console.warn("Could not save email history.", error);
    }
  }

  /* ============================================================
     QUICK EXAMPLES
     ============================================================ */

  function useExample(example) {

    const input = document.getElementById("professionalEmailInput");

    if (!input) return;

    const examples = {

      target:
        "ဒီလ sales target မပြည့်သေးဘူး။ လက်ရှိ 77% ရောက်နေတယ်။ 5 ရက်ကျန်တယ်။ Team ကို customer visit တိုးခိုင်းထားတယ်။ Target ပြည့်အောင် ကြိုးစားနေတယ်။",

      promotion:
        "ဒီလ distributor အတွက် promotion လုပ်ချင်တယ်။ Product A ကို 10 case ဝယ်ရင် 1 case free ပေးမယ်။ September 20 ကနေ 30 အထိ။ Sales တိုးဖို့နဲ့ target ပြည့်ဖို့ အထောက်အကူဖြစ်မယ်။ Approval လိုတယ်။",

      collection:
        "Customer တစ်ယောက်ဆီက payment ကျန်နေတယ်။ Amount က 15 သိန်း။ Due date ကျော်နေပြီ။ Sales team က follow-up လုပ်နေတယ်။ ဒီအပတ်အတွင်း payment ရအောင် ဆက်လုပ်မယ်။",

      distributor:
        "Distributor မှာ stock မလုံလောက်ဘူး။ Fast moving SKU တွေ out of stock ဖြစ်နေတယ်။ Customer demand ရှိတယ်။ Urgent replenishment လိုတယ်။"
    };

    input.value = examples[example] || "";

    if (example === "promotion") {
      setValue("professionalEmailType", "promotion");
    }

    if (example === "target") {
      setValue("professionalEmailType", "target_gap");
    }

    if (example === "collection") {
      setValue("professionalEmailType", "collection");
    }

    if (example === "distributor") {
      setValue("professionalEmailType", "distributor");
    }

    input.focus();
  }

  /* ============================================================
     EVENT BINDING
     ============================================================ */

  function bindEvents() {

    const writeBtn =
      document.getElementById("professionalEmailWriteBtn");

    const rewriteBtn =
      document.getElementById("professionalEmailRewriteBtn");

    const clearBtn =
      document.getElementById("professionalEmailClearBtn");

    const copyBtn =
      document.getElementById("professionalEmailCopyBtn");

    if (writeBtn) {
      writeBtn.addEventListener("click", writeProfessionalEmail);
    }

    if (rewriteBtn) {
      rewriteBtn.addEventListener("click", rewriteEmail);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", clearEmailWriter);
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", copyEmail);
    }

    document.querySelectorAll("[data-email-example]").forEach(btn => {

      btn.addEventListener("click", () => {

        useExample(btn.dataset.emailExample);

      });

    });
  }

  /* ============================================================
     INITIALIZE
     ============================================================ */

  function initProfessionalEmail() {

    bindEvents();

    const sender = document.getElementById(
      "professionalEmailSender"
    );

    if (sender && !sender.value) {
      sender.value = "Aung Zar Ni Win";
    }

    const detail = document.getElementById(
      "professionalEmailDetail"
    );

    if (detail && !detail.value) {
      detail.value = "detailed";
    }

    const tone = document.getElementById(
      "professionalEmailTone"
    );

    if (tone && !tone.value) {
      tone.value = "professional";
    }

    const language = document.getElementById(
      "professionalEmailLanguage"
    );

    if (language && !language.value) {
      language.value = "english";
    }
  }

  /* ============================================================
     GLOBAL API
     ============================================================ */

  window.AungProfessionalEmail = {
    write: writeProfessionalEmail,
    rewrite: rewriteEmail,
    copy: copyEmail,
    clear: clearEmailWriter,
    example: useExample
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initProfessionalEmail
    );
  } else {
    initProfessionalEmail();
  }

})();
```
