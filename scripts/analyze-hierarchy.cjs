const fs = require("fs");
const positions = JSON.parse(fs.readFileSync("E:/CIVIC TECH/bangladesh-civic-structure/src/data/positions.json", "utf8"));
const offices = JSON.parse(fs.readFileSync("E:/CIVIC TECH/bangladesh-civic-structure/src/data/offices.json", "utf8"));

const posByOffice = {};
positions.forEach(p => {
  if (!posByOffice[p.office_id]) posByOffice[p.office_id] = [];
  posByOffice[p.office_id].push(p);
});

const officeMap = {};
offices.forEach(o => { officeMap[o.id] = o; });

const positionsMap = {};
positions.forEach(p => { positionsMap[p.id] = p; });

function calcWithinOfficeDepth(pos, officeId, visited) {
  if (visited.has(pos.id)) return 1;
  visited.add(pos.id);
  if (pos.parent_position_id && positionsMap[pos.parent_position_id]) {
    const parent = positionsMap[pos.parent_position_id];
    if (parent.office_id === officeId) {
      return 1 + calcWithinOfficeDepth(parent, officeId, visited);
    }
  }
  return 1;
}

const officeData = Object.keys(posByOffice).map(oid => {
  const ops = posByOffice[oid];
  let maxDepth = 0;
  ops.forEach(p => {
    const d = calcWithinOfficeDepth(p, oid, new Set());
    if (d > maxDepth) maxDepth = d;
  });
  return {
    id: oid,
    name: officeMap[oid] ? (officeMap[oid].name_bn || oid) : oid,
    posCount: ops.length,
    depth: maxDepth
  };
});

const vs = officeData.filter(d => d.posCount >= 1 && d.posCount <= 3);
const sh = officeData.filter(d => d.posCount >= 4 && d.posCount <= 6);
const ad = officeData.filter(d => d.posCount >= 7 && d.posCount <= 10);
const gd = officeData.filter(d => d.posCount >= 11 && d.posCount <= 15);
const vg = officeData.filter(d => d.posCount >= 16);

const d1 = officeData.filter(d => d.depth === 1);
const d23 = officeData.filter(d => d.depth >= 2 && d.depth <= 3);
const d45 = officeData.filter(d => d.depth >= 4 && d.depth <= 5);
const d6p = officeData.filter(d => d.depth >= 6);

const counts = officeData.map(d => d.posCount).sort((a,b) => a-b);
const total = counts.length;
const sum = counts.reduce((a,b) => a+b, 0);
const avg = sum / total;
let median;
if (total % 2 === 1) median = counts[Math.floor(total/2)];
else median = (counts[total/2 - 1] + counts[total/2]) / 2;
const under5 = counts.filter(c => c < 5).length;

const depths = officeData.map(d => d.depth);
const avgDepth = depths.reduce((a,b) => a+b, 0) / depths.length;

const sortedByCount = [...officeData].sort((a,b) => a.posCount - b.posCount);
const shallow10 = sortedByCount.slice(0, 10);
const sortedByCountDesc = [...officeData].sort((a,b) => b.posCount - a.posCount);
const deep10 = sortedByCountDesc.slice(0, 10);

console.log("=================================================================");
console.log("  BANGLADESH CIVIC STRUCTURE - POSITION HIERARCHY AUDIT REPORT");
console.log("=================================================================\n");
console.log("OVERVIEW");
console.log("  Total offices: " + total);
console.log("  Total positions: " + positions.length);
console.log("  Avg positions per office: " + avg.toFixed(2));
console.log("  Median positions per office: " + median);
console.log("  Avg hierarchy depth (within-office): " + avgDepth.toFixed(2) + "\n");

console.log("--- SECTION 1: POSITIONS PER OFFICE ---");
console.log("  Count  | Category             | Offices");
console.log("  -------|----------------------|--------");
console.log("   1-3   | Very shallow         | " + vs.length);
console.log("   4-6   | Shallow              | " + sh.length);
console.log("   7-10  | Adequate             | " + ad.length);
console.log("  11-15  | Good                 | " + gd.length);
console.log("  16+    | Very good            | " + vg.length + "\n");

console.log("--- SECTION 2: HIERARCHY DEPTH PER OFFICE ---");
console.log("  Depth  | Category                | Offices");
console.log("  -------|-------------------------|--------");
console.log("   1     | Single head, no chain   | " + d1.length);
console.log("   2-3   | Minimal chain           | " + d23.length);
console.log("   4-5   | Good chain              | " + d45.length);
console.log("   6+    | Full chain              | " + d6p.length + "\n");

