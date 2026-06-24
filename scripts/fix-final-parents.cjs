const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

const posMap = {};
positions.forEach(p => { posMap[p.id] = p; });

const getByOffice = (oid) => positions.filter(p => p.office_id === oid);

let fixed = 0;

// Fix info-btv:  অতিরিক্ত মহাপরিচালক (প্রযোজনা) -> মহাপরিচালক (বাংলাদেশ টেলিভিশন)
const btvOffice = getByOffice('info-btv');
const btvDG = btvOffice.find(p => p.designation_bn.includes('মহাপরিচালক') && !p.designation_bn.includes('অতিরিক্ত'));
const btvAdd = btvOffice.find(p => p.designation_bn.includes('অতিরিক্ত'));
if (btvAdd && btvDG && !btvAdd.parent_position_id) {
  btvAdd.parent_position_id = btvDG.id;
  fixed++;
}

// Fix mochta: যুগ্মসচিব -> সচিব
const mochtaOffice = getByOffice('mochta');
const mochtaSec = mochtaOffice.find(p => p.designation_bn.includes('সচিব') && !p.designation_bn.includes('যুগ্ম'));
const mochtaJS = mochtaOffice.find(p => p.designation_bn.includes('যুগ্মসচিব'));
if (mochtaJS && mochtaSec && !mochtaJS.parent_position_id) {
  mochtaJS.parent_position_id = mochtaSec.id;
  fixed++;
}

// Fix all education boards: সচিব -> চেয়ারম্যান
const boardOffices = ['board-dhaka','board-rajshahi','board-cumilla','board-jessore','board-chittagong','board-barishal','board-sylhet','board-dinajpur','board-mymensingh','board-technical','board-madrasah'];
boardOffices.forEach(oid => {
  const off = getByOffice(oid);
  const chair = off.find(p => p.designation_bn.includes('চেয়ারম্যান'));
  const sec = off.find(p => p.designation_bn.includes('সচিব'));
  if (sec && chair && !sec.parent_position_id) {
    sec.parent_position_id = chair.id;
    fixed++;
  }
});

// Fix min-finance: সহকারী সচিব (শাখা) -> অর্থমন্ত্রী
const minFin = getByOffice('min-finance');
const finMin = minFin.find(p => p.designation_bn.includes('অর্থমন্ত্রী'));
minFin.forEach(p => {
  if (p.designation_bn.includes('সহকারী সচিব') && !p.parent_position_id && finMin) {
    p.parent_position_id = finMin.id;
    fixed++;
  }
});

// Regenerate subordinate_position_ids
positions.forEach(p => { p.subordinate_position_ids = []; });
positions.forEach(p => {
  if (p.parent_position_id) {
    const parent = posMap[p.parent_position_id];
    if (parent && !parent.subordinate_position_ids.includes(p.id)) {
      parent.subordinate_position_ids.push(p.id);
    }
  }
});

fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');

console.log(`Fixed ${fixed} more parent_position_ids`);
console.log(`Total with parent: ${positions.filter(p => p.parent_position_id).length}`);
console.log(`Total without parent: ${positions.filter(p => !p.parent_position_id).length}`);
