const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

let nextPosId = 8246;
function genPosId() {
  return `p-${nextPosId++}`;
}

function makePos(officeId, desig, grade, parentId, equiv, salute, appAuth, usecase, career, resp, qual, appt) {
  return {
    id: genPosId(),
    office_id: officeId,
    designation_bn: desig,
    pay_grade_bn: grade,
    parent_position_id: parentId || null,
    subordinate_position_ids: [],
    equivalent_rank_bn: equiv || '',
    official_salutation_bn: salute || '',
    appointing_authority_bn: appAuth || '',
    public_service_usecase_bn: usecase || '',
    career_progression_bn: career || '',
    responsibilities_bn: resp || '',
    qualifications_bn: qual || '',
    appointment_process_bn: appt || '',
  };
}

// ================================================================
// PHASE 1A: Armed Forces Division (AFD)
// ================================================================

const afdId = 'armed-forces-division';
offices.push({
  id: afdId,
  name_bn: 'আর্মড ফোর্সেস ডিভিশন (AFD)',
  parent_office_id: 'pm-office',
  office_type_bn: 'সামরিক সমন্বয় বিভাগ',
  jurisdiction_bn: 'সারা বাংলাদেশ',
  governing_law_bn: 'প্রতিরক্ষা আইন ও সশস্ত্র বাহিনী বিধিমালা',
  target_audience_bn: 'সেনাবাহিনী, নৌবাহিনী, বিমান বাহিনী ও প্রতিরক্ষা মন্ত্রণালয়',
  category: 'Executive',
  contact_info: {
    website: 'afd.gov.bd',
    phone: '+৮৮০-২-৯৮৭৬৫৪৩',
  },
  description_bn: 'আর্মড ফোর্সেস ডিভিশন (AFD) প্রধানমন্ত্রীর কার্যালয়ের অধীনে একটি গুরুত্বপূর্ণ বিভাগ। এটি বাংলাদেশ সশস্ত্র বাহিনীর (সেনাবাহিনী, নৌবাহিনী, বিমান বাহিনী) অপারেশনাল সমন্বয় ও প্রশাসনিক তদারকি করে।',
});

// This moves the three services from defence-ministry to AFD
// But we should keep them under both or just move. Let's just add AFD as a coordinating body.
// The Army, Navy, Air Force remain under প্রতিরক্ষা মন্ত্রণালয়.
// AFD is a separate office that coordinates. Let's add just AFD positions.

