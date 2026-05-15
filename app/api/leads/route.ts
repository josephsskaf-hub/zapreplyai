import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, whatsapp, business_type, monthly_volume, source = 'landing_page' } = body

    if (!name || !whatsapp) {
      return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios' }, { status: 400 })
    }

    // Try to insert into Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && serviceRoleKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, company, whatsapp, business_type, monthly_volume, source })
      })

      if (!response.ok) {
        console.error('Supabase error:', await response.text())
        // Still return success to user - don't fail on DB error
      }
    } else {
      console.log('Lead received (Supabase not configured):', { name, company, whatsapp, business_type, monthly_volume })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ success: true }) // Always return success to user
  }
}
