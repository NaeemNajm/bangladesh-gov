const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

// Load existing data
const offices = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'offices.json'), 'utf8'));
const part3 = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'part3.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'positions.json'), 'utf8'));

// Build index of existing office IDs
const officeIndex = {};
offices.forEach((o, i) => { officeIndex[o.id] = i; });

// Track which part3.officess were merged
const mergedIds = new Set();

// Merge part3.json into offices.json
part3.forEach(p3 => {
  if (officeIndex[p3.id] !== undefined) {
    const idx = officeIndex[p3.id];
    // preserved fields: category, parent_office_id
    const category = offices[idx].category;
    const parent = offices[idx].parent_office_id;
    offices[idx] = { ...p3, category, parent_office_id: parent };
    mergedIds.add(p3.id);
  } else {
    offices.push(p3);
    mergedIds.add(p3.id);
  }
});

// ===== LEGISLATIVE BRANCH OFFICES =====
const legislativeOffices = [
  {
    id: "legislature-parliament",
    name_bn: "জাতীয় সংসদ",
    parent_office_id: "bd",
    office_type_bn: "সর্বোচ্চ আইনসভা",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান; সংসদ পরিচালনা বিধি",
    target_audience_bn: "১৭ কোটি নাগরিক ও তাদের নির্বাচিত প্রতিনিধিগণ",
    category: "Legislative",
    contact_info: {
      website: "www.parliament.gov.bd",
      phone: "+৮৮০-২-৮১২৩৩৩৩"
    },
    description_bn: "বাংলাদেশের সর্বোচ্চ আইনসভা। গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানের ৬৫(১) অনুচ্ছেদ অনুযায়ী গঠিত এককক্ষ বিশিষ্ট এ সংসদে ৩৫০টি আসন রয়েছে, যার মধ্যে ৩০০টি নির্বাচিত ও ৫০টি সংরক্ষিত মহিলা আসন। আইন প্রণয়ন, সরকারি নীতি নির্ধারণ ও তদারকি, বাজেট অনুমোদন এবং প্রশাসনিক কার্যক্রমের ওপর সংসদীয় কমিটির মাধ্যমে নজরদারি এই সংসদের প্রধান কাজ।"
  },
  {
    id: "legislature-speaker",
    name_bn: "স্পিকারের কার্যালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সাংবিধানিক পদ ও কার্যালয়",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংবিধানের ৭৪ অনুচ্ছেদ; সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংসদ সদস্যবৃন্দ, সরকার ও বিরোধী দল",
    category: "Legislative",
    contact_info: {
      website: "www.parliament.gov.bd",
      phone: "+৮৮০-২-৮১২৩৩৩৩"
    },
    description_bn: "জাতীয় সংসদের সভাপতি ও সর্বোচ্চ কর্তা। সংসদের কার্যক্রম সুষ্ঠু ও নিরপেক্ষভাবে পরিচালনা, সংসদীয় শৃঙ্খলা রক্ষা, বিল পাসের প্রক্রিয়া তদারকি এবং সংসদের বাহ্যিক প্রতিনিধিত্ব করেন। স্পিকার সংসদ সদস্যদের মধ্যে থেকে নির্বাচিত হন এবং তার অনুপস্থিতিতে ডেপুটি স্পিকার দায়িত্ব পালন করেন।"
  },
  {
    id: "legislature-ds",
    name_bn: "ডেপুটি স্পিকারের কার্যালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সাংবিধানিক পদ ও কার্যালয়",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংবিধানের ৭৪ অনুচ্ছেদ; সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংসদ সদস্যবৃন্দ",
    category: "Legislative",
    contact_info: {
      website: "www.parliament.gov.bd"
    },
    description_bn: "স্পিকারের অনুপস্থিতিতে জাতীয় সংসদের অধিবেশন পরিচালনা করেন। স্পিকার পদে শূন্যতা দেখা দিলে ডেপুটি স্পিকার স্পিকারের দায়িত্ব পালন করেন। সংসদীয় কার্যক্রমে স্পিকারকে সহায়তা ও পরামর্শ প্রদান করেন।"
  },
  {
    id: "legislature-secretariat",
    name_bn: "সংসদ সচিবালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "স্থায়ী দপ্তর (সাংবিধানিক সচিবালয়)",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংসদ সচিবালয় বিধিমালা, ২০১০; সংবিধান",
    target_audience_bn: "সংসদ সদস্য, সংসদ কমিটি এবং সরকারি দপ্তরসমূহ",
    category: "Legislative",
    contact_info: {
      website: "www.parliament.gov.bd",
      phone: "+৮৮০-২-৮১২৩৩৩৩"
    },
    description_bn: "জাতীয় সংসদের স্থায়ী প্রশাসনিক দপ্তর। সংসদের কার্যক্রম পরিচালনা, বিল ও এজেন্ডা প্রস্তুত, কমিটির সভা আয়োজন, ভোট গণনা ও রেকর্ড সংরক্ষণ করে। সংসদ সচিব এই দপ্তরের প্রধান নির্বাহী কর্মকর্তা।"
  },
  {
    id: "legislature-whip",
    name_bn: "সরকারি হুইপের কার্যালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় পদ ও কার্যালয়",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংবিধান ও সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংসদ সদস্যবৃন্দ",
    category: "Legislative",
    contact_info: {},
    description_bn: "সরকারি দলের সংসদ সদস্যদের মধ্যে শৃঙ্খলা ও সমন্বয় রক্ষা করেন। গুরুত্বপূর্ণ ভোটাভুটিতে দলের সদস্যদের উপস্থিতি নিশ্চিত করা এবং দলের সিদ্ধান্ত অনুযায়ী ভোট প্রদানে উৎসাহিত করা হুইপের প্রধান দায়িত্ব।"
  },
  {
    id: "legislature-opposition",
    name_bn: "বিরোধী দলীয় কার্যালয়",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় কার্যালয়",
    jurisdiction_bn: "জাতীয় সংসদ",
    governing_law_bn: "সংবিধান ও সংসদ পরিচালনা বিধি",
    target_audience_bn: "বিরোধী দলের সংসদ সদস্যবৃন্দ",
    category: "Legislative",
    contact_info: {},
    description_bn: "সংসদে বিরোধী দলের কার্যক্রম সমন্বয় ও পরিচালনা করে। বিরোধী দলীয় নেতা সরকারের নীতি ও কার্যক্রমের ওপর গঠনমূলক সমালোচনা ও বিকল্প প্রস্তাব প্রদান করেন। সংসদীয় গণতন্ত্রে বিরোধী দলের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ।"
  },
  {
    id: "legislature-committee",
    name_bn: "সংসদীয় স্থায়ী কমিটিসমূহ",
    parent_office_id: "legislature-parliament",
    office_type_bn: "সংসদীয় কমিটি",
    jurisdiction_bn: "বরাদ্দকৃত মন্ত্রণালয় ও বিভাগসমূহ",
    governing_law_bn: "সংবিধানের ৭৬ অনুচ্ছেদ; সংসদ পরিচালনা বিধি",
    target_audience_bn: "সংশ্লিষ্ট মন্ত্রণালয় ও সংসদ সদস্যবৃন্দ",
    category: "Legislative",
    contact_info: {},
    description_bn: "প্রতি মন্ত্রণালয়ের জন্য গঠিত সংসদীয় স্থায়ী কমিটি সরকারের কার্যক্রম তদারকি করে। বাজেট বাস্তবায়ন, নীতি নির্ধারণ ও আইন প্রয়োগ মনিটরিং এবং সংসদে প্রতিবেদন পেশ করা এই কমিটিগুলোর প্রধান কাজ। বর্তমানে ৫০টি স্থায়ী কমিটি সক্রিয় রয়েছে।"
  },
  {
    id: "legislature-library",
    name_bn: "জাতীয় সংসদ গ্রন্থাগার",
    parent_office_id: "legislature-parliament",
    office_type_bn: "গবেষণা ও তথ্যকেন্দ্র",
    jurisdiction_bn: "জাতীয় সংসদ ভবন",
    governing_law_bn: "সংসদ সচিবালয় বিধিমালা, ২০১০",
    target_audience_bn: "সংসদ সদস্য, গবেষক ও সংসদ কর্মকর্তাবৃন্দ",
    category: "Legislative",
    contact_info: {},
    description_bn: "সংসদ সদস্যদের জন্য গবেষণা ও তথ্য সহায়তা প্রদান করে। আইন প্রণয়ন, নীতি বিশ্লেষণ ও সংসদীয় কার্যক্রম সম্পর্কিত তথ্য-উপাত্ত সংরক্ষণ ও সরবরাহ করে। দেশি-বিদেশি আইন, সংবিধান ও সংসদীয় পদ্ধতি বিষয়ক গ্রন্থ ও জার্নালের সমৃদ্ধ সংগ্রহ রয়েছে।"
  }
];