const afdPositions = [
  {
    desig: 'প্রিন্সিপাল স্টাফ অফিসার (পিএসও), আর্মড ফোর্সেস ডিভিশন',
    grade: 'গ্রেড ১',
    equiv: 'লেফটেন্যান্ট জেনারেল/ভাইস অ্যাডমিরাল/এয়ার মার্শাল',
    salute: 'জনাব পিএসও',
    appAuth: 'প্রধানমন্ত্রী',
    usecase: 'সশস্ত্র বাহিনীর অপারেশনাল সমন্বয়',
    career: 'তিন বাহিনীর কর্নেল/ক্যাপ্টেন/গ্রুপ ক্যাপ্টেন পদের জ্যেষ্ঠ কর্মকর্তা',
    resp: 'সশস্ত্র বাহিনীর অপারেশনাল পরিকল্পনা, সমন্বয় ও বাস্তবায়ন তদারকি',
    qual: 'উচ্চতর সামরিক শিক্ষা; স্টাফ কলেজ ও ন্যাশনাল ডিফেন্স কোর্স সম্পন্ন; ন্যূনতম ২৮ বছর চাকরি',
    appt: 'তিন বাহিনীর জ্যেষ্ঠ কর্মকর্তাদের মধ্য থেকে প্রধানমন্ত্রীর অনুমোদনে নিয়োগ',
  },
  {
    desig: 'ডিরেক্টর জেনারেল (অপারেশন্স)',
    grade: 'গ্রেড ২',
    equiv: 'মেজর জেনারেল/রিয়ার অ্যাডমিরাল/এয়ার ভাইস মার্শাল',
    salute: 'জনাব ডিজি',
    appAuth: 'প্রধানমন্ত্রীর কার্যালয়',
    usecase: 'অপারেশনাল পরিকল্পনা ও বাস্তবায়ন',
    career: 'তিন বাহিনীর জ্যেষ্ঠ কর্মকর্তা',
    resp: 'যৌথ সামরিক অভিযানের পরিকল্পনা, প্রতিরক্ষা কৌশল প্রণয়ন',
    qual: 'ডিফেন্স সার্ভিসেস কমান্ড অ্যান্ড স্টাফ কলেজ; ন্যূনতম ২৫ বছর চাকরি',
    appt: 'তিন বাহিনীর জ্যেষ্ঠ কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'ডিরেক্টর জেনারেল (প্রশাসন ও লজিস্টিকস)',
    grade: 'গ্রেড ২',
    equiv: 'মেজর জেনারেল/রিয়ার অ্যাডমিরাল/এয়ার ভাইস মার্শাল',
    salute: 'জনাব ডিজি',
    appAuth: 'প্রধানমন্ত্রীর কার্যালয়',
    usecase: 'প্রশাসনিক ও লজিস্টিক সমন্বয়',
    career: 'তিন বাহিনীর জ্যেষ্ঠ কর্মকর্তা',
    resp: 'যৌথ প্রশাসনিক পরিষেবা, লজিস্টিক সমন্বয় এবং বাজেট পরিকল্পনা',
    qual: 'ডিফেন্স সার্ভিসেস কমান্ড অ্যান্ড স্টাফ কলেজ; ন্যূনতম ২৫ বছর চাকরি',
    appt: 'তিন বাহিনীর জ্যেষ্ঠ কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'ডিরেক্টর (অপারেশন্স)',
    grade: 'গ্রেড ৪',
    equiv: 'কর্নেল/ক্যাপ্টেন/গ্রুপ ক্যাপ্টেন',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'অপারেশনাল পরিকল্পনা সহায়তা',
    career: 'তিন বাহিনীর লেফটেন্যান্ট কর্নেল/কমান্ডার/উইং কমান্ডার',
    resp: 'অপারেশনাল পরিকল্পনা তৈরি ও সমন্বয়',
    qual: 'স্টাফ কলেজ কোর্স; ন্যূনতম ১৫ বছর চাকরি',
    appt: 'তিন বাহিনীর কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'ডিরেক্টর (ইন্টেলিজেন্স)',
    grade: 'গ্রেড ৪',
    equiv: 'কর্নেল/ক্যাপ্টেন/গ্রুপ ক্যাপ্টেন',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'সামরিক গোয়েন্দা সমন্বয়',
    career: 'তিন বাহিনীর লেফটেন্যান্ট কর্নেল/কমান্ডার/উইং কমান্ডার',
    resp: 'সামরিক গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণ',
    qual: 'ইন্টেলিজেন্স কোর্স; ন্যূনতম ১৫ বছর চাকরি',
    appt: 'তিন বাহিনীর কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'স্টাফ অফিসার-১',
    grade: 'গ্রেড ৫',
    equiv: 'লেফটেন্যান্ট কর্নেল/কমান্ডার/উইং কমান্ডার',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'সামরিক স্টাফ কাজ',
    career: 'তিন বাহিনীর মেজর/লেফটেন্যান্ট কমান্ডার/স্কোয়াড্রন লিডার',
    resp: 'স্টাফ কার্য সম্পাদন, প্রতিবেদন তৈরি',
    qual: 'ন্যূনতম ১০ বছর চাকরি',
    appt: 'তিন বাহিনীর কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'স্টাফ অফিসার-২',
    grade: 'গ্রেড ৬',
    equiv: 'মেজর/লেফটেন্যান্ট কমান্ডার/স্কোয়াড্রন লিডার',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'সামরিক স্টাফ সহায়তা',
    career: 'তিন বাহিনীর ক্যাপ্টেন/লেফটেন্যান্ট/ফ্লাইট লেফটেন্যান্ট',
    resp: 'স্টাফ কার্য সম্পাদন',
    qual: 'ন্যূনতম ৮ বছর চাকরি',
    appt: 'তিন বাহিনীর কর্মকর্তাদের মধ্য থেকে নিয়োগ',
  },
  {
    desig: 'সামরিক সহায়ক কর্মকর্তা',
    grade: 'গ্রেড ১০',
    equiv: '',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'প্রশাসনিক সহায়তা',
    career: 'পদোন্নতি',
    resp: 'প্রশাসনিক সহায়তা প্রদান',
    qual: 'উচ্চ মাধ্যমিক পাস; সামরিক প্রশিক্ষণ',
    appt: 'সামরিক বাহিনী থেকে সংযুক্তি/পদোন্নতি',
  },
  {
    desig: 'অফিস সহায়ক',
    grade: 'গ্রেড ১৪',
    equiv: '',
    salute: '',
    appAuth: 'প্রিন্সিপাল স্টাফ অফিসার',
    usecase: 'সাধারণ অফিস সহায়তা',
    career: 'পদোন্নতি',
    resp: 'অফিসের সহায়ক কাজ',
    qual: 'অষ্টম শ্রেণি/এসএসসি পাস',
    appt: 'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ',
  },
];

