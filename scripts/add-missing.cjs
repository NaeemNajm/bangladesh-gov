const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'positions.json'), 'utf8'));

const existingOfficeIds = new Set(offices.map(o => o.id));

// ===== NEW OFFICES =====

// --- Executive: Under PMO ---
const executiveNew = [
  {
    id: "bida",
    name_bn: "বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষ (BIDA)",
    parent_office_id: "pm-office",
    office_type_bn: "বিনিয়োগ প্রচার সংস্থা (Investment Promotion Agency)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষ আইন, ২০১৬",
    target_audience_bn: "দেশি-বিদেশি বিনিয়োগকারী, উদ্যোক্তা ও ব্যবসায়ীগণ",
    category: "Executive",
    contact_info: { website: "www.bida.gov.bd", phone: "+৮৮০-২-৯৮৮৫২৫২" },
    description_bn: "দেশি-বিদেশি বিনিয়োগ প্রচার, বিনিয়োগকারীদের ওয়ান-স্টপ সার্ভিস (OSS) প্রদান, শিল্প লাইসেন্স ও বিনিয়োগ সংক্রান্ত অনুমোদন প্রদান এবং বিনিয়োগবান্ধব পরিবেশ সৃষ্টির লক্ষ্যে নীতি সংস্কারের সুপারিশ করে।"
  },
  {
    id: "beza",
    name_bn: "বাংলাদেশ অর্থনৈতিক অঞ্চল কর্তৃপক্ষ (BEZA)",
    parent_office_id: "pm-office",
    office_type_bn: "অর্থনৈতিক অঞ্চল উন্নয়ন সংস্থা (Economic Zone Authority)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "বাংলাদেশ অর্থনৈতিক অঞ্চল আইন, ২০১০",
    target_audience_bn: "শিল্প উদ্যোক্তা, বিনিয়োগকারী ও অর্থনৈতিক অঞ্চলে প্রতিষ্ঠিত কোম্পানিগণ",
    category: "Executive",
    contact_info: { website: "www.beza.gov.bd", phone: "+৮৮০-২-৯৮৮৫২৫৩" },
    description_bn: "সারাদেশে অর্থনৈতিক অঞ্চল স্থাপন ও ব্যবস্থাপনার মাধ্যমে শিল্পায়ন ও বিনিয়োগ বৃদ্ধির লক্ষ্যে কাজ করে। বেসরকারি খাতের অংশীদারিত্বে অর্থনৈতিক অঞ্চল স্থাপন ও উন্নয়নে নীতি সহায়তা প্রদান করে।"
  },
  {
    id: "ngo-bureau",
    name_bn: "এনজিও বিষয়ক ব্যুরো",
    parent_office_id: "pm-office",
    office_type_bn: "নিয়ন্ত্রক দপ্তর (Regulatory Bureau)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "এনজিও বিষয়ক ব্যুরো বিধিমালা; বৈদেশিক অনুদান (স্বেচ্ছাসেবী সংস্থার কার্যক্রম) বিধিমালা",
    target_audience_bn: "দেশি-বিদেশি এনজিও, উন্নয়ন সংস্থা ও তাদের স্টেকহোল্ডারগণ",
    category: "Executive",
    contact_info: { website: "www.ngobureau.gov.bd", phone: "+৮৮০-২-৯৫৪২২৪৪" },
    description_bn: "দেশে কর্মরত এনজিওসমূহের নিবন্ধন, তদারকি ও কার্যক্রম সমন্বয় করে। এনজিওগুলোর আর্থিক প্রতিবেদন যাচাই, বৈদেশিক অনুদানের অনুমোদন ও এনজিও খাতের স্বচ্ছতা নিশ্চিত করে।"
  },
  {
    id: "mochta",
    name_bn: "পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়",
    parent_office_id: "pm-office",
    office_type_bn: "মন্ত্রণালয়",
    jurisdiction_bn: "পার্বত্য চট্টগ্রামের তিন জেলা (রাঙ্গামাটি, বান্দরবান, খাগড়াছড়ি)",
    governing_law_bn: "পার্বত্য চট্টগ্রাম শান্তি চুক্তি, ১৯৯৭; পার্বত্য চট্টগ্রাম আঞ্চলিক পরিষদ আইন, ১৯৯৮",
    target_audience_bn: "পার্বত্য চট্টগ্রামের ক্ষুদ্র নৃ-গোষ্ঠী ও বাসিন্দাগণ",
    category: "Executive",
    contact_info: { website: "www.mochta.gov.bd", phone: "+৮৮০-২-৯৫৪৬৪৫১" },
    description_bn: "পার্বত্য চট্টগ্রাম অঞ্চলের সার্বিক উন্নয়ন, শান্তি চুক্তি বাস্তবায়ন, ক্ষুদ্র নৃ-গোষ্ঠীর কল্যাণ ও আঞ্চলিক পরিষদের কার্যক্রম তদারকি করে। পার্বত্য চট্টগ্রাম উন্নয়ন বোর্ড ও আঞ্চলিক পরিষদ এর অধীনে কাজ করে।"
  },
  {
    id: "mochta-ctg-hill-council",
    name_bn: "পার্বত্য চট্টগ্রাম আঞ্চলিক পরিষদ",
    parent_office_id: "mochta",
    office_type_bn: "আঞ্চলিক স্বায়ত্তশাসিত পরিষদ",
    jurisdiction_bn: "পার্বত্য চট্টগ্রাম (রাঙ্গামাটি, বান্দরবান, খাগড়াছড়ি)",
    governing_law_bn: "পার্বত্য চট্টগ্রাম আঞ্চলিক পরিষদ আইন, ১৯৯৮",
    target_audience_bn: "পার্বত্য চট্টগ্রামের জনগণ ও ক্ষুদ্র নৃ-গোষ্ঠীসমূহ",
    category: "Executive",
    contact_info: {},
    description_bn: "পার্বত্য চট্টগ্রাম অঞ্চলের সমন্বিত উন্নয়ন, ভূমি ব্যবস্থাপনা ও স্থানীয় শাসন সংক্রান্ত কার্যক্রম তদারকি করে। জেলা ও উপজেলা পর্যায়ে উন্নয়ন কার্যক্রম সমন্বয় ও বাস্তবায়নে গুরুত্বপূর্ণ ভূমিকা রাখে।"
  },
  {
    id: "mochta-ctg-dev-board",
    name_bn: "পার্বত্য চট্টগ্রাম উন্নয়ন বোর্ড",
    parent_office_id: "mochta",
    office_type_bn: "উন্নয়ন বোর্ড (Development Board)",
    jurisdiction_bn: "পার্বত্য চট্টগ্রামের তিন জেলা",
    governing_law_bn: "পার্বত্য চট্টগ্রাম উন্নয়ন বোর্ড অধ্যাদেশ, ১৯৭৬",
    target_audience_bn: "পার্বত্য চট্টগ্রাম অঞ্চলের বাসিন্দা ও জনপ্রতিনিধিগণ",
    category: "Executive",
    contact_info: {},
    description_bn: "পার্বত্য চট্টগ্রাম অঞ্চলের অবকাঠামো উন্নয়ন, যোগাযোগ ব্যবস্থা, শিক্ষা ও স্বাস্থ্য খাতে প্রকল্প বাস্তবায়ন করে। রাঙ্গামাটি সদরে অবস্থিত এই বোর্ড আঞ্চলিক উন্নয়নের প্রধান বাস্তবায়নকারী সংস্থা।"
  }
];