// ===== JUDICIARY BRANCH OFFICES =====
const judiciaryOffices = [
  {
    id: "judiciary-supreme-court",
    name_bn: "সুপ্রিম কোর্ট",
    parent_office_id: "bd",
    office_type_bn: "সর্বোচ্চ আদালত",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানের ৯৪-১০৯ অনুচ্ছেদ; সুপ্রিম কোর্ট (আপিল বিভাগ) বিধিমালা, ১৯৮৮",
    target_audience_bn: "সকল নাগরিক, আইনজীবী, বিচারপ্রার্থী ও সরকারি প্রতিষ্ঠান",
    category: "Judiciary",
    contact_info: {
      website: "www.supremecourt.gov.bd",
      phone: "+৮৮০-২-৯৫৬২৯৪১"
    },
    description_bn: "বাংলাদেশের সর্বোচ্চ আদালত এবং বিচার বিভাগের শীর্ষ প্রতিষ্ঠান। সংবিধানের ৯৪(১) অনুচ্ছেদ অনুযায়ী গঠিত সুপ্রিম কোর্ট আপিল বিভাগ ও হাইকোর্ট বিভাগ নিয়ে গঠিত। প্রধান বিচারপতি সুপ্রিম কোর্টের প্রধান। আইনের চূড়ান্ত ব্যাখ্যা ও সংবিধানের অভিভাবক হিসেবে কাজ করে।"
  },
  {
    id: "judiciary-appellate",
    name_bn: "আপিল বিভাগ",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "সর্বোচ্চ আপিল আদালত",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "সংবিধানের ১০৩-১০৭ অনুচ্ছেদ; সুপ্রিম কোর্ট (আপিল বিভাগ) বিধিমালা, ১৯৮৮",
    target_audience_bn: "হাইকোর্ট বিভাগের রায়ের বিরুদ্ধে আপিলকারীগণ",
    category: "Judiciary",
    contact_info: {
      website: "www.supremecourt.gov.bd",
      phone: "+৮৮০-২-৯৫৬২৯৪১"
    },
    description_bn: "বাংলাদেশের সর্বোচ্চ আপিল আদালত। প্রধান বিচারপতি ও অন্যান্য বিচারকগণ নিয়ে গঠিত। হাইকোর্ট বিভাগের দেওয়া রায় ও আদেশের বিরুদ্ধে আপিল শুনানি ও নিষ্পত্তি করে। এ বিভাগের রায়ই চূড়ান্ত এবং এর বিরুদ্ধে আর কোনো আপিল করা যায় না। সংবিধানের ব্যাখ্যা ও মৌলিক অধিকার সংক্রান্ত গুরুত্বপূর্ণ মামলা নিষ্পত্তি করে।"
  },
  {
    id: "judiciary-hc",
    name_bn: "হাইকোর্ট বিভাগ",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "আইনগত এখতিয়ার সম্পন্ন আদালত",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "সংবিধানের ১০১-১০৯ অনুচ্ছেদ; হাইকোর্ট বিধিমালা",
    target_audience_bn: "সকল নাগরিক, আইনজীবী ও বিচারপ্রার্থীগণ",
    category: "Judiciary",
    contact_info: {
      website: "www.supremecourt.gov.bd"
    },
    description_bn: "সুপ্রিম কোর্টের দ্বিতীয় বিভাগ। রিট, আপিল, ফৌজদারি ও দেওয়ানি মামলার বিচার করে। সংবিধানের ১০২ অনুচ্ছেদ অনুযায়ী মৌলিক অধিকার সংরক্ষণে রিট মামলা দায়ের ও নিষ্পত্তি করে। অধস্তন আদালতের ওপর তত্ত্বাবধান ও নিয়ন্ত্রণ রাখে। বর্তমানে হাইকোর্ট বিভাগে ১০০ জনের অধিক বিচারক কর্মরত।"
  },
  {
    id: "judiciary-chief-justice",
    name_bn: "প্রধান বিচারপতির কার্যালয়",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "সাংবিধানিক পদ ও কার্যালয়",
    jurisdiction_bn: "সমগ্র বাংলাদেশের বিচার বিভাগ",
    governing_law_bn: "সংবিধানের ৯৪-৯৫ অনুচ্ছেদ; সুপ্রিম কোর্ট বিধিমালা",
    target_audience_bn: "বিচারক, আইনজীবী ও বিচার বিভাগীয় কর্মকর্তাবৃন্দ",
    category: "Judiciary",
    contact_info: {
      phone: "+৮৮০-২-৯৫৬২৯৪১"
    },
    description_bn: "বাংলাদেশ সুপ্রিম কোর্টের প্রধান বিচারপতি ও বিচার বিভাগের সর্বোচ্চ কর্তা। সংবিধানের ৯৫(১) অনুচ্ছেদ অনুযায়ী রাষ্ট্রপতি কর্তৃক নিযুক্ত। বিচারকদের নিয়োগ, পদোন্নতি ও বদলির বিষয়ে রাষ্ট্রপতিকে পরামর্শ দেন এবং সুপ্রিম কোর্টের সার্বিক প্রশাসনিক দায়িত্ব পালন করেন। আপিল বিভাগের প্রধান হিসেবে বিচারিক কার্যক্রম পরিচালনা করেন।"
  },
  {
    id: "judiciary-registrar",
    name_bn: "সুপ্রিম কোর্ট রেজিস্ট্রারের কার্যালয়",
    parent_office_id: "judiciary-supreme-court",
    office_type_bn: "প্রশাসনিক দপ্তর",
    jurisdiction_bn: "সুপ্রিম কোর্ট",
    governing_law_bn: "সুপ্রিম কোর্ট বিধিমালা, ১৯৮৮",
    target_audience_bn: "আইনজীবী, মামলাকারী ও আদালত কর্মকর্তাবৃন্দ",
    category: "Judiciary",
    contact_info: {
      phone: "+৮৮০-২-৯৫৬২৯৪২"
    },
    description_bn: "সুপ্রিম কোর্টের প্রশাসনিক ও ব্যবস্থাপনা সংক্রান্ত সকল কার্যক্রম পরিচালনা করে। মামলা নিবন্ধন, আদেশ ও রায় সংরক্ষণ, জুরি তালিকা প্রস্তুত এবং আদালতের রেকর্ড ও নথিপত্রের যত্ন নেওয়া এই কার্যালয়ের দায়িত্ব। রেজিস্ট্রার সুপ্রিম কোর্টের প্রধান প্রশাসনিক কর্মকর্তা।"
  },
  {
    id: "judiciary-law-commission",
    name_bn: "আইন কমিশন",
    parent_office_id: "bd",
    office_type_bn: "সাংবিধানিক/স্বায়ত্তশাসিত সংস্থা",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "আইন কমিশন আইন, ১৯৯৬",
    target_audience_bn: "সরকার, আইনপ্রণেতা ও বিচার বিভাগ",
    category: "Judiciary",
    contact_info: {
      website: "www.lawcommission.gov.bd"
    },
    description_bn: "দেশের প্রচলিত আইন পর্যালোচনা, সংস্কার প্রস্তাবনা প্রস্তুত ও আইনের যুগোপযোগীকরণের লক্ষ্যে গবেষণা ও সুপারিশ প্রদান করে। আইন কমিশন আইন, ১৯৯৬-এর অধীনে গঠিত এই সংস্থা সমাজের পরিবর্তিত চাহিদা ও আন্তর্জাতিক মানদণ্ডের আলোকে আইন সংস্কারের কাজ করে।"
  },
  {
    id: "judiciary-legal-aid",
    name_bn: "জাতীয় আইনগত সহায়তা প্রদান সংস্থা",
    parent_office_id: "bd",
    office_type_bn: "স্বায়ত্তশাসিত সংস্থা",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "আইনগত সহায়তা প্রদান আইন, ২০০০",
    target_audience_bn: "দরিদ্র, অসহায় ও আইনি সহায়তাপ্রার্থী নাগরিকগণ",
    category: "Judiciary",
    contact_info: {
      "website": "www.legalaid.gov.bd",
      phone: "+৮৮০-২-৯৫৬২৯৪৩"
    },
    description_bn: "অসচ্ছল ও অসহায় নাগরিকদের বিনামূল্যে আইনগত সহায়তা প্রদান করে। ফৌজদারি ও দেওয়ানি মামলায় আইনজীবী প্রদান, আইনি পরামর্শ ও মধ্যস্থতার মাধ্যমে ন্যায়বিচার নিশ্চিত করা এই সংস্থার লক্ষ্য। জেলা ও উপজেলা পর্যায়ে আইনগত সহায়তা কমিটির মাধ্যমে কার্যক্রম পরিচালিত হয়।"
  },
  {
    id: "judiciary-ati",
    name_bn: "এন্টি করাপশন ট্রাইব্যুনাল",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত আদালত",
    jurisdiction_bn: "সমগ্র বাংলাদেশ",
    governing_law_bn: "দুর্নীতি দমন কমিশন আইন, ২০০৪; ফৌজদারি কার্যবিধি",
    target_audience_bn: "দুর্নীতি মামলায় অভিযুক্ত ব্যক্তি ও সরকারি কর্মকর্তাবৃন্দ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "দুর্নীতি সংক্রান্ত বিশেষ মামলা নিষ্পত্তির জন্য গঠিত বিশেষায়িত আদালত। দুর্নীতি দমন কমিশনের (দুদক) তদন্তকৃত মামলার বিচার কার্য পরিচালনা করে। দ্রুত ও কার্যকর বিচারের মাধ্যমে দুর্নীতি প্রতিরোধে গুরুত্বপূর্ণ ভূমিকা রাখে।"
  },
  {
    id: "judiciary-district-judge",
    name_bn: "জেলা জজ আদালত",
    parent_office_id: "judiciary-hc",
    office_type_bn: "জেলা পর্যায়ের সর্বোচ্চ আদালত",
    jurisdiction_bn: "প্রতি জেলা",
    governing_law_bn: "ফৌজদারি কার্যবিধি, ১৮৯৮; দেওয়ানি কার্যবিধি, ১৯০৮",
    target_audience_bn: "জেলা পর্যায়ের বিচারপ্রার্থী ও সাধারণ নাগরিকগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "প্রতি জেলায় অবস্থিত জেলা পর্যায়ের সর্বোচ্চ আদালত। দেওয়ানি ও ফৌজদারি উভয় ধরনের মামলা বিচার করে। জেলা জজ এই আদালতের প্রধান বিচারক। অধীনস্থ ম্যাজিস্ট্রেট ও অন্যান্য আদালতের ওপর তত্ত্বাবধান ও নিয়ন্ত্রণ রাখে। ফৌজদারি মামলায়死刑 অনুমোদনের এখতিয়ার রয়েছে।"
  },
  {
    id: "judiciary-magistrate",
    name_bn: "চীফ জুডিসিয়াল ম্যাজিস্ট্রেট আদালত",
    parent_office_id: "judiciary-hc",
    office_type_bn: "জেলা ম্যাজিস্ট্রেট আদালত",
    jurisdiction_bn: "প্রতি জেলা",
    governing_law_bn: "ফৌজদারি কার্যবিধি, ১৮৯৮; ম্যাজিস্ট্রেট বিধিমালা",
    target_audience_bn: "ফৌজদারি মামলায় জড়িত নাগরিক ও সাধারণ জনগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "জেলা পর্যায়ের ফৌজদারি মামলা বিচারের প্রধান আদালত। চীফ জুডিসিয়াল ম্যাজিস্ট্রেটের নেতৃত্বে জুডিসিয়াল ম্যাজিস্ট্রেটগণ ফৌজদারি মামলা, জামিন আবেদন ও প্রাথমিক বিচারিক কার্যক্রম পরিচালনা করেন। জুডিসিয়াল ম্যাজিস্ট্রেটগণ নির্বাহী ম্যাজিস্ট্রেট থেকে পৃথক এবং বিচার বিভাগের স্বাধীনভাবে কাজ করেন।"
  },
  {
    id: "judiciary-family",
    name_bn: "পারিবারিক আদালত",
    parent_office_id: "judiciary-district-judge",
    office_type_bn: "বিশেষায়িত আদালত",
    jurisdiction_bn: "প্রতি জেলা",
    governing_law_bn: "পারিবারিক আদালত অধ্যাদেশ, ১৯৮৫; মুসলিম পারিবারিক আইন, ১৯৬১",
    target_audience_bn: "পারিবারিক ও বৈবাহিক বিবাদে জড়িত নাগরিকগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "পারিবারিক ও বৈবাহিক বিষয়ক মামলা নিষ্পত্তির জন্য বিশেষায়িত আদালত। বিবাহ বিচ্ছেদ, শিশু ভরণপোষণ, যৌতুক, সন্তান custody ও সম্পত্তি বণ্টন সংক্রান্ত মামলা এখানে বিচার হয়। পারিবারিক আদালতে মীমাংসা ও মধ্যস্থতার মাধ্যমে মামলা নিষ্পত্তির ওপর জোর দেওয়া হয়।"
  },
  {
    id: "judiciary-labour",
    name_bn: "শ্রম আদালত",
    parent_office_id: "judiciary-hc",
    office_type_bn: "বিশেষায়িত আদালত",
    jurisdiction_bn: "নির্ধারিত শ্রম এলাকা",
    governing_law_bn: "বাংলাদেশ শ্রম আইন, ২০০৬",
    target_audience_bn: "শ্রমিক, চাকরিজীবী ও নিয়োগকর্তাগণ",
    category: "Judiciary",
    contact_info: {},
    description_bn: "শ্রম ও কর্মসংস্থান সংক্রান্ত বিবাদ নিষ্পত্তির জন্য বিশেষায়িত আদালত। চাকরিচ্যুতি, মজুরি ও অন্যান্য শ্রমিক অধিকার সংক্রান্ত মামলা এখানে বিচার হয়। শ্রম আদালতের রায়ের বিরুদ্ধে শ্রম আপিল ট্রাইব্যুনালে আপিল করা যায়।"
  }
];