const afdPosObjs = afdPositions.map(p =>
  makePos(afdId, p.desig, p.grade, null, p.equiv, p.salute, p.appAuth, p.usecase, p.career, p.resp, p.qual, p.appt)
);

// Build AFD hierarchy
const afdMap = {};
afdPosObjs.forEach(p => { afdMap[p.designation_bn] = p; });

if (afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)'] && afdMap['প্রিন্সিপাল স্টাফ অফিসার (পিএসও), আর্মড ফোর্সেস ডিভিশন']) {
  afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)'].parent_position_id = afdMap['প্রিন্সিপাল স্টাফ অফিসার (পিএসও), আর্মড ফোর্সেস ডিভিশন'].id;
}
if (afdMap['ডিরেক্টর জেনারেল (প্রশাসন ও লজিস্টিকস)'] && afdMap['প্রিন্সিপাল স্টাফ অফিসার (পিএসও), আর্মড ফোর্সেস ডিভিশন']) {
  afdMap['ডিরেক্টর জেনারেল (প্রশাসন ও লজিস্টিকস)'].parent_position_id = afdMap['প্রিন্সিপাল স্টাফ অফিসার (পিএসও), আর্মড ফোর্সেস ডিভিশন'].id;
}
if (afdMap['ডিরেক্টর (অপারেশন্স)'] && afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)']) {
  afdMap['ডিরেক্টর (অপারেশন্স)'].parent_position_id = afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)'].id;
}
if (afdMap['ডিরেক্টর (ইন্টেলিজেন্স)'] && afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)']) {
  afdMap['ডিরেক্টর (ইন্টেলিজেন্স)'].parent_position_id = afdMap['ডিরেক্টর জেনারেল (অপারেশন্স)'].id;
}
if (afdMap['স্টাফ অফিসার-১'] && afdMap['ডিরেক্টর (অপারেশন্স)']) {
  afdMap['স্টাফ অফিসার-১'].parent_position_id = afdMap['ডিরেক্টর (অপারেশন্স)'].id;
}
if (afdMap['স্টাফ অফিসার-২'] && afdMap['স্টাফ অফিসার-১']) {
  afdMap['স্টাফ অফিসার-২'].parent_position_id = afdMap['স্টাফ অফিসার-১'].id;
}
if (afdMap['সামরিক সহায়ক কর্মকর্তা'] && afdMap['স্টাফ অফিসার-১']) {
  afdMap['সামরিক সহায়ক কর্মকর্তা'].parent_position_id = afdMap['স্টাফ অফিসার-১'].id;
}
if (afdMap['অফিস সহায়ক'] && afdMap['সামরিক সহায়ক কর্মকর্তা']) {
  afdMap['অফিস সহায়ক'].parent_position_id = afdMap['সামরিক সহায়ক কর্মকর্তা'].id;
}

positions.push(...afdPosObjs);

console.log(`AFD added: ${afdPosObjs.length} positions`);

// ================================================================
// PHASE 1B: Bangladesh Army - Enhanced Rank Structure
// Add proper intermediate officer ranks
// ================================================================

const armyId = 'defence-army';
const armyPositions = positions.filter(p => p.office_id === armyId);
const armyMap = {};
armyPositions.forEach(p => { armyMap[p.designation_bn] = p; });

// Find the army chief
const armyChief = armyPositions.find(p => p.designation_bn === 'সেনাবাহিনী প্রধান');
// Find GOC-1 (senior most GOC)
const goc1 = armyPositions.find(p => p.designation_bn === 'জেনারেল অফিসার কমান্ডিং (জিওসি)-1');
const armySoldiers = armyPositions.filter(p => p.designation_bn.startsWith('সেনা সদস্য-'));

