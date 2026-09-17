async function subscribe(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, email, whatsapp, voce_e, faixa_etaria, temas_interesse } = req.body ?? {}

  if (!nome || (!email && !whatsapp)) {
    return res
      .status(400)
      .json({ error: 'Informe nome e ao menos um contato (email ou whatsapp).' })
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    LEADLOVERS_WEBHOOK_URL_EMAIL,
    LEADLOVERS_WEBHOOK_URL_WHATSAPP,
  } = process.env

  const result = { supabase: null, leadlovers: { email: null, whatsapp: null } }

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ nome, email, whatsapp, voce_e, faixa_etaria, temas_interesse }),
      })

      if (!supabaseRes.ok) {
        result.supabase = { ok: false, status: supabaseRes.status, body: await supabaseRes.text() }
      } else {
        result.supabase = { ok: true }
      }
    } catch (err) {
      result.supabase = { ok: false, error: err.message }
    }
  } else {
    result.supabase = { ok: false, error: 'SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.' }
  }

  const callLeadLoversWebhook = async (url) => {
    if (!url) {
      return { ok: false, error: 'URL do webhook não configurada.' }
    }

    try {
      const webhookRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone: whatsapp }),
      })

      if (!webhookRes.ok) {
        return { ok: false, status: webhookRes.status, body: await webhookRes.text() }
      }

      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const [emailResult, whatsappResult] = await Promise.all([
    callLeadLoversWebhook(LEADLOVERS_WEBHOOK_URL_EMAIL),
    callLeadLoversWebhook(LEADLOVERS_WEBHOOK_URL_WHATSAPP),
  ])

  result.leadlovers = { email: emailResult, whatsapp: whatsappResult }

  const leadloversOk = emailResult.ok || whatsappResult.ok

  return res.status(leadloversOk ? 200 : 502).json(result)
}

export default async function handler(req, res) {
  try {
    return await subscribe(req, res)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
