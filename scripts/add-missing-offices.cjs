const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

let nextPosId = 8093;

function genPosId(prefix) {
  const id = `${prefix}-${nextPosId}`;
  nextPosId++;
  return id;
}

function makePosition(officeId, designation, payGrade, parentId, equivRank, salutation, appAuthority, usecase, career, resp, qual, appt) {
  return {
    id: genPosId(officeId),
    office_id: officeId,
    designation_bn: designation,
    pay_grade_bn: payGrade,
    parent_position_id: parentId || null,
    subordinate_position_ids: [],
    equivalent_rank_bn: equivRank || '',
    official_salutation_bn: salutation || '',
    appointing_authority_bn: appAuthority || '',
    public_service_usecase_bn: usecase || '',
    career_progression_bn: career || '',
    responsibilities_bn: resp || '',
    qualifications_bn: qual || '',
    appointment_process_bn: appt || '',
  };
}

// ================================================================
// 1. জনপ্রশাসন মন্ত্রণালয় (Ministry of Public Administration)
// ================================================================

const minPubId = 'min-public-admin';
offices.push({
  id: minPubId,
  name_bn: 'জনপ্রশাসন মন্ত্রণালয়',
  parent_office_id: 'pm-office',
  office_type_bn: 'মন্ত্রণালয়',
  jurisdiction_bn: 'সারা বাংলাদেশ',
  governing_law_bn: 'জনপ্রশাসন মন্ত্রণালয় পরিচালনা ও ব্যবস্থাপনা আইন, ২০২০',
  target_audience_bn: 'সরকারি কর্মচারী, চাকরিপ্রার্থী, সাধারণ নাগরিক',
  category: 'Executive',
  contact_info: {
    website: 'mopa.gov.bd',
    email: 'secretary@mopa.gov.bd',
    phone: '+৮৮০-২-৯৫৪২২৪৭',
  },
  description_bn: 'জনপ্রশাসন মন্ত্রণালয় বাংলাদেশ সরকারের একটি গুরুত্বপূর্ণ মন্ত্রণালয়। এটি বাংলাদেশ সিভিল সার্ভিস (BCS) সহ সব সরকারি কর্মচারীর নিয়োগ, পদোন্নতি, বদলি, প্রশিক্ষণ, শৃঙ্খলা ও কল্যাণ সংক্রান্ত নীতি নির্ধারণ ও বাস্তবায়ন করে। মাঠ প্রশাসনের সমন্বয় ও তদারকিও এই মন্ত্রণালয়ের দায়িত্ব।',
});

