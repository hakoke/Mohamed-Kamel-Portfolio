import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const portfolioInbox =
  process.env.PORTFOLIO_CONTACT_EMAIL || "mykamel.cs@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 },
      );
    }

    const payload = {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: portfolioInbox,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const data = await resend.emails.send(payload);

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message ?? "Unable to send message" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to send email" },
      { status: 500 },
    );
  }
}
