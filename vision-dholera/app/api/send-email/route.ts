import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend using the API key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, email, projectTitle } = await req.json();

    // Fetch sender and receiver emails from environment variables
    const fromEmail = process.env.FROM_EMAIL || 'Vision Dholera <onboarding@resend.dev>';
    const toEmail = process.env.RECEIVER_EMAIL || 'hrrealtyinternational@gmail.com';

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Lead: ${name} ${projectTitle ? `- ${projectTitle}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; rounded: 12px; overflow: hidden;">
          <div style="background-color: #0A192F; padding: 24px; text-align: center; border-bottom: 3px solid #D4AF37;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Vision Dholera Lead Alert</h1>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #1e293b;">
            <h2 style="color: #0A192F; font-size: 18px; margin-top: 0;">New Customer Enquiry</h2>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #0A192F;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0A192F;">${email}</a></p>
            ${
              projectTitle
                ? `<p style="margin: 10px 0;"><strong>Project Interested In:</strong> <span style="color: #b45309; font-weight: bold;">${projectTitle}</span></p>`
                : ''
            }
          </div>
          <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            Received automatically via Vision Dholera Customer Form
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}