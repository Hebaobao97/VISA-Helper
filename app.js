/* ============================================================
   app.js — 页面逻辑：标签切换 / 签证详情 / 进度跟踪(localStorage) / 目的地筛选
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const LS_KEY = "visa_assistant_apps";

let currentVisa = "schengen";
let currentDest = "usa";
let editingId = null; // null=新增，否则为编辑的记录 id

/* ---------------- 标签切换 ---------------- */
$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    $$(".page").forEach((p) => p.classList.add("hidden"));
    $("#page-" + tab.dataset.page).classList.remove("hidden");
    window.scrollTo(0, 0);
  });
});

/* ---------------- 签证办理页 ---------------- */
// HOT_KEYS 已在 data.js 中定义（申根/美/加/澳四大热门区）

function countryBtnHTML([k, v]) {
  const free = v.fee.includes("免签");
  return `<button class="country-btn ${k === currentVisa ? "active" : ""}" data-k="${k}">
    <div class="flag">${v.flag}</div>
    <div class="cn">${v.name}${free ? ' <span class="vf-badge">免签</span>' : ""}</div>
    <div class="en">${v.en}</div>
  </button>`;
}

function renderCountryGrid() {
  const q = ($("#visa-search").value || "").trim().toLowerCase();
  const box = $("#visa-lists");
  const all = Object.entries(VISAS);
  const filtered = all.filter(([k, v]) =>
    !q || (v.name + v.en + (v.region || "")).toLowerCase().includes(q));

  if (filtered.length && !filtered.some(([k]) => k === currentVisa)) currentVisa = filtered[0][0];
  if (!filtered.length) { box.innerHTML = `<div class="empty">没有找到相关国家 🤷 试试其他关键词</div>`; return; }

  if (q) {
    box.innerHTML = `<div class="section-label">🔍 搜索结果（${filtered.length}）</div>
      <div class="country-grid">${filtered.map(countryBtnHTML).join("")}</div>`;
  } else {
    const hot = filtered.filter(([k]) => HOT_KEYS.includes(k));
    const rest = filtered.filter(([k]) => !HOT_KEYS.includes(k));
    let html = `<div class="section-label">🔥 热门签证</div>
      <div class="country-grid">${hot.map(countryBtnHTML).join("")}</div>`;
    const regions = [...new Set(rest.map(([, v]) => v.region || "其他"))];
    regions.forEach(r => {
      html += `<div class="section-label">🌍 ${r}</div>
        <div class="country-grid">${rest.filter(([, v]) => (v.region || "其他") === r).map(countryBtnHTML).join("")}</div>`;
    });
    box.innerHTML = html;
  }
  box.querySelectorAll(".country-btn").forEach(btn => {
    btn.onclick = () => { currentVisa = btn.dataset.k; renderCountryGrid(); renderVisaDetail(); };
  });
}

/* ---------------- 世界地图 ---------------- */
function issuedTypes() {
  return [...new Set(loadApps().filter(a => a.step === 3).map(a => a.type))];
}
function pendingTypes() {
  // 办理中 = 准备材料/预约递交/审理中（拒签不算，视同无申请）
  return [...new Set(loadApps().filter(a => a.step >= 0 && a.step <= 2).map(a => a.type))];
}

function tooltipOf(name, st, issued) {
  let text = st.tags.map(t => labelOfTag(t)).join("；") || MAP_LABELS.gray;
  const covering = issued.filter(t => regionsOfVisa(t).includes(name));
  if (covering.length) text += "　✅ " + covering.map(t => VISAS[t] ? VISAS[t].name : t).join("、") + "已出签";
  return zhName(name) + "｜" + text;
}

/* --- 缩放：点击国家区域放大，再点一次或复位缩小 --- */
const MAP_VB0 = [0, 0, 360, 152];
let mapVB = MAP_VB0.slice();
let mapZoomName = null;

