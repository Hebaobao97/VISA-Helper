/* 临时测试：办理中变灰 + 出签紫色 + 优先级 */
const fs = require("fs");
const code = fs.readFileSync(__dirname + "/mapdata.js", "utf8") + "\n" + fs.readFileSync(__dirname + "/data.js", "utf8") + `
console.log("--- 无记录 ---");
for (const n of ["United States of America","Thailand","Japan","France","Brazil"]) {
  const s = mapStatusOf(n, [], []);
  console.log(n, "->", s.key, s.tags.join(","));
}
console.log("--- 美签审理中 ---");
for (const n of ["United States of America","Mexico","Thailand","Japan"]) {
  const s = mapStatusOf(n, [], ["usa"]);
  console.log(n, "->", s.key, s.tags.join(","));
}
console.log("--- 美签已出签 ---");
for (const n of ["United States of America","Mexico","Japan"]) {
  const s = mapStatusOf(n, ["usa"], []);
  console.log(n, "->", s.key, s.tags.join(","));
}
console.log("--- 泰国办理中（免签国应保持红色）---");
console.log("Thailand ->", mapStatusOf("Thailand", [], ["thailand"]).key);
`;
fs.writeFileSync(__dirname + "/__test.js", code);
