const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

const posLookup = {};
positions.forEach(p => { posLookup[p.id] = p; });

let nextPosId = 8281;
function genPosId() { return `p-${nextPosId++}`; }

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

function getOffice(officeId) {
  const off = offices.find(x => x.id === officeId);
  const cnt = positions.filter(p => p.office_id === officeId).length;
  return { off, cnt };
}

function getPositions(officeId) {
  return positions.filter(p => p.office_id === officeId);
}

function addPositions(officeId, items, parentLookupFn) {
  const result = [];
  items.forEach(item => {
    let parentId = null;
    if (item.parent) {
      if (typeof parentLookupFn === 'function') {
        parentId = parentLookupFn(item.parent);
      }
    }
    const p = makePos(
      officeId, item.desig, item.grade, parentId,
      item.equiv || '', item.salute || '', item.appAuth || '',
      item.usecase || '', item.career || '', item.resp || '',
      item.qual || '', item.appt || ''
    );
    result.push(p);
  });
  return result;
}

function saveState(snapshot = {}) {
  Object.assign(snapshot, { offices: offices.length, positions: positions.length });
  return snapshot;
}

function register(newPositions) {
  positions.push(...newPositions);
  return newPositions;
}

// ====================================================================
// PHASE 2A: BGB (বর্ডার গার্ড বাংলাদেশ) - Complete Rank Structure
// ====================================================================
const bgbId = 'home-bgb';
const bgbExisting = getPositions(bgbId);
const bgbMap = {};
bgbExisting.forEach(p => { bgbMap[p.designation_bn] = p; });

const bgbNew = [];

// Existing: DG (Grade 1), Addl DG (Grade 2), 10 Sector Cdrs (Grade 3), 15 Bn Cdrs (Grade 4), 20 Soldiers (Grade 8), 5 Admin officers
// Missing: Deputy DG, Colonel, Lt Colonel, Major, Captain, Lieutenant, Subedar, Naik ranks

const bgbRanks = [
  { desig: 'অতিরিক্ত মহাপরিচালক (প্রশাসন)', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (বিজিবি)', equiv: 'মেজর জেনারেল', resp: 'বিজিবির প্রশাসনিক কার্যক্রম তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স)', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (বিজিবি)', equiv: 'মেজর জেনারেল', resp: 'বিজিবির অপারেশনাল কার্যক্রম তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (বর্ডার ম্যানেজমেন্ট)', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (বিজিবি)', equiv: 'মেজর জেনারেল', resp: 'সীমান্ত ব্যবস্থাপনা ও নীতি নির্ধারণ' },
  { desig: 'চিফ ইঞ্জিনিয়ার', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন)', equiv: 'ব্রিগেডিয়ার জেনারেল', resp: 'বিজিবির প্রকৌশল শাখার প্রধান' },
  { desig: 'ডিরেক্টর (ইন্টেলিজেন্স), বিজিবি', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন)', equiv: 'ব্রিগেডিয়ার জেনারেল', resp: 'সীমান্ত গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণ' },
  { desig: 'ডিরেক্টর (মেডিকেল সেবা), বিজিবি', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন)', equiv: 'ব্রিগেডিয়ার জেনারেল', resp: 'বিজিবির চিকিৎসা সেবার তদারকি' },
  { desig: 'কর্নেল (স্টাফ), বিজিবি', grade: 'গ্রেড-৪', parent: 'সেক্টর কমান্ডার-1', equiv: 'কর্নেল', resp: 'বিজিবি সদর দপ্তরে স্টাফ দায়িত্ব' },
  { desig: 'লেফটেন্যান্ট কর্নেল (উপ-সেক্টর কমান্ডার)', grade: 'গ্রেড-৪', parent: 'সেক্টর কমান্ডার-1', equiv: 'লেফটেন্যান্ট কর্নেল', resp: 'সেক্টরের উপ-কমান্ডার হিসেবে দায়িত্ব' },
  { desig: 'মেজর (অ্যাডজুট্যান্ট), বিজিবি', grade: 'গ্রেড-৫', parent: 'ব্যাটালিয়ন কমান্ডার-1', equiv: 'মেজর', resp: 'ব্যাটালিয়নের প্রশাসনিক ও শৃঙ্খলা বিষয়ক দায়িত্ব' },
  { desig: 'ক্যাপ্টেন (কোম্পানি কমান্ডার), বিজিবি', grade: 'গ্রেড-৬', parent: 'মেজর (অ্যাডজুট্যান্ট), বিজিবি', equiv: 'ক্যাপ্টেন', resp: 'কোম্পানি কমান্ড ও নেতৃত্ব' },
  { desig: 'লেফটেন্যান্ট (প্লাটুন কমান্ডার), বিজিবি', grade: 'গ্রেড-৭', parent: 'ক্যাপ্টেন (কোম্পানি কমান্ডার), বিজিবি', equiv: 'লেফটেন্যান্ট', resp: 'প্লাটুন কমান্ড ও প্রশিক্ষণ' },
  { desig: 'সুবেদার মেজর, বিজিবি', grade: 'গ্রেড-৮', parent: 'লেফটেন্যান্ট (প্লাটুন কমান্ডার), বিজিবি', equiv: 'সুবেদার মেজর', resp: 'সেনা সদস্যদের নেতৃত্ব ও প্রশাসনিক দায়িত্ব' },
  { desig: 'সুবেদার, বিজিবি', grade: 'গ্রেড-৯', parent: 'সুবেদার মেজর, বিজিবি', equiv: 'সুবেদার', resp: 'প্লাটুনের জ্যেষ্ঠ সদস্য হিসেবে সাব-ইউনিট দায়িত্ব' },
  { desig: 'নায়েক সুবেদার, বিজিবি', grade: 'গ্রেড-১০', parent: 'সুবেদার, বিজিবি', equiv: 'নায়েক সুবেদার', resp: 'দল নেতৃত্ব ও প্রশিক্ষণ' },
];

