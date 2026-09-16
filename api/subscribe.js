export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, email, whatsapp } = req.body ?? {}

  if (!nome || (!email && !whatsapp)) {
    return res
      .status(400)
      .json({ error: 'Informe nome e ao menos um contato (email ou whatsapp).' })
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, LEADLOVERS_WEBHOOK_URL } = process.env

  const result = { supabase: null, leadlovers: null }

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
        body: JSON.stringify({ nome, email, whatsapp }),
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

  if (!LEADLOVERS_WEBHOOK_URL) {
    result.leadlovers = { ok: false, error: 'LEADLOVERS_WEBHOOK_URL não configurada.' }
    return res.status(502).json(result)
  }

  try {
    const leadloversRes = await fetch(LEADLOVERS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone: whatsapp }),
    })

    if (!leadloversRes.ok) {
      result.leadlovers = {
        ok: false,
        status: leadloversRes.status,
        body: await leadloversRes.text(),
      }
      return res.status(502).json(result)
    }

    result.leadlovers = { ok: true }
    return res.status(200).json(result)
  } catch (err) {
    result.leadlovers = { ok: false, error: err.message }
    return res.status(502).json(result)
  }
}