function setVB(vb) {
  mapVB = vb;
  const svg = $("#world-map svg");
  if (svg) {
    svg.setAttribute("viewBox", vb.map(n => n.toFixed(2)).join(" "));
    // 放大到一定程度才显示小岛国圆点，避免全球视图下的"神秘红点"
    svg.classList.toggle("zoomed", vb[2] < 180);
  }
}
function animateVB(to) {
  const from = mapVB.slice(), t0 = performance.now(), dur = 380;
  const ease = x => 1 - Math.pow(1 - x, 3);
  cancelAnimationFrame(animateVB._raf);
  const step = now => {
    const p = Math.min(1, (now - t0) / dur), e = ease(p);
    setVB(from.map((v, i) => v + (to[i] - v) * e));
    if (p < 1) animateVB._raf = requestAnimationFrame(step);
  };
  animateVB._raf = requestAnimationFrame(step);
}
function zoomTo(pathEl, name) {
  const b = pathEl.getBBox();
  // 裁剪到可视范围 [0,360]x[0,152]（跨 180° 国家 unwrapped 后会超出）
  const x0 = Math.max(b.x, 0), x1 = Math.min(b.x + b.width, 360);
  const y0 = Math.max(b.y, 0), y1 = Math.min(b.y + b.height, 152);
  const w0 = Math.max(x1 - x0, 0.5), h0 = Math.max(y1 - y0, 0.5);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const pad = Math.max(w0, h0) * 0.55 + 4;
  // 大国（如俄罗斯）目标框不得超过底图 2/3，保证点击一定是"放大"
  const w = Math.min(w0 + pad * 2, 240);
  const h = Math.min(h0 + pad * 2, 240 * 152 / 360);
  // 视野中心夹在底图范围内，避免缩放后出现大片空白
  const fcx = Math.max(w / 2, Math.min(cx, 360 - w / 2));
  const fcy = Math.max(h / 2, Math.min(cy, 152 - h / 2));
  animateVB([fcx - w / 2, fcy - h / 2, w, h]);
  mapZoomName = name;
  $("#btn-map-reset").style.display = "";
}
function zoomReset() {
  animateVB(MAP_VB0.slice());
  mapZoomName = null;
  $("#btn-map-reset").style.display = "none";
}