bgbRanks.forEach(r => {
  let parentPos = bgbMap[r.parent];
  if (!parentPos) parentPos = bgbNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    bgbNew.push(makePos(bgbId, r.desig, r.grade, parentPos.id, r.equiv, '', 'বিজিবি সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'সংশ্লিষ্ট সামরিক/সীমান্ত প্রশিক্ষণ; প্রাসঙ্গিক অভিজ্ঞতা',
      'পদোন্নতি/সিনিয়রিটির মাধ্যমে'));
  }
});

// Link sector commanders to Addl DG
const addlDgOps = bgbNew.find(p => p.designation_bn === 'অতিরিক্ত মহাপরিচালক (অপারেশন্স)');
if (addlDgOps) {
  for (let i = 1; i <= 10; i++) {
    const sc = bgbExisting.find(p => p.designation_bn === `সেক্টর কমান্ডার-${i}`);
    if (sc) sc.parent_position_id = addlDgOps.id;
  }
}

// Link battalion commanders to their sector commanders
for (let i = 1; i <= 15; i++) {
  const bc = bgbExisting.find(p => p.designation_bn === `ব্যাটালিয়ন কমান্ডার-${i}`);
  if (bc) {
    const sectorIdx = Math.floor((i - 1) / 1.5) + 1;
    const sc = bgbExisting.find(p => p.designation_bn === `সেক্টর কমান্ডার-${Math.min(sectorIdx, 10)}`);
    if (sc) bc.parent_position_id = sc.id;
  }
}

// Link soldiers to সুবেদার
const subedar = bgbNew.find(p => p.designation_bn === 'সুবেদার, বিজিবি');
if (subedar) {
  for (let i = 1; i <= 20; i++) {
    const s = bgbExisting.find(p => p.designation_bn === `বিজিবি সদস্য (সিপাই/নায়েক)-${i}`);
    if (s) s.parent_position_id = subedar.id;
  }
}

// Link admin officers
const colonel = bgbNew.find(p => p.designation_bn === 'কর্নেল (স্টাফ), বিজিবি');
if (colonel) {
  for (let i = 1; i <= 5; i++) {
    const ao = bgbExisting.find(p => p.designation_bn === `প্রশাসনিক কর্মকর্তা-${i}`);
    if (ao) ao.parent_position_id = colonel.id;
  }
}

register(bgbNew);
console.log(`BGB enhanced: +${bgbNew.length} positions`);

// ====================================================================
// PHASE 2B: Coast Guard - Complete Structure
// ====================================================================
const cgId = 'home-coast';
const cgExisting = getPositions(cgId);
const cgDG = cgExisting.find(p => p.designation_bn === 'মহাপরিচালক (কোস্ট গার্ড)');
const cgAddl = cgExisting.find(p => p.designation_bn === 'অতিরিক্ত মহাপরিচালক');

const cgNew = [];

