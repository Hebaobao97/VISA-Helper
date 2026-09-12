/* ============================================================
   data.js — 静态数据（签证信息 / 官方入口 / 持签可去目的地）
   注意：政策会变动，出行前请以官方渠道为准。
   ============================================================ */

const VISA_STEPS = ["准备材料", "预约/递交", "审理中", "已出签"];

const VISAS = {
  schengen: {
    name: "申根签证", en: "Schengen Visa", flag: "🇪🇺", region: "欧洲",
    summary: "一签畅行 29 个申根国家（180 天内累计停留不超过 90 天）。按主要停留国或首次入境国递交。",
    fee: "签证费 €90 + 递签中心服务费（约 ¥200–300）",
    time: "一般 15 个自然日内出签，最早可提前 6 个月申请",
    validity: "常见为按行程单次/多次，良好记录者易获 1–5 年多次",
    official: [
      { name: "France-Visas（法国）", url: "https://france-visas.gouv.fr/" },
      { name: "德国外交部", url: "https://www.auswaertiges-amt.de/de/visaabteilung" },
      { name: "意大利签证门户", url: "https://vistoperitalia.esteri.it/" },
      { name: "TLScontact 递签中心", url: "https://www.tlscontact.com/" },
      { name: "VFS Global 递签中心", url: "https://www.vfsglobal.com/" }
    ],
    materials: [
      "护照（有效期超过回国后 3 个月，至少 2 页空白签证页）",
      "白底彩色照片 2 张（35×45mm，6 个月内拍摄）",
      "申根签证申请表（在线填写后打印签名）",
      "往返机票预订单（无需出票）",
      "酒店预订单 / 行程安排覆盖全程",
      "英文在职证明 + 营业执照复印件盖章",
      "近 6 个月银行流水（余额建议覆盖行程）",
      "旅行医疗保险（覆盖全程，医疗保额 ≥ 3 万欧元）",
      "户口本整本复印件、身份证复印件"
    ],
    tips: "💡 首次申请必须本人到递签中心录指纹，指纹 59 个月内有效，之后可由他人代交。行程决定递交国：停留最长的国家优先。"
  },
  usa: {
    name: "美国签证", en: "USA B1/B2", flag: "🇺🇸", region: "美洲",
    summary: "B1/B2 商务旅游签证，通常为 10 年多次，每次停留由入境口岸决定（一般 6 个月）。",
    fee: "MRV 签证费 $185（约 ¥1,300，不可退）",
    time: "面签后 3–10 个工作日出签，建议提前 3–6 个月规划",
    validity: "常见 10 年多次（EVUS 每两年更新一次登记）",
    official: [
      { name: "DS-160 申请表", url: "https://ceac.state.gov/genniv/" },
      { name: "美国签证预约缴费", url: "https://www.ustraveldocs.com/cn_zh/" },
      { name: "EVUS 登记", url: "https://www.evus.gov/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "DS-160 确认页（带条形码）",
      "51×51mm 白底电子照片",
      "面签预约确认单",
      "签证费缴费收据",
      "支持性材料：在职证明、银行流水、房产/车产、行程计划",
      "学生需 I-20 / 学校在读证明（如适用）"
    ],
    tips: "💡 DS-160 提交后信息难修改，务必核对清楚。面签如实回答即可，材料备齐但不一定会看。10 年签证 ≠ 可停留 10 年，入境停留期以海关章/电子记录为准。"
  },
  canada: {
    name: "加拿大签证", en: "Canada Visitor Visa", flag: "🇨🇦", region: "美洲",
    summary: "访问签证（Visitor Visa），一般签发至护照有效期前，最长可达 10 年，单次停留最长 6 个月。",
    fee: "签证费 CAD $100 + 生物识别 CAD $85（指纹 10 年有效）",
    time: "审理时长数周至数月不等（旺季更久），可提前 1 年内申请",
    validity: "最长 10 年或至护照到期，单次停留 ≤ 6 个月",
    official: [
      { name: "加拿大移民局 IRCC", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" },
      { name: "IRCC 在线申请（GCKey）", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-canada.html" }
    ],
    materials: [
      "有效期 6 个月以上的护照（所有页扫描）",
      "35×45mm 白底照片（电子版）",
      "家庭信息表 IMM5707",
      "资金证明：近 6 个月流水、存款、房产",
      "在职证明 / 营业执照 / 在读证明",
      "详细行程安排、机票酒店预订单",
      "身份证正反面扫描件",
      "如曾有任何国家拒签史，需如实申报并写解释信"
    ],
    tips: "💡 网申为主，材料全部电子上传。录指纹需在收到通知后 30 天内到签证中心完成。财力与国内约束力（工作/家庭）是审核重点。"
  },
  australia: {
    name: "澳大利亚签证", en: "Australia Visitor 600", flag: "🇦🇺", region: "大洋洲",
    summary: "访客签证（subclass 600）旅游系列，常见 1 年多次、单次停留 3 个月，记录良好可获 3 年多次。",
    fee: "AUD $190 起（约 ¥900）",
    time: "一般 2–4 周，电子签证无贴纸",
    validity: "常见 1 年多次（单次 3 个月），可尝试申请 3 年",
    official: [
      { name: "ImmiAccount 在线申请", url: "https://online.immi.gov.au/lusc/login" },
      { name: "内政部访客签证说明", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" }
    ],
    materials: [
      "护照个人信息页扫描件",
      "护照规格照片（45–50mm）",
      "54 号家庭成员表",
      "在职证明 + 准假信",
      "资金证明：流水、存款证明、房产",
      "行程安排、机票酒店预订单",
      "身份证、户口本扫描件（翻译件如有要求）"
    ],
    tips: "💡 全程网申（ImmiAccount），下签为电子签，护照无需邮寄。体检通知按需配合即可。诚实申报旅行史与拒签史，澳洲系统间信息互通。"
  },
  japan: {
    name: "日本签证", en: "Japan Visa", flag: "🇯🇵", region: "亚洲",
    summary: "单次旅游签可通过指定代办机构办理，符合条件的常旅客可尝试三年/五年多次签。个人不可直接向使领馆递签。",
    fee: "签证费约 ¥200（单次）+ 代办服务费",
    time: "递签后 5–7 个工作日",
    validity: "单次 90 天内停留 15 天；多次签 3 / 5 年（每次 30 天）",
    official: [
      { name: "日本国驻华大使馆", url: "https://www.cn.emb-japan.go.jp/itpr_zh/visas_visas_index.html" },
      { name: "Japan eVISA（电子签）", url: "https://www.evisa.mofa.go.jp/" }
    ],
    materials: [
      "护照原件（有效期 6 个月以上）",
      "45×45mm 白底照片 2 张",
      "签证申请表（指定代办机构提供）",
      "在职证明 / 收入证明（年收入要求视多次签而定）",
      "机票酒店预订单、行程表",
      "近 6 个月银行流水或存款证明"
    ],
    tips: "💡 必须通过外务省指定的旅行社/代办机构递交，各领区要求略有差异。eVISA 目前开放部分类型在线申请。"
  },
  korea: {
    name: "韩国签证", en: "Korea Visa", flag: "🇰🇷", region: "亚洲",
    summary: "旅游签证（C-3）需通过驻华使领馆指定代办机构申请，济州岛对中国游客免签（限直飞济州）。",
    fee: "单次约 USD 30（约 ¥220）+ 代办费",
    time: "5–10 个工作日",
    validity: "单次 3 个月内有效，停留 90 天内",
    official: [
      { name: "大韩民国签证门户", url: "https://www.visa.go.kr/" },
      { name: "韩国 K-ETA（免签国适用）", url: "https://www.k-eta.go.kr/" }
    ],
    materials: [
      "护照原件及复印件",
      "35×45mm 白底照片",
      "签证申请表",
      "在职证明 + 营业执照复印件",
      "近 6 个月银行流水 / 社保记录",
      "机票酒店预订单、行程计划"
    ],
    tips: "💡 济州岛免签仅限从国内直飞济州，经首尔转机不适用。有良好出行记录者可申请五年多次。"
  },
  uk: {
    name: "英国签证", en: "UK Standard Visitor", flag: "🇬🇧", region: "欧洲",
    summary: "标准访客签证，覆盖旅游、商务、探亲，非申根国家，需单独申请。",
    fee: "£115（6 个月多次）",
    time: "一般 3 周（VFS 中心递交 + 录指纹）",
    validity: "6 个月多次（可申请 2 / 5 / 10 年）",
    official: [
      { name: "英国政府签证官网", url: "https://www.gov.uk/standard-visitor-visa" },
      { name: "VFS Global 递签中心", url: "https://visa.vfsglobal.com/" }
    ],
    materials: [
      "护照（有效期覆盖行程）",
      "在线申请表（gov.uk 填写后打印）",
      "资金证明：流水、存款、房产",
      "在职证明 / 在读证明",
      "行程计划、机票酒店预订单",
      "如有旧护照一并提交"
    ],
    tips: "💡 网上填表后预约 VFS 录指纹，可加急（5 个工作日 Priority）。材料需英文翻译件。"
  },
  newzealand: {
    name: "新西兰签证", en: "NZ Visitor Visa", flag: "🇳🇿", region: "大洋洲",
    summary: "访客签证全程网申（电子签），可与澳洲行程搭配。中国公民持有效澳签并非免签入境新西兰。",
    fee: "约 NZD 211 起（近期有调价，以官网为准）",
    time: "一般 2–4 周",
    validity: "常见多次，单次停留最长 6 个月",
    official: [
      { name: "新西兰移民局", url: "https://www.immigration.govt.nz/new-zealand-visas" }
    ],
    materials: [
      "护照个人信息页扫描件",
      "照片（电子版）",
      "在线申请表",
      "资金证明、在职证明",
      "行程计划、机票酒店预订单",
      "身份证扫描件"
    ],
    tips: "💡 全程电子签无贴纸，下签邮件附签证函，出行打印或存手机即可。"
  },
  singapore: {
    name: "新加坡", en: "Visa-Free 30 Days", flag: "🇸🇬", region: "亚洲",
    summary: "2024 年 2 月起中新互免签证，普通护照持有人可免签停留 30 天，无需申请签证。",
    fee: "免签（入境卡 SG Arrival Card 免费提交）",
    time: "无需办理，出发前 3 天内提交电子入境卡",
    validity: "单次停留最长 30 天",
    official: [
      { name: "SG Arrival Card 入境卡", url: "https://eservices.ica.gov.sg/sgarrivalcard/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "SG Arrival Card（免费，勿通过第三方付费代填）",
      "往返机票 / 后续行程证明",
      "酒店订单（抽查）"
    ],
    tips: "💡 入境卡是官方免费的，谨防代填网站收费陷阱。注意新加坡口香糖、电子烟入境管制严格。"
  },
  thailand: {
    name: "泰国", en: "Visa-Free 60 Days", flag: "🇹🇭", region: "亚洲",
    summary: "2024 年 3 月起中泰互免签证，免签停留最长 60 天（可申请延期 30 天）。2025 年起入境需提交 TDAC 电子入境卡。",
    fee: "免签（TDAC 免费提交）",
    time: "无需办理签证，入境前 3 天内提交 TDAC",
    validity: "免签单次 60 天（可延期 30 天）",
    official: [
      { name: "TDAC 电子入境卡", url: "https://tdac.immigration.go.th/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "TDAC 电子入境卡确认单",
      "往返机票、酒店订单（抽查）",
      "现金或财力证明（抽查，每人约 1 万泰铢）"
    ],
    tips: "💡 免签游客也可选择付费电子旅行签（e-Visa）延长停留，长期停留请提前规划。"
  },
  malaysia: {
    name: "马来西亚", en: "Visa-Free 30 Days", flag: "🇲🇾", region: "亚洲",
    summary: "中马互免签证延长实施中，免签停留 30 天，入境前需在线提交 MDAC 电子入境卡。",
    fee: "免签（MDAC 免费提交）",
    time: "出发前 3 天内提交 MDAC",
    validity: "免签单次 30 天",
    official: [
      { name: "MDAC 电子入境卡", url: "https://imigresen-online.imi.gov.my/mdac/main" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "MDAC 确认邮件打印件",
      "往返机票、酒店订单"
    ],
    tips: "💡 MDAC 官方免费。沙巴/砂拉越（东马）入境有独立查验，需再次出示护照。"
  },
  indonesia: {
    name: "印度尼西亚", en: "Indonesia VOA", flag: "🇮🇩", region: "亚洲",
    summary: "中国护照可办落地签（VOA）或提前在线购买 e-VOA，巴厘岛等主要口岸均支持。",
    fee: "落地签 IDR 500,000（约 ¥230，单次 30 天）",
    time: "落地即办，或 e-VOA 提前 1–2 天在线购买",
    validity: "30 天，可付费延期一次（+30 天）",
    official: [
      { name: "e-VOA 在线申请", url: "https://evisa.imigrasi.go.id/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "返程机票（抽查）",
      "酒店订单（抽查）",
      "入境时现场缴费或出示 e-VOA 凭证"
    ],
    tips: "💡 建议提前在线买 e-VOA 免排队。离境税通常已含在机票中，注意区分国际机场。"
  },
  vietnam: {
    name: "越南", en: "Vietnam e-Visa", flag: "🇻🇳", region: "亚洲",
    summary: "中国护照适用电子签（e-Visa），全境口岸通用，单次/多次可选。",
    fee: "USD 25（单次）/ USD 50（多次）",
    time: "3–5 个工作日（旺季更久，建议提前 2 周）",
    validity: "最长 90 天（按申请区间）",
    official: [
      { name: "越南电子签官网", url: "https://evisa.gov.vn/" }
    ],
    materials: [
      "护照个人信息页照片",
      "证件照电子版",
      "入境口岸信息",
      "行程信息（无需机票酒店凭证）"
    ],
    tips: "💡 只认 evisa.gov.vn 官网，谨防第三方钓鱼网站高价代签。电子签 PDF 打印随身携带。"
  },
  india: {
    name: "印度", en: "India Visa", flag: "🇮🇳", region: "亚洲",
    summary: "需通过印度签证申请中心递交纸质材料（旅游电子签政策对华有变动，出行前务必确认最新通道）。",
    fee: "视类型约 ¥500–1,000（以签证中心为准）",
    time: "约 1–2 周",
    validity: "按签发，常见 90 天停留",
    official: [
      { name: "印度签证在线申请", url: "https://indianvisaonline.gov.in/visa/" },
      { name: "BLS 签证中心", url: "https://www.blsindia-china.com/" }
    ],
    materials: [
      "护照原件（2 页以上空白）",
      "在线申请表打印签名",
      "50×50mm 照片",
      "行程单、机票预订单",
      "银行流水、在职证明"
    ],
    tips: "💡 印度对华电子旅游签政策多次调整，申请前先通过官方渠道确认当前开放通道，勿轻信中介包过。"
  },
  uae: {
    name: "阿联酋", en: "UAE Visa-Free", flag: "🇦🇪", region: "亚洲",
    summary: "中阿互免签证，普通护照免签停留 30 天，迪拜、阿布扎比说走就走。",
    fee: "免签",
    time: "无需办理",
    validity: "免签 30 天（可付费延期）",
    official: [
      { name: "阿联酋身份与 citizenship 局", url: "https://icp.gov.ae/en/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "往返机票、酒店订单（抽查）"
    ],
    tips: "💡 免签福利之外，斋月期间部分公共场合餐饮管制请注意。当地打车用 Careem/Uber 更方便。"
  },
  turkey: {
    name: "土耳其", en: "Turkey Visa-free", flag: "🇹🇷", region: "亚洲",
    summary: "🎉 自 2026 年 1 月 2 日起，土耳其对持中国普通护照公民免签入境（旅游/过境），任意 180 天内累计停留不超过 90 天，无需办签直接出发。",
    fee: "免签（旅游/过境）",
    time: "无需申请，持护照直接入境",
    validity: "180 天内累计 ≤ 90 天",
    official: [
      { name: "土耳其电子签官网（备用通道）", url: "https://www.evisa.gov.tr/zh/" },
      { name: "土耳其驻华使馆", url: "https://www.mfa.gov.tr/visas.en.mfa" }
    ],
    materials: [
      "有效护照（建议有效期 6 个月以上）",
      "返程机票、酒店订单（边检抽查）"
    ],
    tips: "💡 免签适用于旅游和过境；工作、留学等仍需办理相应签证。原有的电子签（USD 60，30 天单次）仍可作为其他情形的备用通道。出行前建议再核实土耳其《官方公报》最新公告。"
  },
  russia: {
    name: "俄罗斯", en: "Russia Visa-free", flag: "🇷🇺", region: "欧洲",
    summary: "🎉 自 2025 年 12 月 1 日起，中国公民持普通护照可免签入境俄罗斯（旅游、商务、探亲、过境等），单次停留不超过 30 天；该政策已延长至 2027 年 12 月 31 日。",
    fee: "免签（30 天内）；电子签约 USD 52 备用",
    time: "无需申请；电子签 4–10 个自然日",
    validity: "免签单次 ≤ 30 天、一年累计 ≤ 90 天",
    official: [
      { name: "俄罗斯电子签官网（备用通道）", url: "https://evisa.kdmid.ru/" },
      { name: "俄罗斯签证申请中心", url: "https://russiavisa.cn/" }
    ],
    materials: [
      "有效普通护照",
      "返程机票、酒店订单（建议随身备查）",
      "RuID 电子注册二维码（免签入境需提前在官方 App「Госуслуги RuID」注册生成）"
    ],
    tips: "💡 免签入境记得提前完成 RuID 数字注册（入境前 90 天至 72 小时内），过关时出示二维码。停留超 30 天或工作/留学需办电子签或纸质签证。原有统一电子签（30 天停留）可作为「双保险」备用方案。政策随总统令动态调整，出发前以中国驻俄使馆/领事服务网最新公告为准。"
  },
  egypt: {
    name: "埃及", en: "Egypt e-Visa / VOA", flag: "🇪🇬", region: "非洲",
    summary: "可提前在线申请电子签，或持返程机票、酒店订单在开罗等主要机场办理落地签。",
    fee: "USD 25（单次）",
    time: "电子签 3–7 天；落地签现场排队",
    validity: "单次 30 天",
    official: [
      { name: "埃及电子签官网", url: "https://visa2egypt.gov.eg/" }
    ],
    materials: [
      "有效期 6 个月以上的护照",
      "返程机票、酒店订单",
      "现金 USD 2,000（落地签抽查）",
      "证件照（电子签上传）"
    ],
    tips: "💡 落地签材料抽查较严，稳妥起见建议提前办电子签。红海度假区另需留意安全提示。"
  },
  kenya: {
    name: "肯尼亚", en: "Kenya eTA", flag: "🇰🇪", region: "非洲",
    summary: "2024 年起肯尼亚取消签证制度，改为电子旅行授权（eTA），出发前在线申请即可。",
    fee: "USD 30（eTA）",
    time: "约 3 天（建议提前 1–2 周）",
    validity: "eTA 批准后 90 天内入境，单次 90 天",
    official: [
      { name: "肯尼亚 eTA 官网", url: "https://www.etakenya.go.ke/" }
    ],
    materials: [
      "护照个人信息页",
      "证件照电子版",
      "往返机票、酒店订单",
      "黄热病疫苗接种证明（中转/来自疫区时）"
    ],
    tips: "💡 肯尼亚 eTA 已取代旧 eVisa，官网申请即可。动物大迁徙旺季（7–9 月）机票酒店要早订。"
  },
  argentina: {
    name: "阿根廷", en: "Argentina AVE", flag: "🇦🇷", region: "美洲",
    summary: "持有效美国签证或申根签证的中国护照可申请电子旅行授权（AVE），无需纸质签证。",
    fee: "USD 50（AVE）",
    time: "约 10–20 天（建议提前 1 个月申请）",
    validity: "90 天内入境，单次停留 90 天",
    official: [
      { name: "阿根廷移民局 AVE", url: "https://www.migraciones.gob.ar/ave/" }
    ],
    materials: [
      "护照个人信息页扫描件",
      "有效美签或申根签证扫描件",
      "机票行程",
      "在线申请表"
    ],
    tips: "💡 AVE 要求护照与美签/申根签信息一致。南美行程常与智利、秘鲁搭配，持美签可顺路免签多国。"
  }
};

/* ============ 持有效签证可免签/简化入境的目的地 ============ */
const VISA_DESTINATIONS = {
  usa: [
    { flag: "🇲🇽", name: "墨西哥", badge: "免签", note: "持有效美签（含电子页打印件）可免签入境，停留最长 180 天。", cities: ["墨西哥城", "坎昆", "瓜达拉哈拉", "圣米格尔"] },
    { flag: "🇵🇭", name: "菲律宾", badge: "免签 7 天", note: "持有效美/日/澳/加/申根签证的中国护照可免签停留 7 天（可申请延期）。", cities: ["马尼拉", "宿务", "长滩岛", "薄荷岛"] },
    { flag: "🇨🇱", name: "智利", badge: "免签 90 天", note: "持有效的美签或加签可免签入境，停留最长 90 天。", cities: ["圣地亚哥", "瓦尔帕莱索", "阿塔卡马"] },
    { flag: "🇵🇪", name: "秘鲁", badge: "免签 180 天", note: "持美/加/英/澳/申根有效签证（6 个月以上）可免签，停留最长 180 天。", cities: ["利马", "库斯科", "马丘比丘"] },
    { flag: "🇨🇴", name: "哥伦比亚", badge: "免签 90 天", note: "持有效美签或申根居留可免签入境，停留最长 90 天。", cities: ["波哥大", "麦德林", "卡塔赫纳"] },
    { flag: "🇵🇦", name: "巴拿马", badge: "有条件免签", note: "美签需已入境使用过且有效期 ≥ 6 个月，可停留 30 天。", cities: ["巴拿马城", "博卡斯德尔托罗"] },
    { flag: "🇨🇷", name: "哥斯达黎加", badge: "有条件免签", note: "持有效多次入境美签（剩余 ≥ 1 天 validity 看航班）可免签。", cities: ["圣何塞", "蒙特维尔德"] },
    { flag: "🇧🇲", name: "百慕大", badge: "免签 45 天", note: "持美签或多转美签/美 PR 可免签停留 45 天。", cities: ["哈密尔顿", "粉红沙滩"] },
    { flag: "🇹🇨", name: "特克斯和凯科斯", badge: "免签 90 天", note: "持美/加/英有效签证可免签，停留最长 90 天。", cities: ["普罗维登西亚莱斯岛"] },
    { flag: "🇩🇴", name: "多米尼加", badge: "简化入境", note: "持美/加/申根/英签可入境（需在机场购买旅游卡或线上提前购买）。", cities: ["蓬塔卡纳", "圣多明各"] },
    { flag: "🇦🇱", name: "阿尔巴尼亚", badge: "免签 90 天", note: "持美签或申根多次签证可免签，停留最长 90 天。", cities: ["地拉那", "萨兰达"] },
    { flag: "🇸🇬", name: "新加坡", badge: "过境 96 小时", note: "持美签（有效期 ≥ 1 个月）可享 96 小时过境免签，往返均可。", cities: ["樟宜转机", "市区一日游"] },
    { flag: "🇰🇷", name: "韩国", badge: "过境 30 天", note: "持美/加/澳/新签证且从中国前往该国（或返程），可过境免签 30 天。", cities: ["首尔", "仁川转机"] }
  ],
  canada: [
    { flag: "🇨🇱", name: "智利", badge: "免签 90 天", note: "持有效的美签或加签可免签入境，停留最长 90 天。", cities: ["圣地亚哥", "瓦尔帕莱索"] },
    { flag: "🇵🇪", name: "秘鲁", badge: "免签 180 天", note: "持美/加/英/澳/申根有效签证（6 个月以上）可免签，停留最长 180 天。", cities: ["利马", "库斯科"] },
    { flag: "🇵🇭", name: "菲律宾", badge: "免签 7 天", note: "持有效美/日/澳/加/申根签证可免签停留 7 天（可申请延期）。", cities: ["马尼拉", "宿务"] },
    { flag: "🇹🇨", name: "特克斯和凯科斯", badge: "免签 90 天", note: "持美/加/英有效签证可免签，停留最长 90 天。", cities: ["普罗维登西亚莱斯岛"] },
    { flag: "🇩🇴", name: "多米尼加", badge: "简化入境", note: "持美/加/申根/英签可入境（需购买旅游卡）。", cities: ["蓬塔卡纳"] },
    { flag: "🇸🇬", name: "新加坡", badge: "过境 96 小时", note: "持加签（有效期 ≥ 1 个月）可享 96 小时过境免签。", cities: ["樟宜转机"] },
    { flag: "🇰🇷", name: "韩国", badge: "过境 30 天", note: "持加签且往返加拿大途经韩国，可过境免签 30 天。", cities: ["首尔"] }
  ],
  australia: [
    { flag: "🇵🇭", name: "菲律宾", badge: "免签 7 天", note: "持有效美/日/澳/加/申根签证可免签停留 7 天（可申请延期）。", cities: ["马尼拉", "宿务", "长滩岛"] },
    { flag: "🇸🇬", name: "新加坡", badge: "过境 96 小时", note: "持澳签（有效期 ≥ 1 个月）可享 96 小时过境免签。", cities: ["樟宜转机", "市区一日游"] },
    { flag: "🇰🇷", name: "韩国", badge: "过境 30 天", note: "持澳/新签证且往返澳大利亚途经韩国，可过境免签 30 天。", cities: ["首尔"] }
  ],
  schengen: [
    { flag: "🇦🇱", name: "阿尔巴尼亚", badge: "免签 90 天", note: "持申根多次签证（C 类）可免签，停留最长 90 天。", cities: ["地拉那", "萨兰达", "培拉特"] },
    { flag: "🇲🇪", name: "黑山", badge: "免签 30 天", note: "持有效申根签证（需已使用或为多次签）可免签停留最长 30 天。", cities: ["科托尔", "布德瓦", "波德戈里察"] },
    { flag: "🇲🇰", name: "北马其顿", badge: "免签 15 天", note: "持有效多次申根 C 类签证可免签停留最长 15 天。", cities: ["斯科普里", "奥赫里德"] },
    { flag: "🇧🇦", name: "波黑", badge: "有条件免签", note: "持有效多次申根签证可入境停留最长 30 天（建议出行前再核实）。", cities: ["萨拉热窝", "莫斯塔尔"] },
    { flag: "🇵🇭", name: "菲律宾", badge: "免签 7 天", note: "持有效申根签证可免签停留 7 天（可申请延期）。", cities: ["马尼拉", "宿务"] },
    { flag: "🇸🇬", name: "新加坡", badge: "过境 96 小时", note: "持美/加/英/澳/新/日/德/瑞签证（有效期 ≥ 1 个月）可 96 小时过境免签。", cities: ["樟宜转机"] },
    { flag: "🇰🇷", name: "韩国", badge: "过境 30 天", note: "持申根签证且从欧洲前往韩国（或返程），可过境免签 30 天。", cities: ["首尔", "釜山"] }
  ]
};

/* ============ 世界地图状态映射（英文国名对应 world-atlas 110m） ============ */
const MAP_SCHENGEN = ["Austria","Belgium","Bulgaria","Croatia","Czechia","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland"];

const MAP_VIA = {
  usa: ["United States of America","Mexico","Philippines","Chile","Peru","Colombia","Panama","Costa Rica","Bermuda","Turks and Caicos Is.","Dominican Rep.","Albania","Singapore","South Korea"],
  canada: ["Canada","Chile","Peru","Philippines","Turks and Caicos Is.","Dominican Rep.","Singapore","South Korea"],
  australia: ["Australia","Philippines","Singapore","South Korea"],
  schengen: MAP_SCHENGEN.concat(["Albania","Montenegro","Macedonia","Bosnia and Herz.","Philippines","Singapore","South Korea"])
};

const MAP_FREE = ["Singapore","Malaysia","Thailand","United Arab Emirates","Qatar","Kazakhstan","Georgia","Armenia","Belarus","Serbia","Bosnia and Herz.","Ecuador","Mauritius","Seychelles","Morocco","Fiji","Tonga","Samoa","Maldives","Laos","Cambodia","Sri Lanka","Nepal","China",
  /* 2026 新增：土耳其 2026-01-02 起对普通护照免签；俄罗斯 2025-12-01 起免签(已延至 2027-12-31) */
  "Turkey","Russia"];

/* 中国地区（港澳台）：地图上始终与中国大陆同色标红 */
const MAP_CHINA_REGIONS = ["Taiwan", "Hong Kong", "Macao"];

/* 110m 地图上太小而缺失的国家，用圆点标注：[名称, 经度, 纬度] */
const MAP_MARKERS = [
  ["Singapore", 103.8, 1.35],
  ["Maldives", 73.4, 3.2],
  ["Mauritius", 57.5, -20.3],
  ["Seychelles", 55.5, -4.6],
  ["Malta", 14.4, 35.9],
  ["Liechtenstein", 9.55, 47.15],
  ["Samoa", -172.1, -13.8],
  ["Tonga", -175.2, -21.2],
  ["Bermuda", -64.8, 32.3],
  ["Turks and Caicos Is.", -71.8, 21.7],
  /* 中国港澳：110m 底图太小无独立多边形，用圆点标注（与大陆同色红） */
  ["Hong Kong", 114.17, 22.32],
  ["Macao", 113.55, 22.16]
];

const MAP_COLORS = {
  owned: "#8b5cf6", free: "#ef4444", usa: "#eab308", canada: "#22c55e",
  australia: "#14b8a6", schengen: "#f97316", supported: "#3b82f6", gray: "#d5dae4",
  pending: "#3b82f6",
  /* 办理中"持签可去"目的地的浅色版（出签后变紫） */
  light_usa: "#fdf0c4", light_canada: "#d7f1df", light_australia: "#cbeae6", light_schengen: "#ffe2c4"
};
const HOT_KEYS = ["schengen", "usa", "canada", "australia"];

/* 大洲底色：未被任何签证/免签规则覆盖的国家按大洲着色 */
const MAP_CONTINENTS = {
  asia:     { cn: "亚洲",   color: "#e6dcc3" },
  europe:   { cn: "欧洲",   color: "#d3dcf0" },
  africa:   { cn: "非洲",   color: "#e7d0c4" },
  namerica: { cn: "北美洲", color: "#d4e5d6" },
  samerica: { cn: "南美洲", color: "#e6e2c3" },
  oceania:  { cn: "大洋洲", color: "#e3d3ec" }
};
const MAP_CONT_LISTS = {
  asia: ["Kazakhstan","Uzbekistan","Israel","Lebanon","United Arab Emirates","Qatar","Kuwait","Iraq","Oman","Cambodia","Thailand","Laos","Myanmar","Vietnam","North Korea","South Korea","Mongolia","India","Bangladesh","Bhutan","Nepal","Pakistan","Afghanistan","Tajikistan","Kyrgyzstan","Turkmenistan","Iran","Syria","Armenia","Azerbaijan","Georgia","Cyprus","N. Cyprus","Palestine","Jordan","Saudi Arabia","Yemen","Turkey","Taiwan","Sri Lanka","Japan","China","Philippines","Malaysia","Brunei","Indonesia","Timor-Leste","Singapore","Maldives"],
  europe: ["Norway","Sweden","Belarus","Ukraine","Poland","Austria","Hungary","Moldova","Romania","Lithuania","Latvia","Estonia","Germany","Bulgaria","Greece","Albania","Croatia","Switzerland","Luxembourg","Belgium","Netherlands","Portugal","Spain","Ireland","Slovenia","Finland","Slovakia","Czechia","Denmark","United Kingdom","Iceland","France","Italy","Bosnia and Herz.","Macedonia","Serbia","Montenegro","Kosovo","Russia"],
  africa: ["Tanzania","W. Sahara","Dem. Rep. Congo","Somalia","Kenya","Sudan","Chad","Egypt","Libya","Algeria","Tunisia","Morocco","Côte d'Ivoire","Guinea","Guinea-Bissau","Liberia","Sierra Leone","Burkina Faso","Central African Rep.","Congo","Gabon","Eq. Guinea","Zambia","Malawi","Mozambique","eSwatini","Angola","Burundi","Zimbabwe","Botswana","Namibia","Senegal","Mali","Mauritania","Benin","Niger","Nigeria","Cameroon","Togo","Ghana","Gambia","Madagascar","Eritrea","Djibouti","Somaliland","Uganda","Rwanda","S. Sudan","Ethiopia","South Africa","Lesotho","Mauritius","Seychelles"],
  namerica: ["Canada","United States of America","Mexico","Haiti","Dominican Rep.","Bahamas","Cuba","Jamaica","Puerto Rico","Belize","Guatemala","Honduras","El Salvador","Nicaragua","Costa Rica","Panama","Greenland","Trinidad and Tobago","Bermuda","Turks and Caicos Is."],
  samerica: ["Argentina","Chile","Brazil","Bolivia","Peru","Colombia","Uruguay","Paraguay","Venezuela","Guyana","Suriname","Ecuador","Falkland Is."],
  oceania: ["Australia","New Zealand","Papua New Guinea","Vanuatu","Solomon Is.","New Caledonia","Fiji","Samoa","Tonga"]
};
const MAP_CONT_OF = {};
Object.entries(MAP_CONT_LISTS).forEach(([c, list]) => list.forEach(n => { MAP_CONT_OF[n] = c; }));

const MAP_PRIORITY = ["free", "usa", "canada", "australia", "schengen"];

/* 粉丝解锁口令（纯静态页无法直接读取抖音/小红书粉丝列表，用口令代替。
   把口令发布到置顶作品简介中，粉丝输入即可解锁；建议定期更换） */
const FAN_GATE = {
  enabled: true,
  title: "粉丝专享 · 签证办理助手",
  accounts: "抖音：@你的账号 ｜ 小红书：@你的账号",
  hint: "关注我的抖音 / 小红书，在置顶作品简介中获取粉丝口令",
  codes: ["fan2026", "douyin666", "xhs888"]
};

/* 每种签证对应"家门口"的国家（用于已出签高亮） */
const VISA_HOME = {
  schengen: MAP_SCHENGEN,
  usa: ["United States of America"], canada: ["Canada"], australia: ["Australia"],
  japan: ["Japan"], korea: ["South Korea"], uk: ["United Kingdom"], newzealand: ["New Zealand"],
  singapore: ["Singapore"], thailand: ["Thailand"], malaysia: ["Malaysia"], indonesia: ["Indonesia"],
  vietnam: ["Vietnam"], india: ["India"], uae: ["United Arab Emirates"], turkey: ["Turkey"],
  russia: ["Russia"], egypt: ["Egypt"], kenya: ["Kenya"], argentina: ["Argentina"]
};

/* 有办签指引但不属于四大签证体系的国家（日本/英国/韩国等）→ 蓝色 */
const MAP_SUPPORTED = Object.keys(VISA_HOME)
  .filter(k => !MAP_VIA[k])
  .flatMap(k => VISA_HOME[k]);

const MAP_LABELS = {
  owned: "🟣 已出签解锁",
  pending: "🔵 办理中 · 签证国（出签后变色）",
  free: "🔴 中国护照免签/落地签",
  "cn-region": "🇨🇳 中国地区 · 港澳持通行证+签注，台湾持通行证+入台许可",
  usa: "🟡 美国签证区（已出签）",
  canada: "🟢 加拿大签证区（已出签）",
  australia: "🩵 澳大利亚签证区（已出签）",
  schengen: "🟠 申根签证区（已出签）",
  gray: "⚪ 暂不可去 / 与申请无关"
};

/* 签证 key → 该签证解锁的地图区域（含签证国本身） */
function regionsOfVisa(type) {
  if (MAP_VIA[type]) return MAP_VIA[type];
  return VISA_HOME[type] ? VISA_HOME[type] : [];
}

/* 取某个 tag / key 的颜色和说明 */
function colorOfKey(key) {
  if (key.startsWith("cont:")) return (MAP_CONTINENTS[key.slice(5)] || {}).color || MAP_COLORS.gray;
  return MAP_COLORS[key] || MAP_COLORS.gray;
}
function labelOfTag(tag) {
  if (tag.startsWith("dest:")) {
    const t = tag.slice(5);
    const v = VISAS[t];
    return (v ? "持" + v.name : t) + "可去 · 出签后解锁变紫";
  }
  if (tag.startsWith("cont:")) {
    const c = MAP_CONTINENTS[tag.slice(5)];
    return c ? "🏳️ " + c.cn + " · 需单独办理签证" : MAP_LABELS.gray;
  }
  return MAP_LABELS[tag] || MAP_LABELS.gray;
}

/* 优先级（完全由申请记录驱动）：
   1. 已出签：四大热门区本身本色(黄绿青橙)，其余解锁地区紫
   2. 免签红（始终显示）
   3. 办理中：签证国蓝色，解锁目的地浅色版
   4. 其余一律灰色（没填申请的地图 = 红色 + 灰色） */
function mapStatusOf(name, issuedTypes, pendingTypes) {
  issuedTypes = issuedTypes || [];
  pendingTypes = pendingTypes || [];
  // 0. 中国地区（港澳台）：始终标红，优先级最高
  if (MAP_CHINA_REGIONS.includes(name)) return { key: "free", tags: ["cn-region"] };
  // 1. 已出签
  for (const t of issuedTypes) {
    if (regionsOfVisa(t).includes(name)) {
      if (HOT_KEYS.includes(t) && (VISA_HOME[t] || []).includes(name)) {
        return { key: t, tags: [t, "owned"] }; // 热门大区本身：本色
      }
      return { key: "owned", tags: ["owned"] }; // 其余解锁地区：紫
    }
  }
  // 2. 免签红
  if (MAP_FREE.includes(name)) return { key: "free", tags: ["free"] };
  // 3. 办理中：签证国蓝
  if (pendingTypes.some(t => (VISA_HOME[t] || []).includes(name))) {
    return { key: "pending", tags: ["pending"] };
  }
  // 3b. 办理中：解锁目的地浅色
  for (const t of MAP_PRIORITY) {
    if (pendingTypes.includes(t) && MAP_VIA[t] && MAP_VIA[t].includes(name)) {
      return { key: "light_" + t, tags: ["dest:" + t] };
    }
  }
  // 4. 灰
  return { key: "gray", tags: [] };
}

/* 英文国名 → 中文（world-atlas 110m 数据用英文名作 key） */
const MAP_NAMES_ZH = {
  "Fiji": "斐济", "Tanzania": "坦桑尼亚", "W. Sahara": "西撒哈拉", "Canada": "加拿大",
  "United States of America": "美国", "Kazakhstan": "哈萨克斯坦", "Uzbekistan": "乌兹别克斯坦",
  "Papua New Guinea": "巴布亚新几内亚", "Indonesia": "印度尼西亚", "Argentina": "阿根廷",
  "Chile": "智利", "Dem. Rep. Congo": "刚果（金）", "Somalia": "索马里", "Kenya": "肯尼亚",
  "Sudan": "苏丹", "Chad": "乍得", "Haiti": "海地", "Dominican Rep.": "多米尼加",
  "Russia": "俄罗斯", "Bahamas": "巴哈马", "Falkland Is.": "福克兰群岛", "Norway": "挪威",
  "Greenland": "格陵兰", "Fr. S. Antarctic Lands": "法属南部领地", "Timor-Leste": "东帝汶",
  "South Africa": "南非", "Lesotho": "莱索托", "Mexico": "墨西哥", "Uruguay": "乌拉圭",
  "Brazil": "巴西", "Bolivia": "玻利维亚", "Peru": "秘鲁", "Colombia": "哥伦比亚",
  "Panama": "巴拿马", "Costa Rica": "哥斯达黎加", "Nicaragua": "尼加拉瓜", "Honduras": "洪都拉斯",
  "El Salvador": "萨尔瓦多", "Guatemala": "危地马拉", "Belize": "伯利兹", "Venezuela": "委内瑞拉",
  "Guyana": "圭亚那", "Suriname": "苏里南", "France": "法国", "Ecuador": "厄瓜多尔",
  "Puerto Rico": "波多黎各", "Jamaica": "牙买加", "Cuba": "古巴", "Zimbabwe": "津巴布韦",
  "Botswana": "博茨瓦纳", "Namibia": "纳米比亚", "Senegal": "塞内加尔", "Mali": "马里",
  "Mauritania": "毛里塔尼亚", "Benin": "贝宁", "Niger": "尼日尔", "Nigeria": "尼日利亚",
  "Cameroon": "喀麦隆", "Togo": "多哥", "Ghana": "加纳", "Côte d'Ivoire": "科特迪瓦",
  "Guinea": "几内亚", "Guinea-Bissau": "几内亚比绍", "Liberia": "利比里亚", "Sierra Leone": "塞拉利昂",
  "Burkina Faso": "布基纳法索", "Central African Rep.": "中非", "Congo": "刚果（布）", "Gabon": "加蓬",
  "Eq. Guinea": "赤道几内亚", "Zambia": "赞比亚", "Malawi": "马拉维", "Mozambique": "莫桑比克",
  "eSwatini": "斯威士兰", "Angola": "安哥拉", "Burundi": "布隆迪", "Israel": "以色列",
  "Lebanon": "黎巴嫩", "Madagascar": "马达加斯加", "Palestine": "巴勒斯坦", "Gambia": "冈比亚",
  "Tunisia": "突尼斯", "Algeria": "阿尔及利亚", "Jordan": "约旦", "United Arab Emirates": "阿联酋",
  "Qatar": "卡塔尔", "Kuwait": "科威特", "Iraq": "伊拉克", "Oman": "阿曼",
  "Vanuatu": "瓦努阿图", "Cambodia": "柬埔寨", "Thailand": "泰国", "Laos": "老挝",
  "Myanmar": "缅甸", "Vietnam": "越南", "North Korea": "朝鲜", "South Korea": "韩国",
  "Mongolia": "蒙古", "India": "印度", "Bangladesh": "孟加拉国", "Bhutan": "不丹",
  "Nepal": "尼泊尔", "Pakistan": "巴基斯坦", "Afghanistan": "阿富汗", "Tajikistan": "塔吉克斯坦",
  "Kyrgyzstan": "吉尔吉斯斯坦", "Turkmenistan": "土库曼斯坦", "Iran": "伊朗", "Syria": "叙利亚",
  "Armenia": "亚美尼亚", "Sweden": "瑞典", "Belarus": "白俄罗斯", "Ukraine": "乌克兰",
  "Poland": "波兰", "Austria": "奥地利", "Hungary": "匈牙利", "Moldova": "摩尔多瓦",
  "Romania": "罗马尼亚", "Lithuania": "立陶宛", "Latvia": "拉脱维亚", "Estonia": "爱沙尼亚",
  "Germany": "德国", "Bulgaria": "保加利亚", "Greece": "希腊", "Turkey": "土耳其",
  "Albania": "阿尔巴尼亚", "Croatia": "克罗地亚", "Switzerland": "瑞士", "Luxembourg": "卢森堡",
  "Belgium": "比利时", "Netherlands": "荷兰", "Portugal": "葡萄牙", "Spain": "西班牙",
  "Ireland": "爱尔兰", "New Caledonia": "新喀里多尼亚", "Solomon Is.": "所罗门群岛",
  "New Zealand": "新西兰", "Australia": "澳大利亚", "Sri Lanka": "斯里兰卡", "China": "中国",
  "Taiwan": "中国台湾", "Hong Kong": "中国香港", "Macao": "中国澳门", "Italy": "意大利", "Denmark": "丹麦", "United Kingdom": "英国",
  "Iceland": "冰岛", "Azerbaijan": "阿塞拜疆", "Georgia": "格鲁吉亚", "Philippines": "菲律宾",
  "Malaysia": "马来西亚", "Brunei": "文莱", "Slovenia": "斯洛文尼亚", "Finland": "芬兰",
  "Slovakia": "斯洛伐克", "Czechia": "捷克", "Eritrea": "厄立特里亚", "Japan": "日本",
  "Paraguay": "巴拉圭", "Yemen": "也门", "Saudi Arabia": "沙特阿拉伯", "N. Cyprus": "北塞浦路斯",
  "Cyprus": "塞浦路斯", "Morocco": "摩洛哥", "Egypt": "埃及", "Libya": "利比亚",
  "Ethiopia": "埃塞俄比亚", "Djibouti": "吉布提", "Somaliland": "索马里兰", "Uganda": "乌干达",
  "Rwanda": "卢旺达", "Bosnia and Herz.": "波黑", "Macedonia": "北马其顿", "Serbia": "塞尔维亚",
  "Montenegro": "黑山", "Kosovo": "科索沃", "Trinidad and Tobago": "特立尼达和多巴哥",
  "S. Sudan": "南苏丹",
  "Singapore": "新加坡", "Maldives": "马尔代夫", "Mauritius": "毛里求斯", "Seychelles": "塞舌尔",
  "Malta": "马耳他", "Samoa": "萨摩亚", "Tonga": "汤加", "Bermuda": "百慕大",
  "Turks and Caicos Is.": "特克斯和凯科斯群岛", "Liechtenstein": "列支敦士登"
};
function zhName(name) { return MAP_NAMES_ZH[name] || name; }

/* ============ 中国护照免签/落地签参考（基础福利） ============ */
const PASSPORT_VISA_FREE = [
  { flag: "🇨🇳", name: "中国香港", type: "港澳通行证 + 签注" },
  { flag: "🇨🇳", name: "中国澳门", type: "港澳通行证 + 签注" },
  { flag: "🇨🇳", name: "中国台湾", type: "台湾通行证 + 入台许可" },
  { flag: "🇸🇬", name: "新加坡", type: "互免 30 天" },
  { flag: "🇲🇾", name: "马来西亚", type: "互免 30 天" },
  { flag: "🇹🇭", name: "泰国", type: "互免 30 天" },
  { flag: "🇦🇪", name: "阿联酋", type: "互免 30 天" },
  { flag: "🇶🇦", name: "卡塔尔", type: "互免 30 天" },
  { flag: "🇰🇿", name: "哈萨克斯坦", type: "互免 30 天" },
  { flag: "🇬🇪", name: "格鲁吉亚", type: "免签 30 天" },
  { flag: "🇦🇲", name: "亚美尼亚", type: "免签/电子签" },
  { flag: "🇷🇸", name: "塞尔维亚", type: "免签 30 天" },
  { flag: "🇧🇦", name: "波黑", type: "免签 30 天" },
  { flag: "🇧🇾", name: "白俄罗斯", type: "免签 30 天" },
  { flag: "🇷🇺", name: "俄罗斯", type: "免签 30 天（至2027底）" },
  { flag: "🇹🇷", name: "土耳其", type: "免签 90 天（2026.1起）" },
  { flag: "🇪🇨", name: "厄瓜多尔", type: "免签 90 天" },
  { flag: "🇲🇺", name: "毛里求斯", type: "免签 60 天" },
  { flag: "🇸🇨", name: "塞舌尔", type: "免签 30 天" },
  { flag: "🇲🇦", name: "摩洛哥", type: "免签 90 天" },
  { flag: "🇫🇯", name: "斐济", type: "免签 30 天" },
  { flag: "🇹🇴", name: "汤加", type: "免签 30 天" },
  { flag: "🇲🇻", name: "马尔代夫", type: "落地签 30 天" },
  { flag: "🇱🇦", name: "老挝", type: "落地/电子签" },
  { flag: "🇰🇭", name: "柬埔寨", type: "电子/落地签" },
  { flag: "🇱🇰", name: "斯里兰卡", type: "ETA 电子签" },
  { flag: "🇳🇵", name: "尼泊尔", type: "落地签" }
];
