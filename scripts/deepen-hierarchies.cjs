const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

let maxNum = 0;
positions.forEach(p => {
  const m = p.id.match(/p-(\d+)/);
  if (m) maxNum = Math.max(maxNum, parseInt(m[1]));
});
let nextPosId = maxNum + 1;
function genPosId() { return 'p-' + (nextPosId++); }

function makePos(officeId, desig, grade, parentId, qual, appt, resp) {
  return {
    id: genPosId(), office_id: officeId, designation_bn: desig, pay_grade_bn: grade,
    parent_position_id: parentId || null, subordinate_position_ids: [],
    equivalent_rank_bn: '', official_salutation_bn: '', appointing_authority_bn: '',
    public_service_usecase_bn: resp || '', career_progression_bn: resp || '',
    responsibilities_bn: resp || '', qualifications_bn: qual || '', appointment_process_bn: appt || '',
  };
}

function getPositions(officeId) {
  return positions.filter(p => p.office_id === officeId).sort((a,b) => {
    const g = {'গ্রেড-১':1,'গ্রেড-২':2,'গ্রেড-৩':3,'গ্রেড-৪':4,'গ্রেড-৫':5,'গ্রেড-৬':6,'গ্রেড-৭':7,'গ্রেড-৮':8,'গ্রেড-৯':9,'গ্রেড-১০':10,'গ্রেড-১১':11,'গ্রেড-১২':12,'গ্রেড-১৩':13,'গ্রেড-১৪':14};
    const ag = g[a.pay_grade_bn] || g[a.pay_grade_bn.replace('গ্রেড ','গ্রেড-')] || 99;
    const bg = g[b.pay_grade_bn] || g[b.pay_grade_bn.replace('গ্রেড ','গ্রেড-')] || 99;
    return ag - bg;
  });
}

let added = 0;

