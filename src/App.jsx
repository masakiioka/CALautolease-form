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
  fg: { display: "flex", flexDirection: "column", gap: 3 },
  lbl: { fontSize: 11, fontWeight: 700, color: "#3d5a7a", letterSpacing: "0.04em" },
  sublbl: { fontSize: 10, color: "#8fa8c0", marginTop: 1 },
  inp: (err) => ({
    border: `1.5px solid ${err ? "#c0392b" : "#cdd8e6"}`, borderRadius: 6,
    padding: "8px 11px", fontSize: 13, fontFamily: FONT, outline: "none",
    background: "#fafcff", color: "#1a2a3a", width: "100%", boxSizing: "border-box",
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
  nav: {
    position: "sticky", bottom: 0, background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(8px)", borderTop: "1px solid #dde6f0",
    padding: "14px 0", boxShadow: "0 -3px 12px rgba(0,0,0,0.05)", zIndex: 50,
  },
  navIn: { display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 820, margin: "0 auto", padding: "0 16px" },
  btn: (primary) => ({
    padding: "11px 32px", borderRadius: 7,
    border: primary ? "none" : "1.5px solid #cdd8e6",
    background: primary ? "linear-gradient(135deg, #0d2b45, #1a5276)" : "#fff",
    color: primary ? "#fff" : "#4a6a80", fontSize: 14, fontWeight: 700,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
    boxShadow: primary ? "0 3px 12px rgba(26,82,118,0.35)" : "none",
  }),
  confirmRow: { display: "flex", padding: "7px 0", borderBottom: "1px solid #f0f4f8" },
  confirmLabel: { width: 180, color: "#6a8098", flexShrink: 0, fontSize: 11 },
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
  zipBtn: {
    padding: "8px 14px", background: "#edf5ff", border: "1.5px solid #7eb5e0",
    borderRadius: 6, color: "#1a5276", fontSize: 12, fontWeight: 600,
    cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
  },
};

// ステップ定義（取引窓口を削除して4ステップに）
const STEPS = ["基本情報", "代表者情報", "事業情報", "確認・出力"];

// ── 共通パーツ ─────────────────────────────────────────
const Field = ({ label, subLabel, children, style }) => (
  <div style={{ ...s.fg, ...style }}>
    <label style={s.lbl}>{label}</label>
    {subLabel && <div style={s.sublbl}>{subLabel}</div>}
    {children}
  </div>
);

const Inp = ({ value, onChange, placeholder, error, style }) => (
  <>
    <input value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} style={{ ...s.inp(!!error), ...style }} />
    {error && <div style={s.errTxt}>{error}</div>}
  </>
);

const Kana = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder || "フリガナ（カタカナ）"} style={s.kana} />
);

const Card = ({ icon, title, children }) => (
  <div style={s.card}>
    <div style={s.ch}><span>{icon}</span>{title}</div>
    <div style={s.cb}>{children}</div>
  </div>
);

