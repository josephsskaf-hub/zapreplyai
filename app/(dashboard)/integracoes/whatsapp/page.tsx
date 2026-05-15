import { isEvolutionConfigured } from '@/lib/evolution'
import { isMetaConfigured } from '@/lib/meta-whatsapp'
import WhatsAppIntegrationClient from './WhatsAppIntegrationClient'

export default function WhatsAppIntegrationPage() {
  const evolutionConfigured = isEvolutionConfigured()
  const metaConfigured = isMetaConfigured()
  const provider = process.env.WHATSAPP_PROVIDER || 'evolution'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zapreplyai.vercel.app'
  const webhookUrl = `${appUrl}/api/webhooks/whatsapp`

  return (
    <WhatsAppIntegrationClient
      evolutionConfigured={evolutionConfigured}
      metaConfigured={metaConfigured}
      activeProvider={provider}
      webhookUrl={webhookUrl}
    />
  )
}
