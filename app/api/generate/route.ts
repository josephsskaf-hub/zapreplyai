import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOpenAIClient, SYSTEM_PROMPT, buildUserPrompt, type GenerateMode } from "@/lib/openai";
import { getCurrentUsage, incrementUsage, limitForPlan } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  inputMessage?: string;
  businessContext?: string;
  businessType?: string;
  goal?: string;
  tone?: string;
  mode?: GenerateMode;
  templateId?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const inputMessage = (body.inputMessage ?? "").trim();
  if (!inputMessage) {
    return NextResponse.json(
      { error: "Cole a mensagem que você recebeu do cliente." },
      { status: 400 }
    );
  }
  if (inputMessage.length > 2000) {
    return NextResponse.json(
      { error: "Mensagem muito longa. Máximo 2000 caracteres." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle();

  const plan = profile?.plan ?? "free";
  const limit = limitForPlan(plan);
  const used = await getCurrentUsage(supabase, user.id);

  if (used >= limit) {
    return NextResponse.json(
      {
        error: "Limite mensal atingido.",
        code: "limit_reached",
        plan,
        used,
        limit,
      },
      { status: 402 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI não configurado. Defina OPENAI_API_KEY." },
      { status: 503 }
    );
  }

  const mode: GenerateMode = body.mode ?? "reply";
  const userPrompt = buildUserPrompt({
    inputMessage,
    businessContext: body.businessContext,
    businessType: body.businessType,
    goal: body.goal,
    tone: body.tone,
    mode,
  });

  let outputMessage = "";
  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });
    outputMessage = completion.choices[0]?.message?.content?.trim() ?? "";
  } catch (err) {
    console.error("[generate] OpenAI error", err);
    return NextResponse.json(
      { error: "Falha ao gerar a resposta. Tente novamente em instantes." },
      { status: 502 }
    );
  }

  if (!outputMessage) {
    return NextResponse.json(
      { error: "Não foi possível gerar uma resposta. Tente reformular." },
      { status: 502 }
    );
  }

  await supabase.from("generations").insert({
    user_id: user.id,
    input_message: inputMessage,
    business_context: body.businessContext ?? null,
    business_type: body.businessType ?? null,
    goal: body.goal ?? null,
    tone: body.tone ?? null,
    output_message: outputMessage,
  });

  const newCount = await incrementUsage(supabase, user.id);

  return NextResponse.json({
    output: outputMessage,
    usage: { used: newCount, limit, plan },
  });
}
