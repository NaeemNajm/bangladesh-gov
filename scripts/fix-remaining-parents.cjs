const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const positions = JSON.parse(fs.readFileSync(path.join(DATA, 'positions.json'), 'utf8'));

// Make a lookup
const posMap = {};
positions.forEach(p => { posMap[p.id] = p; });

const getByOffice = (officeId) => positions.filter(p => p.office_id === officeId);
const getByDesignation = (officeId, desig) =>
  getByOffice(officeId).filter(p => p.designation_bn.includes(desig));

let fixed = 0;
let addedSub = 0;

function setParent(childPos, parentDesignationKeyword) {
  if (childPos.parent_position_id) return false;
  const parent = getByOffice(childPos.office_id)
    .filter(p => p.designation_bn.includes(parentDesignationKeyword) && p.id !== childPos.id)
    .sort((a, b) => {
      // Prefer the one with a higher pay grade (more senior)
      const gradeOrder = { 'গ্রেড ১':1,'গ্রেড ২':2,'গ্রেড ৩':3,'গ্রেড ৪':4,'গ্রেড ৫':5,'গ্রেড ৬':6,'গ্রেড ৭':7,'গ্রেড ৮':8,'গ্রেড ৯':9,'গ্রেড ১০':10,'গ্রেড ১১':11,'গ্রেড ১২':12,'গ্রেড ১৩':13,'গ্রেড ১৪':14,'গ্রেড ১৫':15,'গ্রেড ১৬':16 };
      return (gradeOrder[a.pay_grade_bn] || 99) - (gradeOrder[b.pay_grade_bn] || 99);
    })[0];
  if (parent) {
    childPos.parent_position_id = parent.id;
    fixed++;
    return true;
  }
  return false;
}

// === FIXES ===

// 1. hajj-office: পরিচালক -> মহাপরিচালক
const hajjDir = getByOffice('hajj-office').find(p => p.designation_bn === 'পরিচালক');
const hajjDG = getByOffice('hajj-office').find(p => p.designation_bn.includes('মহাপরিচালক'));
if (hajjDir && hajjDG && !hajjDir.parent_position_id) {
  hajjDir.parent_position_id = hajjDG.id;
  fixed++;
}

// 2. judiciary-registrar: অতিরিক্ত রেজিস্ট্রার -> রেজিস্ট্রার, সহকারী রেজিস্ট্রার -> অতিরিক্ত রেজিস্ট্রার
const reg = getByOffice('judiciary-registrar').find(p => p.designation_bn.includes('রেজিস্ট্রার') && p.designation_bn.includes('সুপ্রিম'));
const addReg = getByOffice('judiciary-registrar').find(p => p.designation_bn.includes('অতিরিক্ত রেজিস্ট্রার'));
const asstReg = getByOffice('judiciary-registrar').find(p => p.designation_bn.includes('সহকারী রেজিস্ট্রার'));
if (addReg && reg && !addReg.parent_position_id) { addReg.parent_position_id = reg.id; fixed++; }
if (asstReg && addReg && !asstReg.parent_position_id) { asstReg.parent_position_id = addReg.id; fixed++; }

// 3. legislature-chief-whip: ডেপুটি হুইপ -> চিফ হুইপ
const cw = getByOffice('legislature-chief-whip').find(p => p.designation_bn.includes('চিফ হুইপ'));
const dw = getByOffice('legislature-chief-whip').find(p => p.designation_bn.includes('ডেপুটি হুইপ'));
if (dw && cw && !dw.parent_position_id) { dw.parent_position_id = cw.id; fixed++; }

// 4. ec-field-office: জেলা নির্বাচন কর্মকর্তা -> আঞ্চলিক নির্বাচন কর্মকর্তা
const regEC = getByOffice('ec-field-office').find(p => p.designation_bn.includes('আঞ্চলিক'));
const distEC = getByOffice('ec-field-office').find(p => p.designation_bn.includes('জেলা') && p.designation_bn.includes('নির্বাচন'));
if (distEC && regEC && !distEC.parent_position_id) { distEC.parent_position_id = regEC.id; fixed++; }