// --- Executive: Under তথ্য মন্ত্রণালয় ---
const infoDept = [
  {
    id: "info-btv",
    name_bn: "বাংলাদেশ টেলিভিশন (BTV)",
    parent_office_id: "min-info",
    office_type_bn: "সরকারি টেলিভিশন সম্প্রচারক (Public Broadcaster)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ ও বিশ্বব্যাপী (উপগ্রহ মাধ্যমে)",
    governing_law_bn: "বাংলাদেশ টেলিভিশন অধ্যাদেশ, ১৯৭৩; বেসরকারি টেলিভিশন সম্প্রচার নীতিমালা",
    target_audience_bn: "সাধারণ দর্শক, বিজ্ঞাপনদাতা ও গণমাধ্যম ভোক্তাগণ",
    category: "Executive",
    contact_info: { website: "www.btv.gov.bd", phone: "+৮৮০-২-৯৩৫৫৫৫৫" },
    description_bn: "দেশের জাতীয় টেলিভিশন সম্প্রচারকারী সংস্থা। সংবাদ, বিনোদন, শিক্ষামূলক ও তথ্যমূলক অনুষ্ঠান সম্প্রচার করে। বর্তমানে BTV বিশ্বব্যাপী উপগ্রহ মাধ্যমে এবং BTV চট্টগ্রাম ও BTV ময়মনসিংহ থেকে আঞ্চলিক অনুষ্ঠান সম্প্রচারিত হয়।"
  },
  {
    id: "info-betar",
    name_bn: "বাংলাদেশ বেতার",
    parent_office_id: "min-info",
    office_type_bn: "সরকারি বেতার সম্প্রচারক (Public Radio Broadcaster)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "বাংলাদেশ বেতার অধ্যাদেশ, ১৯৭৩",
    target_audience_bn: "সাধারণ শ্রোতা, বিশেষ করে গ্রামীণ জনগণ ও প্রান্তিক শ্রোতাগণ",
    category: "Executive",
    contact_info: { website: "www.betar.gov.bd", phone: "+৮৮০-২-৮৬১১৭৪৭" },
    description_bn: "দেশের প্রথম ও বৃহত্তম বেতার সম্প্রচারকারী সংস্থা। সংবাদ, সঙ্গীত, কৃষি, শিক্ষা ও স্বাস্থ্য বিষয়ক অনুষ্ঠান সম্প্রচার করে। সাতটি আঞ্চলিক কেন্দ্র থেকে সারা দেশে অনুষ্ঠান সম্প্রচারিত হয়। উপকূলীয় ও দুর্যোগকালীন তথ্য সরবরাহে গুরুত্বপূর্ণ ভূমিকা রাখে।"
  },
  {
    id: "info-bss",
    name_bn: "বাংলাদেশ সংবাদ সংস্থা (BSS)",
    parent_office_id: "min-info",
    office_type_bn: "জাতীয় সংবাদ সংস্থা (National News Agency)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ ও আন্তর্জাতিক",
    governing_law_bn: "বাংলাদেশ সংবাদ সংস্থা (BSS) অধ্যাদেশ, ১৯৭৩",
    target_audience_bn: "গণমাধ্যম, সংবাদপত্র, টেলিভিশন ও অনলাইন নিউজ পোর্টালসমূহ",
    category: "Executive",
    contact_info: { website: "www.bssnews.gov.bd", phone: "+৮৮০-২-৯৩৪৪৪৪৪" },
    description_bn: "দেশের জাতীয় সংবাদ সংস্থা। বাংলা ও ইংরেজি ভাষায় দেশি-বিদেশি সংবাদ সংগ্রহ ও সরবরাহ করে। সারা দেশে জেলা সংবাদদাতা ও বিদেশে প্রতিনিধি রয়েছে। সরকারি ও বেসরকারি সকল গণমাধ্যমকে সংবাদ সেবা প্রদান করে।"
  },
  {
    id: "info-films",
    name_bn: "চলচ্চিত্র ও প্রকাশনা অধিদপ্তর",
    parent_office_id: "min-info",
    office_type_bn: "সরকারি অধিদপ্তর (Directorate)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "চলচ্চিত্র আইন, ২০১৮; মুদ্রণ ও প্রকাশনা আইন",
    target_audience_bn: "চলচ্চিত্র নির্মাতা, প্রকাশক, সাংবাদিক ও গণমাধ্যমকর্মীগণ",
    category: "Executive",
    contact_info: { website: "www.dfp.gov.bd", phone: "+৮৮০-২-৯৫৪৬৪৬১" },
    description_bn: "চলচ্চিত্র সেন্সরশিপ, চলচ্চিত্র প্রদর্শনী লাইসেন্স, পত্রিকা ও প্রকাশনা নিবন্ধন এবং চলচ্চিত্র নির্মাণে সরকারি অনুদান বিতরণ করে। বাংলাদেশ চলচ্চিত্র আর্কাইভ ও জাতীয় চলচ্চিত্র উন্নয়ন কর্পোরেশন (FDC) এর তদারকি করে।"
  }
];

// --- Executive: Under শিক্ষা মন্ত্রণালয় ---
const eduBoards = [
  {
    id: "board-dhaka",
    name_bn: "ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "ঢাকা বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.dhakaeducationboard.gov.bd", phone: "+৮৮০-২-৯৬৭৪৫৬১" },
    description_bn: "ঢাকা বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক স্তরের শিক্ষাপ্রতিষ্ঠানসমূহের নিবন্ধন, পাঠ্যক্রম নির্ধারণ, পরীক্ষা গ্রহণ ও ফলাফল প্রকাশ করে। দেশের বৃহত্তম শিক্ষা বোর্ড।"
  },
  {
    id: "board-rajshahi",
    name_bn: "রাজশাহী মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "রাজশাহী বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.rajshahieducationboard.gov.bd", phone: "+৮৮০-৭২১-৭৭৪০০১" },
    description_bn: "রাজশাহী বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক স্তরের শিক্ষাপ্রতিষ্ঠানসমূহের নিবন্ধন, পরীক্ষা গ্রহণ ও ফলাফল প্রকাশ করে।"
  },
  {
    id: "board-cumilla",
    name_bn: "কুমিল্লা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "কুমিল্লা ও চাঁদপুর জেলা",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.cumillaeducationboard.gov.bd", phone: "+৮৮০-৮১-৬৮৯৯৯" },
    description_bn: "কুমিল্লা ও চাঁদপুর অঞ্চলের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-jessore",
    name_bn: "যশোর মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "খুলনা বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.jessoreeducationboard.gov.bd", phone: "+৮৮০-৪২১-৬৮২৪১" },
    description_bn: "খুলনা বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-chittagong",
    name_bn: "চট্টগ্রাম মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "চট্টগ্রাম বিভাগ (চট্টগ্রাম, কক্সবাজার, বান্দরবান, রাঙ্গামাটি, খাগড়াছড়ি)",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.chittagongeducationboard.gov.bd", phone: "+৮৮০-৩১-৬১৪৬৩৩" },
    description_bn: "চট্টগ্রাম বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-barishal",
    name_bn: "বরিশাল মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "বরিশাল বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.barishaleducationboard.gov.bd", phone: "+৮৮০-৪৩১-৬৫৫০১" },
    description_bn: "বরিশাল বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-sylhet",
    name_bn: "সিলেট মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "সিলেট বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.sylheteducationboard.gov.bd", phone: "+৮৮০-৮২১-৭১৭৩০০" },
    description_bn: "সিলেট বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-dinajpur",
    name_bn: "দিনাজপুর মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "রংপুর বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.dinajpureducationboard.gov.bd", phone: "+৮৮০-৫৫১-৬২২৪২" },
    description_bn: "রংপুর বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-mymensingh",
    name_bn: "ময়মনসিংহ মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "ময়মনসিংহ বিভাগ",
    governing_law_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ের শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠান",
    category: "Executive",
    contact_info: { website: "www.mymensingheducationboard.gov.bd" },
    description_bn: "ময়মনসিংহ বিভাগের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাপ্রতিষ্ঠানের পরীক্ষা ও ফলাফল ব্যবস্থাপনা করে।"
  },
  {
    id: "board-madrasah",
    name_bn: "বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Education Board)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "মাদ্রাসা শিক্ষা অধ্যাদেশ, ১৯৬২; মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "মাদ্রাসা শিক্ষার্থী, শিক্ষক ও শিক্ষাপ্রতিষ্ঠানসমূহ",
    category: "Executive",
    contact_info: { website: "www.madrasahboard.gov.bd", phone: "+৮৮০-২-৯৬৭৪৫৭১" },
    description_bn: "সারাদেশের মাদ্রাসা শিক্ষাপ্রতিষ্ঠানের নিবন্ধন, দাখিল ও আলিম পরীক্ষা গ্রহণ এবং ফলাফল প্রকাশ করে। দেশের মাদ্রাসা শিক্ষা ব্যবস্থার মান নিয়ন্ত্রণ ও উন্নয়নে কাজ করে।"
  },
  {
    id: "board-technical",
    name_bn: "বাংলাদেশ কারিগরি শিক্ষা বোর্ড",
    parent_office_id: "min-education",
    office_type_bn: "শিক্ষা বোর্ড (Technical Education Board)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "কারিগরি শিক্ষা আইন, ২০১৮; মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড আইন, ২০১৯",
    target_audience_bn: "কারিগরি ও বৃত্তিমূলক শিক্ষার্থী, প্রশিক্ষণার্থী ও শিক্ষাপ্রতিষ্ঠানসমূহ",
    category: "Executive",
    contact_info: { website: "www.bteb.gov.bd", phone: "+৮৮০-২-৯৬৭৪৫৮১" },
    description_bn: "সারাদেশের কারিগরি ও বৃত্তিমূলক শিক্ষাপ্রতিষ্ঠানের নিবন্ধন, এসএসসি (ভোকেশনাল) ও এইচএসসি (ভোকেশনাল) পরীক্ষা গ্রহণ এবং ডিপ্লোমা-ইন-ইঞ্জিনিয়ারিং শিক্ষা ব্যবস্থাপনা করে।"
  }
];