// Add intermediate officer ranks between GOC and Brigade Cmd
// Lietuutenant General (Grade 2) - we use GOC positions for this
// Major General (Grade 2) - we use some GOC
// Brigadier General (Grade 3) - bridge between GOC and Brigade Cmd

const newArmyPositions = [];

// Additional senior staff
const addArmyPos = (desig, grade, parentDesig, equiv, resp) => {
  const parent = armyMap[parentDesig] || armyMap['সেনাবাহিনী প্রধান'] || goc1;
  if (!parent) return null;
  const p = makePos(armyId, desig, grade, parent.id, equiv, '', 'সেনাবাহিনী সদরদপ্তর', resp, 'পদোন্নতি', resp, 'উচ্চতর সামরিক শিক্ষা; স্টাফ কলেজ কোর্স', 'পদোন্নতির মাধ্যমে');
  newArmyPositions.push(p);
  return p;
};

const midLevelArmy = [
  { desig: 'চিফ অব জেনারেল স্টাফ (সিজিএস)', grade: 'গ্রেড ২', parent: 'সেনাবাহিনী প্রধান', equiv: 'লেফটেন্যান্ট জেনারেল', resp: 'সেনাবাহিনীর জেনারেল স্টাফ শাখার প্রধান; অপারেশনাল ও প্রশাসনিক পরিকল্পনা' },
  { desig: 'মিলিটারি সেক্রেটারি (এমএস)', grade: 'গ্রেড ৩', parent: 'চিফ অব জেনারেল স্টাফ (সিজিএস)', equiv: 'ব্রিগেডিয়ার জেনারেল', resp: 'সেনাবাহিনীর কর্মকর্তাদের পদোন্নতি, পোস্টিং ও প্রশাসনিক দায়িত্ব' },
  { desig: 'ডিরেক্টর জেনারেল (সামরিক অপারেশন্স)', grade: 'গ্রেড ২', parent: 'চিফ অব জেনারেল স্টাফ (সিজিএস)', equiv: 'মেজর জেনারেল', resp: 'সামরিক অভিযান পরিকল্পনা ও বাস্তবায়ন' },
  { desig: 'কর্নেল (জেনারেল স্টাফ)', grade: 'গ্রেড ৪', parent: 'মিলিটারি সেক্রেটারি (এমএস)', equiv: 'কর্নেল', resp: 'জেনারেল স্টাফ শাখার কার্য সম্পাদন' },
  { desig: 'লেফটেন্যান্ট কর্নেল (জেনারেল স্টাফ)', grade: 'গ্রেড ৪', parent: 'কর্নেল (জেনারেল স্টাফ)', equiv: 'লেফটেন্যান্ট কর্নেল', resp: 'স্টাফ কার্য সম্পাদন' },
  { desig: 'মেজর', grade: 'গ্রেড ৫', parent: 'লেফটেন্যান্ট কর্নেল (জেনারেল স্টাফ)', equiv: 'মেজর', resp: 'সাব-ইউনিট কমান্ড ও স্টাফ দায়িত্ব' },
  { desig: 'ক্যাপ্টেন', grade: 'গ্রেড ৬', parent: 'মেজর', equiv: 'ক্যাপ্টেন', resp: 'কোম্পানি কমান্ড ও প্রশাসনিক দায়িত্ব' },
  { desig: 'লেফটেন্যান্ট', grade: 'গ্রেড ৭', parent: 'ক্যাপ্টেন', equiv: 'লেফটেন্যান্ট', resp: 'প্লাটুন কমান্ড ও প্রশিক্ষণ' },
];

midLevelArmy.forEach(({desig, grade, parent, equiv, resp}) => {
  const parentPos = newArmyPositions.find(p => p.designation_bn === parent) || armyMap[parent];
  if (parentPos) {
    const p = makePos(armyId, desig, grade, parentPos.id, equiv, '', 'সেনাবাহিনী সদরদপ্তর', resp, 'পদোন্নতি', resp, 'উচ্চতর সামরিক শিক্ষা; প্রাসঙ্গিক কোর্স সম্পন্ন', 'পদোন্নতির মাধ্যমে');
    newArmyPositions.push(p);
  }
});

