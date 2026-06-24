const fs = require('fs');
const path = require('path');

const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'positions.json'), 'utf-8'));
const existingIds = new Set(existing.map(p => p.id));

let pid = 2000;

function pos(officeId, designation, payGrade, parentId, equiv, salutation, appointing, usecase, progression, resp) {
  pid++;
  const id = `pos-${pid}`;
  if (existingIds.has(id)) { pid++; return null; }
  return {
    id, office_id: officeId, designation_bn: designation, pay_grade_bn: payGrade,
    parent_position_id: parentId || null, equivalent_rank_bn: equiv || '',
    official_salutation_bn: salutation || `${designation}-এর দপ্তর`,
    appointing_authority_bn: appointing || '', public_service_usecase_bn: usecase || '',
    career_progression_bn: progression || '', responsibilities_bn: resp || ''
  };
}

const batch = [];

// Helper: add multiple hierarchical positions for an office
function addHierarchy(officeId, bossDesig, bossGrade, dirs) {
  const boss = pos(officeId, bossDesig, bossGrade, null, '', '', '', '', '', '');
  if (boss) batch.push(boss);
  if (!dirs || !boss) return;
  dirs.forEach((d, i) => {
    const p = pos(officeId, d.desig, d.grade, boss.id, d.equiv||'', d.sal||'', d.appointing||'', d.usecase||'', d.prog||'', d.resp||'');
    if (p) batch.push(p);
  });
}

// ======== FILL ALL MISSION OFFICES WITH NO POSITIONS ========

// min-religion
addHierarchy('min-religion', 'ধর্ম বিষয়ক সচিব', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত সচিব (ধর্ম)', grade: 'গ্রেড-২' },
  { desig: 'যুগ্ম সচিব (হজ্জ)', grade: 'গ্রেড-৩' },
]);

// min-home (existing police-hq, bgb, ansar, fire, passport — but not min-home itself)
addHierarchy('min-home', 'স্বরাষ্ট্র সচিব', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত সচিব (নিরাপত্তা)', grade: 'গ্রেড-২' },
  { desig: 'যুগ্ম সচিব (পুলিশ)', grade: 'গ্রেড-৩' },
]);

// commerce-btc
addHierarchy('commerce-btc', 'চেয়ারম্যান (BTC)', 'গ্রেড-২', [
  { desig: 'জেনারেল ম্যানেজার (বিপণন)', grade: 'গ্রেড-৪' },
]);

// industries-textile
addHierarchy('industries-textile', 'চেয়ারম্যান (BTMC)', 'গ্রেড-২', [
  { desig: 'জেনারেল ম্যানেজার (প্রশাসন)', grade: 'গ্রেড-৪' },
]);

// labour-dol
addHierarchy('labour-dol', 'মহাপরিচালক (শ্রম অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'শ্রম পরিদর্শক', grade: 'গ্রেড-৫' },
]);

// education-nu
addHierarchy('education-nu', 'উপাচার্য (জাতীয় বিশ্ববিদ্যালয়)', 'গ্রেড-২', [
  { desig: 'প্রো-উপাচার্য', grade: 'গ্রেড-৩' },
  { desig: 'রেজিস্ট্রার', grade: 'গ্রেড-৩' },
  { desig: 'পরীক্ষা নিয়ন্ত্রক', grade: 'গ্রেড-৪' },
]);
addHierarchy('education-ugc', 'চেয়ারম্যান (UGC)', 'গ্রেড-২', [
  { desig: 'সচিব (UGC)', grade: 'গ্রেড-২' },
  { desig: 'অধ্যাপক (UGC)', grade: 'গ্রেড-৩' },
]);