// ===== NEW POSITIONS =====
const lastPosId = positions.reduce((max, p) => {
  const num = parseInt(p.id.replace('pos-', ''), 10);
  return num > max ? num : max;
}, 0);

let posCounter = lastPosId + 1;

function makePos(designation_bn, office_id, pay_grade_bn, parent_position_id, equivalent_rank_bn, salutation, appointing_authority_bn, service_usecase, career_progression, responsibilities) {
  return {
    id: `pos-${String(posCounter++).padStart(4, '0')}`,
    office_id,
    designation_bn,
    pay_grade_bn,
    parent_position_id,
    equivalent_rank_bn,
    official_salutation_bn: salutation,
    appointing_authority_bn,
    public_service_usecase_bn: service_usecase,
    career_progression_bn: career_progression,
    responsibilities_bn: responsibilities
  };
}

const newPositions = [
  // === LEGISLATIVE POSITIONS ===
  makePos("সংসদ সচিব (সচিব)", "legislature-secretariat", "গ্রেড ১", null, "সিনিয়র সচিব", "মাননীয় সচিব", "রাষ্ট্রপতি", "সংসদীয় কার্যক্রম ও বিল প্রস্তুতকরণ সংক্রান্ত সার্বিক সেবা প্রদান", "যুগ্মসচিব থেকে পদোন্নতি; পরবর্তীতে মন্ত্রিপরিষদ সচিব পদে উন্নীত হওয়া সম্ভব", "সংসদ সচিবালয়ের প্রধান নির্বাহী, বিল ও এজেন্ডা প্রস্তুতকরণ তদারকি"),
  makePos("যুগ্মসচিব (সংসদ)", "legislature-secretariat", "গ্রেড ২", null, "যুগ্মসচিব", "জনাব যুগ্মসচিব", "সংসদ সচিব", "সংসদীয় কমিটির সভা পরিচালনা ও প্রতিবেদন প্রস্তুত", "উপসচিব থেকে পদোন্নতি", "কমিটির কার্যক্রম সমন্বয় ও বিল বিশ্লেষণ"),
  makePos("উপসচিব (সংসদ)", "legislature-secretariat", "গ্রেড ৪", null, "উপসচিব", "জনাব উপসচিব", "সংসদ সচিবালয়", "সংসদীয় প্রশ্নোত্তর ও এজেন্ডা প্রস্তুতকরণ", "সিনিয়র সহকারী সচিব থেকে পদোন্নতি", "সংসদীয় প্রশ্নোত্তর ও বিলের খসড়া পরীক্ষা"),
  makePos("সিনিয়র সহকারী সচিব (সংসদ)", "legislature-secretariat", "গ্রেড ৬", null, "সিনিয়র সহকারী সচিব", "জনাব", "সংসদ সচিবালয়", "সংসদ সদস্যদের তথ্য ও গবেষণা সহায়তা প্রদান", "সহকারী সচিব থেকে পদোন্নতি", "গবেষণা ও তথ্য সরবরাহ, কমিটির নোট প্রস্তুত"),
  makePos("সহকারী সচিব (সংসদ)", "legislature-secretariat", "গ্রেড ৯", null, "সহকারী সচিব", "জনাব", "সংসদ সচিবালয়", "সংসদ সদস্যদের রুটিন সেবা ও তথ্য সহায়তা", "প্রথম শ্রেণীর কর্মকর্তা হিসেবে যোগদান", "সংসদ সচিবালয়ের রুটিন প্রশাসনিক কাজ"),

  // === JUDICIARY POSITIONS ===
  makePos("প্রধান বিচারপতি", "judiciary-chief-justice", "গ্রেড ১ (সর্বোচ্চ)", null, "রাষ্ট্রপতির পর সর্বোচ্চ পদ", "মাননীয় প্রধান বিচারপতি", "রাষ্ট্রপতি", "সর্বোচ্চ আদালতে ন্যায়বিচার প্রদান ও সংবিধানের ব্যাখ্যা", "হাইকোর্ট বিভাগের বিচারক থেকে পদোন্নতি", "সুপ্রিম কোর্টের প্রধান হিসেবে আপিল বিভাগের বিচারকার্য পরিচালনা"),
  makePos("আপিল বিভাগের বিচারক", "judiciary-appellate", "গ্রেড ২", null, "আপিল বিভাগের বিচারক", "মাননীয় বিচারপতি", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "চূড়ান্ত আপিল শুনানি ও নিষ্পত্তি", "হাইকোর্ট বিভাগের বিচারক থেকে পদোন্নতি", "আপিল বিভাগে মামলা শুনানি ও রায় প্রদান"),
  makePos("হাইকোর্ট বিভাগের বিচারক", "judiciary-hc", "গ্রেড ৩", null, "হাইকোর্ট বিভাগের বিচারক", "মাননীয় বিচারপতি", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "রিট, আপিল ও মূল মামলা শুনানি ও নিষ্পত্তি", "জেলা জজ বা আইনজীবী থেকে নিয়োগ; পরবর্তীতে আপিল বিভাগে পদোন্নতি সম্ভব", "হাইকোর্ট বিভাগে মামলা পরিচালনা ও রায় প্রদান"),
  makePos("রেজিস্ট্রার (সুপ্রিম কোর্ট)", "judiciary-registrar", "গ্রেড ৩", null, "যুগ্মসচিব", "জনাব রেজিস্ট্রার", "প্রধান বিচারপতি", "আদালতের রেকর্ড ও প্রশাসনিক সেবা প্রদান", "অতিরিক্ত রেজিস্ট্রার থেকে পদোন্নতি", "সুপ্রিম কোর্টের প্রশাসনিক ও রেকর্ড ব্যবস্থাপনা"),
  makePos("অতিরিক্ত রেজিস্ট্রার", "judiciary-registrar", "গ্রেড ৪", null, "উপসচিব", "জনাব", "প্রধান বিচারপতি", "মামলা নিবন্ধন ও রায় সংরক্ষণ সেবা", "সহকারী রেজিস্ট্রার থেকে পদোন্নতি", "মামলা নিবন্ধন ও আদালতের রেকর্ড সংরক্ষণ তদারকি"),
  makePos("সহকারী রেজিস্ট্রার", "judiciary-registrar", "গ্রেড ৬", null, "সিনিয়র সহকারী সচিব", "জনাব", "রেজিস্ট্রার", "মামলার তালিকা ও জুরি ব্যবস্থাপনা", "প্রথম শ্রেণীর কর্মকর্তা হিসেবে যোগদান", "মামলার তালিকা প্রস্তুত ও আদালতের রুটিন প্রশাসনিক কাজ"),
  makePos("জেলা জজ", "judiciary-district-judge", "গ্রেড ৪", null, "জেলা জজ", "মাননীয় জেলা জজ", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "জেলা পর্যায়ে দেওয়ানি ও ফৌজদারি বিচার সেবা", "অতিরিক্ত জেলা জজ থেকে পদোন্নতি; পরবর্তীতে হাইকোর্ট বিভাগে পদোন্নতি সম্ভব", "জেলা আদালতের প্রধান বিচারক হিসেবে মামলা পরিচালনা ও তত্ত্বাবধান"),
  makePos("অতিরিক্ত জেলা জজ", "judiciary-district-judge", "গ্রেড ৫", null, "অতিরিক্ত জেলা জজ", "মাননীয় অতিরিক্ত জেলা জজ", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "জেলা আদালতে দেওয়ানি ও ফৌজদারি মামলা বিচার", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "জেলা আদালতে দেওয়ানি ও ফৌজদারি মামলা বিচার"),
  makePos("যুগ্ম জেলা জজ", "judiciary-district-judge", "গ্রেড ৬", null, "যুগ্ম জেলা জজ", "মাননীয় যুগ্ম জেলা জজ", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "জেলা আদালতে দেওয়ানি ও ফৌজদারি মামলা বিচার", "সিনিয়র সহকারী জজ থেকে পদোন্নতি", "জেলা আদালতে দেওয়ানি ও ফৌজদারি মামলা বিচার"),
  makePos("সিনিয়র সহকারী জজ", "judiciary-district-judge", "গ্রেড ৮", null, "সিনিয়র সহকারী জজ", "মাননীয় সিনিয়র সহকারী জজ", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "জেলা আদালতে দেওয়ানি মামলা বিচার সেবা", "সহকারী জজ থেকে পদোন্নতি", "জেলা আদালতে দেওয়ানি মামলা বিচার"),
  makePos("সহকারী জজ", "judiciary-district-judge", "গ্রেড ১০", null, "সহকারী জজ", "মাননীয় সহকারী জজ", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "প্রাথমিক দেওয়ানি মামলা বিচার সেবা", "বিচার বিভাগীয় পরীক্ষায় উত্তীर्ण হয়ে যোগদান", "প্রাথমিক দেওয়ানি মামলা বিচার"),
  makePos("চীফ জুডিসিয়াল ম্যাজিস্ট্রেট", "judiciary-magistrate", "গ্রেড ৪", null, "জেলা জজের সমমর্যাদা", "মাননীয় চীফ জুডিসিয়াল ম্যাজিস্ট্রেট", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "ফৌজদারি মামলায় জামিন ও বিচারিক সেবা", "সিনিয়র জুডিসিয়াল ম্যাজিস্ট্রেট থেকে পদোন্নতি", "জেলা ম্যাজিস্ট্রেট আদালতের প্রধান হিসেবে ফৌজদারি মামলা পরিচালনা"),
  makePos("সিনিয়র জুডিসিয়াল ম্যাজিস্ট্রেট", "judiciary-magistrate", "গ্রেড ৬", null, "সিনিয়র জুডিসিয়াল ম্যাজিস্ট্রেট", "মাননীয় ম্যাজিস্ট্রেট", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "ফৌজদারি মামলায় জামিন ও বিচার সেবা", "জুডিসিয়াল ম্যাজিস্ট্রেট থেকে পদোন্নতি", "ফৌজদারি মামলা বিচার ও জামিন আবেদন নিষ্পত্তি"),
  makePos("জুডিসিয়াল ম্যাজিস্ট্রেট", "judiciary-magistrate", "গ্রেড ৯", null, "জুডিসিয়াল ম্যাজিস্ট্রেট", "মাননীয় ম্যাজিস্ট্রেট", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "ফৌজদারি মামলায় প্রাথমিক বিচার ও জামিন সেবা", "বিচার বিভাগীয় পরীক্ষায় উত্তীর্ণ হয়ে যোগদান", "ফৌজদারি মামলায় প্রাথমিক বিচার ও জামিন শুনানি"),
  makePos("পারিবারিক আদালতের বিচারক", "judiciary-family", "গ্রেড ৬", null, "যুগ্ম জেলা জজ", "মাননীয় বিচারক", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "পারিবারিক ও বৈবাহিক বিবাদ নিষ্পত্তি সেবা", "সিনিয়র সহকারী জজ থেকে পদোন্নতি", "পারিবারিক মামলা নিষ্পত্তি ও মধ্যস্থতা পরিচালনা"),
  makePos("শ্রম আদালতের চেয়ারম্যান", "judiciary-labour", "গ্রেড ৫", null, "অতিরিক্ত জেলা জজ", "মাননীয় চেয়ারম্যান", "রাষ্ট্রপতি (প্রধান বিচারপতির পরামর্শে)", "শ্রম বিবাদ নিষ্পত্তি ও ন্যায়বিচার সেবা", "যুগ্ম জেলা জজ থেকে পদোন্নতি", "শ্রম আদালতের বিচারিক কার্যক্রম পরিচালনা"),
  makePos("আইন কমিশনের চেয়ারম্যান", "judiciary-law-commission", "গ্রেড ১", null, "বিচারপতি (অবসরপ্রাপ্ত)", "মাননীয় চেয়ারম্যান", "রাষ্ট্রপতি", "আইন সংস্কার ও গবেষণা প্রতিবেদন প্রস্তুত", "সুপ্রিম কোর্টের অবসরপ্রাপ্ত বিচারক থেকে নিয়োগ", "আইন সংস্কার ও গবেষণা কার্যক্রম পরিচালনা"),
  makePos("জাতীয় আইনগত সহায়তা সংস্থার পরিচালক", "judiciary-legal-aid", "গ্রেড ৪", null, "উপসচিব", "জনাব পরিচালক", "আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়", "অসহায় নাগরিকদের বিনামূল্যে আইনি সেবা প্রদান", "উপসচিব/যুগ্ম জেলা জজ থেকে পদোন্নতি", "আইনগত সহায়তা কার্যক্রমের সার্বিক ব্যবস্থাপনা"),
];

// Assemble final offices array
const finalOffices = [...offices, ...legislativeOffices, ...judiciaryOffices];
const finalPositions = [...positions, ...newPositions];

// Write files
fs.writeFileSync(path.join(DATA_DIR, 'offices.json'), JSON.stringify(finalOffices, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'positions.json'), JSON.stringify(finalPositions, null, 2), 'utf8');

console.log(`Offices: ${offices.length} → ${finalOffices.length} (added ${legislativeOffices.length + judiciaryOffices.length})`);
console.log(`Positions: ${positions.length} → ${finalPositions.length} (added ${newPositions.length})`);
console.log(`Merged part3 entries: ${mergedIds.size}`);
