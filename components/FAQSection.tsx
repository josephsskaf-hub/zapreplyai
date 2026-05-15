"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Preciso ter WhatsApp Business?",
    a: "Sim, funciona com qualquer número WhatsApp Business. Configuramos tudo para você.",
  },
  {
    q: "O cliente vai saber que é uma IA?",
    a: "Não, a IA responde de forma natural, como um atendente humano treinado no seu negócio.",
  },
  {
    q: "Quanto tempo para configurar?",
    a: "Em até 48 horas úteis após o pagamento, seu bot já está respondendo.",
  },
  {
    q: "E se o cliente fizer uma pergunta difícil?",
    a: "A IA redireciona para você. Nunca inventa informações que não foram configuradas.",
  },
  {
    q: "Tenho que pagar mensalidade?",
    a: "Sim, os planos são mensais. Você pode cancelar a qualquer momento, sem multa.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Perguntas frequentes
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Tire suas dúvidas sobre o ZapReply AI.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium hover:bg-gray-750 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-green-400 text-xl ml-4 shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
