const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

const posLookup = {};
positions.forEach(p => { posLookup[p.id] = p; });

let nextPosId = 8454;
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

function register(newPositions) {
  positions.push(...newPositions);
  return newPositions;
}

function getExisting(officeId) {
  return positions.filter(p => p.office_id === officeId);
}

// Helper: create office + position set
function addDepartment(officeId, nameBn, parentId, description, headGrade, hierarchy) {
  const exists = offices.find(o => o.id === officeId);
  if (exists) {
    console.log(`  SKIP (exists): ${nameBn}`);
    return;
  }

  offices.push({
    id: officeId,
    name_bn: nameBn,
    parent_office_id: parentId,
    office_type_bn: 'পুলিশ বিভাগ',
    jurisdiction_bn: 'সারা বাংলাদেশ',
    governing_law_bn: 'পুলিশ আইন, ১৮৬১ ও পুলিশ রেগুলেশনস, ১৯৪৩',
    target_audience_bn: 'সাধারণ জনগণ, আইন-শৃঙ্খলা রক্ষাকারী বাহিনী',
    category: 'Police',
    contact_info: { website: 'https://www.police.gov.bd' },
    description_bn: description,
  });

  const created = [];
  const nameMap = {};

  hierarchy.forEach((item, idx) => {
    let parentId = null;
    if (item.parentIndex !== undefined && item.parentIndex < idx) {
      const parentPos = created[item.parentIndex];
      if (parentPos) parentId = parentPos.id;
    }
    const grade = item.grade || 'গ্রেড-' + (1 + idx);
    const p = makePos(officeId, item.desig, grade, parentId, item.equiv || '', '', item.appAuth || 'পুলিশ সদরদপ্তর',
      item.resp || '', 'পদোন্নতি', item.resp || '',
      item.qual || 'প্রাসঙ্গিক পুলিশ প্রশিক্ষণ ও অভিজ্ঞতা',
      item.appt || 'পদোন্নতি/সরকারি নিয়োগের মাধ্যমে');
    created.push(p);
    nameMap[item.desig] = p;
  });

  register(created);
  console.log(`  Added: ${nameBn} (${created.length} positions)`);
}

// ====================================================================
// PHASE 3: Police Departments
// ====================================================================
console.log('=== Adding Police Departments ===\n');