// health-iedcr
addHierarchy('health-iedcr', 'পরিচালক (IEDCR)', 'গ্রেড-২', [
  { desig: 'মুখ্য বৈজ্ঞানিক কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

// health-bsmmu
addHierarchy('health-bsmmu', 'উপাচার্য (BSMMU)', 'গ্রেড-২', [
  { desig: 'প্রো-উপাচার্য', grade: 'গ্রেড-৩' },
  { desig: 'রেজিস্ট্রার', grade: 'গ্রেড-৩' },
]);

// cultural-shilpakala
addHierarchy('cultural-shilpakala', 'সভাপতি (শিল্পকলা একাডেমি)', 'গ্রেড-২', [
  { desig: 'সচিব', grade: 'গ্রেড-৩' },
]);

// youth-nsc
addHierarchy('youth-nsc', 'সচিব (ক্রীড়া পরিষদ)', 'গ্রেড-২', [
  { desig: 'পরিচালক (প্রশিক্ষণ)', grade: 'গ্রেড-৪' },
]);

// ict-doit
addHierarchy('ict-doit', 'মহাপরিচালক (আইসিটি অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

// ict-hitech
addHierarchy('ict-hitech', 'মুখ্য নির্বাহী কর্মকর্তা (হাইটেক পার্ক)', 'গ্রেড-২', [
  { desig: 'জেনারেল ম্যানেজার', grade: 'গ্রেড-৪' },
]);

// road-rhd
addHierarchy('road-rhd', 'মহাপরিচালক (সড়ক ও জনপথ)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'প্রধান প্রকৌশলী', grade: 'গ্রেড-৩' },
  { desig: 'তত্ত্বাবধায়ক প্রকৌশলী', grade: 'গ্রেড-৪' },
]);

// road-brta
addHierarchy('road-brta', 'চেয়ারম্যান (BRTA)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত চেয়ারম্যান', grade: 'গ্রেড-৩' },
  { desig: 'পরিচালক (নিবন্ধন)', grade: 'গ্রেড-৪' },
]);
addHierarchy('road-brtc', 'চেয়ারম্যান (BRTC)', 'গ্রেড-২', [
  { desig: 'ম্যানেজিং ডিরেক্টর', grade: 'গ্রেড-২' },
  { desig: 'জেনারেল ম্যানেজার', grade: 'গ্রেড-৪' },
]);

// railway-br
addHierarchy('railway-br', 'মহাপরিচালক (বাংলাদেশ রেলওয়ে)', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত মহাপরিচালক (অপারেশন)', grade: 'গ্রেড-২' },
  { desig: 'চিফ ইঞ্জিনিয়ার', grade: 'গ্রেড-৩' },
  { desig: 'ডিভিশনাল রেলওয়ে ম্যানেজার (DRM)', grade: 'গ্রেড-৩' },
]);

// shipping-biwta
addHierarchy('shipping-biwta', 'চেয়ারম্যান (BIWTA)', 'গ্রেড-২', [
  { desig: 'মুখ্য প্রকৌশলী', grade: 'গ্রেড-৩' },
]);

addHierarchy('shipping-cpa', 'চেয়ারম্যান (চট্টগ্রাম বন্দর)', 'গ্রেড-১', [
  { desig: 'মুখ্য বন্দর কর্মকর্তা', grade: 'গ্রেড-২' },
  { desig: 'মুখ্য প্রকৌশলী', grade: 'গ্রেড-৩' },
]);

