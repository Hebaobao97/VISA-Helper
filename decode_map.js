/* decode_map.js — 构建脚本：world-atlas TopoJSON → mapdata.js
   关键修复：跨 180° 经线的国家（俄罗斯/斐济等）经度连续展开（unwrap），
   消除横穿地图的直线；平移副本由 app.js 用 <use> 渲染。 */
const fs = require("fs");
const topo = JSON.parse(fs.readFileSync(__dirname + "/countries-110m.json", "utf8"));
const tr = topo.transform;
const [sx, sy] = tr.scale;
const [tx, ty] = tr.translate;

const arcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => {
    x += dx; y += dy;
    return [x * sx + tx, y * sy + ty]; // 原始经纬度
  });
});
const arcPts = i => (i < 0 ? arcs[~i].slice().reverse() : arcs[i]);

// 投影：x = lon + 180（不取模！），y = 90 - lat；跨线国家靠 unwrap 保持连续
function unwrapAndProject(ring) {
  const pts = [];
  let prev = null, acc = 0;
  for (const [lon, lat] of ring) {
    if (prev !== null) {
      while (lon + acc - prev > 180) acc -= 360;
      while (lon + acc - prev < -180) acc += 360;
    }
    const L = lon + acc;
    const px = +(L + 180).toFixed(2), py = +(90 - lat).toFixed(2);
    const last = pts[pts.length - 1];
    if (!last || last[0] !== px || last[1] !== py) pts.push([px, py]);
    prev = L;
  }
  return pts;
}

const out = {};
for (const g of topo.objects.countries.geometries) {
  const name = g.properties.name;
  if (!name || name === "Antarctica") continue;
  let d = "";
  const polys = g.type === "Polygon" ? [g.arcs] : g.type === "MultiPolygon" ? g.arcs : [];
  for (const poly of polys) {
    for (const ring of poly) {
      const pts = [];
      for (const ai of ring) for (const p of arcPts(ai)) pts.push(p);
      const prj = unwrapAndProject(pts);
      if (prj.length < 3) continue;
      d += "M" + prj.map(p => p.join(",")).join("L") + "Z";
    }
  }
  if (d) out[name] = d;
}
fs.writeFileSync(__dirname + "/mapdata.js",
  "/* mapdata.js — 由 world-atlas 110m TopoJSON 生成；经度已连续展开，\n   跨 180° 国家需配合 app.js 的 <use> 平移副本渲染，viewBox 0 0 360 152 */\nconst WORLD_PATHS = " + JSON.stringify(out) + ";\n");

// 自检：任何子路径内不允许出现 >180 的 x 跳变
let bad = [];
for (const [name, d] of Object.entries(out)) {
  for (const sub of d.split("M")) {
    if (!sub) continue;
    const nums = sub.replace(/[^0-9.,-]/g, "").split(/[LZ]/).filter(Boolean)
      .map(s => s.split(",").map(Number));
    for (let i = 1; i < nums.length; i++) {
      if (Math.abs(nums[i][0] - nums[i - 1][0]) > 180) { bad.push(name); break; }
    }
  }
}
console.log("countries:", Object.keys(out).length);
console.log("size:", fs.statSync(__dirname + "/mapdata.js").size);
console.log("残留跳变:", bad.length ? bad : "无 ✓");
console.log("俄罗斯 x 范围:", (() => {
  const d = out["Russia"]; let mn = 1e9, mx = -1e9;
  d.split("M").forEach(s => { if (!s) return; s.replace(/[^0-9.,-]/g, "").split(/[LZ]/).filter(Boolean).forEach(p => { const x = +p.split(",")[0]; mn = Math.min(mn, x); mx = Math.max(mx, x); }); });
  return mn.toFixed(1) + " ~ " + mx.toFixed(1);
})());
