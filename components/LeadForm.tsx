"use client";

import { useState } from "react";

type FormState = {
  name: string;
  company: string;
  whatsapp: string;
  business_type: string;
  monthly_volume: string;
};

export default function LeadForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    whatsapp: "",
    business_type: "",
    monthly_volume: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing_page" }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao enviar. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 px-4">
        <div className="text-5xl mb-4">🚀</div>
        <p className="text-xl font-semibold text-gray-900 mb-2">Recebemos sua solicitação!</p>
        <p className="text-gray-600">
          Perfeito. Vamos te chamar no WhatsApp para mostrar uma demonstração do ZapReply AI.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome completo <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="Nome da sua empresa"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div>
        <label htmlFor="business_type" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de negócio
        </label>
        <select
          id="business_type"
          name="business_type"
          value={form.business_type}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
        >
          <option value="">Selecione...</option>
          <option value="Clínica Estética">Clínica Estética</option>
          <option value="Odontologia">Odontologia</option>
          <option value="Imobiliária">Imobiliária</option>
          <option value="Restaurante">Restaurante</option>
          <option value="Advocacia">Advocacia</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div>
        <label htmlFor="monthly_volume" className="block text-sm font-medium text-gray-700 mb-1">
          Volume mensal de mensagens
        </label>
        <select
          id="monthly_volume"
          name="monthly_volume"
          value={form.monthly_volume}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
        >
          <option value="">Selecione...</option>
          <option value="Menos de 100">Menos de 100</option>
          <option value="100-500">100–500</option>
          <option value="500-2000">500–2000</option>
          <option value="Mais de 2000">Mais de 2000</option>
        </select>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-base"
      >
        {loading ? "Enviando..." : "Receber demonstração"}
      </button>
    </form>
  );
}
