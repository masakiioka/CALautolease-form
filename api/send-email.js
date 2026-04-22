const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const { Resend } = require("resend");

function val(v) { return v ? String(v) : ""; }

function drawText(page, font, text, x, y, size, col) {
  if (!text) return;
  page.drawText(String(text), { x, y, size: size || 9, font, color: col || rgb(0,0,0) });
}

function box(page, x, y, w, h, lw) {
  page.drawRectangle({ x, y, width: w, height: h, borderWidth: lw || 0.5, borderColor: rgb(0,0,0), color: rgb(1,1,1) });
}

async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const L = 28, R = 567.28, T = 813.89, TW = 539.28;
  const cA = L + TW*0.10, cB = L + TW*0.22, cI = L + TW*0.60, cK = L + TW*0.72, cN = L + TW*0.88;

  drawText(page, font, "Auto Lease Service Screening Request", L + TW/2 - 110, T - 18, 13);
  drawText(page, font, "Cedyna Auto Lease Co., Ltd.", L, T - 42, 10);
  drawText(page, font, "We hereby request screening for our Auto Lease Service dealership.", L+20, T-56, 9);
  drawText(page, font, "Date: " + val(data.date), R - 130, T - 56, 9);

  let y = T - 70;
  const sH = 125;
  box(page, L, y-sH, TW, sH, 1);
  box(page, L, y-sH, cA-L, sH);
  drawText(page, font, "Corp.", L+2, y-sH/2-4, 8);
  box(page, cA, y-sH, cB-cA, sH);
  drawText(page, font, "Company", cA+2, y-sH/2+2, 7);
  drawText(page, font, "Name", cA+2, y-sH/2-8, 7);
  box(page, cB, y-18, R-cB, 18);
  drawText(page, font, "Kana: " + val(data.corp_name_kana), cB+3, y-13, 8);
  box(page, cB, y-sH, R-cB, sH-18);
  drawText(page, font, val(data.corp_name), cB+3, y-sH+(sH-18)/2-5, 12);

  y -= sH;
  const aH = 48;
  box(page, L, y-aH, TW, aH, 1);
  box(page, L, y-aH, cA-L, aH);
  drawText(page, font, "Address", L+2, y-aH/2-4, 7);
  box(page, cA, y-aH, cB-cA, aH);
  drawText(page, font, "Head", cA+2, y-aH/2+2, 7);
  drawText(page, font, "Office", cA+2, y-aH/2-8, 7);
  box(page, cB, y-13, R-cB, 13);
  drawText(page, font, "Kana: " + val(data.corp_addr_kana), cB+2, y-10, 7);
  box(page, cB, y-24, R-cB, 11);
  drawText(page, font, "ZIP: " + val(data.corp_zip), cB+2, y-21, 7);
  box(page, cB, y-aH, R-cB, aH-24);
  drawText(page, font, val(data.corp_addr), cB+2, y-aH+(aH-24)/2-4, 8);

  y -= aH;
  box(page, L, y-17, TW, 17, 1);
  box(page, L, y-17, cA-L, 17); drawText(page, font, "TEL", L+2, y-12, 7);
  box(page, cA, y-17, cB-cA, 17);
  box(page, cB, y-17, cI-cB, 17); drawText(page, font, val(data.corp_tel), cB+3, y-12, 8);
  box(page, cI, y-17, cK-cI, 17); drawText(page, font, "FAX", cI+2, y-12, 7);
  box(page, cK, y-17, R-cK, 17); drawText(page, font, val(data.corp_fax), cK+3, y-12, 8);

  y -= 17;
  box(page, L, y-14, TW, 14, 1);
  box(page, L, y-14, cA-L, 14); drawText(page, font, "Founded", L+1, y-10, 6);
  box(page, cA, y-14, cB-cA, 14);
  box(page, cB, y-14, cI-cB, 14); drawText(page, font, val(data.established), cB+2, y-10, 7);
  box(page, cI, y-14, cK-cI, 14); drawText(page, font, "Capital", cI+2, y-10, 6);
  box(page, cK, y-14, cN-cK, 14); drawText(page, font, val(data.capital), cK+2, y-10, 7);
  box(page, cN, y-14, R-cN, 14); drawText(page, font, "10kJPY", cN+1, y-10, 6);

  y -= 14;
  box(page, L, y-14, TW, 14, 1);
  box(page, L, y-14, cA-L, 14); drawText(page, font, "Estab.", L+1, y-10, 6);
  box(page, cA, y-14, cB-cA, 14);
  box(page, cB, y-14, cI-cB, 14); drawText(page, font, val(data.founded), cB+2, y-10, 7);
  box(page, cI, y-14, cK-cI, 14); drawText(page, font, "Employees", cI+1, y-10, 6);
  box(page, cK, y-14, cN-cK, 14); drawText(page, font, val(data.employees), cK+2, y-10, 7);
  box(page, cN, y-14, R-cN, 14); drawText(page, font, "persons", cN+1, y-10, 6);

  y -= 14;
  const rH = 85;
  box(page, L, y-rH, TW, rH, 1);
  box(page, L, y-rH, cA-L, rH); drawText(page, font, "Repr.", L+2, y-rH/2-4, 8);
  box(page, cA, y-rH, cB-cA, rH); drawText(page, font, "Name", cA+2, y-rH/2-4, 7);
  box(page, cB, y-15, cI-cB, 15); drawText(page, font, "Kana: "+val(data.rep_name_kana), cB+2, y-11, 7);
  box(page, cB, y-42, cI-cB, 27); drawText(page, font, val(data.rep_name), cB+2, y-42+10, 11);
  box(page, cI, y-42, cK-cI, 42); drawText(page, font, "DOB", cI+2, y-42/2-4, 7);
  box(page, cK, y-42, R-cK, 42); drawText(page, font, val(data.rep_dob), cK+2, y-42/2-4, 8);
  const rat = y-42; const raH = rH-42;
  box(page, cA, rat-raH, cB-cA, raH); drawText(page, font, "Addr.", cA+2, rat-raH/2-4, 7);
  box(page, cB, rat-13, R-cB, 13); drawText(page, font, "Kana: "+val(data.rep_addr_kana), cB+2, rat-10, 7);
  box(page, cB, rat-23, R-cB, 10); drawText(page, font, "ZIP: "+val(data.rep_zip), cB+2, rat-20, 7);
  box(page, cB, rat-raH, R-cB, raH-23); drawText(page, font, val(data.rep_addr), cB+2, rat-raH+(raH-23)/2-4, 8);

  y -= rH;
  box(page, L, y-14, TW, 14, 1);
  box(page, L, y-14, cI-L, 14); drawText(page, font, "Auto Repair Cert. No. (Auth.):", L+2, y-10, 7);
  box(page, cI, y-14, cK-cI, 14); box(page, cK, y-14, R-cK, 14);
  drawText(page, font, val(data.cert_auth), cK+2, y-10, 8);

  y -= 14;
  box(page, L, y-14, TW, 14, 1);
  box(page, L, y-14, cI-L, 14); drawText(page, font, "Auto Repair Cert. No. (Designated):", L+2, y-10, 7);
  box(page, cI, y-14, cK-cI, 14); box(page, cK, y-14, R-cK, 14);
  drawText(page, font, val(data.cert_designated), cK+2, y-10, 8);

  y -= 14;
  box(page, L, y-18, TW, 18, 1);
  box(page, L, y-18, cI-L, 18); drawText(page, font, "Invoice Registration No.:", L+2, y-12, 7);
  box(page, cI, y-18, R-cI, 18);
  const inv = data.invoice_status === "registered"
    ? "T" + val(data.invoice_number)
    : "Not registered (Planned: " + val(data.invoice_planned_date) + ")";
  drawText(page, font, inv, cI+3, y-12, 8);

  y -= 26;
  drawText(page, font, "The information provided will be used solely for transaction screening and contract management.", L, y, 7);

  return Buffer.from(await pdfDoc.save());
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { corp_name, apply_date, payload } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return res.status(500).json({ error: "RESEND_API_KEY not configured" });

  try {
    const pdfBuffer = await generatePDF(payload || {});
    const resend = new Resend(RESEND_API_KEY);
    const corpName = corp_name || "（未入力）";
    const applyDate = apply_date || "（未入力）";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["masaki_ioka@carcon.co.jp"],
      subject: "オートリースサービス審査依頼書送付について",
      text: `カーコン審査担当　ご担当者様\n\nお疲れ様です。\n\nカーコンカーリース新プランの取り扱いを希望する加盟店より、オートリースサービスの審査依頼書が提出されましたのでご連絡いたします。\n\n■ 申込法人名：${corpName}\n■ 申込日：${applyDate}\n\n添付のPDFファイルをご確認の上、株式会社セディナオートリースへの審査依頼の手続きをお願いいたします。\n\n以上、よろしくお願いいたします。\n\n---\nカーコンカーリース 取扱店審査システム（自動送信）`,
      attachments: [{ filename: `審査依頼書_${corpName}.pdf`, content: pdfBuffer.toString("base64") }],
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "エラーが発生しました" });
  }
};
