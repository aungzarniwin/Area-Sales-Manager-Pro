/* =========================================================
   AUNG SALES MANAGER PRO
   PROFESSIONAL EMAIL GENERATOR
   Version 3.0 Professional
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       CONFIG
       ===================================================== */

    const STORAGE_KEY =
        "asm_professional_email_history";

    const MAX_HISTORY = 20;

    /* =====================================================
       HELPERS
       ===================================================== */

    function byId(id) {
        return document.getElementById(id);
    }

    function value(id) {
        const el = byId(id);
        return el ? el.value.trim() : "";
    }

    function setValue(id, text) {
        const el = byId(id);

        if (el) {
            el.value = text || "";
        }
    }

    function escapeHtml(text) {
        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showToast(message, type) {
        if (
            window.AungSalesManager &&
            typeof window.AungSalesManager.showToast ===
                "function"
        ) {
            window.AungSalesManager.showToast(
                message,
                type || "success"
            );
            return;
        }

        const toast = byId("toast");

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.remove(
            "show",
            "success",
            "error",
            "warning"
        );

        if (type) {
            toast.classList.add(type);
        }

        requestAnimationFrame(function () {
            toast.classList.add("show");
        });

        clearTimeout(window.__emailToastTimer);

        window.__emailToastTimer =
            setTimeout(function () {
                toast.classList.remove("show");
            }, 2800);
    }

    /* =====================================================
       EMAIL TYPES
       ===================================================== */

    const EMAIL_TYPES = {
        target: {
            label: "Sales Target / Achievement",
            subject:
                "Sales Target & Achievement Update"
        },

        promotion: {
            label: "Promotion / Trade Activity",
            subject:
                "Request for Promotion / Trade Activity"
        },

        collection: {
            label: "Collection Follow-up",
            subject:
                "Payment Collection Follow-up"
        },

        distributor: {
            label: "Distributor Issue",
            subject:
                "Distributor Business Update / Issue"
        },

        sales: {
            label: "Sales Performance",
            subject:
                "Sales Performance Update"
        },

        meeting: {
            label: "Meeting Request",
            subject:
                "Meeting Request"
        },

        market: {
            label: "Market Update",
            subject:
                "Market Update & Key Observations"
        },

        stock: {
            label: "Stock / Supply Issue",
            subject:
                "Stock Availability / Supply Issue"
        },

        customer: {
            label: "Customer Issue",
            subject:
                "Customer Issue & Required Action"
        },

        report: {
            label: "Management Report",
            subject:
                "Sales Management Report"
        },

        forecast: {
            label: "Sales Forecast",
            subject:
                "Sales Forecast Update"
        },

        request: {
            label: "Business Request",
            subject:
                "Business Request"
        },

        feedback: {
            label: "Feedback",
            subject:
                "Business Feedback"
        },

        appreciation: {
            label: "Appreciation",
            subject:
                "Thank You & Appreciation"
        },

        escalation: {
            label: "Issue Escalation",
            subject:
                "Business Issue Escalation"
        }
    };

    /* =====================================================
       TONES
       ===================================================== */

    const TONES = {
        professional: {
            label: "Professional"
        },

        polite: {
            label: "Polite & Professional"
        },

        firm: {
            label: "Firm & Action-Oriented"
        },

        friendly: {
            label: "Friendly Professional"
        },

        management: {
            label: "Management Level"
        }
    };

    /* =====================================================
       LANGUAGES
       ===================================================== */

    const LANGUAGES = {
        english: "English",
        myanmar: "Myanmar",
        bilingual: "English + Myanmar"
    };

    /* =====================================================
       NUMBER / PERCENTAGE DETECTION
       ===================================================== */

    function detectNumbers(text) {
        const result = {
            percentages: [],
            amounts: [],
            days: [],
            numbers: []
        };

        const percentMatches =
            text.match(
                /\d+(?:\.\d+)?\s*%/g
            );

        const amountMatches =
            text.match(
                /(?:MMK|Ks|ကျပ်|\$)\s*[\d,]+(?:\.\d+)?/gi
            );

        const dayMatches =
            text.match(
                /\d+\s*(?:days?|ရက်)/gi
            );

        const numberMatches =
            text.match(
                /\b\d+(?:\.\d+)?\b/g
            );

        result.percentages =
            percentMatches || [];

        result.amounts =
            amountMatches || [];

        result.days =
            dayMatches || [];

        result.numbers =
            numberMatches || [];

        return result;
    }

    /* =====================================================
       SUBJECT GENERATOR
       ===================================================== */

    function generateSubject(
        type,
        detail
    ) {
        const company =
            value("professionalEmailCompany");

        const recipient =
            value("professionalEmailRecipient");

        const info =
            detectNumbers(detail);

        let base =
            EMAIL_TYPES[type]
                ? EMAIL_TYPES[type].subject
                : "Business Update";

        if (type === "target") {
            if (info.percentages.length) {
                base =
                    "Sales Target Achievement Update - " +
                    info.percentages[0];
            }
        }

        if (type === "collection") {
            base =
                "Payment Collection Follow-up";
        }

        if (type === "promotion") {
            base =
                "Request for Promotion / Trade Activity";
        }

        if (type === "distributor") {
            base =
                "Distributor Business Update & Required Action";
        }

        if (type === "forecast") {
            base =
                "Sales Forecast Update";
        }

        if (company) {
            return base + " - " + company;
        }

        if (recipient) {
            return base;
        }

        return base;
    }

    /* =====================================================
       GREETING
       ===================================================== */

    function getGreeting(
        language,
        tone,
        recipient
    ) {
        const name =
            recipient || "Team";

        if (language === "myanmar") {
            return (
                "မင်္ဂလာပါ " +
                name +
                " ခင်ဗျာ၊"
            );
        }

        if (language === "bilingual") {
            return (
                "Dear " +
                name +
                ",\n\n" +
                "မင်္ဂလာပါ " +
                name +
                " ခင်ဗျာ၊"
            );
        }

        if (tone === "friendly") {
            return (
                "Hi " +
                name +
                ","
            );
        }

        return (
            "Dear " +
            name +
            ","
        );
    }

    /* =====================================================
       CLOSING
       ===================================================== */

    function getClosing(
        language,
        tone,
        sender
    ) {
        const name =
            sender || "Aung Zar Ni Win";

        if (language === "myanmar") {
            return (
                "ကျေးဇူးတင်ပါတယ် ခင်ဗျာ။\n\n" +
                "Best Regards,\n" +
                name
            );
        }

        if (language === "bilingual") {
            return (
                "ကျေးဇူးတင်ပါတယ် ခင်ဗျာ။\n\n" +
                "Best Regards,\n" +
                name
            );
        }

        if (tone === "friendly") {
            return (
                "Thank you for your support.\n\n" +
                "Best Regards,\n" +
                name
            );
        }

        return (
            "Thank you for your support and consideration.\n\n" +
            "Best Regards,\n" +
            name
        );
    }

    /* =====================================================
       ENGLISH BUILDERS
       ===================================================== */

    function buildEnglishEmail(
        type,
        detail,
        tone,
        recipient,
        sender
    ) {
        const greeting =
            getGreeting(
                "english",
                tone,
                recipient
            );

        const closing =
            getClosing(
                "english",
                tone,
                sender
            );

        const info =
            detectNumbers(detail);

        let body = "";

        switch (type) {

            case "target":
                body =
                    "I would like to provide an update regarding our current sales target and achievement.\n\n" +
                    "Based on the latest performance, the current situation is as follows:\n\n" +
                    detail +
                    "\n\n" +
                    "The key focus areas are to close the remaining gap, strengthen daily execution, and ensure that the team remains aligned with the monthly target.\n\n" +
                    "I will continue to monitor the progress closely and take the necessary actions to improve achievement.";

                break;

            case "promotion":
                body =
                    "I would like to request your consideration for the proposed promotion / trade activity.\n\n" +
                    "Details of the proposal are as follows:\n\n" +
                    detail +
                    "\n\n" +
                    "This activity is expected to support sales growth, improve outlet execution, and strengthen our market position.\n\n" +
                    "Kindly review the proposal and share your approval or feedback.";

                break;

            case "collection":
                body =
                    "I would like to follow up regarding the outstanding payment collection.\n\n" +
                    "Current details are as follows:\n\n" +
                    detail +
                    "\n\n" +
                    "As the outstanding amount may affect our business operations and credit control, I would appreciate your support in completing the collection within the agreed timeline.\n\n" +
                    "Please let me know if there are any issues requiring further discussion.";

                break;

            case "distributor":
                body =
                    "I would like to provide an update regarding the current distributor situation.\n\n" +
                    "Key details are as follows:\n\n" +
                    detail +
                    "\n\n" +
                    "The main concern is to ensure business continuity, stock availability, financial discipline, and effective market execution.\n\n" +
                    "I recommend that we review the issue and agree on the required corrective actions as soon as possible.";

                break;

            case "sales":
                body =
                    "Please find below the latest sales performance update.\n\n" +
                    detail +
                    "\n\n" +
                    "Based on the current performance, we will continue focusing on target achievement, distribution expansion, productivity, and execution quality.\n\n" +
                    "I will closely monitor the key performance indicators and take corrective action where required.";

                break;

            case "meeting":
                body =
                    "I would like to request a meeting to discuss the following business matters:\n\n" +
                    detail +
                    "\n\n" +
                    "The objective of the meeting is to align on priorities, clarify responsibilities, and agree on the required next steps.\n\n" +
                    "Please let me know your convenient time.";

                break;

            case "market":
                body =
                    "I would like to share the latest market update and key observations.\n\n" +
                    detail +
                    "\n\n" +
                    "The key implications for our business are related to market demand, competitor activity, pricing, distribution, and execution.\n\n" +
                    "We should continue monitoring these developments closely and adjust our market strategy where necessary.";

                break;

            case "stock":
                body =
                    "I would like to highlight the current stock / supply situation.\n\n" +
                    detail +
                    "\n\n" +
                    "The issue may affect sales execution and customer service if it is not resolved promptly.\n\n" +
                    "Kindly support the required action to ensure sufficient stock availability and business continuity.";

                break;

            case "customer":
                body =
                    "I would like to report the following customer issue for your attention.\n\n" +
                    detail +
                    "\n\n" +
                    "Our priority is to resolve the issue professionally while maintaining a strong customer relationship.\n\n" +
                    "Please advise on the appropriate action or support required.";

                break;

            case "report":
                body =
                    "Please find below the sales management update for your review.\n\n" +
                    detail +
                    "\n\n" +
                    "The report highlights the current business performance, key issues, opportunities, and required actions.\n\n" +
                    "I will continue to follow up on the agreed action points and provide further updates as required.";

                break;

            case "forecast":
                body =
                    "I would like to share the latest sales forecast based on current market conditions and team performance.\n\n" +
                    detail +
                    "\n\n" +
                    "The forecast will be monitored against actual performance, market movement, stock availability, and team execution.\n\n" +
                    "I will update the forecast when there are significant changes in the business outlook.";

                break;

            case "request":
                body =
                    "I would like to request your support regarding the following business matter.\n\n" +
                    detail +
                    "\n\n" +
                    "Your support will help us improve execution and achieve the required business objectives.\n\n" +
                    "Kindly review and advise on the next steps.";

                break;

            case "feedback":
                body =
                    "I would like to share the following feedback for your consideration.\n\n" +
                    detail +
                    "\n\n" +
                    "The objective is to identify improvement opportunities and strengthen our business execution.\n\n" +
                    "I would appreciate your feedback and guidance.";

                break;

            case "appreciation":
                body =
                    "I would like to sincerely thank you for your support and contribution.\n\n" +
                    detail +
                    "\n\n" +
                    "Your support has made a meaningful contribution to our business performance and team execution.\n\n" +
                    "I truly appreciate your continued cooperation.";

                break;

            case "escalation":
                body =
                    "I would like to escalate the following business issue for your attention and support.\n\n" +
                    detail +
                    "\n\n" +
                    "The issue requires timely action to minimize business impact and maintain operational continuity.\n\n" +
                    "Kindly review and advise on the appropriate next steps.";

                break;

            default:
                body =
                    "I would like to share the following business update for your review.\n\n" +
                    detail +
                    "\n\n" +
                    "Please review the information and advise on the required next steps.";
        }

        /*
         * Tone adjustment
         */

        if (tone === "firm") {
            body +=
                "\n\nTo ensure timely execution, I recommend that the required actions are confirmed and followed up within the agreed timeline.";
        }

        if (tone === "management") {
            body +=
                "\n\nFrom a management perspective, the key priorities are execution discipline, accountability, business impact, and measurable results.";
        }

        return (
            greeting +
            "\n\n" +
            body +
            "\n\n" +
            closing
        );
    }

    /* =====================================================
       MYANMAR BUILDERS
       ===================================================== */

    function buildMyanmarEmail(
        type,
        detail,
        tone,
        recipient,
        sender
    ) {
        const greeting =
            getGreeting(
                "myanmar",
                tone,
                recipient
            );

        const closing =
            getClosing(
                "myanmar",
                tone,
                sender
            );

        let body = "";

        switch (type) {

            case "target":
                body =
                    "လက်ရှိ Sales Target နှင့် Achievement အခြေအနေကို Update ပေးလိုပါတယ်။\n\n" +
                    "လက်ရှိအခြေအနေမှာ အောက်ပါအတိုင်း ဖြစ်ပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ကျန်ရှိနေတဲ့ Target Gap ကို ဖြည့်ဆည်းနိုင်ရန် Daily Execution၊ Team Productivity နဲ့ Market Coverage ကို ပိုမိုအာရုံစိုက်သွားပါမယ်။";

                break;

            case "promotion":
                body =
                    "အောက်ပါ Promotion / Trade Activity အတွက် Approval နှင့် Support တောင်းခံလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ဒီ Activity က Sales Growth၊ Outlet Execution နဲ့ Market Position တိုးတက်စေရန် အထောက်အကူပြုနိုင်မယ်လို့ ယုံကြည်ပါတယ်။\n\n" +
                    "သုံးသပ်ပေးပြီး လိုအပ်တဲ့ Feedback / Approval ပြန်လည်ပေးစေလိုပါတယ်။";

                break;

            case "collection":
                body =
                    "Outstanding Payment Collection နဲ့ပတ်သက်ပြီး Follow-up ပြုလုပ်လိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Payment Delay ဖြစ်နေပါက Business Operation နဲ့ Credit Control အပေါ် သက်ရောက်မှုရှိနိုင်တဲ့အတွက် သတ်မှတ်ထားတဲ့ Timeline အတွင်း Collection ပြီးစီးနိုင်ရန် Support ပေးစေလိုပါတယ်။";

                break;

            case "distributor":
                body =
                    "လက်ရှိ Distributor Business Situation ကို Update ပေးလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Business Continuity၊ Stock Availability၊ Financial Discipline နဲ့ Market Execution တို့ကို အဓိကထားပြီး ဖြေရှင်းရန်လိုအပ်ပါတယ်။\n\n" +
                    "လိုအပ်တဲ့ Corrective Action တွေကို အမြန်ဆုံး သဘောတူညီပြီး ဆောင်ရွက်နိုင်ရန် အကြံပြုလိုပါတယ်။";

                break;

            case "sales":
                body =
                    "လက်ရှိ Sales Performance Update ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Target Achievement၊ Distribution Expansion၊ Team Productivity နဲ့ Execution Quality တို့ကို ဆက်လက်အာရုံစိုက်သွားပါမယ်။";

                break;

            case "meeting":
                body =
                    "အောက်ပါ Business Matters များကို ဆွေးနွေးရန် Meeting တစ်ခု ပြုလုပ်လိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Meeting ရဲ့ ရည်ရွယ်ချက်က Priority တွေကို Alignment လုပ်ပြီး Responsibility နဲ့ Next Steps တွေကို သတ်မှတ်ရန် ဖြစ်ပါတယ်။\n\n" +
                    "အဆင်ပြေမယ့်အချိန်ကို ပြန်လည်အသိပေးပေးစေလိုပါတယ်။";

                break;

            case "market":
                body =
                    "လက်ရှိ Market Situation နဲ့ Key Market Observation တွေကို Update ပေးလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Market Demand၊ Competitor Activity၊ Pricing၊ Distribution နဲ့ Execution အခြေအနေတွေကို ဆက်လက်စောင့်ကြည့်ပြီး လိုအပ်သလို Strategy ပြောင်းလဲသွားရန်လိုအပ်ပါတယ်။";

                break;

            case "stock":
                body =
                    "လက်ရှိ Stock / Supply Situation ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ဒီအခြေအနေက Sales Execution နဲ့ Customer Service အပေါ် သက်ရောက်မှုရှိနိုင်တဲ့အတွက် Stock Availability ကို အမြန်ဆုံး ဖြေရှင်းပေးနိုင်ရန် Support တောင်းခံလိုပါတယ်။";

                break;

            case "customer":
                body =
                    "Customer Issue တစ်ခုကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Customer Relationship ကို ထိန်းသိမ်းထားနိုင်ပြီး Issue ကို Professional Way နဲ့ ဖြေရှင်းနိုင်ရန် လိုအပ်တဲ့ Action ကို ဆောင်ရွက်ပေးစေလိုပါတယ်။";

                break;

            case "report":
                body =
                    "လက်ရှိ Sales Management Update ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ဒီ Report မှာ Business Performance၊ Key Issues၊ Opportunities နဲ့ Required Actions တွေကို အဓိကဖော်ပြထားပါတယ်။";

                break;

            case "forecast":
                body =
                    "လက်ရှိ Market Condition နဲ့ Team Performance ကို အခြေခံပြီး Sales Forecast Update ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Actual Performance၊ Market Movement၊ Stock Availability နဲ့ Team Execution အပေါ်မူတည်ပြီး Forecast ကို ဆက်လက် Update ပြုလုပ်သွားပါမယ်။";

                break;

            case "request":
                body =
                    "အောက်ပါ Business Matter နဲ့ပတ်သက်ပြီး Support တောင်းခံလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ဒီ Support ရရှိပါက Business Execution နဲ့ Target Achievement ကို ပိုမိုကောင်းမွန်စွာ ဆောင်ရွက်နိုင်မယ်လို့ ယုံကြည်ပါတယ်။";

                break;

            case "feedback":
                body =
                    "အောက်ပါ Business Feedback ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Business Execution ကို ပိုမိုကောင်းမွန်စေရန် Improvement Opportunity တွေကို ရှာဖွေဖော်ထုတ်နိုင်ဖို့ ရည်ရွယ်ပါတယ်။";

                break;

            case "appreciation":
                body =
                    "လက်ရှိ Business နဲ့ Team Execution အတွက် ပေးအပ်ခဲ့တဲ့ Support နဲ့ Contribution တွေအတွက် အထူးကျေးဇူးတင်ရှိပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "ဆက်လက်ပူးပေါင်းဆောင်ရွက်ပေးမှုအတွက်လည်း အထူးကျေးဇူးတင်ပါတယ်။";

                break;

            case "escalation":
                body =
                    "အောက်ပါ Business Issue ကို အရေးကြီးစွာ တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "Business Impact များ မဖြစ်ပေါ်စေရန် သတ်မှတ်ထားတဲ့ Timeline အတွင်း လိုအပ်တဲ့ Action ကို ဆောင်ရွက်ပေးနိုင်ရန် Support တောင်းခံလိုပါတယ်။";

                break;

            default:
                body =
                    "အောက်ပါ Business Update ကို တင်ပြလိုပါတယ်။\n\n" +
                    detail +
                    "\n\n" +
                    "အချက်အလက်များကို သုံးသပ်ပေးပြီး လိုအပ်တဲ့ Next Steps များကို လမ်းညွှန်ပေးစေလိုပါတယ်။";
        }

        if (tone === "firm") {
            body +=
                "\n\nလုပ်ငန်းဆောင်ရွက်မှု မနှောင့်နှေးစေရန် လိုအပ်သော Action များကို သတ်မှတ်ထားသည့် Timeline အတွင်း အကောင်အထည်ဖော်ရန် အကြံပြုလိုပါတယ်။";
        }

        if (tone === "management") {
            body +=
                "\n\nManagement Perspective အရ Execution Discipline၊ Accountability၊ Business Impact နဲ့ Measurable Results တို့ကို အဓိကထားဆောင်ရွက်ရန် လိုအပ်ပါတယ်။";
        }

        return (
            greeting +
            "\n\n" +
            body +
            "\n\n" +
            closing
        );
    }

    /* =====================================================
       BILINGUAL BUILDER
       ===================================================== */

    function buildBilingualEmail(
        type,
        detail,
        tone,
        recipient,
        sender
    ) {
        const english =
            buildEnglishEmail(
                type,
                detail,
                tone,
                recipient,
                sender
            );

        const myanmar =
            buildMyanmarEmail(
                type,
                detail,
                tone,
                recipient,
                sender
            );

        return (
            english +
            "\n\n" +
            "────────────────────\n" +
            "မြန်မာဘာသာ Version\n" +
            "────────────────────\n\n" +
            myanmar
        );
    }

    /* =====================================================
       EMAIL GENERATOR
       ===================================================== */

    function generateEmail(mode) {

        const type =
            value("professionalEmailType") ||
            "sales";

        const tone =
            value("professionalEmailTone") ||
            "professional";

        const language =
            value("professionalEmailLanguage") ||
            "english";

        const recipient =
            value("professionalEmailRecipient") ||
            "Management Team";

        const sender =
            value("professionalEmailSender") ||
            "Aung Zar Ni Win";

        const detail =
            value("professionalEmailDetail") ||
            value("professionalEmailInput");

        if (!detail) {
            showToast(
                "Please enter the email details first.",
                "warning"
            );

            const input =
                byId("professionalEmailDetail") ||
                byId("professionalEmailInput");

            if (input) {
                input.focus();
            }

            return;
        }

        let email = "";

        if (language === "myanmar") {
            email =
                buildMyanmarEmail(
                    type,
                    detail,
                    tone,
                    recipient,
                    sender
                );
        }

        else if (
            language === "bilingual"
        ) {
            email =
                buildBilingualEmail(
                    type,
                    detail,
                    tone,
                    recipient,
                    sender
                );
        }

        else {
            email =
                buildEnglishEmail(
                    type,
                    detail,
                    tone,
                    recipient,
                    sender
                );
        }

        /*
         * Rewrite mode
         */

        if (mode === "rewrite") {
            email =
                rewriteEmail(
                    email,
                    tone,
                    language
                );
        }

        const subject =
            generateSubject(
                type,
                detail
            );

        setValue(
            "professionalEmailSubject",
            subject
        );

        const output =
            byId("professionalEmailOutput");

        if (output) {
            /*
             * Supports textarea,
             * div, pre and contenteditable.
             */

            if (
                output.tagName === "TEXTAREA" ||
                output.tagName === "INPUT"
            ) {
                output.value = email;
            } else {
                output.textContent = email;
            }

            output.dataset.emailText =
                email;
        }

        showEmailActions();

        saveHistory({
            type: type,
            tone: tone,
            language: language,
            recipient: recipient,
            subject: subject,
            body: email,
            createdAt:
                new Date().toISOString()
        });

        showToast(
            mode === "rewrite"
                ? "Email rewritten successfully."
                : "Professional email generated.",
            "success"
        );
    }

    /* =====================================================
       REWRITE
       ===================================================== */

    function rewriteEmail(
        email,
        tone,
        language
    ) {
        let result =
            String(email || "").trim();

        /*
         * Remove unnecessary duplicate spaces.
         */

        result =
            result.replace(
                /[ \t]+/g,
                " "
            );

        result =
            result.replace(
                /\n{3,}/g,
                "\n\n"
            );

        if (tone === "firm") {
            if (
                !result.includes(
                    "required action"
                ) &&
                language !== "myanmar"
            ) {
                result +=
                    "\n\nPlease ensure that the required action is completed within the agreed timeline.";
            }
        }

        if (
            tone === "professional" &&
            language === "english"
        ) {
            result =
                result.replace(
                    /\bI want\b/gi,
                    "I would like"
                );

            result =
                result.replace(
                    /\bYou need to\b/gi,
                    "Please ensure that"
                );

            result =
                result.replace(
                    /\bASAP\b/gi,
                    "at the earliest opportunity"
                );
        }

        return result;
    }

    /* =====================================================
       QUICK EXAMPLES
       ===================================================== */

    const QUICK_EXAMPLES = {

        target:
            "Monthly target is 100,000 cases and current achievement is 82,000 cases. We have 5 days remaining. The team needs to close the remaining gap through focused outlet coverage and daily execution.",

        promotion:
            "We would like to propose a promotion for key outlets during the upcoming period. The activity is expected to increase volume, improve visibility and support achievement of the monthly target.",

        collection:
            "Distributor outstanding payment is MMK 15,000,000 and the agreed payment date has already passed. We need to follow up and complete collection within the next 3 days.",

        distributor:
            "The distributor is currently facing stock pressure and cash-flow challenges. This may affect market supply and sales execution. We need to agree on the corrective action and recovery plan."
    };

    function loadQuickExample(type) {

        const text =
            QUICK_EXAMPLES[type];

        if (!text) {
            return;
        }

        setValue(
            "professionalEmailDetail",
            text
        );

        setValue(
            "professionalEmailInput",
            text
        );

        const typeSelect =
            byId("professionalEmailType");

        if (
            typeSelect &&
            EMAIL_TYPES[type]
        ) {
            typeSelect.value = type;
        }

        showToast(
            "Example loaded.",
            "success"
        );
    }

    /* =====================================================
       COPY
       ===================================================== */

    function getOutputText() {

        const output =
            byId("professionalEmailOutput");

        if (!output) {
            return "";
        }

        if (
            output.tagName === "TEXTAREA" ||
            output.tagName === "INPUT"
        ) {
            return output.value.trim();
        }

        return (
            output.dataset.emailText ||
            output.innerText ||
            output.textContent ||
            ""
        ).trim();
    }

    async function copyEmail() {

        const text =
            getOutputText();

        if (!text) {
            showToast(
                "There is no email to copy.",
                "warning"
            );

            return;
        }

        try {

            await navigator.clipboard.writeText(
                text
            );

            showToast(
                "Email copied to clipboard.",
                "success"
            );

        } catch (error) {

            /*
             * Fallback for older browsers
             */

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value = text;

            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.focus();
            textarea.select();

            try {
                document.execCommand(
                    "copy"
                );

                showToast(
                    "Email copied.",
                    "success"
                );
            } catch (copyError) {
                showToast(
                    "Copy failed. Please select and copy manually.",
                    "error"
                );
            }

            document.body.removeChild(
                textarea
            );
        }
    }

    /* =====================================================
       CLEAR
       ===================================================== */

    function clearEmail() {

        setValue(
            "professionalEmailSender",
            ""
        );

        setValue(
            "professionalEmailRecipient",
            ""
        );

        setValue(
            "professionalEmailCompany",
            ""
        );

        setValue(
            "professionalEmailDetail",
            ""
        );

        setValue(
            "professionalEmailInput",
            ""
        );

        setValue(
            "professionalEmailSubject",
            ""
        );

        const output =
            byId("professionalEmailOutput");

        if (output) {

            if (
                output.tagName === "TEXTAREA" ||
                output.tagName === "INPUT"
            ) {
                output.value = "";
            } else {
                output.textContent = "";
            }

            output.dataset.emailText = "";
        }

        hideEmailActions();

        showToast(
            "Email form cleared.",
            "success"
        );
    }

    /* =====================================================
       ACTION VISIBILITY
       ===================================================== */

    function showEmailActions() {

        const actions =
            byId(
                "professionalEmailActions"
            );

        if (actions) {
            actions.style.display =
                "flex";
        }
    }

    function hideEmailActions() {

        const actions =
            byId(
                "professionalEmailActions"
            );

        if (actions) {
            actions.style.display =
                "none";
        }
    }

    /* =====================================================
       HISTORY
       ===================================================== */

    function getHistory() {

        try {

            const data =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!data) {
                return [];
            }

            const parsed =
                JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {
            return [];
        }
    }

    function saveHistory(item) {

        const history =
            getHistory();

        history.unshift(item);

        if (
            history.length >
            MAX_HISTORY
        ) {
            history.splice(
                MAX_HISTORY
            );
        }

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(history)
            );

        } catch (error) {
            console.warn(
                "Unable to save email history."
            );
        }
    }

    /* =====================================================
       SELECT OPTIONS
       ===================================================== */

    function populateSelect(
        selectId,
        data,
        fallbackValue
    ) {

        const select =
            byId(selectId);

        if (!select) {
            return;
        }

        /*
         * Do not destroy existing options
         * if HTML already contains them.
         */

        if (
            select.options.length <= 1
        ) {

            select.innerHTML =
                '<option value="">Select...</option>';

            Object.keys(data).forEach(
                function (key) {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value = key;

                    option.textContent =
                        data[key].label ||
                        data[key];

                    select.appendChild(
                        option
                    );
                }
            );
        }

        if (
            fallbackValue &&
            !select.value
        ) {
            select.value =
                fallbackValue;
        }
    }

    /* =====================================================
       QUICK EXAMPLE BUTTONS
       ===================================================== */

    function bindQuickExamples() {

        $$(
            "[data-email-example]"
        ).forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const type =
                            button.getAttribute(
                                "data-email-example"
                            );

                        loadQuickExample(
                            type
                        );
                    }
                );
            }
        );
    }

    /* =====================================================
       MAIN BUTTONS
       ===================================================== */

    function bindMainButtons() {

        const writeButton =
            byId(
                "professionalEmailWriteBtn"
            );

        if (writeButton) {
            writeButton.addEventListener(
                "click",
                function () {
                    generateEmail(
                        "write"
                    );
                }
            );
        }

        const rewriteButton =
            byId(
                "professionalEmailRewriteBtn"
            );

        if (rewriteButton) {
            rewriteButton.addEventListener(
                "click",
                function () {
                    generateEmail(
                        "rewrite"
                    );
                }
            );
        }

        const clearButton =
            byId(
                "professionalEmailClearBtn"
            );

        if (clearButton) {
            clearButton.addEventListener(
                "click",
                clearEmail
            );
        }

        const copyButton =
            byId(
                "professionalEmailCopyBtn"
            );

        if (copyButton) {
            copyButton.addEventListener(
                "click",
                copyEmail
            );
        }
    }

    /* =====================================================
       TYPE CHANGE
       ===================================================== */

    function bindTypeChange() {

        const select =
            byId(
                "professionalEmailType"
            );

        if (!select) {
            return;
        }

        select.addEventListener(
            "change",
            function () {

                const type =
                    select.value;

                const subject =
                    generateSubject(
                        type,
                        value(
                            "professionalEmailDetail"
                        )
                    );

                setValue(
                    "professionalEmailSubject",
                    subject
                );
            }
        );
    }

    /* =====================================================
       INPUT SYNC
       ===================================================== */

    function bindInputSync() {

        const detail =
            byId(
                "professionalEmailDetail"
            );

        const input =
            byId(
                "professionalEmailInput"
            );

        if (detail && input) {

            detail.addEventListener(
                "input",
                function () {

                    input.value =
                        detail.value;
                }
            );

            input.addEventListener(
                "input",
                function () {

                    detail.value =
                        input.value;
                }
            );
        }
    }

    /* =====================================================
       SUBJECT AUTO UPDATE
       ===================================================== */

    function bindSubjectUpdate() {

        const detail =
            byId(
                "professionalEmailDetail"
            );

        const type =
            byId(
                "professionalEmailType"
            );

        if (!detail) {
            return;
        }

        function update() {

            const typeValue =
                type
                    ? type.value
                    : "sales";

            const subject =
                generateSubject(
                    typeValue,
                    detail.value
                );

            setValue(
                "professionalEmailSubject",
                subject
            );
        }

        detail.addEventListener(
            "input",
            update
        );

        if (type) {
            type.addEventListener(
                "change",
                update
            );
        }
    }

    /* =====================================================
       KEYBOARD SHORTCUT
       ===================================================== */

    function bindKeyboard() {

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Ctrl + Enter
                 * Generate email
                 */

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {
                    const page =
                        byId(
                            "page-professional-email"
                        );

                    if (
                        page &&
                        page.classList.contains(
                            "active"
                        )
                    ) {
                        event.preventDefault();

                        generateEmail(
                            "write"
                        );
                    }
                }
            }
        );
    }

    /* =====================================================
       INIT
       ===================================================== */

    function initProfessionalEmail() {

        populateSelect(
            "professionalEmailType",
            EMAIL_TYPES,
            "sales"
        );

        populateSelect(
            "professionalEmailTone",
            TONES,
            "professional"
        );

        populateSelect(
            "professionalEmailLanguage",
            LANGUAGES,
            "english"
        );

        bindMainButtons();

        bindQuickExamples();

        bindTypeChange();

        bindInputSync();

        bindSubjectUpdate();

        bindKeyboard();

        hideEmailActions();

        console.log(
            "Aung Professional Email initialized."
        );
    }

    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.AungProfessionalEmail = {

        generate:
            generateEmail,

        rewrite:
            function () {
                generateEmail(
                    "rewrite"
                );
            },

        clear:
            clearEmail,

        copy:
            copyEmail,

        loadExample:
            loadQuickExample,

        getHistory:
            getHistory,

        emailTypes:
            EMAIL_TYPES,

        tones:
            TONES,

        languages:
            LANGUAGES
    };

    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initProfessionalEmail
        );

    } else {

        initProfessionalEmail();
    }

})();