// Give soldiers proper parent - link to লেফটেন্যান্ট
const lt = newArmyPositions.find(p => p.designation_bn === 'লেফটেন্যান্ট');
if (lt) {
  armySoldiers.forEach(s => { s.parent_position_id = lt.id; });
}

// Link our new mid-level chain properly
// সিজিএস -> সেনাবাহিনী প্রধান
// মিলিটারি সেক্রেটারি -> সিজিএস
// ডিজি অপারেশন্স -> সিজিএস
// কর্নেল জিএস -> মিলিটারি সেক্রেটারি
// লেফটেন্যান্ট কর্নেল জিএস -> কর্নেল জিএস
// মেজর -> লেফটেন্যান্ট কর্নেল জিএস
// ক্যাপ্টেন -> মেজর
// লেফটেন্যান্ট -> ক্যাপ্টেন

// Link GOCs to CGS
if (armyMap['চিফ অব জেনারেল স্টাফ (সিজিএস)']) {
  for (let i = 1; i <= 8; i++) {
    const goc = armyPositions.find(p => p.designation_bn === `জেনারেল অফিসার কমান্ডিং (জিওসি)-${i}`);
    if (goc && newArmyPositions.find(p => p.designation_bn === 'চিফ অব জেনারেল স্টাফ (সিজিএS)') || true) {
      const cgs = newArmyPositions.find(p => p.designation_bn === 'চিফ অব জেনারেল স্টাফ (সিজিএস)');
      if (cgs) goc.parent_position_id = cgs.id;
    }
  }
}

// Link Brigade Commanders to appropriate GOCs
for (let i = 1; i <= 15; i++) {
  const bc = armyPositions.find(p => p.designation_bn === `ব্রিগেড কমান্ডার-${i}`);
  if (bc) {
    // Assign to GOC based on simple distribution
    const gocIdx = Math.floor((i - 1) / 2) + 1;
    const goc = armyPositions.find(p => p.designation_bn === `জেনারেল অফিসার কমান্ডিং (জিওসি)-${gocIdx}`);
    if (goc) bc.parent_position_id = goc.id;
  }
}

// Link Battalion Commanders to Brigade Commanders
for (let i = 1; i <= 30; i++) {
  const btn = armyPositions.find(p => p.designation_bn === `ব্যাটালিয়ন কমান্ডার-${i}`);
  if (btn) {
    // Round-robin to the 15 brigade commanders
    const bcIdx = ((i - 1) % 15) + 1;
    const bc = armyPositions.find(p => p.designation_bn === `ব্রিগেড কমান্ডার-${bcIdx}`);
    if (bc) btn.parent_position_id = bc.id;
  }
}

positions.push(...newArmyPositions);
console.log(`Army enhanced: +${newArmyPositions.length} new positions`);

// ================================================================
// PHASE 1C: Bangladesh Navy - Enhanced Rank Structure
// ================================================================

const navyId = 'defence-navy';
const navyPositions = positions.filter(p => p.office_id === navyId);
const navyMap = {};
navyPositions.forEach(p => { navyMap[p.designation_bn] = p; });

const navyChief = navyPositions.find(p => p.designation_bn === 'নৌবাহিনী প্রধান');
const navySoldiers = navyPositions.filter(p => p.designation_bn.startsWith('নৌ সদস্য-'));

const newNavyPositions = [];

