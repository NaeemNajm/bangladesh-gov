const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const offices = JSON.parse(fs.readFileSync(path.join(DATA, 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

const rankMap = {
  'গ্রেড-১': 'সচিব', 'গ্রেড-২': 'অতিরিক্ত সচিব', 'গ্রেড-৩': 'যুগ্ম সচিব',
  'গ্রেড-৪': 'উপ সচিব', 'গ্রেড-৫': 'সিনিয়র সহকারী সচিব',
  'গ্রেড-৬': 'সহকারী সচিব', 'গ্রেড-৭': 'প্রশাসনিক কর্মকর্তা / সহকারী পরিচালক',
  'গ্রেড-৮': 'সিনিয়র সহকারী পরিচালক / সিনিয়র স্টাফ',
  'গ্রেড-৯': 'সহকারী পরিচালক', 'গ্রেড-১০': 'কর্মকর্তা',
  'গ্রেড-১১': 'জুনিয়র কর্মকর্তা', 'গ্রেড-১২': 'সাঁটলিপিকার / কম্পিউটার অপারেটর',
  'গ্রেড-১৩': 'অফিস সহায়ক', 'গ্রেড-১৪': 'সাধারণ কর্মচারী',
};

const salutationMap = {
  'গ্রেড-১': 'জনাব', 'গ্রেড-২': 'জনাব', 'গ্রেড-৩': 'জনাব',
  'গ্রেড-৪': 'জনাব', 'গ্রেড-৫': 'জনাব',
  'গ্রেড-৬': 'জনাব', 'গ্রেড-৭': 'জনাব',
  'গ্রেড-৮': 'জনাব', 'গ্রেড-৯': 'জনাব', 'গ্রেড-১০': 'জনাব',
  'গ্রেড-১১': 'জনাব', 'গ্রেড-১২': 'জনাব',
  'গ্রেড-১৩': 'জনাব', 'গ্রেড-১৪': 'জনাব',
};

const appointingAuthority = {
  'গ্রেড-১': 'মন্ত্রিপরিষদ বিভাগ', 'গ্রেড-২': 'মন্ত্রিপরিষদ বিভাগ',
  'গ্রেড-৩': 'জনপ্রশাসন মন্ত্রণালয়', 'গ্রেড-৪': 'জনপ্রশাসন মন্ত্রণালয়',
  'গ্রেড-৫': 'ঊর্ধ্বতন কর্তৃপক্ষ', 'গ্রেড-৬': 'ঊর্ধ্বতন কর্তৃপক্ষ',
  'গ্রেড-৭': 'অফিস প্রধান', 'গ্রেড-৮': 'অফিস প্রধান',
  'গ্রেড-৯': 'অফিস প্রধান', 'গ্রেড-১০': 'অফিস প্রধান',
  'গ্রেড-১১': 'অফিস প্রধান', 'গ্রেড-১২': 'অফিস প্রধান',
  'গ্রেড-১৩': 'অফিস প্রধান', 'গ্রেড-১৪': 'অফিস প্রধান',
};

function getSectorForUseCase(officeId, desig) {
  const o = offices.find(x => x.id === officeId);
  const name = o ? o.name_bn : '';
  const sector = name.includes('অর্থ') ? 'অর্থ ও বাজেট' :
    name.includes('শিক্ষা') ? 'শিক্ষা' :
    name.includes('স্বাস্থ্য') ? 'স্বাস্থ্য' :
    name.includes('প্রতিরক্ষা') ? 'প্রতিরক্ষা ও নিরাপত্তা' :
    name.includes('পুলিশ') || name.includes('আইন') ? 'আইন-শৃঙ্খলা ও বিচার' :
    name.includes('কৃষি') ? 'কৃষি ও খাদ্য' :
    name.includes('যোগাযোগ') || name.includes('সড়ক') ? 'যোগাযোগ ও অবকাঠামো' :
    name.includes('জ্বালানি') || name.includes('বিদ্যুৎ') ? 'জ্বালানি ও বিদ্যুৎ' :
    name.includes('পররাষ্ট্র') ? 'পররাষ্ট্র ও কূটনীতি' :
    name.includes('সমাজ') || name.includes('মহিলা') ? 'সমাজকল্যাণ' :
    name.includes('সংস্কৃতি') || name.includes('ক্রীড়া') || name.includes('ধর্ম') ? 'সংস্কৃতি, ক্রীড়া ও ধর্ম' :
    name.includes('পরিবেশ') ? 'পরিবেশ ও বন' :
    name.includes('ভূমি') ? 'ভূমি ও জরিপ' :
    name.includes('পরিকল্পনা') || name.includes('পরিসংখ্যান') ? 'পরিকল্পনা ও উন্নয়ন' :
    name.includes('বাণিজ্য') || name.includes('শিল্প') ? 'বাণিজ্য ও শিল্প' :
    name.includes('তথ্য') || name.includes('ডাক') ? 'তথ্য ও যোগাযোগ' :
    name.includes('শ্রম') ? 'শ্রম ও কর্মসংস্থান' :
    name.includes('স্থানীয়') ? 'স্থানীয় সরকার' :
    name.includes('গৃহায়ন') ? 'গৃহায়ন ও নগর উন্নয়ন' :
    name.includes('পানি') ? 'পানি সম্পদ' :
    name.includes('বিজ্ঞান') ? 'বিজ্ঞান ও প্রযুক্তি' :
    name.includes('নির্বাচন') ? 'নির্বাচন ব্যবস্থাপনা' :
    name.includes('মৎস্য') || name.includes('প্রাণিসম্পদ') ? 'মৎস্য ও প্রাণিসম্পদ' :
    name.includes('বস্ত্র') ? 'বস্ত্র ও পাট' :
    name.includes('বেসামরিক') ? 'প্রশাসন' :
    name.includes('বিমান') ? 'বিমান ও পর্যটন' :
    name.includes('নৌ') || name.includes('শিপিং') ? 'নৌ পরিবহন' :
    name.includes('রেল') ? 'রেল পরিবহন' :
    name.includes('মন্ত্রিপরিষদ') ? 'মন্ত্রিপরিষদ' :
    name.includes('আইন') ? 'আইন ও বিচার' :
    'প্রশাসন';
  
  if (desig.includes('সচিব') || desig.includes('পরিচালক') || desig.includes('প্রধান')) {
    return `${sector} সংক্রান্ত নীতি নির্ধারণ ও বাস্তবায়ন`;
  }
  if (desig.includes('সহকারী') || desig.includes('কর্মকর্তা')) {
    return `${sector} সংক্রান্ত কার্যক্রম বাস্তবায়ন`;
  }
  return `${sector} সংক্রান্ত সাধারণ দায়িত্ব পালন`;
}

const careerPaths = {
  'গ্রেড-১': 'গ্রেড-১ (সচিব) থেকে অবসর',
  'গ্রেড-২': 'গ্রেড-২ (অতিরিক্ত সচিব) থেকে গ্রেড-১ এ পদোন্নতি',
  'গ্রেড-৩': 'গ্রেড-৩ (যুগ্ম সচিব) থেকে গ্রেড-২/১ এ পদোন্নতি',
  'গ্রেড-৪': 'গ্রেড-৪ (উপ সচিব) থেকে গ্রেড-৩ এ পদোন্নতি',
  'গ্রেড-৫': 'গ্রেড-৫ থেকে গ্রেড-৪ এ পদোন্নতি',
  'গ্রেড-৬': 'গ্রেড-৬ থেকে গ্রেড-৫/৪ এ পদোন্নতি',
  'গ্রেড-৭': 'গ্রেড-৭ থেকে গ্রেড-৬/৫ এ পদোন্নতি',
  'গ্রেড-৮': 'গ্রেড-৮ থেকে গ্রেড-৭/৬ এ পদোন্নতি',
  'গ্রেড-৯': 'গ্রেড-৯ থেকে গ্রেড-৮/৭ এ পদোন্নতি',
  'গ্রেড-১০': 'গ্রেড-১০ থেকে গ্রেড-৯/৮ এ পদোন্নতি',
  'গ্রেড-১১': 'গ্রেড-১১ থেকে গ্রেড-১০/৯ এ পদোন্নতি',
  'গ্রেড-১২': 'গ্রেড-১২ থেকে গ্রেড-১১/১০ এ পদোন্নতি',
  'গ্রেড-১৩': 'গ্রেড-১৩ থেকে গ্রেড-১২/১১ এ পদোন্নতি',
  'গ্রেড-১৪': 'গ্রেড-১৪ থেকে গ্রেড-১৩/১২ এ পদোন্নতি',
};

let updated = 0;

positions.forEach(p => {
  const grade = p.pay_grade_bn;
  const o = offices.find(x => x.id === p.office_id);
  const officeName = o ? o.name_bn : '';
  
  // equivalent_rank_bn
  if (!p.equivalent_rank_bn || p.equivalent_rank_bn.trim() === '') {
    p.equivalent_rank_bn = rankMap[grade] || '';
  }
  
  // official_salutation_bn
  if (!p.official_salutation_bn || p.official_salutation_bn.trim() === '') {
    p.official_salutation_bn = salutationMap[grade] || 'জনাব';
  }
  
  // appointing_authority_bn
  if (!p.appointing_authority_bn || p.appointing_authority_bn.trim() === '') {
    if (p.designation_bn.includes('সচিব') || p.designation_bn.includes('চেয়ারম্যান') || p.designation_bn.includes('মহাপরিচালক')) {
      p.appointing_authority_bn = 'মন্ত্রিপরিষদ বিভাগ';
    } else if (p.designation_bn.includes('পরিচালক') || p.designation_bn.includes('অধ্যক্ষ') || p.designation_bn.includes('রেজিস্ট্রার')) {
      p.appointing_authority_bn = 'জনপ্রশাসন মন্ত্রণালয়';
    } else if (p.designation_bn.includes('প্রকৌশলী') || p.designation_bn.includes('ডাক্তার') || p.designation_bn.includes('শিক্ষক')) {
      p.appointing_authority_bn = 'ঊর্ধ্বতন কর্তৃপক্ষ';
    } else if (p.designation_bn.includes('সহকারী') || p.designation_bn.includes('সাঁটলিপিকার') || p.designation_bn.includes('কম্পিউটার')) {
      p.appointing_authority_bn = 'অফিস প্রধান';
    } else {
      p.appointing_authority_bn = 'ঊর্ধ্বতন কর্তৃপক্ষ';
    }
    // Also check ministry-specific
    if (officeName.includes('বিদ্যুৎ') || officeName.includes('জ্বালানি')) {
      if (p.designation_bn.includes('সচিব') || p.designation_bn.includes('চেয়ারম্যান')) {
        p.appointing_authority_bn = 'মন্ত্রিপরিষদ বিভাগ';
      }
    }
  }
  
  // public_service_usecase_bn
  if (!p.public_service_usecase_bn || p.public_service_usecase_bn.trim() === '') {
    p.public_service_usecase_bn = getSectorForUseCase(p.office_id, p.designation_bn);
  }
  
  // career_progression_bn
  if (!p.career_progression_bn || p.career_progression_bn.trim() === '') {
    p.career_progression_bn = careerPaths[grade] || '';
  }
  
  updated++;
});

fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');
console.log('Field enrichment complete. Updated ' + updated + ' positions.');
console.log('Total positions: ' + positions.length);