// 5. bida: পরিচালক (বিনিয়োগ) -> CEO
const bidaCEO = getByOffice('bida').find(p => p.designation_bn.includes('CEO'));
const bidaDir = getByOffice('bida').find(p => p.designation_bn.includes('পরিচালক'));
if (bidaDir && bidaCEO && !bidaDir.parent_position_id) { bidaDir.parent_position_id = bidaCEO.id; fixed++; }

// 6. beza: পরিচালক (অর্থনৈতিক অঞ্চল) -> CEO
const bezaCEO = getByOffice('beza').find(p => p.designation_bn.includes('CEO'));
const bezaDir = getByOffice('beza').find(p => p.designation_bn.includes('পরিচালক'));
if (bezaDir && bezaCEO && !bezaDir.parent_position_id) { bezaDir.parent_position_id = bezaCEO.id; fixed++; }

// 7. info-films: পরিচালক -> মহাপরিচালক (if same office has one, otherwise leave as head)
// info-films only has তথ্য সচিব as higher but that's a different office

// 8. primary-bnfe: পরিচালক -> head
// Only one position, leave as top

// 9. health-dme: পরিচালক -> head
// Only one position, leave as top

// 10. health-iedcr: পরিচালক (IEDCR) - this office only has this one position, leave as head

// 11. mochta-ctg-dev-board: প্রকল্প পরিচালক - only one position, leave as head

// 12. disaster-cdr: প্রকল্প পরিচালক (CPP) - only one position, leave as head

// 13. ict-hitech: মুখ্য নির্বাহী কর্মকর্তা - only one, leave as head

// 14. uno-office: UNO - only one position
// UNO reports to DC but DC is a different office

// For positions that are the sole position in their office, they should remain as heads

// Now let's also fix the 4-level office hierarchies we missed
// Many offices have: মহাপরিচালক, অতিরিক্ত মহাপরিচালক, পরিচালক, উপ-পরিচালক
// Our script mapped পরিচালক -> মহাপরিচালক but the correct hierarchy is:
// মহাপরিচালক (top), অতিরিক্ত মহাপরিচালক -> মহাপরিচালক, পরিচালক -> অতিরিক্ত মহাপরিচালক, উপ-পরিচালক -> পরিচালক
const fourLevelOfficeIds = [
  'road-bba', 'railway-brtm', 'railway-west', 'railway-east',
  'shipping-biwtc', 'shipping-df', 'shipping-dmi',
  'aviation-tourism', 'aviation-dtap',
  'lgrd-lgd', 'lgrd-rd', 'lgrd-lgrc', 'lgrd-rdrs',
  'housing-arch', 'housing-urbandev',
  'land-comm', 'land-record',
  'water-warpo', 'water-flood',
  // Also some legislative ones that have the same structure
  'legislature-whip', 'legislature-opposition', 'legislature-committee',
  'legislature-library', 'legislature-caucus', 'legislature-tv',
  'judiciary-supreme-court',
  'judiciary-family', 'judiciary-labour',
  'judiciary-district-judge',
];

fourLevelOfficeIds.forEach(oid => {
  const positions_in_office = getByOffice(oid);
  const dg = positions_in_office.find(p => p.designation_bn === 'মহাপরিচালক');
  const addDg = positions_in_office.find(p => p.designation_bn === 'অতিরিক্ত মহাপরিচালক');
  const dir = positions_in_office.find(p => p.designation_bn === 'পরিচালক');
  const dd = positions_in_office.find(p => p.designation_bn === 'উপ-পরিচালক');

  // Fix hierarchy chain: DG -> AddDG -> Director -> DD
  if (addDg && dg && !addDg.parent_position_id) {
    addDg.parent_position_id = dg.id;
    fixed++;
  }
  if (dir && addDg && !dir.parent_position_id) {
    dir.parent_position_id = addDg.id;
    fixed++;
  }
  if (dd && dir && !dd.parent_position_id) {
    dd.parent_position_id = dir.id;
    fixed++;
  }
  // Alternative: if no AddDG, Director reports to DG
  if (dir && !addDg && dg && !dir.parent_position_id) {
    dir.parent_position_id = dg.id;
    fixed++;
  }
  if (dd && !dir && addDg && !dd.parent_position_id) {
    dd.parent_position_id = addDg.id;
    fixed++;
  }
});