const cgRanks = [
  { desig: 'ডেপুটি মহাপরিচালক (অপারেশন্স)', grade: 'গ্রেড-৩', parent: 'মহাপরিচালক (কোস্ট গার্ড)', equiv: 'কমডোর', resp: 'কোস্ট গার্ড অপারেশন তদারকি' },
  { desig: 'ডেপুটি মহাপরিচালক (প্রশাসন)', grade: 'গ্রেড-৩', parent: 'মহাপরিচালক (কোস্ট গার্ড)', equiv: 'কমডোর', resp: 'প্রশাসনিক ও লজিস্টিক ব্যবস্থাপনা' },
  { desig: 'জোনাল কমান্ডার (পশ্চিম)', grade: 'গ্রেড-৪', parent: 'ডেপুটি মহাপরিচালক (অপারেশন্স)', equiv: 'ক্যাপ্টেন', resp: 'পশ্চিমাঞ্চলীয় কোস্ট গার্ড জোনের কমান্ড' },
  { desig: 'জোনাল কমান্ডার (পূর্ব)', grade: 'গ্রেড-৪', parent: 'ডেপুটি মহাপরিচালক (অপারেশন্স)', equiv: 'ক্যাপ্টেন', resp: 'পূর্বাঞ্চলীয় কোস্ট গার্ড জোনের কমান্ড' },
  { desig: 'জোনাল কমান্ডার (দক্ষিণ)', grade: 'গ্রেড-৪', parent: 'ডেপুটি মহাপরিচালক (অপারেশন্স)', equiv: 'ক্যাপ্টেন', resp: 'দক্ষিণাঞ্চলীয় কোস্ট গার্ড জোনের কমান্ড' },
  { desig: 'কমান্ডার (ফ্লোটিলা)', grade: 'গ্রেড-৪', parent: 'জোনাল কমান্ডার (পশ্চিম)', equiv: 'কমান্ডার', resp: 'নৌযান বহরের কমান্ড ও রক্ষণাবেক্ষণ' },
  { desig: 'কমান্ডার (ইঞ্জিনিয়ারিং)', grade: 'গ্রেড-৪', parent: 'ডেপুটি মহাপরিচালক (প্রশাসন)', equiv: 'কমান্ডার', resp: 'প্রকৌশল ও রক্ষণাবেক্ষণ বিভাগের প্রধান' },
  { desig: 'লেফটেন্যান্ট কমান্ডার (পেট্রোল বোট)', grade: 'গ্রেড-৫', parent: 'কমান্ডার (ফ্লোটিলা)', equiv: 'লেফটেন্যান্ট কমান্ডার', resp: 'পেট্রোল বোটের কমান্ড ও টহল কার্যক্রম' },
  { desig: 'লেফটেন্যান্ট (কোস্ট গার্ড)', grade: 'গ্রেড-৬', parent: 'লেফটেন্যান্ট কমান্ডার (পেট্রোল বোট)', equiv: 'লেফটেন্যান্ট', resp: 'ওয়াচ কিপিং ও টহল দায়িত্ব' },
  { desig: 'সাব-লেফটেন্যান্ট (কোস্ট গার্ড)', grade: 'গ্রেড-৭', parent: 'লেফটেন্যান্ট (কোস্ট গার্ড)', equiv: 'সাব-লেফটেন্যান্ট', resp: 'প্রাথমিক নৌ দায়িত্ব' },
  { desig: 'পেটি অফিসার, কোস্ট গার্ড', grade: 'গ্রেড-৮', parent: 'সাব-লেফটেন্যান্ট (কোস্ট গার্ড)', equiv: 'পেটি অফিসার', resp: 'নৌ সদস্যদের নেতৃত্ব ও তত্ত্বাবধান' },
  { desig: 'প্রশাসনিক কর্মকর্তা, কোস্ট গার্ড', grade: 'গ্রেড-৬', parent: 'ডেপুটি মহাপরিচালক (প্রশাসন)', equiv: '', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
];

cgRanks.forEach(r => {
  let parentPos = cgExisting.find(p => p.designation_bn === r.parent) || cgNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    cgNew.push(makePos(cgId, r.desig, r.grade, parentPos.id, r.equiv, '', 'কোস্ট গার্ড সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'প্রাসঙ্গিক নৌ/সামরিক প্রশিক্ষণ',
      'পদোন্নতি/সরকারি নিয়োগের মাধ্যমে'));
  }
});

// Link existing members to পেটি অফিসার
const po = cgNew.find(p => p.designation_bn === 'পেটি অফিসার, কোস্ট গার্ড');
if (po) {
  for (let i = 1; i <= 10; i++) {
    const m = cgExisting.find(p => p.designation_bn === `কোস্ট গার্ড সদস্য-${i}`);
    if (m) m.parent_position_id = po.id;
  }
}

register(cgNew);
console.log(`Coast Guard enhanced: +${cgNew.length} positions`);

// ====================================================================
// PHASE 2C: NSI (জাতীয় নিরাপত্তা গোয়েন্দা) - Complete Structure
// ====================================================================
const nsiId = 'home-nsb';
const nsiExisting = getPositions(nsiId);
const nsiDG = nsiExisting.find(p => p.designation_bn === 'মহাপরিচালক (NSI)');

const nsiNew = [];

