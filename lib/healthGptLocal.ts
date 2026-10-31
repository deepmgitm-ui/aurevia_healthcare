type Treatment = {
  name: string;
  keywords: string[];
  overview: string;
  procedure: string;
  benefits: string;
  eligibility: string;
  recovery: string;
};

const CONTACT_LINKS = "[contact Aurevia](/contact), [book a free consultation](/free-consultation), [call +91 99909 59440](tel:+919990959440), [WhatsApp](https://wa.me/919990959440), or [email info@aureviahealthcare.com](mailto:info@aureviahealthcare.com)";
const DISCLAIMER = "This is general information, not a diagnosis or medical advice. Please consult a qualified healthcare professional for personal guidance.";
const CITIES = "Chandigarh, Delhi NCR, Ghaziabad, Noida, Mumbai, Pune, Telangana, and Ahmedabad";

const treatments: Treatment[] = [
  {
    name: "LASIK",
    keywords: ["lasik", "eye power", "eyesight", "glasses", "spectacles", "refractive", "nazar", "chashma"],
    overview: "LASIK is a refractive eye procedure used to correct vision problems.",
    procedure: "A specialist creates a thin corneal flap, reshapes the underlying corneal tissue with a laser, and repositions the flap.",
    benefits: "Published benefits include quick vision improvement, less dependence on glasses, and a generally pain-free procedure.",
    eligibility: "Aurevia lists adults over 18 with stable vision as the starting eligibility; an eye specialist must confirm suitability after examination.",
    recovery: "Most patients notice improved vision within about 24 hours, though individual recovery varies.",
  },
  {
    name: "Cataract surgery",
    keywords: ["cataract", "clouded lens", "cloudy vision", "motiyabind", "मोतीबिंद"],
    overview: "Cataract surgery removes a clouded natural eye lens and replaces it with an artificial lens.",
    procedure: "Through a tiny incision, the clouded lens is removed—commonly with ultrasound—and a replacement lens is placed.",
    benefits: "Published benefits include clearer vision, improved quality of life, and a short procedure.",
    eligibility: "It may be relevant when cataract significantly affects vision; an eye specialist confirms timing and suitability.",
    recovery: "Vision commonly begins improving within a few days, with follow-up as advised by the surgeon.",
  },
  {
    name: "Sinus treatment / FESS",
    keywords: ["sinus", "fess", "sinusitis", "blocked nose", "nasal blockage", "नाक बंद"],
    overview: "FESS is a minimally invasive procedure used for selected chronic sinus problems.",
    procedure: "A thin endoscope is passed through the nostrils to open or treat affected sinus passages.",
    benefits: "Published benefits include relief from chronic headaches, improved breathing, and fewer sinus infections.",
    eligibility: "It may be relevant for chronic sinusitis that needs specialist assessment.",
    recovery: "Mild congestion can be common for around a week.",
  },
  {
    name: "Tonsillectomy",
    keywords: ["tonsillectomy", "tonsil", "tonsillitis", "throat infection", "गले"],
    overview: "Tonsillectomy is the surgical removal of the tonsils.",
    procedure: "The tonsils are removed by an ENT surgeon using the approach appropriate to the patient.",
    benefits: "Published benefits include fewer recurrent throat infections, relief from related breathing problems, and better sleep quality.",
    eligibility: "It may be considered for children or adults with frequent tonsillitis after ENT assessment.",
    recovery: "Throat pain is commonly expected for 1–2 weeks.",
  },
  {
    name: "Septoplasty",
    keywords: ["septoplasty", "deviated septum", "nasal septum", "crooked septum", "breathing nose"],
    overview: "Septoplasty is a corrective procedure that straightens a deviated nasal septum.",
    procedure: "The surgeon works through the nostrils to trim or reposition cartilage.",
    benefits: "Published benefits include improved breathing, reduced snoring, and fewer sinus infections.",
    eligibility: "It may be relevant when a deviated septum causes breathing difficulty; an ENT specialist must assess it.",
    recovery: "Swelling generally reduces over about a week.",
  },
  {
    name: "Tympanoplasty",
    keywords: ["tympanoplasty", "ear perforation", "eardrum", "ruptured ear", "कान का पर्दा"],
    overview: "Tympanoplasty repairs a perforated or ruptured eardrum.",
    procedure: "A tissue graft from the ear-area tissue is used to repair the eardrum.",
    benefits: "Published benefits include improved hearing, reduced infections, and protection from water entering the middle ear.",
    eligibility: "It may be relevant for a perforated eardrum after an ENT examination.",
    recovery: "Full hearing improvement may take around 6–8 weeks.",
  },
  {
    name: "Rhinoplasty",
    keywords: ["rhinoplasty", "nose job", "nose shape", "नाक की shape", "नाक shape"],
    overview: "Rhinoplasty changes or restores the shape and, in some cases, function of the nose.",
    procedure: "The surgeon reshapes the nose through incisions inside the nostrils or across the base, depending on the plan.",
    benefits: "Published benefits include improved facial harmony, correction of birth-related concerns, and possible breathing improvement.",
    eligibility: "Aurevia lists people with fully grown facial bones; a specialist must assess goals and suitability.",
    recovery: "A splint is commonly worn for about a week, with further healing over time.",
  },
  {
    name: "Gynecomastia surgery",
    keywords: ["gynecomastia", "male breast", "man boobs", "enlarged chest", "male chest"],
    overview: "Male breast reduction surgery treats persistent enlarged male breast tissue.",
    procedure: "The specialist removes excess fat and/or glandular tissue; the exact approach depends on assessment.",
    benefits: "Published benefits include a flatter chest contour and improved confidence.",
    eligibility: "It may be relevant for men with persistent enlargement after specialist evaluation.",
    recovery: "Compression garments are commonly worn for a few weeks.",
  },
  {
    name: "Kidney stone removal (RIRS / PCNL)",
    keywords: ["kidney stone", "rirs", "pcnl", "renal stone", "गुर्दे की पथरी", "पथरी"],
    overview: "RIRS and PCNL are minimally invasive pathways used to remove selected kidney stones.",
    procedure: "RIRS reaches the stone with a flexible scope through the urinary passage; PCNL removes stones through a small access tract, based on specialist planning.",
    benefits: "Published benefits include pain relief, minimally invasive treatment, and effective stone removal.",
    eligibility: "These options may be relevant for larger or otherwise suitable stones; stone size and location guide the urologist's choice.",
    recovery: "The published hospital stay is typically around 1–2 days, but recovery depends on the procedure and patient.",
  },
  {
    name: "Dental treatments",
    keywords: ["dental", "tooth", "teeth", "dentist", "implant", "root canal", "rct", "दांत"],
    overview: "Aurevia's dental pathway includes treatments such as implants and root canals.",
    procedure: "The procedure depends on the problem; for example, an implant uses a titanium post, while root-canal treatment cleans and seals an infected tooth.",
    benefits: "Published benefits include restored chewing, relief from tooth pain, and an improved smile.",
    eligibility: "It may be relevant for tooth decay or missing teeth after a dentist's examination.",
    recovery: "Recovery varies by the exact dental procedure.",
  },
  {
    name: "Liposuction",
    keywords: ["liposuction", "body contour", "stubborn fat", "fat removal"],
    overview: "Liposuction is a body-contouring procedure for targeted fat removal.",
    procedure: "The specialist selects the technique according to the area being treated and the patient's assessment.",
    benefits: "Published benefits include improved body contour and targeted fat reduction.",
    eligibility: "Suitability is assessed case by case by a cosmetic specialist.",
    recovery: "Recovery is procedure-specific and should follow the treating specialist's plan.",
  },
  {
    name: "Lipoma removal",
    keywords: ["lipoma", "fatty lump", "soft lump", "गांठ"],
    overview: "Lipoma removal is a minor surgical pathway for removing a benign fatty lump when clinically appropriate.",
    procedure: "A specialist examines the lump and removes it using the recommended surgical approach.",
    benefits: "Published benefits include removal of the lump and a low recurrence risk.",
    eligibility: "A clinical examination is needed because not every lump is a lipoma.",
    recovery: "Recovery is usually short and guided by the treating specialist.",
  },
  {
    name: "Hernia repair",
    keywords: ["hernia", "groin bulge", "abdominal bulge", "पेट में उभार"],
    overview: "Hernia repair treats tissue pushing through a weak area in the abdominal wall or groin.",
    procedure: "A surgeon may plan an open or laparoscopic repair depending on the type of hernia and individual case.",
    benefits: "The pathway repairs the hernia and provides a planned recovery route.",
    eligibility: "A general surgeon must examine the bulge and confirm the diagnosis and treatment plan.",
    recovery: "Recovery depends on the repair type and individual case.",
  },
  {
    name: "Orthopedic care",
    keywords: ["orthopedic", "orthopaedic", "bone", "joint", "knee", "spine", "fracture", "sports injury", "ligament", "हड्डी", "घुटना"],
    overview: "Orthopedic care covers bones, joints, ligaments, tendons, spine conditions, fractures, and sports injuries.",
    procedure: "Aurevia coordinates specialist evaluation, imaging review, hospital planning, and procedure guidance where needed.",
    benefits: "The care pathway is matched to the condition and specialist assessment.",
    eligibility: "The appropriate orthopedic specialist assesses suitability for non-surgical or surgical care.",
    recovery: "Recovery and rehabilitation are specific to the diagnosis and procedure.",
  },
];

