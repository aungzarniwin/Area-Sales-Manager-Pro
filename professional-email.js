/* =========================================================
   AUNG SALES MANAGER PRO
   PROFESSIONAL EMAIL WRITER
   Version 3.0 Professional
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     CONFIGURATION
  ========================================================= */

  const STORAGE_KEY = "aung_sales_manager_professional_emails";

  const EMAIL_TYPES = {
    sales_report: {
      label: "📊 Sales Report",
      subject: "Sales Performance Update",
      purpose: "Provide a clear update on sales performance and current business status."
    },

    target_gap: {
      label: "🎯 Target Achievement / Gap",
      subject: "Sales Target Achievement and Gap Update",
      purpose: "Explain current target achievement, gap and recovery actions."
    },

    promotion: {
      label: "🎁 Promotion / Trade Promotion",
      subject: "Promotion Proposal for Approval",
      purpose: "Present a promotion proposal with objective, mechanics, period and expected impact."
    },

    price_discount: {
      label: "💰 Price / Discount Proposal",
      subject: "Price / Discount Proposal for Approval",
      purpose: "Request approval for a commercial price or discount proposal."
    },

    order: {
      label: "🧾 Order / Order Confirmation",
      subject: "Order Confirmation and Next Steps",
      purpose: "Confirm order details and execution requirements."
    },

    stock: {
      label: "📦 Stock / Availability",
      subject: "Stock Availability Update",
      purpose: "Communicate stock status, shortage and required action."
    },

    distributor: {
      label: "🏢 Distributor Communication",
      subject: "Distributor Business Update and Action Required",
      purpose: "Communicate distributor performance, issue or required action."
    },

    collection: {
      label: "💵 Payment / Collection",
      subject: "Collection and Outstanding Payment Update",
      purpose: "Follow up outstanding payment and collection commitment."
    },

    customer: {
      label: "🤝 Customer Communication",
      subject: "Customer Business Update",
      purpose: "Communicate customer situation, opportunity or required action."
    },

    new_customer: {
      label: "🏪 New Customer / New Outlet",
      subject: "New Customer / Outlet Proposal",
      purpose: "Propose a new customer or outlet opportunity."
    },

    followup: {
      label: "🔄 Customer / Distributor Follow-up",
      subject: "Follow-up on Previous Discussion",
      purpose: "Follow up on a previous discussion, action or commitment."
    },

    request: {
      label: "🙏 Request",
      subject: "Request for Support",
      purpose: "Make a clear and professional business request."
    },

    approval: {
      label: "✅ Approval Request",
      subject: "Request for Approval",
      purpose: "Request management approval with clear business justification."
    },

    situation: {
      label: "⚠️ Situation / Issue",
      subject: "Business Situation / Issue Update",
      purpose: "Explain a current issue and proposed response."
    },

    escalation: {
      label: "🚨 Escalation",
      subject: "Business Issue Escalation and Support Required",
      purpose: "Escalate an important issue with facts, impact and required support."
    },

    feedback: {
      label: "💬 Feedback",
      subject: "Business Feedback and Recommendations",
      purpose: "Share constructive business feedback and recommendations."
    },

    meeting: {
      label: "📅 Meeting Request",
      subject: "Meeting Request",
      purpose: "Request a meeting to discuss an important business matter."
    },

    action_plan: {
      label: "📝 Action Plan",
      subject: "Action Plan and Next Steps",
      purpose: "Communicate agreed actions, owners and next steps."
    },

    recommendation: {
      label: "📌 Recommendation",
      subject: "Business Recommendation",
      purpose: "Present a business recommendation supported by the situation."
    },

    reminder: {
      label: "🔔 Reminder",
      subject: "Friendly Reminder and Follow-up",
      purpose: "Send a professional reminder without sounding aggressive."
    },

    urgent: {
      label: "⏰ Urgent Action",
      subject: "Urgent Action Required",
      purpose: "Communicate an urgent issue and required action."
    },

    team: {
      label: "👥 Team Communication",
      subject: "Team Communication and Execution Focus",
      purpose: "Communicate priorities, expectations and execution focus to the team."
    },

    team_target: {
      label: "🎯 Team Target",
      subject: "Team Target and Execution Plan",
      purpose: "Communicate team target, gap and execution plan."
    },

    recognition: {
      label: "🏆 Performance Recognition",
      subject: "Performance Recognition and Appreciation",
      purpose: "Recognize strong performance and motivate the team."
    },

    coaching: {
      label: "📚 Coaching / Training",
      subject: "Coaching and Development Follow-up",
      purpose: "Communicate coaching points and development actions."
    },

    performance_improvement: {
      label: "⚠️ Performance Improvement",
      subject: "Performance Improvement Action Plan",
      purpose: "Address performance gaps professionally and define improvement actions."
    },

    announcement: {
      label: "📢 Announcement",
      subject: "Business Announcement",
      purpose: "Communicate an important business announcement."
    },

    partnership: {
      label: "🤝 Partnership / Business Proposal",
      subject: "Business Partnership Proposal",
      purpose: "Present a professional business partnership opportunity."
    },

    general: {
      label: "📄 General Business Email",
      subject: "Business Update",
      purpose: "Create a professional general-purpose business email."
    }
  };


  /* =========================================================
     DOM HELPERS
  ========================================================= */

  function get(id) {
    return document.getElementById(id);
  }

  function value(id, fallback = "") {
    const el = get(id);

    if (!el) {
      return fallback;
    }

    return String(el.value || "").trim();
  }

  function setValue(id, text) {
    const el = get(id);

    if (el) {
      el.value = text || "";
    }
  }


  /* =========================================================
     TEXT HELPERS
  ========================================================= */

  function cleanText(text) {
    return String(text || "")
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }


  function capitalize(text) {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  function firstName(text) {
    if (!text) return "";

    return text
      .trim()
      .split(/\s+/)[0];
  }


  function getSender() {
    return value(
      "professionalEmailSender",
      "Aung Zar Ni Win"
    ) || "Aung Zar Ni Win";
  }


  function getRecipient() {
    return value(
      "professionalEmailRecipient",
      "Sir/Madam"
    ) || "Sir/Madam";
  }


  function getCompany() {
    return value(
      "professionalEmailCompany",
      ""
    );
  }


  function getType() {
    return value(
      "professionalEmailType",
      "general"
    ) || "general";
  }


  function getTone() {
    return value(
      "professionalEmailTone",
      "professional"
    ) || "professional";
  }


  function getDetail() {
    return value(
      "professionalEmailDetail",
      "detailed"
    ) || "detailed";
  }


  function getLanguage() {
    return value(
      "professionalEmailLanguage",
      "myanmar"
    ) || "myanmar";
  }


  function getInput() {
    return cleanText(
      value("professionalEmailInput")
    );
  }


  /* =========================================================
     TONE
  ========================================================= */

  function getToneIntro(language) {

    const tone = getTone();

    if (language === "english") {

      if (tone === "formal") {
        return "I would like to formally provide the following business update for your review.";
      }

      if (tone === "polite") {
        return "I would like to kindly share the following business update for your review and consideration.";
      }

      if (tone === "firm") {
        return "I would like to highlight the following business matter and the actions required to address it.";
      }

      if (tone === "executive") {
        return "I would like to provide a concise management update on the following business matter.";
      }

      if (tone === "friendly") {
        return "I would like to share the following business update and keep you informed of the current situation.";
      }

      return "I would like to provide the following business update for your review.";
    }


    if (language === "bilingual") {

      return (
        "အောက်ပါ Business Update ကို review နှင့် consideration ပြုလုပ်ပေးနိုင်ရန် မျှဝေပေးလိုပါသည်။\n\n" +
        "I would like to provide the following business update for your review and consideration."
      );
    }


    return "အောက်ပါ Business Update အခြေအနေကို သိရှိနိုင်ပြီး လိုအပ်သော ဆုံးဖြတ်ချက်နှင့် support ပေးနိုင်ရန် မျှဝေပေးလိုပါသည်။";
  }


  /* =========================================================
     LANGUAGE LABELS
  ========================================================= */

  function labels(language) {

    if (language === "english") {

      return {
        background: "Background",
        situation: "Current Situation",
        details: "Key Details",
        impact: "Business Impact",
        action: "Action Taken",
        next: "Next Action",
        request: "Request / Recommendation",
        closing: "Please let me know if any further information or clarification is required."
      };
    }


    if (language === "bilingual") {

      return {
        background: "နောက်ခံအခြေအနေ / Background",
        situation: "လက်ရှိအခြေအနေ / Current Situation",
        details: "အဓိကအချက်များ / Key Details",
        impact: "လုပ်ငန်းအပေါ် သက်ရောက်မှု / Business Impact",
        action: "ဆောင်ရွက်ပြီးသောအချက်များ / Action Taken",
        next: "ဆက်လက်ဆောင်ရွက်မည့်အချက်များ / Next Action",
        request: "တောင်းဆိုချက် / Recommendation",
        closing: "လိုအပ်ပါက ထပ်မံရှင်းလင်းတင်ပြပေးနိုင်ပါသည်။"
      };
    }


    return {
      background: "နောက်ခံအခြေအနေ",
      situation: "လက်ရှိအခြေအနေ",
      details: "အဓိကအချက်များ",
      impact: "လုပ်ငန်းအပေါ် သက်ရောက်မှု",
      action: "ဆောင်ရွက်ပြီးသောအချက်များ",
      next: "ဆက်လက်ဆောင်ရွက်မည့်အချက်များ",
      request: "တောင်းဆိုချက် / အကြံပြုချက်",
      closing: "လိုအပ်ပါက ထပ်မံရှင်းလင်းတင်ပြပေးနိုင်ပါသည်။"
    };
  }


  /* =========================================================
     SUBJECT GENERATOR
  ========================================================= */

  function generateSubject(type, input) {

    const config = EMAIL_TYPES[type] || EMAIL_TYPES.general;

    let subject = config.subject;

    const lower = input.toLowerCase();

    if (
      type === "target_gap" ||
      lower.includes("target") ||
      lower.includes("target မပြည့်")
    ) {
      subject = "Sales Target Achievement and Recovery Action Update";
    }

    if (
      type === "promotion" ||
      lower.includes("promotion")
    ) {
      subject = "Promotion Proposal for Approval";
    }

    if (
      type === "collection" ||
      lower.includes("collection") ||
      lower.includes("payment") ||
      lower.includes("ငွေ")
    ) {
      subject = "Outstanding Payment and Collection Follow-up";
    }

    if (
      type === "distributor" ||
      lower.includes("distributor")
    ) {
      subject = "Distributor Business Update and Action Required";
    }

    if (
      type === "stock" ||
      lower.includes("stock")
    ) {
      subject = "Stock Availability and Supply Update";
    }

    return subject;
  }


  /* =========================================================
     CONTENT ANALYSIS
  ========================================================= */

  function detectNumbers(input) {

    const matches = input.match(
      /(\d+(?:\.\d+)?)\s*(%|လ|သိန်း|ကျပ်|case|cases|ရက်|days|နေ့|outlet|customer|ဆိုင်)?/gi
    );

    return matches || [];
  }


  function detectPercentage(input) {

    const match = input.match(
      /(\d+(?:\.\d+)?)\s*%/
    );

    return match ? match[1] + "%" : "";
  }


  function detectDays(input) {

    const match = input.match(
      /(\d+)\s*(ရက်|days|နေ့)/
    );

    if (!match) return "";

    return match[1] + " days";
  }


  function detectAction(input) {

    const actions = [];

    const lower = input.toLowerCase();

    if (
      lower.includes("visit") ||
      input.includes("customer visit") ||
      input.includes("သွား")
    ) {
      actions.push("customer visits are being increased");
    }

    if (
      lower.includes("team") ||
      input.includes("Team")
    ) {
      actions.push("the sales team is being closely followed up");
    }

    if (
      lower.includes("promotion") ||
      input.includes("promotion")
    ) {
      actions.push("promotional execution is being considered");
    }

    if (
      lower.includes("follow") ||
      input.includes("follow")
    ) {
      actions.push("follow-up activities are being conducted");
    }

    return actions;
  }


  function createBusinessInterpretation(input, type) {

    const percentage = detectPercentage(input);
    const days = detectDays(input);
    const actions = detectAction(input);

    let interpretation = "";

    if (type === "target_gap") {

      interpretation =
        "The current performance indicates that additional focused execution is required to close the remaining gap and achieve the agreed target within the available period.";

      if (percentage) {
        interpretation +=
          ` Current achievement is ${percentage}.`;
      }

      if (days) {
        interpretation +=
          ` Approximately ${days} remain for the recovery plan.`;
      }

      if (actions.length) {
        interpretation +=
          " " + capitalize(actions.join(", ")) + ".";
      }

      return interpretation;
    }


    if (type === "promotion") {

      return (
        "The proposed activity is intended to strengthen customer engagement, " +
        "improve sales movement and create additional volume during the campaign period. " +
        "The execution should be monitored closely to ensure that the agreed commercial objectives are achieved."
      );
    }


    if (type === "collection") {

      return (
        "Timely collection is important to maintain healthy cash flow, " +
        "credit discipline and sustainable customer and distributor operations. " +
        "Therefore, the outstanding amount should be followed up according to the agreed payment commitment."
      );
    }


    if (type === "distributor") {

      return (
        "The distributor situation requires timely follow-up to minimize potential impact on sales execution, " +
        "stock availability, customer service and overall territory performance."
      );
    }


    if (type === "stock") {

      return (
        "Stock availability has a direct impact on sales execution, customer service and revenue achievement. " +
        "The current situation therefore requires close coordination between the relevant teams."
      );
    }


    return (
      "The information provided has been reviewed from a business execution perspective. " +
      "The current situation should be monitored closely, with clear ownership and follow-up actions to ensure the expected business outcome."
    );
  }


  /* =========================================================
     DETAIL BUILDER
  ========================================================= */

  function buildDetailedSections(input, type, language) {

    const L = labels(language);

    const interpretation =
      createBusinessInterpretation(input, type);

    const numbers =
      detectNumbers(input);

    const percentage =
      detectPercentage(input);

    const days =
      detectDays(input);


    let detailsText = input;

    if (!detailsText) {
      detailsText =
        language === "english"
          ? "No specific details were provided. Please review the current situation and confirm the relevant business information."
          : "လက်ရှိအခြေအနေကို သက်ဆိုင်ရာ အချက်အလက်များနှင့်အတူ ဆက်လက်စောင့်ကြည့်ပြီး လိုအပ်သောလုပ်ဆောင်ချက်များကို ဆောင်ရွက်သွားရန် လိုအပ်ပါသည်။";
    }


    let background;
    let situation;
    let impact;
    let action;
    let next;
    let request;


    if (language === "english") {

      background =
        "This email is being shared to provide visibility on the current business situation and to ensure that the relevant stakeholders are aligned on the required actions.";

      situation =
        input
          ? `Based on the latest update, the current situation is as follows:\n\n${input}`
          : "The current business situation requires further review and follow-up.";

      impact =
        interpretation;

      if (percentage) {
        impact += ` The reported achievement level is ${percentage}, which indicates that focused execution is required to maximize the remaining opportunity.`;
      }

      if (days) {
        impact += ` With ${days} remaining, timely execution and daily monitoring will be important.`;
      }

      action =
        "The current situation is being followed up through regular communication, field execution, customer engagement and team monitoring, as applicable.";

      next =
        "The next step will be to continue the agreed execution plan, monitor the progress closely and take corrective action whenever required.";

      request =
        "Your review, guidance and support would be appreciated. If approval or additional resources are required, I would be grateful for your consideration.";

    } else if (language === "bilingual") {

      background =
        "လက်ရှိ Business Situation ကို သက်ဆိုင်ရာသူများ သိရှိပြီး လိုအပ်သော Action များကို တစ်ညီတစ်ညွတ်တည်း ဆောင်ရွက်နိုင်ရန် အောက်ပါအတိုင်း update ပြုလုပ်ပေးခြင်းဖြစ်ပါသည်.\n\n" +
        "This email is shared to ensure alignment on the current business situation and required actions.";

      situation =
        "လက်ရှိအခြေအနေမှာ အောက်ပါအတိုင်းဖြစ်ပါသည်။\n\n" +
        input +
        "\n\nCurrent situation:\n" +
        input;

      impact =
        "ဤအခြေအနေသည် sales execution နှင့် overall business performance အပေါ် သက်ရောက်မှုရှိနိုင်သောကြောင့် focused execution နှင့် close monitoring လိုအပ်ပါသည်.\n\n" +
        interpretation;

      action =
        "လက်ရှိအခြေအနေကို team follow-up, customer engagement နှင့် field execution များမှတစ်ဆင့် ဆက်လက်စောင့်ကြည့်ဆောင်ရွက်နေပါသည်.\n\n" +
        "The situation is being monitored through regular team follow-up and business execution.";

      next =
        "နောက်တစ်ဆင့်အနေဖြင့် agreed action plan အတိုင်း ဆက်လက်ဆောင်ရွက်ပြီး progress ကို regular monitoring ပြုလုပ်သွားပါမည်.\n\n" +
        "We will continue the agreed action plan and monitor progress closely.";

      request =
        "လိုအပ်သော guidance / approval / support ပေးနိုင်ပါရန် မေတ္တာရပ်ခံအပ်ပါသည်.\n\n" +
        "Your guidance and support would be highly appreciated.";

    } else {

      background =
        "လက်ရှိလုပ်ငန်းအခြေအနေကို သက်ဆိုင်ရာတာဝန်ရှိသူများ သိရှိနိုင်ပြီး လိုအပ်သည့်လုပ်ဆောင်ချက်များကို တစ်ညီတစ်ညွတ်တည်း ဆောင်ရွက်နိုင်ရန် အောက်ပါအတိုင်း တင်ပြပေးခြင်းဖြစ်ပါသည်။";

      situation =
        "လက်ရှိအခြေအနေမှာ အောက်ပါအတိုင်း ဖြစ်ပါသည်။\n\n" +
        input;

      impact =
        interpretation;

      if (percentage) {
        impact +=
          ` လက်ရှိ Achievement သည် ${percentage} ရှိနေပြီး ကျန်ရှိသည့် Target Gap ကို အချိန်မီ ဖြည့်ဆည်းနိုင်ရန် ပိုမိုအာရုံစိုက်ဆောင်ရွက်ရန် လိုအပ်ပါသည်။`;
      }

      if (days) {
        impact +=
          ` လက်ကျန် ${days} အတွင်း Daily Execution နှင့် Progress Monitoring ကို အထူးအလေးထားရန် လိုအပ်ပါသည်။`;
      }

      action =
        "လက်ရှိအခြေအနေကို Team Follow-up၊ Customer Visit၊ Market Execution နှင့် သက်ဆိုင်ရာ Stakeholder များနှင့် ပူးပေါင်းဆောင်ရွက်မှုများမှတစ်ဆင့် ဆက်လက်စောင့်ကြည့်ဆောင်ရွက်နေပါသည်။";

      next =
        "နောက်တစ်ဆင့်အနေဖြင့် လက်ရှိ Action Plan အတိုင်း ဆက်လက်ဆောင်ရွက်ပြီး ရလဒ်များကို ပုံမှန်စောင့်ကြည့်ကာ လိုအပ်သည့် Corrective Action များကို အချိန်မီ ဆောင်ရွက်သွားပါမည်။";

      request =
        "အဆိုပါကိစ္စနှင့် ပတ်သက်၍ လိုအပ်သော Guidance၊ Approval သို့မဟုတ် Support များ ပေးနိုင်ပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။";
    }


    return {
      background: background,
      situation: situation,
      details: detailsText,
      impact: impact,
      action: action,
      next: next,
      request: request,
      closing: L.closing,
      numbers: numbers
    };
  }


  /* =========================================================
     STANDARD EMAIL BUILDER
  ========================================================= */

  function buildStandardEmail(input, type, language) {

    const recipient =
      getRecipient();

    const sender =
      getSender();

    const company =
      getCompany();

    const detail =
      getDetail();

    const L =
      labels(language);

    const sections =
      buildDetailedSections(
        input,
        type,
        language
      );


    const subject =
      generateSubject(
        type,
        input
      );


    let body = "";


    if (language === "english") {

      body += `Dear ${recipient},\n\n`;

      body += getToneIntro(language) + "\n\n";

      body += `${L.background}:\n`;
      body += `${sections.background}\n\n`;

      body += `${L.situation}:\n`;
      body += `${sections.situation}\n\n`;

      if (detail !== "standard") {
        body += `${L.details}:\n`;
        body += `${sections.details}\n\n`;
      }

      body += `${L.impact}:\n`;
      body += `${sections.impact}\n\n`;

      body += `${L.action}:\n`;
      body += `${sections.action}\n\n`;

      body += `${L.next}:\n`;
      body += `${sections.next}\n\n`;

      body += `${L.request}:\n`;
      body += `${sections.request}\n\n`;

      body += `${sections.closing}\n\n`;

      body += "Best regards,\n";
      body += `${sender}`;

      if (company) {
        body += `\n${company}`;
      }

    } else if (language === "bilingual") {

      body += `Dear ${recipient},\n\n`;

      body += getToneIntro(language) + "\n\n";

      body += `${L.background}\n`;
      body += `${sections.background}\n\n`;

      body += `${L.situation}\n`;
      body += `${sections.situation}\n\n`;

      if (detail !== "standard") {
        body += `${L.details}\n`;
        body += `${sections.details}\n\n`;
      }

      body += `${L.impact}\n`;
      body += `${sections.impact}\n\n`;

      body += `${L.action}\n`;
      body += `${sections.action}\n\n`;

      body += `${L.next}\n`;
      body += `${sections.next}\n\n`;

      body += `${L.request}\n`;
      body += `${sections.request}\n\n`;

      body += `${sections.closing}\n\n`;

      body += "Best regards,\n";
      body += `${sender}`;

      if (company) {
        body += `\n${company}`;
      }

    } else {

      body += `သို့\n${recipient}\n\n`;

      body += `${getToneIntro(language)}\n\n`;

      body += `${L.background}:\n`;
      body += `${sections.background}\n\n`;

      body += `${L.situation}:\n`;
      body += `${sections.situation}\n\n`;

      if (detail !== "standard") {
        body += `${L.details}:\n`;
        body += `${sections.details}\n\n`;
      }

      body += `${L.impact}:\n`;
      body += `${sections.impact}\n\n`;

      body += `${L.action}:\n`;
      body += `${sections.action}\n\n`;

      body += `${L.next}:\n`;
      body += `${sections.next}\n\n`;

      body += `${L.request}:\n`;
      body += `${sections.request}\n\n`;

      body += `${sections.closing}\n\n`;

      body += "လေးစားစွာဖြင့်\n";
      body += `${sender}`;

      if (company) {
        body += `\n${company}`;
      }
    }


    return {
      subject: subject,
      body: body
    };
  }


  /* =========================================================
     PROMOTION EMAIL
  ========================================================= */

  function buildPromotionEmail(input, language) {

    const recipient =
      getRecipient();

    const sender =
      getSender();

    const company =
      getCompany();


    const lower =
      input.toLowerCase();


    const subject =
      "Promotion Proposal for Approval";


    let body = "";


    if (language === "english") {

      body += `Dear ${recipient},\n\n`;

      body +=
        "I would like to submit the following promotion proposal for your review and approval.\n\n";


      body += "1. Background\n";
      body +=
        "We would like to implement a focused promotion to improve sales movement, strengthen distributor and customer engagement, and support achievement of the business target during the proposed campaign period.\n\n";


      body += "2. Proposed Promotion\n";
      body +=
        `Based on the information provided, the proposed promotion is:\n\n${input}\n\n`;


      body += "3. Promotion Objective\n";
      body +=
        "The key objective is to generate incremental sales volume, improve product movement and provide an attractive commercial opportunity for the target customers or distributors.\n\n";


      body += "4. Offer / Mechanics\n";
      body +=
        "The promotion mechanics will be implemented according to the agreed commercial terms, eligibility criteria and approved quantity or volume requirements.\n\n";


      body += "5. Promotion Period\n";
      body +=
        "The proposed campaign period should be clearly communicated to all relevant customers, distributors and sales team members to ensure proper execution and control.\n\n";


      body += "6. Expected Business Impact\n";
      body +=
        "The activity is expected to support sales volume, customer engagement and target achievement. Performance should be monitored regularly to measure incremental sales and ensure that the promotion delivers the expected business return.\n\n";


      body += "7. Execution and Control\n";
      body +=
        "The sales team will communicate the promotion clearly, monitor customer participation, control the agreed mechanics and report progress during the campaign period.\n\n";


      body += "8. Approval Required\n";
      body +=
        "I would appreciate your review and approval to proceed with the proposed promotion. Any guidance regarding the commercial terms, eligibility or execution requirements would also be highly appreciated.\n\n";


      body += "9. Next Step\n";
      body +=
        "Once approval is received, we will communicate the final promotion mechanics to the relevant stakeholders and proceed with execution accordingly.\n\n";


      body +=
        "Thank you for your consideration. Please let me know if any additional information is required.\n\n";


      body += "Best regards,\n";
      body += sender;

      if (company) {
        body += `\n${company}`;
      }


      return {
        subject: subject,
        body: body
      };
    }


    if (language === "bilingual") {

      body += `Dear ${recipient},\n\n`;

      body +=
        "အောက်ပါ Promotion Proposal ကို review နှင့် approval ပြုလုပ်ပေးနိုင်ရန် တင်ပြလိုပါသည်။\n\n";


      body += "1. Background / နောက်ခံအခြေအနေ\n";
      body +=
        "Sales Volume တိုးတက်စေရန်၊ Customer / Distributor Engagement မြှင့်တင်ရန်နှင့် Business Target Achievement ကို support ပြုလုပ်ရန်အတွက် Promotion Activity တစ်ခုကို အကောင်အထည်ဖော်ရန် အဆိုပြုခြင်းဖြစ်ပါသည်။\n\n";


      body += "2. Proposed Promotion / အဆိုပြု Promotion\n";
      body += `${input}\n\n`;


      body += "3. Promotion Objective / ရည်ရွယ်ချက်\n";
      body +=
        "Incremental Sales Volume ရရှိရန်၊ Product Movement တိုးတက်ရန်နှင့် Customer / Distributor များအတွက် သင့်လျော်သော Commercial Opportunity ဖန်တီးရန် ဖြစ်ပါသည်။\n\n";


      body += "4. Promotion Mechanics / အကောင်အထည်ဖော်မည့်ပုံစံ\n";
      body +=
        "Promotion Mechanics ကို Approval ရရှိပြီးသည့် Commercial Terms နှင့် သတ်မှတ်ချက်များအတိုင်း ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။\n\n";


      body += "5. Expected Business Impact / မျှော်မှန်းရလဒ်\n";
      body +=
        "Sales Volume၊ Customer Engagement နှင့် Target Achievement များကို တိုးတက်စေရန် အထောက်အကူပြုမည်ဟု မျှော်မှန်းပါသည်။\n\n";


      body += "6. Execution Plan / ဆောင်ရွက်မည့်အစီအစဉ်\n";
      body +=
        "Sales Team မှ Promotion Mechanics များကို Customer / Distributor များထံ ရှင်းလင်းဆက်သွယ်ပြီး Participation နှင့် Sales Result များကို ပုံမှန်စောင့်ကြည့်သွားမည်ဖြစ်ပါသည်။\n\n";


      body += "7. Approval Required / ခွင့်ပြုချက်တောင်းခံခြင်း\n";
      body +=
        "အဆိုပါ Promotion ကို ဆက်လက်အကောင်အထည်ဖော်နိုင်ရန် Review နှင့် Approval ပေးနိုင်ပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။\n\n";


      body +=
        "Approval ရရှိပြီးပါက Final Promotion Mechanics များကို သက်ဆိုင်ရာ Stakeholder များထံ ဆက်လက်အသိပေးပြီး Execution ပြုလုပ်သွားပါမည်။\n\n";


      body += "Best regards,\n";
      body += sender;

      if (company) {
        body += `\n${company}`;
      }


      return {
        subject: subject,
        body: body
      };
    }


    body += `သို့\n${recipient}\n\n`;

    body +=
      "အောက်ပါ Promotion Proposal ကို Review နှင့် Approval ပြုလုပ်ပေးနိုင်ရန် တင်ပြလိုပါသည်။\n\n";


    body += "၁။ နောက်ခံအခြေအနေ\n";
    body +=
      "Sales Volume တိုးတက်စေရန်၊ Customer / Distributor Engagement မြှင့်တင်ရန်နှင့် Business Target Achievement ကို support ပြုလုပ်ရန်အတွက် Promotion Activity တစ်ခုကို အကောင်အထည်ဖော်ရန် အဆိုပြုခြင်းဖြစ်ပါသည်။\n\n";


    body += "၂။ အဆိုပြု Promotion\n";
    body +=
      `${input}\n\n`;


    body += "၃။ Promotion ရည်ရွယ်ချက်\n";
    body +=
      "Incremental Sales Volume ရရှိရန်၊ Product Movement တိုးတက်ရန်နှင့် Customer / Distributor များအတွက် သင့်လျော်သော Commercial Opportunity ဖန်တီးရန် ဖြစ်ပါသည်။\n\n";


    body += "၄။ Promotion Mechanics\n";
    body +=
      "Promotion Mechanics ကို Approval ရရှိပြီးသည့် Commercial Terms နှင့် သတ်မှတ်ချက်များအတိုင်း ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။\n\n";


    body += "၅။ Promotion Period\n";
    body +=
      "Promotion ကာလအတွင်း Sales Team နှင့် သက်ဆိုင်ရာ Distributor / Customer များမှ သတ်မှတ်ချက်များအတိုင်း အကောင်အထည်ဖော်ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။\n\n";


    body += "၆။ မျှော်မှန်းထားသော Business Impact\n";
    body +=
      "Sales Volume၊ Customer Engagement နှင့် Target Achievement များကို တိုးတက်စေရန် အထောက်အကူပြုမည်ဟု မျှော်မှန်းပါသည်။\n\n";


    body += "၇။ Execution နှင့် Control\n";
    body +=
      "Sales Team မှ Promotion Mechanics များကို Customer / Distributor များထံ ရှင်းလင်းဆက်သွယ်ပြီး Sales Result နှင့် Participation များကို ပုံမှန်စောင့်ကြည့်သွားမည်ဖြစ်ပါသည်။\n\n";


    body += "၈။ Approval တောင်းခံခြင်း\n";
    body +=
      "အဆိုပါ Promotion ကို ဆက်လက်အကောင်အထည်ဖော်နိုင်ရန် Review နှင့် Approval ပေးနိုင်ပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။\n\n";


    body += "၉။ Next Step\n";
    body +=
      "Approval ရရှိပြီးပါက Final Promotion Mechanics များကို သက်ဆိုင်ရာ Stakeholder များထံ ဆက်လက်အသိပေးပြီး Execution ပြုလုပ်သွားပါမည်။\n\n";


    body +=
      "လိုအပ်ပါက Promotion Details နှင့် Business Justification များကို ထပ်မံရှင်းလင်းတင်ပြပေးနိုင်ပါသည်။\n\n";


    body += "လေးစားစွာဖြင့်\n";
    body += sender;

    if (company) {
      body += `\n${company}`;
    }


    return {
      subject: subject,
      body: body
    };
  }


  /* =========================================================
     SPECIAL BUILDERS
  ========================================================= */

  function buildTargetEmail(input, language) {

    const percentage =
      detectPercentage(input);

    const days =
      detectDays(input);

    const result =
      buildStandardEmail(
        input,
        "target_gap",
        language
      );


    if (language === "english") {

      result.subject =
        "Sales Target Achievement and Recovery Action Update";

      result.body =
        result.body.replace(
          "Best regards,",
          (
            "\nManagement Focus:\n" +
            "The immediate focus will be to maximize the remaining selling days, prioritize high-potential customers, increase productive customer visits, strengthen team follow-up and monitor daily achievement against the required run rate." +
            (percentage ? ` Current achievement is ${percentage}.` : "") +
            (days ? ` ${days} remain for the recovery plan.` : "") +
            "\n\nBest regards,"
          )
        );

    } else {

      result.subject =
        "Sales Target Achievement နှင့် Recovery Action Update";

      result.body =
        result.body.replace(
          "လေးစားစွာဖြင့်",
          (
            "\nManagement Focus:\n" +
            "ကျန်ရှိသည့် Target Gap ကို ဖြည့်ဆည်းနိုင်ရန် High-Potential Customer များကို ဦးစားပေးပြီး Customer Visit တိုးမြှင့်ခြင်း၊ Team Follow-up ပြုလုပ်ခြင်းနှင့် Daily Sales Achievement ကို စောင့်ကြည့်ခြင်းတို့ကို အဓိကထား ဆောင်ရွက်သွားပါမည်။" +
            (percentage ? ` လက်ရှိ Achievement ${percentage} ဖြစ်ပါသည်။` : "") +
            (days ? ` ${days} အတွင်း Recovery Action ကို အာရုံစိုက်ဆောင်ရွက်သွားပါမည်။` : "") +
            "\n\nလေးစားစွာဖြင့်"
          )
        );
    }


    return result;
  }


  function buildCollectionEmail(input, language) {

    const result =
      buildStandardEmail(
        input,
        "collection",
        language
      );


    if (language === "english") {

      result.subject =
        "Outstanding Payment and Collection Follow-up";

      result.body =
        result.body.replace(
          "Best regards,",
          (
            "\nCollection Focus:\n" +
            "The outstanding balance will be followed up with the customer or distributor based on the agreed payment commitment. The relevant sales team members will continue to monitor the status and escalate any significant delay that may affect credit control or business continuity." +
            "\n\nBest regards,"
          )
        );

    } else {

      result.subject =
        "Outstanding Payment နှင့် Collection Follow-up";

      result.body =
        result.body.replace(
          "လေးစားစွာဖြင့်",
          (
            "\nCollection Focus:\n" +
            "Outstanding Balance ကို သတ်မှတ်ထားသော Payment Commitment အတိုင်း Customer / Distributor နှင့် ဆက်လက် Follow-up ပြုလုပ်သွားပါမည်။ Collection Delay ကြောင့် Credit Control သို့မဟုတ် Business Operation အပေါ် သက်ရောက်မှုရှိနိုင်ပါက သက်ဆိုင်ရာ Management ထံ အချိန်မီ Escalate ပြုလုပ်သွားပါမည်။" +
            "\n\nလေးစားစွာဖြင့်"
          )
        );
    }


    return result;
  }


  function buildDistributorEmail(input, language) {

    const result =
      buildStandardEmail(
        input,
        "distributor",
        language
      );


    result.subject =
      language === "english"
        ? "Distributor Business Update and Action Required"
        : "Distributor Business Update နှင့် လိုအပ်သော Action";


    return result;
  }


  /* =========================================================
     TYPE-SPECIFIC IMPROVEMENTS
  ========================================================= */

  function enhanceEmail(result, type, language) {

    if (!result) return result;


    if (type === "promotion") {
      return buildPromotionEmail(
        getInput(),
        language
      );
    }


    if (type === "target_gap") {
      return buildTargetEmail(
        getInput(),
        language
      );
    }


    if (type === "collection") {
      return buildCollectionEmail(
        getInput(),
        language
      );
    }


    if (type === "distributor") {
      return buildDistributorEmail(
        getInput(),
        language
      );
    }


    return result;
  }


  /* =========================================================
     GENERATE EMAIL
  ========================================================= */

  function generateEmail() {

    const input =
      getInput();

    const type =
      getType();

    const language =
      getLanguage();


    if (!input) {

      showToast(
        "Please write your short business situation first."
      );

      const inputEl =
        get("professionalEmailInput");

      if (inputEl) {
        inputEl.focus();
      }

      return null;
    }


    let result =
      buildStandardEmail(
        input,
        type,
        language
      );


    result =
      enhanceEmail(
        result,
        type,
        language
      );


    setValue(
      "professionalEmailSubject",
      result.subject
    );

    setValue(
      "professionalEmailOutput",
      result.body
    );


    saveHistory({
      type: type,
      subject: result.subject,
      input: input,
      body: result.body
    });


    showToast(
      "Professional email created successfully."
    );


    return result;
  }


  /* =========================================================
     REWRITE
  ========================================================= */

  function rewriteEmail() {

    const input =
      getInput();

    if (!input) {

      showToast(
        "Please enter your business situation first."
      );

      return;
    }


    const type =
      getType();

    const language =
      getLanguage();


    let improvedInput =
      input;


    improvedInput =
      improvedInput
        .replace(/\n+/g, ". ")
        .replace(/\s+/g, " ")
        .trim();


    if (
      !/[.!?။]$/.test(improvedInput)
    ) {
      improvedInput += ".";
    }


    setValue(
      "professionalEmailInput",
      improvedInput
    );


    generateEmail();

    showToast(
      "Email rewritten professionally."
    );
  }


  /* =========================================================
     CLEAR
  ========================================================= */

  function clearEmail() {

    setValue(
      "professionalEmailInput",
      ""
    );

    setValue(
      "professionalEmailSubject",
      ""
    );

    setValue(
      "professionalEmailOutput",
      ""
    );

    showToast(
      "Email writer cleared."
    );
  }


  /* =========================================================
     COPY
  ========================================================= */

  async function copyEmail() {

    const output =
      value("professionalEmailOutput");


    if (!output) {

      showToast(
        "There is no email to copy."
      );

      return;
    }


    const subject =
      value("professionalEmailSubject");


    const fullText =
      subject
        ? `Subject: ${subject}\n\n${output}`
        : output;


    try {

      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {

        await navigator.clipboard.writeText(
          fullText
        );

      } else {

        const textarea =
          document.createElement("textarea");

        textarea.value =
          fullText;

        textarea.style.position =
          "fixed";

        textarea.style.opacity =
          "0";

        document.body.appendChild(
          textarea
        );

        textarea.focus();

        textarea.select();

        document.execCommand(
          "copy"
        );

        textarea.remove();
      }


      showToast(
        "Email copied to clipboard."
      );

    } catch (error) {

      console.error(
        "Copy failed:",
        error
      );

      showToast(
        "Copy failed. Please select and copy manually."
      );
    }
  }


  /* =========================================================
     QUICK EXAMPLES
  ========================================================= */

  const EXAMPLES = {

    target:
      "ဒီလ sales target မပြည့်သေးဘူး။ လက်ရှိ 77% ရောက်နေတယ်။ 5 ရက်ကျန်တယ်။ Team ကို customer visit တိုးခိုင်းထားတယ်။ Target ပြည့်အောင် ကြိုးစားနေတယ်။",

    promotion:
      "ဒီလ distributor အတွက် promotion လုပ်ချင်တယ်။ Product A ကို 10 case ဝယ်ရင် 1 case free ပေးမယ်။ September 20 ကနေ 30 အထိ။ Sales volume တိုးဖို့ရည်ရွယ်တယ်။ Approval လိုတယ်။",

    collection:
      "Customer တစ်ယောက်မှာ outstanding payment 50 သိန်းရှိတယ်။ ဒီအပတ်ထဲ payment ပေးမယ်လို့ commitment ပေးထားတယ်။ Sales team က follow up လုပ်နေတယ်။",

    distributor:
      "Distributor မှာ stock လက်ကျန်နည်းနေတယ်။ ဒီအပတ် sales target ထိခိုက်နိုင်တယ်။ Stock replenishment လုပ်ဖို့လိုတယ်။ Management support လိုတယ်။"
  };


  function loadExample(type) {

    const text =
      EXAMPLES[type];

    if (!text) {
      return;
    }


    setValue(
      "professionalEmailInput",
      text
    );


    if (type === "target") {
      setValue(
        "professionalEmailType",
        "target_gap"
      );
    }

    if (type === "promotion") {
      setValue(
        "professionalEmailType",
        "promotion"
      );
    }

    if (type === "collection") {
      setValue(
        "professionalEmailType",
        "collection"
      );
    }

    if (type === "distributor") {
      setValue(
        "professionalEmailType",
        "distributor"
      );
    }


    showToast(
      "Example loaded. You can edit the notes before writing."
    );
  }


  /* =========================================================
     HISTORY
  ========================================================= */

  function getHistory() {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!raw) {
        return [];
      }

      const parsed =
        JSON.parse(raw);

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch (error) {

      console.error(
        "History read error:",
        error
      );

      return [];
    }
  }


  function saveHistory(item) {

    try {

      const history =
        getHistory();


      history.unshift({
        id:
          Date.now(),

        createdAt:
          new Date().toISOString(),

        ...item
      });


      const limited =
        history.slice(
          0,
          30
        );


      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(limited)
      );

    } catch (error) {

      console.error(
        "History save error:",
        error
      );
    }
  }


  /* =========================================================
     TOAST
  ========================================================= */

  let toastTimer = null;


  function showToast(message) {

    const toast =
      get("toast");

    const toastMessage =
      get("toastMessage");


    if (
      toast &&
      toastMessage
    ) {

      toastMessage.textContent =
        message;

      toast.classList.add(
        "show"
      );


      clearTimeout(
        toastTimer
      );


      toastTimer =
        setTimeout(
          function () {

            toast.classList.remove(
              "show"
            );

          },
          2500
        );

      return;
    }


    console.log(
      message
    );
  }


  /* =========================================================
     EVENTS
  ========================================================= */

  function bindEvents() {

    const writeBtn =
      get(
        "professionalEmailWriteBtn"
      );

    const rewriteBtn =
      get(
        "professionalEmailRewriteBtn"
      );

    const clearBtn =
      get(
        "professionalEmailClearBtn"
      );

    const copyBtn =
      get(
        "professionalEmailCopyBtn"
      );


    if (writeBtn) {

      writeBtn.addEventListener(
        "click",
        function () {

          generateEmail();

        }
      );
    }


    if (rewriteBtn) {

      rewriteBtn.addEventListener(
        "click",
        function () {

          rewriteEmail();

        }
      );
    }


    if (clearBtn) {

      clearBtn.addEventListener(
        "click",
        function () {

          clearEmail();

        }
      );
    }


    if (copyBtn) {

      copyBtn.addEventListener(
        "click",
        function () {

          copyEmail();

        }
      );
    }


    document
      .querySelectorAll(
        "[data-email-example]"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              loadExample(
                button.dataset.emailExample
              );

            }
          );

        }
      );


    const input =
      get(
        "professionalEmailInput"
      );


    if (input) {

      input.addEventListener(
        "keydown",
        function (event) {

          if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key === "Enter"
          ) {

            event.preventDefault();

            generateEmail();
          }

        }
      );
    }
  }


  /* =========================================================
     INIT
  ========================================================= */

  function init() {

    bindEvents();

    console.log(
      "Aung Professional Email Writer v3.0 loaded."
    );
  }


  /* =========================================================
     PUBLIC API
  ========================================================= */

  window.AungProfessionalEmail = {

    generate:
      generateEmail,

    rewrite:
      rewriteEmail,

    clear:
      clearEmail,

    copy:
      copyEmail,

    loadExample:
      loadExample,

    getHistory:
      getHistory,

    types:
      EMAIL_TYPES

  };


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

})();