const nsiRanks = [
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), NSI', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (NSI)', equiv: 'সচিব', resp: 'গোয়েন্দা অভিযান পরিকল্পনা ও তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), NSI', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (NSI)', equiv: 'সচিব', resp: 'প্রশাসনিক ও লজিস্টিক ব্যবস্থাপনা' },
  { desig: 'জয়েন্ট ডিরেক্টর, NSI', grade: 'গ্রেড-৩', parent: 'মহাপরিচালক (NSI)', equiv: 'অতিরিক্ত সচিব', resp: 'গোয়েন্দা শাখা পরিচালনা' },
  { desig: 'ডেপুটি ডিরেক্টর, NSI', grade: 'গ্রেড-৪', parent: 'জয়েন্ট ডিরেক্টর, NSI', equiv: 'যুগ্ম সচিব', resp: 'গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণ' },
  { desig: 'সহকারী ডিরেক্টর, NSI', grade: 'গ্রেড-৫', parent: 'ডেপুটি ডিরেক্টর, NSI', equiv: 'উপসচিব', resp: 'ক্ষেত্র পর্যায়ে গোয়েন্দা কাজ তদারকি' },
  { desig: 'প্রশাসনিক কর্মকর্তা (NSI)', grade: 'গ্রেড-৬', parent: 'ডেপুটি ডিরেক্টর, NSI', equiv: '', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
  { desig: 'গোয়েন্দা সহায়ক কর্মকর্তা (NSI)', grade: 'গ্রেড-৮', parent: 'সহকারী ডিরেক্টর, NSI', equiv: '', resp: 'গোয়েন্দা তথ্য সংগ্রহে সহায়তা' },
  { desig: 'অফিস সহায়ক (NSI)', grade: 'গ্রেড-১৪', parent: 'প্রশাসনিক কর্মকর্তা (NSI)', equiv: '', resp: 'সাধারণ অফিস সহায়তা' },
];

nsiRanks.forEach(r => {
  let parentPos = nsiExisting.find(p => p.designation_bn === r.parent) || nsiNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    nsiNew.push(makePos(nsiId, r.desig, r.grade, parentPos.id, r.equiv, '', 'NSI সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'প্রাসঙ্গিক গোয়েন্দা প্রশিক্ষণ; নিরাপত্তা ক্লিয়ারেন্স',
      'পদোন্নতি/সরকারি নিয়োগের মাধ্যমে'));
  }
});

// Link existing officers to জয়েন্ট ডিরেক্টর
const jtDir = nsiNew.find(p => p.designation_bn === 'জয়েন্ট ডিরেক্টর, NSI');
if (jtDir) {
  for (let i = 1; i <= 10; i++) {
    const io = nsiExisting.find(p => p.designation_bn === `গোয়েন্দা কর্মকর্তা-${i}`);
    if (io) io.parent_position_id = jtDir.id;
  }
}

register(nsiNew);
console.log(`NSI enhanced: +${nsiNew.length} positions`);

// ====================================================================
// PHASE 2D: DGFI - Complete Structure
// ====================================================================
const dgfiId = 'defence-dgfi';
const dgfiExisting = getPositions(dgfiId);
const dgfiDG = dgfiExisting.find(p => p.designation_bn === 'মহাপরিচালক (DGFI)');

const dgfiNew = [];

const dgfiRanks = [
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), DGFI', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (DGFI)', equiv: 'মেজর জেনারেল', resp: 'প্রতিরক্ষা গোয়েন্দা অভিযান তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), DGFI', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (DGFI)', equiv: 'মেজর জেনারেল', resp: 'প্রশাসনিক ও লজিস্টিক ব্যবস্থাপনা' },
  { desig: 'জয়েন্ট ডিরেক্টর, DGFI', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), DGFI', equiv: 'ব্রিগেডিয়ার', resp: 'গোয়েন্দা শাখা পরিচালনা' },
  { desig: 'ডেপুটি ডিরেক্টর, DGFI', grade: 'গ্রেড-৪', parent: 'জয়েন্ট ডিরেক্টর, DGFI', equiv: 'কর্নেল', resp: 'গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণ' },
  { desig: 'সহকারী ডিরেক্টর, DGFI', grade: 'গ্রেড-৫', parent: 'ডেপুটি ডিরেক্টর, DGFI', equiv: 'মেজর/লেফটেন্যান্ট কর্নেল', resp: 'ক্ষেত্র পর্যায়ে প্রতিরক্ষা গোয়েন্দা কাজ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (DGFI)', grade: 'গ্রেড-৬', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), DGFI', equiv: '', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
  { desig: 'গোয়েন্দা সহায়ক কর্মকর্তা (DGFI)', grade: 'গ্রেড-৮', parent: 'সহকারী ডিরেক্টর, DGFI', equiv: '', resp: 'গোয়েন্দা তথ্য সংগ্রহে সহায়তা' },
];