// --- Executive: Under প্রাথমিক ও গণশিক্ষা মন্ত্রণালয় ---
const primaryDept = [
  {
    id: "primary-bnfe",
    name_bn: "উপানুষ্ঠানিক শিক্ষা ব্যুরো (বিউরো অব নন-ফরমাল এডুকেশন)",
    parent_office_id: "min-primary-mass-education",
    office_type_bn: "সরকারি শিক্ষা ব্যুরো (Bureau)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "প্রাথমিক ও গণশিক্ষা আইন, ২০১৯; উপানুষ্ঠানিক শিক্ষা নীতিমালা",
    target_audience_bn: "নিরক্ষর, ঝরে পড়া শিক্ষার্থী ও প্রাপ্তবয়স্ক শিক্ষার্থীগণ",
    category: "Executive",
    contact_info: { website: "www.bnfe.gov.bd", phone: "+৮৮০-২-৯৫৪৬৪৭১" },
    description_bn: "প্রাপ্তবয়স্ক নিরক্ষর দূরীকরণ, ঝরে পড়া শিশুদের জন্য দ্বিতীয় সুযোগ শিক্ষা এবং জীবনব্যাপী শিক্ষা কর্মসূচি বাস্তবায়ন করে। উপানুষ্ঠানিক শিক্ষা ব্যবস্থার মাধ্যমে দেশের সাক্ষরতার হার বৃদ্ধিতে কাজ করে।"
  }
];

// --- Executive: Under স্বাস্থ্য মন্ত্রণালয় ---
const healthDept = [
  {
    id: "health-dme",
    name_bn: "স্বাস্থ্য শিক্ষা অধিদপ্তর",
    parent_office_id: "min-health",
    office_type_bn: "সরকারি অধিদপ্তর (Directorate)",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "স্বাস্থ্য শিক্ষা অধিদপ্তর বিধিমালা; মেডিকেল শিক্ষা আইন",
    target_audience_bn: "মেডিকেল কলেজ, ডেন্টাল কলেজ, নার্সিং কলেজ ও স্বাস্থ্য শিক্ষাপ্রতিষ্ঠানসমূহ",
    category: "Executive",
    contact_info: { website: "www.dme.gov.bd", phone: "+৮৮০-২-৯৫৪৬৪৮১" },
    description_bn: "সরকারি ও বেসরকারি মেডিকেল কলেজ, ডেন্টাল কলেজ ও নার্সিং কলেজগুলোর শিক্ষা কার্যক্রম তদারকি, স্বাস্থ্য শিক্ষা প্রতিষ্ঠানের নিবন্ধন ও স্বাস্থ্য শিক্ষার মান নিয়ন্ত্রণ করে। দেশের চিকিৎসক ও স্বাস্থ্য পেশাজীবী তৈরির মূল সংস্থা।"
  },
  {
    id: "health-dmch",
    name_bn: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    parent_office_id: "min-health",
    office_type_bn: "সরকারি মেডিকেল কলেজ ও হাসপাতাল",
    jurisdiction_bn: "সমগ্র বাংলাদেশ (বিশেষত ঢাকা বিভাগ)",
    governing_law_bn: "মেডিকেল কলেজ ও হাসপাতাল বিধিমালা; স্বাস্থ্য শিক্ষা আইন",
    target_audience_bn: "সাধারণ রোগী, চিকিৎসার্থী ও মেডিকেল শিক্ষার্থীগণ",
    category: "Executive",
    contact_info: { website: "www.dmch.gov.bd", phone: "+৮৮০-২-৮৬১১০৩৫" },
    description_bn: "দেশের প্রাচীনতম ও বৃহত্তম সরকারি মেডিকেল কলেজ ও হাসপাতাল। এমবিবিএস ও বিশেষায়িত চিকিৎসা শিক্ষা প্রদান এবং বিনামূল্যে ও স্বল্পমূল্যে স্বাস্থ্যসেবা প্রদান করে। বিভিন্ন বিশেষায়িত ইউনিট ও বিভাগের মাধ্যমে উন্নত চিকিৎসা সেবা নিশ্চিত করে।"
  }
];

// ===== CONSTITUTIONAL BODIES =====
const constitutionalNew = [
  {
    id: "anti-corruption-commission",
    name_bn: "দুর্নীতি দমন কমিশন (দুদক)",
    parent_office_id: "bd",
    office_type_bn: "স্বাধীন সাংবিধানিক কমিশন",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "দুর্নীতি দমন কমিশন আইন, ২০০৪; দুর্নীতি প্রতিরোধ আইন, ১৯৪৭",
    target_audience_bn: "দুর্নীতির বিরুদ্ধে সচেতন সাধারণ নাগরিক, সরকারি কর্মকর্তা ও জনপ্রতিনিধিগণ",
    category: "Constitutional",
    contact_info: { website: "www.acc.gov.bd", phone: "+৮৮০-২-৯৫৪৫১৯২" },
    description_bn: "দুর্নীতি প্রতিরোধ, তদন্ত ও বিচার কার্যক্রম পরিচালনার জন্য গঠিত স্বাধীন সাংবিধানিক সংস্থা। সরকারি-বেসরকারি সকল ক্ষেত্রে দুর্নীতির অভিযোগ তদন্ত, মামলা পরিচালনা ও সম্পদ জব্দের ক্ষমতা রাখে। দুর্নীতি প্রতিরোধে জনসচেতনতা সৃষ্টি ও গবেষণা কার্যক্রম পরিচালনা করে।"
  },
  {
    id: "human-rights-commission",
    name_bn: "জাতীয় মানবাধিকার কমিশন",
    parent_office_id: "bd",
    office_type_bn: "স্বাধীন সাংবিধানিক কমিশন",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "জাতীয় মানবাধিকার কমিশন আইন, ২০০৯",
    target_audience_bn: "মানবাধিকার লঙ্ঘনের শিকার নাগরিক, সরকারি সংস্থা ও আইনপ্রয়োগকারী সংস্থাসমূহ",
    category: "Constitutional",
    contact_info: { website: "www.nhrc.gov.bd", phone: "+৮৮০-২-৯৫৪৫১৯৩" },
    description_bn: "মানবাধিকার সংরক্ষণ ও উন্নয়নের জন্য গঠিত স্বাধীন সাংবিধানিক সংস্থা। মানবাধিকার লঙ্ঘনের অভিযোগ তদন্ত, সরকারি সংস্থাকে সুপারিশ প্রদান এবং মানবাধিকার শিক্ষা ও সচেতনতা বৃদ্ধির কার্যক্রম পরিচালনা করে। আন্তর্জাতিক মানবাধিকার সংস্থাগুলোর সাথে সমন্বয় করে।"
  },
  {
    id: "info-commission-bd",
    name_bn: "তথ্য কমিশন",
    parent_office_id: "bd",
    office_type_bn: "স্বাধীন সাংবিধানিক কমিশন",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "তথ্য অধিকার আইন, ২০০৯",
    target_audience_bn: "তথ্য প্রার্থী নাগরিক, সরকারি দপ্তর ও গণমাধ্যমকর্মীগণ",
    category: "Constitutional",
    contact_info: { website: "www.infocommission.gov.bd", phone: "+৮৮০-২-৯৫৪৫১৯৪" },
    description_bn: "তথ্য অধিকার আইন, ২০০৯ বাস্তবায়ন ও তদারকির জন্য গঠিত স্বাধীন সংস্থা। নাগরিকদের তথ্য প্রাপ্তির অধিকার নিশ্চিত করা, সরকারি দপ্তরের তথ্য প্রদানে ব্যর্থতার বিরুদ্ধে আপিল শুনানি ও তথ্য অধিকার বিষয়ক সচেতনতা সৃষ্টি করে।"
  },
  {
    id: "bangladesh-bank",
    name_bn: "বাংলাদেশ ব্যাংক",
    parent_office_id: "bd",
    office_type_bn: "কেন্দ্রীয় ব্যাংক (Central Bank)",
    jurisdiction_bn: "সমগ্র বাংলাদেশের আর্থিক খাত",
    governing_law_bn: "বাংলাদেশ ব্যাংক আদেশ, ১৯৭২; ব্যাংক কোম্পানি আইন, ১৯৯১",
    target_audience_bn: "তফসিলি ব্যাংক, আর্থিক প্রতিষ্ঠান, বিনিময় সংস্থা ও সাধারণ গ্রাহকগণ",
    category: "Constitutional",
    contact_info: { website: "www.bb.gov.bd", phone: "+৮৮০-২-৯৫৬০৩৫১" },
    description_bn: "দেশের কেন্দ্রীয় ব্যাংক। মুদ্রানীতি প্রণয়ন ও বাস্তবায়ন, ব্যাংকিং খাতের নিয়ন্ত্রণ ও তদারকি, বৈদেশিক মুদ্রা ব্যবস্থাপনা এবং অর্থনৈতিক স্থিতিশীলতা বজায় রাখা এর প্রধান দায়িত্ব। টাকার নোট ও মুদ্রা প্রচলন এবং সরকারের ব্যাংক হিসেবে কাজ করে।"
  }
];