/* --- 全屏（竖屏时自动旋转为横屏展示） --- */
const MAP_CARD = $("#map-card");
function mapIsFs() {
  return !!document.fullscreenElement || MAP_CARD.classList.contains("fs-fake");
}
function syncMapFs() {
  MAP_CARD.classList.toggle("fs-on", mapIsFs());
  MAP_CARD.classList.toggle("fs-portrait", mapIsFs() && window.innerHeight > window.innerWidth);
}
async function toggleMapFs() {
  if (mapIsFs()) {
    if (document.fullscreenElement) document.exitFullscreen();
    MAP_CARD.classList.remove("fs-fake");
    try { screen.orientation && screen.orientation.unlock && screen.orientation.unlock(); } catch (e) {}
    syncMapFs();
    return;
  }
  try {
    if (MAP_CARD.requestFullscreen) await MAP_CARD.requestFullscreen();
    else MAP_CARD.classList.add("fs-fake"); // iOS Safari 等不支持时的降级
  } catch (e) { MAP_CARD.classList.add("fs-fake"); }
  try { screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape").catch(() => {}); } catch (e) {}
  syncMapFs();
}

function renderWorldMap() {
  const issued = issuedTypes();
  const pending = pendingTypes();

  // 图例：完全由申请记录驱动 —— 无记录时只有 红(免签)/灰；
  // 办理中 → 签证国蓝 + 各区浅色；出签 → 紫 + 热门区本色
  const dot = (color, label) => `<span class="legend-item"><span class="legend-dot" style="background:${color}"></span>${label}</span>`;
  const hotLabel = { usa: "美签区·已出签", canada: "加签区·已出签", australia: "澳签区·已出签", schengen: "申根区·已出签" };
  let items = [];
  if (issued.length) {
    items.push(dot(MAP_COLORS.owned, "已出签解锁"));
    issued.filter(t => HOT_KEYS.includes(t)).forEach(t =>
      items.push(dot(MAP_COLORS[t], hotLabel[t])));
  }
  if (pending.length) {
    items.push(dot(MAP_COLORS.pending, "办理中·签证国"));
    pending.filter(t => MAP_VIA[t] && MAP_VIA[t].length).forEach(t =>
      items.push(dot(MAP_COLORS["light_" + t], "持" + (VISAS[t] ? VISAS[t].name : t) + "可去")));
  }
  items.push(dot(MAP_COLORS.free, "免签/落地签"));
  items.push(dot(MAP_COLORS.gray, "其他"));
  $("#map-legend").innerHTML = items.join("");

  // 国家路径：跨 180° 国家的路径经 unwrap 后可能超出 [0,360]，
  // 用 <use> 平移 ±360 的副本补齐左右边缘（SVG 会裁掉界外部分）
  let paths = "", pi = 0;
  for (const [name, d] of Object.entries(WORLD_PATHS)) {
    const st = mapStatusOf(name, issued, pending);
    const pid = "wp" + (pi++);
    paths += `<g data-name="${name}" fill="${colorOfKey(st.key)}"><title>${tooltipOf(name, st, issued)}</title>` +
      `<path id="${pid}" d="${d}" stroke="#ffffff" stroke-width="0.4"/>` +
      `<use href="#${pid}" xlink:href="#${pid}" x="-360"/><use href="#${pid}" xlink:href="#${pid}" x="360"/></g>`;
  }
  // 小国圆点（地图上太小而缺失的国家；仅在放大后显示，r 也更小）
  let circles = "";
  for (const [name, lon, lat] of MAP_MARKERS) {
    const st = mapStatusOf(name, issued, pending);
    circles += `<circle cx="${(lon + 180).toFixed(1)}" cy="${(90 - lat).toFixed(1)}" r="1.6" fill="${colorOfKey(st.key)}" stroke="#fff" stroke-width="0.5" data-name="${name}"><title>${tooltipOf(name, st, issued)}</title></circle>`;
  }

  $("#world-map").innerHTML =
    `<svg viewBox="${mapVB.join(" ")}" class="${mapVB[2] < 180 ? "zoomed" : ""}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="签证世界地图">${paths}${circles}</svg>`;

  const info = $("#map-info");
  info.innerHTML = "👆 点击国家查看说明并放大 · 没有申请记录时地图只有 红=免签 和 灰；去「进度跟踪」添加申请后才会点亮：蓝=办理中、浅色=持签可去、紫/彩色=已出签";
  $("#world-map").onclick = (e) => {
    const g = e.target.closest("[data-name]");
    if (!g) return;
    const name = g.dataset.name;
    // 点击已放大的同一区域 → 复位；否则放大到该区域（小岛国圆点也可放大）
    if (mapZoomName === name) { zoomReset(); }
    else {
      const target = g.tagName.toLowerCase() === "circle" ? g : g.querySelector("path");
      if (target) zoomTo(target, name);
    }
    const st = mapStatusOf(name, issuedTypes(), pendingTypes());
    const covering = issuedTypes().filter(t => regionsOfVisa(t).includes(name));
    let extra = covering.length ? `　✅ <b>${covering.map(t => VISAS[t] ? VISAS[t].name : t).join("、")}</b> 已出签解锁` : "";
    extra += st.tags.includes("schengen") && !MAP_FREE.includes(name) && !covering.length ? "（如计划前往请查看申根签证详情）" : "";
    info.innerHTML = `<b>${zhName(name)}</b> <span style="color:var(--muted);font-size:11px;">${name}</span>：${st.tags.map(t => labelOfTag(t)).join("；") || MAP_LABELS.gray}${extra}`;
  };
}

/* ---------------- 粉丝口令解锁 ---------------- */
function initFanGate() {
  const gate = $("#fan-gate");
  if (!FAN_GATE.enabled) { gate.remove(); return; }
  if (localStorage.getItem("fan_verified") === "1") return; // 已验证，直接放行
  gate.classList.remove("hidden");
  $("#gate-title").textContent = FAN_GATE.title;
  $("#gate-accounts").textContent = FAN_GATE.accounts;
  $("#gate-hint").textContent = FAN_GATE.hint;
  const tryUnlock = () => {
    const v = $("#gate-code").value.trim();
    if (FAN_GATE.codes.map(c => c.toLowerCase()).includes(v.toLowerCase())) {
      localStorage.setItem("fan_verified", "1");
      gate.classList.add("hidden");
    } else {
      $("#gate-err").textContent = "❌ 口令不对，关注 @何堡宝的日常 私信【签证】自动获取哦";
    }
  };
  $("#btn-gate").onclick = tryUnlock;
  $("#gate-code").addEventListener("keydown", e => { if (e.key === "Enter") tryUnlock(); });
}

function renderVisaDetail() {
  const v = VISAS[currentVisa];
  $("#visa-detail").innerHTML = `
    <div class="card">
      <div class="vd-header">
        <h2>${v.flag} ${v.name}</h2>
        <a class="btn-link" href="${v.official[0].url}" target="_blank" rel="noopener">官网申请 ↗</a>
      </div>
      <p>${v.summary}</p>
      <div class="meta-row" style="margin-top:10px;">
        <span class="meta-chip">💰 ${v.fee}</span>
        <span class="meta-chip">⏱️ ${v.time}</span>
        <span class="meta-chip">📆 ${v.validity}</span>
      </div>
      <div class="official-links">
        ${v.official.map(o => `<a href="${o.url}" target="_blank" rel="noopener">${o.name} ↗</a>`).join("")}
      </div>
      <h3>📄 材料清单</h3>
      <ul class="checklist">${v.materials.map(m => `<li>${m}</li>`).join("")}</ul>
    </div>
    <div class="card">
      <h3>💡 办理提示</h3>
      <p class="tips">${v.tips}</p>
    </div>`;
}

/* ---------------- 进度跟踪页 ---------------- */
function loadApps() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function saveApps(apps) {
  localStorage.setItem(LS_KEY, JSON.stringify(apps));
}

function fillFormSelects() {
  const typeSel = $("#f-type");
  typeSel.innerHTML = Object.entries(VISAS).map(([k, v]) => `<option value="${k}">${v.flag} ${v.name}</option>`).join("");
  const stepSel = $("#f-step");
  stepSel.innerHTML = VISA_STEPS.map((s, i) => `<option value="${i}">${s}</option>`).join("") +
    `<option value="4">❌ 已拒签</option>`;
}

$("#btn-add-app").onclick = () => openForm(null);
$("#btn-cancel-app").onclick = () => closeForm();

function openForm(app) {
  editingId = app ? app.id : null;
  $("#track-form").classList.remove("hidden");
  if (app) {
    $("#f-type").value = app.type;
    $("#f-name").value = app.name;
    $("#f-date").value = app.date;
    $("#f-step").value = app.step;
    $("#f-note").value = app.note || "";
  } else {
    $("#f-name").value = "";
    $("#f-date").value = new Date().toISOString().slice(0, 10);
    $("#f-step").value = 0;
    $("#f-note").value = "";
  }
  $("#track-form").scrollIntoView({ behavior: "smooth" });
}
function closeForm() {
  $("#track-form").classList.add("hidden");
  editingId = null;
}

$("#btn-save-app").onclick = () => {
  const name = $("#f-name").value.trim() || VISAS[$("#f-type").value].name;
  const apps = loadApps();
  const record = {
    type: $("#f-type").value,
    name,
    date: $("#f-date").value,
    step: parseInt($("#f-step").value, 10),
    note: $("#f-note").value.trim()
  };
  if (editingId) {
    const idx = apps.findIndex(a => a.id === editingId);
    if (idx > -1) apps[idx] = { ...apps[idx], ...record };
  } else {
    record.id = Date.now().toString(36);
    apps.unshift(record);
  }
  saveApps(apps);
  closeForm();
  renderTrackList();
};

function deleteApp(id) {
  const apps = loadApps().filter(a => a.id !== id);
  saveApps(apps);
  renderTrackList();
}

function daysSince(dateStr) {
  if (!dateStr) return null;
  const diff = Math.floor((Date.now() - new Date(dateStr + "T00:00:00")) / 86400000);
  return diff;
}

function renderTrackList() {
  const apps = loadApps();
  const box = $("#track-list");
  if (!apps.length) {
    box.innerHTML = `<div class="empty">还没有申请记录<br>点击上方「新增申请记录」开始跟踪吧 📝</div>`;
    return;
  }
  box.innerHTML = apps.map(app => {
    const steps = app.step === 4 ? "rejected" : app.step;
    const stepHtml = VISA_STEPS.map((s, i) => {
      let cls = "";
      if (app.step === 4) cls = i <= 3 ? "rejected" : "";
      else cls = i < app.step ? "done" : (i === app.step ? "current" : "");
      return `<div class="step ${cls}"><div class="dot">${i + 1}</div>${s}</div>`;
    }).join("");
    const d = daysSince(app.date);
    const daysText = d === null ? "" :
      d < 0 ? `📅 距递交还有 ${-d} 天` : `📅 已递交 ${d} 天`;
    return `
    <div class="track-card">
      <div class="tc-top">
        <div>
          <div class="tc-name">${VISAS[app.type]?.flag || "🛂"} ${app.name}</div>
          <div class="tc-type">${VISAS[app.type]?.name || app.type}</div>
        </div>
        <div class="tc-actions">
          <button class="btn-sm" onclick='openForm(loadApps().find(a=>a.id==="${app.id}"))'>编辑</button>
          <button class="btn-sm btn-danger" onclick="deleteApp('${app.id}')">删除</button>
        </div>
      </div>
      <div class="tc-note">${app.note ? "📝 " + app.note : ""}</div>
      <div class="steps">${stepHtml}</div>
      <div class="tc-days">${daysText}${app.step === 4 ? "　<span style='color:var(--red)'>❌ 已拒签，可准备申诉或重新申请</span>" : ""}${app.step === 3 ? "　<span style='color:var(--purple,#8b5cf6)'>🟣 已在地图上解锁</span>" : ""}</div>
    </div>`;
  }).join("");
  renderWorldMap(); // 已出签状态变化时同步刷新地图颜色
}

/* ---------------- 持签可去页 ---------------- */
function renderDestFilter() {
  const filter = $("#dest-filter");
  const items = [
    ["usa", "🇺🇸 美签"], ["canada", "🇨🇦 加签"], ["australia", "🇦🇺 澳签"],
    ["schengen", "🇪🇺 申根签"], ["passport", "🛂 护照免签"]
  ];
  filter.innerHTML = items.map(([k, label]) =>
    `<button class="chip ${k === currentDest ? "active" : ""}" data-k="${k}">${label}</button>`).join("");
  filter.querySelectorAll(".chip").forEach(c => {
    c.onclick = () => { currentDest = c.dataset.k; renderDestFilter(); renderDestList(); };
  });
}

function renderDestList() {
  const box = $("#dest-list");
  if (currentDest === "passport") {
    box.innerHTML = `
      <div class="card">
        <h3>🛂 中国护照免签 / 落地签参考</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${PASSPORT_VISA_FREE.map(p =>
            `<span class="meta-chip">${p.flag} ${p.name} · ${p.type}</span>`).join("")}
        </div>
        <p style="margin-top:10px;color:var(--muted);font-size:12px;">免签天数、开放条件可能随双边协议调整，出行前请核实目的地移民局公告。</p>
      </div>`;
    return;
  }
  const list = VISA_DESTINATIONS[currentDest] || [];
  const vName = VISAS[currentDest].name;
  box.innerHTML = `<div class="banner" style="margin-bottom:10px;">持有效 ${VISAS[currentDest].flag} ${vName}，还可前往 ${list.length} 个国家和地区 👇</div>` +
    list.map(d => `
      <div class="dest-card">
        <div class="dest-top">
          <span class="dest-flag">${d.flag}</span>
          <span class="dest-name">${d.name}</span>
          <span class="dest-badge ${d.badge.includes("电子") || d.badge.includes("过境") ? "eta" : ""}">${d.badge}</span>
        </div>
        <div class="dest-note">${d.note}</div>
        <div class="dest-cities">🏙️ 热门城市：<b>${d.cities.join(" · ")}</b></div>
      </div>`).join("");
}

/* ---------------- 初始化 ---------------- */
initFanGate();
// 可视化编辑器可能保存了其他激活页，运行时强制回到「签证办理」页
$$(".tab").forEach(t => t.classList.toggle("active", t.dataset.page === "visa"));
$$(".page").forEach(p => p.classList.toggle("hidden", p.id !== "page-visa"));
$("#visa-search").addEventListener("input", renderCountryGrid);
$("#btn-map-reset").onclick = zoomReset;
$("#btn-fs").onclick = toggleMapFs;
document.addEventListener("fullscreenchange", syncMapFs);
window.addEventListener("resize", syncMapFs);
renderWorldMap();
renderCountryGrid();
renderVisaDetail();
fillFormSelects();
renderTrackList();
renderDestFilter();
renderDestList();