dgfiRanks.forEach(r => {
  let parentPos = dgfiExisting.find(p => p.designation_bn === r.parent) || dgfiNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    dgfiNew.push(makePos(dgfiId, r.desig, r.grade, parentPos.id, r.equiv, '', 'DGFI সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'প্রাসঙ্গিক সামরিক/গোয়েন্দা প্রশিক্ষণ; নিরাপত্তা ক্লিয়ারেন্স',
      'পদোন্নতি/সামরিক বাহিনী থেকে সংযুক্তির মাধ্যমে'));
  }
});

// Link existing officers to জয়েন্ট ডিরেক্টর
const jtDirD = dgfiNew.find(p => p.designation_bn === 'জয়েন্ট ডিরেক্টর, DGFI');
if (jtDirD) {
  for (let i = 1; i <= 8; i++) {
    const io = dgfiExisting.find(p => p.designation_bn === `গোয়েন্দা কর্মকর্তা-${i}`);
    if (io) io.parent_position_id = jtDirD.id;
  }
}

register(dgfiNew);
console.log(`DGFI enhanced: +${dgfiNew.length} positions`);

// ====================================================================
// PHASE 2E: Fire Service & Civil Defence - Complete Structure
// ====================================================================
const fireId = 'home-fire';
const fireExisting = getPositions(fireId);
const fireMap = {};
fireExisting.forEach(p => { fireMap[p.designation_bn] = p; });

const fireNew = [];

const fireRanks = [
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), ফায়ার সার্ভিস', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (ফায়ার সার্ভিস)', equiv: '', resp: 'অগ্নিনির্বাপণ ও উদ্ধার অভিযান তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), ফায়ার সার্ভিস', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (ফায়ার সার্ভিস)', equiv: '', resp: 'প্রশাসনিক ও প্রশিক্ষণ ব্যবস্থাপনা' },
  { desig: 'ডিরেক্টর (অগ্নিনির্বাপণ)', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), ফায়ার সার্ভিস', equiv: '', resp: 'অগ্নিনির্বাপণ কৌশল ও সরঞ্জাম তদারকি' },
  { desig: 'ডিরেক্টর (সিভিল ডিফেন্স)', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), ফায়ার সার্ভিস', equiv: '', resp: 'সিভিল ডিফেন্স ও দুর্যোগ ব্যবস্থাপনা' },
  { desig: 'ডেপুটি ডিরেক্টর (ফায়ার স্টেশন)', grade: 'গ্রেড-৪', parent: 'ডিরেক্টর (অগ্নিনির্বাপণ)', equiv: '', resp: 'ফায়ার স্টেশনসমূহের তদারকি' },
  { desig: 'সিনিয়র স্টেশন অফিসার', grade: 'গ্রেড-৫', parent: 'ডেপুটি ডিরেক্টর (ফায়ার স্টেশন)', equiv: '', resp: 'ফায়ার স্টেশন পরিচালনা' },
  { desig: 'স্টেশন অফিসার', grade: 'গ্রেড-৬', parent: 'সিনিয়র স্টেশন অফিসার', equiv: '', resp: 'ফায়ার স্টেশনের দৈনন্দিন কার্যক্রম' },
  { desig: 'লিডিং ফায়ারম্যান', grade: 'গ্রেড-৭', parent: 'স্টেশন অফিসার', equiv: '', resp: 'ফায়ারম্যান দলের নেতৃত্ব' },
  { desig: 'ফায়ারম্যান (প্রশিক্ষিত)', grade: 'গ্রেড-৮', parent: 'লিডিং ফায়ারম্যান', equiv: '', resp: 'অগ্নিনির্বাপণ ও উদ্ধার কাজ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (ফায়ার সার্ভিস)', grade: 'গ্রেড-৬', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), ফায়ার সার্ভিস', equiv: '', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
];

fireRanks.forEach(r => {
  let parentPos = fireExisting.find(p => p.designation_bn === r.parent) || fireNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    fireNew.push(makePos(fireId, r.desig, r.grade, parentPos.id, r.equiv, '', 'ফায়ার সার্ভিস সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'প্রাসঙ্গিক অগ্নিনির্বাপণ প্রশিক্ষণ; শারীরিক সক্ষমতা',
      'পদোন্নতি/সরকারি নিয়োগ পরীক্ষার মাধ্যমে'));
  }
});

// Link existing members to ফায়ারম্যান
const fm = fireNew.find(p => p.designation_bn === 'ফায়ারম্যান (প্রশিক্ষিত)');
if (fm) {
  for (let i = 1; i <= 20; i++) {
    const m = fireExisting.find(p => p.designation_bn === `ফায়ার সার্ভিস সদস্য-${i}`);
    if (m) m.parent_position_id = fm.id;
  }
}