// Commands -> proper flag officer ranks
const midLevelNavy = [
  { desig: 'চিফ অব নেভাল স্টাফ (সিএনএস)', grade: 'গ্রেড ১', parent: 'নৌবাহিনী প্রধান', equiv: 'অ্যাডমিরাল', resp: 'নৌবাহিনীর সর্বোচ্চ অপারেশনাল প্রধান; নৌ অভিযান ও প্রশাসন তদারকি' },
  { desig: 'ভাইস অ্যাডমিরাল (নেভাল অপারেশন্স)', grade: 'গ্রেড ২', parent: 'চিফ অব নেভাল স্টাফ (সিএনএস)', equiv: 'ভাইস অ্যাডমিরাল', resp: 'নৌ অভিযানের পরিকল্পনা ও বাস্তবায়ন' },
  { desig: 'রিয়ার অ্যাডমিরাল (প্রশাসন)', grade: 'গ্রেড ২', parent: 'চিফ অব নেভাল স্টাফ (সিএনএস)', equiv: 'রিয়ার অ্যাডমিরাল', resp: 'নৌবাহিনীর প্রশাসনিক ও লজিস্টিক ব্যবস্থাপনা' },
  { desig: 'কমডোর (ডকইয়ার্ড)', grade: 'গ্রেড ৩', parent: 'ভাইস অ্যাডমিরাল (নেভাল অপারেশন্স)', equiv: 'কমডোর', resp: 'নৌ ডকইয়ার্ড ও মেরামত কার্যক্রম তদারকি' },
  { desig: 'ক্যাপ্টেন (নেভাল স্টাফ)', grade: 'গ্রেড ৪', parent: 'কমডোর (ডকইয়ার্ড)', equiv: 'ক্যাপ্টেন', resp: 'নৌ স্টাফ শাখার কার্য সম্পাদন' },
  { desig: 'কমান্ডার', grade: 'গ্রেড ৪', parent: 'ক্যাপ্টেন (নেভাল স্টাফ)', equiv: 'কমান্ডার', resp: 'যুদ্ধজাহাজ কমান্ড ও স্টাফ দায়িত্ব' },
  { desig: 'লেফটেন্যান্ট কমান্ডার', grade: 'গ্রেড ৫', parent: 'কমান্ডার', equiv: 'লেফটেন্যান্ট কমান্ডার', resp: 'ছোট জাহাজ কমান্ড ও প্রশাসনিক দায়িত্ব' },
  { desig: 'লেফটেন্যান্ট (নৌ)', grade: 'গ্রেড ৬', parent: 'লেফটেন্যান্ট কমান্ডার', equiv: 'লেফটেন্যান্ট', resp: 'ওয়াচ কিপিং ও বিভাগীয় দায়িত্ব' },
  { desig: 'সাব-লেফটেন্যান্ট', grade: 'গ্রেড ৭', parent: 'লেফটেন্যান্ট (নৌ)', equiv: 'সাব-লেফটেন্যান্ট', resp: 'প্রাথমিক নৌ দায়িত্ব ও প্রশিক্ষণ' },
];

midLevelNavy.forEach(({desig, grade, parent, equiv, resp}) => {
  const parentPos = newNavyPositions.find(p => p.designation_bn === parent) || navyMap[parent];
  if (parentPos) {
    const p = makePos(navyId, desig, grade, parentPos.id, equiv, '', 'নৌবাহিনী সদরদপ্তর', resp, 'পদোন্নতি', resp, 'উচ্চতর নৌ শিক্ষা; স্টাফ কলেজ কোর্স', 'পদোন্নতির মাধ্যমে');
    newNavyPositions.push(p);
  }
});

// Link navy soldiers to সাব-লেফটেন্যান্ট
const subLt = newNavyPositions.find(p => p.designation_bn === 'সাব-লেফটেন্যান্ট');
if (subLt) {
  navySoldiers.forEach(s => { s.parent_position_id = subLt.id; });
}

// Link existing commanders to proper parents
for (let i = 1; i <= 5; i++) {
  const cmd = navyPositions.find(p => p.designation_bn === `কমান্ডার (বিএন ফ্লিট)-${i}`);
  const vadm = newNavyPositions.find(p => p.designation_bn === 'ভাইস অ্যাডমিরাল (নেভাল অপারেশন্স)');
  if (cmd && vadm) cmd.parent_position_id = vadm.id;
}

positions.push(...newNavyPositions);
console.log(`Navy enhanced: +${newNavyPositions.length} new positions`);

// ================================================================
// PHASE 1D: Bangladesh Air Force - Enhanced Rank Structure
// ================================================================

const airId = 'defence-air';
const airPositions = positions.filter(p => p.office_id === airId);
const airMap = {};
airPositions.forEach(p => { airMap[p.designation_bn] = p; });

const airChief = airPositions.find(p => p.designation_bn === 'বিমান বাহিনী প্রধান');
const airSoldiers = airPositions.filter(p => p.designation_bn.startsWith('বিমান বাহিনী সদস্য-'));

const newAirPositions = [];

