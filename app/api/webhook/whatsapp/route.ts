import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("WhatsApp webhook received:", JSON.stringify(body, null, 2));

    // TODO: Parse Evolution API webhook payload
    // TODO: Find or create conversation
    // TODO: Save incoming message
    // TODO: Call /api/chat to generate AI reply
    // TODO: Send reply via Evolution API

    return NextResponse.json({ status: "received" });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "WhatsApp webhook endpoint active" });
}