// Positions for the ministry
const minPubPositions = [
  {
    desig: 'জনপ্রশাসন মন্ত্রী',
    grade: 'সাংবিধানিক পদ',
    parent: null,
    equiv: '',
    salute: 'জনাব মন্ত্রী',
    appAuth: 'প্রধানমন্ত্রী',
    usecase: 'জনপ্রশাসন নীতি নির্ধারণ ও মন্ত্রণালয়ের সার্বিক তদারকি',
    career: 'সংসদ সদস্য নির্বাচিত; মন্ত্রিসভায় অন্তর্ভুক্ত',
    resp: 'জনপ্রশাসন সংক্রান্ত নীতি নির্ধারণ, মন্ত্রণালয়ের কার্যক্রমের সার্বিক দিকনির্দেশনা ও তদারকি করা',
    qual: 'স্নাতকোত্তর ডিগ্রি; সংসদ সদস্য হওয়া বাধ্যতামূলক',
    appt: 'প্রধানমন্ত্রী কর্তৃক মন্ত্রিসভায় মনোনীত; রাষ্ট্রপতি কর্তৃক শপথ পাঠ',
  },
  {
    desig: 'জনপ্রশাসন সচিব',
    grade: 'গ্রেড ১',
    parent: null,
    equiv: 'সচিব',
    salute: 'জনাব সচিব',
    appAuth: 'প্রধানমন্ত্রী',
    usecase: 'জনপ্রশাসন মন্ত্রণালয়ের প্রশাসনিক প্রধান হিসেবে দায়িত্ব পালন',
    career: 'অতিরিক্ত সচিব থেকে পদোন্নতি',
    resp: 'মন্ত্রণালয়ের প্রশাসনিক প্রধানের দায়িত্ব; নীতি বাস্তবায়ন, কর্মচারী ব্যবস্থাপনা ও মাঠ প্রশাসনের সমন্বয়',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ২৫ বছর চাকরির অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের অতিরিক্ত সচিব পদ থেকে পদোন্নতি; সরকার কর্তৃক নিয়োগ',
  },
  {
    desig: 'অতিরিক্ত সচিব (প্রশাসন)',
    grade: 'গ্রেড ২',
    parent: null,
    equiv: 'অতিরিক্ত সচিব',
    salute: 'জনাব অতিরিক্ত সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশাসনিক নীতি বাস্তবায়ন ও কর্মচারী ব্যবস্থাপনা',
    career: 'যুগ্ম সচিব থেকে পদোন্নতি',
    resp: 'প্রশাসনিক কার্যক্রম তদারকি, কর্মচারী নিয়োগ ও পদোন্নতি সংক্রান্ত দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ২০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের যুগ্ম সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'অতিরিক্ত সচিব (প্রশিক্ষণ ও উন্নয়ন)',
    grade: 'গ্রেড ২',
    parent: null,
    equiv: 'অতিরিক্ত সচিব',
    salute: 'জনাব অতিরিক্ত সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সরকারি কর্মচারীদের প্রশিক্ষণ ও দক্ষতা উন্নয়ন নীতি প্রণয়ন',
    career: 'যুগ্ম সচিব থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ নীতি প্রণয়ন, প্রশিক্ষণ প্রতিষ্ঠানসমূহের তদারকি ও উন্নয়ন কার্যক্রম',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ২০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের যুগ্ম সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'যুগ্ম সচিব (প্রশাসন-১)',
    grade: 'গ্রেড ৩',
    parent: null,
    equiv: 'যুগ্ম সচিব',
    salute: 'জনাব যুগ্ম সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশাসনিক শাখা পরিচালনা',
    career: 'উপসচিব থেকে পদোন্নতি',
    resp: 'প্রশাসন-১ শাখার কার্যক্রম পরিচালনা; কর্মচারী নিয়োগ, পদোন্নতি ও বদলি সংক্রান্ত কাজ',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১৫ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের উপসচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'যুগ্ম সচিব (প্রশাসন-২)',
    grade: 'গ্রেড ৩',
    parent: null,
    equiv: 'যুগ্ম সচিব',
    salute: 'জনাব যুগ্ম সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশাসনিক শাখা পরিচালনা',
    career: 'উপসচিব থেকে পদোন্নতি',
    resp: 'প্রশাসন-২ শাখার কার্যক্রম পরিচালনা; শৃঙ্খলা ও আপিল সংক্রান্ত দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১৫ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের উপসচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'যুগ্ম সচিব (প্রশিক্ষণ)',
    grade: 'গ্রেড ৩',
    parent: null,
    equiv: 'যুগ্ম সচিব',
    salute: 'জনাব যুগ্ম সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ শাখা পরিচালনা',
    career: 'উপসচিব থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ শাখার কার্যক্রম; প্রশিক্ষণ প্রতিষ্ঠান মনিটরিং ও সমন্বয়',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১৫ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের উপসচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'উপসচিব (শাখা-১)',
    grade: 'গ্রেড ৪',
    parent: null,
    equiv: 'উপসচিব',
    salute: 'জনাব উপসচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখা কার্যক্রম পরিচালনা',
    career: 'সিনিয়র সহকারী সচিব থেকে পদোন্নতি',
    resp: 'নিয়োগ, পদোন্নতি ও বদলি সংক্রান্ত শাখার দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সিনিয়র সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'উপসচিব (শাখা-২)',
    grade: 'গ্রেড ৪',
    parent: null,
    equiv: 'উপসচিব',
    salute: 'জনাব উপসচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখা কার্যক্রম পরিচালনা',
    career: 'সিনিয়র সহকারী সচিব থেকে পদোন্নতি',
    resp: 'শৃঙ্খলা ও আপিল শাখার দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সিনিয়র সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'উপসচিব (প্রশিক্ষণ)',
    grade: 'গ্রেড ৪',
    parent: null,
    equiv: 'উপসচিব',
    salute: 'জনাব উপসচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ শাখা কার্যক্রম',
    career: 'সিনিয়র সহকারী সচিব থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ সংক্রান্ত শাখার দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সিনিয়র সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'উপসচিব (কল্যাণ)',
    grade: 'গ্রেড ৪',
    parent: null,
    equiv: 'উপসচিব',
    salute: 'জনাব উপসচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সরকারি কর্মচারী কল্যাণ শাখা পরিচালনা',
    career: 'সিনিয়র সহকারী সচিব থেকে পদোন্নতি',
    resp: 'সরকারি কর্মচারীদের কল্যাণ, আবাসন ও চিকিৎসা সংক্রান্ত দায়িত্ব',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সিনিয়র সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'সিনিয়র সহকারী সচিব (শাখা-১)',
    grade: 'গ্রেড ৫',
    parent: null,
    equiv: 'সিনিয়র সহকারী সচিব',
    salute: 'জনাব সিনিয়র সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখার দৈনন্দিন কার্যক্রম',
    career: 'সহকারী সচিব থেকে পদোন্নতি',
    resp: 'নিয়োগ ও পদোন্নতি শাখার দৈনন্দিন কার্যক্রম পরিচালনা',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ৭ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'সিনিয়র সহকারী সচিব (শাখা-২)',
    grade: 'গ্রেড ৫',
    parent: null,
    equiv: 'সিনিয়র সহকারী সচিব',
    salute: 'জনাব সিনিয়র সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখার দৈনন্দিন কার্যক্রম',
    career: 'সহকারী সচিব থেকে পদোন্নতি',
    resp: 'শৃঙ্খলা ও আইন শাখার দৈনন্দিন কার্যক্রম পরিচালনা',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডার; ন্যূনতম ৭ বছর অভিজ্ঞতা',
    appt: 'বিসিএস প্রশাসন ক্যাডারের সহকারী সচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'সহকারী সচিব (শাখা-১)',
    grade: 'গ্রেড ৬',
    parent: null,
    equiv: 'সহকারী সচিব',
    salute: 'জনাব সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখার কার্য সম্পাদন',
    career: 'বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    resp: 'নিয়োগ ও পদোন্নতি শাখার কাজ সম্পাদন',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    appt: 'বিসিএস (প্রশাসন) ক্যাডারের মাধ্যমে BPSC পরীক্ষার মাধ্যমে সরাসরি নিয়োগ',
  },
  {
    desig: 'সহকারী সচিব (শাখা-২)',
    grade: 'গ্রেড ৬',
    parent: null,
    equiv: 'সহকারী সচিব',
    salute: 'জনাব সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'শাখার কার্য সম্পাদন',
    career: 'বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    resp: 'শৃঙ্খলা ও আইন শাখার কাজ সম্পাদন',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    appt: 'বিসিএস (প্রশাসন) ক্যাডারের মাধ্যমে BPSC পরীক্ষার মাধ্যমে সরাসরি নিয়োগ',
  },
  {
    desig: 'সহকারী সচিব (প্রশিক্ষণ)',
    grade: 'গ্রেড ৬',
    parent: null,
    equiv: 'সহকারী সচিব',
    salute: 'জনাব সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ শাখার কার্য সম্পাদন',
    career: 'বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    resp: 'প্রশিক্ষণ শাখার কাজ সম্পাদন ও সমন্বয়',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    appt: 'বিসিএস (প্রশাসন) ক্যাডারের মাধ্যমে BPSC পরীক্ষার মাধ্যমে সরাসরি নিয়োগ',
  },
  {
    desig: 'সহকারী সচিব (কল্যাণ)',
    grade: 'গ্রেড ৬',
    parent: null,
    equiv: 'সহকারী সচিব',
    salute: 'জনাব সহকারী সচিব',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'কল্যাণ শাখার কার্য সম্পাদন',
    career: 'বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    resp: 'সরকারি কর্মচারী কল্যাণ সংক্রান্ত কাজ সম্পাদন',
    qual: 'স্নাতকোত্তর ডিগ্রি; বিসিএস প্রশাসন ক্যাডারে সরাসরি নিয়োগ',
    appt: 'বিসিএস (প্রশাসন) ক্যাডারের মাধ্যমে BPSC পরীক্ষার মাধ্যমে সরাসরি নিয়োগ',
  },
  {
    desig: 'প্রশাসনিক কর্মকর্তা-১',
    grade: 'গ্রেড ৭',
    parent: null,
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সহায়ক প্রশাসনিক কাজ',
    career: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে',
    resp: 'প্রশাসনিক সহায়তা প্রদান, ফাইল ব্যবস্থাপনা',
    qual: 'স্নাতকোত্তর ডিগ্রি',
    appt: 'সরকারি নিয়োগ কমিশনের পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'প্রশাসনিক কর্মকর্তা-২',
    grade: 'গ্রেড ৮',
    parent: null,
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সহায়ক প্রশাসনিক কাজ',
    career: 'পদোন্নতি',
    resp: 'প্রশাসনিক সহায়তা, নথি ব্যবস্থাপনা',
    qual: 'স্নাতক ডিগ্রি',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'অফিস সহায়ক-১',
    grade: 'গ্রেড ১৪',
    parent: null,
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সহায়ক অফিস কাজ',
    career: 'পদোন্নতি',
    resp: 'অফিসের সহায়ক কাজ, ডকুমেন্ট সংরক্ষণ',
    qual: 'অষ্টম শ্রেণি/এসএসসি পাস',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'অফিস সহায়ক-২',
    grade: 'গ্রেড ১৪',
    parent: null,
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সহায়ক অফিস কাজ',
    career: 'পদোন্নতি',
    resp: 'অফিসের সহায়ক কাজ',
    qual: 'অষ্টম শ্রেণি/এসএসসি পাস',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
];

// Create position objects and build hierarchy
const minPubPosObjs = minPubPositions.map(p =>
  makePosition(minPubId, p.desig, p.grade, p.parent, p.equiv, p.salute, p.appAuth, p.usecase, p.career, p.resp, p.qual, p.appt)
);

// Build hierarchy within the ministry
const minPubMap = {};
minPubPosObjs.forEach(p => { minPubMap[p.designation_bn] = p; });

// Secretary reports to Minister
if (minPubMap['জনপ্রশাসন সচিব'] && minPubMap['জনপ্রশাসন মন্ত্রী']) {
  minPubMap['জনপ্রশাসন সচিব'].parent_position_id = minPubMap['জনপ্রশাসন মন্ত্রী'].id;
}
// Additional Secretaries report to Secretary
['অতিরিক্ত সচিব (প্রশাসন)', 'অতিরিক্ত সচিব (প্রশিক্ষণ ও উন্নয়ন)'].forEach(desig => {
  if (minPubMap[desig] && minPubMap['জনপ্রশাসন সচিব']) {
    minPubMap[desig].parent_position_id = minPubMap['জনপ্রশাসন সচিব'].id;
  }
});
// Joint Secretaries report to respective Additional Secretaries
if (minPubMap['যুগ্ম সচিব (প্রশাসন-১)'] && minPubMap['অতিরিক্ত সচিব (প্রশাসন)']) {
  minPubMap['যুগ্ম সচিব (প্রশাসন-১)'].parent_position_id = minPubMap['অতিরিক্ত সচিব (প্রশাসন)'].id;
}
if (minPubMap['যুগ্ম সচিব (প্রশাসন-২)'] && minPubMap['অতিরিক্ত সচিব (প্রশাসন)']) {
  minPubMap['যুগ্ম সচিব (প্রশাসন-২)'].parent_position_id = minPubMap['অতিরিক্ত সচিব (প্রশাসন)'].id;
}
if (minPubMap['যুগ্ম সচিব (প্রশিক্ষণ)'] && minPubMap['অতিরিক্ত সচিব (প্রশিক্ষণ ও উন্নয়ন)']) {
  minPubMap['যুগ্ম সচিব (প্রশিক্ষণ)'].parent_position_id = minPubMap['অতিরিক্ত সচিব (প্রশিক্ষণ ও উন্নয়ন)'].id;
}
// Deputy Secretaries report to Joint Secretaries
const dsToJs = {
  'উপসচিব (শাখা-১)': 'যুগ্ম সচিব (প্রশাসন-১)',
  'উপসচিব (শাখা-২)': 'যুগ্ম সচিব (প্রশাসন-২)',
  'উপসচিব (প্রশিক্ষণ)': 'যুগ্ম সচিব (প্রশিক্ষণ)',
  'উপসচিব (কল্যাণ)': 'যুগ্ম সচিব (প্রশাসন-১)',
};
Object.entries(dsToJs).forEach(([ds, js]) => {
  if (minPubMap[ds] && minPubMap[js]) {
    minPubMap[ds].parent_position_id = minPubMap[js].id;
  }
});
// Senior Assistant Secretaries report to Deputy Secretaries
const sasToDs = {
  'সিনিয়র সহকারী সচিব (শাখা-১)': 'উপসচিব (শাখা-১)',
  'সিনিয়র সহকারী সচিব (শাখা-২)': 'উপসচিব (শাখা-২)',
};
Object.entries(sasToDs).forEach(([sas, ds]) => {
  if (minPubMap[sas] && minPubMap[ds]) {
    minPubMap[sas].parent_position_id = minPubMap[ds].id;
  }
});
// Assistant Secretaries report to Senior Assistant Secretaries
const asToSas = {
  'সহকারী সচিব (শাখা-১)': 'সিনিয়র সহকারী সচিব (শাখা-১)',
  'সহকারী সচিব (শাখা-২)': 'সিনিয়র সহকারী সচিব (শাখা-২)',
  'সহকারী সচিব (প্রশিক্ষণ)': 'সিনিয়র সহকারী সচিব (শাখা-১)',
  'সহকারী সচিব (কল্যাণ)': 'সিনিয়র সহকারী সচিব (শাখা-২)',
};
Object.entries(asToSas).forEach(([as, sas]) => {
  if (minPubMap[as] && minPubMap[sas]) {
    minPubMap[as].parent_position_id = minPubMap[sas].id;
  }
});
// Admin officers report to Assistant Secretaries
['প্রশাসনিক কর্মকর্তা-১', 'প্রশাসনিক কর্মকর্তা-২'].forEach(ao => {
  if (minPubMap[ao] && minPubMap['সহকারী সচিব (শাখা-১)']) {
    minPubMap[ao].parent_position_id = minPubMap['সহকারী সচিব (শাখা-১)'].id;
  }
});
// Office assistants report to Admin officers
['অফিস সহায়ক-১', 'অফিস সহায়ক-২'].forEach(oa => {
  if (minPubMap[oa] && minPubMap['প্রশাসনিক কর্মকর্তা-১']) {
    minPubMap[oa].parent_position_id = minPubMap['প্রশাসনিক কর্মকর্তা-১'].id;
  }
});

positions.push(...minPubPosObjs);

// ================================================================
// 2. BPATC (বাংলাদেশ সিভিল সার্ভিস প্রশাসনিক একাডেমি)
// ================================================================

const bpAtcId = 'bpatc';
offices.push({
  id: bpAtcId,
  name_bn: 'বাংলাদেশ সিভিল সার্ভিস প্রশাসনিক একাডেমি (BPATC)',
  parent_office_id: minPubId,
  office_type_bn: 'প্রশিক্ষণ প্রতিষ্ঠান',
  jurisdiction_bn: 'সারা বাংলাদেশ',
  governing_law_bn: 'জনপ্রশাসন মন্ত্রণালয় প্রশিক্ষণ নীতি, ২০২০',
  target_audience_bn: 'বিসিএস ক্যাডার ও অন্যান্য সরকারি কর্মচারী',
  category: 'Executive',
  contact_info: {
    website: 'bpatc.gov.bd',
    email: 'rector@bpatc.gov.bd',
    phone: '+৮৮০-২-৭৭৯৪২২৭',
  },
  description_bn: 'বাংলাদেশ সিভিল সার্ভিস প্রশাসনিক একাডেমি (BPATC) সাভারে অবস্থিত। এটি বিসিএস ক্যাডার কর্মকর্তাদের মৌলিক ও বিষয়ভিত্তিক প্রশিক্ষণ প্রদান করে। এছাড়াও বিভিন্ন সরকারি কর্মকর্তাদের পেশাগত উন্নয়ন ও প্রশিক্ষণ কার্যক্রম পরিচালনা করে।',
});

const bpatcPositions = [
  {
    desig: 'রেক্টর (BPATC)',
    grade: 'গ্রেড ২',
    equiv: 'অতিরিক্ত সচিব',
    salute: 'জনাব রেক্টর',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ প্রতিষ্ঠানের সর্বোচ্চ প্রধান',
    career: 'যুগ্ম সচিব/অতিরিক্ত সচিব থেকে নিয়োগ',
    resp: 'একাডেমির সার্বিক ব্যবস্থাপনা, প্রশিক্ষণ নীতি নির্ধারণ ও বাস্তবায়ন',
    qual: 'স্নাতকোত্তর ডিগ্রি; প্রশিক্ষণ ব্যবস্থাপনায় অভিজ্ঞতা; অতিরিক্ত সচিব/যুগ্ম সচিব পদমর্যাদা',
    appt: 'জনপ্রশাসন মন্ত্রণালয় কর্তৃক জ্যেষ্ঠ কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'অতিরিক্ত রেক্টর',
    grade: 'গ্রেড ৩',
    equiv: 'যুগ্ম সচিব',
    salute: 'জনাব অতিরিক্ত রেক্টর',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'একাডেমির প্রশাসনিক কাজ তদারকি',
    career: 'পরিচালক থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ কার্যক্রমের সমন্বয়, প্রশাসনিক তদারকি',
    qual: 'স্নাতকোত্তর ডিগ্রি; যুগ্ম সচিব পদমর্যাদা',
    appt: 'জনপ্রশাসন মন্ত্রণালয় কর্তৃক নিয়োগ',
  },
  {
    desig: 'পরিচালক (প্রশিক্ষণ)',
    grade: 'গ্রেড ৪',
    equiv: 'উপসচিব',
    salute: 'জনাব পরিচালক',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ কার্যক্রম পরিচালনা',
    career: 'উপ-পরিচালক থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ কোর্স পরিকল্পনা, বাস্তবায়ন ও মূল্যায়ন',
    qual: 'স্নাতকোত্তর ডিগ্রি; প্রশিক্ষণ ব্যবস্থাপনায় দক্ষতা',
    appt: 'উপসচিব পদ থেকে পদোন্নতি',
  },
  {
    desig: 'উপ-পরিচালক (প্রশিক্ষণ)',
    grade: 'গ্রেড ৫',
    equiv: 'সিনিয়র সহকারী সচিব',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ সহায়তা',
    career: 'সহকারী পরিচালক থেকে পদোন্নতি',
    resp: 'প্রশিক্ষণ কোর্সের সমন্বয় ও সহায়তা',
    qual: 'স্নাতকোত্তর ডিগ্রি',
    appt: 'সরকারি নিয়োগ বা পদোন্নতি',
  },
  {
    desig: 'সহকারী পরিচালক (প্রশিক্ষণ)',
    grade: 'গ্রেড ৭',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশিক্ষণ সহায়তা',
    career: 'বিসিএস বা সরাসরি নিয়োগ',
    resp: 'প্রশিক্ষণ সহায়ক কাজ',
    qual: 'স্নাতকোত্তর ডিগ্রি',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'প্রশাসনিক কর্মকর্তা-১',
    grade: 'গ্রেড ৮',
    equiv: '',
    salute: '',
    appAuth: 'BPATC',
    usecase: 'প্রশাসনিক সহায়তা',
    career: 'পদোন্নতি',
    resp: 'প্রশাসনিক সহায়ক কাজ, ফাইল ব্যবস্থাপনা',
    qual: 'স্নাতক ডিগ্রি',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'অফিস সহায়ক',
    grade: 'গ্রেড ১৪',
    equiv: '',
    salute: '',
    appAuth: 'BPATC',
    usecase: 'সহায়ক অফিস কাজ',
    career: 'পদোন্নতি',
    resp: 'অফিসের সহায়ক কাজ',
    qual: 'অষ্টম শ্রেণি/এসএসসি পাস',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
];

const bpatcPosObjs = bpatcPositions.map(p =>
  makePosition(bpAtcId, p.desig, p.grade, null, p.equiv, p.salute, p.appAuth, p.usecase, p.career, p.resp, p.qual, p.appt)
);

// Build BPATC hierarchy
const bpatcMap = {};
bpatcPosObjs.forEach(p => { bpatcMap[p.designation_bn] = p; });

if (bpatcMap['অতিরিক্ত রেক্টর'] && bpatcMap['রেক্টর (BPATC)']) {
  bpatcMap['অতিরিক্ত রেক্টর'].parent_position_id = bpatcMap['রেক্টর (BPATC)'].id;
}
if (bpatcMap['পরিচালক (প্রশিক্ষণ)'] && bpatcMap['অতিরিক্ত রেক্টর']) {
  bpatcMap['পরিচালক (প্রশিক্ষণ)'].parent_position_id = bpatcMap['অতিরিক্ত রেক্টর'].id;
}
if (bpatcMap['উপ-পরিচালক (প্রশিক্ষণ)'] && bpatcMap['পরিচালক (প্রশিক্ষণ)']) {
  bpatcMap['উপ-পরিচালক (প্রশিক্ষণ)'].parent_position_id = bpatcMap['পরিচালক (প্রশিক্ষণ)'].id;
}
if (bpatcMap['সহকারী পরিচালক (প্রশিক্ষণ)'] && bpatcMap['উপ-পরিচালক (প্রশিক্ষণ)']) {
  bpatcMap['সহকারী পরিচালক (প্রশিক্ষণ)'].parent_position_id = bpatcMap['উপ-পরিচালক (প্রশিক্ষণ)'].id;
}
if (bpatcMap['প্রশাসনিক কর্মকর্তা-১'] && bpatcMap['সহকারী পরিচালক (প্রশিক্ষণ)']) {
  bpatcMap['প্রশাসনিক কর্মকর্তা-১'].parent_position_id = bpatcMap['সহকারী পরিচালক (প্রশিক্ষণ)'].id;
}
if (bpatcMap['অফিস সহায়ক'] && bpatcMap['প্রশাসনিক কর্মকর্তা-১']) {
  bpatcMap['অফিস সহায়ক'].parent_position_id = bpatcMap['প্রশাসনিক কর্মকর্তা-১'].id;
}

positions.push(...bpatcPosObjs);

// ================================================================
// 3. সরকারি কর্মচারী হাসপাতাল (Govt. Employees Hospital)
// ================================================================

const gehId = 'govt-employee-hospital';
offices.push({
  id: gehId,
  name_bn: 'সরকারি কর্মচারী হাসপাতাল',
  parent_office_id: minPubId,
  office_type_bn: 'হাসপাতাল',
  jurisdiction_bn: 'ঢাকা',
  governing_law_bn: 'সরকারি কর্মচারী হাসপাতাল প্রতিষ্ঠা আইন, ১৯৮৪',
  target_audience_bn: 'সরকারি কর্মচারী ও তাদের পরিবার',
  category: 'Executive',
  contact_info: {
    website: 'geh.gov.bd',
    email: 'director@geh.gov.bd',
    phone: '+৮৮০-২-৯৫১২৭৯৪',
  },
  description_bn: 'সরকারি কর্মচারী হাসপাতাল ঢাকার কাকরাইলে অবস্থিত। এটি সরকারি কর্মচারী ও তাদের পরিবারের জন্য বিশেষায়িত চিকিৎসা সেবা প্রদান করে।',
});

const gehPositions = [
  {
    desig: 'পরিচালক (সরকারি কর্মচারী হাসপাতাল)',
    grade: 'গ্রেড ৪',
    equiv: 'উপসচিব',
    salute: 'জনাব পরিচালক',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'হাসপাতালের সর্বোচ্চ প্রশাসনিক প্রধান',
    career: 'সিনিয়র চিকিৎসক থেকে পদোন্নতি',
    resp: 'হাসপাতালের সার্বিক ব্যবস্থাপনা, চিকিৎসা সেবার মান নিশ্চিতকরণ',
    qual: 'এমবিবিএস ডিগ্রি; স্বাস্থ্য প্রশাসনে স্নাতকোত্তর ডিগ্রি; ন্যূনতম ১৫ বছর অভিজ্ঞতা',
    appt: 'জ্যেষ্ঠ চিকিৎসকদের মধ্য থেকে জনপ্রশাসন মন্ত্রণালয় কর্তৃক নিয়োগ',
  },
  {
    desig: 'উপ-পরিচালক',
    grade: 'গ্রেড ৬',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'প্রশাসনিক সহায়তা',
    career: 'সিনিয়র চিকিৎসক থেকে পদোন্নতি',
    resp: 'প্রশাসনিক কার্যক্রম তদারকি',
    qual: 'এমবিবিএস ডিগ্রি; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    appt: 'জ্যেষ্ঠ চিকিৎসকদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'প্রধান চিকিৎসা কর্মকর্তা',
    grade: 'গ্রেড ৭',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'চিকিৎসা সেবা পরিচালনা',
    career: 'সিনিয়র চিকিৎসক থেকে পদোন্নতি',
    resp: 'চিকিৎসা সেবার দায়িত্বে নেতৃত্ব প্রদান',
    qual: 'এমবিবিএস ডিগ্রি; এফসিপিএস/এমডি; ন্যূনতম ৮ বছর অভিজ্ঞতা',
    appt: 'জ্যেষ্ঠ চিকিৎসকদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'মেডিকেল অফিসার-১',
    grade: 'গ্রেড ৯',
    equiv: '',
    salute: '',
    appAuth: 'স্বাস্থ্য মন্ত্রণালয়',
    usecase: 'চিকিৎসা সেবা প্রদান',
    career: 'বিসিএস স্বাস্থ্য ক্যাডারে নিয়োগ',
    resp: 'রোগী দেখভাল, চিকিৎসা সেবা প্রদান',
    qual: 'এমবিবিএস ডিগ্রি; BMDC নিবন্ধিত',
    appt: 'বিসিএস (স্বাস্থ্য) ক্যাডারের মাধ্যমে নিয়োগ',
  },
  {
    desig: 'মেডিকেল অফিসার-২',
    grade: 'গ্রেড ৯',
    equiv: '',
    salute: '',
    appAuth: 'স্বাস্থ্য মন্ত্রণালয়',
    usecase: 'চিকিৎসা সেবা প্রদান',
    career: 'পদোন্নতি',
    resp: 'রোগী দেখভাল, চিকিৎসা সেবা প্রদান',
    qual: 'এমবিবিএস ডিগ্রি; BMDC নিবন্ধিত',
    appt: 'বিসিএস (স্বাস্থ্য) ক্যাডারের মাধ্যমে নিয়োগ',
  },
  {
    desig: 'স্টাফ নার্স-১',
    grade: 'গ্রেড ১১',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'নার্সিং সেবা প্রদান',
    career: 'পদোন্নতি',
    resp: 'নার্সিং সেবা প্রদান',
    qual: 'নার্সিংয়ে ডিপ্লোমা/স্নাতক; নিবন্ধিত নার্স',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'স্টাফ নার্স-২',
    grade: 'গ্রেড ১১',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'নার্সিং সেবা প্রদান',
    career: 'পদোন্নতি',
    resp: 'নার্সিং সেবা প্রদান',
    qual: 'নার্সিংয়ে ডিপ্লোমা/স্নাতক; নিবন্ধিত নার্স',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
  {
    desig: 'অফিস সহায়ক',
    grade: 'গ্রেড ১৪',
    equiv: '',
    salute: '',
    appAuth: 'জনপ্রশাসন মন্ত্রণালয়',
    usecase: 'সহায়ক কাজ',
    career: 'পদোন্নতি',
    resp: 'হাসপাতালের সহায়ক কাজ',
    qual: 'অষ্টম শ্রেণি/এসএসসি পাস',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
];

const gehPosObjs = gehPositions.map(p =>
  makePosition(gehId, p.desig, p.grade, null, p.equiv, p.salute, p.appAuth, p.usecase, p.career, p.resp, p.qual, p.appt)
);

// Build GEH hierarchy
const gehMap = {};
gehPosObjs.forEach(p => { gehMap[p.designation_bn] = p; });

if (gehMap['উপ-পরিচালক'] && gehMap['পরিচালক (সরকারি কর্মচারী হাসপাতাল)']) {
  gehMap['উপ-পরিচালক'].parent_position_id = gehMap['পরিচালক (সরকারি কর্মচারী হাসপাতাল)'].id;
}
if (gehMap['প্রধান চিকিৎসা কর্মকর্তা'] && gehMap['উপ-পরিচালক']) {
  gehMap['প্রধান চিকিৎসা কর্মকর্তা'].parent_position_id = gehMap['উপ-পরিচালক'].id;
}
if (gehMap['মেডিকেল অফিসার-১'] && gehMap['প্রধান চিকিৎসা কর্মকর্তা']) {
  gehMap['মেডিকেল অফিসার-১'].parent_position_id = gehMap['প্রধান চিকিৎসা কর্মকর্তা'].id;
}
if (gehMap['মেডিকেল অফিসার-২'] && gehMap['প্রধান চিকিৎসা কর্মকর্তা']) {
  gehMap['মেডিকেল অফিসার-২'].parent_position_id = gehMap['প্রধান চিকিৎসা কর্মকর্তা'].id;
}
if (gehMap['স্টাফ নার্স-১'] && gehMap['মেডিকেল অফিসার-১']) {
  gehMap['স্টাফ নার্স-১'].parent_position_id = gehMap['মেডিকেল অফিসার-১'].id;
}
if (gehMap['স্টাফ নার্স-২'] && gehMap['মেডিকেল অফিসার-১']) {
  gehMap['স্টাফ নার্স-২'].parent_position_id = gehMap['মেডিকেল অফিসার-১'].id;
}
if (gehMap['অফিস সহায়ক'] && gehMap['স্টাফ নার্স-১']) {
  gehMap['অফিস সহায়ক'].parent_position_id = gehMap['স্টাফ নার্স-১'].id;
}

positions.push(...gehPosObjs);

// ================================================================
// Regenerate subordinate_position_ids for all positions
// ================================================================

positions.forEach(p => { p.subordinate_position_ids = []; });
const posLookup = {};
positions.forEach(p => { posLookup[p.id] = p; });
positions.forEach(p => {
  if (p.parent_position_id) {
    const parent = posLookup[p.parent_position_id];
    if (parent && !parent.subordinate_position_ids.includes(p.id)) {
      parent.subordinate_position_ids.push(p.id);
    }
  }
});

// ================================================================
// Save
// ================================================================

fs.writeFileSync(path.join(DATA, 'offices.json'), JSON.stringify(offices, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');

console.log('=== SUMMARY ===');
console.log(`Offices: ${offices.length} (added 3)`);
console.log(`Positions: ${positions.length} (added ${minPubPosObjs.length + bpatcPosObjs.length + gehPosObjs.length})`);
console.log(`Next position ID: ${nextPosId}`);
console.log('Added:');
console.log(`  1. ${minPubId}: জনপ্রশাসন মন্ত্রণালয় (${minPubPosObjs.length} positions)`);
console.log(`  2. ${bpAtcId}: BPATC (${bpatcPosObjs.length} positions)`);
console.log(`  3. ${gehId}: সরকারি কর্মচারী হাসপাতাল (${gehPosObjs.length} positions)`);
