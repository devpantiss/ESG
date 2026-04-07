export const registrationConfig = {
  formId: "esg_summit_registration_2026",
  defaultLang: "en",
  supportedLanguages: ["en", "hi"],
  title: {
    en: "India ESG Summit 2026 Registration",
    hi: "इंडिया ESG समिट 2026: पंजीकरण प्रपत्र",
  },
  steps: [
    {
      id: "step_1_info",
      type: "info",
      title: {
        en: "About the Summit",
        hi: "सम्मेलन के बारे में",
      },
      content: {
        heading: {
          en: "India ESG Summit 2026",
          hi: "इंडिया ESG समिट 2026",
        },
        description: {
          en: "The India ESG Summit 2026, organized by the India ESG Alliance and AFC India in collaboration with the Government of Uttar Pradesh, aims to strengthen Uttar Pradesh’s position as a global manufacturing and export hub by enabling MSMEs to adopt Environmental, Social, and Governance (ESG) standards. This is organised in coordination with with industry associations such as  Indian Industries Association (IIA),  Dalit Indian Chamber of Commerce and Industry (DICCI),  Laghu Udyog Bharti (LUB) and others. The registration fee for the summit has been set at INR 1000, significantly reduced from the standard INR 5000, as a special concession to encourage participation from MSMEs in Uttar Pradesh. As global markets increasingly demand responsible and sustainable supply chains, the summit will bring together policymakers, industry leaders, investors, and experts to equip high-potential MSMEs with practical knowledge, tools, and partnerships required to access international markets. Through expert sessions, the launch of the India ESG Handbook, investor dialogues, and strategic networking, the summit seeks to transform ESG from a compliance requirement into a powerful driver of export competitiveness, investment attraction, and sustainable industrial growth.",
          hi: "इंडिया ESG समिट 2026, जिसे इंडिया ESG एलायंस और AFC इंडिया द्वारा उत्तर प्रदेश सरकार के सहयोग से आयोजित किया जा रहा है, का उद्देश्य उत्तर प्रदेश को एक वैश्विक विनिर्माण और निर्यात केंद्र के रूप में सशक्त बनाना है। यह समिट MSMEs को पर्यावरण, सामाजिक और शासन (ESG) मानकों को अपनाने में सक्षम बनाकर इस लक्ष्य को प्राप्त करने का प्रयास करता है। इस समिट के लिए पंजीकरण शुल्क ₹1000 निर्धारित किया गया है, जो सामान्यतः ₹5000 होता है, परंतु उत्तर प्रदेश के MSMEs को प्रोत्साहित करने हेतु इसे विशेष रूप से रियायती दर पर रखा गया है। यह आयोजन भारतीय उद्योग संघ (IIA), दलित इंडियन चैंबर ऑफ कॉमर्स एंड इंडस्ट्री (DICCI), लघु उद्योग भारती (LUB) तथा अन्य उद्योग संगठनों के समन्वय में आयोजित किया जा रहा है। जैसे-जैसे वैश्विक बाजार जिम्मेदार और टिकाऊ सप्लाई चेन की मांग बढ़ा रहे हैं, यह समिट नीति-निर्माताओं, उद्योग नेताओं, निवेशकों और विशेषज्ञों को एक मंच पर लाएगा। इसका उद्देश्य उच्च क्षमता वाले MSMEs को अंतरराष्ट्रीय बाजारों तक पहुंच बनाने के लिए आवश्यक व्यावहारिक ज्ञान, उपकरण और साझेदारियां प्रदान करना है। विशेषज्ञ सत्रों, इंडिया ESG हैंडबुक के शुभारंभ, निवेशक संवाद और रणनीतिक नेटवर्किंग के माध्यम से, यह समिट ESG को केवल अनुपालन आवश्यकता से आगे बढ़ाकर निर्यात प्रतिस्पर्धा, निवेश आकर्षण और सतत औद्योगिक विकास का एक मजबूत साधन बनाने का प्रयास करता है।",
        },
        feeInfo: {
          en: "Registration Fee: ₹5000 (inclusive of taxes). Concessional fee for MSMEs in Uttar Pradesh: ₹1000.",
          hi: "पंजीकरण शुल्क: ₹5000 (कर सहित)। उत्तर प्रदेश के MSMEs के लिए रियायती शुल्क: ₹1000।",
        },
      },
    },
    {
      id: "step_2_details",
      type: "form",
      title: {
        en: "Basic Details",
        hi: "मूल विवरण",
      },
      fields: [
        {
          name: "representativeType",
          type: "select",
          required: true,
          label: {
            en: "Representative As",
            hi: "प्रतिनिधि के रूप में",
          },
          options: [
            { en: "MSME", hi: "MSME" },
            { en: "Large Corporate / PSU", hi: "बड़ी कॉर्पोरेट / PSU" },
            { en: "Solution Provider", hi: "समाधान प्रदाता" },
            { en: "Government", hi: "सरकार" },
            { en: "Academia", hi: "अकादमिक क्षेत्र" },
            { en: "Researcher / Student", hi: "शोधकर्ता / छात्र" },
            { en: "NGO", hi: "NGO" },
            { en: "Other", hi: "अन्य" },
          ],
        },
        {
          name: "name",
          type: "text",
          required: true,
          label: {
            en: "Full Name",
            hi: "नाम",
          },
        },
        {
          name: "mobile",
          type: "tel",
          required: true,
          label: {
            en: "Mobile Number",
            hi: "मोबाइल नंबर",
          },
        },
        {
          name: "email",
          type: "email",
          required: true,
          label: {
            en: "Email Address",
            hi: "ईमेल पता",
          },
        },
        {
          name: "company",
          type: "text",
          required: true,
          label: {
            en: "Organization / Company Name",
            hi: "संगठन / कंपनी का नाम",
          },
        },
        {
          name: "sector",
          type: "select",
          required: true,
          label: {
            en: "Sector",
            hi: "क्षेत्र (सेक्टर)",
          },
          options: [
            { en: "Manufacturing", hi: "विनिर्माण" },
            { en: "Services", hi: "सेवाएं" },
            { en: "Energy", hi: "ऊर्जा" },
            { en: "Infrastructure", hi: "इन्फ्रास्ट्रक्चर" },
            { en: "Agri / Food Processing", hi: "कृषि / फूड प्रोसेसिंग" },
            { en: "Other", hi: "अन्य" },
          ],
        },
        {
          name: "designation",
          type: "text",
          required: true,
          label: {
            en: "Designation / Position",
            hi: "पदनाम / स्थिति",
          },
        },
        {
          name: "city",
          type: "text",
          required: true,
          label: {
            en: "Office City",
            hi: "कार्यालय का शहर",
          },
        },
        {
          name: "state",
          type: "text",
          required: true,
          label: {
            en: "Office State",
            hi: "कार्यालय का राज्य",
          },
        },
        {
          name: "exportExperience",
          type: "select",
          required: true,
          label: {
            en: "Experience in Exports",
            hi: "निर्यात में आपका अनुभव",
          },
          options: [
            { en: "More than 5 years", hi: "5 वर्ष से अधिक" },
            { en: "Less than 5 years", hi: "5 वर्ष से कम" },
            { en: "Interested in exports", hi: "निर्यात करने में रुचि रखते हैं" },
            { en: "Other", hi: "अन्य" },
          ],
        },
        {
          name: "areaOfInterest",
          type: "select",
          required: true,
          label: {
            en: "Area of Interest",
            hi: "रुचि का क्षेत्र",
          },
          options: [
            { en: "Ficci", hi: "Ficci" },
            { en: "Lavodya", hi: "Lavodya" },
            { en: "IIA", hi: "IIA" },
            { en: "Govt. Industry Department", hi: "सरकारी उद्योग विभाग" },
            { en: "Any other", hi: "अन्य" },
          ],
        },
        {
          name: "reference",
          type: "text",
          label: {
            en: "Reference",
            hi: "संदर्भ",
          },
        },
        {
          name: "participantsCount",
          type: "select",
          required: true,
          label: {
            en: "Participants from Organization",
            hi: "आपके संगठन से कितने प्रतिभागी आएंगे",
          },
          options: [
            { en: "1", hi: "1" },
            { en: "3", hi: "3" },
            { en: "5", hi: "5" },
            { en: "Above 5", hi: "5 से अधिक" },
          ],
        },
        {
          name: "exhibitionInterest",
          type: "select",
          required: true,
          label: {
            en: "Interested in Exhibition?",
            hi: "क्या आप प्रदर्शनी में भाग लेने के इच्छुक हैं?",
          },
          options: [
            { en: "Yes", hi: "हाँ" },
            { en: "No", hi: "नहीं" },
          ],
        },
        {
          name: "accessibilitySupport",
          type: "select",
          required: true,
          label: {
            en: "Need Accessibility Support?",
            hi: "क्या आपको सहायता की आवश्यकता है?",
          },
          options: [
            { en: "Yes", hi: "हाँ" },
            { en: "No", hi: "नहीं" },
          ],
        },
      ],
    },
    {
      id: "step_3_payment",
      type: "payment",
      title: {
        en: "Payment Details",
        hi: "भुगतान विवरण",
      },
      paymentDetails: {
        amount: 5000,
        currency: "INR",
        accountName: "KUTUMB ASPIRATION PRIVATE LIMITED",
        bankName: "ICICI Bank",
        branch: "Delhi Naraina Vihar",
        accountNumber: "033505003652",
        ifsc: "ICIC0000335",
        upiId: "8976020243.eazypay@icici",
        description: {
          en: "Scan the QR code or transfer the amount using the bank details below, then upload your payment screenshot.",
          hi: "QR कोड स्कैन करें या नीचे दिए गए बैंक विवरणों का उपयोग करके भुगतान करें, फिर भुगतान का स्क्रीनशॉट अपलोड करें।",
        },
        supportNote: {
          en: "Your registration will remain pending until an admin verifies the uploaded payment screenshot.",
          hi: "अपलोड किए गए भुगतान स्क्रीनशॉट को admin द्वारा verify करने तक आपका पंजीकरण pending रहेगा।",
        },
      },
      fields: [
        {
          name: "paymentProof",
          type: "file",
          required: true,
          label: {
            en: "Upload Payment Screenshot",
            hi: "भुगतान स्क्रीनशॉट अपलोड करें",
          },
        },
      ],
    },
  ],
};

export function getLocalizedText(value, lang) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[lang] ?? value.en ?? "";
}

export const registrationSteps = registrationConfig.steps;

export const questionLabelMap = registrationConfig.steps.reduce((labels, step) => {
  if (!step.fields) return labels;

  step.fields.forEach((field) => {
    labels[field.name] = field.label;
  });

  return labels;
}, {});
