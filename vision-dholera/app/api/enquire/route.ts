import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, visitDate, projectTitle } = body;

    // 1. Save lead to your database (MongoDB / Supabase / Prisma)
    console.log("New Lead Saved:", { name, phone, email, visitDate, projectTitle });

    // 2. (Optional) Send instant WhatsApp / Email notification to your sales team

    return NextResponse.json({ success: true, message: "Enquiry stored" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}