// For min-finance: the 8 সহকারী সচিব positions should report to a parent
// Since they're in a ministry, the hierarchy would be:
// সহকারী সচিব -> সিনিয়র সহকারী সচিব -> উপসচিব -> যুগ্ম সচিব -> অতিরিক্ত সচিব -> সচিব
// But min-finance only has: অর্থমন্ত্রী and সহকারী সচিব (শাখা-1 through 8)
// In a real ministry, সহকারী সচিব reports to উপসচিব. Since no উপসচিব exists in this office,
// they likely report to the head (সচিব or মন্ত্রী). But we'll leave them since the hierarchy
// within ministries is complex and crosses between ministry-level and directorate-level.

// legislature-secretariat: similar issue - the chain is সচিব -> যুগ্মসচিব -> উপসচিব -> সিনিয়র সহকারী সচিব -> সহকারী সচিব
// These positions are already captured in the hierarchy map but the parent matching failed
// because the designations include contextual info like '(সংসদ)'
// Let me fix these manually
const lsPositions = getByOffice('legislature-secretariat');
const lsSec = lsPositions.find(p => p.designation_bn.includes('সংসদ সচিব'));
const lsJS = lsPositions.find(p => p.designation_bn.includes('যুগ্মসচিব') || p.designation_bn.includes('যুগ্ম সচিব'));
const lsDS = lsPositions.find(p => p.designation_bn.includes('উপসচিব'));
const lsSAS = lsPositions.find(p => p.designation_bn.includes('সিনিয়র সহকারী সচিব'));
const lsAS = lsPositions.find(p => p.designation_bn.includes('সহকারী সচিব') && !p.designation_bn.includes('সিনিয়র'));

if (lsJS && lsSec && !lsJS.parent_position_id) { lsJS.parent_position_id = lsSec.id; fixed++; }
if (lsDS && lsJS && !lsDS.parent_position_id) { lsDS.parent_position_id = lsJS.id; fixed++; }
if (lsSAS && lsDS && !lsSAS.parent_position_id) { lsSAS.parent_position_id = lsDS.id; fixed++; }
if (lsAS && lsSAS && !lsAS.parent_position_id) { lsAS.parent_position_id = lsSAS.id; fixed++; }

// judiciary-magistrate: চীফ জুডিসিয়াল ম্যাজিস্ট্রেট (top), সিনিয়র -> চীফ, জুডিসিয়াল -> সিনিয়র
const cm = getByOffice('judiciary-magistrate').find(p => p.designation_bn.includes('চীফ'));
const sm = getByOffice('judiciary-magistrate').find(p => p.designation_bn.includes('সিনিয়র'));
const jm = getByOffice('judiciary-magistrate').find(p => p.designation_bn === 'জুডিসিয়াল ম্যাজিস্ট্রেট');
if (sm && cm && !sm.parent_position_id) { sm.parent_position_id = cm.id; fixed++; }
if (jm && sm && !jm.parent_position_id) { jm.parent_position_id = sm.id; fixed++; }

// Regenerate subordinate_position_ids
positions.forEach(p => { p.subordinate_position_ids = []; });
positions.forEach(p => {
  if (p.parent_position_id) {
    const parent = posMap[p.parent_position_id];
    if (parent) {
      if (!parent.subordinate_position_ids.includes(p.id)) {
        parent.subordinate_position_ids.push(p.id);
        addedSub++;
      }
    }
  }
});

fs.writeFileSync(path.join(DATA, 'positions.json'), JSON.stringify(positions, null, 2), 'utf8');

console.log(`Fixed ${fixed} parent_position_ids`);
console.log(`Added ${addedSub} subordinate references`);
console.log(`Total positions: ${positions.length}`);
console.log(`With parent: ${positions.filter(p => p.parent_position_id).length}`);
console.log(`With subordinates: ${positions.filter(p => p.subordinate_position_ids.length > 0).length}`);

// Show remaining without parent
const noParent = positions.filter(p => !p.parent_position_id);
console.log(`\nRemaining without parent (${noParent.length}):`);
noParent.forEach(p => console.log(`  ${p.office_id}: ${p.designation_bn} [${p.pay_grade_bn}]`));