const midLevelAir = [
  { desig: 'চিফ অব এয়ার স্টাফ (সিএএস)', grade: 'গ্রেড ১', parent: 'বিমান বাহিনী প্রধান', equiv: 'এয়ার চিফ মার্শাল', resp: 'বিমান বাহিনীর সর্বোচ্চ অপারেশনাল প্রধান' },
  { desig: 'এয়ার মার্শাল (অপারেশন্স)', grade: 'গ্রেড ২', parent: 'চিফ অব এয়ার স্টাফ (সিএএস)', equiv: 'এয়ার মার্শাল', resp: 'বিমান অভিযানের পরিকল্পনা ও বাস্তবায়ন' },
  { desig: 'এয়ার ভাইস মার্শাল (প্রশাসন)', grade: 'গ্রেড ২', parent: 'চিফ অব এয়ার স্টাফ (সিএএস)', equiv: 'এয়ার ভাইস মার্শাল', resp: 'বিমান বাহিনীর প্রশাসনিক ব্যবস্থাপনা' },
  { desig: 'এয়ার কমডোর (বেস)', grade: 'গ্রেড ৩', parent: 'এয়ার মার্শাল (অপারেশন্স)', equiv: 'এয়ার কমডোর', resp: 'বিমান ঘাঁটি ব্যবস্থাপনা ও তদারকি' },
  { desig: 'গ্রুপ ক্যাপ্টেন', grade: 'গ্রেড ৪', parent: 'এয়ার কমডোর (বেস)', equiv: 'গ্রুপ ক্যাপ্টেন', resp: 'উইং কমান্ড ও স্টাফ দায়িত্ব' },
  { desig: 'উইং কমান্ডার', grade: 'গ্রেড ৪', parent: 'গ্রুপ ক্যাপ্টেন', equiv: 'উইং কমান্ডার', resp: 'স্কোয়াড্রন কমান্ড ও স্টাফ দায়িত্ব' },
  { desig: 'স্কোয়াড্রন লিডার', grade: 'গ্রেড ৫', parent: 'উইং কমান্ডার', equiv: 'স্কোয়াড্রন লিডার', resp: 'ফ্লাইট কমান্ড ও প্রশাসনিক দায়িত্ব' },
  { desig: 'ফ্লাইট লেফটেন্যান্ট', grade: 'গ্রেড ৬', parent: 'স্কোয়াড্রন লিডার', equiv: 'ফ্লাইট লেফটেন্যান্ট', resp: 'ফ্লাইং ও স্টাফ দায়িত্ব' },
  { desig: 'ফ্লাইং অফিসার', grade: 'গ্রেড ৭', parent: 'ফ্লাইট লেফটেন্যান্ট', equiv: 'ফ্লাইং অফিসার', resp: 'প্রাথমিক ফ্লাইং ও প্রশিক্ষণ' },
];

midLevelAir.forEach(({desig, grade, parent, equiv, resp}) => {
  const parentPos = newAirPositions.find(p => p.designation_bn === parent) || airMap[parent];
  if (parentPos) {
    const p = makePos(airId, desig, grade, parentPos.id, equiv, '', 'বিমান বাহিনী সদরদপ্তর', resp, 'পদোন্নতি', resp, 'উচ্চতর বিমান শিক্ষা; স্টাফ কলেজ কোর্স', 'পদোন্নতির মাধ্যমে');
    newAirPositions.push(p);
  }
});

// Link air soldiers to ফ্লাইং অফিসার
const fo = newAirPositions.find(p => p.designation_bn === 'ফ্লাইং অফিসার');
if (fo) {
  airSoldiers.forEach(s => { s.parent_position_id = fo.id; });
}

// Link existing AOCs to proper superiors
for (let i = 1; i <= 3; i++) {
  const aoc = airPositions.find(p => p.designation_bn === `এয়ার অফিসার কমান্ডিং (এইওসি)-${i}`);
  const am = newAirPositions.find(p => p.designation_bn === 'এয়ার মার্শাল (অপারেশন্স)');
  if (aoc && am) aoc.parent_position_id = am.id;
}

positions.push(...newAirPositions);
console.log(`Air Force enhanced: +${newAirPositions.length} new positions`);

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

let totalNew = afdPosObjs.length + newArmyPositions.length + newNavyPositions.length + newAirPositions.length;
console.log('\n=== PHASE 1 COMPLETE ===');
console.log(`Offices: ${offices.length}`);
console.log(`Positions: ${positions.length} (+${totalNew})`);
console.log(`AFD: ${afdPosObjs.length}`);
console.log(`Army: +${newArmyPositions.length}`);
console.log(`Navy: +${newNavyPositions.length}`);
console.log(`Air Force: +${newAirPositions.length}`);