// ===== LEGISLATIVE ADDITIONS =====
const legislativeNew = [
  {
    id: "legislature-chief-whip",
    name_bn: "চিফ হুইপের কার্যালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় পদ ও কার্যালয়",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংবিধান ও সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংসদ সদস্যবৃন্দ, সরকারি দল",
    category: "Legislative",
    contact_info: {},
    description_bn: "সরকারি দলের প্রধান হুইপ। সংসদে সরকারি দলের শৃঙ্খলা ও উপস্থিতি নিশ্চিত করা, গুরুত্বপূর্ণ ভোটাভুটিতে দলের সদস্যদের উপস্থিতি ও ভোট নিশ্চিত করা এবং হুইপ দলের কার্যক্রম সমন্বয় করেন। চিফ হুইপ সরকারি দলের সভাপতির (প্রধানমন্ত্রী) সাথে সরাসরি কাজ করেন।"
  },
  {
    id: "legislature-mp",
    name_bn: "সংসদ সদস্যবৃন্দ",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সাংবিধানিক পদ",
    jurisdiction_bn: "নির্দিষ্ট সংসদীয় আসন ও সমগ্র বাংলাদেশ",
    governing_law_bn: "সংবিধানের ৬৫-৭০ অনুচ্ছেদ; সংসদ পরিচালনা বিধি",
    target_audience_bn: "নির্দিষ্ট আসনের ভোটার ও সাধারণ নাগরিকগণ",
    category: "Legislative",
    contact_info: {},
    description_bn: "জাতীয় সংসদের নির্বাচিত জনপ্রতিনিধি। ৩০০টি একক আসন থেকে সরাসরি জনগণের ভোটে নির্বাচিত হন এবং ৫০টি সংরক্ষিত মহিলা আসনের সদস্যরা সংসদ সদস্যদের ভোটে নির্বাচিত হন। আইন প্রণয়ন, বাজেট অনুমোদন ও সরকারি কার্যক্রম তদারকিতে অংশগ্রহণ করেন। নিজ আসনের জনগণের প্রতিনিধিত্ব ও সমস্যা সমাধানে কাজ করেন।"
  },
  {
    id: "legislature-caucus",
    name_bn: "সংসদীয় ককাসসমূহ",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় গ্রুপ (Parliamentary Group)",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংসদ সদস্যবৃন্দ ও সংশ্লিষ্ট স্টেকহোল্ডারগণ",
    category: "Legislative",
    contact_info: {},
    description_bn: "বিভিন্ন ইস্যুভিত্তিক সংসদীয় ককাস। নারী সংসদ সদস্য ককাস, শিশু অধিকার ককাস, জলবায়ু পরিবর্তন ককাসসহ বিভিন্ন ককাস সংসদ সদস্যদের মধ্যে সচেতনতা ও সমন্বয় বৃদ্ধি এবং নির্দিষ্ট ইস্যুতে ঐক্যবদ্ধ অবস্থান গঠনে কাজ করে।"
  },
  {
    id: "legislature-tv",
    name_bn: "জাতীয় সংসদ টেলিভিশন (সংসদ টিভি)",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় সম্প্রচার মাধ্যম",
    jurisdiction_bn: "জাতীয় সংসদ ভবন",
    governing_law_bn: "সংসদ টেলিভিশন সম্প্রচার নীতিমালা",
    target_audience_bn: "সাধারণ দর্শক ও সংসদীয় কার্যক্রমে আগ্রহী নাগরিকগণ",
    category: "Legislative",
    contact_info: {},
    description_bn: "জাতীয় সংসদের কার্যক্রম সরাসরি সম্প্রচার করে। সংসদের অধিবেশন, কমিটির বৈঠক ও সংসদীয় কার্যক্রম সম্পর্কিত তথ্য ও অনুষ্ঠান সম্প্রচারের মাধ্যমে সংসদীয় গণতন্ত্র ও জনসচেতনতা বৃদ্ধি করে।"
  }
];