addHierarchy('shipping-mpa', 'চেয়ারম্যান (মোংলা বন্দর)', 'গ্রেড-২', [
  { desig: 'মুখ্য বন্দর কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

// aviation-caab
addHierarchy('aviation-caab', 'চেয়ারম্যান (CAAB)', 'গ্রেড-২', [
  { desig: 'মেম্বার (ফ্লাইট সেফটি)', grade: 'গ্রেড-৩' },
  { desig: 'পরিচালক (বিমানবন্দর)', grade: 'গ্রেড-৪' },
]);

addHierarchy('aviation-biman', 'ম্যানেজিং ডিরেক্টর ও সিইও (বিমান)', 'গ্রেড-২', [
  { desig: 'জিএম (ফ্লাইট অপারেশন)', grade: 'গ্রেড-৪' },
]);

// lgrd-dlg
addHierarchy('lgrd-dlg', 'মহাপরিচালক (স্থানীয় সরকার অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'উপ পরিচালক', grade: 'গ্রেড-৪' },
]);

addHierarchy('lgrd-rdc', 'মহাপরিচালক (পল্লী উন্নয়ন একাডেমি)', 'গ্রেড-২', [
  { desig: 'প্রশিক্ষক', grade: 'গ্রেড-৪' },
]);

// housing-pwd
addHierarchy('housing-pwd', 'মহাপরিচালক (গণপূর্ত অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'প্রধান প্রকৌশলী', grade: 'গ্রেড-৩' },
  { desig: 'তত্ত্বাবধায়ক প্রকৌশলী', grade: 'গ্রেড-৪' },
]);

addHierarchy('housing-nha', 'চেয়ারম্যান (জাতীয় গৃহায়ন কর্তৃপক্ষ)', 'গ্রেড-২', [
  { desig: 'প্রকল্প পরিচালক', grade: 'গ্রেড-৪' },
]);

// land-survey
addHierarchy('land-survey', 'মহাপরিচালক (সার্ভে অব বাংলাদেশ)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'প্রধান জরিপ কর্মকর্তা', grade: 'গ্রেড-৪' },
]);

addHierarchy('land-board', 'চেয়ারম্যান (ভূমি সংস্কার বোর্ড)', 'গ্রেড-২', [
  { desig: 'যুগ্ম সচিব', grade: 'গ্রেড-৩' },
]);

// water-bwdb
addHierarchy('water-bwdb', 'মহাপরিচালক (পানি উন্নয়ন বোর্ড)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'প্রধান প্রকৌশলী', grade: 'গ্রেড-৩' },
  { desig: 'তত্ত্বাবধায়ক প্রকৌশলী', grade: 'গ্রেড-৪' },
]);

addHierarchy('water-jrc', 'সচিব (যৌথ নদী কমিশন)', 'গ্রেড-২', [
  { desig: 'যুগ্ম সচিব', grade: 'গ্রেড-৩' },
]);

// defence-army
addHierarchy('defence-army', 'সেনাবাহিনী প্রধান (Chief of Army Staff)', 'গ্রেড-১', [
  { desig: 'প্রিন্সিপাল স্টাফ অফিসার (PSO)', grade: 'গ্রেড-২' },
  { desig: 'জেনারেল অফিসার কমান্ডিং (GOC)', grade: 'গ্রেড-২' },
]);

addHierarchy('defence-navy', 'নৌবাহিনী প্রধান (Chief of Naval Staff)', 'গ্রেড-১', [
  { desig: 'কমান্ডার (বিএন ফ্লিট)', grade: 'গ্রেড-২' },
]);

addHierarchy('defence-air', 'বিমান বাহিনী প্রধান (Chief of Air Staff)', 'গ্রেড-১', [
  { desig: 'এয়ার অফিসার কমান্ডিং (AOC)', grade: 'গ্রেড-২' },
]);

addHierarchy('defence-met', 'পরিচালক (আবহাওয়া অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'মুখ্য আবহাওয়াবিদ', grade: 'গ্রেড-৩' },
]);

addHierarchy('defence-dgfi', 'মহাপরিচালক (DGFI)', 'গ্রেড-১', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-২' },
]);

// foreign-un
addHierarchy('foreign-un', 'সচিব (জাতিসংঘ বিষয়ক বিভাগ)', 'গ্রেড-২', [
  { desig: 'যুগ্ম সচিব', grade: 'গ্রেড-৩' },
]);

addHierarchy('foreign-biman', 'স্থায়ী প্রতিনিধি (জাতিসংঘ)', 'গ্রেড-১', [
  { desig: 'উপ-স্থায়ী প্রতিনিধি', grade: 'গ্রেড-২' },
  { desig: 'মিনিস্টার (পলিটিক্যাল)', grade: 'গ্রেড-৩' },
]);

