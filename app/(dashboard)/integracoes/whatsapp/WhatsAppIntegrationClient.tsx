'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Copy, Check, Send, ExternalLink } from 'lucide-react'

interface Props {
  evolutionConfigured: boolean
  metaConfigured: boolean
  activeProvider: string
  webhookUrl: string
}

type Tab = 'meta' | 'evolution'

export default function WhatsAppIntegrationClient({
  evolutionConfigured,
  metaConfigured,
  activeProvider,
  webhookUrl,
}: Props) {
  const [tab, setTab] = useState<Tab>(activeProvider === 'meta' ? 'meta' : 'evolution')
  const [copied, setCopied] = useState(false)
  const [testPhone, setTestPhone] = useState('')
  const [testMessage, setTestMessage] = useState('Olá! Isso é um teste do ZapReply AI. 🤖')
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null)

  const configured = tab === 'meta' ? metaConfigured : evolutionConfigured

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTestSend = async () => {
    if (!testPhone || !testMessage) return
    setTestLoading(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/test/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testPhone, message: testMessage, provider: tab }),
      })
      const data = await res.json()
      if (res.ok && data.sent) {
        setTestResult({ ok: true, message: 'Mensagem enviada com sucesso! ✅' })
      } else {
        setTestResult({
          ok: false,
          message: data.error || 'Falha ao enviar. Verifique as configurações.',
        })
      }
    } catch {
      setTestResult({ ok: false, message: 'Erro de conexão ao tentar enviar.' })
    } finally {
      setTestLoading(false)
    }
  }

  // ── Meta steps ──────────────────────────────────────────────────────────────
  const metaSteps = [
    {
      n: 1,
      title: 'Crie um app no Meta for Developers',
      desc: 'Acesse developers.facebook.com, clique em "Meus Apps" → "Criar App" → escolha "Business".',
      link: 'https://developers.facebook.com/apps',
      linkLabel: 'Acessar Meta for Developers',
    },
    {
      n: 2,
      title: 'Adicione o produto WhatsApp',
      desc: 'No painel do app, clique em "Adicionar produto" e selecione "WhatsApp". Siga o assistente de configuração.',
    },
    {
      n: 3,
      title: 'Anote o Phone Number ID',
      desc: 'Em WhatsApp → Primeiros passos, copie o "Phone Number ID" do número de teste (ou do seu número real).',
    },
    {
      n: 4,
      title: 'Gere um token permanente',
      desc: 'Crie um usuário de sistema no Business Manager, atribua-o ao app e gere um token permanente com permissão whatsapp_business_messaging.',
      link: 'https://business.facebook.com/settings/system-users',
      linkLabel: 'Business Manager',
    },
    {
      n: 5,
      title: 'Configure as variáveis de ambiente',
      desc: 'No Vercel (ou .env.local), adicione: WHATSAPP_PROVIDER=meta, META_WHATSAPP_TOKEN, META_PHONE_NUMBER_ID e META_VERIFY_TOKEN (qualquer string secreta).',
    },
    {
      n: 6,
      title: 'Configure o webhook no Meta',
      desc: 'Em WhatsApp → Configuração → Webhook, cole a URL abaixo como endpoint. No campo "Token de verificação", coloque o mesmo valor de META_VERIFY_TOKEN. Assine o campo "messages".',
    },
    {
      n: 7,
      title: 'Teste a integração',
      desc: 'Envie uma mensagem para o número de teste no WhatsApp e veja a resposta da IA. Use o formulário de teste abaixo.',
    },
  ]

  const metaEnvVars = [
    { key: 'WHATSAPP_PROVIDER', example: 'meta' },
    { key: 'META_WHATSAPP_TOKEN', example: 'EAAxxxxxxxx...' },
    { key: 'META_PHONE_NUMBER_ID', example: '1234567890' },
    { key: 'META_VERIFY_TOKEN', example: 'qualquer-string-secreta' },
  ]

  // ── Evolution steps ─────────────────────────────────────────────────────────
  const evolutionSteps = [
    {
      n: 1,
      title: 'Instale a Evolution API',
      desc: 'Faça o deploy da Evolution API v2 no seu servidor (VPS, Railway, EasyPanel, etc.).',
      link: 'https://doc.evolution-api.com',
      linkLabel: 'Ver documentação',
    },
    {
      n: 2,
      title: 'Crie uma instância',
      desc: 'No painel da Evolution API, crie uma nova instância e anote o nome exato.',
    },
    {
      n: 3,
      title: 'Conecte o número WhatsApp',
      desc: 'Escaneie o QR code gerado pela Evolution API com o WhatsApp Business do seu número.',
    },
    {
      n: 4,
      title: 'Configure as variáveis de ambiente',
      desc: 'No Vercel (ou .env.local), adicione: WHATSAPP_PROVIDER=evolution, EVOLUTION_API_URL, EVOLUTION_API_KEY e EVOLUTION_INSTANCE_ID.',
    },
    {
      n: 5,
      title: 'Configure o webhook na Evolution API',
      desc: 'No painel da Evolution API, vá em Configurações → Webhook e cole a URL abaixo como endpoint.',
    },
    {
      n: 6,
      title: 'Teste a integração',
      desc: 'Use o formulário de teste abaixo para enviar uma mensagem e verificar se tudo está funcionando.',
    },
  ]

  const evolutionEnvVars = [
    { key: 'WHATSAPP_PROVIDER', example: 'evolution' },
    { key: 'EVOLUTION_API_URL', example: 'https://api.seuservidor.com' },
    { key: 'EVOLUTION_API_KEY', example: 'sua-chave-secreta' },
    { key: 'EVOLUTION_INSTANCE_ID', example: 'nome-da-instancia' },
  ]

  const steps = tab === 'meta' ? metaSteps : evolutionSteps
  const envVars = tab === 'meta' ? metaEnvVars : evolutionEnvVars

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integração WhatsApp</h1>
        <p className="text-gray-500 mt-1">
          Conecte seu WhatsApp para receber e responder mensagens automaticamente com IA.
        </p>
      </div>

      {/* Provider Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab('meta')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'meta'
              ? 'border-green-600 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📱 Meta Cloud API
          {metaConfigured && (
            <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-green-500" />
          )}
        </button>
        <button
          onClick={() => setTab('evolution')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'evolution'
              ? 'border-green-600 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          ⚡ Evolution API
          {evolutionConfigured && (
            <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-green-500" />
          )}
        </button>
      </div>

      {/* Provider description */}
      {tab === 'meta' ? (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Meta Cloud API</strong> — API oficial do WhatsApp Business da Meta. Ideal para produção, sem necessidade de servidor extra. Requer aprovação do app e número de telefone verificado.
        </div>
      ) : (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
          <strong>Evolution API</strong> — Solução open-source que conecta via WhatsApp Web (não oficial). Mais fácil de configurar, funciona com qualquer número. Requer servidor próprio.
        </div>
      )}

      {/* Status Card */}
      <div
        className={`rounded-xl border p-5 flex items-start gap-4 ${
          configured ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        {configured ? (
          <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`font-semibold ${configured ? 'text-green-800' : 'text-yellow-800'}`}>
            {configured
              ? `${tab === 'meta' ? 'Meta Cloud API' : 'Evolution API'} configurada ✅`
              : `${tab === 'meta' ? 'Meta Cloud API' : 'Evolution API'} não configurada`}
          </p>
          <p className={`text-sm mt-0.5 ${configured ? 'text-green-700' : 'text-yellow-700'}`}>
            {configured
              ? 'Variáveis de ambiente configuradas. O webhook está ativo.'
              : `Adicione as variáveis de ambiente abaixo para ativar.`}
          </p>
        </div>
      </div>

      {/* Webhook URL */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-1">URL do Webhook</h2>
        <p className="text-sm text-gray-500 mb-3">
          {tab === 'meta'
            ? 'Cole essa URL no campo "URL de callback" ao configurar o webhook no Meta for Developers.'
            : 'Cole essa URL no campo de webhook da Evolution API.'}
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-700 truncate">
            {webhookUrl}
          </code>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700 transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Env vars */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Variáveis de Ambiente Necessárias</h2>
        <div className="space-y-2">
          {envVars.map((v) => (
            <div key={v.key} className="flex items-center gap-3 text-sm flex-wrap">
              <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-800 shrink-0">
                {v.key}
              </code>
              <span className="text-gray-400">ex:</span>
              <span className="text-gray-500 truncate">{v.example}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Guia de Configuração</h2>
        <ol className="space-y-4">
          {steps.map((step) => (
            <li key={step.n} className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                {step.n}
              </div>
              <div>
                <p className="font-medium text-gray-900">{step.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                {'link' in step && step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-green-600 hover:underline mt-1"
                  >
                    {step.linkLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Test Send Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-1">Enviar Mensagem de Teste</h2>
        <p className="text-sm text-gray-500 mb-4">
          Envie uma mensagem via{' '}
          <strong>{tab === 'meta' ? 'Meta Cloud API' : 'Evolution API'}</strong> para verificar se
          está tudo funcionando.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de destino (com código do país, sem +)
            </label>
            <input
              type="text"
              placeholder="5511999999999"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea
              rows={3}
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {testResult && (
            <div
              className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm ${
                testResult.ok
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {testResult.ok ? (
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              {testResult.message}
            </div>
          )}

          <button
            onClick={handleTestSend}
            disabled={testLoading || !testPhone || !configured}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            {testLoading ? 'Enviando...' : 'Enviar Teste'}
          </button>
          {!configured && (
            <p className="text-xs text-gray-400">
              Configure o provedor selecionado para habilitar o envio de teste.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
