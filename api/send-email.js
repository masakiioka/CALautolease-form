import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Resend } from "resend";

export const config = { maxDuration: 30 };

function val(v) { return v || ""; }

function drawText(page, font, text, x, y, size, color) {
  if (!text) return;
  page.drawText(String(text), { x, y, size: size || 9, font, color: color || rgb(0,0,0) });
}

function drawRect(page, x, y, w, h, lw) {
  page.drawRectangle({ x, y, width: w, height: h, borderWidth: lw || 0.5, borderColor: rgb(0,0,0), color: rgb(1,1,1) });
}

async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const W = 595.28, H = 841.89;
  const L = 28, R = W - 28, T = H - 28;
  const TW = R - L;

  const colA = L + TW * 0.10;
  const colB = L + TW * 0.22;
  const colI = L + TW * 0.60;
  const colK = L + TW * 0.72;
  const colN = L + TW * 0.88;

  // タイトル
  drawText(page, font, "Auto Lease Service Screening Request Form", L + TW/2 - 120, T - 20, 13);
  drawText(page, font, "Cedyna Auto Lease Co., Ltd.", L, T - 45, 10);
  drawText(page, font, "We hereby request a screening for our Auto Lease Service dealership.", L + 20, T - 60, 9);
  drawText(page, font, "Date: " + val(data.date), R - 130, T - 60, 9);

  // 法人セクション
  let y = T - 75;
  const secH = 130;
  drawRect(page, L, y - secH, TW, secH, 1.0);
  drawRect(page, L, y - secH, colA - L, secH);
  drawText(page, font, "Corporation", L + 1, y - secH/2 - 4, 8);

  // 法人名
  drawRect(page, colA, y - secH, colB - colA, secH);
  drawText(page, font, "Company", colA + 2, y - secH/2, 7);
  drawText(page, font, "Name", colA + 2, y - secH/2 - 10, 7);
  const kRow = 20;
  drawRect(page, colB, y - kRow, R - colB, kRow);
  drawText(page, font, "Kana: " + val(data.corp_name_kana), colB + 3, y - kRow + 6, 8);
  drawRect(page, colB, y - secH, R - colB, secH - kRow);
  drawText(page, font, val(data.corp_name), colB + 3, y - secH + (secH - kRow)/2 - 5, 12);

  // 本店住所
  y -= secH;
  const aH = 50;
  drawRect(page, L, y - aH, TW, aH, 1.0);
  drawRect(page, L, y - aH, colA - L, aH);
  drawText(page, font, "Address", L + 2, y - aH/2 - 4, 7);
  drawRect(page, colA, y - aH, colB - colA, aH);
  drawText(page, font, "Head", colA + 2, y - aH/2, 7);
  drawText(page, font, "Office", colA + 2, y - aH/2 - 10, 7);
  drawRect(page, colB, y - 13, R - colB, 13);
  drawText(page, font, "Kana: " + val(data.corp_addr_kana), colB + 2, y - 10, 7);
  drawRect(page, colB, y - 25, R - colB, 12);
  drawText(page, font, "ZIP: " + val(data.corp_zip), colB + 2, y - 22, 7);
  drawRect(page, colB, y - aH, R - colB, aH - 25);
  drawText(page, font, val(data.corp_addr), colB + 2, y - aH + (aH - 25)/2 - 4, 8);

  // 電話・FAX
  y -= aH;
  drawRect(page, L, y - 18, TW, 18, 1.0);
  drawRect(page, L, y - 18, colA - L, 18);
  drawText(page, font, "TEL", L + 2, y - 12, 7);
  drawRect(page, colA, y - 18, colB - colA, 18);
  drawRect(page, colB, y - 18, colI - colB, 18);
  drawText(page, font, val(data.corp_tel), colB + 3, y - 12, 8);
  drawRect(page, colI, y - 18, colK - colI, 18);
  drawText(page, font, "FAX", colI + 2, y - 12, 7);
  drawRect(page, colK, y -