// law-legislative, law-judicial
addHierarchy('law-legislative', 'সচিব (আইন ও সংসদ বিষয়ক বিভাগ)', 'গ্রেড-১', [
  { desig: 'যুগ্ম সচিব (আইন)', grade: 'গ্রেড-৩' },
]);

addHierarchy('law-judicial', 'সচিব (বিচার বিভাগ)', 'গ্রেড-১', [
  { desig: 'যুগ্ম সচিব (বিচারক নিয়োগ)', grade: 'গ্রেড-৩' },
]);

addHierarchy('law-nr', 'নিবন্ধক জেনারেল', 'গ্রেড-২', [
  { desig: 'যুগ্ম নিবন্ধক', grade: 'গ্রেড-৪' },
]);

addHierarchy('law-opc', 'অ্যাটর্নি জেনারেল', 'সাংবিধানিক পদ', [
  { desig: 'অতিরিক্ত অ্যাটর্নি জেনারেল', grade: 'গ্রেড-২' },
  { desig: 'ডেপুটি অ্যাটর্নি জেনারেল', grade: 'গ্রেড-৩' },
]);

// agriculture-dae
addHierarchy('agriculture-dae', 'মহাপরিচালক (কৃষি সম্প্রসারণ)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'উপ পরিচালক', grade: 'গ্রেড-৪' },
]);