const generalTreatments = [
  {
    name: "Hair transplant",
    keywords: ["hair transplant", "hair restoration"],
    explanation: "Hair transplantation moves suitable hair follicles—commonly from the back or sides of the scalp—to thinning areas. It is usually an outpatient procedure; temporary redness, swelling, or shedding can occur, and visible growth takes time. Suitability depends on the cause and pattern of hair loss.",
  },
  {
    name: "IVF",
    keywords: ["ivf", "in vitro fertilization", "fertility treatment"],
    explanation: "IVF is a fertility treatment in which eggs are collected, fertilized in a laboratory, and an embryo may then be transferred to the uterus. It involves medicines, monitoring, egg retrieval, and follow-up; success and risks depend strongly on individual factors and need fertility-specialist counselling.",
  },
  {
    name: "Appendectomy",
    keywords: ["appendectomy", "appendix surgery", "appendicitis"],
    explanation: "Appendectomy is surgery to remove an inflamed appendix, commonly by a laparoscopic or open approach. Recovery depends on the surgical method and whether complications are present. Suspected appendicitis needs prompt in-person medical evaluation.",
  },
  {
    name: "Gallbladder surgery",
    keywords: ["gallbladder", "gall stone", "gallstone", "cholecystectomy"],
    explanation: "Cholecystectomy removes the gallbladder, often for symptomatic gallstones, and is commonly performed laparoscopically. Recovery varies by approach; bleeding, infection, bile-duct injury, and anaesthesia-related problems are among the risks a surgeon discusses.",
  },
  {
    name: "Piles treatment",
    keywords: ["piles", "hemorrhoid", "haemorrhoid", "fissure", "fistula"],
    explanation: "Piles, fissures, and fistulas are different conditions around the anal area. Treatment may range from medicines and lifestyle measures to office procedures or surgery, depending on the diagnosis and severity; an examination is important before choosing treatment.",
  },
  {
    name: "Varicose-vein treatment",
    keywords: ["varicose", "vein treatment"],
    explanation: "Varicose-vein treatment may use compression, injections, laser or radiofrequency closure, or surgery. The choice depends on symptoms and ultrasound findings; temporary bruising or discomfort and less-common clotting or nerve effects should be discussed with a vascular specialist.",
  },
  {
    name: "Bariatric surgery",
    keywords: ["bariatric", "weight loss surgery", "gastric sleeve", "gastric bypass"],
    explanation: "Bariatric surgery changes the stomach and sometimes the digestive route to support weight loss in selected patients. It requires careful eligibility review, nutrition planning, long-term follow-up, and discussion of surgical and nutritional risks.",
  },
  {
    name: "Cancer treatment",
    keywords: ["cancer treatment", "chemotherapy", "radiotherapy", "radiation therapy", "immunotherapy"],
    explanation: "Cancer treatment can include surgery, medicines such as chemotherapy or immunotherapy, and radiation therapy. The correct plan depends on cancer type, stage, tests, and the person's health, so an oncology team must design it individually.",
  },
  {
    name: "Dialysis",
    keywords: ["dialysis", "hemodialysis", "haemodialysis"],
    explanation: "Dialysis filters waste and extra fluid from the blood when kidneys cannot do so adequately. The method and schedule are prescribed by a kidney specialist, with monitoring for blood-pressure changes, infection, and access-related problems.",
  },
  {
    name: "Physiotherapy",
    keywords: ["physiotherapy", "physical therapy", "rehabilitation"],
    explanation: "Physiotherapy uses assessed exercises, movement training, education, and selected physical techniques to improve function and manage pain. The program and recovery timeline depend on the diagnosis, goals, and response to therapy.",
  },
];

