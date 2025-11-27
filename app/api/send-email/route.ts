import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const portfolioInbox =
  process.env.PORTFOLIO_CONTACT_EMAIL || "mykamel.cs@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// Initialize Resend only if API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    // Check if Resend is configured
    if (!resend || !resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { 
          error: "Email service is not configured. Please contact the administrator.",
          success: false 
        },
        { status: 503 },
      );
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format", success: false },
        { status: 400 },
      );
    }

    const payload = {
      from: `Portfolio Contact <${fromEmail}>`,
      to: portfolioInbox,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    const data = await resend.emails.send(payload);

    if (data.error) {
      console.error("Resend API error:", data.error);
      return NextResponse.json(
        { 
          error: data.error.message ?? "Unable to send message",
          success: false 
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { 
        error: error?.message || "Failed to send email",
        success: false 
      },
      { status: 500 },
    );
  }
}
