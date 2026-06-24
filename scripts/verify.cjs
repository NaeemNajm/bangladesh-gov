const fs = require('fs');
const path = require('path');

const offices = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'offices.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'positions.json'), 'utf8'));

console.log(`Offices: ${offices.length}`);
console.log(`Positions: ${positions.length}`);

const noParent = positions.filter(p => !p.parent_position_id);
console.log(`No parent_position_id: ${noParent.length}`);
noParent.forEach(p => console.log(`  - ${p.office_id}: ${p.designation_bn}`));

const officeIds = new Set(offices.map(o => o.id));
const orphanIds = new Set();
positions.forEach(p => {
  if (!officeIds.has(p.office_id)) {
    orphanIds.add(p.office_id);
  }
});
if (orphanIds.size > 0) {
  console.log(`Positions with invalid office_id: ${[...orphanIds].join(', ')}`);
} else {
  console.log('All office_ids are valid.');
}

const posIds = new Set(positions.map(p => p.id));
let badParent = 0;
positions.forEach(p => {
  if (p.parent_position_id && !posIds.has(p.parent_position_id)) {
    badParent++;
    if (badParent <= 5) console.log(`  Bad parent: ${p.id} -> ${p.parent_position_id}`);
  }
});
console.log(`Bad parent_position_id refs: ${badParent}`);

// Check subordinate_position_ids
let badSub = 0;
positions.forEach(p => {
  if (!Array.isArray(p.subordinate_position_ids)) badSub++;
  else {
    p.subordinate_position_ids.forEach(sid => {
      if (!posIds.has(sid)) { badSub++; if (badSub <= 5) console.log(`  Bad sub: ${p.id} -> ${sid}`); }
    });
  }
});
console.log(`Bad subordinate_position_ids refs: ${badSub}`);

// New offices
['min-public-admin', 'bpatc', 'govt-employee-hospital'].forEach(id => {
  const off = offices.find(o => o.id === id);
  if (off) {
    const cnt = positions.filter(p => p.office_id === id).length;
    console.log(`${id}: ${off.name_bn} (${cnt} positions)`);
  } else {
    console.log(`${id}: MISSING!`);
  }
});
