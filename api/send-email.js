export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { corp_name, apply_date, payload_json } = req.body;

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@carcon-autolease.jp";
  const TO_EMAIL = "masaki_ioka@carcon.co.jp";

  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: "SendGrid API key not configured" });
  }

  const mailBody = `カーコン審査担当　ご担当者様

お疲れ様です。

このたび、カーコンカーリース新プランの取り扱いを希望する加盟店より、
オートリースサービスの審査依頼書が提出されましたのでご連絡いたします。

■ 申込法人名：${corp_name || "（未入力）"}
■ 申込日：${apply_date || "（未入力）"}

お手数ですが、内容をご確認いただき、
株式会社セディナオートリースへの審査依頼の手続きをお願いいたします。

■ 入力データ（JSON）：
${payload_json}

以上、よろしくお願いいたします。

---
カーコンカーリース 取扱店審査システム（自動送信）`;

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: FROM_EMAIL, name: "カーコンカーリース審査システム" },
        subject: "オートリースサービス審査依頼書送付について",
        content: [{ type: "text/plain", value: mailBody }],
      }),
    });

    if (response.ok || response.status === 202) {
      return res.status(200).json({ success: true });
    } else {
      const errText = await response.text();
      return res.status(500).json({ error: "メール送信に失敗しました", detail: errText });
    }
  } catch (err) {
    return res.status(500).json({ error: "通信エラーが発生しました" });
  }
}
