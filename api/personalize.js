async function personalize(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, voce_e, faixa_etaria, temas_interesse } = req.body ?? {}

  if (!email) {
    return res.status(400).json({ error: 'Informe o email para localizar o lead.' })
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res
      .status(500)
      .json({ ok: false, error: 'SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.' })
  }

  try {
    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ voce_e, faixa_etaria, temas_interesse }),
      },
    )

    if (!supabaseRes.ok) {
      return res
        .status(502)
        .json({ ok: false, status: supabaseRes.status, body: await supabaseRes.text() })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}

export default async function handler(req, res) {
  try {
    return await personalize(req, res)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
