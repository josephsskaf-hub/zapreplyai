import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { conversation_id, message } = await request.json();

    if (!conversation_id || !message) {
      return NextResponse.json(
        { error: "conversation_id and message are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get conversation + business context
    const { data: conversation } = await supabase
      .from("conversations")
      .select("*, businesses(*, ai_settings(*))")
      .eq("id", conversation_id)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const business = (conversation as Record<string, unknown>).businesses as Record<string, unknown> | null;
    const aiSettings = business?.ai_settings as Record<string, unknown> | null;

    // Build system prompt
    const systemPrompt = `Você é ${aiSettings?.ai_name ?? "Assistente"}, assistente virtual da empresa ${business?.name ?? "nossa empresa"}.
Tom de voz: ${aiSettings?.tone ?? "professional"}
${aiSettings?.base_prompt ? `\nInstruções: ${aiSettings.base_prompt}` : ""}
${aiSettings?.faq ? `\nFAQ:\n${JSON.stringify(aiSettings.faq, null, 2)}` : ""}
${aiSettings?.products ? `\nProdutos:\n${JSON.stringify(aiSettings.products, null, 2)}` : ""}
Responda sempre em português brasileiro. Seja conciso e útil.`;

    // Get recent messages for context
    const { data: recentMessages } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversation_id)
      .order("sent_at", { ascending: false })
      .limit(10);

    const messagesForAI: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...(recentMessages ?? []).reverse().map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messagesForAI,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "Desculpe, não consegui processar sua mensagem.";

    // Save messages
    await supabase.from("messages").insert([
      { conversation_id, role: "user", content: message },
      { conversation_id, role: "assistant", content: reply },
    ]);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