register(fireNew);
console.log(`Fire Service enhanced: +${fireNew.length} positions`);

// ====================================================================
// PHASE 2F: Ansar & VDP - Complete Structure
// ====================================================================
const ansarId = 'home-ansar';
const ansarExisting = getPositions(ansarId);
const ansarMap = {};
ansarExisting.forEach(p => { ansarMap[p.designation_bn] = p; });

const ansarNew = [];

const ansarRanks = [
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), আনসার', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (আনসার ও ভিডিপি)', equiv: '', resp: 'আনসার ব্যাটালিয়নের অপারেশনাল তদারকি' },
  { desig: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), আনসার', grade: 'গ্রেড-২', parent: 'মহাপরিচালক (আনসার ও ভিডিপি)', equiv: '', resp: 'প্রশাসনিক ও লজিস্টিক ব্যবস্থাপনা' },
  { desig: 'ডিরেক্টর (আনসার ব্যাটালিয়ন)', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), আনসার', equiv: '', resp: 'আনসার ব্যাটালিয়নসমূহের তদারকি' },
  { desig: 'ডিরেক্টর (ভিডিপি)', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (অপারেশন্স), আনসার', equiv: '', resp: 'গ্রাম প্রতিরক্ষা দল (ভিডিপি) ব্যবস্থাপনা' },
  { desig: 'ডিরেক্টর (প্রশিক্ষণ), আনসার', grade: 'গ্রেড-৩', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), আনসার', equiv: '', resp: 'আনসার ও ভিডিপি সদস্যদের প্রশিক্ষণ তদারকি' },
  { desig: 'উপ-পরিচালক (আনসার ব্যাটালিয়ন)', grade: 'গ্রেড-৪', parent: 'ডিরেক্টর (আনসার ব্যাটালিয়ন)', equiv: '', resp: 'ব্যাটালিয়ন পর্যায়ে কমান্ড ও প্রশাসন' },
  { desig: 'সহকারী পরিচালক (আনসার)', grade: 'গ্রেড-৫', parent: 'উপ-পরিচালক (আনসার ব্যাটালিয়ন)', equiv: '', resp: 'কোম্পানি কমান্ড ও ক্ষেত্র পর্যায়ের তদারকি' },
  { desig: 'আনসার/ভিডিপি কোম্পানি কমান্ডার', grade: 'গ্রেড-৬', parent: 'সহকারী পরিচালক (আনসার)', equiv: '', resp: 'আনসার কোম্পানি পরিচালনা' },
  { desig: 'আনসার প্লাটুন কমান্ডার', grade: 'গ্রেড-৭', parent: 'আনসার/ভিডিপি কোম্পানি কমান্ডার', equiv: '', resp: 'প্লাটুন কমান্ড ও নেতৃত্ব' },
  { desig: 'আনসার সদস্য (নায়েক)', grade: 'গ্রেড-৮', parent: 'আনসার প্লাটুন কমান্ডার', equiv: '', resp: 'দল নেতৃত্ব ও তত্ত্বাবধান' },
  { desig: 'প্রশাসনিক কর্মকর্তা (আনসার)', grade: 'গ্রেড-৬', parent: 'অতিরিক্ত মহাপরিচালক (প্রশাসন), আনসার', equiv: '', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
];

ansarRanks.forEach(r => {
  let parentPos = ansarExisting.find(p => p.designation_bn === r.parent) || ansarNew.find(p => p.designation_bn === r.parent);
  if (parentPos) {
    ansarNew.push(makePos(ansarId, r.desig, r.grade, parentPos.id, r.equiv, '', 'আনসার সদরদপ্তর',
      r.resp, 'পদোন্নতি', r.resp,
      'প্রাসঙ্গিক আনসার/সামরিক প্রশিক্ষণ; শিক্ষাগত যোগ্যতা',
      'পদোন্নতি/সরকারি নিয়োগ পরীক্ষার মাধ্যমে'));
  }
});

// Link existing members
const ansarNayek = ansarNew.find(p => p.designation_bn === 'আনসার সদস্য (নায়েক)');
if (ansarNayek) {
  for (let i = 1; i <= 25; i++) {
    const m = ansarExisting.find(p => p.designation_bn === `আনসার সদস্য-${i}`);
    if (m) m.parent_position_id = ansarNayek.id;
  }
}

register(ansarNew);
console.log(`Ansar enhanced: +${ansarNew.length} positions`);

// ====================================================================
// PHASE 2G: 43 Single-Position Offices - Add Basic Hierarchies
// Each office gets: Head → Deputy → Admin Officer → Assistant → Support
// ====================================================================

const singlePosOffices = [
  // [officeId, headDesignation, headGrade, officeType]
  ['president-office', 'রাষ্ট্রপতি', 'গ্রেড-১'],
  ['cabinet-division', 'মন্ত্রিপরিষদ সচিব', 'গ্রেড-১'],
  ['industries-bsci', 'চেয়ারম্যান (BSCIC)', 'গ্রেড-১'],
  ['industries-tea', 'চেয়ারম্যান (চা বোর্ড)', 'গ্রেড-১'],
  ['food-dgf', 'মহাপরিচালক (খাদ্য অধিদপ্তর)', 'গ্রেড-১'],
  ['social-dsw', 'মহাপরিচালক (DSW)', 'গ্রেড-১'],
  ['cultural-bnm', 'সভাপতি (বাংলাদেশ জাতীয় জাদুঘর)', 'গ্রেড-১'],
  ['cultural-bsl', 'সভাপতি (বাংলা একাডেমি)', 'গ্রেড-১'],
  ['youth-dept', 'মহাপরিচালক (যুব উন্নয়ন)', 'গ্রেড-১'],
  ['women-dwa', 'মহাপরিচালক (DWA)', 'গ্রেড-১'],
  ['ict-bcc', 'চেয়ারম্যান (BCC)', 'গ্রেড-১'],
  ['legislature-speaker', 'স্পিকার', 'গ্রেড-১'],
  ['legislature-ds', 'ডেপুটি স্পিকার', 'গ্রেড-১'],
  ['judiciary-appellate', 'আপিল বিভাগের বিচারক', 'গ্রেড-১'],
  ['judiciary-hc', 'হাইকোর্ট বিভাগের বিচারক', 'গ্রেড-১'],
  ['judiciary-chief-justice', 'প্রধান বিচারপতি', 'গ্রেড-১'],
  ['judiciary-law-commission', 'আইন কমিশনের চেয়ারম্যান', 'গ্রেড-১'],
  ['judiciary-legal-aid', 'জাতীয় আইনগত সহায়তা সংস্থার পরিচালক', 'গ্রেড-১'],
  ['judiciary-ati', 'দুর্নীতি ট্রাইব্যুনালের বিচারক', 'গ্রেড-২'],
  ['ngo-bureau', 'মহাপরিচালক (এনজিও ব্যুরো)', 'গ্রেড-১'],
  ['mochta-ctg-hill-council', 'চেয়ারম্যান (পার্বত্য চট্টগ্রাম আঞ্চলিক পরিষদ)', 'গ্রেড-১'],
  ['mochta-ctg-dev-board', 'প্রকল্প পরিচালক (পার্বত্য চট্টগ্রাম উন্নয়ন বোর্ড)', 'গ্রেড-১'],
  ['info-betar', 'মহাপরিচালক (বাংলাদেশ বেতার)', 'গ্রেড-১'],
  ['info-bss', 'মহাপরিচালক (বাংলাদেশ সংবাদ সংস্থা)', 'গ্রেড-১'],
  ['info-films', 'পরিচালক (চলচ্চিত্র ও প্রকাশনা)', 'গ্রেড-১'],
  ['board-madrasah', 'চেয়ারম্যান (মাদ্রাসা শিক্ষা বোর্ড)', 'গ্রেড-১'],
  ['board-technical', 'চেয়ারম্যান (কারিগরি শিক্ষা বোর্ড)', 'গ্রেড-১'],
  ['primary-bnfe', 'পরিচালক (উপানুষ্ঠানিক শিক্ষা ব্যুরো)', 'গ্রেড-১'],
  ['health-dme', 'পরিচালক (স্বাস্থ্য শিক্ষা অধিদপ্তর)', 'গ্রেড-১'],
  ['health-dmch', 'অধ্যক্ষ (ঢাকা মেডিকেল কলেজ)', 'গ্রেড-১'],
  ['anti-corruption-commission', 'সচিব (দুদক)', 'গ্রেড-১'],
  ['human-rights-commission', 'সচিব (মানবাধিকার কমিশন)', 'গ্রেড-১'],
  ['info-commission-bd', 'সচিব (তথ্য কমিশন)', 'গ্রেড-১'],
  ['legislature-mp', 'সংসদ সদস্য (এমপি)', 'গ্রেড-১'],
  ['judiciary-ict', 'চেয়ারম্যান (আন্তর্জাতিক অপরাধ ট্রাইব্যুনাল)', 'গ্রেড-১'],
  ['judiciary-women-tribunal', 'বিচারক (নারী ও শিশু ট্রাইব্যুনাল)', 'গ্রেড-২'],
  ['judiciary-cyber-tribunal', 'বিচারক (সাইবার ট্রাইব্যুনাল)', 'গ্রেড-২'],
  ['judiciary-children-court', 'বিচারক (শিশু আদালত)', 'গ্রেড-২'],
  ['judiciary-drug-tribunal', 'বিচারক (মাদকদ্রব্য ট্রাইব্যুনাল)', 'গ্রেড-২'],
  ['judiciary-land-tribunal', 'বিচারক (ভূমি জরিপ ট্রাইব্যুনাল)', 'গ্রেড-২'],
  ['judiciary-election-tribunal', 'বিচারক (নির্বাচনী ট্রাইব্যুনাল)', 'গ্রেড-২'],
  ['judiciary-administrative-tribunal', 'চেয়ারম্যান (প্রশাসনিক আপিল ট্রাইব্যুনাল)', 'গ্রেড-১'],
  ['judiciary-judicial-academy', 'মহাপরিচালক (বিচার বিভাগীয় প্রশিক্ষণ একাডেমি)', 'গ্রেড-১'],
];

let singlePosCount = 0;
singlePosOffices.forEach(([officeId, headDesig, headGrade]) => {
  const existing = getPositions(officeId);
  if (existing.length === 0) return; // skip if no head exists

  const head = existing[0]; // The single existing position
  const newOnes = [];

  // Deputy
  const deputyDesig = 'অতিরিক্ত ' + headDesig.replace(/^(চেয়ারম্যান|মহাপরিচালক|পরিচালক|সভাপতি|সচিব|প্রকল্প পরিচালক|অধ্যক্ষ)/, '');
  const deputy = makePos(officeId, `উপ-${headDesig}`, 'গ্রেড-২', head.id, '', '', 'উপরের কার্যালয়',
    'প্রশাসনিক ও কার্যকরী দায়িত্ব', 'পদোন্নতি', 'প্রতিদিনের প্রশাসনিক কাজ তদারকি',
    'প্রাসঙ্গিক স্নাতকোত্তর ডিগ্রি; ন্যূনতম ১০ বছর অভিজ্ঞতা',
    'পদোন্নতি/সরকারি নিয়োগের মাধ্যমে');
  newOnes.push(deputy);

  // Admin Officer
  const admin = makePos(officeId, 'প্রশাসনিক কর্মকর্তা', 'গ্রেড-৫', deputy.id, '', '', 'উপরের কার্যালয়',
    'প্রশাসনিক কাজ', 'পদোন্নতি', 'অফিস ব্যবস্থাপনা ও প্রশাসনিক দায়িত্ব',
    'স্নাতক ডিগ্রি; প্রশাসনিক অভিজ্ঞতা',
    'সরকারি নিয়োগ পরীক্ষার মাধ্যমে');
  newOnes.push(admin);

  // Assistant
  const asst = makePos(officeId, 'সহকারী প্রশাসনিক কর্মকর্তা', 'গ্রেড-৭', admin.id, '', '', 'উপরের কার্যালয়',
    'সহায়তামূলক কাজ', 'পদোন্নতি', 'প্রশাসনিক সহায়তা প্রদান',
    'স্নাতক ডিগ্রি',
    'সরকারি নিয়োগ পরীক্ষার মাধ্যমে');
  newOnes.push(asst);

  // Office support
  const support = makePos(officeId, 'অফিস সহায়ক', 'গ্রেড-১৪', asst.id, '', '', 'উপরের কার্যালয়',
    'সাধারণ সহায়তা', 'পদোন্নতি', 'অফিসের সহায়ক কাজ',
    'অষ্টম শ্রেণি/এসএসসি পাস',
    'সরকারি নিয়োগ পরীক্ষার মাধ্যমে নিয়োগ');
  newOnes.push(support);

  register(newOnes);
  singlePosCount++;
});

console.log(`Single-position offices enhanced: ${singlePosCount} offices`);

// ====================================================================
// REGENERATE all subordinate_position_ids
// ====================================================================
positions.forEach(p => { p.subordinate_position_ids = []; });
positions.forEach(p => { posLookup[p.id] = p; });
positions.forEach(p => {
  if (p.parent_position_id) {
    const parent = posLookup[p.parent_position_id];
    if (parent && !parent.subordinate_position_ids.includes(p.id)) {
      parent.subordinate_position_ids.push(p.id);
    }
  }
});

// ====================================================================
// SAVE
// ====================================================================
fs.writeFileSync(path.join(DATA, 'offices.json'), JSON.stringify(offices, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');

console.log('\n=== PHASE 2 COMPLETE ===');
console.log(`Offices: ${offices.length}`);
console.log(`Positions: ${positions.length}`);
console.log(`BGB: +${bgbNew.length}`);
console.log(`Coast Guard: +${cgNew.length}`);
console.log(`NSI: +${nsiNew.length}`);
console.log(`DGFI: +${dgfiNew.length}`);
console.log(`Fire: +${fireNew.length}`);
console.log(`Ansar: +${ansarNew.length}`);
console.log(`Single-Pos Offices: +${singlePosCount * 4}`);