// Standard additions for 3-position offices
const additions3 = {
  // Ministry pattern: has সচিব
  ministry: [
    {desig:'উপসচিব (প্রশাসন)', grade:'গ্রেড-৪', resp:'প্রশাসনিক কাজ তদারকি'},
    {desig:'সহকারী সচিব', grade:'গ্রেড-৬', resp:'শাখার কার্যক্রম বাস্তবায়ন'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Directorate pattern: has মহাপরিচালক
  directorate: [
    {desig:'উপ-পরিচালক', grade:'গ্রেড-৫', resp:'বিভাগীয় কার্যক্রম বাস্তবায়ন'},
    {desig:'সহকারী পরিচালক', grade:'গ্রেড-৭', resp:'ক্ষেত্র কার্যক্রম তদারকি'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Board pattern (BRTA, BRTC, BTRC): has চেয়ারম্যান
  board: [
    {desig:'পরিচালক (প্রশাসন)', grade:'গ্রেড-৪', resp:'প্রশাসনিক কাজ তদারকি'},
    {desig:'উপ-পরিচালক', grade:'গ্রেড-৫', resp:'সাংগঠনিক কার্যক্রম'},
    {desig:'সহকারী পরিচালক', grade:'গ্রেড-৭', resp:'সাধারণ দায়িত্ব'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Port/Authority pattern (CPA, CAAB): has চেয়ারম্যান + প্রকৌশলী
  authority: [
    {desig:'উপ-পরিচালক', grade:'গ্রেড-৫', resp:'সাংগঠনিক কার্যক্রম'},
    {desig:'সহকারী পরিচালক', grade:'গ্রেড-৭', resp:'ক্ষেত্র তদারকি'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Judiciary pattern
  judiciary: [
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'আদালত ব্যবস্থাপনা'},
    {desig:'বেন্চ সহায়ক', grade:'গ্রেড-১০', resp:'আদালতের কার্যক্রমে সহায়তা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Islamic Foundation specific
  islamic: [
    {desig:'উপ-পরিচালক (দাওয়া)', grade:'গ্রেড-৫', resp:'দাওয়া কার্যক্রম'},
    {desig:'সহকারী পরিচালক', grade:'গ্রেড-৭', resp:'ক্ষেত্র কার্যক্রম'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // Corporation (BRTC has ম্যানেজিং ডিরেক্টর)
  corporation: [
    {desig:'উপ-জেনারেল ম্যানেজার', grade:'গ্রেড-৫', resp:'পরিচালনাগত কাজ'},
    {desig:'সহকারী জেনারেল ম্যানেজার', grade:'গ্রেড-৭', resp:'ক্ষেত্র তদারকি'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
  // BMET specific
  bmet: [
    {desig:'উপ-পরিচালক (প্রশিক্ষণ)', grade:'গ্রেড-৫', resp:'প্রশিক্ষণ কার্যক্রম'},
    {desig:'সহকারী পরিচালক (কর্মসংস্থান)', grade:'গ্রেড-৭', resp:'কর্মসংস্থান সেবা'},
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
};

function detectType(existing) {
  const desigs = existing.map(p => p.designation_bn).join(' ');
  const officeId = existing[0].office_id;
  if (officeId === 'islamic-foundation') return 'islamic';
  if (officeId === 'expatriate-bmet') return 'bmet';
  if (officeId.startsWith('judiciary-')) return 'judiciary';
  if (desigs.includes('মহাপরিচালক')) return 'directorate';
  if (desigs.includes('ম্যানেজিং ডিরেক্টর') || desigs.includes('জেনারেল ম্যানেজার')) return 'corporation';
  if (desigs.includes('চেয়ারম্যান') || desigs.includes('চেয়ারম্যান')) {
    if (desigs.includes('প্রকৌশলী') || officeId.includes('port') || officeId.includes('caab')) return 'authority';
    return 'board';
  }
  if (desigs.includes('সচিব') && !desigs.includes('মহাপরিচালক')) return 'ministry';
  if (desigs.includes('ডাক') || desigs.includes('পোস্ট')) return 'directorate';
  if (desigs.includes('পরিদর্শক') || desigs.includes('শ্রম')) return 'directorate';
  return 'directorate'; // default
}

// === Process 3-position offices ===
const threePosOffices = [
  'min-religion','islamic-foundation','labour-dol','road-brta','road-brtc',
  'shipping-cpa','aviation-caab','lgrd-dlg','land-survey','environment-doe',
  'environment-bfd','posts-bangladesh-post','posts-btrc','expatriate-bmet',
  'judiciary-registrar','judiciary-magistrate'
];

threePosOffices.forEach(id => {
  const existing = getPositions(id);
  if (existing.length !== 3) return;
  const type = detectType(existing);
  const pattern = additions3[type] || additions3.directorate;
  
  // Find the last existing position as parent for the first new position
  const last = existing[existing.length - 1];
  if (!last) return;
  
  const newPositions = [];
  let parent = last;
  
  pattern.forEach((item, idx) => {
    const existingSameDesig = existing.find(p => p.designation_bn === item.desig);
    if (existingSameDesig) return; // skip if already exists
    const pos = makePos(id, item.desig, item.grade, parent.id,
      '', '', item.resp);
    newPositions.push(pos);
    parent = pos;
  });
  
  if (newPositions.length > 0) {
    positions.push(...newPositions);
    // Fix the third existing position's parent if needed
    // In some offices (like min-religion), joint sec should report to addl sec, not directly to secretary
    // But we're adding below, not restructuring above
    added += newPositions.length;
  }
});

// === Additions for 4-position offices ===
const additions4 = {
  standard: [
    {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
    {desig:'সাঁটলিপিকার', grade:'গ্রেড-১০', resp:'সচিবালয় সহায়তা'},
    {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
  ],
};

const fourPosOffices = [
  'hajj-office','divisional-commissioner','uno-office','road-rhd','railway-br',
  'housing-pwd','water-bwdb','power-bpdb','road-bba','railway-brtm',
  'railway-west','railway-east','shipping-biwtc','shipping-df','shipping-dmi',
  'aviation-tourism','aviation-dtap','lgrd-lgd','lgrd-rd','lgrd-lgrc',
  'lgrd-rdrs','housing-arch','housing-urbandev','land-comm','land-record',
  'water-warpo','water-flood','legislature-whip','legislature-opposition',
  'legislature-committee','legislature-library','judiciary-supreme-court',
  'legislature-caucus','legislature-tv'
];

fourPosOffices.forEach(id => {
  const existing = getPositions(id);
  if (existing.length !== 4) return;
  const last = existing[existing.length - 1];
  if (!last) return;
  
  const newPositions = [];
  let parent = last;
  const officeFirst = existing[0];
  const type = detectType(existing);
  
  // Different additions based on type
  let pattern = additions4.standard;
  
  // Special handling for specific offices
  if (id === 'divisional-commissioner') {
    pattern = [
      {desig:'সিনিয়র সহকারী কমিশনার', grade:'গ্রেড-৬', resp:'ক্ষেত্র প্রশাসন'},
      {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
      {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
    ];
  } else if (id === 'uno-office') {
    pattern = [
      {desig:'সহকারী কমিশনার (ভূমি)', grade:'গ্রেড-৭', resp:'ভূমি ব্যবস্থাপনা'},
      {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
      {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
    ];
  } else if (id.startsWith('judiciary-') || id.startsWith('legislature-')) {
    pattern = [
      {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
      {desig:'কম্পিউটার অপারেটর', grade:'গ্রেড-১০', resp:'ডাটা প্রক্রিয়াকরণ'},
      {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
    ];
  } else if (type === 'directorate' || type === 'authority' || type === 'board') {
    pattern = [
      {desig:'সহকারী পরিচালক', grade:'গ্রেড-৭', resp:'ক্ষেত্র তদারকি'},
      {desig:'প্রশাসনিক কর্মকর্তা', grade:'গ্রেড-৮', resp:'অফিস ব্যবস্থাপনা'},
      {desig:'অফিস সহায়ক', grade:'গ্রেড-১৪', resp:'সাধারণ অফিস সহায়তা'},
    ];
  }
  
  pattern.forEach(item => {
    const existingSameDesig = existing.find(p => p.designation_bn === item.desig);
    if (existingSameDesig) return;
    const pos = makePos(id, item.desig, item.grade, parent.id, '', '', item.resp);
    newPositions.push(pos);
    parent = pos;
  });
  
  if (newPositions.length > 0) {
    positions.push(...newPositions);
    added += newPositions.length;
  }
});

fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');
console.log('Deepening complete: added ' + added + ' positions');
console.log('Total positions: ' + positions.length);