// 1. CID (Criminal Investigation Department)
addDepartment('police-cid', 'ক্রিমিনাল ইনভেস্টিগেশন ডিপার্টমেন্ট (CID)',
  'police-hq', 'গোয়েন্দা পুলিশের সর্বোচ্চ সংস্থা। জটিল অপরাধ তদন্ত, ফরেনসিক বিশ্লেষণ ও বিশেষ তদন্ত দলের মাধ্যমে গুরুতর অপরাধের তদন্ত করে।', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত আইজিপি (CID)', grade: 'গ্রেড-২', equiv: 'অতিরিক্ত আইজিপি', resp: 'CID-এর সর্বোচ্চ প্রধান; সকল তদন্ত কার্যক্রমের তদারকি', qual: 'স্নাতকোত্তর ডিগ্রি; ন্যূনতম ২৫ বছর পুলিশ অভিজ্ঞতা', appt: 'সরকারি পদোন্নতির মাধ্যমে' },
  { desig: 'ডিআইজি (CID)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'CID-এর বিশেষ শাখা পরিচালনা' },
  { desig: 'পুলিশ সুপার (CID)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'তদন্ত দল পরিচালনা ও অপরাধ তদন্ত তদারকি' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (CID)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'তদন্ত দলের সহ-নেতৃত্ব' },
  { desig: 'সহকারী পুলিশ সুপার (CID)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'ক্ষেত্র পর্যায়ে তদন্তকারী অফিসার' },
  { desig: 'ইনস্পেক্টর (CID)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'তদন্তকারী অফিসার হিসেবে মামলা তদন্ত' },
  { desig: 'সাব-ইনস্পেক্টর (CID)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'তদন্তে সহায়তা ও তথ্য সংগ্রহ' },
  { desig: 'সহকারী সাব-ইনস্পেক্টর (CID)', grade: 'গ্রেড-৯', equiv: 'এএসআই', resp: 'ক্ষেত্র পর্যায়ের তদন্ত সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (CID)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ও অফিস ব্যবস্থাপনা' },
  { desig: 'অফিস সহায়ক (CID)', grade: 'গ্রেড-১৪', resp: 'সাধারণ অফিস সহায়তা' },
]);

// 2. Special Branch (SB)
addDepartment('police-sb', 'স্পেশাল ব্রাঞ্চ (SB)',
  'police-hq', 'বাংলাদেশ পুলিশের গোয়েন্দা শাখা। রাজনৈতিক, সামাজিক ও নিরাপত্তা সংক্রান্ত গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণ করে।', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত আইজিপি (SB)', grade: 'গ্রেড-২', equiv: 'অতিরিক্ত আইজিপি', resp: 'SB-এর সর্বোচ্চ প্রধান; গোয়েন্দা কার্যক্রম তদারকি', qual: 'স্নাতকোত্তর ডিগ্রি; ন্যূনতম ২৫ বছর পুলিশ অভিজ্ঞতা', appt: 'সরকারি পদোন্নতির মাধ্যমে' },
  { desig: 'ডিআইজি (SB)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'গোয়েন্দা শাখা পরিচালনা' },
  { desig: 'পুলিশ সুপার (SB)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'গোয়েন্দা দল পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (SB)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'গোয়েন্দা তথ্য সংগ্রহ ও বিশ্লেষণে সহায়তা' },
  { desig: 'সহকারী পুলিশ সুপার (SB)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'ক্ষেত্র পর্যায়ে গোয়েন্দা কাজ' },
  { desig: 'ইনস্পেক্টর (SB)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'গোয়েন্দা তথ্য সংগ্রহ' },
  { desig: 'সাব-ইনস্পেক্টর (SB)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'গোয়েন্দা তথ্য সংগ্রহে সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (SB)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
  { desig: 'অফিস সহায়ক (SB)', grade: 'গ্রেড-১৪', resp: 'সাধারণ সহায়তা' },
]);

// 3. Detective Branch (DB)
addDepartment('police-db', 'ডিটেকটিভ ব্রাঞ্চ (DB)',
  'police-hq', 'ঢাকা মহানগর ও অন্যান্য মহানগর এলাকায় অপরাধ তদন্তের জন্য নিবেদিত বিশেষ শাখা।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (DB)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'DB-এর সর্বোচ্চ প্রধান; অপরাধ তদন্ত তদারকি', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'যুগ্ম-পুলিশ কমিশনার (DB)', grade: 'গ্রেড-৪', equiv: 'যুগ্ম-পুলিশ কমিশনার', resp: 'DB-এর বিশেষ তদন্ত শাখা পরিচালনা' },
  { desig: 'পুলিশ সুপার (DB)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'মহানগর তদন্ত দল পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (DB)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'তদন্ত দলের সহ-নেতৃত্ব' },
  { desig: 'সহকারী পুলিশ সুপার (DB)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'ক্ষেত্র পর্যায়ে তদন্ত' },
  { desig: 'ইনস্পেক্টর (DB)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'মামলা তদন্ত' },
  { desig: 'সাব-ইনস্পেক্টর (DB)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'তদন্তে সহায়তা' },
  { desig: 'সহকারী সাব-ইনস্পেক্টর (DB)', grade: 'গ্রেড-৯', equiv: 'এএসআই', resp: 'ক্ষেত্র পর্যায়ের সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (DB)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 4. RAB (Rapid Action Battalion)
addDepartment('police-rab', 'র্যাপিড অ্যাকশন ব্যাটালিয়ন (RAB)',
  'police-hq', 'বাংলাদেশ পুলিশের এলিট বাহিনী। সন্ত্রাসবাদ, জঙ্গিবাদ, সংগঠিত অপরাধ ও বিশেষ অভিযান পরিচালনা করে।', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত আইজিপি (RAB)', grade: 'গ্রেড-২', equiv: 'অতিরিক্ত আইজিপি', resp: 'RAB-এর সর্বোচ্চ প্রধান; সকল অভিযান তদারকি', qual: 'স্নাতকোত্তর ডিগ্রি; ন্যূনতম ২৫ বছর পুলিশ/সামরিক অভিজ্ঞতা', appt: 'সরকারি পদোন্নতির মাধ্যমে' },
  { desig: 'ডিআইজি (RAB সদরদপ্তর)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'RAB সদরদপ্তর পরিচালনা' },
  { desig: 'পুলিশ সুপার (RAB ব্যাটালিয়ন)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'RAB ব্যাটালিয়ন কমান্ড' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (RAB ব্যাটালিয়ন)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'RAB ব্যাটালিয়নের উপ-কমান্ডার' },
  { desig: 'সহকারী পুলিশ সুপার (RAB)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'RAB কোম্পানি কমান্ডার' },
  { desig: 'সিনিয়র ওয়ারেন্ট অফিসার (RAB)', grade: 'গ্রেড-৭', equiv: '', resp: 'ক্ষেত্র পর্যায়ের অভিযান তদারকি' },
  { desig: 'ওয়ারেন্ট অফিসার (RAB)', grade: 'গ্রেড-৮', equiv: '', resp: 'অভিযানে অংশগ্রহণ' },
  { desig: 'RAB সদস্য', grade: 'গ্রেড-৯', equiv: '', resp: 'ক্ষেত্র অভিযানে অংশগ্রহণ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (RAB)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
  { desig: 'অফিস সহায়ক (RAB)', grade: 'গ্রেড-১৪', resp: 'সাধারণ সহায়তা' },
]);

// 5. PBI (Police Bureau of Investigation)
addDepartment('police-pbi', 'পুলিশ ব্যুরো অব ইনভেস্টিগেশন (PBI)',
  'police-hq', 'পুলিশ বাহিনীর বিশেষ তদন্ত সংস্থা। গুরুতর ও সংবেদনশীল অপরাধের স্বাধীন ও নিরপেক্ষ তদন্ত করে।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (PBI)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'PBI-র সর্বোচ্চ প্রধান; তদন্ত কার্যক্রম তদারকি', qual: 'স্নাতকোত্তর ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (PBI)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'তদন্ত দল পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (PBI)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'তদন্তে সহায়তা' },
  { desig: 'সহকারী পুলিশ সুপার (PBI)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'তদন্তকারী অফিসার' },
  { desig: 'ইনস্পেক্টর (PBI)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'মামলা তদন্ত' },
  { desig: 'সাব-ইনস্পেক্টর (PBI)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'তদন্তে সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (PBI)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 6. Armed Police Battalion (APBn)
addDepartment('police-apbn', 'আর্মড পুলিশ ব্যাটালিয়ন (APBn)',
  'police-hq', 'পুলিশের সশস্ত্র ব্যাটালিয়ন। ভিআইপি নিরাপত্তা, বিশেষ স্থাপনা রক্ষা ও গণতান্ত্রিক প্রতিষ্ঠানের নিরাপত্তা প্রদান করে।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (APBn)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'APBn-এর সর্বোচ্চ প্রধান; সকল ব্যাটালিয়ন তদারকি', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (APBn ব্যাটালিয়ন)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'APBn ব্যাটালিয়ন কমান্ড' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (APBn)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'ব্যাটালিয়নের উপ-কমান্ডার' },
  { desig: 'সহকারী পুলিশ সুপার (APBn)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'APBn কোম্পানি কমান্ডার' },
  { desig: 'APBn সদস্য', grade: 'গ্রেড-৮', equiv: '', resp: 'নিরাপত্তা দায়িত্ব পালন' },
  { desig: 'প্রশাসনিক কর্মকর্তা (APBn)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 7. Highway Police
addDepartment('police-highway', 'হাইওয়ে পুলিশ',
  'police-hq', 'জাতীয় মহাসড়কে ট্রাফিক ব্যবস্থাপনা, দুর্ঘটনা প্রতিরোধ ও আইন-শৃঙ্খলা রক্ষার জন্য নিবেদিত পুলিশ ইউনিট।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (হাইওয়ে পুলিশ)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'হাইওয়ে পুলিশের সর্বোচ্চ প্রধান', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (হাইওয়ে)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'হাইওয়ে জোন পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (হাইওয়ে)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'হাইওয়ে সার্কেল তদারকি' },
  { desig: 'সহকারী পুলিশ সুপার (হাইওয়ে)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'হাইওয়ে থানা/ফাঁড়ি পরিচালনা' },
  { desig: 'ট্রাফিক ইন্সপেক্টর (হাইওয়ে)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'সড়কে ট্রাফিক ও আইন ব্যবস্থাপনা' },
  { desig: 'ট্রাফিক সার্জেন্ট (হাইওয়ে)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'টহল ও আইন প্রয়োগ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (হাইওয়ে)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 8. Railway Police
addDepartment('police-railway', 'রেলওয়ে পুলিশ',
  'police-hq', 'রেলস্টেশন, রেললাইন ও রেলযাত্রীদের নিরাপত্তা নিশ্চিত করার জন্য নিবেদিত পুলিশ ইউনিট।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (রেলওয়ে পুলিশ)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'রেলওয়ে পুলিশের সর্বোচ্চ প্রধান', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (রেলওয়ে)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'রেলওয়ে জোন পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (রেলওয়ে)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'রেলওয়ে সার্কেল তদারকি' },
  { desig: 'সহকারী পুলিশ সুপার (রেলওয়ে)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'রেলওয়ে থানা/ফাঁড়ি পরিচালনা' },
  { desig: 'ইনস্পেক্টর (রেলওয়ে)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'রেলস্টেশন ও ট্রেনে টহল' },
  { desig: 'সাব-ইনস্পেক্টর (রেলওয়ে)', grade: 'গ্রেড-৮', equiv: 'এসআই', resp: 'রেলস্টেশন ও ট্রেনে টহল সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (রেলওয়ে)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 9. Industrial Police
addDepartment('police-industrial', 'শিল্প পুলিশ',
  'police-hq', 'শিল্প-কারখানা ও অর্থনৈতিক অঞ্চলের নিরাপত্তা নিশ্চিত করার জন্য নিবেদিত পুলিশ ইউনিট।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (শিল্প পুলিশ)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'শিল্প পুলিশের সর্বোচ্চ প্রধান', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (শিল্প)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'শিল্প জোন পরিচালনা' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (শিল্প)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'শিল্প এলাকায় আইন-শৃঙ্খলা তদারকি' },
  { desig: 'সহকারী পুলিশ সুপার (শিল্প)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'শিল্প ফাঁড়ি পরিচালনা' },
  { desig: 'ইনস্পেক্টর (শিল্প)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'শিল্প এলাকায় টহল ও নিরাপত্তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (শিল্প)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 10. Tourist Police
addDepartment('police-tourist', 'টুরিস্ট পুলিশ',
  'police-hq', 'পর্যটন এলাকায় পর্যটকদের নিরাপত্তা ও সহায়তা প্রদানের জন্য নিবেদিত পুলিশ ইউনিট।', 'গ্রেড-৪', [
  { desig: 'পুলিশ সুপার (টুরিস্ট)', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'টুরিস্ট পুলিশের প্রধান', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ১৫ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'অতিরিক্ত পুলিশ সুপার (টুরিস্ট)', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'পর্যটন এলাকায় টহল তদারকি' },
  { desig: 'সহকারী পুলিশ সুপার (টুরিস্ট)', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'টুরিস্ট ফাঁড়ি পরিচালনা' },
  { desig: 'ইনস্পেক্টর (টুরিস্ট)', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'পর্যটকদের সহায়তা ও নিরাপত্তা' },
  { desig: 'টুরিস্ট পুলিশ সদস্য', grade: 'গ্রেড-৮', equiv: '', resp: 'টহল ও পর্যটক সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (টুরিস্ট)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 11. Police Training Institutions
addDepartment('police-training', 'পুলিশ ট্রেনিং একাডেমি',
  'police-hq', 'বাংলাদেশ পুলিশের প্রশিক্ষণ প্রতিষ্ঠান। নতুন রিক্রুট ও বিদ্যমান সদস্যদের প্রশিক্ষণ প্রদান করে।', 'গ্রেড-২', [
  { desig: 'কমান্ড্যান্ট (পুলিশ ট্রেনিং)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'প্রশিক্ষণ একাডেমির প্রধান', qual: 'স্নাতকোত্তর ডিগ্রি; প্রশিক্ষণ বিষয়ক দক্ষতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'ভাইস কমান্ড্যান্ট', grade: 'গ্রেড-৪', equiv: 'এসপি', resp: 'প্রশিক্ষণ পাঠ্যক্রম তদারকি' },
  { desig: 'সিনিয়র প্রশিক্ষক', grade: 'গ্রেড-৫', equiv: 'এডিশনাল এসপি', resp: 'প্রশিক্ষণ মডিউল তৈরি ও প্রদান' },
  { desig: 'প্রশিক্ষক', grade: 'গ্রেড-৬', equiv: 'এএসপি', resp: 'ক্ষেত্র প্রশিক্ষণ প্রদান' },
  { desig: 'সহকারী প্রশিক্ষক', grade: 'গ্রেড-৭', equiv: 'ইনস্পেক্টর', resp: 'প্রশিক্ষণ সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (প্রশিক্ষণ)', grade: 'গ্রেড-৬', resp: 'প্রশিক্ষণ প্রশাসন ব্যবস্থাপনা' },
  { desig: 'অফিস সহায়ক (প্রশিক্ষণ)', grade: 'গ্রেড-১৪', resp: 'সাধারণ সহায়তা' },
]);

// 12. Police Hospital
addDepartment('police-hospital', 'পুলিশ হাসপাতাল',
  'police-hq', 'পুলিশ সদস্য ও তাদের পরিবারের চিকিৎসা সেবা প্রদানের জন্য নিবেদিত হাসপাতাল।', 'গ্রেড-২', [
  { desig: 'পরিচালক (পুলিশ হাসপাতাল)', grade: 'গ্রেড-৩', resp: 'হাসপাতালের প্রশাসনিক ও চিকিৎসা কার্যক্রম তদারকি', qual: 'এমবিবিএস; ন্যূনতম ১৫ বছর চিকিৎসা অভিজ্ঞতা', appt: 'সরকারি স্বাস্থ্য ক্যাডার থেকে সংযুক্তি' },
  { desig: 'উপ-পরিচালক (পুলিশ হাসপাতাল)', grade: 'গ্রেড-৪', resp: 'চিকিৎসা সেবা তদারকি' },
  { desig: 'মেডিকেল অফিসার (পুলিশ হাসপাতাল)', grade: 'গ্রেড-৫', resp: 'চিকিৎসা সেবা প্রদান' },
  { desig: 'নার্সিং সুপারভাইজার', grade: 'গ্রেড-৬', resp: 'নার্সিং সেবা তদারকি' },
  { desig: 'সিনিয়র স্টাফ নার্স', grade: 'গ্রেড-৭', resp: 'নার্সিং সেবা প্রদান' },
  { desig: 'স্টাফ নার্স', grade: 'গ্রেড-৮', resp: 'নার্সিং সহায়তা' },
  { desig: 'প্রশাসনিক কর্মকর্তা (পুলিশ হাসপাতাল)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
  { desig: 'অফিস সহায়ক (পুলিশ হাসপাতাল)', grade: 'গ্রেড-১৪', resp: 'সাধারণ সহায়তা' },
]);

// 13. Traffic Police (Dhaka Metro)
addDepartment('police-traffic', 'ট্রাফিক পুলিশ (ঢাকা মেট্রোপলিটন)',
  'police-hq', 'ঢাকা মহানগরীতে যানবাহন চলাচল ব্যবস্থাপনা, ট্রাফিক আইন প্রয়োগ ও সড়ক নিরাপত্তা নিশ্চিত করে।', 'গ্রেড-২', [
  { desig: 'যুগ্ম-পুলিশ কমিশনার (ট্রাফিক)', grade: 'গ্রেড-৪', equiv: 'যুগ্ম-পুলিশ কমিশনার', resp: 'ঢাকা মহানগর ট্রাফিক ব্যবস্থাপনার প্রধান', qual: 'স্নাতক ডিগ্রি; ন্যূনতম ২০ বছর পুলিশ অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'অতিরিক্ত পুলিশ কমিশনার (ট্রাফিক)', grade: 'গ্রেড-৫', resp: 'ট্রাফিক জোন তদারকি' },
  { desig: 'সহকারী পুলিশ কমিশনার (ট্রাফিক)', grade: 'গ্রেড-৬', resp: 'ট্রাফিক জোন পরিচালনা' },
  { desig: 'ট্রাফিক ইন্সপেক্টর', grade: 'গ্রেড-৭', resp: 'ট্রাফিক বক্স/পয়েন্ট তদারকি' },
  { desig: 'ট্রাফিক সার্জেন্ট', grade: 'গ্রেড-৮', resp: 'সড়কে ট্রাফিক ব্যবস্থাপনা' },
  { desig: 'ট্রাফিক কনস্টেবল', grade: 'গ্রেড-৯', resp: 'সড়কে ট্রাফিক নিয়ন্ত্রণ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (ট্রাফিক)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// 14. Police Telecom
addDepartment('police-telecom', 'পুলিশ টেলিকমিউনিকেশন',
  'police-hq', 'পুলিশ বাহিনীর যোগাযোগ ব্যবস্থা ও তথ্য প্রযুক্তি অবকাঠামো তদারকি ও রক্ষণাবেক্ষণ করে।', 'গ্রেড-২', [
  { desig: 'ডিআইজি (পুলিশ টেলিকম)', grade: 'গ্রেড-৩', equiv: 'ডিআইজি', resp: 'পুলিশ টেলিকমের প্রধান', qual: 'স্নাতক ডিগ্রি (ইইই/সিএসই); ন্যূনতম ২০ বছর অভিজ্ঞতা', appt: 'পদোন্নতির মাধ্যমে' },
  { desig: 'পুলিশ সুপার (টেলিকম)', grade: 'গ্রেড-৪', resp: 'টেলিকম শাখা পরিচালনা' },
  { desig: 'টেলিকম ইঞ্জিনিয়ার', grade: 'গ্রেড-৫', resp: 'যোগাযোগ প্রযুক্তি রক্ষণাবেক্ষণ' },
  { desig: 'সহকারী ইঞ্জিনিয়ার', grade: 'গ্রেড-৬', resp: 'প্রযুক্তিগত সহায়তা' },
  { desig: 'টেকনিশিয়ান', grade: 'গ্রেড-৭', resp: 'প্রযুক্তিগত রক্ষণাবেক্ষণ' },
  { desig: 'প্রশাসনিক কর্মকর্তা (টেলিকম)', grade: 'গ্রেড-৬', resp: 'প্রশাসনিক ব্যবস্থাপনা' },
]);

// ====================================================================
// REGENERATE subordinate_position_ids
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

console.log('\n=== PHASE 3 COMPLETE ===');
console.log(`Offices: ${offices.length}`);
console.log(`Positions: ${positions.length}`);