// ===== JUDICIARY ADDITIONS =====
const judiciaryNew = [
  {
    id: "judiciary-ict",
    name_bn: "আন্তর্জাতিক অপরাধ ট্রাইব্যুনাল",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "আন্তর্জাতিক অপরাধ (ট্রাইব্যুনাল) আইন, ১৯৭৩ (সংশোধিত ২০০৯, ২০১৩)",
    target_audience_bn: "১৯৭১ সালে মানবতা বিরোধী অপরাধে জড়িত অভিযুক্ত ব্যক্তিগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "১৯৭১ সালের মহান মুক্তিযুদ্ধের সময় সংঘটিত মানবতা বিরোধী অপরাধ, যুদ্ধাপরাধ ও গণহত্যায় জড়িত ব্যক্তিদের বিচারের জন্য গঠিত বিশেষ ট্রাইব্যুনাল। আন্তর্জাতিক অপরাধ (ট্রাইব্যুনাল) আইন, ১৯৭৩-এর অধীনে তিনজন বিচারকের সমন্বয়ে গঠিত।"
  },
  {
    id: "judiciary-women-tribunal",
    name_bn: "নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "নির্ধারিত জেলা ও বিভাগ",
    governing_law_bn: "নারী ও শিশু নির্যাতন দমন আইন, ২০০০ (সংশোধিত ২০০৩)",
    target_audience_bn: "নারী ও শিশু নির্যাতনের শিকার ব্যক্তিগণ ও তাদের পরিবার",
    category: "Judiciary",
    contact_info: {},
    description_bn: "নারী ও শিশুর প্রতি সহিংসতা, যৌতুক, ধর্ষণ, পাচার ও অন্যান্য নির্যাতন সংক্রান্ত মামলার দ্রুত বিচারের জন্য গঠিত বিশেষ ট্রাইব্যুনাল। প্রতি জেলায় একজন করে বিচারক নিযুক্ত থাকেন এবং মামলা দ্রুত নিষ্পত্তির জন্য ১৮০ দিনের সময়সীমা নির্ধারিত।"
  },
  {
    id: "judiciary-cyber-tribunal",
    name_bn: "সাইবার ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "ডিজিটাল নিরাপত্তা আইন, ২০১৮; তথ্য ও যোগাযোগ প্রযুক্তি আইন, ২০০৬",
    target_audience_bn: "সাইবার অপরাধে জড়িত ব্যক্তি ও ভুক্তভোগী সাধারণ নাগরিকগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "ডিজিটাল ও সাইবার অপরাধ সংক্রান্ত মামলা নিষ্পত্তির জন্য গঠিত বিশেষ ট্রাইব্যুনাল। হ্যাকিং, আইডি চুরি, অনলাইন জালিয়াতি, ডিজিটাল হয়রানি ও সোশ্যাল মিডিয়া সংক্রান্ত অপরাধের বিচার করে। বর্তমানে ঢাকা ও অন্যান্য বিভাগে সাইবার ট্রাইব্যুনাল কার্যক্রম চালু রয়েছে।"
  },
  {
    id: "judiciary-children-court",
    name_bn: "শিশু আদালত",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত আদালত",
    jurisdiction_bn: "নির্ধারিত জেলা",
    governing_law_bn: "শিশু আইন, ২০১৩",
    target_audience_bn: "বয়ঃসন্ধিকালীন অপরাধী ও ঝুঁকিতে থাকা শিশু ও কিশোরগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "১৮ বছরের কম বয়সী শিশু ও কিশোর অপরাধীদের বিচার এবং শিশু সুরক্ষা সংক্রান্ত মামলা নিষ্পত্তির জন্য গঠিত বিশেষ আদালত। শিশুদের জন্য বন্ধুত্বপূর্ণ পরিবেশে বিচার কার্যক্রম পরিচালনা করে এবং শাস্তির পরিবর্তে পুনর্বাসন ও সংস্কারের ওপর জোর দেওয়া হয়।"
  },
  {
    id: "judiciary-drug-tribunal",
    name_bn: "মাদকদ্রব্য ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "নির্ধারিত জেলা",
    governing_law_bn: "মাদকদ্রব্য নিয়ন্ত্রণ আইন, ২০১৮",
    target_audience_bn: "মাদক অপরাধে জড়িত ব্যক্তি ও সাধারণ নাগরিকগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "মাদকদ্রব্য চোরাচালান, ক্রয়-বিক্রয়, সেবন ও সংরক্ষণ সংক্রান্ত মামলার দ্রুত বিচারের জন্য গঠিত বিশেষ ট্রাইব্যুনাল। কঠোর শাস্তি ও দ্রুত বিচার নিষ্পত্তির মাধ্যমে মাদকের বিরুদ্ধে সমাজকে সুরক্ষিত করে।"
  },
  {
    id: "judiciary-land-tribunal",
    name_bn: "ভূমি জরিপ ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "নির্ধারিত জেলা",
    governing_law_bn: "ভূমি জরিপ আইন, ২০১০",
    target_audience_bn: "ভূমি জরিপ ও সীমানা সংক্রান্ত বিবাদে জড়িত ভূমি মালিকগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "ভূমি জরিপ ও সীমানা নির্ধারণ সংক্রান্ত বিবাদ নিষ্পত্তির জন্য গঠিত বিশেষ ট্রাইব্যুনাল। ভূমি মন্ত্রণালয়ের জরিপ কার্যক্রম ও ভূমি রেকর্ড সংশোধন সংক্রান্ত বিরোধ নিষ্পত্তি করে।"
  },
  {
    id: "judiciary-election-tribunal",
    name_bn: "নির্বাচনী ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "নির্ধারিত জেলা",
    governing_law_bn: "স্থানীয় সরকার (সিটি কর্পোরেশন) আইন, ২০০৯; নির্বাচনী বিধিমালা",
    target_audience_bn: "স্থানীয় সরকার নির্বাচনে অংশগ্রহণকারী প্রার্থী ও ভোটারগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "সিটি কর্পোরেশন, পৌরসভা ও ইউনিয়ন পরিষদ নির্বাচন সংক্রান্ত বিরোধ ও আপিল নিষ্পত্তির জন্য গঠিত বিশেষ ট্রাইব্যুনাল। নির্বাচনী অনিয়ম, ভোট গণনা ও ফলাফল চ্যালেঞ্জ সংক্রান্ত মামলা এখানে বিচারিত হয়।"
  },
  {
    id: "judiciary-administrative-tribunal",
    name_bn: "প্রশাসনিক আপিল ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত ট্রাইব্যুনাল",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "প্রশাসনিক ট্রাইব্যুনাল আইন, ১৯৮০",
    target_audience_bn: "সরকারি কর্মচারী ও সরকারি চাকরি সংক্রান্ত বিবাদে জড়িত ব্যক্তিগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "সরকারি কর্মচারীদের চাকরি সংক্রান্ত শৃঙ্খলা, পদোন্নতি, বেতন ও অন্যান্য বিবাদ নিষ্পত্তির জন্য গঠিত বিশেষ ট্রাইব্যুনাল। সরকারি চাকরির শর্ত ও সুযোগ-সুবিধা সংক্রান্ত মামলা এবং প্রশাসনিক আদেশের বিরুদ্ধে আপিল এখানে বিচারিত হয়।"
  },
  {
    id: "judiciary-judicial-academy",
    name_bn: "বিচার বিভাগীয় প্রশিক্ষণ ও গবেষণা একাডেমি",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "প্রশিক্ষণ ও গবেষণা প্রতিষ্ঠান (Judicial Academy)",
    jurisdiction_bn: "সমগ্র বাংলাদেশের বিচার বিভাগ",
    governing_law_bn: "বিচার বিভাগীয় প্রশিক্ষণ ও গবেষণা একাডেমি আইন, ২০১৫",
    target_audience_bn: "বিচারক, ম্যাজিস্ট্রেট, আইনজীবী ও বিচার বিভাগীয় কর্মকর্তাবৃন্দ",
    category: "Judiciary",
    contact_info: { website: "www.jta.gov.bd", phone: "+৮৮০-২-৯৫৬২৯৪৫" },
    description_bn: "বিচারক ও ম্যাজিস্ট্রেটদের প্রাক-সার্ভিস ও ইন-সার্ভিস প্রশিক্ষণ প্রদান করে। বিচার বিভাগীয় গবেষণা, আইন ও বিচার ব্যবস্থার উন্নয়নমূলক কর্মসূচি পরিচালনা এবং আইনজীবী ও বিচার বিভাগীয় কর্মকর্তাদের দক্ষতা বৃদ্ধির প্রশিক্ষণ প্রদান করে।"
  }
];

// ===== POSITIONS =====
const lastPosId = positions.reduce((max, p) => {
  const num = parseInt(p.id.replace('pos-', ''), 10);
  return num > max ? num : max;
}, 0);

let pc = lastPosId + 1;

function pos(designation_bn, office_id, pay_grade_bn, parent_position_id, equivalent_rank_bn, salutation, appointing_authority_bn, service_usecase, career_progression, responsibilities) {
  return { id: `pos-${String(pc++).padStart(4, '0')}`, office_id, designation_bn, pay_grade_bn, parent_position_id, equivalent_rank_bn, official_salutation_bn: salutation, appointing_authority_bn, public_service_usecase_bn: service_usecase, career_progression_bn: career_progression, responsibilities_bn: responsibilities };
}

// Section A: Positions for 19 Executive offices with none
// Helper: standard admin hierarchy for directorates
function adminPositions(officeId, parentPosId, ministryName) {
  return [
    pos("মহাপরিচালক", officeId, "গ্রেড ২", parentPosId, "যুগ্মসচিব", "মাননীয় মহাপরিচালক", ministryName,
      "সংশ্লিষ্ট দপ্তরের সার্বিক সেবা ও ব্যবস্থাপনা", "অতিরিক্ত মহাপরিচালক থেকে পদোন্নতি", "সংশ্লিষ্ট দপ্তরের প্রধান নির্বাহী হিসেবে সার্বিক ব্যবস্থাপনা ও নীতি বাস্তবায়ন"),
    pos("অতিরিক্ত মহাপরিচালক", officeId, "গ্রেড ৩", null, "উপসচিব", "জনাব", ministryName,
      "সংশ্লিষ্ট দপ্তরের প্রশাসনিক সেবা তদারকি", "পরিচালক থেকে পদোন্নতি", "প্রশাসনিক ও কারিগরি কার্যক্রম তদারকি"),
    pos("পরিচালক", officeId, "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", ministryName,
      "সংশ্লিষ্ট দপ্তরের বিশেষায়িত সেবা প্রদান", "উপ-পরিচালক থেকে পদোন্নতি", "বিভাগীয় কার্যক্রম পরিচালনা ও মনিটরিং"),
    pos("উপ-পরিচালক", officeId, "গ্রেড ৫", null, "সিনিয়র সহকারী সচিব", "জনাব", ministryName,
      "সংশ্লিষ্ট দপ্তরের রুটিন সেবা প্রদান", "সহকারী পরিচালক থেকে পদোন্নতি", "দপ্তরের রুটিন প্রশাসনিক ও কারিগরি কাজ"),
  ];
}