function normalize(value: string) {
  return value.toLocaleLowerCase("en-IN").replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function isHinglish(value: string) {
  return /[\u0900-\u097f]/.test(value) || /\b(bhai|batao|kya|kaise|kyu|kyon|hai|hain|mera|meri|mujhe|karna|hoga|chahiye|kitna|kahan|wala|wali)\b/i.test(value);
}

function findTreatment(value: string) {
  return treatments.find((treatment) => includesAny(value, treatment.keywords));
}

function findGeneralTreatment(value: string) {
  return generalTreatments.find((treatment) => includesAny(value, treatment.keywords));
}

function treatmentAnswer(treatment: Treatment, hinglish: boolean, personal: boolean) {
  const details = hinglish
    ? `${treatment.name} aapke concern ke liye relevant ho sakta hai, lekin final suitability specialist examination ke baad hi confirm hoti hai.\n\n• Kya hai: ${treatment.overview}\n• Procedure: ${treatment.procedure}\n• Benefits: ${treatment.benefits}\n• Eligibility: ${treatment.eligibility}\n• Recovery: ${treatment.recovery}`
    : `${treatment.name} may be relevant, but a specialist must confirm suitability after an examination.\n\n• Overview: ${treatment.overview}\n• Procedure: ${treatment.procedure}\n• Benefits: ${treatment.benefits}\n• Eligibility: ${treatment.eligibility}\n• Recovery: ${treatment.recovery}`;

  const nextStep = hinglish
    ? `\n\nPersonal guidance ke liye ${CONTACT_LINKS}.`
    : `\n\nFor personal guidance, ${CONTACT_LINKS}.`;

  return `${details}${personal ? `\n\n${DISCLAIMER}` : ""}${nextStep}`;
}

function isPersonalMedicalQuestion(value: string) {
  return includesAny(value, [
    "my ", "i have", "i am", "i'm", "should i", "can i", "pain", "symptom", "problem", "meri", "mera", "mujhe", "dard", "takleef", "suitable", "eligible",
  ]);
}

function looksLikeTreatmentQuestion(value: string) {
  return includesAny(value, [
    "treatment", "surgery", "procedure", "therapy", "operation", "transplant", "ectomy", "plasty", "scopy", "इलाज", "ट्रीटमेंट", "ऑपरेशन", "ka ilaj", "ka ilaaj",
  ]);
}

function extractPossibleTreatmentName(question: string) {
  const cleaned = question
    .replace(/\b(what|who|when|where|why|how|is|are|does|do|can|could|please|tell|explain|about|treatment|surgery|procedure|therapy|operation|info|information|details|recovery|risk|risks|benefits|cost|price|kya|hai|ka|ki|ke|bare|mein|batao|bataiye|mujhe|bhai)\b/gi, " ")
    .replace(/[^a-zA-Z\u0900-\u097f\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 60) || "this treatment";
}

function emergencyAnswer(hinglish: boolean) {
  return hinglish
    ? "Yeh emergency ho sakti hai. Abhi local emergency services ko call karein ya nearest emergency department jaayein—online reply ka wait na karein. Agar possible ho, paas ke kisi trusted person ko turant batayein."
    : "This may be an emergency. Call your local emergency services or go to the nearest emergency department now—do not wait for an online response. If possible, alert a trusted person nearby immediately.";
}

function unlistedAnswer(name: string, explanation: string | undefined, hinglish: boolean) {
  const education = explanation ?? (hinglish
    ? `${name} ka purpose, technique, eligibility, risks aur recovery exact diagnosis aur procedure par depend karte hain. Safe decision ke liye relevant qualified specialist se assessment zaroori hai.`
    : `The purpose, technique, eligibility, risks, and recovery for ${name} depend on the exact diagnosis and procedure. An assessment by the relevant qualified specialist is needed for safe guidance.`);

  return hinglish
    ? `General educational information: ${education}\n\nYeh treatment abhi Aurevia ki published treatment list mein listed nahi hai, isliye availability confirm karne ke liye ${CONTACT_LINKS}.\n\n${DISCLAIMER}`
    : `General educational information: ${education}\n\nThis treatment is not currently listed in Aurevia's published treatment information. To confirm whether the team can help, ${CONTACT_LINKS}.\n\n${DISCLAIMER}`;
}

export function getHealthGptResponse(question: string, recentContext = "") {
  const normalizedQuestion = normalize(question);
  const normalizedContext = normalize(recentContext);
  const hinglish = isHinglish(question);

  if (includesAny(normalizedQuestion, [
    "chest pain", "difficulty breathing", "can't breathe", "cannot breathe", "unconscious", "stroke", "face drooping", "severe bleeding", "suicidal", "kill myself", "heart attack", "बेहोश", "सांस नहीं", "सीने में दर्द", "खून नहीं रुक",
  ])) {
    return emergencyAnswer(hinglish);
  }

  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(question) || /(?<!\d)\+?\d[\d\s().-]{7,}\d(?!\d)/.test(question) || /\b\d{12}\b/.test(question)) {
    return hinglish
      ? `Privacy ke liye chat mein phone number, email, ID, reports ya payment details share na karein. Main sirf general information de sakta hoon; secure help ke liye ${CONTACT_LINKS}.`
      : `For your privacy, please don't share phone numbers, email addresses, IDs, reports, or payment details in chat. I can continue with general information; for secure help, ${CONTACT_LINKS}.`;
  }

  if (includesAny(normalizedQuestion, ["your name", "who are you", "naam kya", "aap kaun", "tum kaun"])) {
    return hinglish
      ? "Main Health GPT hoon—Aurevia Healthcare ka virtual health guide. Main treatments, care process, locations aur consultation preparation par general guidance deta hoon."
      : "I'm Health GPT, Aurevia Healthcare's virtual health guide. I provide general guidance about treatments, the care process, locations, and consultation preparation.";
  }

  if (/^(hi|hello|hey|namaste|hii+|hello bhai|hi bhai)[!. ]*$/i.test(question.trim())) {
    return hinglish
      ? "Namaste! Main Health GPT hoon. Aap treatment, symptoms ke relevant care pathway, Aurevia locations, ya consultation process ke baare mein pooch sakte hain."
      : "Hello! I'm Health GPT. You can ask about treatments, a relevant care pathway for a health concern, Aurevia locations, or the consultation process.";
  }

  if (includesAny(normalizedQuestion, ["city", "cities", "location", "locations", "where available", "service area", "kahan", "shehar"])) {
    return hinglish
      ? `Aurevia ki published service locations hain: ${CITIES}. Apne city ki current availability confirm karne ke liye [contact Aurevia](/contact) ya [free consultation book karein](/free-consultation).`
      : `Aurevia's published service locations are ${CITIES}. To confirm current availability in your city, [contact Aurevia](/contact) or [book a free consultation](/free-consultation).`;
  }

  if (includesAny(normalizedQuestion, ["contact", "phone", "number", "whatsapp", "email", "support", "call", "baat kar", "sampark"])) {
    return hinglish
      ? `Aurevia support se yahan connect karein: ${CONTACT_LINKS}.`
      : `You can reach Aurevia support here: ${CONTACT_LINKS}.`;
  }

  if (includesAny(normalizedQuestion, ["care process", "how it works", "process work", "kaise kaam", "procedure kya hai"])) {
    return hinglish
      ? "Aurevia ka care flow simple hai: concern share karein → suitable independent specialist/hospital pathway samjhein → consultation aur records review → treatment planning aur coordination → procedure ke baad guided follow-up. Start karne ke liye [free consultation book karein](/free-consultation)."
      : "Aurevia's care flow is: share your concern → understand the relevant independent specialist/hospital pathway → consultation and record review → treatment planning and coordination → guided follow-up. [Book a free consultation](/free-consultation) to begin.";
  }

  if (includesAny(normalizedQuestion, ["prepare", "consultation", "appointment", "kya lekar", "documents", "reports"])) {
    return hinglish
      ? "Consultation ke liye relevant reports/scans, current medicines ki list, allergies, previous treatment history, aur apne main questions ready rakhein. Chat mein private records upload na karein; team aapko secure sharing process batayegi. [Free consultation book karein](/free-consultation)."
      : "For a consultation, keep relevant reports/scans, a medicine and allergy list, previous treatment history, and your main questions ready. Don't upload private records in chat; the team can explain a secure sharing process. [Book a free consultation](/free-consultation).";
  }

  if (includesAny(normalizedQuestion, ["insurance", "cashless", "claim", "covered", "policy"])) {
    return hinglish
      ? `Insurance/cashless eligibility insurer, policy aur selected hospital par depend karti hai. Current verification ke liye policy details chat mein share na karein; ${CONTACT_LINKS}.`
      : `Insurance or cashless eligibility depends on the insurer, policy, and selected hospital. Don't share policy details in chat; for current verification, ${CONTACT_LINKS}.`;
  }

  if (includesAny(normalizedQuestion, ["all treatment", "list treatment", "treatments available", "kaun se treatment", "any treatment"])) {
    const names = treatments.map(({ name }) => name).join(", ");
    return hinglish
      ? `Aurevia ki published treatment categories hain: ${names}. Aap apna concern ya treatment ka naam likhein—main overview, procedure, eligibility aur recovery samjha dunga.`
      : `Aurevia's published treatment categories are: ${names}. Tell me the treatment name or general concern and I'll explain its overview, procedure, eligibility, and recovery.`;
  }

  let matchedTreatment = findTreatment(normalizedQuestion);
  const isShortFollowUp = includesAny(normalizedQuestion, ["recovery", "benefit", "eligible", "procedure", "risk", "kitna time", "what about", "and "]) && normalizedQuestion.length < 80;
  if (!matchedTreatment && isShortFollowUp) matchedTreatment = findTreatment(normalizedContext);
  if (matchedTreatment) {
    return treatmentAnswer(matchedTreatment, hinglish, isPersonalMedicalQuestion(normalizedQuestion));
  }

  const generalTreatment = findGeneralTreatment(normalizedQuestion);
  if (generalTreatment) {
    return unlistedAnswer(generalTreatment.name, generalTreatment.explanation, hinglish);
  }

  if (looksLikeTreatmentQuestion(normalizedQuestion)) {
    return unlistedAnswer(extractPossibleTreatmentName(question), undefined, hinglish);
  }

  return hinglish
    ? `Main Health GPT hoon aur Aurevia treatments, care process, locations aur consultation preparation mein help karta hoon. Apna treatment ya health concern thoda clearly likhein; personal case ke liye ${CONTACT_LINKS}.`
    : `I'm Health GPT and can help with Aurevia treatments, care process, locations, and consultation preparation. Please share the treatment name or describe the concern in general terms; for personal help, ${CONTACT_LINKS}.`;
}