// 郵便番号から住所を検索
async function fetchAddressByZip(zip) {
  const clean = zip.replace(/[^0-9]/g, "");
  if (clean.length !== 7) return null;
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${clean}`);
    const data = await res.json();
    if (data.results && data.results[0]) {
      const r = data.results[0];
      return r.address1 + r.address2 + r.address3;
    }
  } catch {}
  return null;
}

// ── ステップ1：基本情報 ──────────────────────────────────
function StepCorp({ f, set, errors }) {
  const [zipLoading, setZipLoading] = useState(false);

  const handleZipSearch = async () => {
    setZipLoading(true);
    const addr = await fetchAddressByZip(f.corp_zip);
    if (addr) set("corp_addr", addr);
    else alert("住所が見つかりませんでした。郵便番号を確認してください。");
    setZipLoading(false);
  };

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
        {/* 法人名：漢字→フリガナの順 */}
        <Field label="法人名（屋号）">
          <Inp value={f.corp_name} onChange={v => set("corp_name", v)}
            placeholder="例：株式会社カーコンビニ倶楽部○○" error={errors.corp_name} />
        </Field>
        <Field label="法人名 フリガナ" style={{ marginTop: 10 }}>
          <Kana value={f.corp_name_kana} onChange={v => set("corp_name_kana", v)} />
        </Field>

        <div style={s.divider} />
        <div style={{ fontSize: 12, fontWeight: 700, color: "#3d5a7a", marginBottom: 10 }}>本店住所</div>

        {/* 郵便番号＋住所自動入力ボタン */}
        <Field label="郵便番号">
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Inp value={f.corp_zip} onChange={v => set("corp_zip", v)}
              placeholder="例：150-0001" error={errors.corp_zip} />
            <button style={s.zipBtn} onClick={handleZipSearch} disabled={zipLoading}>
              {zipLoading ? "検索中…" : "住所を自動入力"}
            </button>
          </div>
        </Field>

        {/* 住所：漢字→フリガナの順 */}
        <Field label="住所" style={{ marginTop: 10 }}>
          <Inp value={f.corp_addr} onChange={v => set("corp_addr", v)}
            placeholder="例：東京都渋谷区神宮前1-2-3" error={errors.corp_addr} />
        </Field>
        <Field label="住所 フリガナ" style={{ marginTop: 10 }}>
          <Kana value={f.corp_addr_kana} onChange={v => set("corp_addr_kana", v)} />
        </Field>

        <div style={s.divider} />
        <div style={s.g2}>
          <Field label="電話番号">
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
          <Field label="資本金" subLabel="万円単位で入力">
            <Inp value={f.capital} onChange={v => set("capital", v)} placeholder="例：1,000" />
          </Field>
          <Field label="従業員数" subLabel="人数を入力">
            <Inp value={f.employees} onChange={v => set("employees", v)} placeholder="例：50" />
          </Field>
        </div>
      </Card>
    </>
  );
}

// ── ステップ2：代表者情報 ────────────────────────────────
function StepRep({ f, set, errors }) {
  const [zipLoading, setZipLoading] = useState(false);

  const handleZipSearch = async () => {
    setZipLoading(true);
    const addr = await fetchAddressByZip(f.rep_zip);
    if (addr) set("rep_addr", addr);
    else alert("住所が見つかりませんでした。郵便番号を確認してください。");
    setZipLoading(false);
  };

  return (
    <Card icon="👤" title="代表者情報">
      {/* 氏名：漢字→フリガナの順 */}
      <Field label="氏名">
        <Inp value={f.rep_name} onChange={v => set("rep_name", v)}
          placeholder="例：山田　太郎" error={errors.rep_name} />
      </Field>
      <Field label="氏名 フリガナ" style={{ marginTop: 10 }}>
        <Kana value={f.rep_name_kana} onChange={v => set("rep_name_kana", v)} />
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

      {/* 郵便番号＋住所自動入力ボタン */}
      <Field label="郵便番号">
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Inp value={f.rep_zip} onChange={v => set("rep_zip", v)}
            placeholder="例：150-0002" error={errors.rep_zip} />
          <button style={s.zipBtn} onClick={handleZipSearch} disabled={zipLoading}>
            {zipLoading ? "検索中…" : "住所を自動入力"}
          </button>
        </div>
      </Field>

      {/* 住所：漢字→フリガナの順 */}
      <Field label="住所" style={{ marginTop: 10 }}>
        <Inp value={f.rep_addr} onChange={v => set("rep_addr", v)}
          placeholder="例：東京都渋谷区表参道2-3-4" error={errors.rep_addr} />
      </Field>
      <Field label="住所 フリガナ" style={{ marginTop: 10 }}>
        <Kana value={f.rep_addr_kana} onChange={v => set("rep_addr_kana", v)} />
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
          <Field label="認証工場番号" subLabel="認証工場の場合に入力">
            <Inp value={f.cert_auth} onChange={v => set("cert_auth", v)} placeholder="例：12-345-6789" />
          </Field>
          <Field label="指定工場番号" subLabel="指定工場の場合に入力">
            <Inp value={f.cert_designated} onChange={v => set("cert_designated", v)} placeholder="例：12-345-6789" />
          </Field>
        </div>
      </Card>

      <Card icon="🧾" title="適格請求書発行事業者登録番号（インボイス）">
        <Field label="登録状況">
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

// ── ステップ4：確認 ──────────────────────────────────────
function StepConfirm({ f }) {
  // 申込日を正しくフォーマット
  const dateStr = (() => {
    const y = f.date_year, m = f.date_month, d = f.date_day;
    if (!y && !m && !d) return "";
    return `${y || ""}年${m || ""}月${d || ""}日`;
  })();

  const fd = (y, m, d) => {
    if (!y && !m && !d) return "";
    return `${y || ""}年${m || ""}月${d || ""}日`;
  };

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
      <Row label="申込日" value={dateStr} />
      <Row label="法人名" value={f.corp_name} />
      <Row label="法人名 フリガナ" value={f.corp_name_kana} />
      <Row label="本店住所 〒" value={f.corp_zip} />
      <Row label="本店住所" value={f.corp_addr} />
      <Row label="本店住所 フリガナ" value={f.corp_addr_kana} />
      <Row label="電話番号" value={f.corp_tel} />
      <Row label="FAX番号" value={f.corp_fax} />
      <Row label="設立年月日" value={fd(f.established_year, f.established_month, f.established_day)} />
      <Row label="創業年月日" value={fd(f.founded_year, f.founded_month, f.founded_day)} />
      <Row label="資本金" value={f.capital ? f.capital + " 万円" : ""} />
      <Row label="従業員数" value={f.employees ? f.employees + " 人" : ""} />

      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", margin: "14px 0 8px" }}>■ 代表者情報</div>
      <Row label="氏名" value={f.rep_name} />
      <Row label="氏名 フリガナ" value={f.rep_name_kana} />
      <Row label="生年月日" value={fd(f.rep_dob_year, f.rep_dob_month, f.rep_dob_day)} />
      <Row label="代表者住所 〒" value={f.rep_zip} />
      <Row label="代表者住所" value={f.rep_addr} />
      <Row label="代表者住所 フリガナ" value={f.rep_addr_kana} />

      <div style={{ fontWeight: 700, fontSize: 12, color: "#0d2b45", margin: "14px 0 8px" }}>■ 事業情報</div>
      <Row label="認証工場番号" value={f.cert_auth} />
      <Row label="指定工場番号" value={f.cert_designated} />
      <Row label="インボイス" value={
        f.invoice_status === "registered"
          ? `登録済 T${f.invoice_number}`
          : `未登録（${f.invoice_planned_date || "予定日未入力"}）`
      } />
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
  });

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const validate = (step) => {
    const e = {};
    if (step === 0) {
      if (!f.corp_name.trim()) e.corp_name = "法人名を入力してください";
      if (!f.corp_zip.trim()) e.corp_zip = "郵便番号を入力してください";
      if (!f.corp_addr.trim()) e.corp_addr = "住所を入力してください";
      if (!f.corp_tel.trim()) e.corp_tel = "電話番号を入力してください";
    }
    if (step === 1) {
      if (!f.rep_name.trim()) e.rep_name = "氏名を入力してください";
      if (!f.rep_zip.trim()) e.rep_zip = "郵便番号を入力してください";
      if (!f.rep_addr.trim()) e.rep_addr = "住所を入力してください";
    }
    return e;
  };

  const buildPayload = () => {
    const fd = (y, m, d) => (y || m || d) ? `${y || ""}年${m || ""}月${d || ""}日` : "";
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
      branches: [],
    };
  };

  // メール自動送信（Vercel API Route経由）
  const sendEmail = async (payload) => {
    setMailStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          corp_name: payload.corp_name || "（未入力）",
          apply_date: payload.date || "",
          payload_json: JSON.stringify(payload, null, 2),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMailStatus("success");
        setMailMsg("担当者（masaki_ioka@carcon.co.jp）へメールを自動送信しました。\n件名：オートリースサービス審査依頼書送付について");
      } else {
        throw new Error(data.error || "送信失敗");
      }
    } catch (err) {
      setMailStatus("error");
      setMailMsg(`メール送信に失敗しました（${err.message}）。\nJSONをダウンロードして担当者へ直接送付してください。`);
    }
  };

  const handleSubmit = () => {
    const payload = buildPayload();
    setExportJson(JSON.stringify(payload, null, 2));
    setDone(true);
    sendEmail(payload);
  };

  const next = () => {
    const errs = validate(step);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    handleSubmit();
  };

  const downloadJson = () => {
    const blob = new Blob([exportJson || "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "審査依頼書データ.json"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── 完了画面 ──────────────────────────────────────────
  if (done) {
    return (
      <div style={s.root}>
        <div style={s.header}>
          <div style={s.headerRow}><span style={s.badge}>FC本部</span><h1 style={s.htitle}>オートリースサービス審査依頼書</h1></div>
          <div style={s.hsub}>カーコンカーリース新プラン 店舗申込システム</div>
          <div style={{ height: 16 }} />
        </div>
        <div style={s.wrap}>
          <div style={s.card}>
            <div style={{ textAlign: "center", padding: "36px 20px" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0d2b45", marginBottom: 8 }}>入力完了</div>
              <div style={{ fontSize: 12, color: "#6a8098", marginBottom: 20, lineHeight: 1.8 }}>
                入力データをダウンロードして、本部担当者へ送付してください。
              </div>

              {mailStatus && (
                <div style={s.mailBox(mailStatus)}>
                  {mailStatus === "sending" && "📧 処理中..."}
                  {mailStatus === "success" && `✅ ${mailMsg}`}
                  {mailStatus === "error" && `❌ ${mailMsg}`}
                </div>
              )}

              <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={s.dlBtn} onClick={downloadJson}>⬇️ JSONデータをダウンロード</button>
                <button style={{ ...s.dlBtn, background: "linear-gradient(135deg, #1a6e3c, #27ae60)" }}
                  onClick={() => { setDone(false); setStep(0); setMailStatus(null); setExportJson(null); }}>
                  ← 新規入力に戻る
                </button>
              </div>

              <div style={{ marginTop: 24, textAlign: "left", background: "#f4f7fb", borderRadius: 8, padding: "16px 20px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0d2b45", marginBottom: 8 }}>📋 次のステップ（本部担当者向け）</div>
                <div style={{ fontSize: 11, color: "#4a6a80", lineHeight: 2 }}>
                  1. JSONデータをダウンロード<br />
                  2. <code style={{ background: "#e8eef5", padding: "1px 5px", borderRadius: 3 }}>generate_excel.py</code> と <code style={{ background: "#e8eef5", padding: "1px 5px", borderRadius: 3 }}>template.xlsx</code> を同じフォルダに配置<br />
                  3. 以下のコマンドを実行（LibreOffice が必要）
                </div>
                <div style={{ background: "#1a2a3a", color: "#7ec8e3", padding: "10px 14px", borderRadius: 6, fontSize: 11, marginTop: 8, fontFamily: "monospace" }}>
                  python3 generate_excel.py -i 審査依頼書データ.json -x 審査依頼書.xlsx -p 審査依頼書.pdf
                </div>
                <div style={{ fontSize: 10, color: "#7a96b0", marginTop: 10, lineHeight: 1.8 }}>
                  📧 送信先：<strong>masaki_ioka@carcon.co.jp</strong><br />
                  📄 件名：オートリースサービス審査依頼書送付について
                </div>
              </div>

              <details style={{ marginTop: 16, textAlign: "left" }}>
                <summary style={{ fontSize: 11, color: "#8fa8c0", cursor: "pointer" }}>JSONデータを確認する</summary>
                <pre style={{ background: "#f0f4f8", borderRadius: 7, padding: "12px 14px", fontSize: 10, color: "#2a3a4a", overflow: "auto", marginTop: 6, maxHeight: 240, textAlign: "left" }}>
                  {exportJson}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── 入力フォーム画面 ──────────────────────────────────
  return (
    <div style={s.root}>
      <div style={s.header}>
        <div style={s.headerRow}>
          <span style={s.badge}>FC本部</span>
          <h1 style={s.htitle}>オートリースサービス審査依頼書</h1>
        </div>
        <div style={s.hsub}>カーコンカーリース新プラン 店舗申込システム　／　セディナオートリース向け</div>
        <div style={s.steps}>
          {STEPS.map((name, i) => (
            <div key={i} style={s.step(i === step, i < step)} onClick={() => i < step && setStep(i)}>
              {i < step ? "✓ " : ""}{name}
            </div>
          ))}
        </div>
      </div>

      <div style={s.wrap}>
        {step === 0 && <StepCorp f={f} set={set} errors={errors} />}
        {step === 1 && <StepRep f={f} set={set} errors={errors} />}
        {step === 2 && <StepBiz f={f} set={set} />}
        {step === 3 && <StepConfirm f={f} />}
      </div>

      <div style={s.nav}>
        <div style={s.navIn}>
          <button style={s.btn(false)} onClick={() => setStep(st => st - 1)} disabled={step === 0}>← 前へ</button>
          <div style={{ fontSize: 12, color: "#7a96b0" }}>{step + 1} / {STEPS.length}</div>
          <button style={s.btn(true)} onClick={next}>
            {step === STEPS.length - 1 ? "📨 出力・完了" : "次へ →"}
          </button>
        </div>
      </div>
    </div>
  );
}
