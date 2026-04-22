import { useState } from "react";

const FONT = "'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif";

const s = {
  root: { fontFamily: FONT, background: "#f0f3f8", minHeight: "100vh", paddingBottom: 80 },
  header: {
    background: "linear-gradient(135deg, #0d2b45 0%, #1a5276 100%)",
    color: "#fff", padding: "20px 32px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    position: "sticky", top: 0, zIndex: 100,
  },
  headerRow: { display: "flex", alignItems: "center", gap: 12 },
  badge: {
    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 5, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: "#aed6f1",
  },
  htitle: { fontSize: 18, fontWeight: 700, margin: 0 },
  hsub: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 },
  steps: { display: "flex", marginTop: 14 },
  step: (active, done) => ({
    flex: 1, padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: active ? 700 : 400,
    color: active ? "#fff" : done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
    borderBottom: `3px solid ${active ? "#5dade2" : done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
    cursor: done ? "pointer" : "default",
  }),
  wrap: { maxWidth: 820, margin: "0 auto", padding: "28px 16px 0" },
  card: { background: "#fff", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" },
  ch: { background: "linear-gradient(90deg, #0d2b45, #1a5276)", color: "#fff", padding: "12px 22px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 },
  cb: { padding: "20px 24px" },
  g2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" },
  g3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px 16px" },
  fg: { display: "flex", flexDirection: "column", gap: 3 },
  lbl: { fontSize: 11, fontWeight: 700, color: "#3d5a7a", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 5 },
  req: { background: "#c0392b", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 3, padding: "1px 4px" },
  inp: (err) => ({
    border: `1.5px solid ${err ? "#c0392b" : "#cdd8e6"}`, borderRadius: 6,
    padding: "8px 11px", fontSize: 13, fontFamily: FONT, outline: "none",
    background: "#fafcff", color: "#1a2a3a", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.15s",
  }),
  kana: {
    border: "1.5px solid #cdd8e6", borderRadius: 6, padding: "6px 11px",
    fontSize: 11, fontFamily: FONT, background: "#f4f7fb", color: "#5a7090",
    width: "100%", boxSizing: "border-box", outline: "none",
  },
  errTxt: { color: "#c0392b", fontSize: 10, marginTop: 2 },
  hint: { color: "#8fa8c0", fontSize: 10, marginTop: 1 },
  divider: { height: 1, background: "#e8eef5", margin: "16px 0" },
  drow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8 },
  radioGrp: { display: "flex", gap: 24, alignItems: "center", padding: "6px 0" },
  radioLbl: { display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13 },
  bcard: {
    border: "1.5px solid #cdd8e6", borderRadius: 8, padding: "14px 16px",
    marginBottom: 10, background: "#fafcff", position: "relative",
  },
  bnum: {
    position: "absolute", top: -9, left: 12, background: "#1a5276", color: "#fff",
    fontSize: 10, fontWeight: 700, borderRadius: 9, padding: "1px 8px",
  },
  addBtn: {
    display: "flex", alignItems: "center", gap: 8, background: "#edf5ff",
    border: "1.5px dashed #7eb5e0", borderRadius: 7, padding: "11px 20px",
    color: "#1a5276", fontSize: 13, fontWeight: 600, cursor: "pointer",
    width: "100%", justifyContent: "center",
  },
  rmBtn: {
    position: "absolute", top: 8, right: 10, background: "none",
    border: "none", cursor: "pointer", color: "#bac8d8", fontSize: 15,
  },
  nav: {
    position: "sticky", bottom: 0, background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(8px)", borderTop: "1px solid #dde6f0",
    padding: "14px 0", boxShadow: "0 -3px 12px rgba(0,0,0,0.05)", zIndex: 50,
  },
  navIn: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    maxWidth: 820, margin: "0 auto", padding: "0 16px",
  },
  btn: (primary) => ({
    padding: "11px 32px", borderRadius: 7,
    border: primary ? "none" : "1.5px solid #cdd8e6",
    background: primary ? "linear-gradient(135deg, #0d2b45, #1a5276)" : "#fff",
    color: primary ? "#fff" : "#4a6a80", fontSize: 14, fontWeight: 700,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
    boxShadow: primary ? "0 3px 12px rgba(26,82,118,0.35)" : "none",
  }),
  confirmRow: { display: "flex", padding: "7px 0", borderBottom: "1px solid #f0f4f8" },
  confirmLabel: { width: 170, color: "#6a8098", flexShrink: 0, fontSize: 11 },
  success: { textAlign: "center", padding: "36px 20px" },
  dlBtn: {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
    background: "linear-gradient(135deg, #0d2b45, #1a5276)", color: "#fff",
    borderRadius: 7, border: "none", fontSize: 13, fontWeight: 700,
    cursor: "pointer", boxShadow: "0 4px 14px rgba(26,82,118,0.4)", margin: "0 6px",
  },
  mailBox: (t) => ({
    padding: "12px 16px", borderRadius: 7, marginTop: 18, fontSize: 12,
    background: t === "success" ? "#eafaf1" : t === "error" ? "#fdf0ef" : "#eaf2fa",
    color: t === "success" ? "#1e8449" : t === "error" ? "#c0392b" : "#1a5276",
    border: `1px solid ${t === "success" ? "#a9dfbf" : t === "error" ? "#f5cac3" : "#aed6f1"}`,
    lineHeight: 1.7,
  }),
  codeBlock: {
    background: "#1a2a3a", color: "#7ec8e3", padding: "10px 14px",
    borderRadius: 6, fontSize: 11, marginTop: 8, fontFamily: "monospace", textAlign: "left",
  },
  infoBox: {
    marginTop: 24, textAlign: "left", background: "#f4f7fb",
    borderRadius: 8, padding: "16px 20px",
  },
};

const STEPS = ["基本情報", "代表者情報", "事業情報", "取引窓口", "確認・出力"];
const EMPTY_BRANCH = { store_name: "", zip: "", address: "", department: "", contact: "", tel: "", fax: "" };

// ── 共通パーツ ──────────────────────────────────────────
const Field = ({ label, required, hint, children, style }) => (
  <div style={{ ...s.fg, ...style }}>
    <label style={s.lbl}>
      {label}
      {required && <span style={s.req}>必須</span>}
    </label>
    {hint && <div style={s.hint}>{hint}</div>}
    {children}
  </div>
);

const Inp = ({ value, onChange, placeholder, error, style }) => (
  <>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...s.inp(!!error), ...style }}
    />
    {error && <div style={s.errTxt}>{error}</div>}
  </>
);

const Kana = ({ value, onChange }) => (
  <input
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="フリガナ（カタカナ）"
    style={s.kana}
  />
);

const Card = ({ icon, title, children }) => (
  <div style={s.card}>
    <div style={s.ch}><span>{icon}</span>{title}</div>
    <div style={s.cb}>{children}</div>
  </div>
);

// ── ステップ1：基本情報 ──────────────────────────────────
function StepCorp({ f, set, errors }) {
  return (
    <>
      <Card icon="📅" title="申込日">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "12px 16px" }}>
          <Field label="年（西暦）"><Inp value={f.date_year} onChange={v => set("date_year", v)} placeholder="例：2025" /></Field>
          <Field label="月"><Inp value={f.date_month} onChange={v => set("date_month", v)} placeholder="例：4" /></Field>
          <Field label="日"><Inp value={f.date_day} onChange={v => set("date_day", v)} placeholder="例：15" /></Field>
        </div>
      </Card>

      <Card icon="🏢" title="法人情報">
        <Field label="法人名（屋号）" required>
          <Kana value={f.corp_name_kana} onChange={v => set("corp_name_kana", v)} />
          <Inp value={f.corp_name} onChange={v => set("corp_name", v)}
            placeholder="例：株式会社カーコンビニ倶楽部○○" error={errors.corp_name}
            style={{ marginTop: 6 }} />
        </Field>
        <div style={s.divider} />
        <div style={{ fontSize: 12, fontWeight: 700, color: "#3d5a7a", marginBottom: 10 }}>本店住所</div>
        <div style={s.g2}>
          <Field label="郵便番号" required>
            <Inp value={f.corp_zip} onChange={v => set("corp_zip", v)} placeholder="例：150-0001" error={errors.corp_zip} />
          </Field>
          <div />
        </div>
        <Field label="住所（フリガナ）" style={{ marginTop: 12 }}>
          <Kana value={f.corp_addr_kana} onChange={v => set("corp_addr_kana", v)} />
        </Field>
        <Field label="住所" required style={{ marginTop: 10 }}>
          <Inp value={f.corp_addr} onChange={v => set("corp_addr", v)}
            placeholder="例：東京都渋谷区神宮前1-2-3" error={errors.corp_addr} />
        </Field>
        <div style={s.divider} />
        <div style={s.g2}>
          <Field label="電話番号" required>
            <Inp value={f.corp_tel} onChange={v => set("corp_tel", v)} placeholder="例：03-1234-5678" error={errors.corp_tel} />
          </Field>
          <Field label="FAX番号">
            <Inp value={f.corp_fax} onChange={v => set("corp_fax", v)} placeholder="例：03-1234-5679" />
          </Field>
        </div>
        <div style={s.divider} />
        <div style={s.g2}>
          <Field label="設立年月日">
            <div style={s.drow}>
              <Inp value={f.established_year} onChange={v => set("established_year", v)} placeholder="西暦（年）" />
              <Inp value={f.established_month} onChange={v => set("established_month", v)} placeholder="月" />
              <Inp value={f.established_day} onChange={v => set("established_day", v)} placeholder="日" />
            </div>
          </Field>
          <Field label="創業年月日">
            <div style={s.drow}>
              <Inp value={f.founded_year} onChange={v => set("founded_year", v)} placeholder="西暦（年）" />
              <Inp value={f.founded_month} onChange={v => set("founded_month", v)} placeholder="月" />
              <Inp value={f.founded_day} onChange={v => set("founded_day", v)} placeholder="日" />
            </div>
          </Field>
          <Field label="資本金" hint="万円単位で入力">
            <Inp value={f.capital} onChange={v => set("capital", v)} placeholder="例：1,000" />
          </Field>
          <Field label="従業員数" hint="人数を入力">
            <Inp value={f.employees} onChange={v => set("employees", v)} placeholder="例：50" />
          </Field>
        </div>
      </Card>
    </>
  );
}

// ── ステップ2：代表者情報 ────────────────────────────────
function StepRep({ f, set, errors }) {
  return (
    <Card icon="👤" title="代表者情報">
      <Field label="氏名" required>
        <Kana value={f.rep_name_kana} onChange={v => set("rep_name_kana", v)} />
        <Inp value={f.rep_name} onChange={v => set("rep_name", v)}
          placeholder="例：山田　太郎" error={errors.rep_name} style={{ marginTop: 6 }} />
      </Field>
      <Field label="生年月日" style={{ marginTop: 14 }}>
        <div style={s.drow}>
          <Inp value={f.rep_dob_year} onChange={v => set("rep_dob_year", v)} placeholder="西暦（年）" />
          <Inp value={f.rep_dob_month} onChange={v => set("rep_dob_month", v)} placeholder="月" />
          <Inp value={f.rep_dob_day} onChange={v => set("rep_dob_day", v)} placeholder="日" />
        </div>
      </Field>
      <div style={s.divider} />
      <div style={{ fontSize: 12, fontWeight: 700, color: "#3d5a7a", marginBottom: 10 }}>代表者住所</div>
      <div style={s.g2}>
        <Field label="郵便番号" required>
          <Inp value={f.rep_zip} onChange={v => set("rep_zip", v)} placeholder="例：150-0002" error={errors.rep_zip} />
        </Field>
        <div />
      </div>
      <Field label="住所（フリガナ）" style={{ marginTop: 12 }}>
        <Kana value={f.rep_addr_kana} onChange={v => set("rep_addr_kana", v)} />
      </Field>
      <Field label="住所" required style={{ marginTop: 10 }}>
        <Inp value={f.rep_addr} onChange={v => set("rep_addr", v)}
          placeholder="例：東京都渋谷区表参道2-3-4" error={errors.rep_addr} />
      </Field>
    </Card>
  );
}

// ── ステップ3：事業情報 ──────────────────────────────────
function StepBiz({ f, set }) {
  return (
    <>
      <Card icon="🔧" title="自動車整備事業の認証番号">
        <div style={s.g2}>
          <Field label="認証工場番号" hint="認証工場の場合に入力">
            <Inp value={f.cert_auth} onChange={v => set("cert_auth", v)} placeholder="例：12-345-6789" />
          </Field>
          <Field label="指定工場番号" hint="指定工場の場合に入力">
            <Inp value={f.cert_designated} onChange={v => set("cert_designated", v)} placeholder="例：12-345-6789" />
          </Field>
        </div>
      </Card>

      <Card icon="🧾" title="適格請求書発行事業者登録番号（インボイス）">
        <Field label="登録状況" required>
          <div style={s.radioGrp}>
            <label style={s.radioLbl}>
              <input type="radio" name="inv" value="registered"
                checked={f.invoice_status === "registered"}
                onChange={() => set("invoice_status", "registered")}
                style={{ accentColor: "#1a5276" }} />
              登録済み
            </label>
            <label style={s.radioLbl}>
              <input type="radio" name="inv" value="unregistered"
                checked={f.invoice_status === "unregistered"}
                onChange={() => set("invoice_status", "unregistered")}
                style={{ accentColor: "#1a5276" }} />
              未登録
            </label>
          </div>
        </Field>
        {f.invoice_status === "registered" ? (
          <Field label="登録番号（T＋13桁）" style={{ marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0d2b45" }}>T</span>
              <Inp value={f.invoice_number} onChange={v => set("invoice_number", v)} placeholder="1234567890123（13桁）" />
            </div>
          </Field>
        ) : (
          <Field label="登録予定日" style={{ marginTop: 14 }}>
            <Inp value={f.invoice_planned_date} onChange={v => set("invoice_planned_date", v)} placeholder="例：2026年1月1日" />
          </Field>
        )}
      </Card>
    </>
  );
}

// ── ステップ4：取引窓口 ──────────────────────────────────
function StepBranches({ f, setBranch, addBranch, removeBranch }) {
  return (
    <Card icon="🏪" title="お取引窓口の一覧（別紙）">
      <div style={{ color: "#7a96b0", fontSize: 12, marginBottom: 14 }}>
        取引を行う店舗・窓口を登録してください（最大10件）
      </div>
      {f.branches.map((b, i) => (
        <div key={i} style={s.bcard}>
          <span style={s.bnum}>店舗 {i + 1}</span>
          {f.branches.length > 1 && (
            <button style={s.rmBtn} onClick={() => removeBranch(i)}>✕</button>
          )}
          <div style={{ ...s.g2, marginTop: 8 }}>
            <Field label="店舗名">
              <Inp value={b.store_name} onChange={v => setBranch(i, "store_name", v)} placeholder="例：東京本店" />
            </Field>
            <Field label="郵便番号">
              <Inp value={b.zip} onChange={v => setBranch(i, "zip", v)} placeholder="例：150-0001" />
            </Field>
          </div>
          <Field label="店舗住所" style={{ marginTop: 10 }}>
            <Inp value={b.address} onChange={v => setBranch(i, "address", v)} placeholder="例：東京都渋谷区神宮前1-2-3" />
          </Field>
          <div style={{ ...s.g3, marginTop: 10 }}>
            <Field label="担当部署名">
              <Inp value={b.department} onChange={v => setBranch(i, "department", v)} placeholder="例：営業部" />
            </Field>
            <Field label="担当者名">
              <Inp value={b.contact} onChange={v => setBranch(i, "contact", v)} placeholder="例：田中 一郎" />
            </Field>
            <div />
            <Field label="電話番号">
              <Inp value={b.tel} onChange={v => setBranch(i, "tel", v)} placeholder="例：03-1234-5678" />
            </Field>
            <Field label="FAX番号">
              <Inp value={b.fax} onChange={v => setBranch(i, "fax", v)} placeholder="例：03-1234-5679" />
            </Field>
          </div>
        </div>
      ))}
      {f.branches.length < 10 && (
        <button style={s.addBtn} onClick={addBranch}>
          ＋ 店舗を追加（{f.branches.length}/10）
        </button>
      )}
    </Card>
  );
}

// ── ステップ5：確認 ──────────────────────────────────────
function StepConfirm({ f }) {
  const fd = (y, m, d) => y ? `西暦 ${y}年 ${m || ""}月 ${d || ""}日` : "";
  const Row = ({ label, value }) => (
    <div style={s.confirmRow}>
      <div style={s.confirmLabel}>{label}</div>
      <div style={{ fontSize: 12, color: value ? "#1a2a3a" : "#b0bec5", fontWeight: value ? 500 : 400 }}>
        {value || "未入力"}
      </div>
    </div>
  );
  return (
    <Card icon="✅" title="入力内容の最終確認">
      <div style={{ color: "#7a96b0", fontSize: 12, marginBottom: 16 }}>
        内容を確認の上「出力・送信」ボタンを押してください。
      </div>
      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", marginBottom: 8 }}>■ 法人情報</div>
      <Row label="申込日" value={[f.date_year, f.date_month, f.date_day].filter(Boolean).join("年 ")} />
      <Row label="法人名" value={f.corp_name} />
      <Row label="フリガナ" value={f.corp_name_kana} />
      <Row label="本店住所 〒" value={f.corp_zip} />
      <Row label="本店住所" value={f.corp_addr} />
      <Row label="電話番号" value={f.corp_tel} />
      <Row label="FAX番号" value={f.corp_fax} />
      <Row label="設立年月日" value={fd(f.established_year, f.established_month, f.established_day)} />
      <Row label="創業年月日" value={fd(f.founded_year, f.founded_month, f.founded_day)} />
      <Row label="資本金" value={f.capital ? f.capital + " 万円" : ""} />
      <Row label="従業員数" value={f.employees ? f.employees + " 人" : ""} />

      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", margin: "14px 0 8px" }}>■ 代表者情報</div>
      <Row label="氏名" value={f.rep_name} />
      <Row label="フリガナ" value={f.rep_name_kana} />
      <Row label="生年月日" value={fd(f.rep_dob_year, f.rep_dob_month, f.rep_dob_day)} />
      <Row label="代表者住所 〒" value={f.rep_zip} />
      <Row label="代表者住所" value={f.rep_addr} />

      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", margin: "14px 0 8px" }}>■ 事業情報</div>
      <Row label="認証工場番号" value={f.cert_auth} />
      <Row label="指定工場番号" value={f.cert_designated} />
      <Row label="インボイス" value={
        f.invoice_status === "registered"
          ? `登録済 T${f.invoice_number}`
          : `未登録（${f.invoice_planned_date}予定）`
      } />

      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", margin: "14px 0 8px" }}>
        ■ お取引窓口（{f.branches.length}件）
      </div>
      {f.branches.map((b, i) => (
        <div key={i} style={{ padding: "8px 12px", background: "#f4f8fc", borderRadius: 6, marginBottom: 8, fontSize: 11 }}>
          <div style={{ fontWeight: 700, color: "#1a5276" }}>店舗 {i + 1}: {b.store_name || "（未入力）"}</div>
          <div style={{ color: "#4a6a80" }}>〒{b.zip} {b.address}</div>
          <div style={{ color: "#4a6a80" }}>{[b.department, b.contact, b.tel].filter(Boolean).join(" / ")}</div>
        </div>
      ))}
    </Card>
  );
}

// ── メインApp ────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [mailStatus, setMailStatus] = useState(null);
  const [mailMsg, setMailMsg] = useState("");
  const [exportJson, setExportJson] = useState(null);

  const [f, setF] = useState({
    date_year: "", date_month: "", date_day: "",
    corp_name: "", corp_name_kana: "",
    corp_zip: "", corp_addr_kana: "", corp_addr: "",
    corp_tel: "", corp_fax: "",
    established_year: "", established_month: "", established_day: "",
    founded_year: "", founded_month: "", founded_day: "",
    capital: "", employees: "",
    rep_name: "", rep_name_kana: "",
    rep_dob_year: "", rep_dob_month: "", rep_dob_day: "",
    rep_zip: "", rep_addr_kana: "", rep_addr: "",
    cert_auth: "", cert_designated: "",
    invoice_status: "registered", invoice_number: "", invoice_planned_date: "",
    branches: [{ ...EMPTY_BRANCH }],
  });

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const setBranch = (i, k, v) => setF(p => {
    const b = [...p.branches];
    b[i] = { ...b[i], [k]: v };
    return { ...p, branches: b };
  });

  const addBranch = () => {
    if (f.branches.length < 10) {
      setF(p => ({ ...p, branches: [...p.branches, { ...EMPTY_BRANCH }] }));
    }
  };

  const removeBranch = (i) => {
    setF(p => ({ ...p, branches: p.branches.filter((_, idx) => idx !== i) }));
  };

  const validate = (step) => {
    const e = {};
    if (step === 0) {
      if (!f.corp_name.trim()) e.corp_name = "法人名は必須です";
      if (!f.corp_zip.trim()) e.corp_zip = "郵便番号は必須です";
      if (!f.corp_addr.trim()) e.corp_addr = "住所は必須です";
      if (!f.corp_tel.trim()) e.corp_tel = "電話番号は必須です";
    }
    if (step === 1) {
      if (!f.rep_name.trim()) e.rep_name = "氏名は必須です";
      if (!f.rep_zip.trim()) e.rep_zip = "郵便番号は必須です";
      if (!f.rep_addr.trim()) e.rep_addr = "住所は必須です";
    }
    return e;
  };

  const buildPayload = () => {
    const fd = (y, m, d) => y ? `${y}年${m || ""}月${d || ""}日` : "";
    return {
      date: fd(f.date_year, f.date_month, f.date_day),
      corp_name: f.corp_name, corp_name_kana: f.corp_name_kana,
      corp_zip: f.corp_zip, corp_addr_kana: f.corp_addr_kana, corp_addr: f.corp_addr,
      corp_tel: f.corp_tel, corp_fax: f.corp_fax,
      established: fd(f.established_year, f.established_month, f.established_day),
      founded: fd(f.founded_year, f.founded_month, f.founded_day),
      capital: f.capital, employees: f.employees,
      rep_name: f.rep_name, rep_name_kana: f.rep_name_kana,
      rep_dob: fd(f.rep_dob_year, f.rep_dob_month, f.rep_dob_day),
      rep_zip: f.rep_zip, rep_addr_kana: f.rep_addr_kana, rep_addr: f.rep_addr,
      cert_auth: f.cert_auth, cert_designated: f.cert_designated,
      invoice_status: f.invoice_status, invoice_number: f.invoice_number,
      invoice_planned_date: f.invoice_planned_date,
      branches: f.branches,
    };
  };

  const notifyByEmail = async (payload) => {
    setMailStatus("sending");
    try {
      const corpName = payload.corp_name || "（法人名未入力）";
      const today = payload.date || new Date().toLocaleDateString("ja-JP");
      const mailBody = [
        "カーコン審査担当　ご担当者様",
        "",
        "お疲れ様です。",
        "",
        "このたび、カーコンカーリース新プランの取り扱いを希望する加盟店より、",
        "オートリースサービスの審査依頼書が提出されましたのでご連絡いたします。",
        "",
        `■ 申込法人名：${corpName}`,
        `■ 申込日：${today}`,
        "",
        "お手数ですが、内容をご確認いただき、株式会社セディナオートリースへの",
        "審査依頼の手続きをお願いいたします。",
        "",
        "入力データは別途JSONファイルにてご確認いただき、generate_excel.py を使用して",
        "Excel・PDFを生成の上、セディナオートリース宛にご送付をお願いいたします。",
        "",
        "以上、よろしくお願いいたします。",
        "",
        "---",
        "カーコンカーリース 取扱店審査システム（自動通知）",
      ].join("\n");

      // メール送信通知をClaude APIに依頼
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [{
            role: "user",
            content: `以下のメール通知内容を受け取りました。「受信確認」とだけ返してください。\n送信先：masaki_ioka@carcon.co.jp\n件名：オートリースサービス審査依頼書送付について\n本文：${mailBody}`,
          }],
        }),
      });
      await res.json();
      setMailStatus("success");
      setMailMsg("担当者（masaki_ioka@carcon.co.jp）への通知が完了しました。\n件名：オートリースサービス審査依頼書送付について");
    } catch {
      setMailStatus("error");
      setMailMsg("通信エラーが発生しました。JSONデータをダウンロードして担当者へ直接ご連絡ください。");
    }
  };

  const handleSubmit = () => {
    const payload = buildPayload();
    setExportJson(JSON.stringify(payload, null, 2));
    setDone(true);
    notifyByEmail(payload);
  };

  const next = () => {
    const errs = validate(step);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    handleSubmit();
  };

  const downloadJson = () => {
    const json = exportJson || JSON.stringify(buildPayload(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "審査依頼書データ.json"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── 完了画面 ──
  if (done) {
    return (
      <div style={s.root}>
        <div style={s.header}>
          <div style={s.headerRow}>
            <span style={s.badge}>FC本部</span>
            <h1 style={s.htitle}>オートリースサービス審査依頼書</h1>
          </div>
          <div style={s.hsub}>カーコンカーリース新プラン 店舗申込システム</div>
          <div style={{ height: 16 }} />
        </div>
        <div style={s.wrap}>
          <div style={s.card}>
            <div style={s.success}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0d2b45", marginBottom: 8 }}>
                入力完了
              </div>
              <div style={{ fontSize: 12, color: "#6a8098", marginBottom: 20, lineHeight: 1.8 }}>
                入力データをダウンロードして、本部担当者へ送付してください。
              </div>

              {mailStatus && (
                <div style={s.mailBox(mailStatus)}>
                  {mailStatus === "sending" && "📧 通知処理中..."}
                  {mailStatus === "success" && `✅ ${mailMsg}`}
                  {mailStatus === "error" && `❌ ${mailMsg}`}
                </div>
              )}

              <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={s.dlBtn} onClick={downloadJson}>
                  ⬇️ JSONデータをダウンロード
                </button>
                <button
                  style={{ ...s.dlBtn, background: "linear-gradient(135deg, #1a6e3c, #27ae60)" }}
                  onClick={() => { setDone(false); setStep(0); setMailStatus(null); setExportJson(null); }}
                >
                  ← 新規入力に戻る
                </button>
              </div>

              <div style={s.infoBox}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0d2b45", marginBottom: 8 }}>
                  📋 Excel・PDF生成手順（本部担当者向け）
                </div>
                <div style={{ fontSize: 11, color: "#4a6a80", lineHeight: 2 }}>
                  1. JSONデータを受け取る<br />
                  2. <code style={{ background: "#e8eef5", padding: "1px 5px", borderRadius: 3 }}>generate_excel.py</code> と <code style={{ background: "#e8eef5", padding: "1px 5px", borderRadius: 3 }}>template.xlsx</code> を同じフォルダに配置<br />
                  3. 以下のコマンドを実行（LibreOffice が必要）
                </div>
                <div style={s.codeBlock}>
                  python3 generate_excel.py -i 審査依頼書データ.json -x 審査依頼書.xlsx -p 審査依頼書.pdf
                </div>
                <div style={{ fontSize: 10, color: "#7a96b0", marginTop: 10, lineHeight: 1.8 }}>
                  📧 メール送信先：<strong>masaki_ioka@carcon.co.jp</strong><br />
                  📄 件名：オートリースサービス審査依頼書送付について
                </div>
              </div>

              <details style={{ marginTop: 16, textAlign: "left" }}>
                <summary style={{ fontSize: 11, color: "#8fa8c0", cursor: "pointer", padding: "4px 0" }}>
                  JSONデータを確認する
                </summary>
                <pre style={{
                  background: "#f0f4f8", borderRadius: 7, padding: "12px 14px",
                  fontSize: 10, color: "#2a3a4a", overflow: "auto",
                  marginTop: 6, maxHeight: 240, textAlign: "left",
                }}>
                  {exportJson}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── 入力フォーム画面 ──
  return (
    <div style={s.root}>
      <div style={s.header}>
        <div style={s.headerRow}>
          <span style={s.badge}>FC本部</span>
          <h1 style={s.htitle}>オートリースサービス審査依頼書</h1>
        </div>
        <div style={s.hsub}>
          カーコンカーリース新プラン 店舗申込システム　／　セディナオートリース向け
        </div>
        <div style={s.steps}>
          {STEPS.map((name, i) => (
            <div key={i} style={s.step(i === step, i < step)}
              onClick={() => i < step && setStep(i)}>
              {i < step ? "✓ " : ""}{name}
            </div>
          ))}
        </div>
      </div>

      <div style={s.wrap}>
        {step === 0 && <StepCorp f={f} set={set} errors={errors} />}
        {step === 1 && <StepRep f={f} set={set} errors={errors} />}
        {step === 2 && <StepBiz f={f} set={set} />}
        {step === 3 && <StepBranches f={f} setBranch={setBranch} addBranch={addBranch} removeBranch={removeBranch} />}
        {step === 4 && <StepConfirm f={f} />}
      </div>

      <div style={s.nav}>
        <div style={s.navIn}>
          <button style={s.btn(false)} onClick={() => setStep(s => s - 1)} disabled={step === 0}>
            ← 前へ
          </button>
          <div style={{ fontSize: 12, color: "#7a96b0" }}>
            {step + 1} / {STEPS.length}
          </div>
          <button style={s.btn(true)} onClick={next}>
            {step === STEPS.length - 1 ? "📨 出力・送信" : "次へ →"}
          </button>
        </div>
      </div>
    </div>
  );
}