addHierarchy('agriculture-bari', 'মহাপরিচালক (BARI)', 'গ্রেড-২', [
  { desig: 'প্রধান বৈজ্ঞানিক কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

addHierarchy('agriculture-bri', 'মহাপরিচালক (BRRI)', 'গ্রেড-২', [
  { desig: 'প্রধান বৈজ্ঞানিক কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

// fisheries-dof
addHierarchy('fisheries-dof', 'মহাপরিচালক (মৎস্য অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

addHierarchy('fisheries-dls', 'মহাপরিচালক (প্রাণিসম্পদ অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

// environment-doe
addHierarchy('environment-doe', 'মহাপরিচালক (পরিবেশ অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'পরিচালক (দূষণ নিয়ন্ত্রণ)', grade: 'গ্রেড-৪' },
]);

addHierarchy('environment-bfd', 'মহাপরিচালক (বন অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'বন সংরক্ষক', grade: 'গ্রেড-৪' },
]);

// power-bpdb
addHierarchy('power-bpdb', 'চেয়ারম্যান (BPDB)', 'গ্রেড-১', [
  { desig: 'মেম্বার (জেনারেশন)', grade: 'গ্রেড-২' },
  { desig: 'মেম্বার (ট্রান্সমিশন)', grade: 'গ্রেড-২' },
  { desig: 'প্রধান প্রকৌশলী', grade: 'গ্রেড-৩' },
]);

addHierarchy('power-petrobangla', 'চেয়ারম্যান (পেট্রোবাংলা)', 'গ্রেড-১', [
  { desig: 'জিএম (এক্সপ্লোরেশন)', grade: 'গ্রেড-৩' },
]);

addHierarchy('power-reb', 'চেয়ারম্যান (REB)', 'গ্রেড-১', [
  { desig: 'মেম্বার (প্রশাসন)', grade: 'গ্রেড-২' },
]);
addHierarchy('power-sreda', 'মহাপরিচালক (SREDA)', 'গ্রেড-২', [
  { desig: 'প্রকল্প পরিচালক', grade: 'গ্রেড-৪' },
]);

// posts-bangladesh-post
addHierarchy('posts-bangladesh-post', 'মহাপরিচালক (ডাক বিভাগ)', 'গ্রেড-২', [
  { desig: 'পোস্টমাস্টার জেনারেল', grade: 'গ্রেড-৩' },
  { desig: 'উপ পোস্টমাস্টার জেনারেল', grade: 'গ্রেড-৪' },
]);

addHierarchy('posts-btrc', 'চেয়ারম্যান (BTRC)', 'গ্রেড-১', [
  { desig: 'ভাইস চেয়ারম্যান', grade: 'গ্রেড-২' },
  { desig: 'কমিশনার (লাইসেন্সিং)', grade: 'গ্রেড-৩' },
]);

// science-baec
addHierarchy('science-baec', 'চেয়ারম্যান (BAEC)', 'গ্রেড-১', [
  { desig: 'মেম্বার (ফিজিক্যাল সায়েন্স)', grade: 'গ্রেড-২' },
]);

addHierarchy('science-bcsir', 'চেয়ারম্যান (BCSIR)', 'গ্রেড-২', [
  { desig: 'মুখ্য বৈজ্ঞানিক কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

// expatriate-bmet
addHierarchy('expatriate-bmet', 'মহাপরিচালক (BMET)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
  { desig: 'পরিচালক (প্রশিক্ষণ)', grade: 'গ্রেড-৪' },
]);

// disaster-ddm
addHierarchy('disaster-ddm', 'মহাপরিচালক (দুর্যোগ ব্যবস্থাপনা)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

addHierarchy('disaster-cdr', 'প্রকল্প পরিচালক (CPP)', 'গ্রেড-৩', [
  { desig: 'উপ প্রকল্প পরিচালক', grade: 'গ্রেড-৪' },
]);

addHierarchy('disaster-relief', 'মহাপরিচালক (ত্রাণ অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

// liberation-museum
addHierarchy('liberation-museum', 'সভাপতি (মুক্তিযুদ্ধ জাদুঘর)', 'গ্রেড-২', [
  { desig: 'কিউরেটর', grade: 'গ্রেড-৪' },
]);

// textiles-dept
addHierarchy('textiles-dept', 'মহাপরিচালক (বস্ত্র অধিদপ্তর)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

addHierarchy('textiles-bjmc', 'চেয়ারম্যান (BJMC)', 'গ্রেড-২', [
  { desig: 'জিএম (প্রোডাকশন)', grade: 'গ্রেড-৪' },
]);
addHierarchy('textiles-bjri', 'মহাপরিচালক (BJRI)', 'গ্রেড-২', [
  { desig: 'প্রধান বৈজ্ঞানিক কর্মকর্তা', grade: 'গ্রেড-৩' },
]);

// info-pib
addHierarchy('info-pib', 'মহাপরিচালক (PIB)', 'গ্রেড-২', [
  { desig: 'প্রশিক্ষণ পরিচালক', grade: 'গ্রেড-৪' },
]);
addHierarchy('info-bp', 'চেয়ারম্যান (প্রেস কাউন্সিল)', 'গ্রেড-২', [
  { desig: 'সচিব', grade: 'গ্রেড-৩' },
]);

// home-coast
addHierarchy('home-coast', 'মহাপরিচালক (কোস্ট গার্ড)', 'গ্রেড-২', [
  { desig: 'অতিরিক্ত মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

// home-nsb
addHierarchy('home-nsb', 'মহাপরিচালক (NSI)', 'গ্রেড-২', [
  { desig: 'যুগ্ম মহাপরিচালক', grade: 'গ্রেড-৩' },
]);

// bd (root)
addHierarchy('bd', 'রাষ্ট্রপতি', 'সাংবিধানিক পদ', [
  { desig: 'সচিব (রাষ্ট্রপতির কার্যালয়)', grade: 'গ্রেড-১' },
]);

// ec-field-office (was missing deeper positions)
addHierarchy('ec-field-office', 'আঞ্চলিক নির্বাচন কর্মকর্তা', 'গ্রেড-৩', [
  { desig: 'জেলা নির্বাচন কর্মকর্তা', grade: 'গ্রেড-৪' },
  { desig: 'উপজেলা নির্বাচন কর্মকর্তা', grade: 'গ্রেড-৫' },
]);

// Filter out nulls and duplicates
const uniqueNew = batch.filter(p => p && !existingIds.has(p.id));

const merged = [...existing, ...uniqueNew];
const outPath = path.join(__dirname, '..', 'src', 'data', 'positions.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
console.log(`Written ${merged.length} positions to positions.json (${uniqueNew.length} new)`);
