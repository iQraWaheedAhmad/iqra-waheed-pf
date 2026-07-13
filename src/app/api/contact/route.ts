import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, budget, message } = await request.json();

    // 1. Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Save submission to Supabase contact_submissions table
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          budget,
          message,
          status: "unread",
        },
      ])
      .select();

    if (dbError) {
      console.error("Database insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission to database: " + dbError.message },
        { status: 500 }
      );
    }

    // 3. Send email notification via Nodemailer
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpTo = process.env.SMTP_TO || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP credentials missing from environment.");
      // Even if email config is missing, the DB insert succeeded, so we return a partial success
      return NextResponse.json(
        {
          success: true,
          message: "Submission saved to database, but email notification could not be sent (SMTP credentials missing).",
          data: dbData,
        },
        { status: 200 }
      );
    }

    // Setup transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass, // 16-character Gmail app password
      },
    });

    // Create custom styled HTML body
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1a202c; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.025em;">💼 New Portfolio Inquiry</h2>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">You have received a new message from your website contact form.</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 120px; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; color: #3b82f6; font-size: 14px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px;">Budget</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${budget || "Not specified"}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8fafc; border-radius: 12px; padding: 15px 20px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
          <h4 style="margin: 0 0 8px 0; color: #475569; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message Details</h4>
          <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">
            Submitted on ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC.
          </p>
          <p style="font-size: 11px; color: #cbd5e1; margin-top: 5px;">
            Portfolio Contact Service Powered by Next.js & Supabase
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: smtpTo,
      subject: `💼 New Inquiry: ${name} (${budget || "No Budget Specified"})`,
      text: `New Portfolio Inquiry:\n\nName: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry saved to database and email sent successfully.",
        data: dbData,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Submission handler error:", err);
    return NextResponse.json(
      { error: "Internal server error: " + (err.message || err) },
      { status: 500 }
    );
  }
}