const depthFreq = {};
depths.forEach(d => { depthFreq[d] = (depthFreq[d] || 0) + 1; });
console.log("  Depth frequency:");
Object.keys(depthFreq).sort((a,b) => parseInt(a)-parseInt(b)).forEach(k => {
  console.log("    Depth " + k + ": " + depthFreq[k] + " offices");
});
console.log("");

console.log("--- SECTION 3: 10 SHALLOWEST OFFICES ---");
console.log("  #  | Office ID             | Positions | Depth | Name");
console.log("  ---|-----------------------|-----------|-------|------------------");
shallow10.forEach((d, i) => {
  const num = (i+1).toString().padStart(2);
  console.log("  " + num + " | " + d.id.padEnd(22) + " | " + d.posCount.toString().padStart(9) + " | " + d.depth.toString().padStart(5) + " | " + d.name);
});
console.log("");

console.log("--- SECTION 4: 10 DEEPEST OFFICES ---");
console.log("  #  | Office ID             | Positions | Depth | Name");
console.log("  ---|-----------------------|-----------|-------|------------------");
deep10.forEach((d, i) => {
  const num = (i+1).toString().padStart(2);
  console.log("  " + num + " | " + d.id.padEnd(22) + " | " + d.posCount.toString().padStart(9) + " | " + d.depth.toString().padStart(5) + " | " + d.name);
});
console.log("");

console.log("--- SECTION 5: OFFICES FLAGGED FOR IMPROVEMENT (< 5 pos) ---");
console.log("  Total: " + under5 + " offices\n");
const flagged = officeData.filter(d => d.posCount < 5).sort((a,b) => a.posCount - b.posCount);
const flagFreq = {};
flagged.forEach(d => { flagFreq[d.posCount] = (flagFreq[d.posCount] || 0) + 1; });
Object.keys(flagFreq).sort((a,b) => parseInt(a)-parseInt(b)).forEach(k => {
  console.log("    " + k + " positions: " + flagFreq[k] + " offices");
});
console.log("");
flagged.forEach(d => {
  console.log("    " + d.id + " (" + d.name + "): " + d.posCount + " pos, depth " + d.depth);
});
console.log("");

console.log("--- SECTION 6: CROSS-OFFICE REFERENCES ---");
let crossOffice = 0;
let sameOffice = 0;
const crossRefs = {};
positions.forEach(p => {
  if (p.parent_position_id && positionsMap[p.parent_position_id]) {
    const parent = positionsMap[p.parent_position_id];
    if (parent.office_id !== p.office_id) {
      crossOffice++;
      const key = p.office_id + " -> " + parent.office_id;
      crossRefs[key] = (crossRefs[key] || 0) + 1;
    } else {
      sameOffice++;
    }
  }
});
console.log("  Cross-office refs: " + crossOffice + " / " + (crossOffice + sameOffice) + " total\n");
const sortedCross = Object.keys(crossRefs).sort((a,b) => crossRefs[b] - crossRefs[a]);
console.log("  Top cross-office chains:");
sortedCross.slice(0, 10).forEach(k => {
  console.log("    " + crossRefs[k] + " refs: " + k);
});
console.log("");

console.log("--- SECTION 7: CATEGORY BREAKDOWN ---");
const catData = {};
offices.forEach(o => {
  if (o.id === "bd") return;
  const cat = o.category || "Unknown";
  if (!catData[cat]) catData[cat] = { offices: [], totalPos: 0 };
  const od = officeData.find(d => d.id === o.id);
  catData[cat].offices.push(o.id);
  catData[cat].totalPos += od ? od.posCount : 0;
});
Object.keys(catData).sort((a,b) => catData[b].totalPos - catData[a].totalPos).forEach(cat => {
  const info = catData[cat];
  const avgPos = (info.totalPos / info.offices.length).toFixed(1);
  const avgDep = officeData.filter(d => info.offices.includes(d.id)).reduce((s,d) => s + d.depth, 0) / info.offices.length;
  console.log("  " + cat + ": " + info.offices.length + " offices, " + info.totalPos + " positions, avg " + avgPos + " pos/off, avg depth " + avgDep.toFixed(2));
});
console.log("");
console.log("=================================================================");