function commissionPositions(officeId, parentPosId) {
  return [
    pos("চেয়ারম্যান", officeId, "গ্রেড ১", parentPosId, "সিনিয়র সচিব/বিচারপতি", "মাননীয় চেয়ারম্যান", "রাষ্ট্রপতি",
      "সাংবিধানিক দায়িত্ব পালন সংক্রান্ত সেবা", "সুপ্রিম কোর্টের বিচারক বা সিনিয়র সচিব থেকে নিয়োগ", "কমিশনের প্রধান হিসেবে সার্বিক দায়িত্ব পালন"),
    pos("কমিশনার", officeId, "গ্রেড ২", null, "সচিব", "মাননীয় কমিশনার", "রাষ্ট্রপতি",
      "কমিশনের সিদ্ধান্ত গ্রহণ ও নীতি নির্ধারণ", "বিচারক বা সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "কমিশনের কার্যক্রম পরিচালনা ও সিদ্ধান্ত গ্রহণ"),
  ];
}

const execPositions = [
  // BIDA
  pos("প্রধান নির্বাহী কর্মকর্তা (CEO)", "bida", "গ্রেড ২", null, "সচিব", "জনাব", "প্রধানমন্ত্রীর কার্যালয়",
    "বিনিয়োগকারীদের ওয়ান-স্টপ সার্ভিস প্রদান", "বিশেষজ্ঞ বা সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "BIDA-র সার্বিক কার্যক্রম পরিচালনা ও বিনিয়োগ প্রচার"),
  pos("পরিচালক (বিনিয়োগ)", "bida", "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", "CEO, BIDA",
    "বিনিয়োগ সংক্রান্ত অনুমোদন সেবা", "উপ-পরিচালক থেকে পদোন্নতি", "বিনিয়োগ অনুমোদন ও বিনিয়োগকারীদের সেবা তদারকি"),

  // BEZA
  pos("প্রধান নির্বাহী কর্মকর্তা (CEO)", "beza", "গ্রেড ২", null, "সচিব", "জনাব", "প্রধানমন্ত্রীর কার্যালয়",
    "অর্থনৈতিক অঞ্চল স্থাপন সংক্রান্ত সেবা", "সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "BEZA-র সার্বিক কার্যক্রম পরিচালনা"),
  pos("পরিচালক (অর্থনৈতিক অঞ্চল)", "beza", "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", "CEO, BEZA",
    "অর্থনৈতিক অঞ্চল উন্নয়ন সেবা", "উপ-পরিচালক থেকে পদোন্নতি", "অর্থনৈতিক অঞ্চল উন্নয়ন কার্যক্রম তদারকি"),

  // NGO Bureau
  pos("মহাপরিচালক (এনজিও ব্যুরো)", "ngo-bureau", "গ্রেড ৩", null, "উপসচিব", "জনাব মহাপরিচালক", "প্রধানমন্ত্রীর কার্যালয়",
    "এনজিও নিবন্ধন ও তদারকি সেবা", "পরিচালক থেকে পদোন্নতি", "এনজিও নিবন্ধন ও তদারকির সার্বিক ব্যবস্থাপনা"),

  // MoCHTA
  pos("সচিব (পার্বত্য চট্টগ্রাম)", "mochta", "গ্রেড ১", null, "সিনিয়র সচিব", "মাননীয় সচিব", "প্রধানমন্ত্রীর কার্যালয়",
    "পার্বত্য অঞ্চলের উন্নয়ন ও আইনগত সেবা", "যুগ্মসচিব থেকে পদোন্নতি", "পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের সার্বিক প্রশাসন ও নীতি বাস্তবায়ন"),
  pos("যুগ্মসচিব (পার্বত্য চট্টগ্রাম)", "mochta", "গ্রেড ২", null, "যুগ্মসচিব", "জনাব যুগ্মসচিব", "সচিব, মোচটা",
    "পার্বত্য অঞ্চলের প্রকল্প বাস্তবায়ন ও সমন্বয়", "উপসচিব থেকে পদোন্নতি", "আন্তঃমন্ত্রণালয় সমন্বয় ও প্রকল্প বাস্তবায়ন তদারকি"),

  // ICT (আন্তর্জাতিক অপরাধ ট্রাইব্যুনাল)
  pos("চেয়ারম্যান (আন্তর্জাতিক অপরাধ ট্রাইব্যুনাল)", "judiciary-ict", "গ্রেড ১", null, "আপিল বিভাগের বিচারক", "মাননীয় বিচারপতি", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "মানবতা বিরোধী অপরাধের বিচার সেবা", "হাইকোর্ট বিভাগের বিচারক থেকে নিয়োগ", "আন্তর্জাতিক অপরাধ ট্রাইব্যুনালের বিচারিক কার্যক্রম পরিচালনা"),

  // Corruption Tribunal
  pos("বিচারক (দুর্নীতি ট্রাইব্যুনাল)", "judiciary-ati", "গ্রেড ৪", null, "যুগ্ম জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "দুর্নীতি মামলার দ্রুত বিচার সেবা", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "দুর্নীতি মামলা বিচার ও নিষ্পত্তি"),

  // Nari O Shishu Tribunal
  pos("বিচারক (নারী ও শিশু ট্রাইব্যুনাল)", "judiciary-women-tribunal", "গ্রেড ৫", null, "অতিরিক্ত জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "নারী ও শিশু নির্যাতন মামলার বিচার সেবা", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "নারী ও শিশু নির্যাতন মামলা দ্রুত নিষ্পত্তি"),

  // Cyber Tribunal
  pos("বিচারক (সাইবার ট্রাইব্যুনাল)", "judiciary-cyber-tribunal", "গ্রেড ৫", null, "অতিরিক্ত জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "সাইবার অপরাধ মামলার বিচার সেবা", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "সাইবার ও ডিজিটাল অপরাধ মামলা বিচার"),

  // Children Court
  pos("বিচারক (শিশু আদালত)", "judiciary-children-court", "গ্রেড ৬", null, "যুগ্ম জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "শিশু অপরাধীদের পুনর্বাসন ও বিচার সেবা", "সিনিয়র সহকারী জজ থেকে পদোন্নতি", "শিশু অপরাধ মামলা ও শিশু সুরক্ষা সংক্রান্ত মামলা নিষ্পত্তি"),

  // Drug Tribunal
  pos("বিচারক (মাদকদ্রব্য ট্রাইব্যুনাল)", "judiciary-drug-tribunal", "গ্রেড ৫", null, "অতিরিক্ত জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "মাদক মামলার দ্রুত বিচার সেবা", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "মাদকদ্রব্য মামলা বিচার ও নিষ্পত্তি"),

  // Land Tribunal
  pos("বিচারক (ভূমি জরিপ ট্রাইব্যুনাল)", "judiciary-land-tribunal", "গ্রেড ৬", null, "যুগ্ম জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "ভূমি জরিপ বিবাদ নিষ্পত্তি সেবা", "সিনিয়র সহকারী জজ থেকে পদোন্নতি", "ভূমি জরিপ ও সীমানা বিবাদ নিষ্পত্তি"),

  // Election Tribunal
  pos("বিচারক (নির্বাচনী ট্রাইব্যুনাল)", "judiciary-election-tribunal", "গ্রেড ৬", null, "যুগ্ম জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "নির্বাচনী বিরোধ নিষ্পত্তি সেবা", "সিনিয়র সহকারী জজ থেকে পদোন্নতি", "স্থানীয় সরকার নির্বাচন সংক্রান্ত মামলা নিষ্পত্তি"),

  // Administrative Tribunal
  pos("চেয়ারম্যান (প্রশাসনিক আপিল ট্রাইব্যুনাল)", "judiciary-administrative-tribunal", "গ্রেড ২", null, "হাইকোর্ট বিভাগের বিচারক", "মাননীয় চেয়ারম্যান", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)",
    "সরকারি চাকরি বিবাদ নিষ্পত্তি সেবা", "হাইকোর্ট বিভাগের বিচারক থেকে নিয়োগ", "প্রশাসনিক ট্রাইব্যুনালে মামলা পরিচালনা"),

  // Judicial Academy
  pos("মহাপরিচালক (বিচার বিভাগীয় প্রশিক্ষণ একাডেমি)", "judiciary-judicial-academy", "গ্রেড ২", null, "হাইকোর্ট বিভাগের বিচারক", "মাননীয় মহাপরিচালক", "প্রধান বিচারপতি",
    "বিচারকদের প্রশিক্ষণ ও গবেষণা সেবা", "হাইকোর্ট বিভাগের বিচারক থেকে পদোন্নতি", "বিচার বিভাগীয় প্রশিক্ষণ ও গবেষণা কার্যক্রম পরিচালনা"),

  // Constitutional bodies
  pos("গভর্নর (বাংলাদেশ ব্যাংক)", "bangladesh-bank", "গ্রেড ১ (সর্বোচ্চ)", null, "সিনিয়র সচিব", "মাননীয় গভর্নর", "রাষ্ট্রপতি (প্রধানমন্ত্রীর পরামর্শে)",
    "মুদ্রানীতি ও ব্যাংকিং খাতের সেবা", "অর্থনীতি ও ব্যাংকিং খাতের বিশেষজ্ঞ থেকে নিয়োগ", "কেন্দ্রীয় ব্যাংকের প্রধান হিসেবে মুদ্রানীতি প্রণয়ন ও ব্যাংকিং খাত তদারকি"),
  pos("ডেপুটি গভর্নর", "bangladesh-bank", "গ্রেড ২", null, "সচিব", "জনাব ডেপুটি গভর্নর", "গভর্নর (সরকারের অনুমোদনক্রমে)",
    "আর্থিক স্থিতিশীলতা সংক্রান্ত সেবা", "ব্যাংকিং খাতের সিনিয়র কর্মকর্তা থেকে পদোন্নতি", "আর্থিক খাত তদারকি ও মুদ্রানীতি বাস্তবায়নে সহায়তা"),

  // Legislative additions
  pos("চিফ হুইপ", "legislature-chief-whip", "গ্রেড ১ (মন্ত্রী পদমর্যাদা)", null, "কেবিনেট মন্ত্রী", "মাননীয় চিফ হুইপ", "প্রধানমন্ত্রী",
    "সংসদে সরকারি দলের উপস্থিতি ও ভোট নিশ্চিতকরণ", "সংসদ সদস্য থেকে নিয়োগ", "সংসদে সরকারি দলের শৃঙ্খলা ও উপস্থিতি নিশ্চিতকরণ"),
  pos("ডেপুটি হুইপ", "legislature-chief-whip", "গ্রেড ২ (প্রতিমন্ত্রী পদমর্যাদা)", null, "প্রতিমন্ত্রী", "মাননীয় ডেপুটি হুইপ", "প্রধানমন্ত্রী",
    "সংসদে সরকারি দলের সমন্বয় সেবা", "সংসদ সদস্য থেকে নিয়োগ", "চিফ হুইপকে সহায়তা ও সংসদ সদস্যদের সমন্বয়"),
];

// Section B: Positions for part3 offices that have none
const part3OfficePositions = [];

const part3Offices = [
  { id: "road-bba", ministry: "সড়ক পরিবহন ও সেতু মন্ত্রণালয়" },
  { id: "railway-brtm", ministry: "রেলপথ মন্ত্রণালয়" },
  { id: "railway-west", ministry: "রেলপথ মন্ত্রণালয়" },
  { id: "railway-east", ministry: "রেলপথ মন্ত্রণালয়" },
  { id: "shipping-biwtc", ministry: "নৌপরিবহন মন্ত্রণালয়" },
  { id: "shipping-df", ministry: "নৌপরিবহন মন্ত্রণালয়" },
  { id: "shipping-dmi", ministry: "নৌপরিবহন মন্ত্রণালয়" },
  { id: "aviation-tourism", ministry: "বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয়" },
  { id: "aviation-dtap", ministry: "বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয়" },
  { id: "lgrd-lgd", ministry: "স্থানীয় সরকার, পল্লী উন্নয়ন ও সমবায় মন্ত্রণালয়" },
  { id: "lgrd-rd", ministry: "স্থানীয় সরকার, পল্লী উন্নয়ন ও সমবায় মন্ত্রণালয়" },
  { id: "lgrd-lgrc", ministry: "স্থানীয় সরকার, পল্লী উন্নয়ন ও সমবায় মন্ত্রণালয়" },
  { id: "lgrd-rdrs", ministry: "স্থানীয় সরকার, পল্লী উন্নয়ন ও সমবায় মন্ত্রণালয়" },
  { id: "housing-arch", ministry: "গৃহায়ন ও গণপূর্ত মন্ত্রণালয়" },
  { id: "housing-urbandev", ministry: "গৃহায়ন ও গণপূর্ত মন্ত্রণালয়" },
  { id: "land-comm", ministry: "ভূমি মন্ত্রণালয়" },
  { id: "land-record", ministry: "ভূমি মন্ত্রণালয়" },
  { id: "water-warpo", ministry: "পানি সম্পদ মন্ত্রণালয়" },
  { id: "water-flood", ministry: "পানি সম্পদ মন্ত্রণালয়" },
];

part3Offices.forEach(o => {
  part3OfficePositions.push(...adminPositions(o.id, null, o.ministry));
});

// Section C: Positions for Legislative offices missing them
const legOfficePositions = [
  // legislature-parliament - জাতীয় সংসদ
  pos("স্পিকার", "legislature-speaker", "গ্রেড ১ (সর্বোচ্চ)", null, "রাষ্ট্রপতির পর দেশের দ্বিতীয় সর্বোচ্চ পদ", "মাননীয় স্পিকার", "সংসদ সদস্যদের মধ্যে নির্বাচিত",
    "সংসদীয় কার্যক্রম সুষ্ঠু পরিচালনা ও আইন প্রণয়ন সেবা", "সংসদ সদস্য থেকে নির্বাচিত", "জাতীয় সংসদের সভাপতি হিসেবে সংসদীয় কার্যক্রম পরিচালনা"),
  pos("ডেপুটি স্পিকার", "legislature-ds", "গ্রেড ২ (মন্ত্রী পদমর্যাদা)", null, "কেবিনেট মন্ত্রী", "মাননীয় ডেপুটি স্পিকার", "সংসদ সদস্যদের মধ্যে নির্বাচিত",
    "স্পিকারের অনুপস্থিতিতে সংসদ পরিচালনা", "সংসদ সদস্য থেকে নির্বাচিত", "স্পিকারকে সহায়তা ও অনুপস্থিতিতে সংসদীয় কার্যক্রম পরিচালনা"),
  pos("সংসদ সদস্য (এমপি)", "legislature-mp", "গ্রেড ৩ (প্রতিমন্ত্রী পদমর্যাদা)", null, "প্রতিমন্ত্রী", "মাননীয় সংসদ সদস্য", "নির্দিষ্ট আসনের ভোটারগণ",
    "আইন প্রণয়ন, বাজেট অনুমোদন ও আসনের জনগণের প্রতিনিধিত্ব", "প্রত্যক্ষ ভোটে নির্বাচিত", "আইন প্রণয়ন, সংসদীয় কমিটির কাজ ও নিজ আসনের উন্নয়ন"),

  // Anti-Corruption Commission
  pos("সচিব (দুদক)", "anti-corruption-commission", "গ্রেড ২", null, "সচিব", "জনাব সচিব", "চেয়ারম্যান, দুদক",
    "দুর্নীতি তদন্ত ও প্রতিরোধ সংক্রান্ত সেবা", "সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "দুদকের প্রশাসনিক কার্যক্রম পরিচালনা ও তদন্ত সমন্বয়"),

  // Human Rights Commission
  pos("সচিব (মানবাধিকার কমিশন)", "human-rights-commission", "গ্রেড ২", null, "সচিব", "জনাব সচিব", "চেয়ারম্যান, মানবাধিকার কমিশন",
    "মানবাধিকার সুরক্ষা সংক্রান্ত সেবা", "সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "মানবাধিকার কমিশনের প্রশাসনিক কার্যক্রম পরিচালনা"),

  // Info Commission
  pos("সচিব (তথ্য কমিশন)", "info-commission-bd", "গ্রেড ২", null, "সচিব", "জনাব সচিব", "চেয়ারম্যান, তথ্য কমিশন",
    "তথ্য অধিকার সেবা", "সিনিয়র সিভিল কর্মকর্তা থেকে নিয়োগ", "তথ্য কমিশনের প্রশাসনিক ও আপিল ব্যবস্থাপনা"),
];

// Add admin positions for remaining Legislative/Judiciary/Constitutional offices without positions
const remainingAdminPositions = [];

[
  { id: "legislature-whip", ministry: "জাতীয় সংসদ" },
  { id: "legislature-opposition", ministry: "জাতীয় সংসদ" },
  { id: "legislature-committee", ministry: "জাতীয় সংসদ" },
  { id: "legislature-library", ministry: "জাতীয় সংসদ" },
  { id: "legislature-caucus", ministry: "জাতীয় সংসদ" },
  { id: "legislature-tv", ministry: "জাতীয় সংসদ" },
  { id: "judiciary-supreme-court", ministry: "সুপ্রিম কোর্ট" },
  { id: "judiciary-family", ministry: "সুপ্রিম কোর্ট" },
  { id: "judiciary-labour", ministry: "সুপ্রিম কোর্ট" },
].forEach(o => {
  remainingAdminPositions.push(...adminPositions(o.id, null, o.ministry));
});

// Also add deputy secretary, assistant secretary etc. for road-bba etc.
// Actually the adminPositions already covers that. Let me add a few more specific ones.

// Specific additions for some of the remaining offices
const extraPositions = [
  // BTV
  pos("মহাপরিচালক (বাংলাদেশ টেলিভিশন)", "info-btv", "গ্রেড ২", null, "যুগ্মসচিব", "মাননীয় মহাপরিচালক", "তথ্য মন্ত্রণালয়",
    "টেলিভিশন সম্প্রচার সেবা প্রদান", "অতিরিক্ত মহাপরিচালক থেকে পদোন্নতি", "BTV-র সার্বিক সম্প্রচার ও প্রশাসনিক কার্যক্রম পরিচালনা"),
  pos("অতিরিক্ত মহাপরিচালক (প্রযোজনা)", "info-btv", "গ্রেড ৩", null, "উপসচিব", "জনাব", "তথ্য মন্ত্রণালয়",
    "অনুষ্ঠান প্রযোজনা ও সম্প্রচার সেবা", "পরিচালক থেকে পদোন্নতি", "অনুষ্ঠান প্রযোজনা ও সম্প্রচার তদারকি"),

  // Betar
  pos("মহাপরিচালক (বাংলাদেশ বেতার)", "info-betar", "গ্রেড ২", null, "যুগ্মসচিব", "মাননীয় মহাপরিচালক", "তথ্য মন্ত্রণালয়",
    "বেতার সম্প্রচার সেবা প্রদান", "অতিরিক্ত মহাপরিচালক থেকে পদোন্নতি", "বাংলাদেশ বেতারের সার্বিক সম্প্রচার ব্যবস্থাপনা"),

  // BSS
  pos("মহাপরিচালক (বাংলাদেশ সংবাদ সংস্থা)", "info-bss", "গ্রেড ৩", null, "উপসচিব", "জনাব মহাপরিচালক", "তথ্য মন্ত্রণালয়",
    "জাতীয় সংবাদ সেবা প্রদান", "পরিচালক থেকে পদোন্নতি", "BSS-র সার্বিক সংবাদ সংগ্রহ ও পরিবেশন ব্যবস্থাপনা"),

  // Film Directorate
  pos("পরিচালক (চলচ্চিত্র ও প্রকাশনা)", "info-films", "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", "তথ্য মন্ত্রণালয়",
    "চলচ্চিত্র সেন্সর ও প্রকাশনা সেবা", "উপ-পরিচালক থেকে পদোন্নতি", "চলচ্চিত্র সেন্সর ও প্রকাশনা নিবন্ধন কার্যক্রম পরিচালনা"),

  // Medical College
  pos("অধ্যক্ষ (ঢাকা মেডিকেল কলেজ)", "health-dmch", "গ্রেড ৩", null, "অধ্যক্ষ", "মাননীয় অধ্যাপক অধ্যক্ষ", "স্বাস্থ্য শিক্ষা অধিদপ্তর",
    "চিকিৎসা শিক্ষা ও হাসপাতাল সেবা", "অধ্যাপক থেকে পদোন্নতি", "মেডিকেল কলেজের শিক্ষা ও হাসপাতাল ব্যবস্থাপনা পরিচালনা"),

  // DME
  pos("পরিচালক (স্বাস্থ্য শিক্ষা অধিদপ্তর)", "health-dme", "গ্রেড ৩", null, "যুগ্মসচিব", "জনাব পরিচালক", "স্বাস্থ্য মন্ত্রণালয়",
    "স্বাস্থ্য শিক্ষা প্রতিষ্ঠান তদারকি সেবা", "অধ্যাপক বা সিনিয়র চিকিৎসক থেকে নিয়োগ", "সারাদেশের স্বাস্থ্য শিক্ষা প্রতিষ্ঠান তদারকি ও মান নিয়ন্ত্রণ"),
];

// Section D: Education Board positions
const boardPositions = [
  pos("চেয়ারম্যান (ঢাকা শিক্ষা বোর্ড)", "board-dhaka", "গ্রেড ৩", null, "যুগ্মসচিব", "মাননীয় চেয়ারম্যান", "শিক্ষা মন্ত্রণালয়",
    "মাধ্যমিক ও উচ্চমাধ্যমিক পরীক্ষা সেবা", "সিনিয়র শিক্ষাবিদ থেকে পদোন্নতি", "শিক্ষা বোর্ডের সার্বিক কার্যক্রম পরিচালনা ও পরীক্ষা ব্যবস্থাপনা"),
  pos("সচিব (ঢাকা শিক্ষা বোর্ড)", "board-dhaka", "গ্রেড ৪", null, "উপসচিব", "জনাব সচিব", "চেয়ারম্যান, ঢাকা শিক্ষা বোর্ড",
    "বোর্ডের প্রশাসনিক সেবা", "উপ-পরিচালক থেকে পদোন্নতি", "শিক্ষা বোর্ডের প্রশাসনিক কাজ ও পরীক্ষা আয়োজন"),
  pos("চেয়ারম্যান (কারিগরি শিক্ষা বোর্ড)", "board-technical", "গ্রেড ৩", null, "যুগ্মসচিব", "মাননীয় চেয়ারম্যান", "শিক্ষা মন্ত্রণালয়",
    "কারিগরি শিক্ষা পরীক্ষা সেবা", "সিনিয়র শিক্ষাবিদ থেকে নিয়োগ", "কারিগরি শিক্ষা বোর্ডের সার্বিক পরিচালনা"),
  pos("চেয়ারম্যান (মাদ্রাসা শিক্ষা বোর্ড)", "board-madrasah", "গ্রেড ৩", null, "যুগ্মসচিব", "মাননীয় চেয়ারম্যান", "শিক্ষা মন্ত্রণালয়",
    "মাদ্রাসা শিক্ষা পরীক্ষা সেবা", "সিনিয়র শিক্ষাবিদ থেকে নিয়োগ", "মাদ্রাসা শিক্ষা বোর্ডের সার্বিক পরিচালনা"),
];

// Section E: Bangladesh Bank & Education Dept positions
const miscPositions = [
  // BNFE
  pos("পরিচালক (উপানুষ্ঠানিক শিক্ষা ব্যুরো)", "primary-bnfe", "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", "প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়",
    "প্রাপ্তবয়স্ক শিক্ষা ও সাক্ষরতা সেবা", "উপ-পরিচালক থেকে পদোন্নতি", "উপানুষ্ঠানিক শিক্ষা কার্যক্রম বাস্তবায়ন ও তদারকি"),

  // Hill Council
  pos("চেয়ারম্যান (পার্বত্য চট্টগ্রাম আঞ্চলিক পরিষদ)", "mochta-ctg-hill-council", "গ্রেড ৩", null, "প্রতিমন্ত্রী পদমর্যাদা", "মাননীয় চেয়ারম্যান", "পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়",
    "পার্বত্য অঞ্চলের আঞ্চলিক উন্নয়ন সেবা", "স্থানীয় প্রতিনিধি থেকে নির্বাচিত", "আঞ্চলিক পরিষদের কার্যক্রম পরিচালনা ও উন্নয়ন সমন্বয়"),

  // Hill Dev Board
  pos("প্রকল্প পরিচালক (পার্বত্য চট্টগ্রাম উন্নয়ন বোর্ড)", "mochta-ctg-dev-board", "গ্রেড ৪", null, "উপসচিব", "জনাব", "পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়",
    "পার্বত্য অঞ্চলের অবকাঠামো উন্নয়ন সেবা", "সিনিয়র প্রকৌশলী থেকে পদোন্নতি", "উন্নয়ন প্রকল্প বাস্তবায়ন ও তদারকি"),
];

// Combine all new positions
const allNewPositions = [
  ...execPositions,
  ...part3OfficePositions,
  ...legOfficePositions,
  ...remainingAdminPositions,
  ...extraPositions,
  ...boardPositions,
  ...miscPositions,
];

// Combine all new offices
const allNewOffices = [
  ...executiveNew,
  ...infoDept,
  ...eduBoards,
  ...primaryDept,
  ...healthDept,
  ...constitutionalNew,
  ...legislativeNew,
  ...judiciaryNew,
];

// Write updated files
const finalOffices = [...offices, ...allNewOffices];
const finalPositions = [...positions, ...allNewPositions];

fs.writeFileSync(path.join(DATA_DIR, 'offices.json'), JSON.stringify(finalOffices, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'positions.json'), JSON.stringify(finalPositions, null, 2), 'utf8');

console.log(`Offices: ${offices.length} → ${finalOffices.length} (added ${allNewOffices.length})`);
console.log(`Positions: ${positions.length} → ${finalPositions.length} (added ${allNewPositions.length})`);
console.log("Categories:", [...new Set(finalOffices.map(o => o.category))].join(", "));
