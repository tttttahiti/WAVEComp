import { NextResponse } from "next/server";
import { Resend } from "resend";

// お問い合わせフォームの送信先（Resend 経由）
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@wa-ve.jp";
// Resend でドメイン認証済みのアドレスを指定する。未認証の間は onboarding@resend.dev で動作確認可能
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "送信設定が未構成です" }, { status: 500 });
  }

  let body: { name?: string; company?: string; email?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const company = (body.company || "").trim();
  const email = (body.email || "").trim();
  const content = (body.content || "").trim();

  if (!name || !email || !content) {
    return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "メールアドレスの形式が不正です" }, { status: 400 });
  }
  if (name.length > 200 || company.length > 200 || content.length > 10000) {
    return NextResponse.json({ error: "入力が長すぎます" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `WA/VE Website <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `【お問い合わせ】${name}様より`,
    text: [
      `お名前: ${name}`,
      `会社名: ${company || "（未入力）"}`,
      `メールアドレス: ${email}`,
      "",
      "内容:",
      content,
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
