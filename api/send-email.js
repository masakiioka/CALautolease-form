export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { corp_name, apply_date, payload_json } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  const mailBody = `カーコン審査担当　ご担当者様

お疲れ様です。

カーコンカーリース新プランの取り扱いを希望する加盟店より、
オートリースサービスの審査依頼書が提出されましたのでご連絡いたします。

■ 申込法人名：${corp_name || "（未入力）"}
■ 申込日：${apply_date || "（未入力）"}

お手数ですが、セディナオートリースへの審査依頼手続きをお願いいたします。

■ 入力データ（JSON）：
${payload_json}

---
カーコンカーリース 取扱店審査システム（自動送信）`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["masaki_ioka@carcon.co.jp"],
        subject: "オートリースサービス審査依頼書送付について",
        text: mailBody,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: data.message || "送信失敗" });
    }
  } catch (err) {
    return res.status(500).json({ error: "通信エラー: " + err.message });
  }
}
